import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { MUNDOS } from './datos.js';
import { UI, NARRACION, PROPOSITO, NOSOTROS, IDIOMA_INICIAL } from './textos.js';

const $ = (s) => document.querySelector(s);
const ESTACIONES = MUNDOS.flatMap((m) => m.estaciones);
const TOTAL = ESTACIONES.length;
const espera = (ms) => new Promise((r) => setTimeout(r, ms));
const crear = (tag, cls, texto) => {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (texto != null) e.textContent = texto;
  return e;
};

/* =====================================================================
   IDIOMA (inglés / español)
   ===================================================================== */
let idioma = IDIOMA_INICIAL;
try { const g = localStorage.getItem('starlight-idioma'); if (g === 'es' || g === 'en') idioma = g; } catch (e) { /* sin memoria */ }
// L: elige el texto del idioma actual.  U: texto de la interfaz por su clave.
const L = (o) => (o == null ? '' : typeof o === 'string' ? o : (o[idioma] ?? o.es ?? ''));
const U = (k, vars) => {
  let s = L(UI[k]);
  if (vars) for (const [a, b] of Object.entries(vars)) s = s.replace('{' + a + '}', b);
  return s;
};

function aplicarIdioma() {
  document.documentElement.lang = idioma;
  document.querySelectorAll('[data-i18n]').forEach((el) => { el.textContent = U(el.dataset.i18n); });
  $('#btn-idioma').querySelectorAll('b').forEach((b) => b.classList.toggle('on', b.dataset.lang === idioma));
  $('#btn-idioma').title = U('cambiarIdioma'); $('#btn-idioma').setAttribute('aria-label', U('cambiarIdioma'));
  $('#btn-menu').setAttribute('aria-label', U('indice'));
  $('#desplegable-cerrar').setAttribute('aria-label', U('cerrar'));
  $('#titulo').textContent = U('titulo'); $('#subtitulo').textContent = U('subtitulo');
  document.title = U('titulo');
  $('#lbl-luna').textContent = L(MUNDOS.find((m) => m.id === 'luna').nombre);
  $('#lbl-marte').textContent = L(MUNDOS.find((m) => m.id === 'marte').nombre);
  pintarSonido(); pintarIndice(); pintarGlobo(); pintarVolver(); pintarTab();
  visor.repintar();
  relato?.repintar();
}
$('#btn-idioma').onclick = () => {
  idioma = idioma === 'en' ? 'es' : 'en';
  try { localStorage.setItem('starlight-idioma', idioma); } catch (e) { /* sin memoria */ }
  aplicarIdioma();
};

/* =====================================================================
   PROGRESO (puntos e insignias) — se guarda en el navegador
   ===================================================================== */
const CLAVE = 'starlight-progreso-v1';
const progNuevo = () => ({ puntos: 0, estaciones: {}, piezas: {}, informes: {}, preguntas: {}, quiz: {}, completas: {}, relatos: {}, finalVisto: false });
let prog = progNuevo();
try { Object.assign(prog, JSON.parse(localStorage.getItem(CLAVE) || '{}')); } catch (e) { /* sin memoria */ }
const guardar = () => { try { localStorage.setItem(CLAVE, JSON.stringify(prog)); } catch (e) { /* sin memoria */ } };
const todoCompleto = () => ESTACIONES.every((e) => prog.completas[e.id]);

function aviso(texto) {
  const d = crear('div', 'premio');
  d.append(Object.assign(crear('img'), { src: 'img/estrellas-1.webp', alt: '' }), texto);
  $('#aviso').replaceChildren(d);
}
function premio(texto, pts) {
  prog.puntos += pts; guardar(); pintarMarcador();
  aviso(`${texto} +${pts}`);
  $('#puntos').classList.remove('salta'); void $('#puntos').offsetWidth; $('#puntos').classList.add('salta');
}
function pintarMarcador() {
  $('#puntos').textContent = `⭐ ${prog.puntos}`;
  $('#insignias').textContent = `${Object.keys(prog.completas).length}/${TOTAL} 🚀`;
}

/* =====================================================================
   NARRACIÓN: audio + texto que se ilumina mientras se escucha
   ===================================================================== */
let silencio = false;
try { silencio = localStorage.getItem('starlight-silencio') === '1'; } catch (e) { /* sin memoria */ }
const audio = new Audio(); audio.preload = 'auto'; audio.muted = silencio;
let narr = null;                       // narración en curso
const pararVoz = () => { narr?.parar(); };

