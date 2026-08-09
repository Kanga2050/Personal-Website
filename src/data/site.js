/**
 * Every page's content lives here.
 *
 * `nodes` is a single map keyed by node id. A node is either a `collection`
 * (a hub that lists other nodes) or a `detail` (a write-up). Both render
 * through generic components, so adding a page means adding an entry here —
 * not another 250-line copy of the same JSX.
 *
 * Section shapes: { heading, body: [] } | { heading, list: [] } |
 * { heading, specs: [[label, value]] }
 */

export const nodes = {
  // ── Root ────────────────────────────────────────────────────────────────
  universe: {
    title: 'Universe',
    short: 'Universe',
    theme: 'universe',
    icon: 'map',
    tagline: 'The hub every other section hangs off.',
  },

  memories: {
    title: 'Memories',
    short: 'Memories',
    theme: 'memories',
    icon: 'memories',
    tagline: 'Fragments of time, arranged as a constellation.',
  },

  // ── Engineering ─────────────────────────────────────────────────────────
  engineering: {
    kind: 'collection',
    title: 'Engineering',
    short: 'Engineering',
    theme: 'engineering',
    icon: 'engineering',
    tagline: 'Three disciplines that keep overlapping.',
    intro:
      'Most things worth building sit at the seam between mechanical, electrical and software work. These are the three I keep returning to, and the tools and habits that go with each.',
    items: ['mech-design', 'electronics', 'software'],
    links: [
      { to: 'universe', label: 'Universe', direction: 'back' },
      { to: 'projects', label: 'Projects', direction: 'forward' },
    ],
  },

  'mech-design': {
    kind: 'detail',
    title: 'Mechanical Design',
    short: 'Mechanical',
    theme: 'mechanical',
    icon: 'mechanical',
    tagline: 'CAD, tolerances and the parts that have to physically fit.',
    parent: 'engineering',
    sections: [
      {
        heading: 'Overview',
        body: [
          'Parametric modelling, assembly design and the analysis that decides whether a part survives its first prototype. Most of my work starts here — as a sketch that has to become a real object with real clearances.',
          'The interesting constraint is almost never the geometry. It is the manufacturing process, the material on hand, and the tolerance stack that only shows up once three parts meet.',
        ],
      },
      {
        heading: 'What that involves',
        list: [
          'Parametric CAD with design intent that survives revision',
          'Tolerance stack-up analysis across multi-part assemblies',
          'FEA for load paths, stiffness and failure modes',
          'Design for additive, CNC and sheet-metal processes',
          'Fixture and jig design for repeatable assembly',
          'Iterating on printed prototypes before committing to metal',
        ],
      },
      {
        heading: 'Toolchain',
        specs: [
          ['CAD', 'Fusion 360, SolidWorks, OnShape'],
          ['Analysis', 'Static FEA, thermal, basic modal'],
          ['Fabrication', 'FDM and SLA printing, laser cutting, manual machining'],
          ['Metrology', 'Calipers, dial indicators, printed go/no-go gauges'],
        ],
      },
    ],
  },

  electronics: {
    kind: 'detail',
    title: 'Electronics',
    short: 'Electronics',
    theme: 'electronics',
    icon: 'electronics',
    tagline: 'Circuits, boards and the firmware sitting on top of them.',
    parent: 'engineering',
    sections: [
      {
        heading: 'Overview',
        body: [
          'Schematic capture through to a board that boots. Sensor front-ends, motor drive, power supplies, and the embedded firmware that has to be reliable when nobody is watching it.',
          'Analogue is where the difficulty hides. A digital bug is reproducible; a grounding problem is a weekend.',
        ],
      },
      {
        heading: 'What that involves',
        list: [
          'Schematic capture and multi-layer PCB layout',
          'Low-noise analogue front-ends for sensor measurement',
          'Switching and linear power supply design',
          'Motor drive: stepper, BLDC and closed-loop control',
          'Bare-metal and RTOS firmware on ARM and AVR targets',
          'Bring-up and debugging with scope, logic analyser and a lot of patience',
        ],
      },
      {
        heading: 'Toolchain',
        specs: [
          ['EDA', 'KiCad, Altium'],
          ['Targets', 'STM32, ESP32, AVR, RP2040'],
          ['Bus work', 'I²C, SPI, UART, CAN, USB'],
          ['Bench', 'Mixed-signal scope, logic analyser, bench PSU, hot air'],
        ],
      },
    ],
  },

  software: {
    kind: 'detail',
    title: 'Software',
    short: 'Software',
    theme: 'software',
    icon: 'software',
    tagline: 'The layer that makes the hardware behave.',
    parent: 'engineering',
    sections: [
      {
        heading: 'Overview',
        body: [
          'Control loops, motion planning, data pipelines and the interfaces people actually touch. Software is where a mechanism stops being a mechanism and starts being a tool.',
          'The projects here all need the same things: deterministic timing at the bottom, something legible at the top, and a clean seam between them.',
        ],
      },
      {
        heading: 'What that involves',
        list: [
          'Real-time control loops and motion planning',
          'Kinematics and coordinate transforms for multi-axis machines',
          'Computer vision pipelines for tracking and inspection',
          'Signal processing on noisy sensor data',
          'Web interfaces and dashboards for instruments',
          'Test harnesses that catch regressions before the hardware does',
        ],
      },
      {
        heading: 'Toolchain',
        specs: [
          ['Languages', 'C, C++, Python, JavaScript'],
          ['Numerics', 'NumPy, SciPy, OpenCV'],
          ['Interfaces', 'React, WebSockets, MQTT'],
          ['Infrastructure', 'Linux, Git, CI pipelines, containers'],
        ],
      },
    ],
  },

  // ── Projects ────────────────────────────────────────────────────────────
  projects: {
    kind: 'collection',
    title: 'Projects',
    short: 'Projects',
    theme: 'projects',
    icon: 'projects',
    tagline: 'Things built, half-built, and still on the bench.',
    intro:
      'A handful of larger builds, plus a lab of smaller experiments. Each one exists because something was easier to learn by making it than by reading about it.',
    items: [
      'five-axis-printer',
      'underwater-probe',
      'piezo-microscope',
      'personal-submarine',
      'smaller-projects',
    ],
    links: [
      { to: 'universe', label: 'Universe', direction: 'back' },
      { to: 'engineering', label: 'Engineering', direction: 'forward' },
    ],
  },

  'five-axis-printer': {
    kind: 'detail',
    title: '5-Axis 3D Printer',
    short: '5-Axis',
    theme: 'projects',
    icon: 'printer',
    tagline:
      'Additive manufacturing with a bed that rotates and tilts mid-print, so overhangs stop needing support.',
    status: 'In development',
    parent: 'projects',
    sections: [
      {
        heading: 'Overview',
        body: [
          'A printer that rotates and tilts the build plate while printing, letting the nozzle reach geometry that a three-axis machine can only produce with sacrificial support material.',
          'It is essentially FDM printing married to CNC-style five-axis motion: the same extruder, a far more interesting coordinate system.',
        ],
      },
      {
        heading: 'Key features',
        list: [
          'Simultaneous five-axis motion with real-time inverse kinematics',
          'Custom G-code interpreter for non-planar toolpaths',
          'Collision detection between nozzle, part and bed',
          'Automatic calibration and bed levelling',
          'Support-free printing for steep overhangs',
          'Heated chamber for warp-prone materials',
        ],
      },
      {
        heading: 'Specifications',
        specs: [
          ['Motion', 'Custom controller with closed-loop stepper drivers'],
          ['Build volume', '200 × 200 × 150 mm, fully reachable'],
          ['Layer height', '0.05 – 0.3 mm, variable'],
          ['Materials', 'PLA, PETG, ABS, TPU, carbon-fibre composites'],
        ],
      },
      {
        heading: 'Where it stands',
        body: [
          'The prototype prints. Test parts with 70° overhangs come off the bed clean and support-free, which was the whole point.',
          'Current work is on the slicer: planar slicing throws away most of the machine, so the toolpath generator is being rewritten around curved layers.',
        ],
      },
    ],
  },

  'underwater-probe': {
    kind: 'detail',
    title: 'Underwater Probe',
    short: 'Probe',
    theme: 'deep',
    icon: 'probe',
    tagline:
      'An autonomous vehicle for water-quality survey work, rated to 500 metres.',
    status: 'Field testing',
    parent: 'projects',
    sections: [
      {
        heading: 'Overview',
        body: [
          'A self-navigating probe that runs survey transects and logs water chemistry, imagery and position without a tether. Built for environmental monitoring where sending a boat out every week is not practical.',
          'Everything about the design is downstream of one constraint: at depth, a single seal failure ends the mission and the hardware.',
        ],
      },
      {
        heading: 'Key features',
        list: [
          'Pressure-resistant hull with redundant seal design',
          'Full-coverage camera system with LED arrays',
          'Water-quality sensing: pH, temperature, salinity, turbidity',
          'Surface GPS fix and telemetry uplink between dives',
          'Emergency ballast release as a hardware-level failsafe',
          'Autonomous waypoint navigation with obstacle avoidance',
        ],
      },
      {
        heading: 'Specifications',
        specs: [
          ['Compute', 'Raspberry Pi 4 with custom sensor interface boards'],
          ['Depth rating', '500 m operational, tested to 600 m'],
          ['Endurance', 'Up to 12 hours continuous'],
          ['Propulsion', 'Vectored thrust, redundant motors'],
          ['Comms', 'Acoustic modem at depth, RF telemetry at surface'],
        ],
      },
      {
        heading: 'Where it stands',
        body: [
          'Shallow-water trials are complete. Autonomous navigation, logging and emergency recovery all behaved as designed across repeated dives.',
          'Next is a deep trial, and a classifier that flags marine life in the captured imagery so the survey data does not need reviewing frame by frame.',
        ],
      },
    ],
  },

  'piezo-microscope': {
    kind: 'detail',
    title: 'Piezoelectric Microscope',
    short: 'Microscope',
    theme: 'optics',
    icon: 'microscope',
    tagline:
      'Sub-nanometre sample positioning using piezo actuators with capacitive feedback.',
    status: 'Prototype',
    parent: 'projects',
    sections: [
      {
        heading: 'Overview',
        body: [
          'A positioning stage that holds a sample steady to a fraction of a nanometre, built to make long imaging sessions possible without drift eating the result.',
          'The imaging is the easy half. The hard half is a stage that does not move when the building does.',
        ],
      },
      {
        heading: 'Key features',
        list: [
          'Sub-nanometre positioning, ±0.1 nm demonstrated',
          'Active vibration compensation from accelerometer feedback',
          'Automated sample navigation with drift correction',
          'Environmental chamber for controlled temperature and humidity',
          'Assisted image analysis for repeated feature detection',
          'Scripted acquisition for unattended overnight runs',
        ],
      },
      {
        heading: 'Specifications',
        specs: [
          ['Stage', 'Three-axis piezo actuators, capacitive position feedback'],
          ['Resolution', '0.1 nm positioning accuracy'],
          ['Electronics', 'Custom low-noise amplifiers and DAQ'],
          ['Control', 'LabVIEW acquisition, MATLAB image processing'],
          ['Environment', '±0.01 °C stability, passive vibration isolation'],
        ],
      },
      {
        heading: 'Where it stands',
        body: [
          'The stage holds 0.1 nm through multi-hour sessions with drift inside the noise floor, which is the specification it was built to hit.',
          'Work continues on automated feature detection and on sample holders that suit biological work rather than rigid materials.',
        ],
      },
    ],
  },

  'personal-submarine': {
    kind: 'detail',
    title: 'Personal Submarine',
    short: 'Submarine',
    theme: 'marine',
    icon: 'submarine',
    tagline:
      'A single-seat submersible with an acrylic viewing dome, rated to 30 metres.',
    status: 'Concept',
    parent: 'projects',
    sections: [
      {
        heading: 'Overview',
        body: [
          'A compact one-person submersible for shallow-water observation and photography, built around a transparent dome that puts the pilot inside the view rather than behind a porthole.',
          'A vehicle carrying a person is a different discipline to one carrying sensors. Every subsystem gets a second, independent way to fail safely.',
        ],
      },
      {
        heading: 'Key features',
        list: [
          'Panoramic acrylic dome for unobstructed visibility',
          'Electric thrusters with variable-speed control',
          'Automatic ballast release for emergency ascent',
          'Integrated camera systems for documentation',
          'Life support with CO₂ scrubbing and air recycling',
          'LED arrays for illumination below the light line',
        ],
      },
      {
        heading: 'Specifications',
        specs: [
          ['Hull', 'Marine-grade aluminium with acrylic viewing sphere'],
          ['Depth rating', '30 m operational, tested to 45 m'],
          ['Dive duration', 'Up to 6 hours on life support'],
          ['Propulsion', 'Battery-electric thrusters, 8 hours runtime'],
          ['Safety', 'Emergency ascent, surface beacon, acoustic comms'],
        ],
      },
      {
        heading: 'Where it stands',
        body: [
          'Pressure testing and emergency-systems validation are complete, including escape procedures run in controlled conditions.',
          'The remaining work is certification, plus navigation and communication upgrades that a certified vessel would need anyway.',
        ],
      },
    ],
  },

  // ── The lab ─────────────────────────────────────────────────────────────
  'smaller-projects': {
    kind: 'collection',
    title: 'Innovation Lab',
    short: 'Lab',
    theme: 'lab',
    icon: 'lab',
    tagline: 'Smaller experiments, built to answer one question each.',
    status: 'Ongoing',
    parent: 'projects',
    intro:
      'Short-cycle builds and proof-of-concept work. Each one exists to test a single idea quickly, and most of them feed something back into the larger projects.',
    items: [
      'iot-weather-station',
      'gesture-drone-interface',
      'autonomous-garden',
      'holographic-display',
      'neural-network-music',
      'magnetic-levitation',
    ],
    links: [{ to: 'projects', label: 'Projects', direction: 'back' }],
  },

  'iot-weather-station': {
    kind: 'detail',
    title: 'IoT Weather Station',
    short: 'Weather',
    theme: 'deep',
    icon: 'weather',
    tagline:
      'A solar-powered sensor package logging local conditions to a web dashboard.',
    status: 'Deployed',
    parent: 'smaller-projects',
    sections: [
      {
        heading: 'Overview',
        body: [
          'An autonomous weather station that measures the usual atmospheric parameters and pushes them to a dashboard, running entirely off solar with no site visits.',
          'The engineering problem is not the sensing. It is surviving a year outdoors on a power budget that a cloudy week has to fit inside.',
        ],
      },
      {
        heading: 'Key features',
        list: [
          'Temperature, humidity and barometric pressure logging',
          'Wind speed and direction from an anemometer array',
          'Rainfall detection and accumulation tracking',
          'Solar radiation and UV index measurement',
          'LoRaWAN uplink with cellular fallback',
          'Web dashboard with historical charts',
        ],
      },
      {
        heading: 'Specifications',
        specs: [
          ['Compute', 'ESP32 with a low-power sensor interface board'],
          ['Power', '20 W panel, 12 V lithium pack, MPPT charging'],
          ['Sampling', 'Five-minute interval, one year of local storage'],
          ['Comms', 'LoRaWAN primary, 4G LTE backup'],
          ['Enclosure', 'IP65, radiation-shielded sensor head'],
        ],
      },
      {
        heading: 'Where it stands',
        body: [
          'Running continuously for six months at 99.8% uptime, tracking a reference station closely enough that the readings are usable.',
          'Next is a second and third node, which turns a single station into a small distributed network worth doing forecasting on.',
        ],
      },
    ],
  },

  'gesture-drone-interface': {
    kind: 'detail',
    title: 'Gesture Drone Interface',
    short: 'Gestures',
    theme: 'optics',
    icon: 'drone',
    tagline: 'Flying a drone with hand tracking instead of a controller.',
    status: 'Beta',
    parent: 'smaller-projects',
    sections: [
      {
        heading: 'Overview',
        body: [
          'A vision system that reads hand pose from a depth camera and maps it to flight commands, so a pilot can frame a shot by pointing at it.',
          'Gesture control is easy to demo and hard to trust. Most of the work went into making the failure modes boring: an unrecognised gesture must always mean hold position, never something creative.',
        ],
      },
      {
        heading: 'Key features',
        list: [
          'Real-time hand tracking from a depth camera',
          'Learned gesture classification at 98% accuracy',
          'Point to steer, palm angle for altitude',
          'Dedicated emergency-stop gesture for immediate landing',
          'Customisable gesture bindings for advanced manoeuvres',
          'On-screen overlay showing the recognised state',
        ],
      },
      {
        heading: 'Specifications',
        specs: [
          ['Vision', 'Intel RealSense D435i depth and RGB'],
          ['Compute', 'NVIDIA Jetson Nano, on-device inference'],
          ['Latency', 'Under 50 ms, gesture to command'],
          ['Range', 'Reliable detection to 3 m'],
          ['Integration', 'DJI SDK'],
        ],
      },
      {
        heading: 'Where it stands',
        body: [
          'Beta testing with experienced pilots showed a clear preference over a controller for slow, framed camera moves — and a clear preference against it for anything fast.',
          'That result set the direction: it is a cinematography interface, not a replacement for sticks.',
        ],
      },
    ],
  },

  'autonomous-garden': {
    kind: 'detail',
    title: 'Autonomous Garden',
    short: 'Garden',
    theme: 'software',
    icon: 'garden',
    tagline: 'Irrigation that decides for itself when and how much to water.',
    status: 'Field testing',
    parent: 'smaller-projects',
    sections: [
      {
        heading: 'Overview',
        body: [
          'A zoned irrigation system driven by soil sensing and a weather forecast rather than a timer, with a camera watching for the visual signs of stress a moisture probe misses.',
          'A timer waters on Tuesday whether it rained on Monday or not. Almost all of the water saving comes from simply not doing that.',
        ],
      },
      {
        heading: 'Key features',
        list: [
          'Multi-zone soil moisture and pH monitoring',
          'Automated drip irrigation with per-zone valve control',
          'Plant health assessment from multispectral imaging',
          'Forecast integration to skip watering before rain',
          'Mobile dashboard with alerts',
          'Solar power with rainwater collection',
        ],
      },
      {
        heading: 'Specifications',
        specs: [
          ['Compute', 'Raspberry Pi 4 with a custom sensor board'],
          ['Irrigation', 'Eight zones, solenoid valve control'],
          ['Sensing', 'Soil moisture, pH, temperature, light, humidity'],
          ['Vision', 'Pi HQ camera with multispectral filters'],
          ['Power', '100 W solar with battery backup'],
        ],
      },
      {
        heading: 'Where it stands',
        body: [
          'A season of field testing showed roughly 40% less water used than the timer it replaced, with better plant health across fifteen species.',
          'Pest detection is the next addition — the camera is already there, it just is not being asked the right question yet.',
        ],
      },
    ],
  },

  'holographic-display': {
    kind: 'detail',
    title: 'Holographic Display',
    short: 'Hologram',
    theme: 'marine',
    icon: 'hologram',
    tagline:
      'A volumetric display built from a swept LED matrix and persistence of vision.',
    status: 'Research',
    parent: 'smaller-projects',
    sections: [
      {
        heading: 'Overview',
        body: [
          'A display that produces a genuine three-dimensional image in a volume of air, viewable from any angle without glasses, by sweeping a high-speed LED matrix through space.',
          'Volumetric rendering is a different problem to conventional graphics: there is no camera, no occlusion, and no back face to cull.',
        ],
      },
      {
        heading: 'Key features',
        list: [
          'Full 360° viewing with real depth parallax',
          'Over 10,000 addressable points in the swept volume',
          'Persistence-of-vision reconstruction at video rates',
          'Real-time data visualisation input',
          'Gesture control for rotating and slicing the volume',
          'Rendering engine written for voxels rather than pixels',
        ],
      },
      {
        heading: 'Specifications',
        specs: [
          ['Volume', '64 × 64 × 64 voxels, RGB'],
          ['Refresh', '60 Hz volumetric, flicker-free'],
          ['Rendering', 'FPGA pipeline for the real-time voxel path'],
          ['Drive', 'Custom PCB with high-speed constant-current drivers'],
          ['Power', '500 W with active thermal management'],
        ],
      },
      {
        heading: 'Where it stands',
        body: [
          'The prototype renders geometry and live data plots cleanly, bright enough to read in a normally lit room.',
          'Doubling to 128³ is the next step, which is mostly a memory-bandwidth problem rather than an optical one.',
        ],
      },
    ],
  },

  'neural-network-music': {
    kind: 'detail',
    title: 'Neural Music Generator',
    short: 'Music',
    theme: 'optics',
    icon: 'music',
    tagline: 'A sequence model that composes MIDI across several genres.',
    status: 'Experiment',
    parent: 'smaller-projects',
    sections: [
      {
        heading: 'Overview',
        body: [
          'A transformer trained on MIDI that generates original compositions, with enough parameter control to steer it toward a genre, tempo and mood rather than just sampling from it blindly.',
          'Symbolic music turns out to be an unusually good sequence-modelling problem: the structure is long-range, but the vocabulary is small and the output is directly playable.',
        ],
      },
      {
        heading: 'Key features',
        list: [
          'Trained across classical, jazz, electronic and rock',
          'Real-time generation with adjustable parameters',
          'Style transfer between genres on a fixed melody',
          'Browser interface for interactive composition',
          'MIDI export into standard DAWs and hardware',
          'Continuation mode that extends a human-written phrase',
        ],
      },
      {
        heading: 'Specifications',
        specs: [
          ['Architecture', 'Transformer with relative positional attention'],
          ['Training data', '50,000+ MIDI files across genres and eras'],
          ['Hardware', 'Single RTX 4090 for training and inference'],
          ['Output', 'MIDI, rendered WAV, live DAW routing'],
          ['Interface', 'Web GUI with real-time parameter control'],
        ],
      },
      {
        heading: 'Where it stands',
        body: [
          'Output is harmonically coherent and stylistically consistent over a couple of minutes, which is roughly where the attention window stops helping.',
          'The interesting direction is not autonomy but collaboration: continuation and re-harmonisation of a human part beats generation from nothing.',
        ],
      },
    ],
  },

  'magnetic-levitation': {
    kind: 'detail',
    title: 'Magnetic Levitation',
    short: 'Levitation',
    theme: 'lab',
    icon: 'magnet',
    tagline: 'Objects held in mid-air by a 1 kHz feedback loop.',
    status: 'Working',
    parent: 'smaller-projects',
    sections: [
      {
        heading: 'Overview',
        body: [
          'An electromagnetic suspension rig that holds small objects stationary in mid-air, correcting position a thousand times a second against a fundamentally unstable equilibrium.',
          'Magnetic levitation is the textbook unstable plant: no passive arrangement of magnets holds still. Everything you see is the controller working.',
        ],
      },
      {
        heading: 'Key features',
        list: [
          'Hall-sensor position feedback with 0.1 mm resolution',
          'PID control tuned for disturbance rejection',
          'Independent control of multiple levitated objects',
          'Gesture and touch interaction to move the setpoint',
          'LED lighting synchronised to object position',
          'Sound-reactive mode driven by audio envelope',
        ],
      },
      {
        heading: 'Specifications',
        specs: [
          ['Control', 'Arduino Mega with custom electromagnet drivers'],
          ['Sensing', 'Hall effect array, 0.1 mm resolution'],
          ['Actuation', 'Custom-wound coils with variable field strength'],
          ['Loop rate', '1 kHz'],
          ['Payload', '1 – 50 g within a 200 mm³ working volume'],
          ['Supply', '24 V switched-mode with current limiting'],
        ],
      },
      {
        heading: 'Where it stands',
        body: [
          'Stable indefinitely, and it recovers from a deliberate nudge without losing the object — which is the honest test of the loop.',
          'Multi-object choreography is next, along with wireless power delivery so the levitated object can do something once it is up there.',
        ],
      },
    ],
  },
};

