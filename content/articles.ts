export interface ArticleItem {
  id: string;
  title: string;
  subtitle: string;
  author: string;
  category: string;
  readTime: string;
  date: string;
  coverImage?: string;
  summary: string;
  keywords: string[];
  executiveSummary: string[];
  keyPillars: string[];
  sections: {
    heading: string;
    image?: {
      url: string;
      caption: string;
    };
    subheadings?: {
      title: string;
      content: string;
    }[];
    content?: string[];
    infographic?: string;
    diagrams?: {
      title: string;
      ascii: string;
    }[];
    table?: {
      headers: string[];
      rows: string[][];
    };
  }[];
  references?: string[];
}

export const articlesData: ArticleItem[] = [
  {
    id: 'agentic-sdv-cockpit',
    title: 'Beyond the Wake Word: Designing Voice Interfaces Drivers Actually Want',
    subtitle: 'An Executive Briefing and Architectural Blueprint for the Agentic Software-Defined Cockpit',
    author: 'Varun Nayak',
    category: 'Automotive AI & SDV Architecture',
    readTime: '12 min read',
    date: 'July 2026',
    coverImage: '/images/blog/sdv_cockpit_voice_ai.jpg',
    summary: 'Why do drivers abandon automotive voice systems for physical buttons? This executive report details the engineering, human factors, and AI architectures required to build trusted, zero-latency agentic voice interfaces for software-defined vehicles.',
    keywords: ['Software-Defined Vehicles (SDV)', 'Automotive Voice UX', 'Conversational AI', 'Agentic HMI', 'Euro NCAP 2026', 'Cognitive Load', 'Edge AI', 'Sensor Fusion'],
    executiveSummary: [
      'The transition to Software-Defined Vehicles (SDVs) has sparked an unprecedented usability crisis. Driven by manufacturing cost reductions and aesthetic minimalism, automakers have consolidated critical vehicle controls into multi-layered touchscreen menus. The consequence is severe visual-manual distraction, driving a historic surge in consumer quality complaints (averaging 49.1 PP100 in J.D. Power studies).',
      'In response, Euro NCAP’s 2026 guidelines will deduct safety points unless physical switches are provided for critical functions (horn, wipers, turn signals, hazards, e-Call).',
      'To navigate this regulatory and usability bottleneck, OEMs must elevate voice from an auxiliary novelty to the primary, high-performance interface for non-driving tasks. This report outlines the structural evolution of the automotive cabin from screen-dependency to Agentic HMI—systems that synthesize gaze tracking, biometric state, and vehicle telemetry to act as trusted co-drivers.'
    ],
    keyPillars: [
      'The 500ms Latency Budget: Edge-native processing (INT4/INT8 small language models on-chip) is non-negotiable for driver trust.',
      'Multimodal Sensor Fusion: Integrating eye-tracking, steering-wheel pressure, and cabin acoustics prevents conversational collisions.',
      'Trust Calibration: Dynamic API safety gatekeepers on RTOS (QNX/VxWorks) enforce deterministic safety checks before CAN execution.'
    ],
    sections: [
      {
        heading: 'Strategic Foundations & Human Factors Ergonomics',
        subheadings: [
          {
            title: 'Glance Time Thresholds',
            content: 'Visual-manual distractions exceeding 2.0 seconds significantly elevate crash risk (NHTSA & AAA Foundation for Traffic Safety). Touchscreens force continuous visual feedback loops, draining the driver limited cognitive pool.'
          },
          {
            title: 'The 500ms Latency Boundary',
            content: 'Human conversational turn-taking naturally occurs at 200ms–300ms intervals. User frustration spikes when response latency exceeds 500ms, and interaction failure is guaranteed above 1.5 seconds due to speech overlapping.'
          },
          {
            title: 'Euro NCAP 2026 Safety Mandate',
            content: 'Starting in 2026, points will be deducted under the "Safe Driving" metric if physical switches are not provided for five primary functions: horn, windshield wipers, turn signals, hazard warning lights, and emergency calls (e-Call).'
          }
        ],
        infographic: `+---------------------------------------------------------------------------------+
|                         VOICE INTERACTION RISK TYPOLOGY                         |
+---------------------------------------------------------------------------------+
|  [CRITICAL DOMAIN]     --> ADAS, Braking, Steering, Shifting                    |
|                            Action: STRICTLY FORBIDDEN FROM VOICE EXECUTION.     |
|                            Rationale: Millisecond-latency critical safety risks.|
|                                                                                 |
|  [CONTROL DOMAIN]      --> Sunroof, Wipers, Trunk, Charging Port                |
|                            Action: Explicit Multi-modal Confirmation Required.  |
|                            Rationale: High mechanical damage / safety risk.     |
|                                                                                 |
|  [UTILITY DOMAIN]      --> Climate, Seat Heaters, Massagers, Windows            |
|                            Action: Implicit / Single-Turn Direct Execution.      |
|                            Rationale: High-reversibility, low physical risk.    |
|                                                                                 |
|  [INFOTAINMENT DOMAIN] --> Music Selection, POI Search, Podcast Navigation      |
|                            Action: Generative Edge-AI Engine Active.            |
|                            Rationale: Highly complex, fluid search parameters.   |
+---------------------------------------------------------------------------------+`
      },
      {
        heading: 'System Architecture & Data Flow Pipelines',
        image: {
          url: '/images/blog/edge_sensor_fusion.jpg',
          caption: 'Figure 1: Multi-Modal Sensor Fusion & In-Cabin Spatial Audio Architecture'
        },
        diagrams: [
          {
            title: 'Figure 1: Multi-Modal Sensor Fusion Engine',
            ascii: `       +--------------------+      +--------------------+      +--------------------+
       |  Acoustic Array    |      | Driver Monitoring  |      |   CAN/LIN Bus      |
       |  (Beamforming Mic) |      | (Gaze/Fatigue Cam) |      | (Telemetry & State)|
       +---------+----------+      +---------+----------+      +---------+----------+
                 |                           |                           |
                 | Audio Stream              | Eye Gaze Vector           | Speed, Weather,
                 | & Spatial Origin          | & Attention State         | Cabin Temp
                 v                           v                           v
       +----------------------------------------------------------------------------+
       |                        In-Cabin Context Fusion Engine                      |
       |  - Maps audio origin to physical seat location                             |
       |  - Calculates Driver Cognitive Load Index (DCLI)                           |
       |  - Detects if driver is looking at HUD, mirror, or side display             |
       +-----------------------------------------+----------------------------------+
                                                 |
                                                 v
                               +----------------------------------+
                               |    Automotive Agentic Core       |
                               | (Local LLM / Orchestrator Engine)|
                               +-----------------+----------------+
                                                 |
                        +------------------------+------------------------+
                        |                                                 |
                        v                                                 v
        +-------------------------------+                 +-------------------------------+
        |   Safety Gatekeeper Engine    |                 |  Text-to-Speech (TTS) Engine  |
        | - Verifies speed boundaries   |                 | - Dynamic voice synthesis     |
        | - Check occupant presence     |                 | - Interruption-aware          |
        +---------------+---------------+                 +---------------+---------------+
                        |                                                 |
                        v                                                 v
        +-------------------------------+                 +-------------------------------+
        |    Vehicle Control Unit       |                 |       In-Cabin Speakers       |
        | (Ethernet/CAN Command Dispatch|                 |   (Zonal Spatial Audio)       |
        +-------------------------------+                 +-------------------------------+`
          },
          {
            title: 'Figure 2: The 500ms End-to-End Latency Budget',
            ascii: `  0 ms          100 ms          200 ms          300 ms          400 ms          500 ms
  +---------------+---------------+---------------+---------------+---------------+
  |  Wake Word    |   On-Device   |  Agent Intent | Safety Guard  |  Audio Synthes|
  |  & VAD        |   ASR (STT)   |  Extraction   | & CAN Exec    |  (TTS) / HUD  |
  +---------------+---------------+---------------+---------------+---------------+
  |<--- 80ms ---->|<--- 120ms --->|<--- 150ms --->|<---- 50ms --->|<--- 100ms --->|

  * VAD: Voice Activity Detection  * ASR: Automatic Speech Recognition  * TTS: Text-to-Speech`
          }
        ]
      },
      {
        heading: 'OEM Benchmarking: Usability Matrix',
        table: {
          headers: ['OEM / System', 'System Paradigm', 'Strengths', 'Key Failure Modes'],
          rows: [
            ['Apple CarPlay / Android Auto', 'Smartphone Mirroring', 'Polished NLU, seamless personal app sync', 'Isolated from CAN bus & spatial cabin sensors'],
            ['Mercedes-Benz MBUX', 'Premium Conversationalist', 'Deep vehicle integration, seat spatial acoustics', 'High latency in poor coverage, verbose responses'],
            ['Tesla Voice Assistant', 'Minimalist Commander', 'Fast execution speed via centralized E/E', 'Strictly deterministic, zero conversational repair'],
            ['NIO / XPENG (NOMI)', 'Edge Co-processor Avatar', 'Sub-400ms local execution, continuous multi-command', 'Polarizing physical avatar UI for Western markets']
          ]
        }
      },
      {
        heading: 'Engineering Blueprint: Edge-First Quantized Architecture',
        content: [
          'On-Device Small Language Models (SLMs): Running 3B to 8B parameter models quantized to INT4/INT8 directly on automotive NPUs (Qualcomm Snapdragon Cockpit Elite or NVIDIA DRIVE Thor) completely eliminates cellular latency and network dead zones.',
          'Guardrailing the Vehicle API Gateway: Probabilistic LLMs must never directly write to CAN/Ethernet buses. The SLM outputs structured JSON specifying intent, which is intercepted and validated by a deterministic RTOS safety gatekeeper (QNX/VxWorks) before hardware execution.',
          'Structured Low-Latency Prompts: Restricting system prompts to output tiny, strict JSON payloads ensures token generation completes in under 150ms.'
        ]
      }
    ],
    references: [
      'J.D. Power. (2025). Initial Quality Study (IQS) - Automotive Infotainment Quality Metrics.',
      'AAA Foundation for Traffic Safety. (2017). Visual and Cognitive Demands of In-Vehicle Infotainment Systems.',
      'National Highway Traffic Safety Administration (NHTSA). (2013). Visual-Manual Driver Distraction Guidelines.',
      'European New Car Assessment Programme (Euro NCAP). (2024). Assessment Guidelines 2026: Physical Controls and Safety Ratings.',
      'ISO 15007:2020 Road vehicles — Measurement of driver visual behaviour.'
    ]
  }
];

export function getArticleById(id: string): ArticleItem | undefined {
  return articlesData.find((article) => article.id === id);
}

export function getAllArticleIds(): string[] {
  return articlesData.map((article) => article.id);
}