function pintarSonido() {
  const b = $('#btn-sonido');
  b.textContent = silencio ? '🔇' : '🔊';
  b.title = U(silencio ? 'sonidoOff' : 'sonidoOn'); b.setAttribute('aria-label', b.title);
  b.setAttribute('aria-pressed', String(!silencio));
}
$('#btn-sonido').onclick = () => {
  silencio = !silencio; audio.muted = silencio;
  try { localStorage.setItem('starlight-silencio', silencio ? '1' : '0'); } catch (e) { /* sin memoria */ }
  pintarSonido();
};
// Algunos celulares solo dejan sonar audio después de un toque: se "despierta" en el primer toque.
addEventListener('pointerdown', () => {
  if (narr) return;
  audio.src = 'data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA=';
  audio.play().catch(() => {});
}, { once: true, capture: true });

function textoCompleto(el, clave) {      // el texto entero, sin animación
  el.replaceChildren(...L(NARRACION[clave]).split(/\s+/).flatMap((p) => [crear('span', 'dicha', p), ' ']));
}
/* Reproduce audio/<clave>-<idioma>.mp3 y va iluminando las palabras en "el".
   Devuelve { fin: promesa ('fin' o 'parado'), parar() }. */
function narrar(clave, el) {
  pararVoz();
  el.replaceChildren();
  const spans = [], ini = []; let largo = 0;
  for (const p of L(NARRACION[clave]).split(/\s+/)) {
    const s = crear('span', '', p); el.append(s, ' '); spans.push(s); ini.push(largo);
    largo += p.length + 1 + (/[.!?:]$/.test(p) ? 10 : /[,;]$/.test(p) ? 4 : 0);   // las pausas también cuentan
  }
  let vivo = true, raf = 0, conAudio = true, t0 = performance.now(), resolver;
  const fin = new Promise((r) => { resolver = r; });
  const pintar = (frac) => { const lim = frac * largo; spans.forEach((s, i) => s.classList.toggle('dicha', ini[i] <= lim)); };
  const terminar = (motivo) => {
    if (!vivo) return; vivo = false;
    cancelAnimationFrame(raf); audio.pause();
    if (narr === ctl) narr = null;
    if (motivo === 'fin') pintar(2);
    resolver(motivo);
  };
  const sinAudio = () => { if (vivo && conAudio) { conAudio = false; t0 = performance.now(); } };   // si falla el audio, el texto sigue solo
  const paso = () => {
    if (!vivo) return;
    let frac;
    if (conAudio) {
      if (audio.ended) return terminar('fin');
      frac = audio.duration ? audio.currentTime / audio.duration : 0;
    } else {
      frac = (performance.now() - t0) / 1000 / (largo / 15.5);
      if (frac >= 1) return terminar('fin');
    }
    pintar(frac); raf = requestAnimationFrame(paso);
  };
  const ctl = { fin, clave, parar: () => terminar('parado') };
  narr = ctl;
  audio.onerror = sinAudio;
  audio.src = `audio/${clave}-${idioma}.mp3`;
  audio.muted = silencio;
  audio.play().catch(sinAudio);
  paso();
  return ctl;
}

/* Frase corta al llegar a una nave: solo audio + subtítulo, sin imagen */
let subActual = null;
function decirLinea(clave) {
  const el = $('#voz-sub'); el.hidden = false;
  const n = narrar(clave, el); subActual = n;
  n.fin.then(async (m) => {
    if (m === 'fin') await espera(1800);
    if (subActual === n) { el.hidden = true; subActual = null; }
  });
}

/* =====================================================================
   PANTALLAS DE HISTORIA: inicio, Luna, Marte y final
   ===================================================================== */
