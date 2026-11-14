import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { MUNDOS, TEXTOS } from './datos.js';

const $ = (s) => document.querySelector(s);
const TOTAL = MUNDOS.reduce((n, m) => n + m.estaciones.length, 0);

/* =====================================================================
   PROGRESO (puntos e insignias) — se guarda en el navegador
   ===================================================================== */
const CLAVE = 'exploradores-progreso-v1';
let prog = { puntos: 0, estaciones: {}, piezas: {}, completas: {} };
try { Object.assign(prog, JSON.parse(localStorage.getItem(CLAVE) || '{}')); } catch (e) { /* sin memoria */ }
const guardar = () => { try { localStorage.setItem(CLAVE, JSON.stringify(prog)); } catch (e) { /* sin memoria */ } };

function premio(texto, pts) {
  prog.puntos += pts; guardar(); pintarMarcador();
  const d = document.createElement('div');
  d.className = 'premio';
  d.innerHTML = `<img src="img/estrellas-1.webp" alt="">${texto} +${pts}`;
  $('#aviso').replaceChildren(d);
  $('#puntos').classList.remove('salta'); void $('#puntos').offsetWidth; $('#puntos').classList.add('salta');
}
function pintarMarcador() {
  $('#puntos').textContent = `⭐ ${prog.puntos}`;
  $('#insignias').textContent = `${Object.keys(prog.completas).length}/${TOTAL} 🚀`;
}

/* =====================================================================
   ÍNDICE (barra lateral)
   ===================================================================== */
const estado = { mundo: null, estacion: null };   // dónde está el jugador

function pintarIndice() {
  const nav = $('#indice'); nav.replaceChildren();
  const boton = (html, cls, fn, actual) => {
    const b = document.createElement('button');
    b.innerHTML = html; b.className = cls + (actual ? ' actual' : '');
    b.onclick = () => { if (matchMedia('(max-width:760px)').matches) document.body.classList.add('menu-cerrado'); fn(); };
    nav.append(b);
  };
  boton('<img src="img/tierra.webp" alt="">El espacio', '', () => irA(null), !estado.mundo);
  for (const m of MUNDOS) {
    boton(`<img src="${m.boton}" alt="">${m.nombre}`, '', () => irA(m.id), estado.mundo === m.id && !estado.estacion);
    for (const e of m.estaciones) {
      const ok = prog.completas[e.id] ? '<span class="hecho">✓</span>' : '';
      boton(`${e.anio} · ${e.nombre}${ok}`, 'sub', () => irA(m.id, e.id), estado.estacion === e.id);
    }
  }
}
$('#btn-menu').onclick = () => document.body.classList.toggle('menu-cerrado');
$('#velo').onclick = () => document.body.classList.add('menu-cerrado');
$('#btn-reiniciar').onclick = () => {
  prog = { puntos: 0, estaciones: {}, piezas: {}, completas: {} }; guardar(); pintarMarcador(); pintarIndice();
};
if (matchMedia('(min-width:761px)').matches) document.body.classList.remove('menu-cerrado');

/* =====================================================================
   ESCENA 1: EL ESPACIO (planetas + cohete)
   ===================================================================== */
const cohete = $('#cohete');
let cohetEn = 'tierra';
const espera = (ms) => new Promise((r) => setTimeout(r, ms));

