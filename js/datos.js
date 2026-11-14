/* =====================================================================
   DATOS DEL PROYECTO  —  ESTE ES EL ÚNICO ARCHIVO QUE NECESITAS EDITAR
   PARA CAMBIAR TEXTOS, FECHAS, PIEZAS O AGREGAR INFORMACIÓN.
   =====================================================================

   Cómo está organizado:
   - TEXTOS: título del header y mensajes generales.
   - MUNDOS: la Luna y Marte. Cada mundo tiene "estaciones" (los modelos 3D).
   - Cada estación tiene:
       nombre, anio, modelo (archivo .glb en la carpeta models/)
       resumen  -> frase corta
       texto    -> AQUÍ VA LA EXPLICACIÓN DEL HECHO HISTÓRICO
       datos    -> lista de datos rápidos (fechas, cifras)
       piezas   -> las partes que se separan del modelo
   - Cada pieza tiene:
       nombre   -> cómo se llama
       para     -> PARA QUÉ SIRVE (lo que sale en la viñeta)
       match    -> nombres internos del modelo 3D (no tocar)
       mover    -> hacia dónde se separa [derecha, arriba, al frente]
   ===================================================================== */

export const TEXTOS = {
  titulo: 'Exploradores del Espacio',          // <- texto del header
  subtitulo: 'Naves y robots de la NASA',
  bienvenida: '¡Hola, explorador! Toca la Luna o Marte para viajar en tu cohete.',
  enTierra: 'Estás en la Tierra. Desde aquí despegaron todas las misiones.',
};