let relato = null;                     // pantalla abierta
function mostrarRelato(id, faseInicial) {
  relato?.cerrar('otro');
  return new Promise((listo) => {
    const caja = $('#relato');
    let fase = faseInicial;
    const cerrar = (res) => {
      if (relato !== yo) return;
      relato = null; pararVoz();
      caja.classList.remove('visible'); caja.hidden = true;
      listo(res);
    };
    const botones = (...defs) => $('#relato-botones').replaceChildren(...defs.map(([txt, fn, cls]) => {
      const b = crear('button', 'boton ' + (cls || ''), txt); b.onclick = fn; return b;
    }));
    const estadisticas = () => {
      const piezasTot = ESTACIONES.reduce((n, e) => n + e.piezas.length, 0);
      const aciertos = Object.values(prog.quiz).reduce((n, q) => n + q.a, 0);
      const fila = (v, k) => { const d = crear('div'); d.append(crear('strong', '', v), crear('span', '', U(k))); return d; };
      $('#relato-stats').replaceChildren(
        fila(`⭐ ${prog.puntos}`, 'finPuntos'),
        fila(`${Object.keys(prog.completas).length}/${TOTAL}`, 'finNaves'),
        fila(`${Math.min(Object.keys(prog.piezas).length, piezasTot)}/${piezasTot}`, 'finPiezas'),
        fila(`${aciertos}/${TOTAL * 3}`, 'finAciertos'));
    };
    function pintar(nueva) {
      fase = nueva;
      const mundo = MUNDOS.find((m) => m.id === id);
      $('#relato-titulo').textContent = id === 'inicio' ? U('titulo') : id === 'final' ? U('finTitulo') : L(mundo.nombre);
      $('#relato-lema').hidden = fase !== 'portada'; $('#relato-lema').textContent = U('lema');
      $('#relato-texto').hidden = fase === 'portada';
      $('#relato-pista').hidden = !mundo || fase === 'portada'; $('#relato-pista').textContent = U('pistaRelato');
      $('#relato-stats').hidden = id !== 'final';
      if (id === 'final') estadisticas();
      const finales = [
        [U('finTierra'), () => cerrar('tierra'), 'principal'],
        [U('finSeguir'), () => cerrar('seguir')],
        [U('reiniciar'), () => cerrar('reiniciar')],
      ];
      if (fase === 'portada') {
        botones([U('iniciar'), () => pintar('narrando'), 'principal'], [U('saltarIntro'), () => cerrar('saltar')]);
      } else if (fase === 'narrando') {
        if (id === 'final') botones(...finales);
        else botones([U(id === 'inicio' ? 'saltar' : 'saltarInfo'), () => cerrar('saltar')]);
        narrar(id, $('#relato-texto')).fin.then((m) => { if (m === 'fin' && relato === yo && fase === 'narrando') pintar('listo'); });
      } else {
        textoCompleto($('#relato-texto'), id);
        if (id === 'final') botones(...finales);
        else botones([U(id === 'inicio' ? 'despegar' : 'explorar'), () => cerrar('ok'), 'principal']);
      }
    }
    const yo = { id, cerrar, repintar: () => pintar(fase) };
    relato = yo;
    cerrarTab();
    caja.dataset.id = id;
    $('#relato-img').style.backgroundImage = `url(img/escena-${id}.webp)`;
    caja.hidden = false; void caja.offsetWidth; caja.classList.add('visible');
    pintar(fase);
  });
}

async function mostrarFinal() {
  prog.finalVisto = true; guardar();
  const r = await mostrarRelato('final', 'narrando');
  if (r === 'tierra') {
    await irA(null); await volarA('tierra');
    globoClave = 'deVuelta'; pintarGlobo();
  } else if (r === 'reiniciar') reiniciar();
}
async function reiniciar() {
  prog = progNuevo(); guardar(); pintarMarcador();
  visor.olvidar();
  await irA(null);
  cohetEn = 'tierra'; colocarCohete('tierra', false);
  globoClave = 'bienvenida'; pintarGlobo(); pintarIndice();
  mostrarRelato('inicio', 'portada');
}

/* =====================================================================
   PESTAÑAS DEL HEADER: Propósito y Quiénes somos
   (se abren al pasar el cursor o al hacer clic; clic las deja fijas)
   ===================================================================== */
