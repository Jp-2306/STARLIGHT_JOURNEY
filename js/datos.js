/* =====================================================================
   DATOS DE LAS MISIONES  —  STARLIGHT JOURNEY
   Aquí están los textos de cada nave: ficha, piezas y preguntas.
   (Los textos generales, la narración, "Propósito" y "Quiénes somos"
   están en js/textos.js)
   =====================================================================

   Todo texto que ve el usuario va en los dos idiomas:  { es: '…', en: '…' }

   Cada estación (nave) tiene:
     nombre, resumen            -> título y frase corta
     que, porque                -> "¿Qué es?" y "¿Por qué fue enviado?"
     descubrimientos            -> lista de descubrimientos científicos
     nasa                       -> datos ampliados (se DESBLOQUEAN)
     legado                     -> "Su legado hoy" (se DESBLOQUEA)
     voz                        -> nombre del audio corto de llegada (carpeta audio/)
     piezas                     -> partes que se separan del modelo
         nombre, para           -> lo que sale en la viñeta
         detalle                -> texto detallado (se DESBLOQUEA)
         match / zona / resto / mover / separar -> NO TOCAR (son del modelo 3D)
     quiz                       -> preguntas. "o" son las opciones, "c" es la
                                   posición de la correcta (0 = la primera),
                                   "x" es la explicación.
   Fuentes: páginas de la NASA y del JPL (ver LEEME.txt).
   ===================================================================== */