function centroDe(id) {
  const r = $('#p-' + id).querySelector('img').getBoundingClientRect();
  const c = $('#espacio').getBoundingClientRect();
  return { x: r.left + r.width / 2 - c.left, y: r.top + r.height / 2 - c.top, r: r.width / 2 };
}
function puestoDe(id) {            // el cohete se estaciona arriba a la derecha del planeta
  const p = centroDe(id);
  return { x: p.x + p.r * 0.95, y: p.y - p.r * 0.75 };
}
function colocarCohete(id, animar) {
  const p = puestoDe(id);
  if (!animar) { cohete.style.transition = 'none'; }
  cohete.style.left = p.x + 'px'; cohete.style.top = p.y + 'px';
  if (!animar) { void cohete.offsetWidth; cohete.style.transition = ''; }
}
async function volarA(id) {
  if (cohetEn === id) return;
  const a = puestoDe(cohetEn), b = puestoDe(id);
  const ang = Math.atan2(b.y - a.y, b.x - a.x) * 180 / Math.PI + 90;
  cohete.classList.remove('quieto');
  cohete.style.setProperty('--giro', ang + 'deg');
  await espera(200);
  colocarCohete(id, true);
  await espera(1350);
  cohete.style.setProperty('--giro', '0deg');
  cohete.classList.add('quieto');
  cohetEn = id;
}
document.querySelectorAll('.planeta').forEach((b) => {
  b.onclick = () => (b.dataset.ir === 'tierra' ? irATierra() : irA(b.dataset.ir));
});
async function irATierra() {
  await volarA('tierra');
  $('#globo').textContent = TEXTOS.enTierra;
}
addEventListener('resize', () => { if (!estado.mundo) colocarCohete(cohetEn, false); });

/* =====================================================================
   NAVEGACIÓN ENTRE ESCENAS (zoom)
   ===================================================================== */
let ocupado = false;
async function irA(mundoId, estId = null) {
  if (ocupado) return; ocupado = true;
  try {
    if (!mundoId) {                                   // volver al espacio
      if (estado.estacion) await visor.salirDetalle();
      estado.mundo = estado.estacion = null;
      $('#mundo').classList.remove('activa'); $('#espacio').classList.add('activa');
      document.body.classList.remove('detalle');
      visor.pausar();
      $('#globo').textContent = TEXTOS.bienvenida;
      await espera(950); colocarCohete(cohetEn, false);   // al terminar el zoom, el cohete queda junto al planeta
    } else {
      const mundo = MUNDOS.find((m) => m.id === mundoId);
      if (estado.mundo !== mundoId) {
        if (estado.estacion) { await visor.salirDetalle(); estado.estacion = null; }
        if (!estado.mundo) {                            // viaje en cohete + zoom al planeta
          await volarA(mundoId);
          const p = centroDe(mundoId), c = $('#espacio').getBoundingClientRect();
          $('#espacio').style.setProperty('--ox', (p.x / c.width * 100) + '%');
          $('#espacio').style.setProperty('--oy', (p.y / c.height * 100) + '%');
        } else {
          cohetEn = mundoId;
        }
        estado.mundo = mundoId;
        $('#fondo-mundo').style.backgroundImage = `url(${mundo.fondo})`;
        $('#nombre-mundo').textContent = mundo.nombre;
        $('#espacio').classList.remove('activa'); $('#mundo').classList.add('activa');
        await visor.cargarMundo(mundo);
      }
      if (estId && estado.estacion !== estId) {
        if (estado.estacion) await visor.salirDetalle();
        estado.estacion = estId;
        await visor.entrarDetalle(estId);
      } else if (!estId && estado.estacion) {
        estado.estacion = null;
        await visor.salirDetalle();
      }
    }
  } finally {
    ocupado = false; pintarIndice();
    $('#btn-volver').textContent = estado.estacion
      ? `⬅ ${MUNDOS.find((m) => m.id === estado.mundo).nombre}` : '⬅ El espacio';
  }
}
$('#btn-volver').onclick = () => (estado.estacion ? irA(estado.mundo) : irA(null));
addEventListener('keydown', (e) => { if (e.key === 'Escape' && estado.mundo) $('#btn-volver').click(); });

/* =====================================================================
   ESCENA 2: VISOR 3D
   ===================================================================== */