let tabAbierta = null, tabFija = false, tCierre = 0;
function pintarTab() {
  if (!tabAbierta) return;
  const c = $('#desplegable-cuerpo'); c.replaceChildren();
  if (tabAbierta === 'proposito') {
    c.append(crear('h2', '', U('tabProposito')), ...L(PROPOSITO).map((t) => crear('p', '', t)), crear('p', 'nota', U('avisoIA')));
  } else {
    c.append(crear('h2', '', U('tabNosotros')));
    for (const p of NOSOTROS) {
      const a = crear('article');
      a.append(crear('h3', '', p.nombre), crear('small', '', L(p.rol)), ...L(p.texto).map((t) => crear('p', '', t)), crear('blockquote', '', L(p.frase)));
      c.append(a);
    }
  }
}
function abrirTab(id, fijar) {
  clearTimeout(tCierre);
  const cambia = tabAbierta !== id;
  tabAbierta = id; tabFija = fijar;
  document.querySelectorAll('.tab').forEach((b) => b.setAttribute('aria-expanded', String(b.dataset.tab === id)));
  $('#desplegable').hidden = false; $('#desplegable').classList.toggle('fija', fijar);
  if (cambia) { pintarTab(); $('#desplegable').scrollTop = 0; }
}
function cerrarTab() {
  clearTimeout(tCierre);
  if (!tabAbierta) return;
  tabAbierta = null; tabFija = false;
  document.querySelectorAll('.tab').forEach((b) => b.setAttribute('aria-expanded', 'false'));
  $('#desplegable').hidden = true;
}
const conCursor = matchMedia('(hover: hover) and (pointer: fine)');
const cierreSuave = () => { if (!tabFija) { clearTimeout(tCierre); tCierre = setTimeout(cerrarTab, 280); } };
document.querySelectorAll('.tab').forEach((b) => {
  b.onclick = (e) => { e.stopPropagation(); (tabAbierta === b.dataset.tab && tabFija) ? cerrarTab() : abrirTab(b.dataset.tab, true); };
  b.onmouseenter = () => { if (conCursor.matches && !tabFija) abrirTab(b.dataset.tab, false); };
  b.onmouseleave = cierreSuave;
});
$('#desplegable').onmouseenter = () => clearTimeout(tCierre);
$('#desplegable').onmouseleave = cierreSuave;
$('#desplegable').onclick = (e) => e.stopPropagation();
$('#desplegable-cerrar').onclick = cerrarTab;
addEventListener('click', cerrarTab);

/* =====================================================================
   ÍNDICE (barra lateral)
   ===================================================================== */
const estado = { mundo: null, estacion: null };   // dónde está el jugador

function pintarIndice() {
  const nav = $('#indice'); nav.replaceChildren();
  const boton = (partes, cls, fn, actual) => {
    const b = crear('button', cls + (actual ? ' actual' : ''));
    b.append(...partes);
    b.onclick = () => { if (matchMedia('(max-width:760px)').matches) document.body.classList.add('menu-cerrado'); fn(); };
    nav.append(b);
  };
  const icono = (src) => Object.assign(crear('img'), { src, alt: '' });
  boton([icono('img/tierra.webp'), U('espacio')], '', () => irA(null), !estado.mundo);
  for (const m of MUNDOS) {
    boton([icono(m.boton), L(m.nombre)], '', () => irA(m.id), estado.mundo === m.id && !estado.estacion);
    for (const e of m.estaciones) {
      const partes = [`${e.anio} · ${L(e.nombre)}`];
      if (prog.completas[e.id]) partes.push(crear('span', 'hecho', '✓'));
      boton(partes, 'sub', () => irA(m.id, e.id), estado.estacion === e.id);
    }
  }
  if (todoCompleto()) boton([U('verFinal')], 'final', () => mostrarFinal(), false);
}
$('#btn-menu').onclick = () => document.body.classList.toggle('menu-cerrado');
$('#velo').onclick = () => document.body.classList.add('menu-cerrado');
$('#btn-reiniciar').onclick = () => { if (!ocupado) reiniciar(); };
if (matchMedia('(min-width:761px)').matches) document.body.classList.remove('menu-cerrado');

/* =====================================================================
   ESCENA 1: EL ESPACIO (planetas + cohete)
   ===================================================================== */
const cohete = $('#cohete');
let cohetEn = 'tierra';
let globoClave = 'bienvenida';
const pintarGlobo = () => { $('#globo').textContent = U(globoClave); };

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
  globoClave = 'enTierra'; pintarGlobo();
}
addEventListener('resize', () => { if (!estado.mundo) colocarCohete(cohetEn, false); });

/* =====================================================================
   NAVEGACIÓN ENTRE ESCENAS (zoom)
   ===================================================================== */
