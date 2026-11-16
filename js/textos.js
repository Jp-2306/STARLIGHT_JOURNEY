/* =====================================================================
   TEXTOS GENERALES  —  STARLIGHT JOURNEY
   Aquí están: los textos de botones y mensajes (UI), la narración
   (NARRACION), la pestaña "Propósito" y la pestaña "Quiénes somos".
   Todo va en los dos idiomas:  es = español,  en = inglés.
   ===================================================================== */

export const IDIOMA_INICIAL = 'en';      // idioma con el que abre la página

/* ---------- Botones, etiquetas y mensajes ---------- */
export const UI = {
  titulo:        { es: 'Starlight Journey', en: 'Starlight Journey' },
  subtitulo:     { es: 'Naves y robots de la NASA', en: 'NASA spacecraft and robots' },
  indice:        { es: 'Índice', en: 'Index' },
  espacio:       { es: 'El espacio', en: 'Space' },
  tierra:        { es: 'La Tierra', en: 'Earth' },
  reiniciar:     { es: 'Reiniciar misión', en: 'Restart mission' },
  tabProposito:  { es: 'Propósito', en: 'Purpose' },
  tabNosotros:   { es: 'Quiénes somos', en: 'About us' },
  cerrar:        { es: 'Cerrar', en: 'Close' },
  sonidoOn:      { es: 'Silenciar la narración', en: 'Mute narration' },
  sonidoOff:     { es: 'Activar la narración', en: 'Turn narration on' },
  cambiarIdioma: { es: 'Change language to English', en: 'Cambiar idioma a español' },
  bienvenida:    { es: '¡Hola, Comandante! Toca la Luna o Marte para viajar en tu cohete.', en: 'Hello, Commander! Tap the Moon or Mars to fly there in your rocket.' },
  enTierra:      { es: 'Estás en la Tierra. Desde aquí despegaron todas las misiones.', en: 'You are on Earth. Every mission lifted off from here.' },
  deVuelta:      { es: '¡Bienvenido a casa, Comandante! Misión cumplida.', en: 'Welcome home, Commander! Mission accomplished.' },
  cargando:      { es: 'Cargando naves…', en: 'Loading spacecraft…' },
  pista:         { es: 'Toca una nave para explorarla', en: 'Tap a spacecraft to explore it' },
  volver:        { es: 'Volver', en: 'Back' },
  historia:      { es: '📖 Historia', en: '📖 Story' },
  armar:         { es: '🔧 Armar', en: '🔧 Assemble' },
  desarmar:      { es: 'Desarmar', en: 'Take apart' },
  giro:          { es: '🔄 Giro', en: '🔄 Spin' },
  pieza:         { es: 'Pieza', en: 'Part' },
  escuchar:      { es: 'Escuchar', en: 'Listen' },
  que:           { es: '¿Qué es?', en: 'What is it?' },
  porque:        { es: '¿Por qué fue enviado?', en: 'Why was it sent?' },
  descubrimientos: { es: 'Descubrimientos científicos', en: 'Scientific discoveries' },
  piezas:        { es: 'Piezas para descubrir', en: 'Parts to discover' },
  informe:       { es: 'Informe completo', en: 'Full report' },
  bloqueado:     { es: '🔒 Explora todas las piezas del modelo para desbloquear el informe completo y el reto.', en: '🔒 Explore every part of the model to unlock the full report and the challenge.' },
  datosNasa:     { es: 'Datos de la misión', en: 'Mission facts' },
  legado:        { es: 'Su legado hoy', en: 'Its legacy today' },
  piezasDetalle: { es: 'Las piezas, en detalle', en: 'The parts, in detail' },
  reto:          { es: 'Reto del explorador', en: 'Explorer challenge' },
  retoIntro:     { es: 'Responde 3 preguntas sobre lo que acabas de descubrir.', en: 'Answer 3 questions about what you just discovered.' },
  retoEmpezar:   { es: '¡Empezar el reto!', en: 'Start the challenge!' },
  retoRepetir:   { es: 'Jugar otra vez', en: 'Play again' },
  retoHecho:     { es: 'Reto completado', en: 'Challenge completed' },
  pregunta:      { es: 'Pregunta', en: 'Question' },
  correcto:      { es: '¡Correcto!', en: 'Correct!' },
  incorrecto:    { es: 'Casi. La respuesta correcta es:', en: 'Not quite. The right answer is:' },
  siguiente:     { es: 'Siguiente', en: 'Next' },
  verResultado:  { es: 'Ver resultado', en: 'See result' },
  resultado:     { es: 'Acertaste {a} de {n}.', en: 'You got {a} out of {n} right.' },
  pNave:         { es: '¡Nave encontrada!', en: 'Spacecraft found!' },
  pPieza:        { es: '¡Pieza descubierta!', en: 'Part discovered!' },
  pInforme:      { es: '🔓 ¡Informe desbloqueado!', en: '🔓 Report unlocked!' },
  pAcierto:      { es: '¡Respuesta correcta!', en: 'Right answer!' },
  pMision:       { es: '🏅 ¡Misión completa!', en: '🏅 Mission complete!' },
  iniciar:       { es: '🚀 Iniciar misión', en: '🚀 Start mission' },
  saltarIntro:   { es: 'Saltar introducción', en: 'Skip intro' },
  saltar:        { es: 'Saltar ⏭', en: 'Skip ⏭' },
  saltarInfo:    { es: 'Saltar a la información ⏭', en: 'Skip to the information ⏭' },
  despegar:      { es: '¡Despegar! 🚀', en: 'Liftoff! 🚀' },
  explorar:      { es: 'Explorar ▶', en: 'Explore ▶' },
  lema:          { es: 'Tu misión: explorar la Luna y Marte', en: 'Your mission: explore the Moon and Mars' },
  pistaRelato:   { es: 'Explora todas las piezas para desbloquear el informe completo y el reto.', en: 'Explore every part to unlock the full report and the challenge.' },
  finTitulo:     { es: '¡Misión cumplida!', en: 'Mission accomplished!' },
  finPuntos:     { es: 'Puntos', en: 'Points' },
  finNaves:      { es: 'Misiones', en: 'Missions' },
  finPiezas:     { es: 'Piezas', en: 'Parts' },
  finAciertos:   { es: 'Aciertos', en: 'Right answers' },
  finTierra:     { es: '🌍 Regresar a la Tierra', en: '🌍 Return to Earth' },
  finSeguir:     { es: 'Seguir explorando', en: 'Keep exploring' },
  verFinal:      { es: '🏁 Final de la misión', en: '🏁 Mission finale' },
  avisoIA: {
    es: 'Starlight Journey usa inteligencia artificial: las voces de la narración se generaron con ElevenLabs (elevenlabs.io) y las ilustraciones con ChatGPT y Gemini. Las ilustraciones son representaciones artísticas, no fotografías reales. La información histórica y técnica se basa en fuentes de la NASA.',
    en: 'Starlight Journey uses artificial intelligence: the narration voices were generated with ElevenLabs (elevenlabs.io), and the illustrations were created with ChatGPT and Gemini. The illustrations are artistic representations, not real photographs. The historical and technical information is based on NASA sources.',
  },
  avisoIACorto: {
    es: 'Voces: ElevenLabs · Ilustraciones: ChatGPT y Gemini (IA) · Datos: NASA',
    en: 'Voices: ElevenLabs · Illustrations: ChatGPT and Gemini (AI) · Facts: NASA',
  },
};