export const MUNDOS = [
  /* ------------------------------ LUNA ------------------------------ */
  {
    id: 'luna',
    nombre: { es: 'La Luna', en: 'The Moon' },
    boton: 'img/luna.webp',
    fondo: 'img/fondo-luna.webp',
    estaciones: [
      {
        id: 'apolo',
        anio: '1969',
        modelo: 'models/apollo-lm.glb',
        giro: 0.6,
        voz: null,
        nombre: { es: 'Módulo Lunar Apolo', en: 'Apollo Lunar Module' },
        resumen: {
          es: 'La nave que llevó a los primeros humanos a la Luna.',
          en: 'The spacecraft that carried the first humans to the Moon.',
        },
        que: {
          es: 'Una nave espacial diseñada para llevar astronautas desde la órbita lunar hasta la superficie de la Luna y permitirles regresar al módulo de mando.',
          en: 'A spacecraft designed to carry astronauts from lunar orbit down to the Moon\'s surface and let them return to the command module.',
        },
        porque: {
          es: 'Para cumplir el objetivo de llevar seres humanos a la Luna y traerlos de vuelta a la Tierra sanos y salvos.',
          en: 'To achieve the goal of taking humans to the Moon and bringing them safely back to Earth.',
        },
        descubrimientos: {
          es: [
            'Hizo posible el primer alunizaje tripulado, durante el Apolo 11.',
            'Los astronautas recogieron unos 21,7 kg de rocas y suelo lunar.',
            'Las rocas volcánicas tienen unos 3.600 millones de años: los "mares" oscuros de la Luna son antiguos flujos de lava.',
          ],
          en: [
            'It made the first crewed Moon landing possible, during Apollo 11.',
            'The astronauts collected about 21.7 kg (47.8 lb) of lunar rock and soil.',
            'The volcanic rocks are about 3.6 billion years old: the Moon\'s dark "seas" are ancient lava flows.',
          ],
        },
        nasa: {
          es: [
            'Aterrizó el 20 de julio de 1969 en el Mar de la Tranquilidad.',
            'Tripulación en la Luna: Neil Armstrong y Buzz Aldrin.',
            'Estuvo 21 horas y 36 minutos en la superficie antes de despegar.',
            'La cabina de los astronautas tenía solo 6,65 m³ de volumen.',
          ],
          en: [
            'It landed on July 20, 1969, in the Sea of Tranquility.',
            'Crew on the Moon: Neil Armstrong and Buzz Aldrin.',
            'It spent 21 hours and 36 minutes on the surface before lifting off.',
            'The astronauts\' cabin held only 6.65 cubic meters.',
          ],
        },
        legado: {
          es: 'La etapa de descenso sigue en la Luna. Las rocas que trajo el Apolo 11 todavía se estudian en laboratorios, y los científicos siguen aprendiendo de ellas sobre el origen de la Luna.',
          en: 'The descent stage is still on the Moon. The rocks Apollo 11 brought back are still studied in laboratories, and scientists keep learning from them about how the Moon formed.',
        },
        piezas: [
          {
            id: 'ascenso',
            nombre: { es: 'Etapa de ascenso', en: 'Ascent stage' },
            para: {
              es: 'Aquí viajaban los astronautas. Al terminar despegó de la Luna para volver a la nave que los esperaba en órbita.',
              en: 'The astronauts rode in here. At the end it lifted off from the Moon to rejoin the ship waiting in orbit.',
            },
            detalle: {
              es: 'Medía unos 2,8 m de alto y alojaba a la tripulación. Su motor era de empuje fijo, de unos 15.000 newtons: con él despegó de la Luna y se reunió con el módulo de mando. Fue soltada en órbita lunar el 22 de julio de 1969.',
              en: 'About 2.8 m tall, it housed the crew. Its engine had a fixed thrust of about 15,000 newtons: it lifted the astronauts off the Moon to meet the command module. It was released into lunar orbit on July 22, 1969.',
            },
            zona: { yMin: 0.5, yMax: 1.01 },
            mover: [0, 0.38, 0],
          },
          {
            id: 'patas',
            nombre: { es: 'Patas de aterrizaje', en: 'Landing legs' },
            para: {
              es: 'Cuatro patas con platos redondos para posarse con suavidad. Una tiene la escalera por donde bajaron los astronautas.',
              en: 'Four legs with round footpads for a gentle touchdown. One has the ladder the astronauts climbed down.',
            },
            detalle: {
              es: 'Mantenían la nave a unos 1,5 m del suelo, y los platos quedaban a 9,4 m uno de otro. Una pata tenía una pequeña plataforma con escalera. Viajaban plegadas y se desplegaban y trababan antes de aterrizar.',
              en: 'They held the craft about 1.5 m above the ground, with the footpads 9.4 m apart. One leg had a small platform and a ladder. They traveled folded, then swung out and locked in place before landing.',
            },
            zona: { yMin: -0.01, yMax: 0.5, anchoMin: 0.75 },
            mover: [0, -0.18, 0],
          },
          {
            id: 'descenso',
            nombre: { es: 'Etapa de descenso', en: 'Descent stage' },
            para: {
              es: 'Tiene el motor para frenar y aterrizar. Sirvió de plataforma de despegue y se quedó en la Luna para siempre.',
              en: 'It holds the engine used to brake and land. It served as the launch pad and stayed on the Moon forever.',
            },
            detalle: {
              es: 'Era un prisma de ocho lados, de unos 4,2 m de ancho y 1,7 m de alto. Su motor de empuje regulable (hasta unos 45.000 newtons) frenaba la nave para posarla con suavidad. También llevaba el equipo de exploración.',
              en: 'An eight-sided block about 4.2 m wide and 1.7 m tall. Its engine could be throttled (up to about 45,000 newtons) to slow the craft for a gentle landing. It also carried the exploration equipment.',
            },
            resto: true,
          },
        ],
        quiz: [
          {
            p: { es: '¿Qué pasó con la etapa de descenso al terminar la misión?', en: 'What happened to the descent stage when the mission ended?' },
            o: {
              es: ['Se quedó en la Luna como plataforma de despegue', 'Volvió a la Tierra', 'Se unió al módulo de mando'],
              en: ['It stayed on the Moon as a launch platform', 'It returned to Earth', 'It joined the command module'],
            },
            c: 0,
            x: {
              es: 'Sirvió de plataforma de lanzamiento para la etapa de ascenso y allí se quedó.',
              en: 'It served as the launch platform for the ascent stage and was left behind.',
            },
          },
          {
            p: { es: '¿Cuánto tiempo estuvo el módulo en la superficie de la Luna?', en: 'How long did the module stay on the Moon\'s surface?' },
            o: { es: ['2 horas', '21 horas y 36 minutos', '3 días'], en: ['2 hours', '21 hours and 36 minutes', '3 days'] },
            c: 1,
            x: {
              es: 'Fueron 21 horas y 36 minutos. Solo una parte de ese tiempo la pasaron caminando afuera.',
              en: 'It was 21 hours and 36 minutes. Only part of that time was spent walking outside.',
            },
          },
          {
            p: { es: '¿Qué tenía una de las cuatro patas que las otras no?', en: 'What did one of the four legs have that the others didn\'t?' },
            o: { es: ['Una antena', 'Un motor', 'Una escalera con plataforma'], en: ['An antenna', 'An engine', 'A ladder and platform'] },
            c: 2,
            x: {
              es: 'Era la pata con la escalera que usaron los astronautas para bajar a la Luna.',
              en: 'It was the leg with the ladder the astronauts used to climb down to the Moon.',
            },
          },
          {
            p: { es: '¿Qué revelaron las rocas que trajo el Apolo 11?', en: 'What did the rocks Apollo 11 brought back reveal?' },
            o: {
              es: ['Que la Luna es de hielo', 'Que los "mares" lunares son antiguos flujos de lava', 'Que en la Luna hay plantas'],
              en: ['That the Moon is made of ice', 'That the lunar "seas" are ancient lava flows', 'That there are plants on the Moon'],
            },
            c: 1,
            x: {
              es: 'Son rocas volcánicas de unos 3.600 millones de años: los "mares" oscuros son lava muy antigua.',
              en: 'They are volcanic rocks about 3.6 billion years old: the dark "seas" are very old lava.',
            },
          },
        ],
      },
    ],
  },

  /* ------------------------------ MARTE ----------------------------- */
  {
    id: 'marte',
    nombre: { es: 'Marte', en: 'Mars' },
    boton: 'img/marte.webp',
    fondo: 'img/fondo-marte.webp',
    estaciones: [
      {
        id: 'viking',
        anio: '1976',
        modelo: 'models/viking.glb',
        giro: 0.4,
        voz: 'viking',
        nombre: { es: 'Viking 1', en: 'Viking 1' },
        resumen: {
          es: 'El primer aterrizaje exitoso de la NASA en Marte.',
          en: 'NASA\'s first successful landing on Mars.',
        },
        que: {
          es: 'Una misión formada por un orbitador y un módulo de aterrizaje. Aquí exploras el módulo que se posó en Marte.',
          en: 'A mission made up of an orbiter and a lander. Here you explore the lander that touched down on Mars.',
        },
        porque: {
          es: 'Para estudiar la superficie y la atmósfera de Marte, y buscar posibles señales de vida.',
          en: 'To study Mars\' surface and atmosphere and look for possible signs of life.',
        },
        descubrimientos: {
          es: [
            'Envió las primeras imágenes detalladas desde la superficie marciana.',
            'Analizó el suelo y la atmósfera: encontró un suelo con mucho azufre.',
            'Sus experimentos biológicos hallaron una química inesperada en el suelo, pero ninguna prueba clara de vida.',
          ],
          en: [
            'It sent the first detailed images from the Martian surface.',
            'It analyzed the soil and atmosphere and found soil rich in sulfur.',
            'Its biology experiments found unexpected chemistry in the soil, but no clear sign of life.',
          ],
        },
        nasa: {
          es: [
            'Aterrizó el 20 de julio de 1976 en Chryse Planitia, a unos 28 km del punto previsto.',
            'El sitio de aterrizaje se cambió porque las fotos desde órbita mostraron un terreno más áspero de lo esperado.',
            'Midió temperaturas de unos −86 °C antes del amanecer y −33 °C por la tarde.',
            'Dejó de comunicarse el 11 de noviembre de 1982, tras un comando erróneo enviado desde la Tierra.',
          ],
          en: [
            'It landed on July 20, 1976, in Chryse Planitia, about 28 km from its planned target.',
            'The landing site was changed because photos from orbit showed rougher ground than expected.',
            'It measured temperatures of about −86 °C before dawn and −33 °C in the afternoon.',
            'Contact was lost on November 11, 1982, after a faulty command was sent from Earth.',
          ],
        },
        legado: {
          es: 'Viking 1 ya no funciona, pero sus fotos y mediciones siguen siendo una referencia: cada misión que ha buscado señales de vida en Marte parte de lo que Viking enseñó.',
          en: 'Viking 1 no longer works, but its photos and measurements remain a reference: every mission that has looked for signs of life on Mars builds on what Viking taught us.',
        },
        piezas: [
          {
            id: 'brazo',
            nombre: { es: 'Brazo muestreador', en: 'Sampler arm' },
            para: {
              es: 'Un brazo robot con pala que recogía suelo marciano para analizarlo.',
              en: 'A robotic arm with a scoop that collected Martian soil for analysis.',
            },
            detalle: {
              es: 'Era un brazo extensible con una cabeza recolectora. El 28 de julio de 1976 recogió las primeras muestras de suelo y las entregó al laboratorio biológico. También llevaba imanes para estudiar el material magnético del suelo.',
              en: 'An extendable arm with a collector head. On July 28, 1976, it scooped the first soil samples and delivered them to the biology laboratory. It also carried magnets to study magnetic material in the soil.',
            },
            match: ['brazo'],
            mover: [0.45, 0.05, 0],
          },
          {
            id: 'antena',
            nombre: { es: 'Antena parabólica', en: 'Dish antenna' },
            para: {
              es: 'Apunta a la Tierra para enviar fotos y datos, y recibir órdenes.',
              en: 'It points at Earth to send photos and data and to receive commands.',
            },
            detalle: {
              es: 'Es una antena de disco de alta ganancia. Durante el aterrizaje, las señales tardaban unos 20 minutos en llegar a la Tierra: nadie podía pilotarla en directo, así que la nave tuvo que aterrizar sola.',
              en: 'A high-gain dish antenna. During landing, signals took about 20 minutes to reach Earth: nobody could fly it live, so the lander had to touch down on its own.',
            },
            match: ['antena'],
            mover: [-0.1, 0.4, 0],
          },
          {
            id: 'patas',
            nombre: { es: 'Patas de aterrizaje', en: 'Landing legs' },
            para: {
              es: 'Tres patas que amortiguaron el golpe al tocar el suelo de Marte.',
              en: 'Three legs that cushioned the bump of touching down on Mars.',
            },
            detalle: {
              es: 'Tenían amortiguadores para absorber el impacto. Por seguridad, los científicos cambiaron el sitio de aterrizaje cuando las fotos tomadas desde órbita mostraron que el terreno original era demasiado áspero.',
              en: 'They had shock absorbers to soak up the impact. To be safe, scientists moved the landing site when photos taken from orbit showed the original ground was too rough.',
            },
            match: ['patas'],
            mover: [0, -0.28, 0],
          },
          {
            id: 'cuerpo',
            nombre: { es: 'Cuerpo, laboratorio y energía', en: 'Body, laboratory and power' },
            para: {
              es: 'Adentro lleva el laboratorio que analizó el suelo buscando señales de vida, las computadoras y los instrumentos.',
              en: 'Inside is the laboratory that tested the soil for signs of life, plus the computers and instruments.',
            },
            detalle: {
              es: 'El cuerpo es un prisma de seis lados con computadoras, grabadora de cinta, baterías e instrumentos. El laboratorio biológico hacía tres experimentos distintos. La energía venía de dos generadores nucleares (SNAP-19), que dan electricidad constante aunque la luz del Sol cambie.',
              en: 'The body is a six-sided block holding computers, a tape recorder, batteries and instruments. The biology laboratory ran three different experiments. Power came from two nuclear generators (SNAP-19), which give steady electricity even when sunlight changes.',
            },
            resto: true,
          },
        ],
        quiz: [
          {
            p: { es: '¿Por qué Viking usó generadores nucleares?', en: 'Why did Viking use nuclear generators?' },
            o: {
              es: ['Porque eran más livianos que una pila', 'Porque dan energía constante aunque la luz del Sol cambie', 'Para calentar las rocas'],
              en: ['Because they were lighter than a battery', 'Because they give steady power even when sunlight changes', 'To heat up the rocks'],
            },
            c: 1,
            x: {
              es: 'La luz del Sol en Marte varía mucho. Los dos generadores SNAP-19 le daban electricidad de día y de noche.',
              en: 'Sunlight on Mars varies a lot. The two SNAP-19 generators gave it electricity day and night.',
            },
          },
          {
            p: { es: '¿Cuándo recogió su primera muestra de suelo?', en: 'When did it collect its first soil sample?' },
            o: { es: ['El 28 de julio de 1976', 'El mismo día del aterrizaje', 'En 1982'], en: ['On July 28, 1976', 'The same day it landed', 'In 1982'] },
            c: 0,
            x: {
              es: 'Fue el 28 de julio de 1976, ocho días después de aterrizar.',
              en: 'It was July 28, 1976, eight days after landing.',
            },
          },
          {
            p: { es: '¿Qué encontraron los experimentos biológicos?', en: 'What did the biology experiments find?' },
            o: {
              es: ['Bacterias vivas', 'Nada: nunca funcionaron', 'Química inesperada, pero ninguna prueba clara de vida'],
              en: ['Living bacteria', 'Nothing: they never worked', 'Unexpected chemistry, but no clear sign of life'],
            },
            c: 2,
            x: {
              es: 'El suelo reaccionó de forma inesperada, pero no hubo ninguna prueba clara de que hubiera vida.',
              en: 'The soil reacted in an unexpected way, but there was no clear proof of life.',
            },
          },
          {
            p: { es: '¿Por qué cambiaron el sitio de aterrizaje?', en: 'Why was the landing site changed?' },
            o: {
              es: ['Por una tormenta de polvo', 'Las fotos desde órbita mostraron terreno muy áspero', 'Se acabó el combustible'],
              en: ['Because of a dust storm', 'Photos from orbit showed very rough ground', 'It ran out of fuel'],
            },
            c: 1,
            x: {
              es: 'Las fotos tomadas desde órbita mostraron que el sitio original era más áspero de lo esperado.',
              en: 'Photos taken from orbit showed the original site was rougher than expected.',
            },
          },
        ],
      },
      {
        id: 'opportunity',
        anio: '2004',
        modelo: 'models/opportunity.glb',
        giro: 2.4,
        voz: 'opportunity',
        nombre: { es: 'Spirit y Opportunity', en: 'Spirit and Opportunity' },
        resumen: {
          es: 'Rovers gemelos que siguieron el rastro del agua.',
          en: 'Twin rovers that followed the trail of water.',
        },
        que: {
          es: 'Dos rovers robóticos gemelos. Aterrizaron el 3 y el 24 de enero de 2004, en lados opuestos de Marte.',
          en: 'Two twin robotic rovers. They landed on January 3 and January 24, 2004, on opposite sides of Mars.',
        },
        porque: {
          es: 'Para buscar pistas de agua en el pasado de Marte. Por eso aterrizaron en el cráter Gusev, un posible lago antiguo, y en Meridiani Planum.',
          en: 'To look for clues of water in Mars\' past. That is why they landed in Gusev Crater, a possible ancient lake, and in Meridiani Planum.',
        },
        descubrimientos: {
          es: [
            'Analizaron minerales y formaciones rocosas como geólogos robot.',
            'Opportunity halló pequeñas esferas de hematita, los "arándanos", que se forman con agua.',
            'Confirmaron que en Marte hubo agua líquida hace mucho tiempo.',
          ],
          en: [
            'They studied minerals and rock formations like robot geologists.',
            'Opportunity found tiny hematite spheres, the "blueberries", which form in water.',
            'They confirmed that Mars had liquid water long ago.',
          ],
        },
        nasa: {
          es: [
            'La misión se diseñó para durar 90 días.',
            'Spirit trabajó más de 6 años y recorrió 7,7 km.',
            'Opportunity trabajó casi 15 años y recorrió 45,16 km.',
            'Opportunity superó la distancia de un maratón (42,195 km) el 24 de marzo de 2015.',
          ],
          en: [
            'The mission was designed to last 90 days.',
            'Spirit worked for over 6 years and drove 7.7 km.',
            'Opportunity worked for almost 15 years and drove 45.16 km.',
            'Opportunity passed marathon distance (42.195 km) on March 24, 2015.',
          ],
        },
        legado: {
          es: 'Ninguno de los dos sigue activo: Spirit terminó en 2010 y Opportunity en 2018. Pero lo que aprendimos con ellos, y su forma de moverse, sirvió para diseñar a los rovers Curiosity y Perseverance.',
          en: 'Neither is still active: Spirit ended in 2010 and Opportunity in 2018. But what we learned from them, and the way they drove, helped design the Curiosity and Perseverance rovers.',
        },
        piezas: [
          {
            id: 'mastil',
            nombre: { es: 'Mástil con cámaras', en: 'Camera mast' },
            para: {
              es: 'Es la "cabeza" del rover. Sus cámaras tomaron las fotos del paisaje marciano.',
              en: 'The rover\'s "head". Its cameras took the photos of the Martian landscape.',
            },
            detalle: {
              es: 'Las cámaras panorámicas (Pancam) estaban a unos 1,5 m del suelo, casi a la altura de los ojos de una persona, y tenían filtros de colores. El mástil también funcionaba como periscopio de un instrumento que detecta minerales.',
              en: 'The panoramic cameras (Pancam) sat about 1.5 m above the ground, close to a person\'s eye level, and had color filters. The mast also worked as a periscope for an instrument that detects minerals.',
            },
            match: ['mastil'],
            mover: [0, 0.5, 0],
          },
          {
            id: 'paneles',
            nombre: { es: 'Paneles solares', en: 'Solar panels' },
            para: {
              es: 'Convierten la luz del Sol en electricidad para todo el rover.',
              en: 'They turn sunlight into electricity for the whole rover.',
            },
            detalle: {
              es: 'El viento marciano limpió varias veces el polvo de los paneles de Opportunity, y eso le alargó la vida. El 10 de junio de 2018 una enorme tormenta de polvo tapó el Sol: fue la última vez que se comunicó.',
              en: 'Martian wind cleaned the dust off Opportunity\'s panels several times, which extended its life. On June 10, 2018, a huge dust storm blocked the Sun: that was the last time it called home.',
            },
            match: ['paneles'],
            mover: [0, 0.22, 0],
          },
          {
            id: 'antenas',
            nombre: { es: 'Antenas', en: 'Antennas' },
            para: {
              es: 'Con ellas el rover habla con la Tierra y con las naves que orbitan Marte.',
              en: 'They let the rover talk to Earth and to the spacecraft orbiting Mars.',
            },
            detalle: {
              es: 'Cada rover tenía tres: una antena de alta ganancia que apunta a la Tierra, una de baja ganancia que emite en todas direcciones y una antena UHF para hablar con los orbitadores, que reenvían los datos.',
              en: 'Each rover had three: a high-gain antenna that points at Earth, a low-gain antenna that sends in all directions, and a UHF antenna to talk to the orbiters, which relay the data.',
            },
            match: ['antenas'],
            mover: [0, 0.38, -0.25],
          },
          {
            id: 'brazo',
            nombre: { es: 'Brazo robótico', en: 'Robotic arm' },
            para: {
              es: 'Lleva herramientas para estudiar las rocas de cerca, como un geólogo.',
              en: 'It carries tools to study rocks up close, like a geologist.',
            },
            detalle: {
              es: 'El brazo acercaba cuatro herramientas a las rocas y al suelo. Una es la herramienta de abrasión (RAT): raspa la capa de afuera para mostrar roca fresca por dentro.',
              en: 'The arm placed four tools against rocks and soil. One is the Rock Abrasion Tool (RAT): it grinds away the outer layer to show fresh rock inside.',
            },
            match: ['brazo'],
            mover: [0, 0, 0.4],
          },
          {
            id: 'ruedas',
            nombre: { es: 'Ruedas y suspensión', en: 'Wheels and suspension' },
            para: {
              es: 'Seis ruedas con una suspensión especial para pasar sobre rocas sin volcarse.',
              en: 'Six wheels with a special suspension to roll over rocks without tipping.',
            },
            detalle: {
              es: 'La suspensión se llama "rocker-bogie". Mantiene las seis ruedas apoyadas aunque el terreno sea disparejo y le permite pasar sobre obstáculos más o menos del tamaño de una rueda.',
              en: 'The suspension is called "rocker-bogie". It keeps all six wheels on the ground even on uneven terrain and lets the rover climb over obstacles about the size of a wheel.',
            },
            match: ['ruedas'],
            separar: 'radial',
            distancia: 0.32,
          },
          {
            id: 'cuerpo',
            nombre: { es: 'Cuerpo', en: 'Body' },
            para: {
              es: 'Una caja que protege la computadora y las baterías del frío de Marte.',
              en: 'A box that protects the computer and batteries from the Martian cold.',
            },
            detalle: {
              es: 'Es una caja abrigada: adentro, la computadora y las baterías se mantienen a una temperatura segura mientras afuera las noches marcianas son heladas. También guarda un instrumento que detecta minerales por su calor.',
              en: 'It is an insulated box: inside, the computer and batteries stay at a safe temperature while Martian nights outside are freezing. It also holds an instrument that detects minerals by their heat.',
            },
            resto: true,
          },
        ],
        quiz: [
          {
            p: { es: '¿Cuánto tiempo debían funcionar los rovers?', en: 'How long were the rovers designed to work?' },
            o: { es: ['90 días', '5 años', '15 años'], en: ['90 days', '5 years', '15 years'] },
            c: 0,
            x: {
              es: 'La misión era de 90 días. Spirit duró más de 6 años y Opportunity casi 15.',
              en: 'The mission was 90 days. Spirit lasted over 6 years and Opportunity almost 15.',
            },
          },
          {
            p: { es: '¿Qué dejó en silencio a Opportunity en 2018?', en: 'What silenced Opportunity in 2018?' },
            o: {
              es: ['Se le rompieron las ruedas', 'Una tormenta de polvo tapó la luz del Sol', 'Chocó con una roca'],
              en: ['Its wheels broke', 'A dust storm blocked the sunlight', 'It crashed into a rock'],
            },
            c: 1,
            x: {
              es: 'Una tormenta de polvo cubrió el Sol y sus paneles solares se quedaron sin energía.',
              en: 'A dust storm covered the Sun and its solar panels ran out of power.',
            },
          },
          {
            p: { es: '¿Para qué sirve la herramienta de abrasión (RAT)?', en: 'What does the Rock Abrasion Tool (RAT) do?' },
            o: {
              es: ['Para tomar fotos', 'Para hablar con la Tierra', 'Para raspar la roca y mostrar su interior'],
              en: ['It takes photos', 'It talks to Earth', 'It grinds the rock to show its inside'],
            },
            c: 2,
            x: {
              es: 'Raspa la capa de afuera para que los instrumentos estudien roca fresca.',
              en: 'It grinds off the outer layer so the instruments can study fresh rock.',
            },
          },
          {
            p: { es: '¿Qué pista de agua halló Opportunity?', en: 'What clue to water did Opportunity find?' },
            o: {
              es: ['Un río con agua', 'Esferas de hematita, los "arándanos"', 'Un lago congelado'],
              en: ['A flowing river', 'Hematite spheres, the "blueberries"', 'A frozen lake'],
            },
            c: 1,
            x: {
              es: 'Halló esferitas de hematita, un mineral que se forma con agua.',
              en: 'It found tiny spheres of hematite, a mineral that forms in water.',
            },
          },
        ],
      },
      {
        id: 'insight',
        anio: '2018',
        modelo: 'models/insight.glb',
        giro: 0.5,
        voz: 'insight',
        nombre: { es: 'InSight', en: 'InSight' },
        resumen: {
          es: 'El módulo que escuchó los temblores de Marte.',
          en: 'The lander that listened to Mars\' quakes.',
        },
        que: {
          es: 'Una sonda robótica que se quedó quieta en un solo lugar, equipada con instrumentos para estudiar el interior de Marte.',
          en: 'A robotic lander that stayed in one spot, equipped with instruments to study the inside of Mars.',
        },
        porque: {
          es: 'Para comprender cómo es Marte por dentro y qué actividad geológica tiene.',
          en: 'To understand what Mars is like inside and how geologically active it is.',
        },
        descubrimientos: {
          es: [
            'Detectó 1.319 temblores marcianos, los "martemotos".',
            'Mostró que el núcleo de Marte es líquido y más grande de lo esperado: unos 1.830 km de radio.',
            'Dio información nueva sobre la corteza, el manto y el núcleo del planeta.',
          ],
          en: [
            'It detected 1,319 marsquakes.',
            'It showed that Mars\' core is liquid and larger than expected: about 1,830 km in radius.',
            'It gave new information about the planet\'s crust, mantle and core.',
          ],
        },
        nasa: {
          es: [
            'Se lanzó el 5 de mayo de 2018 y aterrizó el 26 de noviembre de 2018 en Elysium Planitia.',
            'Su diseño se basó en el del módulo Phoenix.',
            'El mayor temblor, de magnitud 5 aproximadamente, ocurrió el 4 de mayo de 2022.',
            'La misión terminó el 15 de diciembre de 2022, cuando el polvo dejó sus paneles sin energía.',
          ],
          en: [
            'It launched on May 5, 2018, and landed on November 26, 2018, in Elysium Planitia.',
            'Its design was based on the Phoenix lander.',
            'The biggest quake, about magnitude 5, happened on May 4, 2022.',
            'The mission ended on December 15, 2022, when dust left its panels without power.',
          ],
        },
        legado: {
          es: 'InSight ya no funciona, pero los científicos siguen analizando los temblores que grabó y todavía publican hallazgos nuevos sobre el interior de Marte.',
          en: 'InSight no longer works, but scientists are still analyzing the quakes it recorded and continue to publish new findings about the inside of Mars.',
        },
        piezas: [
          {
            id: 'brazo',
            nombre: { es: 'Brazo robótico', en: 'Robotic arm' },
            para: {
              es: 'Levantó los instrumentos de la cubierta y los puso sobre el suelo de Marte.',
              en: 'It lifted the instruments off the deck and set them on the Martian ground.',
            },
            detalle: {
              es: 'Medía 1,8 m y tenía una cámara. El 19 de diciembre de 2018 colocó el sismómetro sobre el suelo: fue la primera vez que se puso uno en la superficie de otro planeta.',
              en: 'It was 1.8 m long and had a camera. On December 19, 2018, it placed the seismometer on the ground: the first time one was set on the surface of another planet.',
            },
            match: ['arm_', 'ICC', 'lens_cap'],
          },
          {
            id: 'seis',
            nombre: { es: 'Sismómetro (SEIS)', en: 'Seismometer (SEIS)' },
            para: {
              es: 'Siente los "martemotos", los temblores de Marte.',
              en: 'It feels marsquakes, the tremors of Mars.',
            },
            detalle: {
              es: 'Lo aportó Francia (la agencia CNES). Es tan sensible que una cúpula lo protege del viento y de los cambios de temperatura. Con las ondas de los temblores, los científicos "vieron" el interior del planeta.',
              en: 'France (the CNES agency) provided it. It is so sensitive that a dome shields it from wind and temperature changes. Using the waves from the quakes, scientists could "see" inside the planet.',
            },
            match: ['SEIS', 'WTS', 'cable_01'],
          },
          {
            id: 'hp3',
            nombre: { es: 'Sonda de calor (HP3)', en: 'Heat probe (HP3)' },
            para: {
              es: 'Un termómetro pensado para medir el calor que sale del interior de Marte.',
              en: 'A thermometer meant to measure the heat coming from inside Mars.',
            },
            detalle: {
              es: 'La aportó Alemania (la agencia DLR). Su "topo" se martillaba solo y debía enterrarse hasta unos 5 m. El suelo resultó distinto a lo esperado y no lo logró, aunque el brazo intentó ayudarlo.',
              en: 'Germany (the DLR agency) provided it. Its self-hammering "mole" was meant to dig down about 5 m. The soil turned out different than expected and it never got there, even though the arm tried to help.',
            },
            match: ['HP3', 'cable_02'],
          },
          {
            id: 'paneles',
            nombre: { es: 'Paneles solares', en: 'Solar panels' },
            para: {
              es: 'Dos paneles redondos que le daban electricidad.',
              en: 'Two round panels that gave it electricity.',
            },
            detalle: {
              es: 'El polvo de Marte los fue cubriendo poco a poco. Cuando ya no pudieron generar suficiente energía, la misión terminó, en diciembre de 2022.',
              en: 'Martian dust slowly covered them. When they could no longer make enough power, the mission ended, in December 2022.',
            },
            match: ['panel_'],
            separar: 'radial',
            distancia: 0.3,
          },
          {
            id: 'antenas',
            nombre: { es: 'Antenas y sensores del clima', en: 'Antennas and weather sensors' },
            para: {
              es: 'Las antenas envían los datos a la Tierra. Los sensores miden viento, presión y temperatura.',
              en: 'The antennas send data to Earth. The sensors measure wind, pressure and temperature.',
            },
            detalle: {
              es: 'Además de medir el clima, InSight llevaba un experimento de radio: siguiendo su señal desde la Tierra, los científicos midieron cómo se bambolea Marte al girar, y eso ayudó a conocer su núcleo.',
              en: 'Besides tracking the weather, InSight carried a radio experiment: by following its signal from Earth, scientists measured how Mars wobbles as it spins, which helped reveal its core.',
            },
            match: ['antenna', 'RISE', 'TWINS', 'pressure'],
            mover: [0, 0.35, 0],
          },
          {
            id: 'cuerpo',
            nombre: { es: 'Plataforma y patas', en: 'Deck and legs' },
            para: {
              es: 'La base del módulo: sostiene todo y guarda la computadora y las baterías.',
              en: 'The base of the lander: it holds everything and houses the computer and batteries.',
            },
            detalle: {
              es: 'Es una base heredada del diseño del módulo Phoenix. Sobre su cubierta viajaron los instrumentos hasta que el brazo los bajó al suelo.',
              en: 'The base was inherited from the Phoenix lander design. The instruments rode on its deck until the arm lowered them to the ground.',
            },
            resto: true,
          },
        ],
        quiz: [
          {
            p: { es: '¿Qué instrumento sintió los "martemotos"?', en: 'Which instrument felt the marsquakes?' },
            o: { es: ['La sonda de calor (HP3)', 'El sismómetro (SEIS)', 'La cámara'], en: ['The heat probe (HP3)', 'The seismometer (SEIS)', 'The camera'] },
            c: 1,
            x: {
              es: 'El sismómetro SEIS registró 1.319 temblores.',
              en: 'The SEIS seismometer recorded 1,319 quakes.',
            },
          },
          {
            p: { es: '¿Qué logró el brazo robótico?', en: 'What did the robotic arm achieve?' },
            o: {
              es: ['Poner el primer sismómetro sobre el suelo de otro planeta', 'Cavar un pozo de 100 m', 'Hacer volar la nave'],
              en: ['Placing the first seismometer on the ground of another planet', 'Digging a 100 m hole', 'Making the lander fly'],
            },
            c: 0,
            x: {
              es: 'El 19 de diciembre de 2018 colocó el sismómetro sobre el suelo marciano.',
              en: 'On December 19, 2018, it set the seismometer on the Martian ground.',
            },
          },
          {
            p: { es: '¿Qué descubrió InSight sobre el núcleo de Marte?', en: 'What did InSight find about Mars\' core?' },
            o: {
              es: ['Que es pequeño y sólido', 'Que Marte no tiene núcleo', 'Que es líquido y más grande de lo esperado'],
              en: ['It is small and solid', 'Mars has no core', 'It is liquid and bigger than expected'],
            },
            c: 2,
            x: {
              es: 'El núcleo es líquido y mide unos 1.830 km de radio.',
              en: 'The core is liquid and about 1,830 km in radius.',
            },
          },
          {
            p: { es: '¿Por qué terminó la misión de InSight?', en: 'Why did InSight\'s mission end?' },
            o: {
              es: ['El polvo cubrió sus paneles solares', 'Se la llevó el viento', 'Volvió a la Tierra'],
              en: ['Dust covered its solar panels', 'The wind carried it away', 'It returned to Earth'],
            },
            c: 0,
            x: {
              es: 'El polvo tapó los paneles y se quedó sin energía en diciembre de 2022.',
              en: 'Dust covered the panels and it ran out of power in December 2022.',
            },
          },
        ],
      },
      {
        id: 'ingenuity',
        anio: '2021',
        modelo: 'models/ingenuity.glb',
        giro: 0.8,
        voz: 'ingenuity',
        nombre: { es: 'Ingenuity', en: 'Ingenuity' },
        resumen: {
          es: 'El primer helicóptero que voló en otro planeta.',
          en: 'The first helicopter to fly on another planet.',
        },
        que: {
          es: 'Un pequeño helicóptero robótico que viajó a Marte junto con el rover Perseverance.',
          en: 'A small robotic helicopter that traveled to Mars with the Perseverance rover.',
        },
        porque: {
          es: 'Para demostrar que es posible volar de forma controlada en la delgada atmósfera de Marte.',
          en: 'To show that controlled flight is possible in Mars\' thin atmosphere.',
        },
        descubrimientos: {
          es: [
            'Hizo el primer vuelo controlado y con motor en otro planeta.',
            'Demostró que las aeronaves pueden explorar otros mundos.',
            'Completó 72 vuelos antes de terminar su misión en 2024.',
          ],
          en: [
            'It made the first powered, controlled flight on another planet.',
            'It showed that aircraft can explore other worlds.',
            'It completed 72 flights before its mission ended in 2024.',
          ],
        },
        nasa: {
          es: [
            'Primer vuelo: 19 de abril de 2021.',
            'En total voló unos 128,8 minutos y recorrió unos 17 km.',
            'Su programa de pruebas estaba planeado para apenas 30 días marcianos.',
            'Último vuelo: 18 de enero de 2024. La NASA dio por terminada la misión el 25 de enero.',
            'Pesa 1,8 kg en la Tierra, pero solo 0,68 kg en Marte.',
          ],
          en: [
            'First flight: April 19, 2021.',
            'In total it flew for about 128.8 minutes and covered about 17 km.',
            'Its test program was planned to last only 30 Martian days.',
            'Last flight: January 18, 2024. NASA declared the mission complete on January 25.',
            'It weighs 1.8 kg on Earth but only 0.68 kg on Mars.',
          ],
        },
        legado: {
          es: 'Ingenuity ya no vuela, pero demostró que se puede volar en otro planeta. Lo aprendido con él sirve para diseñar las próximas aeronaves que explorarán otros mundos.',
          en: 'Ingenuity no longer flies, but it proved that flight on another planet is possible. What it taught us is helping design the next aircraft that will explore other worlds.',
        },
        piezas: [
          {
            id: 'panel',
            nombre: { es: 'Panel solar', en: 'Solar panel' },
            para: {
              es: 'Carga las baterías con la luz del Sol.',
              en: 'It charges the batteries with sunlight.',
            },
            detalle: {
              es: 'Va encima de los rotores y recarga las baterías cada día. Una carga completa alcanzaba para un vuelo de hasta 90 segundos por día marciano.',
              en: 'It sits above the rotors and recharges the batteries every day. A full charge was enough for one flight of up to 90 seconds per Martian day.',
            },
            match: ['solar_panel'],
            mover: [0, 0.45, 0],
          },
          {
            id: 'rotores',
            nombre: { es: 'Rotores', en: 'Rotors' },
            para: {
              es: 'Dos hélices que giran en sentidos contrarios para levantar el helicóptero.',
              en: 'Two rotors that spin in opposite directions to lift the helicopter.',
            },
            detalle: {
              es: 'Sus aspas son de fibra de carbono. Cada rotor mide 1,2 m y gira a unas 2.400 vueltas por minuto, mucho más rápido que un helicóptero en la Tierra, porque el aire de Marte es muy delgado.',
              en: 'Its blades are made of carbon fiber. Each rotor is 1.2 m across and spins at about 2,400 turns per minute, much faster than a helicopter on Earth, because Mars\' air is so thin.',
            },
            match: ['rotors_', 'parts_'],
            mover: [0, 0.3, 0],
          },
          {
            id: 'patas',
            nombre: { es: 'Patas', en: 'Legs' },
            para: {
              es: 'Cuatro patas livianas para aterrizar sin romperse.',
              en: 'Four lightweight legs for landing without breaking.',
            },
            detalle: {
              es: 'Son de un material de carbono muy liviano y miden unos 38 cm cada una. Dejan unos 13 cm entre el cuerpo y el suelo.',
              en: 'They are made of a very light carbon material and are about 38 cm long each. They leave about 13 cm between the body and the ground.',
            },
            match: ['leg_'],
            separar: 'radial',
            distancia: 0.3,
          },
          {
            id: 'camaras',
            nombre: { es: 'Cámaras', en: 'Cameras' },
            para: {
              es: 'Miran el suelo para que el helicóptero sepa dónde está, y toman fotos desde el aire.',
              en: 'They watch the ground so the helicopter knows where it is, and take photos from the air.',
            },
            detalle: {
              es: 'Tiene dos: una cámara de navegación en blanco y negro que mira hacia abajo, y una cámara a color de 13 megapíxeles que mira hacia el horizonte. Muchas de sus piezas vienen de la tecnología de los celulares.',
              en: 'It has two: a black-and-white navigation camera that looks down, and a 13-megapixel color camera that looks toward the horizon. Many of its parts come from cell phone technology.',
            },
            match: ['cams'],
            mover: [0, -0.28, 0],
          },
          {
            id: 'cuerpo',
            nombre: { es: 'Cuerpo (fuselaje)', en: 'Body (fuselage)' },
            para: {
              es: 'Una cajita con las baterías, la computadora y los sensores, abrigada contra el frío.',
              en: 'A little box with the batteries, computer and sensors, kept warm against the cold.',
            },
            detalle: {
              es: 'Mide apenas 13,6 × 19,5 × 16,3 cm. Lleva calentadores para sobrevivir a las noches heladas. Se comunicaba por radio con el rover Perseverance, que reenviaba sus datos a la Tierra.',
              en: 'It measures just 13.6 × 19.5 × 16.3 cm. It has heaters to survive the freezing nights. It talked by radio to the Perseverance rover, which relayed its data to Earth.',
            },
            resto: true,
          },
        ],
        quiz: [
          {
            p: { es: '¿Por qué giran tan rápido sus aspas?', en: 'Why do its blades spin so fast?' },
            o: {
              es: ['Para cargar la batería', 'Porque el aire de Marte es muy delgado', 'Para hacer menos ruido'],
              en: ['To charge the battery', 'Because Mars\' air is very thin', 'To make less noise'],
            },
            c: 1,
            x: {
              es: 'Con tan poco aire, las aspas deben girar a unas 2.400 vueltas por minuto para sostenerlo.',
              en: 'With so little air, the blades must spin at about 2,400 turns per minute to hold it up.',
            },
          },
          {
            p: { es: '¿Cuánto podía volar con una carga completa?', en: 'How long could it fly on a full charge?' },
            o: { es: ['Hasta 90 segundos', '1 hora', '10 minutos'], en: ['Up to 90 seconds', '1 hour', '10 minutes'] },
            c: 0,
            x: {
              es: 'Una carga alcanzaba para un vuelo de hasta 90 segundos por día marciano.',
              en: 'One charge was enough for a flight of up to 90 seconds per Martian day.',
            },
          },
          {
            p: { es: '¿Cuántos vuelos completó Ingenuity?', en: 'How many flights did Ingenuity complete?' },
            o: { es: ['5', '30', '72'], en: ['5', '30', '72'] },
            c: 2,
            x: {
              es: 'Hizo 72 vuelos, aunque su programa de pruebas era de solo 30 días marcianos.',
              en: 'It made 72 flights, even though its test program was only 30 Martian days long.',
            },
          },
          {
            p: { es: '¿Cómo llegaban sus datos a la Tierra?', en: 'How did its data reach Earth?' },
            o: {
              es: ['Por un cable muy largo', 'Con una antena gigante propia', 'Por radio al rover Perseverance, que los reenviaba'],
              en: ['Through a very long cable', 'With its own giant antenna', 'By radio to the Perseverance rover, which relayed it'],
            },
            c: 2,
            x: {
              es: 'Hablaba por radio con Perseverance, y el rover reenviaba los datos a la Tierra.',
              en: 'It talked by radio to Perseverance, and the rover relayed the data to Earth.',
            },
          },
        ],
      },
    ],
  },
];