const visor = (() => {
  const lienzo = $('#lienzo'), caja = $('#visor');
  const renderer = new THREE.WebGLRenderer({ canvas: lienzo, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.toneMappingExposure = 0.85;
  const escena = new THREE.Scene(); escena.environmentIntensity = 0.75;
  escena.environment = new THREE.PMREMGenerator(renderer).fromScene(new RoomEnvironment(), 0.04).texture;
  const sol = new THREE.DirectionalLight(0xffffff, 1.4); sol.position.set(3, 5, 4); escena.add(sol);
  escena.add(new THREE.HemisphereLight(0xbfd4ff, 0x30241a, 0.4));
  const camara = new THREE.PerspectiveCamera(35, 1, 0.05, 100);
  const controles = new OrbitControls(camara, lienzo);
  controles.enablePan = false; controles.enableDamping = true; controles.enabled = false;
  controles.autoRotateSpeed = 1.6;
  controles.addEventListener('start', () => { if (controles.autoRotate) ponerGiro(false); });

  const gltf = new GLTFLoader();
  const draco = new DRACOLoader(); draco.setDecoderPath('libs/draco/'); gltf.setDRACOLoader(draco);
  const cache = new Map();          // id estación -> objeto estación
  let actuales = [];                // estaciones del mundo visible
  let sel = null;                   // estación en detalle
  let piezaSel = null;
  let activo = false, enTransito = false;
  let vista = { pos: new THREE.Vector3(0, 0, 6), obj: new THREE.Vector3() }; // cámara general

  /* ---------- Cargar y preparar un modelo ---------- */
  async function cargarEstacion(def) {
    if (cache.has(def.id)) return cache.get(def.id);
    const raiz = (await gltf.loadAsync(def.modelo)).scene;
    raiz.updateMatrixWorld(true);
    const caja0 = new THREE.Box3().setFromObject(raiz);
    const tam = caja0.getSize(new THREE.Vector3()), cen = caja0.getCenter(new THREE.Vector3());
    const s = 1 / Math.max(tam.x, tam.y, tam.z);
    const ancho = Math.max(tam.x, tam.z);

    // 1) asignar cada malla a una pieza
    const mallas = [];
    raiz.traverse((o) => { if (o.isMesh) mallas.push(o); });
    const resto = def.piezas.find((p) => p.resto);
    for (const m of mallas) {
      const b = new THREE.Box3().setFromObject(m);
      const c = b.getCenter(new THREE.Vector3()), t = b.getSize(new THREE.Vector3());
      const yFrac = (c.y - caja0.min.y) / tam.y, aFrac = Math.max(t.x, t.z) / ancho;
      let pieza = null, dueno = m;
      for (const p of def.piezas) {
        if (p.match) {
          for (let o = m; o && o !== raiz.parent; o = o.parent) {
            if (p.match.some((k) => (o.name || '').includes(k))) { pieza = p; dueno = o; break; }
          }
        } else if (p.zona) {
          const z = p.zona;
          if (yFrac >= z.yMin && yFrac < z.yMax && aFrac >= (z.anchoMin || 0)) pieza = p;
        }
        if (pieza) break;
      }
      pieza = pieza || resto || null;
      m.userData.pieza = pieza ? pieza.id : null;
      m.userData.dueno = dueno.uuid;
      m.userData.caja = b;
    }

    // 2) aplanar: todas las mallas cuelgan de un solo grupo, así cada una se mueve sola
    const sosten = new THREE.Group();
    for (const m of mallas) sosten.attach(m);
    sosten.scale.setScalar(s);
    sosten.position.set(-cen.x * s, -caja0.min.y * s, -cen.z * s);
    const grupo = new THREE.Group(); grupo.add(sosten);
    const alto = tam.y * s;
    const aLocal = (v) => new THREE.Vector3((v.x - cen.x) * s, (v.y - caja0.min.y) * s, (v.z - cen.z) * s);

    // 3) dirección en la que se separa cada malla al desarmar
    const centroModelo = new THREE.Vector3(0, alto / 2, 0);
    for (const p of def.piezas) {
      const mias = mallas.filter((m) => m.userData.pieza === p.id);
      if (!mias.length) { console.warn(`[${def.id}] pieza sin mallas:`, p.id); continue; }
      const cajaP = new THREE.Box3(); mias.forEach((m) => cajaP.union(m.userData.caja));
      const cP = aLocal(cajaP.getCenter(new THREE.Vector3()));
      p._centro = cP;
      const fija = p.mover ? new THREE.Vector3(...p.mover) : null;
      const porDueno = new Map();
      if (p.separar === 'radial') {
        for (const m of mias) {
          if (!porDueno.has(m.userData.dueno)) porDueno.set(m.userData.dueno, new THREE.Box3());
          porDueno.get(m.userData.dueno).union(m.userData.caja);
        }
      }
      for (const m of mias) {
        let d;
        if (p.separar === 'radial') {
          const c = aLocal(porDueno.get(m.userData.dueno).getCenter(new THREE.Vector3()));
          d = new THREE.Vector3(c.x, 0, c.z);
          if (d.length() < 0.02) d.set(0, 1, 0);
          d.normalize().multiplyScalar(p.distancia || 0.3);
          if (fija) d.add(fija);
        } else if (fija) d = fija.clone();
        else if (p.resto) d = new THREE.Vector3();
        else {
          d = cP.clone().sub(centroModelo);
          if (d.length() < 0.06) d.set(0, 1, 0);
          d.normalize().multiplyScalar(0.42);
        }
        m.userData.dir = d.divideScalar(s);          // a unidades del modelo
      }
    }
    for (const m of mallas) {
      m.userData.base = m.position.clone();
      m.userData.dir = m.userData.dir || new THREE.Vector3();
      m.material = Array.isArray(m.material) ? m.material.map((x) => x.clone()) : m.material.clone();
      const mats = Array.isArray(m.material) ? m.material : [m.material];
      m.userData.orig = mats.map((x) => ({ t: x.transparent, o: x.opacity, d: x.depthWrite }));
    }

    // 4) base luminosa y caja invisible para detectar el toque
    const aro = new THREE.Mesh(
      new THREE.RingGeometry(0.5, 0.56, 48),
      new THREE.MeshBasicMaterial({ color: 0xffb627, transparent: true, opacity: 0.7, side: THREE.DoubleSide }));
    aro.rotation.x = -Math.PI / 2; aro.position.y = -0.02; grupo.add(aro);
    const toque = new THREE.Mesh(new THREE.BoxGeometry(1, Math.max(alto, 0.5), 1), new THREE.MeshBasicMaterial({ visible: false }));
    toque.position.y = alto / 2; grupo.add(toque);

    const est = { def, grupo, sosten, mallas, alto, aro, toque, t: 0, etiqueta: null };
    toque.userData.est = est;
    grupo.rotation.y = def.giro || 0;
    cache.set(def.id, est);
    return est;
  }

  function desarmar(est, t) {
    est.t = t;
    for (const m of est.mallas) m.position.copy(m.userData.base).addScaledVector(m.userData.dir, t);
  }
  function resaltar(est, piezaId) {
    for (const m of est.mallas) {
      const tenue = piezaId && m.userData.pieza !== piezaId;
      const mats = Array.isArray(m.material) ? m.material : [m.material];
      mats.forEach((x, i) => {
        const o = m.userData.orig[i];
        x.transparent = tenue ? true : o.t; x.opacity = tenue ? 0.16 : o.o; x.depthWrite = tenue ? false : o.d;
        x.needsUpdate = true;
      });
    }
  }

  /* ---------- Vista general del mundo ---------- */
  function acomodar() {
    const n = actuales.length; if (!n) return;
    const asp = camara.aspect;
    const cols = n === 1 ? 1 : (asp < 0.9 ? 2 : n);
    const filas = Math.ceil(n / cols), dx = 1.3, dy = 1.7;
    actuales.forEach((e, i) => {
      const c = i % cols, f = Math.floor(i / cols);
      e.grupo.position.set((c - (cols - 1) / 2) * dx, -(f - (filas - 1) / 2) * dy - 0.45, 0);
    });
    const W = cols * dx + 0.2, H = filas * dy + 0.5;
    const tg = Math.tan(THREE.MathUtils.degToRad(camara.fov / 2));
    const dist = Math.max(H / 2 / tg, W / 2 / tg / asp);
    vista.obj.set(0, 0.1, 0);
    vista.pos.set(0, 0.1 + dist * 0.16, dist);
    if (!sel && !enTransito) { camara.position.copy(vista.pos); camara.lookAt(vista.obj); controles.target.copy(vista.obj); }
  }
  function ajustarTamano() {
    const w = caja.clientWidth, h = caja.clientHeight; if (!w || !h) return;
    renderer.setSize(w, h, false); camara.aspect = w / h; camara.updateProjectionMatrix();
    acomodar();
    if (sel && !enTransito) enfocar(sel, 0);
  }
  new ResizeObserver(ajustarTamano).observe(caja);

  async function cargarMundo(mundo) {
    activo = true; sel = null;
    actuales.forEach((e) => { escena.remove(e.grupo); e.etiqueta?.remove(); });
    actuales = [];
    $('#cargando').hidden = false; $('#pista').hidden = true;
    let listos = 0;
    $('#cargando-txt').textContent = `Cargando naves… 0/${mundo.estaciones.length}`;
    const ests = await Promise.all(mundo.estaciones.map(async (d) => {
      const e = await cargarEstacion(d);
      $('#cargando-txt').textContent = `Cargando naves… ${++listos}/${mundo.estaciones.length}`;
      return e;
    }));
    actuales = ests;
    for (const e of ests) {
      desarmar(e, 0); resaltar(e, null);
      e.grupo.visible = true; e.aro.visible = true; escena.add(e.grupo);
      const et = document.createElement('button');
      et.className = 'etiqueta' + (prog.completas[e.def.id] ? ' hecha' : '');
      et.innerHTML = `${e.def.nombre}<small>${e.def.anio}</small>`;
      et.onclick = () => irA(estado.mundo, e.def.id);
      $('#etiquetas').append(et); e.etiqueta = et;
    }
    $('#cargando').hidden = true; $('#pista').hidden = false;
    ajustarTamano(); bucle();
  }

  /* ---------- Vista de detalle ---------- */
  function animar(ms, paso) {
    return new Promise((fin) => {
      if (ms <= 0) { paso(1); return fin(); }
      const t0 = performance.now();
      (function f(now) {
        const k = Math.min(1, (now - t0) / ms), e = k < .5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2;
        paso(e); k < 1 ? requestAnimationFrame(f) : fin();
      })(t0);
    });
  }
  function puntoDetalle(est) {
    const obj = est.grupo.position.clone().add(new THREE.Vector3(0, est.alto / 2, 0));
    const tg = Math.tan(THREE.MathUtils.degToRad(camara.fov / 2));
    const dist = Math.max(1.2 / tg, 1.2 / tg / camara.aspect) * 0.9;
    const pos = obj.clone().add(new THREE.Vector3(dist * 0.55, dist * 0.28, dist * 0.8).setLength(dist));
    return { obj, pos, dist };
  }
  function enfocar(est, ms) {
    const { obj, pos, dist } = puntoDetalle(est);
    controles.minDistance = dist * 0.35; controles.maxDistance = dist * 1.8;
    const p0 = camara.position.clone(), o0 = controles.target.clone();
    return animar(ms, (k) => {
      camara.position.lerpVectors(p0, pos, k); controles.target.lerpVectors(o0, obj, k); camara.lookAt(controles.target);
    });
  }
  function ponerGiro(si) {
    controles.autoRotate = si; $('#btn-girar').setAttribute('aria-pressed', String(si));
  }

  async function entrarDetalle(id) {
    const est = actuales.find((e) => e.def.id === id); if (!est) return;
    sel = est; piezaSel = null;
    document.body.classList.add('detalle');
    $('#pista').hidden = true; $('#etiquetas').hidden = true;
    actuales.forEach((e) => { e.grupo.visible = e === est; });
    est.aro.visible = false;
    pintarPanel(est);
    $('#panel').hidden = false; $('#controles').hidden = false;
    $('#desarmar').value = 0;
    enTransito = true; ajustarTamano();
    await enfocar(est, 800);
    enTransito = false;
    controles.enabled = true; ponerGiro(true);
    if (!prog.estaciones[id]) { prog.estaciones[id] = true; premio('¡Nave encontrada!', 10); }
  }
  async function salirDetalle() {
    if (!sel) return;
    const est = sel;
    controles.enabled = false; ponerGiro(false);
    const t0 = est.t;
    resaltar(est, null);
    document.body.classList.remove('detalle');
    $('#panel').hidden = true; $('#controles').hidden = true; $('#vineta').hidden = true;
    sel = null; piezaSel = null;
    enTransito = true; ajustarTamano();        // recalcula la vista general sin mover la cámara todavía
    const p0 = camara.position.clone(), o0 = controles.target.clone();
    await animar(700, (k) => {
      desarmar(est, t0 * (1 - k));
      camara.position.lerpVectors(p0, vista.pos, k); controles.target.lerpVectors(o0, vista.obj, k); camara.lookAt(controles.target);
    });
    enTransito = false;
    actuales.forEach((e) => { e.grupo.visible = true; e.aro.visible = true; });
    $('#etiquetas').hidden = false; $('#pista').hidden = false;
  }

  /* ---------- Panel e interacción con piezas ---------- */
  function pintarPanel(est) {
    const d = est.def;
    $('#f-anio').textContent = d.anio; $('#f-nombre').textContent = d.nombre;
    $('#f-resumen').textContent = d.resumen || ''; $('#f-texto').textContent = d.texto || '';
    $('#f-datos').replaceChildren(...(d.datos || []).map((t) => Object.assign(document.createElement('li'), { textContent: t })));
    const cont = $('#f-piezas'); cont.replaceChildren();
    for (const p of d.piezas) {
      if (!est.mallas.some((m) => m.userData.pieza === p.id)) continue;
      const b = document.createElement('button');
      b.className = 'chip' + (prog.piezas[d.id + ':' + p.id] ? ' vista' : '');
      b.dataset.pieza = p.id; b.textContent = p.nombre;
      b.onclick = () => elegirPieza(piezaSel === p.id ? null : p.id, true);
      cont.append(b);
    }
    contar(est);
  }
  function contar(est) {
    const ids = [...$('#f-piezas').children].map((b) => b.dataset.pieza);
    const vistas = ids.filter((id) => prog.piezas[est.def.id + ':' + id]).length;
    $('#f-conteo').textContent = `(${vistas}/${ids.length})`;
    if (vistas === ids.length && !prog.completas[est.def.id]) {
      prog.completas[est.def.id] = true;
      setTimeout(() => premio('🏅 ¡Misión completa!', 25), 900);
      est.etiqueta?.classList.add('hecha'); pintarIndice();
    }
  }
  function elegirPieza(id, fijar) {
    if (!sel) return;
    if (id === piezaSel && !fijar) return;
    if (id !== piezaSel) { piezaSel = id; resaltar(sel, id); }
    [...$('#f-piezas').children].forEach((b) => b.classList.toggle('activa', b.dataset.pieza === id));
    if (!id) { $('#vineta').hidden = true; return; }
    const p = sel.def.piezas.find((x) => x.id === id);
    $('#vineta-nombre').textContent = p.nombre; $('#vineta-para').textContent = p.para;
    $('#vineta').hidden = false; $('#panel').scrollTop = 0;
    if (fijar) {
      if (controles.autoRotate) ponerGiro(false);
      const k = sel.def.id + ':' + id;
      if (!prog.piezas[k]) {
        prog.piezas[k] = true; premio('¡Pieza descubierta!', 5);
        $('#f-piezas').querySelector(`[data-pieza="${id}"]`)?.classList.add('vista');
        contar(sel);
      }
    }
  }

  const rayo = new THREE.Raycaster(), ptr = new THREE.Vector2();
  function apuntar(ev, objetos) {
    const r = lienzo.getBoundingClientRect();
    ptr.set(((ev.clientX - r.left) / r.width) * 2 - 1, -((ev.clientY - r.top) / r.height) * 2 + 1);
    rayo.setFromCamera(ptr, camara);
    return rayo.intersectObjects(objetos, false)[0];
  }
  let abajo = null, fijada = false, pendiente = null;
  lienzo.addEventListener('pointerdown', (e) => { abajo = { x: e.clientX, y: e.clientY }; });
  lienzo.addEventListener('pointerup', (e) => {
    if (!abajo || Math.hypot(e.clientX - abajo.x, e.clientY - abajo.y) > 7) { abajo = null; return; }
    abajo = null;
    if (!sel) {
      const h = apuntar(e, actuales.map((x) => x.toque));
      if (h) irA(estado.mundo, h.object.userData.est.def.id);
    } else {
      const h = apuntar(e, sel.mallas);
      fijada = !!h; elegirPieza(h ? h.object.userData.pieza : null, true);
    }
  });
  lienzo.addEventListener('pointermove', (e) => {
    if (e.pointerType !== 'mouse' || e.buttons) return;
    pendiente = e;
  });
  function revisarPuntero() {
    if (!pendiente) return; const e = pendiente; pendiente = null;
    if (!sel) {
      const h = apuntar(e, actuales.map((x) => x.toque));
      lienzo.style.cursor = h ? 'pointer' : '';
      actuales.forEach((x) => x.sosten.parent.scale.setScalar(h && h.object.userData.est === x ? 1.08 : 1));
    } else if (!fijada) {
      const h = apuntar(e, sel.mallas);
      lienzo.style.cursor = h ? 'pointer' : 'grab';
      elegirPieza(h ? h.object.userData.pieza : null, false);
    }
  }

  $('#desarmar').addEventListener('input', (e) => { if (sel) desarmar(sel, e.target.value / 100); });
  $('#btn-girar').onclick = () => ponerGiro(!controles.autoRotate);

  /* ---------- Bucle de dibujo ---------- */
  let corriendo = false; const v = new THREE.Vector3(); let ultimo = 0;
  function bucle() {
    if (corriendo) return; corriendo = true;
    renderer.setAnimationLoop((ahora) => {
      if (!activo) { renderer.setAnimationLoop(null); corriendo = false; return; }
      const dt = Math.min(0.05, (ahora - ultimo) / 1000 || 0); ultimo = ahora;
      revisarPuntero();
      if (!sel) {
        for (const e of actuales) {
          e.grupo.rotation.y += dt * 0.35;
          if (e.etiqueta) {
            v.copy(e.grupo.position); v.y -= 0.1; v.project(camara);
            e.etiqueta.style.left = ((v.x + 1) / 2 * caja.clientWidth) + 'px';
            e.etiqueta.style.top = ((1 - v.y) / 2 * caja.clientHeight) + 'px';
          }
        }
      } else if (controles.enabled) controles.update();
      renderer.render(escena, camara);
    });
  }
  function pausar() { activo = false; }

  return { cargarMundo, entrarDetalle, salirDetalle, pausar, _dbg: { cache, escena, camara } };
})();
window.__visor = visor;

/* =====================================================================
   ARRANQUE
   ===================================================================== */
$('#titulo').textContent = TEXTOS.titulo;
$('#subtitulo').textContent = TEXTOS.subtitulo;
document.title = TEXTOS.titulo;
$('#globo').textContent = TEXTOS.bienvenida;
pintarMarcador(); pintarIndice();
const listo = () => { colocarCohete('tierra', false); cohete.classList.add('quieto'); };
if (document.readyState === 'complete') listo(); else addEventListener('load', listo);
