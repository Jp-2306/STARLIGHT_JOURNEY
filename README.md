# 🚀 Starlight Journey

**🌐 Live website / Página web: https://jp-2306.github.io/STARLIGHT_JOURNEY/**

An interactive, bilingual (English / Español) educational website where children and young people travel as a "Commander" from Earth to the Moon and Mars to explore five NASA artifacts. Built for the NASA Space Apps Challenge.

---

## English

### What it is
Starlight Journey turns the history of space exploration into an adventure. Users fly from Earth to the Moon and Mars, find each spacecraft, rotate it in 3D, take it apart piece by piece, and learn what it is, why it was sent, and what it discovered.

### The five artifacts
| Year | Artifact | Where |
|---|---|---|
| 1969 | Apollo Lunar Module | Moon |
| 1976 | Viking 1 | Mars |
| 2004 | Spirit and Opportunity | Mars |
| 2018 | InSight | Mars |
| 2021 | Ingenuity | Mars |

### Features
- Zoom-style scenes: Space → Moon / Mars → each spacecraft.
- 3D models you can rotate and take apart with a slider; tap a part to see its card.
- Exploring every part unlocks the full report (mission facts, legacy and detail on each part).
- Explorer challenge: 3 random questions per spacecraft, with an explanation when an answer is wrong.
- Points, badges and a final "Mission accomplished" screen.
- Story screens with voice narration and text that lights up as it plays.
- English and Spanish, switchable from the header; "Purpose" and "About us" tabs.
- Works on desktop and mobile.

### Project structure
```
index.html        the page
css/estilos.css   design
js/app.js         app logic (scenes, 3D, language, audio, challenge, points)
js/datos.js       content for each spacecraft (bilingual)
js/textos.js      interface texts, narration, Purpose and About us
img/              images and sprites
audio/            narration in English and Spanish
models/           the 5 3D models (.glb)
libs/             three.js and add-ons
```

### NASA data and resources
The historical and technical information is based on NASA and JPL pages:
- NSSDCA – Apollo 11 Lunar Module: https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1969-059C
- NASA – Apollo 11 50th Anniversary: https://science.nasa.gov/wp-content/uploads/2024/01/apollo11-anniversar-litho.pdf
- NASA – Apollo LM Landing Gear: https://www.nasa.gov/wp-content/uploads/static/history/alsj/LM_Landing%20Gear1973010151.pdf
- NASA – Viking 1: https://science.nasa.gov/mission/viking-1/
- NASA NTRS – Viking Lander: https://ntrs.nasa.gov/api/citations/19840027185/downloads/19840027185.pdf
- NASA – Spirit and Opportunity: https://science.nasa.gov/mission/mars-exploration-rovers-spirit-and-opportunity/
- NASA – Mars Exploration Rovers instruments: https://science.nasa.gov/mission/mars-exploration-rovers-spirit-and-opportunity/science-instruments
- NASA – InSight: https://science.nasa.gov/mission/insight/
- NASA – InSight Spacecraft: https://science.nasa.gov/mission/insight/spacecraft/
- JPL – How InSight Revealed the Heart of Mars: https://www.jpl.nasa.gov/edu/news/2023/1/3/how-insight-revealed-the-heart-of-mars
- NASA – Ingenuity Mars Helicopter: https://science.nasa.gov/mission/mars-2020-perseverance/ingenuity-mars-helicopter/
- JPL – Ingenuity Spacecraft (press kit): https://www.jpl.nasa.gov/news/press_kits/ingenuity/landing/mission/spacecraft
- 3D models: NASA 3D Resources – https://science.nasa.gov/3d-resources/

### Other tools
- three.js (3D library, MIT license): https://threejs.org
- GitHub Pages (hosting): https://pages.github.com

### Use of artificial intelligence
- **Claude (Anthropic)** – coding, 3D model integration (take-apart / assemble view) and help researching, writing and translating the texts. https://claude.ai
- **ChatGPT (OpenAI) and Gemini (Google)** – illustrations for the story screens. https://chatgpt.com · https://gemini.google.com
- **ElevenLabs** – narration voices. https://elevenlabs.io

The illustrations are artistic representations, not real photographs. The information was reviewed by the team.

### Team
- Juan David Parra Lozano – Systems Engineering, Universidad Nacional de Colombia
- Paula Alejandra Bello Flautero – Mechanical Engineering, Universidad Central

---

## Español

### Qué es
Starlight Journey convierte la historia de la exploración espacial en una aventura. El usuario viaja de la Tierra a la Luna y a Marte, encuentra cada nave, la gira en 3D, la desarma pieza por pieza y aprende qué es, por qué fue enviada y qué descubrió.

### Funciones
- Escenas con zoom: espacio → Luna / Marte → cada nave.
- Modelos 3D que se giran y se desarman con un control deslizante; al tocar una pieza aparece su ficha.
- Al explorar todas las piezas se desbloquea el informe completo (datos de la misión, legado y detalle de cada pieza).
- Reto del explorador: 3 preguntas al azar por nave, con explicación si la respuesta es incorrecta.
- Puntos, insignias y pantalla final "Misión cumplida".
- Pantallas de historia con narración en voz y texto que se ilumina mientras suena.
- Inglés y español desde el encabezado; pestañas "Propósito" y "Quiénes somos".
- Funciona en computador y celular.

### Cómo verlo en tu computador
Abrir `index.html` con doble clic no funciona (el navegador bloquea los modelos 3D). Desde la carpeta del proyecto ejecuta:

```
python3 -m http.server
```

Luego entra a http://localhost:8000

### Datos de la NASA, herramientas e IA
Las fuentes de la NASA y del JPL son las listadas arriba. Se usó inteligencia artificial: Claude (programación, integración de modelos 3D y apoyo con los textos), ChatGPT y Gemini (ilustraciones) y ElevenLabs (voces). Las ilustraciones son representaciones artísticas, no fotografías reales. La información fue revisada por el equipo.

### Equipo
- Juan David Parra Lozano – Ingeniería de Sistemas, Universidad Nacional de Colombia
- Paula Alejandra Bello Flautero – Ingeniería Mecánica, Universidad Central