/* ---------- Narración: DEBE ser igual a lo que dicen los audios ----------
   Cada clave tiene su audio en la carpeta audio/:  clave-es.mp3 y clave-en.mp3 */
export const NARRACION = {
  inicio: {
    es: 'Bienvenido a Starlight Journey. Comandante, estás a bordo. Hace más de cincuenta años, la humanidad se atrevió a salir de la Tierra. Después llegaron los robots: aterrizaron, excavaron, escucharon e incluso volaron en mundos lejanos. Hoy ya ninguno funciona, pero todos dejaron algo valioso: su historia. Tu misión es viajar a la Luna y a Marte, encontrar cada una de esas máquinas y descubrir por qué las enviaron, cómo funcionaban y qué nos enseñaron. Cada pieza que explores te acercará a su secreto. ¿Listo para el despegue?',
    en: 'Welcome to Starlight Journey. Commander, you\'re aboard. More than fifty years ago, humanity dared to leave Earth. Then came the robots: they landed, dug, listened, and even flew on distant worlds. None of them are working today, but every one left something valuable behind: its story. Your mission is to travel to the Moon and Mars, find each of those machines, and discover why they were sent, how they worked, and what they taught us. Every part you explore brings you closer to its secret. Ready for liftoff?',
  },
  luna: {
    es: 'Has aterrizado en el Mar de la Tranquilidad. En tu bitácora marca el 20 de julio de 1969. Aquí, dos seres humanos pisaron por primera vez otro mundo. Llegaron en una nave frágil, mitad cohete y mitad araña de metal: el Módulo Lunar del Apolo 11. Pasaron más de 21 horas en la superficie, recogieron rocas y luego despegaron. Pero una parte de la nave nunca se fue: sigue aquí. Acércate, gírala y ábrela pieza por pieza para descubrir cómo lo lograron.',
    en: 'You\'ve landed in the Sea of Tranquility. Mark your logbook: July 20, 1969. Here, two human beings set foot on another world for the first time. They arrived in a fragile craft, half rocket and half metal spider: the Apollo 11 Lunar Module. They spent more than 21 hours on the surface, gathered rocks, and then lifted off. But part of the craft never left. It\'s still here. Step closer, rotate it, and take it apart piece by piece to find out how they did it.',
  },
  marte: {
    es: 'Dejas la Luna atrás. Marte está mucho más lejos, tanto que sus señales tardan minutos en llegar a la Tierra. Por eso allí nadie pudo ir a manejar: tuvieron que ir robots que pensaran por sí mismos. Cuatro estaciones te esperan. En 1976, Viking 1 buscó señales de vida. En 2004, dos rovers gemelos siguieron el rastro del agua. En 2018, InSight se quedó quieto para escuchar el interior del planeta. Y en 2021, Ingenuity hizo lo imposible: volar. ¿Por cuál empiezas?',
    en: 'You leave the Moon behind. Mars is much farther away, so far that its signals take minutes to reach Earth. That\'s why nobody could drive from here: robots had to go, and they had to think for themselves. Four stops await you. In 1976, Viking 1 searched for signs of life. In 2004, two twin rovers followed the trail of water. In 2018, InSight stayed still to listen to the planet\'s interior. And in 2021, Ingenuity did the impossible: it flew. Where do you start?',
  },
  viking: {
    es: 'Año 1976. Una nave con un laboratorio y una gran pregunta: ¿hay vida en Marte?',
    en: 'Year 1976. A lander with a laboratory and one big question: is there life on Mars?',
  },
  opportunity: {
    es: 'Año 2004. Dos gemelos que debían durar 90 días. Uno trabajó casi 15 años.',
    en: 'Year 2004. Twins built to last 90 days. One worked for almost 15 years.',
  },
  insight: {
    es: 'Año 2018. Un explorador que no se movió, pero escuchó los temblores de un planeta.',
    en: 'Year 2018. An explorer that never moved, but listened to a planet\'s quakes.',
  },
  ingenuity: {
    es: 'Año 2021. Un helicóptero diminuto en un aire casi inexistente.',
    en: 'Year 2021. A tiny helicopter in almost no air.',
  },
  final: {
    es: '¡Felicitaciones, Comandante! Completaste la misión. Exploraste la Luna y Marte, y conociste cinco máquinas extraordinarias. Ninguna sigue funcionando hoy, pero su legado sí: los científicos todavía estudian las muestras y los datos que dejaron. Es hora de regresar a la Tierra. Y recuerda: todo gran explorador empezó atreviéndose a preguntar.',
    en: 'Congratulations, Commander! You\'ve completed the mission. You explored the Moon and Mars and met five extraordinary machines. None of them are working today, but their legacy is: scientists are still studying the samples and data they left behind. It\'s time to return to Earth. And remember: every great explorer began by daring to ask questions.',
  },
};