export const MUNDOS = [
  /* ------------------------------ LUNA ------------------------------ */
  {
    id: 'luna',
    nombre: 'La Luna',
    boton: 'img/luna.webp',
    fondo: 'img/fondo-luna.webp',
    estaciones: [
      {
        id: 'apolo',
        nombre: 'Módulo Lunar Apolo',
        anio: '1969',
        modelo: 'models/apollo-lm.glb',
        giro: 0.6,
        resumen: 'La nave que llevó a los primeros humanos a la Luna.',
        texto:
          'El módulo lunar "Eagle" del Apolo 11 aterrizó en el Mar de la Tranquilidad el 20 de julio de 1969. ' +
          'Neil Armstrong y Buzz Aldrin fueron los primeros en caminar sobre la Luna. ' +
          '(Agrega aquí más información del hecho histórico.)',
        datos: [
          'Aterrizaje: 20 de julio de 1969',
          'Tripulación en la Luna: Armstrong y Aldrin',
          'Tiempo en la superficie: 21 horas 36 minutos',
          'Rocas recogidas: 21,55 kg',
        ],
        piezas: [
          {
            id: 'ascenso',
            nombre: 'Etapa de ascenso',
            para: 'Aquí viajaban los astronautas. Al terminar despegó de la Luna para volver a la nave que los esperaba en órbita.',
            zona: { yMin: 0.5, yMax: 1.01 },
            mover: [0, 0.38, 0],
          },
          {
            id: 'patas',
            nombre: 'Patas de aterrizaje',
            para: 'Cuatro patas con platos redondos para posarse con suavidad. Una tiene la escalera por donde bajaron los astronautas.',
            zona: { yMin: -0.01, yMax: 0.5, anchoMin: 0.75 },
            mover: [0, -0.18, 0],
          },
          {
            id: 'descenso',
            nombre: 'Etapa de descenso',
            para: 'Tiene el motor para frenar y aterrizar. Sirvió de plataforma de despegue y se quedó en la Luna para siempre.',
            resto: true,
          },
        ],
      },
    ],
  },

  /* ------------------------------ MARTE ----------------------------- */
  {
    id: 'marte',
    nombre: 'Marte',
    boton: 'img/marte.webp',
    fondo: 'img/fondo-marte.webp',
    estaciones: [
      {
        id: 'viking',
        nombre: 'Viking 1',
        anio: '1976',
        modelo: 'models/viking.glb',
        giro: 0.4,
        resumen: 'El primer aterrizaje exitoso de la NASA en Marte.',
        texto:
          'El 20 de julio de 1976 el módulo Viking 1 se posó en Marte y envió las primeras fotos desde su superficie. ' +
          'Funcionó hasta el 11 de noviembre de 1982. ' +
          '(Agrega aquí más información del hecho histórico.)',
        datos: [
          'Lanzamiento: 20 de agosto de 1975',
          'Aterrizaje: 20 de julio de 1976',
          'Fin de operaciones: 11 de noviembre de 1982',
          'Energía: 2 generadores nucleares (RTG)',
        ],
        piezas: [
          {
            id: 'brazo',
            nombre: 'Brazo muestreador',
            para: 'Un brazo robot con pala. El 28 de julio de 1976 recogió las primeras muestras de suelo marciano.',
            match: ['brazo'],
            mover: [0.45, 0.05, 0],
          },
          {
            id: 'antena',
            nombre: 'Antena parabólica',
            para: 'Apunta a la Tierra para enviar fotos y datos, y recibir órdenes.',
            match: ['antena'],
            mover: [-0.1, 0.4, 0],
          },
          {
            id: 'patas',
            nombre: 'Patas de aterrizaje',
            para: 'Tres patas que amortiguaron el golpe al tocar el suelo de Marte.',
            match: ['patas'],
            mover: [0, -0.28, 0],
          },
          {
            id: 'cuerpo',
            nombre: 'Cuerpo y laboratorio',
            para: 'Adentro lleva el laboratorio biológico que analizó el suelo buscando señales de vida, las cámaras y los instrumentos del clima.',
            resto: true,
          },
        ],
      },
      {
        id: 'opportunity',
        nombre: 'Spirit y Opportunity',
        anio: '2004',
        modelo: 'models/opportunity.glb',
        giro: 2.4,
        resumen: 'Rovers gemelos que buscaron señales de agua.',
        texto:
          'Spirit aterrizó el 3 de enero de 2004 y Opportunity el 24 de enero de 2004, en lados opuestos de Marte. ' +
          'Confirmaron que hubo agua en la superficie hace mucho tiempo. ' +
          '(Agrega aquí más información del hecho histórico.)',
        datos: [
          'Spirit: terminó en 2010, recorrió 7,7 km',
          'Opportunity: último contacto el 10 de junio de 2018',
          'Opportunity recorrió 45,16 km',
          'Objetivo: buscar señales de agua antigua',
        ],
        piezas: [
          {
            id: 'mastil',
            nombre: 'Mástil con cámaras',
            para: 'Es la "cabeza" del rover. Sus cámaras panorámicas tomaron las fotos del paisaje marciano.',
            match: ['mastil'],
            mover: [0, 0.5, 0],
          },
          {
            id: 'paneles',
            nombre: 'Paneles solares',
            para: 'Convierten la luz del Sol en electricidad. Una tormenta de polvo los tapó y apagó a Opportunity en 2018.',
            match: ['paneles'],
            mover: [0, 0.22, 0],
          },
          {
            id: 'antenas',
            nombre: 'Antenas',
            para: 'Con ellas el rover habla con la Tierra y con las naves que orbitan Marte.',
            match: ['antenas'],
            mover: [0, 0.38, -0.25],
          },
          {
            id: 'brazo',
            nombre: 'Brazo robótico',
            para: 'Lleva herramientas para estudiar las rocas de cerca, como un geólogo.',
            match: ['brazo'],
            mover: [0, 0, 0.4],
          },
          {
            id: 'ruedas',
            nombre: 'Ruedas y suspensión',
            para: 'Seis ruedas con una suspensión especial para pasar sobre rocas sin volcarse.',
            match: ['ruedas'],
            separar: 'radial',
            distancia: 0.32,
          },
          {
            id: 'cuerpo',
            nombre: 'Cuerpo',
            para: 'Una caja que protege la computadora y las baterías del frío de Marte.',
            resto: true,
          },
        ],
      },
      {
        id: 'insight',
        nombre: 'InSight',
        anio: '2018',
        modelo: 'models/insight.glb',
        giro: 0.5,
        resumen: 'El módulo que escuchó los temblores de Marte.',
        texto:
          'InSight aterrizó en Elysium Planitia el 26 de noviembre de 2018 para estudiar el interior de Marte: ' +
          'su "pulso, temperatura y reflejos". Su misión terminó el 15 de diciembre de 2022. ' +
          '(Agrega aquí más información del hecho histórico.)',
        datos: [
          'Lanzamiento: 5 de mayo de 2018',
          'Aterrizaje: 26 de noviembre de 2018',
          'Fin de misión: 15 de diciembre de 2022',
          'Diseño basado en el módulo Phoenix',
        ],
        piezas: [
          {
            id: 'brazo',
            nombre: 'Brazo robótico',
            para: 'Mide más de 1,8 metros. Levantó el sismómetro y la sonda de calor y los puso sobre el suelo.',
            match: ['arm_', 'ICC', 'lens_cap'],
          },
          {
            id: 'seis',
            nombre: 'Sismómetro (SEIS)',
            para: 'Siente los "martemotos", los temblores de Marte. Con ellos los científicos conocieron el interior del planeta.',
            match: ['SEIS', 'WTS', 'cable_01'],
          },
          {
            id: 'hp3',
            nombre: 'Sonda de calor (HP3)',
            para: 'Un termómetro pensado para medir el calor que sale del interior de Marte.',
            match: ['HP3', 'cable_02'],
          },
          {
            id: 'paneles',
            nombre: 'Paneles solares',
            para: 'Dos paneles redondos que le daban electricidad. El polvo los fue tapando hasta dejarlo sin energía.',
            match: ['panel_'],
            separar: 'radial',
            distancia: 0.3,
          },
          {
            id: 'antenas',
            nombre: 'Antenas y sensores del clima',
            para: 'Las antenas envían los datos a la Tierra. Los sensores miden viento, presión y temperatura.',
            match: ['antenna', 'RISE', 'TWINS', 'pressure'],
            mover: [0, 0.35, 0],
          },
          {
            id: 'cuerpo',
            nombre: 'Plataforma y patas',
            para: 'La base del módulo: sostiene todo y guarda la computadora y las baterías.',
            resto: true,
          },
        ],
      },
      {
        id: 'ingenuity',
        nombre: 'Ingenuity',
        anio: '2021',
        modelo: 'models/ingenuity.glb',
        giro: 0.8,
        resumen: 'El primer helicóptero que voló en otro planeta.',
        texto:
          'El 19 de abril de 2021 Ingenuity hizo el primer vuelo con motor en otro planeta. ' +
          'Iba a volar solo 5 veces, ¡pero completó 72 vuelos! Voló por última vez el 18 de enero de 2024. ' +
          '(Agrega aquí más información del hecho histórico.)',
        datos: [
          'Llegada a Marte: 18 de febrero de 2021',
          'Primer vuelo: 19 de abril de 2021',
          'Vuelos: 72 (se planearon 5)',
          'Peso: 1,8 kg',
        ],
        piezas: [
          {
            id: 'panel',
            nombre: 'Panel solar',
            para: 'Carga las baterías con la luz del Sol. Cada carga alcanza para un vuelo de unos 90 segundos.',
            match: ['solar_panel'],
            mover: [0, 0.45, 0],
          },
          {
            id: 'rotores',
            nombre: 'Rotores',
            para: 'Dos hélices de 1,2 metros que giran en sentidos contrarios. Giran rapidísimo porque el aire de Marte es muy delgado.',
            match: ['rotors_', 'parts_'],
            mover: [0, 0.3, 0],
          },
          {
            id: 'patas',
            nombre: 'Patas',
            para: 'Cuatro patas livianas y flexibles para aterrizar sin romperse.',
            match: ['leg_'],
            separar: 'radial',
            distancia: 0.3,
          },
          {
            id: 'camaras',
            nombre: 'Cámaras',
            para: 'Miran hacia abajo para que el helicóptero sepa dónde está, y toman fotos desde el aire.',
            match: ['cams'],
            mover: [0, -0.28, 0],
          },
          {
            id: 'cuerpo',
            nombre: 'Cuerpo',
            para: 'Una cajita con las baterías, la computadora y los sensores, abrigada contra el frío.',
            resto: true,
          },
        ],
      },
    ],
  },
];
