/**
 * All site content lives here.
 *
 * A node is one of three kinds:
 *   section — a hub that lists the projects beneath it
 *   project — a write-up
 *   about   — the single profile page
 *
 * `media` entries are intentional blanks: each one renders a labelled frame
 * where a photo, render, video or animation should be dropped in.
 */

export const nodes = {
  // ── Root ────────────────────────────────────────────────────────────────
  home: {
    kind: 'home',
    title: 'Shaurya Chauhan',
    short: 'Home',
    section: 'home',
    icon: 'home',
    tagline: 'Machines, models and field notes.',
  },

  // ── Workshop ────────────────────────────────────────────────────────────
  workshop: {
    kind: 'section',
    title: 'Workshop',
    short: 'Workshop',
    section: 'workshop',
    icon: 'workshop',
    tagline: 'Things with moving parts.',
    unit: 'builds',
    intro:
      'Machines built end to end — mechanism, electronics and the firmware that ties them together. Each of these started as a problem that was easier to understand by building it than by reading about it.',
    items: [
      'five-axis-printer',
      'hydrogen-car',
      'vtol-drone',
      'tshirt-cannon',
      'iss-radio',
    ],
    media: {
      kind: 'photo',
      note: 'Wide shot of the bench — printer, drone airframe and tooling',
    },
  },

  'five-axis-printer': {
    kind: 'project',
    title: '5-Axis 3D Printer',
    short: '5-Axis',
    section: 'workshop',
    icon: 'printer',
    meta: 'Personal build',
    status: 'Printing',
    parent: 'workshop',
    tagline:
      'CoreXYAB flying gantry over a custom trunnion, with firmware and a slicer written for it.',
    hero: {
      kind: 'photo',
      note: 'Hero — printer three-quarter view, gantry and trunnion visible',
    },
    sections: [
      {
        heading: 'Overview',
        body: [
          'A printer that tilts and rotates the part underneath a moving gantry, so the nozzle can reach faces a three-axis machine can only produce by printing sacrificial support and cutting it off afterwards.',
          'The motion system is CoreXYAB: a flying gantry carries X and Y, while A and B come from a trunnion cradle holding the bed. Every part of the stack above it — kinematics, firmware, slicer — had to be written to match, because none of the off-the-shelf tooling understands five axes.',
        ],
        media: {
          kind: 'animation',
          note: 'Loop — trunnion tilting through its A/B range with the gantry parked',
        },
      },
      {
        heading: 'Mechanism',
        list: [
          'CoreXYAB kinematics with a flying gantry for the linear axes',
          'Custom-designed trunnion cradle carrying the rotary A and B axes',
          'Belt paths routed to keep the gantry mass low and symmetric',
          'Bearing and preload design sized around the tilted-bed load case',
          'Cable management that survives full rotation without snagging',
        ],
        media: {
          kind: 'photo',
          note: 'Detail — trunnion assembly, bearing blocks and belt routing',
        },
      },
      {
        heading: 'Firmware and slicing',
        body: [
          'The firmware runs the inverse kinematics for all five axes and adds the corrections the machine needs to print cleanly: adaptive bed meshing to compensate for the cradle geometry, and input shaping to cancel the ringing a flying gantry produces at speed.',
          'Planar slicing throws away most of what the machine can do, so the slicer is optimisation-based — it chooses part orientation per region rather than committing to one build direction for the whole model.',
        ],
        media: {
          kind: 'animation',
          note: 'Screen capture — slicer solving orientation on an overhang-heavy part',
        },
      },
      {
        heading: 'Specifications',
        specs: [
          ['Kinematics', 'CoreXYAB, flying gantry, trunnion-mounted bed'],
          ['Axes', 'X, Y, Z linear · A, B rotary'],
          ['Firmware', 'Custom, with adaptive bed meshing and input shaping'],
          ['Slicer', 'Optimisation-based, non-planar toolpaths'],
          ['Design', 'Fusion 360'],
        ],
      },
      {
        heading: 'Where it stands',
        body: [
          'The machine prints, and steep overhangs come off the bed support-free — which was the whole reason for building it.',
          'Current work is on the slicer: the orientation solver is the part that decides whether five axes are worth the mechanical complexity, and it is where most of the remaining gains are.',
        ],
      },
    ],
  },

  'hydrogen-car': {
    kind: 'project',
    title: 'Hydrogen-Powered Car',
    short: 'H₂ Car',
    section: 'workshop',
    icon: 'hydrogen',
    meta: 'COSMOS, UCLA · Summer 2025',
    status: 'Built',
    parent: 'workshop',
    tagline:
      'A model car running on a custom reversible proton-exchange-membrane electrolyzer.',
    hero: {
      kind: 'photo',
      note: 'Hero — the car on the test track, electrolyzer stack visible',
    },
    sections: [
      {
        heading: 'Overview',
        body: [
          'Built at COSMOS UCLA: a hydrogen-powered vehicle whose interesting part is not the drivetrain but the cell. The same proton-exchange membrane stack runs in both directions — splitting water to store hydrogen, then recombining it to deliver power.',
          'Running a PEM reversibly means one set of hardware has to be tolerable at two very different operating points, and neither is where a dedicated cell would be optimised.',
        ],
        media: {
          kind: 'photo',
          note: 'Detail — electrolyzer stack, membrane and gas capture',
        },
      },
      {
        heading: 'What it involved',
        list: [
          'Modelling the vehicle before building it, then reconciling the two',
          'Designing and assembling a reversible PEM electrolyzer stack',
          'Gas capture and storage sized to the run the car had to complete',
          'Measuring round-trip efficiency across both modes of the cell',
          'Coursework in carbon capture and green-energy infrastructure alongside the build',
        ],
      },
      {
        heading: 'Specifications',
        specs: [
          ['Cell', 'Reversible proton-exchange membrane, custom stack'],
          ['Modes', 'Electrolysis for storage · fuel cell for drive'],
          ['Programme', 'COSMOS, UCLA — Summer 2025'],
        ],
      },
      {
        heading: 'What came out of it',
        body: [
          'The reversible cell is the honest lesson: the round-trip loss is large enough that reversibility only makes sense when the storage matters more than the efficiency. That framing carried into the carbon-capture side of the programme.',
        ],
      },
    ],
  },

  'vtol-drone': {
    kind: 'project',
    title: 'VTOL Survey Drone',
    short: 'VTOL',
    section: 'workshop',
    icon: 'drone',
    meta: 'Personal build',
    status: 'Flying',
    parent: 'workshop',
    tagline:
      'A dynamic-flight VTOL airframe that identifies foliage from the air in real time.',
    hero: {
      kind: 'video',
      note: 'Hero — transition from hover to forward flight, ground-camera view',
    },
    sections: [
      {
        heading: 'Overview',
        body: [
          'A drone for environmental monitoring that takes off vertically and then transitions to wing-borne flight, so it can launch from anywhere but still cover ground efficiently once it is up.',
          'Onboard, a geometric context transformer classifies foliage as the aircraft flies, which means a survey produces a labelled map rather than a folder of images to sort through afterwards.',
        ],
        media: {
          kind: 'photo',
          note: 'Detail — airframe on the ground, tilt mechanism and payload bay',
        },
      },
      {
        heading: 'What it involved',
        list: [
          'Airframe design for two flight regimes with one set of surfaces',
          'Flight-controller configuration through the hover-to-cruise transition',
          'Onboard inference with a geometric context transformer',
          'Real-time foliage identification tied to position data',
          'Payload and power budgeting against endurance',
        ],
        media: {
          kind: 'animation',
          note: 'Overlay — live classification output over the flight camera feed',
        },
      },
      {
        heading: 'Specifications',
        specs: [
          ['Configuration', 'VTOL, dynamic flight transition'],
          ['Perception', 'Geometric context transformer, onboard inference'],
          ['Application', 'Foliage identification for environmental survey'],
          ['Design', 'Fusion 360, custom flight-controller integration'],
        ],
      },
    ],
  },

  'tshirt-cannon': {
    kind: 'project',
    title: 'Pneumatic T-Shirt Cannon',
    short: 'Cannon',
    section: 'workshop',
    icon: 'cannon',
    meta: 'Built for California High School events',
    status: 'In service',
    parent: 'workshop',
    tagline: 'Three barrels, a two-stage supply, 200 psi, and a lot of margin.',
    hero: {
      kind: 'photo',
      note: 'Hero — the cannon set up at a rally, all three barrels visible',
    },
    sections: [
      {
        heading: 'Overview',
        body: [
          'A three-barrel pneumatic launcher built for school events. Pressure comes from a two-stage system: a scuba tank as the high-pressure reservoir, regulated down into a fire extinguisher body that acts as the firing plenum at 200 psi.',
          'Anything that stores this much energy and points at a crowd is a safety project first and a launcher second. Every component was chosen with a working pressure well above what the system can reach.',
        ],
        media: {
          kind: 'photo',
          note: 'Detail — regulator, plenum and valve assembly',
        },
      },
      {
        heading: 'What it involved',
        list: [
          'Two-stage supply: scuba tank reservoir regulated into a plenum',
          'Three independently triggered barrels off a shared plenum',
          'Fast-acting valve sizing so the shot uses the stored volume well',
          'Pressure relief and burst-rating margin on every pressurised part',
          'Range testing to set a safe operating pressure for indoor use',
        ],
      },
      {
        heading: 'Specifications',
        specs: [
          ['Barrels', 'Three, independently triggered'],
          ['Supply', 'Scuba tank reservoir into a fire-extinguisher plenum'],
          ['Operating pressure', '200 psi'],
        ],
      },
    ],
  },

  'iss-radio': {
    kind: 'project',
    title: 'Contacting the ISS',
    short: 'ISS Radio',
    section: 'workshop',
    icon: 'antenna',
    meta: 'Cal High Amateur Radio Club · K06MMZ',
    status: 'Contact made',
    parent: 'workshop',
    tagline:
      'A rooftop Yagi, a ten-minute pass, and a callsign on the other end at 7.66 km/s.',
    hero: {
      kind: 'photo',
      note: 'Hero — rooftop Yagi against the sky, operator at the rig',
    },
    sections: [
      {
        heading: 'Overview',
        body: [
          'Working the International Space Station — callsign NA1SS — from a rooftop-mounted Yagi. The station is only above the horizon for a few minutes at a time, so everything has to be aligned, tuned and tested before the pass begins.',
          'The hard part is Doppler: the station closes and then opens at orbital speed, so the receive frequency shifts across the pass and has to be tracked while you are trying to make the contact.',
        ],
        media: {
          kind: 'photo',
          note: 'Detail — antenna mount and feedline, pointed at the pass azimuth',
        },
      },
      {
        heading: 'What it involved',
        list: [
          'Rooftop Yagi installation, aiming and feedline work',
          'Pass prediction to know when the station is reachable and from where',
          'Doppler correction across the pass',
          'FCC Technician licensing and operation as K06MMZ',
          'Over 100 contacts and dozens of nets logged through the club station',
        ],
      },
      {
        heading: 'Specifications',
        specs: [
          ['Station', 'Cal High Amateur Radio Club'],
          ['Callsign', 'K06MMZ — FCC-certified Technician'],
          ['Antenna', 'Rooftop-mounted Yagi'],
          ['Contact', 'NA1SS — International Space Station'],
        ],
      },
    ],
  },

  // ── Code ────────────────────────────────────────────────────────────────
  code: {
    kind: 'section',
    title: 'Code',
    short: 'Code',
    section: 'code',
    icon: 'code',
    tagline: 'Models, pipelines and one flight simulator.',
    unit: 'projects',
    intro:
      'Software written to answer a question rather than to ship a product — mostly language models pointed at documents nobody wants to read by hand, plus a physics sandbox built for the fun of it.',
    media: {
      kind: 'animation',
      note: 'Loop — the OSDR gap map rendering, or a terminal running the pipeline',
    },
    items: ['osdr-platform', 'market-nlp', 'flight-sim'],
  },

  'osdr-platform': {
    kind: 'project',
    title: 'NASA OSDR Research-Gap Platform',
    short: 'OSDR',
    section: 'code',
    icon: 'dataset',
    meta: 'NASA Ames Research Center · Summer 2026',
    status: 'Deployed',
    parent: 'code',
    tagline:
      'An NLP platform on NASA servers that maps where space-biology and crop-science research has not been done.',
    hero: {
      kind: 'animation',
      note: 'Hero — the gap map, filtered from all organisms down to one',
    },
    sections: [
      {
        heading: 'Overview',
        body: [
          'Built and deployed on NASA OSDR servers during an internship at Ames. The platform reads across the space-biology and crop-science literature and datasets and surfaces the gaps — the organism, tissue and condition combinations that nobody has run yet.',
          'The reason this is worth automating is that the absence of a study is invisible when you are reading one paper at a time. It only appears once the whole corpus is in the same coordinate system.',
        ],
      },
      {
        heading: 'What it involved',
        list: [
          'NLP pipeline over space-biology and crop-science literature',
          'Analysis of paired terrestrial and spaceflight RNA-Seq datasets',
          'Resolving sparsity where spaceflight sample counts are very low',
          'Deployment onto NASA OSDR infrastructure',
          'A Level-2 peer-reviewed report presented at the Ames OSTEM symposium',
        ],
        media: {
          kind: 'photo',
          note: 'Photo — presenting the report at the Ames OSTEM symposium',
        },
      },
      {
        heading: 'Specifications',
        specs: [
          ['Domain', 'Space biology and crop science'],
          ['Data', 'Terrestrial and spaceflight RNA-Seq'],
          ['Deployment', 'NASA OSDR servers, accessible across divisions'],
          ['Output', 'Level-2 peer-reviewed report, Ames OSTEM symposium'],
        ],
      },
      {
        heading: 'The sparsity problem',
        body: [
          'Spaceflight datasets are small by nature — flights are rare and sample counts are tiny. Comparing them directly against the much deeper terrestrial record biases every result toward whatever the ground data says.',
          'Most of the work went into handling that honestly, so a gap the platform reports is a real gap and not an artefact of how little flight data exists.',
        ],
      },
    ],
  },

  'market-nlp': {
    kind: 'project',
    title: 'Quarterly-Report Analyser',
    short: 'Reports',
    section: 'code',
    icon: 'trend',
    meta: 'Personal project',
    status: 'Working',
    parent: 'code',
    tagline:
      'BERT and a PyTorch transformer reading company quarterly filings for signal.',
    hero: {
      kind: 'animation',
      note: 'Hero — attention weights over a filing paragraph, or the prediction dashboard',
    },
    sections: [
      {
        heading: 'Overview',
        body: [
          'A model that reads company quarterly reports and turns the language in them into a forecast. Filings are long, formulaic and deliberately hedged, which makes them a good target: the informative part is in how something is said, not whether it is mentioned.',
          'BERT handles the sentence-level encoding; a PyTorch transformer sits on top to read across sections of a filing and across filings over time.',
        ],
      },
      {
        heading: 'What it involved',
        list: [
          'Parsing and cleaning quarterly filings into usable text',
          'Sentence-level encoding with BERT',
          'A PyTorch transformer over the encoded document sequence',
          'Framing the prediction target so the result is testable',
          'Backtesting against subsequent reported performance',
        ],
      },
      {
        heading: 'Specifications',
        specs: [
          ['Encoder', 'BERT'],
          ['Model', 'PyTorch transformer over document sequence'],
          ['Input', 'Company quarterly reports'],
          ['Stack', 'Python, PyTorch, NumPy, Pandas'],
        ],
      },
    ],
  },

  'flight-sim': {
    kind: 'project',
    title: 'Flight Simulator',
    short: 'Flight Sim',
    section: 'code',
    icon: 'plane',
    meta: 'Personal project',
    status: 'Playable',
    parent: 'code',
    tagline: 'A Unity flying game built around the physics rather than around the game.',
    hero: {
      kind: 'video',
      note: 'Hero — gameplay clip, a turn and a landing',
    },
    sections: [
      {
        heading: 'Overview',
        body: [
          'A flight game written in Unity where the flight model came first. Lift, drag and control authority are computed from the aircraft state rather than approximated with a scripted arcade feel.',
          'Accurate physics makes a game harder to fly and much more satisfying when it works. Most of the development was spent on the boundary between the two.',
        ],
        media: {
          kind: 'animation',
          note: 'Loop — force vectors drawn on the aircraft during a turn',
        },
      },
      {
        heading: 'What it involved',
        list: [
          'Aerodynamic force model driven by aircraft state',
          'Control-surface authority that varies with airspeed',
          'Stall and recovery behaviour that is recoverable but not free',
          'Camera and input tuning so the model stays flyable',
        ],
      },
      {
        heading: 'Specifications',
        specs: [
          ['Engine', 'Unity, C#'],
          ['Focus', 'Physically grounded flight model'],
        ],
      },
    ],
  },

  // ── Field notes ─────────────────────────────────────────────────────────
  field: {
    kind: 'section',
    title: 'Field Notes',
    short: 'Field',
    section: 'field',
    icon: 'field',
    tagline: 'Research done outdoors, or about outdoors.',
    unit: 'studies',
    intro:
      'Ecology and observational work — tide pools, watersheds, soil and, once, the weather on Jupiter. Different subjects, same method: collect carefully, compare against what was recorded before, and be honest about the noise.',
    media: {
      kind: 'photo',
      note: 'Wide shot — fieldwork in progress, sampling or survey equipment',
    },
    items: ['fertilizer-runoff', 'sea-anemones', 'soil-survey', 'jupiter-weather'],
  },

  'fertilizer-runoff': {
    kind: 'project',
    title: 'Fertilizer Runoff',
    short: 'Runoff',
    section: 'field',
    icon: 'flask',
    meta: 'COSMOS, UCLA · Summer 2025',
    status: 'Paper submitted',
    parent: 'field',
    tagline:
      'Modelling and wet-lab testing of what agricultural runoff does to a body of water.',
    hero: {
      kind: 'photo',
      note: 'Hero — wet lab bench, sample series showing the nutrient gradient',
    },
    sections: [
      {
        heading: 'Overview',
        body: [
          'A research project on how fertilizer runoff loads a body of water, combining mathematical modelling from the Sustainability Over Sets framework with wet-lab testing to check whether the model matched what actually happened in the water.',
          'Runoff is a good modelling target because the failure is non-linear: nothing much happens as loading increases, and then the system tips.',
        ],
      },
      {
        heading: 'What it involved',
        list: [
          'Mathematical modelling of nutrient loading over time',
          'Wet-lab testing across a controlled concentration series',
          'Reconciling measured response against the modelled prediction',
          'Leading the project team through design and analysis',
          'Writing as lead student author on a paper submitted to AIChE',
        ],
        media: {
          kind: 'animation',
          note: 'Chart — modelled loading curve against measured lab results',
        },
      },
      {
        heading: 'Specifications',
        specs: [
          ['Programme', 'COSMOS, UCLA — Summer 2025'],
          ['Method', 'Sustainability Over Sets modelling with wet-lab validation'],
          ['Role', 'Project lead, lead student author'],
          ['Output', 'Research paper submitted to AIChE'],
        ],
      },
    ],
  },

  'sea-anemones': {
    kind: 'project',
    title: 'Sea Anemone Feeding',
    short: 'Anemones',
    section: 'field',
    icon: 'wave',
    meta: 'UC Santa Cruz, Seymour Center · Summer 2024',
    status: 'Complete',
    parent: 'field',
    tagline:
      'How feeding behaviour changes across tidal zones, checked against forty years of records.',
    hero: {
      kind: 'photo',
      note: 'Hero — anemones in a tide pool at low tide, Natural Bridges',
    },
    sections: [
      {
        heading: 'Overview',
        body: [
          'A field study on the eating patterns of sea anemone species across tidal regions, run in the Seymour Center wet lab at UC Santa Cruz with observations collected at Natural Bridges State Beach.',
          'The value in the site is its history: the same location has been surveyed for four decades, so a season of new observations can be placed against a long baseline instead of standing alone.',
        ],
      },
      {
        heading: 'What it involved',
        list: [
          'Field observation across high, mid and low tidal regions',
          'Wet-lab study of feeding response under controlled conditions',
          'Tracking behaviour against temperature fluctuation and food availability',
          'Treating each tidal band as its own micro-ecosystem',
          'Comparison against forty years of historical survey data from the site',
        ],
        media: {
          kind: 'photo',
          note: 'Detail — wet lab setup at the Seymour Center',
        },
      },
      {
        heading: 'Specifications',
        specs: [
          ['Site', 'Seymour Center, UCSC · Natural Bridges State Beach'],
          ['Variables', 'Tidal region, temperature, food availability'],
          ['Baseline', '40 years of prior site data'],
        ],
      },
    ],
  },

  'soil-survey': {
    kind: 'project',
    title: 'Soil pH and Plant Density',
    short: 'Soil',
    section: 'field',
    icon: 'soil',
    meta: 'Chabot Space & Science Center · Climate Technology Inquiry Team',
    status: 'Ongoing',
    parent: 'field',
    tagline:
      'Mapping how soil chemistry sets what grows, and how densely, in Joaquin Miller Park.',
    hero: {
      kind: 'photo',
      note: 'Hero — sampling in Joaquin Miller Park, probe in the ground',
    },
    sections: [
      {
        heading: 'Overview',
        body: [
          'Field survey work through the Climate Technology Inquiry Team at Chabot: sampling soil pH across Joaquin Miller Park and mapping it against which plant types appear and how densely they grow.',
          'Putting the readings into ArcGIS is what turns a list of measurements into something you can read — the pattern is spatial, and it does not show up in a spreadsheet.',
        ],
      },
      {
        heading: 'What it involved',
        list: [
          'Soil pH sampling on a spatial grid across the park',
          'Recording plant type and density alongside each sample',
          'Building the survey into ArcGIS layers',
          'Looking for correlation between soil chemistry and species distribution',
        ],
        media: {
          kind: 'animation',
          note: 'Map — ArcGIS layer, pH surface with plant density overlaid',
        },
      },
      {
        heading: 'Specifications',
        specs: [
          ['Site', 'Joaquin Miller Park, Oakland'],
          ['Tools', 'ArcGIS, field sampling'],
          ['Programme', 'Chabot Space & Science Center, Oakland Space Academy'],
        ],
      },
    ],
  },

  'jupiter-weather': {
    kind: 'project',
    title: 'Weather on Jupiter',
    short: 'Jupiter',
    section: 'field',
    icon: 'planet',
    meta: 'Chabot Space & Science Center · Astronomy Inquiry Team',
    status: 'Ongoing',
    parent: 'field',
    tagline:
      'Using .fit captures to study how rotation and magnetic field hold Jupiter’s weather stable.',
    hero: {
      kind: 'photo',
      note: 'Hero — processed Jupiter capture showing banding and the Great Red Spot',
    },
    sections: [
      {
        heading: 'Overview',
        body: [
          'Astronomy Inquiry Team work at Chabot, analysing .fit image captures to study how Jupiter’s very strong magnetic field and very fast rotation combine to keep its weather patterns stable over long periods.',
          'Jupiter is the useful case precisely because its storms persist. On Earth a pressure system lasts days; there, the same features are still there decades later, which makes stability itself the thing to explain.',
        ],
      },
      {
        heading: 'What it involved',
        list: [
          'Working with .fit astronomical captures',
          'Tracking band structure and storm features between sessions',
          'Relating observed stability to rotation rate and magnetic field',
          'Presenting the findings in planetarium sessions for visitors',
        ],
        media: {
          kind: 'animation',
          note: 'Sequence — banding tracked across captures taken weeks apart',
        },
      },
      {
        heading: 'Specifications',
        specs: [
          ['Data', '.fit captures'],
          ['Subject', 'Band stability, rotation and magnetic field'],
          ['Programme', 'Chabot Space & Science Center, Oakland Space Academy'],
        ],
      },
    ],
  },

  // ── About ───────────────────────────────────────────────────────────────
  about: {
    kind: 'about',
    title: 'About',
    short: 'About',
    section: 'about',
    icon: 'about',
    tagline:
      'High school student in San Ramon, California, building machines and models.',
    parent: 'home',
    portrait: { kind: 'photo', note: 'Portrait — in the workshop or in the field' },
    intro: [
      'I am a student at California High School, class of 2027. Most of what is on this site started the same way: something looked interesting, reading about it was not enough, and building it turned out to be the fastest way to understand it.',
      'The work splits roughly three ways — machines with moving parts, models that read documents or data, and fieldwork outdoors. They inform each other more than the categories suggest.',
    ],
    groups: [
      {
        heading: 'Where I have worked',
        entries: [
          [
            'NASA Ames Research Center',
            'Built and deployed an NLP research-gap platform on OSDR servers; presented a Level-2 peer-reviewed report at the Ames OSTEM symposium.',
          ],
          [
            'Chabot Space & Science Center',
            'Oakland Space Academy intern. Planetarium presentations and science demonstrations, plus the Astronomy and Climate Technology inquiry teams.',
          ],
          [
            'COSMOS, UCLA',
            'Led a research project on fertilizer runoff and built a hydrogen-powered car around a reversible PEM electrolyzer.',
          ],
          [
            'UC Santa Cruz, Seymour Center',
            'Designed and ran a field study on sea anemone feeding behaviour across tidal regions.',
          ],
        ],
      },
      {
        heading: 'Tools',
        entries: [
          ['Design', 'Fusion 360, Blender, Techno CNC'],
          ['Programming', 'Python, C, C++, C#, Java, Unity'],
          ['Machine learning', 'PyTorch, BERT, spaCy, NumPy, Pandas'],
          ['Hardware', 'PCB design, flight controllers, FPGA, Raspberry Pi, Arduino'],
          ['Mapping', 'ArcGIS'],
        ],
      },
      {
        heading: 'Elsewhere',
        entries: [
          [
            'Amateur radio',
            'President of the Cal High Radio Club and FCC-certified Technician, callsign K06MMZ. Over 100 contacts logged, including the ISS.',
          ],
          [
            'Robotics',
            'VEX design award winner and board member; mentors incoming students and organises outreach events for local middle schools.',
          ],
          [
            'EcoAlliance',
            'Founder and president, running field-ecology activities aimed at data-driven conservation.',
          ],
          [
            'Mathematics',
            'AIME qualifier with distinction. First place worldwide at Purple Comet 2026; second overall at the UCLA Math Tournament.',
          ],
          [
            'Scouting',
            'Eagle Scout, Order of the Arrow. Led a 50-mile Philmont crew and a 15-scout build project for a local continuation school.',
          ],
        ],
      },
    ],
    contact: {
      label: 'Get in touch',
      email: 'shauryachauhan2050@gmail.com',
    },
  },
};