/**
 * Navigation graph. Levels are flat maps of ids; `children` opens a nested
 * level whose hub is the parent itself.
 */
export const graph = {
  ids: ['universe', 'engineering', 'memories', 'projects'],
  edges: {
    universe: ['engineering', 'memories', 'projects'],
    engineering: ['universe', 'projects'],
    memories: ['universe', 'projects'],
    projects: ['universe', 'engineering', 'memories'],
  },
  children: {
    engineering: {
      ids: ['engineering', 'mech-design', 'electronics', 'software'],
      edges: {
        engineering: ['mech-design', 'electronics', 'software'],
        'mech-design': ['engineering'],
        electronics: ['engineering'],
        software: ['engineering'],
      },
    },
    projects: {
      ids: [
        'projects',
        'five-axis-printer',
        'underwater-probe',
        'piezo-microscope',
        'personal-submarine',
        'smaller-projects',
      ],
      edges: {
        projects: [
          'five-axis-printer',
          'underwater-probe',
          'piezo-microscope',
          'personal-submarine',
          'smaller-projects',
        ],
        'five-axis-printer': ['projects'],
        'underwater-probe': ['projects'],
        'piezo-microscope': ['projects'],
        'personal-submarine': ['projects'],
        'smaller-projects': ['projects'],
      },
      children: {
        'smaller-projects': {
          ids: [
            'smaller-projects',
            'iot-weather-station',
            'gesture-drone-interface',
            'autonomous-garden',
            'holographic-display',
            'neural-network-music',
            'magnetic-levitation',
          ],
          edges: {
            'smaller-projects': [
              'iot-weather-station',
              'gesture-drone-interface',
              'autonomous-garden',
              'holographic-display',
              'neural-network-music',
              'magnetic-levitation',
            ],
            'iot-weather-station': ['smaller-projects'],
            'gesture-drone-interface': ['smaller-projects'],
            'autonomous-garden': ['smaller-projects'],
            'holographic-display': ['smaller-projects'],
            'neural-network-music': ['smaller-projects'],
            'magnetic-levitation': ['smaller-projects'],
          },
        },
      },
    },
  },
};

/** Resolve a path like ['projects', 'smaller-projects'] to a graph level. */
export const levelAt = (path) =>
  path.reduce((level, id) => level.children?.[id] ?? level, graph);

/** The deepest path that contains `id`, so navigation can jump across levels. */
export const pathTo = (id, level = graph, path = []) => {
  if (level.ids.includes(id)) return path;
  for (const [childId, childLevel] of Object.entries(level.children ?? {})) {
    const found = pathTo(id, childLevel, [...path, childId]);
    if (found) return found;
  }
  return null;
};