/* ---------- Pestaña "Propósito" ---------- */
export const PROPOSITO = {
  es: [
    'Promover el interés por la exploración espacial en niños y jóvenes apasionados por la astronomía, mediante una experiencia interactiva y educativa que les permite conocer algunos de los artefactos espaciales enviados a la Luna y a Marte: las misiones de las que hicieron parte, los objetivos para los que fueron diseñados y los resultados que lograron.',
    'Además, el proyecto introduce a los participantes en la historia de estos logros tecnológicos con actividades interactivas para explorar y aprender más sobre los artefactos que han llegado a esos cuerpos celestes.',
  ],
  en: [
    'Our purpose is to spark interest in space exploration among children and young people who love astronomy. We do it through an interactive, educational experience that introduces some of the artifacts sent to the Moon and Mars, the missions they were part of, the goals they were built to achieve, and the results they delivered.',
    'The project also introduces participants to the history of these technological achievements through hands-on activities for exploring and learning more about the artifacts that have reached these worlds.',
  ],
};

/* ---------- Pestaña "Quiénes somos" ---------- */
export const NOSOTROS = [
  {
    nombre: 'Paula Alejandra',
    rol: {
      es: 'Estudiante de Ingeniería Mecánica · Universidad Central · Emprendedora',
      en: 'Mechanical Engineering student · Universidad Central · Entrepreneur',
    },
    texto: {
      es: [
        '¡Hola! Soy Paula Alejandra, estudiante de Ingeniería Mecánica en la Universidad Central y emprendedora. Me considero una persona creativa y curiosa, apasionada por aprender cosas nuevas, descubrir cómo funciona el mundo y encontrar soluciones a través de la tecnología y la innovación.',
        'Junto con mi vida académica dirijo mi propio negocio, una experiencia que me ha permitido fortalecer mis habilidades, desarrollar nuevas ideas y entender la importancia de la dedicación, la creatividad y la perseverancia para alcanzar mis metas.',
        'Me interesan especialmente la ciencia, la ingeniería y la exploración espacial, porque me parece fascinante cómo el ingenio humano ha superado fronteras y ha llevado el conocimiento más allá de nuestro planeta.',
        'Esa es la inspiración de mi proyecto: una iniciativa que busca acercar a niños y jóvenes al mundo de la exploración espacial. Les permite conocer algunas de las naves y los exploradores robóticos que han llegado a la Luna y a Marte, descubrir las misiones para las que fueron diseñados y disfrutar de actividades interactivas que convierten el aprendizaje en una aventura emocionante.',
        'Mi propósito es despertar la curiosidad, fomentar el interés por la ciencia y mostrar que aprender sobre el espacio puede ser una experiencia divertida, llena de descubrimientos.',
        'Porque todo gran explorador empezó siendo alguien que se atrevió a preguntar, imaginar y descubrir. 🌌',
      ],
      en: [
        'Hello! My name is Paula Alejandra, and I am a Mechanical Engineering student at Universidad Central and an entrepreneur. I consider myself a creative, curious person who is passionate about learning new things, discovering how the world works, and finding solutions through technology and innovation.',
        'Alongside my academic journey, I run my own business, an experience that has allowed me to strengthen my skills, develop new ideas, and understand the importance of dedication, creativity, and perseverance in achieving my goals.',
        'I am especially interested in science, engineering, and space exploration because I find it fascinating how human ingenuity has overcome boundaries and taken knowledge beyond our planet.',
        'This is the inspiration behind my project: an initiative that aims to bring children and young people closer to the world of space exploration. It allows them to learn about some of the spacecraft and robotic explorers that have reached the Moon and Mars, discover the missions they were designed for, and enjoy interactive activities that turn learning into an exciting adventure.',
        'My purpose is to spark curiosity, encourage an interest in science, and show that learning about space can be a fun, exciting experience full of discoveries.',
        'Because every great explorer started as someone who dared to ask questions, imagine, and discover. 🌌',
      ],
    },
    frase: {
      es: '"El universo está lleno de posibilidades; solo necesitamos curiosidad para empezar a explorarlas." ✨',
      en: '"The universe is full of possibilities; all we need is curiosity to begin exploring them." ✨',
    },
  },
  {
    nombre: 'Juan David Parra',
    rol: {
      es: 'Estudiante de Ingeniería de Sistemas · Universidad Nacional de Colombia · Programador · Entusiasta de la IA',
      en: 'Systems Engineering student · Universidad Nacional de Colombia · Programmer · AI enthusiast',
    },
    texto: {
      es: [
        '¡Hola! Soy Juan David Parra, estudiante de Ingeniería de Sistemas en la Universidad Nacional de Colombia. Me apasionan la tecnología, la programación, la inteligencia artificial y descubrir nuevas formas de usar la innovación para resolver problemas y crear experiencias significativas.',
        'Me considero una persona creativa, versátil y adaptable, capaz de afrontar distintos retos y ajustarme a situaciones muy variadas. Disfruto explorando ideas, aprendiendo tecnologías nuevas y encontrando soluciones innovadoras con programación y pensamiento computacional.',
        'Mis intereses incluyen el desarrollo de software, la inteligencia artificial y las infinitas posibilidades que ofrece la tecnología para transformar la forma en que aprendemos, nos comunicamos e interactuamos con el mundo.',
        'Con este proyecto quiero combinar mis conocimientos técnicos y mi creatividad para aportar a una experiencia interactiva que acerque a niños y jóvenes a la exploración espacial. Mi meta es usar la tecnología para que aprender sea más atractivo, accesible y emocionante, y despertar la curiosidad por el universo y por los logros tecnológicos que hicieron posible la exploración espacial.',
        'Creo que la creatividad, la adaptabilidad y la tecnología son herramientas poderosas para convertir ideas en realidad.',
        'Porque la innovación empieza cuando nos atrevemos a imaginar lo que aún no existe. 🚀',
      ],
      en: [
        'Hello! My name is Juan David Parra, and I am a Systems Engineering student at the National University of Colombia. I am passionate about technology, programming, artificial intelligence, and discovering new ways to use innovation to solve problems and create meaningful experiences.',
        'I consider myself a creative, versatile, and adaptable person, capable of facing different challenges and adjusting to a wide range of situations. I enjoy exploring new ideas, learning new technologies, and finding innovative solutions through programming and computational thinking.',
        'My interests include software development, artificial intelligence, and the endless possibilities that technology offers to transform the way we learn, communicate, and interact with the world.',
        'Through this project, I want to combine my technical knowledge and creativity to contribute to an interactive experience that brings children and young people closer to space exploration. My goal is to use technology as a tool to make learning more engaging, accessible, and exciting, encouraging curiosity about the universe and the technological achievements that have made space exploration possible.',
        'I believe that creativity, adaptability, and technology are powerful tools for turning ideas into reality.',
        'Because innovation begins when we dare to imagine what has not yet been created. 🚀',
      ],
    },
    frase: {
      es: '"La tecnología nos da las herramientas, la creatividad nos da la dirección y la curiosidad nos lleva más allá de los límites." ✨',
      en: '"Technology gives us the tools, creativity gives us the direction, and curiosity takes us beyond the limits." ✨',
    },
  },
];