/** Navigation graph. `children` opens a nested level whose hub is the parent. */
export const graph = {
  ids: ['home', 'workshop', 'code', 'field', 'about'],
  edges: {
    home: ['workshop', 'code', 'field', 'about'],
    workshop: ['home', 'code', 'field'],
    code: ['home', 'workshop', 'field'],
    field: ['home', 'workshop', 'code'],
    about: ['home'],
  },
  children: {
    workshop: {
      ids: [
        'workshop',
        'five-axis-printer',
        'hydrogen-car',
        'vtol-drone',
        'tshirt-cannon',
        'iss-radio',
        'home',
      ],
      edges: {
        workshop: [
          'five-axis-printer',
          'hydrogen-car',
          'vtol-drone',
          'tshirt-cannon',
          'iss-radio',
          'home',
        ],
        'five-axis-printer': ['workshop'],
        'hydrogen-car': ['workshop'],
        'vtol-drone': ['workshop'],
        'tshirt-cannon': ['workshop'],
        'iss-radio': ['workshop'],
      },
    },
    code: {
      ids: ['code', 'osdr-platform', 'market-nlp', 'flight-sim', 'home'],
      edges: {
        code: ['osdr-platform', 'market-nlp', 'flight-sim', 'home'],
        'osdr-platform': ['code'],
        'market-nlp': ['code'],
        'flight-sim': ['code'],
      },
    },
    field: {
      ids: [
        'field',
        'fertilizer-runoff',
        'sea-anemones',
        'soil-survey',
        'jupiter-weather',
        'home',
      ],
      edges: {
        field: [
          'fertilizer-runoff',
          'sea-anemones',
          'soil-survey',
          'jupiter-weather',
          'home',
        ],
        'fertilizer-runoff': ['field'],
        'sea-anemones': ['field'],
        'soil-survey': ['field'],
        'jupiter-weather': ['field'],
      },
    },
  },
};

/** The shallowest path whose level contains `id`. */
export const pathTo = (id, level = graph, path = []) => {
  if (level.ids.includes(id)) return path;
  for (const [childId, childLevel] of Object.entries(level.children ?? {})) {
    const found = pathTo(id, childLevel, [...path, childId]);
    if (found) return found;
  }
  return null;
};

/**
 * The map level to draw for a given node. A node that opens into a level of
 * its own shows that level, so travelling to a section is the same gesture as
 * opening it — there is nothing extra to tap.
 */
export const levelFor = (id) => {
  if (graph.children?.[id]) return graph.children[id];
  const path = pathTo(id) ?? [];
  return path.reduce((level, step) => level.children?.[step] ?? level, graph);
};