let ocupado = false;
function pintarVolver() {
  const m = MUNDOS.find((x) => x.id === estado.mundo);
  $('#btn-volver').textContent = '⬅ ' + (estado.estacion && m ? L(m.nombre) : U('espacio'));
  if (m) $('#nombre-mundo').textContent = L(m.nombre);
}
async function irA(mundoId, estId = null) {
  if (ocupado) return; ocupado = true;
  try {
    if (!mundoId) {                                   // volver al espacio
      if (estado.estacion) await visor.salirDetalle();
      const estaba = !!estado.mundo;
      estado.mundo = estado.estacion = null;
      $('#mundo').classList.remove('activa'); $('#espacio').classList.add('activa');
      document.body.classList.remove('detalle');
      visor.pausar();
      globoClave = 'bienvenida'; pintarGlobo();
      if (estaba) { await espera(950); colocarCohete(cohetEn, false); }   // al terminar el zoom, el cohete queda junto al planeta
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
        pintarVolver();
        $('#espacio').classList.remove('activa'); $('#mundo').classList.add('activa');
        const carga = visor.cargarMundo(mundo);
        if (!prog.relatos[mundoId]) {                   // primera visita: se cuenta la historia
          prog.relatos[mundoId] = true; guardar();
          await espera(500);
          await mostrarRelato(mundoId, 'narrando');
        }
        await carga;
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
    ocupado = false; pintarIndice(); pintarVolver();
  }
}
$('#btn-volver').onclick = () => (estado.estacion ? irA(estado.mundo) : irA(null));
$('#btn-historia').onclick = () => { if (estado.mundo && !ocupado) mostrarRelato(estado.mundo, 'narrando'); };
addEventListener('keydown', (e) => {
  if (e.key !== 'Escape') return;
  if (tabAbierta) cerrarTab();
  else if (relato) { if (relato.id !== 'final') relato.cerrar('saltar'); else relato.cerrar('seguir'); }
  else if (estado.mundo) $('#btn-volver').click();
});

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
    $('#cargando-txt').textContent = `${U('cargando')} 0/${mundo.estaciones.length}`;
    const ests = await Promise.all(mundo.estaciones.map(async (d) => {
      const e = await cargarEstacion(d);
      $('#cargando-txt').textContent = `${U('cargando')} ${++listos}/${mundo.estaciones.length}`;
      return e;
    }));
    actuales = ests;
    for (const e of ests) {
      desarmar(e, 0); resaltar(e, null);
      e.grupo.visible = true; e.aro.visible = true; escena.add(e.grupo);
      const et = document.createElement('button');
      et.className = 'etiqueta' + (prog.completas[e.def.id] ? ' hecha' : '');
      et.append(L(e.def.nombre), crear('small', '', e.def.anio));
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
    if (!prog.estaciones[id]) { prog.estaciones[id] = true; premio(U('pNave'), 10); }
    if (est.def.voz && !oidas.has(id)) { oidas.add(id); decirLinea(est.def.voz); }   // frase corta de llegada
  }
  async function salirDetalle() {
    if (!sel) return;
    const est = sel;
    pararVoz(); $('#voz-sub').hidden = true; qz = null;
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
    $('#f-anio').textContent = d.anio; $('#f-nombre').textContent = L(d.nombre);
    $('#f-resumen').textContent = L(d.resumen);
    $('#f-que').textContent = L(d.que); $('#f-porque').textContent = L(d.porque);
    $('#f-desc').replaceChildren(...L(d.descubrimientos).map((t) => crear('li', '', t)));
    $('#f-voz').hidden = !d.voz; $('#f-voz').onclick = () => decirLinea(d.voz);
    const cont = $('#f-piezas'); cont.replaceChildren();
    for (const p of d.piezas) {
      if (!est.mallas.some((m) => m.userData.pieza === p.id)) continue;
      const b = crear('button', 'chip' + (prog.piezas[d.id + ':' + p.id] ? ' vista' : '') + (piezaSel === p.id ? ' activa' : ''), L(p.nombre));
      b.dataset.pieza = p.id;
      b.onclick = () => elegirPieza(piezaSel === p.id ? null : p.id, true);
      cont.append(b);
    }
    contar(est);
    pintarSecreto(est);
    pintarVineta();
  }
  function contar(est) {
    const ids = [...$('#f-piezas').children].map((b) => b.dataset.pieza);
    const vistas = ids.filter((id) => prog.piezas[est.def.id + ':' + id]).length;
    $('#f-conteo').textContent = `(${vistas}/${ids.length})`;
    if (vistas === ids.length && !prog.informes[est.def.id]) {       // todas las piezas vistas: se desbloquea el informe
      prog.informes[est.def.id] = true; guardar();
      setTimeout(() => {
        aviso(U('pInforme'));
        if (sel === est) { pintarSecreto(est); pintarVineta(); alPanel($('#f-secreto')); }
      }, 900);
    }
  }

  function alPanel(el) {              // desplaza solo el panel (no la página) hasta un elemento
    const p = $('#panel');
    p.scrollTo({ top: el.getBoundingClientRect().top - p.getBoundingClientRect().top + p.scrollTop - 8, behavior: 'smooth' });
  }

  /* ---------- Informe completo (bloqueado hasta explorar todas las piezas) ---------- */
  function pintarSecreto(est) {
    const d = est.def, caja = $('#f-secreto'); caja.replaceChildren();
    caja.classList.toggle('abierto', !!prog.informes[d.id]);
    if (!prog.informes[d.id]) { caja.append(crear('p', 'candado', U('bloqueado'))); return; }
    caja.append(crear('h3', 'titulo-informe', '🔓 ' + U('informe')));
    caja.append(crear('h3', '', U('datosNasa')));
    const ul = crear('ul'); ul.append(...L(d.nasa).map((t) => crear('li', '', t))); caja.append(ul);
    caja.append(crear('h3', '', U('legado')), crear('p', '', L(d.legado)));
    caja.append(crear('h3', '', U('piezasDetalle')));
    for (const p of d.piezas) {
      if (!est.mallas.some((m) => m.userData.pieza === p.id)) continue;
      const bloque = crear('p', 'pieza-detalle'); bloque.append(crear('strong', '', L(p.nombre) + '. '), L(p.detalle));
      caja.append(bloque);
    }
    caja.append(Object.assign(crear('div', 'quiz'), { id: 'f-quiz' }));
    pintarQuiz();
  }

  /* ---------- Reto: 3 preguntas al azar, con explicación ---------- */
  let qz = null;                    // { id, preguntas: [{ q, n, orden }], i, aciertos, elegida }
  const barajar = (a) => { a = [...a]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  function iniciarQuiz() {
    if (!sel) return;
    const d = sel.def;
    const preguntas = barajar(d.quiz.map((q, n) => ({ q, n }))).slice(0, 3)
      .map((x) => ({ ...x, orden: barajar(x.q.o.es.map((_, k) => k)) }));
    qz = { id: d.id, preguntas, i: 0, aciertos: 0, elegida: null };
    fijada = false; elegirPieza(null, true);            // se guarda la viñeta para dejar espacio al reto
    pintarQuiz();
    alPanel($('#f-quiz'));
  }
  function responder(k) {
    if (!qz || qz.elegida != null) return;
    const it = qz.preguntas[qz.i];
    qz.elegida = k;
    if (k === it.q.c) {
      qz.aciertos++;
      const clave = qz.id + ':' + it.n;
      if (!prog.preguntas[clave]) { prog.preguntas[clave] = true; premio(U('pAcierto'), 10); }
    }
    pintarQuiz();
    
  }
  function siguientePregunta() {
    if (!qz) return;
    qz.i++; qz.elegida = null;
    if (qz.i >= qz.preguntas.length) {
      const antes = prog.quiz[qz.id];
      if (!antes || qz.aciertos > antes.a) prog.quiz[qz.id] = { a: qz.aciertos, n: qz.preguntas.length };
      guardar();
      if (sel) completar(sel);
    }
    pintarQuiz();
  }
  function completar(est) {
    const id = est.def.id;
    if (prog.completas[id]) return;
    prog.completas[id] = true; guardar();
    setTimeout(() => premio(U('pMision'), 25), 600);
    est.etiqueta?.classList.add('hecha'); pintarIndice();
    if (todoCompleto() && !prog.finalVisto) setTimeout(mostrarFinal, 2600);      // ¡todas las misiones!
  }
  function pintarQuiz() {
    const caja = $('#f-quiz'); if (!caja || !sel) return;
    const id = sel.def.id; caja.replaceChildren(crear('h3', '', '🎯 ' + U('reto')));
    const boton = (txt, fn) => { const b = crear('button', 'boton principal', txt); b.onclick = fn; return b; };
    if (!qz || qz.id !== id) {                                   // portada del reto
      const hecho = prog.quiz[id];
      caja.append(crear('p', '', hecho ? `✅ ${U('retoHecho')}. ${U('resultado', hecho)}` : U('retoIntro')),
        boton(U(hecho ? 'retoRepetir' : 'retoEmpezar'), iniciarQuiz));
      return;
    }
    const n = qz.preguntas.length;
    if (qz.i >= n) {                                             // resultado
      caja.append(crear('p', 'resultado', `${'⭐'.repeat(qz.aciertos)}${'☆'.repeat(n - qz.aciertos)}  ${U('resultado', { a: qz.aciertos, n })}`),
        boton(U('retoRepetir'), iniciarQuiz));
      return;
    }
    const it = qz.preguntas[qz.i], ops = L(it.q.o);
    caja.append(crear('small', '', `${U('pregunta')} ${qz.i + 1}/${n}`), crear('p', 'enunciado', L(it.q.p)));
    for (const k of it.orden) {
      const b = crear('button', 'opcion', ops[k]);
      if (qz.elegida != null) {
        b.disabled = true;
        if (k === it.q.c) b.classList.add('ok'); else if (k === qz.elegida) b.classList.add('mal');
      }
      b.onclick = () => responder(k);
      caja.append(b);
    }
    if (qz.elegida != null) {
      const bien = qz.elegida === it.q.c;
      const f = crear('div', 'explica ' + (bien ? 'bien' : 'casi'));
      f.append(crear('strong', '', bien ? U('correcto') : `${U('incorrecto')} ${ops[it.q.c]}`), crear('p', '', L(it.q.x)));
      caja.append(f, boton(U(qz.i + 1 < n ? 'siguiente' : 'verResultado') + ' ▶', siguientePregunta));
    }
  }

  /* ---------- Viñeta de la pieza ---------- */
  function pintarVineta() {
    if (!sel || !piezaSel) { $('#vineta').hidden = true; return; }
    const p = sel.def.piezas.find((x) => x.id === piezaSel);
    $('#vineta-nombre').textContent = L(p.nombre); $('#vineta-para').textContent = L(p.para);
    const abierto = !!prog.informes[sel.def.id];
    $('#vineta-detalle').hidden = !abierto; $('#vineta-detalle').textContent = abierto ? L(p.detalle) : '';
    $('#vineta').hidden = false;
  }
  function elegirPieza(id, fijar) {
    if (!sel) return;
    if (id === piezaSel && !fijar) return;
    if (id !== piezaSel) { piezaSel = id; resaltar(sel, id); }
    [...$('#f-piezas').children].forEach((b) => b.classList.toggle('activa', b.dataset.pieza === id));
    pintarVineta();
    if (!id) return;
    $('#panel').scrollTop = 0;
    if (fijar) {
      if (controles.autoRotate) ponerGiro(false);
      const k = sel.def.id + ':' + id;
      if (!prog.piezas[k]) {
        prog.piezas[k] = true; premio(U('pPieza'), 5);
        $('#f-piezas').querySelector(`[data-pieza="${id}"]`)?.classList.add('vista');
        contar(sel);
      }
    }
  }

  /* ---------- Cambio de idioma / reinicio ---------- */
  const oidas = new Set();          // naves cuya frase de llegada ya sonó
  function repintar() {
    for (const e of actuales) if (e.etiqueta) e.etiqueta.replaceChildren(L(e.def.nombre), crear('small', '', e.def.anio));
    if (sel) pintarPanel(sel);
    if (subActual) decirLinea(subActual.clave);
  }
  function olvidar() {
    oidas.clear(); qz = null;
    for (const e of cache.values()) e.etiqueta?.classList.remove('hecha');
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

  return { cargarMundo, entrarDetalle, salirDetalle, pausar, repintar, olvidar, _dbg: { cache, escena, camara } };
})();
window.__visor = visor;

/* =====================================================================
   ARRANQUE
   ===================================================================== */
pintarMarcador();
aplicarIdioma();
const listo = () => { colocarCohete('tierra', false); cohete.classList.add('quieto'); };
if (document.readyState === 'complete') listo(); else addEventListener('load', listo);
mostrarRelato('inicio', 'portada');
