import { ServiceItem, TestimonialItem, GalleryPhoto, BlogPost } from '../types';

export const SITE_INFO = {
  brand: 'Solar Tech Systems',
  phone: '+91 77607 77162',
  phoneHref: 'tel:+917760777162',
  altPhone: '+91 89453 61784',
  altPhoneHref: 'tel:+918945361784',
  email: 'Info@solartechsystems.co.in',
  altEmail: 'info@sts.in',
  location: 'Bangalore, Karnataka, India',
  hours: 'Mon - Sat: 9:00 AM - 6:30 PM',
  mapEmbed: 'https://www.google.com/maps?q=Bangalore%2C%20Karnataka%2C%20India&output=embed',
  mapLink: 'https://www.google.com/maps/search/?api=1&query=Bangalore%2C%20Karnataka%2C%20India',
  establishedYear: '2016',
  incorporationHistory: 'Incorporated in 2011, establishing ourselves as a leading supplier of quality assured range of solar products and turnkey power infrastructure across Karnataka.',
  designerCredit: 'Designed By Taarruni'
};

export const SERVICES: ServiceItem[] = [
  {
    slug: 'solar-power-plant',
    file: 'solar-power-plant.html',
    title: 'Solar Power Plant',
    desc: 'Empowering industries with turnkey solar plants built for maximum output and reliability. From design to commissioning, Solartech delivers sustainable energy that performs.',
    img: '/images/service-solar-power-plant.jpg',
    features: [
      'Multi-megawatt ground-mounted plant engineering',
      'High-yield monocrystalline bifacial PV modules',
      'Centralized and string inverter SCADA architectures',
      'End-to-end grid interconnectivity and evacuation',
      'Comprehensive preventive O&M and remote monitoring'
    ],
    specs: [
      { label: 'Plant Scale', value: '100 kWp to 50+ MWp' },
      { label: 'Design Life', value: '25+ Years Guaranteed' },
      { label: 'Execution', value: 'Turnkey EPC & Civil Foundations' },
      { label: 'Compliance', value: 'MNRE, KERC & CEA Certified' }
    ]
  },
  {
    slug: 'solar-rooftop',
    file: 'solar-rooftop.html',
    title: 'Solar Rooftop',
    desc: 'Transform your rooftop into a powerhouse of savings and sustainability. Solartech rooftop systems combine smart design with seamless integration for long-term value.',
    img: '/images/service-solar-rooftop.jpg',
    features: [
      'Industrial shed, RCC slab, and commercial rooftop mounts',
      'Zero-penetration clamping systems protecting roof warranties',
      'Net metering approvals with state DISCOMs (BESCOM, MESCOM, CHESCOM)',
      'Tier-1 anti-reflective solar panels with micro-inverter options',
      'Immediate reduction in commercial electricity tariff costs'
    ],
    specs: [
      { label: 'Capacity', value: '10 kWp to 2 MWp' },
      { label: 'Payback Period', value: '3.2 to 4.5 Years' },
      { label: 'Structure', value: 'Hot-Dip Galvanized / Anodized Aluminum' },
      { label: 'Discom Liaison', value: '100% In-house Handling' }
    ]
  },
  {
    slug: '33kv-transmission-line',
    file: '33kv-transmission-line.html',
    title: '33 kV Transmission Line',
    desc: 'Precision-built transmission solutions that ensure uninterrupted energy flow. Solartech manages every stage - from material to ROW - with uncompromised efficiency.',
    img: '/images/service-33kv-transmission-line.jpg',
    features: [
      'Overhead lines and underground cabling installations',
      'Complete Right of Way (ROW) survey and statutory permissions',
      'Precision tower erection, stringing, and sag tensioning',
      'Lightning arrestors, insulators, and surge suppression',
      'CPRI tested conductors and structural hardware'
    ],
    specs: [
      { label: 'Voltage Class', value: '33 kV / 11 kV Rated' },
      { label: 'Conductor Types', value: 'ACSR Dog, Wolf, Panther & HTLS' },
      { label: 'Survey Tech', value: 'Total Station & GPS Profile Mapping' },
      { label: 'Testing', value: 'Hi-Pot, Insulation & Earth Resistance' }
    ]
  },
  {
    slug: '33-11kv-substation-uss',
    file: '33-11kv-substation-uss.html',
    title: '33 / 11 kV Substation (USS)',
    desc: 'Robust substations engineered for safety, stability, and seamless connectivity. Solartech designs and commissions USS systems that keep your power infrastructure future-ready.',
    img: '/images/service-33-11kv-substation.jpg',
    features: [
      'Compact Unitized Substation (USS) & outdoor switchyard setups',
      'Vacuum Circuit Breakers (VCB) and motorized isolators',
      'Automated numerical protection relays with trip logging',
      'Step-down power transformers with OLTC / OCTC mechanisms',
      'Complete electrical inspectorate (CEIG) sanction and clearance'
    ],
    specs: [
      { label: 'Substation Type', value: 'Unitized Substation / Conventional Yard' },
      { label: 'Transformer Rating', value: '1 MVA to 10 MVA' },
      { label: 'Protection', value: 'Differential, Overcurrent & Earth Fault' },
      { label: 'Clearance', value: 'CEIG & KPTCL Approved Standards' }
    ]
  }
];

export const WHY_CHOOSE_ITEMS = [
  {
    id: 'iso',
    title: 'ISO Certified Company',
    text: 'High-quality solar products and services, ensuring reliable, affordable, and sustainable energy solutions.',
    icon: '/images/icon-iso.png',
    badge: 'ISO Certified'
  },
  {
    id: 'quality',
    title: 'Quality Products',
    text: 'Top-tier solar solutions, ensuring durability, efficiency, and industry-standard performance across every component.',
    icon: '/images/icon-quality.png',
    badge: 'CPRI Tested'
  },
  {
    id: 'customers',
    title: 'Satisfied Customers',
    text: 'Solar Tech Systems delivers reliable solar solutions, earning the trust and long-term satisfaction of commercial and industrial clients.',
    icon: '/images/icon-customers.png',
    badge: '100% Reliable'
  }
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    avatar: '/images/avatars/rk.svg',
    name: 'Ramesh K.',
    role: 'Residential Rooftop, Mysuru',
    quote: 'From the first site inspection to final handover, the team stayed on schedule. The workmanship is tidy and the system has run without a single issue since commissioning.'
  },
  {
    avatar: '/images/avatars/ps.svg',
    name: 'Priya S.',
    role: 'Commercial Showroom, Bengaluru',
    quote: 'Our monthly electricity bills dropped noticeably within the first few months. Every component was explained in plain language, so we always knew what we were paying for.'
  },
  {
    avatar: '/images/avatars/am.svg',
    name: 'Anil M.',
    role: 'Industrial Plant, Hoskote',
    quote: 'They handled the complete 33 kV transmission line and substation scope under one roof. Coordinating with our plant team was smooth and commissioning landed on the promised date.'
  },
  {
    avatar: '/images/avatars/dn.svg',
    name: 'Deepa N.',
    role: 'Agricultural Irrigation Pump, Davangere',
    quote: 'The pump project has changed how we manage the fields. Power cuts no longer interrupt watering, and the guidance on panel placement was genuinely useful.'
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'industrial-megawatt-solar',
    slug: 'navigating-high-voltage-industrial-solar-karnataka',
    title: 'Grid Parity & Megawatt Plants: Navigating High-Voltage Industrial Solar in Karnataka',
    date: 'March 18, 2026',
    author: 'S. Rajagopal',
    authorRole: 'Chief Electrical Engineer',
    category: 'Industrial Solar',
    readTime: '5 min read',
    featuredImage: '/images/service-solar-power-plant.jpg',
    excerpt: 'How medium and large manufacturing enterprises in Karnataka are achieving sub-4-year payback through captive multi-megawatt solar plants and KERC open-access frameworks.',
    keyPoints: [
      'Levelized Cost of Electricity (LCOE) dropping below ₹2.85/kWh against grid tariffs of ₹7.50+/kWh.',
      'Navigating KPTCL evacuation approvals and dedicated feeder sync.',
      'Selecting bifacial Tier-1 modules with optimized ground albedo coating for 12% additional yield.'
    ],
    content: [
      'Industrial manufacturers in Karnataka face some of the highest commercial electricity tariffs in southern India, often exceeding ₹7.50 to ₹8.20 per unit during peak industrial shifts. For continuous manufacturing operations—ranging from precision engineering facilities in Peenya to textile processing mills near Tumakuru—power expenditures frequently account for 18% to 25% of total operational expenditure.',
      'Captive utility-scale solar plants connected at the 33 kV or 66 kV grid levels have transitioned from an environmental gesture into an essential financial hedge. By generating clean solar electricity right where high-tension power is evacuated, enterprises lock in a predictable Levelized Cost of Electricity (LCOE) below ₹2.85 per kWh over a guaranteed 25-year asset lifespan.',
      'At Solar Tech Systems, our engineering approach prioritizes site-specific topology and irradiance modeling. Deploying bifacial monocrystalline PERC and TOPCon modules on high-strength galvanized steel mounting structures elevates production even during monsoon overcast conditions. In tandem, high-efficiency string inverters offer granular Maximum Power Point Tracking (MPPT), isolating shading losses from dust or passing clouds.',
      'Crucially, successful industrial installations depend on rigorous grid integration. Obtaining statutory clearance from the Chief Electrical Inspector to Government (CEIG) and coordinating sync with Karnataka Power Transmission Corporation Limited (KPTCL) substations demands disciplined electrical engineering. By managing land feasibility, transformer selection, switchyard civil works, and DISCOM synchronization under one roof, Solar Tech Systems ensures seamless commercial operation on schedule.'
    ]
  },
  {
    id: 'commercial-rooftop-architecture',
    slug: 'commercial-rooftop-architecture-yield-net-metering',
    title: 'Commercial Rooftop Architecture: Maximizing Yield with Smart Ballasts & Net Metering',
    date: 'February 24, 2026',
    author: 'P. Hegde',
    authorRole: 'Lead Solar Architect',
    category: 'Rooftop Engineering',
    readTime: '4 min read',
    featuredImage: '/images/service-solar-rooftop.jpg',
    excerpt: 'A technical blueprint for modern commercial rooftops: avoiding roof penetrations, streamlining net-metering approvals, and optimizing self-consumption ratios.',
    keyPoints: [
      'Non-penetrative aerodynamic ballast racking preserving roof membrane warranties.',
      'Bi-directional net metering approvals across BESCOM and MESCOM territories.',
      'Thermal dissipation techniques that prevent high-temperature power curtailment.'
    ],
    content: [
      'Commercial roofs—whether expansive pre-engineered industrial shed sheeting or flat RCC building terraces—represent dormant productive real estate. However, building owners frequently hesitate over concerns regarding water leakages, structural load tolerances, and complex DISCOM paperwork.',
      'Modern rooftop solar engineering completely eliminates legacy risks through non-penetrative mounting hardware. On industrial metal trapezoidal roofing, specialized aluminum seam clamps lock directly onto standing ribs without piercing sheet metal. For concrete rooftops, wind-tunnel verified aerodynamic ballasted racks eliminate mechanical drilling entirely, maintaining original waterproofing membranes intact.',
      'Net metering under BESCOM, MESCOM, and CHESCOM policies allows commercial establishments to export weekend surplus generation directly back into the grid, accruing energy credits that offset weekday peak usage. By accurately sizing inverter capacities to meet transformer loading constraints, Solar Tech Systems ensures immediate approval without costly feeder augmentation.',
      'Our installations feature smart energy management telemetry. Facility managers gain real-time visibility into generation, internal load consumption, grid draw, and thermal performance metrics. With accelerated depreciation tax benefits and immediate OPEX cuts, commercial rooftop solar delivers an internal rate of return (IRR) typically exceeding 26%.'
    ]
  },
  {
    id: '33kv-transmission-line-engineering',
    slug: '33kv-transmission-line-engineering-row-clearance',
    title: '33 kV Transmission Line Engineering: ROW Approvals, Safety Clearances & Grid Synchrony',
    date: 'January 15, 2026',
    author: 'M. Nagaraj',
    authorRole: 'Head of Grid Infrastructure',
    category: 'Grid Infrastructure',
    readTime: '5 min read',
    featuredImage: '/images/service-33kv-transmission-line.jpg',
    excerpt: 'Overcoming Right of Way (ROW) hurdles, terrain profile variations, and insulator pollution to build resilient 33 kV evacuation lines for renewable energy clusters.',
    keyPoints: [
      'Precision GPS and Total Station profiling for statutory ground clearance compliance.',
      'Polymer vs porcelain insulator selection in agricultural and dust-heavy belts.',
      'Comprehensive hi-pot, earth resistance, and pre-commissioning safety audits.'
    ],
    content: [
      'A solar plant or wind energy facility is only as dependable as the transmission corridor connecting it to the state pooling substation. For voltages at 33 kV, line engineering demands meticulous balancing between civil geography, electrical safety rules, and local land rights.',
      'Right of Way (ROW) clearance remains the single largest operational risk in transmission line delivery. Navigating agricultural farmland, road crossings, water bodies, and telecommunication crossings requires early stakeholder alignment and strict adherence to the Central Electricity Authority (Safety Requirements for Operation and Maintenance of Transmission Lines) Regulations.',
      'Solar Tech Systems utilizes precision Total Station surveying and drone-assisted terrain mapping to optimize pole and tower spotting. By minimizing angular deviations and engineering custom span lengths, we reduce material costs while guaranteeing mandatory vertical ground clearances under maximum conductor sag conditions.',
      'To prevent flashovers in dusty rural corridors and industrial zones, we deploy silicone polymer composite insulators with superior hydrophobicity over conventional porcelain discs. Every line is equipped with lightning arrestors at strategic intervals, horn gaps, and continuous optical ground wire (OPGW) or earth wire protection, safeguarding costly substation transformers from upstream surges.'
    ]
  },
  {
    id: 'substation-uss-commissioning',
    slug: 'decentralized-33-11kv-uss-substations-renewable-clusters',
    title: 'Decentralized 33/11 kV USS Substations: Mitigating T&D Losses for Renewable Clusters',
    date: 'December 12, 2025',
    author: 'Technical Operations Team',
    authorRole: 'Substation Division',
    category: 'Power Distribution',
    readTime: '6 min read',
    featuredImage: '/images/service-33-11kv-substation.jpg',
    excerpt: 'Why compact Unitized Substations (USS) are outperforming conventional switchyards in footprint, commissioning speed, and operational safety.',
    keyPoints: [
      'Factory-assembled skid design reducing civil lead times by up to 60%.',
      'Vacuum circuit breakers and SF6 insulated switchgear for arc flash safety.',
      'Integrated SCADA gateways providing remote fault diagnosis and load balancing.'
    ],
    content: [
      'In power distribution, proximity to load centers and speed of deployment dictate long-term economic return. Conventional outdoor substations require extensive land parcels, multi-month masonry control room construction, and weeks of labor-intensive on-site cable laying and testing.',
      'The modern answer is the Unitized Substation (USS)—a factory-assembled, metal-clad enclosure integrating medium-voltage switchgear, hermetically sealed or dry-type power transformers, and low-voltage distribution panels onto a compact, single-skid footprint. Designed to withstand extreme ambient temperatures and monsoons, USS packages compress project commissioning from six months down to under 45 days.',
      'Safety and maintenance accessibility are paramount. High-voltage compartments utilize interlocked Vacuum Circuit Breakers (VCB) with internal arc classification, shielding field operators from catastrophic flashover risks. Sensitive microprocessor-based numerical relays monitor phase overcurrent, neutral unbalance, transformer oil temperatures, and winding hot spots with millisecond precision.',
      'Solar Tech Systems specializes in both bespoke outdoor AIS switchyards and skid-mounted USS installations. By integrating automated remote terminal units (RTUs), our substation deployments communicate live metrics directly to centralized monitoring desks, empowering maintenance teams to predict equipment degradation before costly power interruptions occur.'
    ]
  },
  {
    id: 'agricultural-solar-pumps-microgrids',
    slug: 'solar-agricultural-microgrids-rural-karnataka-resilience',
    title: 'Solar Agricultural Microgrids: Transforming Irrigation and Resilience Across Rural Karnataka',
    date: 'November 05, 2025',
    author: 'K. S. Patil',
    authorRole: 'Rural Energy Specialist',
    category: 'Rural & Agri Energy',
    readTime: '4 min read',
    featuredImage: '/images/about-solar.jpg',
    excerpt: 'How off-grid and grid-interactive solar irrigation pumps are decoupling farm productivity from erratic rural grid supply and diesel costs.',
    keyPoints: [
      'Solar variable frequency drive (VFD) controllers operating directly with borewell pumps.',
      'Decoupling crop watering cycles from erratic midnight agricultural power supply.',
      'Dual-use agrivoltaic layouts preserving ground cultivation beneath elevated solar structures.'
    ],
    content: [
      'Agriculture in Karnataka has historically contended with erratic rural grid supply. Farmers frequently receive subsidized agricultural power only in midnight shifts, forcing them into perilous nocturnal visits to distant fields to operate irrigation motors.',
      'Solar-powered water pumping systems—spearheaded under sustainable energy programs—fundamentally transform farm economics. By coupling high-durability solar PV arrays with Variable Frequency Drives (VFD), pumps operate seamlessly during peak daytime sun hours. The drive controller modulates pump motor speed according to solar irradiance, delivering steady water discharge even under hazy skies without battery storage degradation.',
      'Furthermore, elevated structural engineering enables agrivoltaic practices where shade-loving horticulture, legumes, or fodder crops thrive directly beneath panels. The panels reduce soil evaporation losses by up to 28%, creating a microclimate that conserves precious groundwater in drought-prone regions such as Davangere, Chitradurga, and Bagalkote.',
      'With over a decade of hands-on installation experience spanning hundreds of farm pumps, Solar Tech Systems designs systems built for real rural conditions: anti-theft security hardware, dust-resistant IP65 electronics, and sturdy automated water-level sensors preventing dry run damage.'
    ]
  }
];

export const GALLERY_PHOTOS: GalleryPhoto[] = [
  { file: 'IMG-20251014-WA0083.jpg', width: 384, height: 512, orientation: 'portrait', title: 'Solar Array Mounting Structure', caption: 'High-durability structural mounting for ground solar installation in Karnataka.' },
  { file: 'IMG-20251014-WA0084.jpg', width: 960, height: 1280, orientation: 'portrait', title: 'Substation Transformer Bushing', caption: 'Precision high-voltage bushing and cabling on 33 kV step-down transformer.' },
  { file: 'IMG-20251014-WA0085.jpg', width: 901, height: 1600, orientation: 'portrait', title: 'Substation Yard Structural Tower', caption: 'Lattice tower framework and overhead busbar assembly.' },
  { file: 'IMG-20251014-WA0077.jpg', width: 1600, height: 901, orientation: 'landscape', title: 'Solar Farm Array Panorama', caption: 'Continuous rows of monocrystalline panels engineered for peak sun capture.' },
  { file: 'IMG-20251014-WA0078.jpg', width: 1080, height: 816, orientation: 'landscape', title: 'Inverter & Combiner Enclosure', caption: 'Weather-sealed junction box and inverter termination field installation.' },
  { file: 'IMG-20251014-WA0079-1.jpg', width: 1600, height: 716, orientation: 'landscape', title: '33 kV Transmission Line Span', caption: 'Overhead 33 kV transmission line corridor spanning across rural terrain.' },
  { file: 'IMG-20251014-WA0080-1.jpg', width: 1600, height: 716, orientation: 'landscape', title: 'Commercial Rooftop Solar Grid', caption: 'Seamless rooftop solar array installed with zero roof membrane perforation.' },
  { file: 'IMG-20251014-WA0081.jpg', width: 1600, height: 716, orientation: 'landscape', title: 'Ground Array Lateral Alignment', caption: 'High-precision azimuth and tilt alignment for seasonal radiation optimization.' },
  { file: 'IMG-20251014-WA0074.jpg', width: 1600, height: 901, orientation: 'landscape', title: 'Solar Power Plant Evacuation Point', caption: 'Power evacuation switchgear connecting multi-megawatt array to regional grid.' },
  { file: 'IMG-20251014-WA0076.jpg', width: 1600, height: 901, orientation: 'landscape', title: 'Outdoor Substation Yard Enclosure', caption: 'Grounded security fencing and perimeter safety measures surrounding USS.' },
  { file: 'IMG-20251014-WA0072.jpg', width: 901, height: 1600, orientation: 'portrait', title: 'Isolator & Lightning Arrestor', caption: 'Substation gantry with motorized disconnector and surge arrestors.' },
  { file: 'IMG-20251014-WA0073.jpg', width: 1600, height: 901, orientation: 'landscape', title: 'Completed Megawatt Plant Field', caption: 'Finished solar power plant delivering renewable energy to local industrial grids.' },
  { file: 'IMG-20251014-WA0075.jpg', width: 1600, height: 901, orientation: 'landscape', title: 'Transformer Bay Commissioning', caption: 'Step-down oil-immersed transformer undergoing pre-commissioning testing.' },
  { file: 'IMG-20251014-WA0071-1.jpg', width: 1600, height: 901, orientation: 'landscape', title: 'Solar PV Field Wide Angle', caption: 'Turnkey solar power generation facility with automated SCADA tracking.' },
  { file: 'IMG-20251014-WA0067.jpg', width: 1600, height: 901, orientation: 'landscape', title: 'Solar Array String Combiner Installation', caption: 'DC combiner box and surge protection network in field operation.' },
  { file: 'IMG-20251014-WA0069.jpg', width: 960, height: 1280, orientation: 'portrait', title: 'Substation Control Panel Check', caption: 'Relay and metering panel inspection during final CEIG compliance inspection.' },
  { file: 'IMG-20251014-WA0070.jpg', width: 720, height: 1280, orientation: 'portrait', title: 'Substation Feeder Termination', caption: 'Medium-voltage feeder cable terminations and stress-cone safety joints.' },
  { file: 'IMG-20251014-WA0065.jpg', width: 1600, height: 716, orientation: 'landscape', title: 'Transmission Line Right-of-Way Corridor', caption: 'Clean ROW path cleared and surveyed for safe 33 kV line transmission.' },
  { file: 'IMG-20251014-WA0066.jpg', width: 1600, height: 901, orientation: 'landscape', title: 'Ground Array Landscape View', caption: 'Expansive solar array contributing green power to Karnataka electrical grid.' },
  { file: 'IMG-20251014-WA0060.jpg', width: 1280, height: 720, orientation: 'landscape', title: 'Rooftop Solar Installation Overview', caption: 'Elevated solar module setup on commercial terrace.' },
  { file: 'IMG-20251014-WA0061.jpg', width: 512, height: 384, orientation: 'landscape', title: 'Solar Inverter Display Monitoring', caption: 'Live digital monitoring unit tracking instantaneous kilowatt yield.' },
  { file: 'IMG-20251014-WA0057-1.jpg', width: 1600, height: 901, orientation: 'landscape', title: 'Solar Power Plant Engineering', caption: 'Commissioned power plant in full daytime sunlight production.' },
  { file: 'IMG-20251014-WA0058.jpg', width: 1600, height: 901, orientation: 'landscape', title: 'Module Wiring & Grounding Network', caption: 'Strict earthing and DC conduit routing adhering to safety specifications.' },
  { file: 'IMG-20251014-WA0059.jpg', width: 1600, height: 901, orientation: 'landscape', title: 'Renewable Power Installation Overview', caption: 'Clean energy generation site delivering uninterrupted commercial power.' },
  { file: 'IMG-20251014-WA0053.jpg', width: 1152, height: 864, orientation: 'landscape', title: 'Field Technical Team Review', caption: 'On-site engineers reviewing single-line diagrams and conductor tensions.' },
  { file: 'IMG-20251014-WA0054-1.jpg', width: 1600, height: 716, orientation: 'landscape', title: 'Unitized Substation USS Outdoor Unit', caption: 'Complete 33/11 kV compact substation enclosure in Chitradurga.' },
  { file: 'IMG-20251014-WA0055.jpg', width: 408, height: 306, orientation: 'landscape', title: 'Electrical Panel Inspection', caption: 'Circuit breaker verification and contact resistance check.' },
  { file: 'IMG-20251014-WA0056.jpg', width: 960, height: 1280, orientation: 'portrait', title: 'Substation Transformer Radiator Fins', caption: 'Heavy-duty oil radiator cooling system for continuous power step-down.' },
  { file: 'IMG-20251014-WA0051-1.jpg', width: 1600, height: 901, orientation: 'landscape', title: 'Solar Panel Array with Technician', caption: 'Quality assurance protocol underway on newly installed solar modules.' },
  { file: 'IMG-20251014-WA0052.jpg', width: 1280, height: 720, orientation: 'landscape', title: 'Ground Array Horizon Perspective', caption: 'High-yield utility array oriented towards true South solar coordinates.' },
  { file: 'IMG-20251014-WA0086-1.jpg', width: 1600, height: 716, orientation: 'landscape', title: '33 kV Transmission Line Mast Assembly', caption: 'Intermediate pole structure and cross-arm insulator fixtures.' },
  { file: 'IMG-20251014-WA0082.jpg', width: 716, height: 1600, orientation: 'portrait', title: 'Substation Yard Gantry Vertical', caption: 'Incoming high-tension transmission termination bay.' },
  { file: 'IMG-20251014-WA0050.jpg', width: 500, height: 500, orientation: 'square', title: 'Solar Tech Systems Component Detail', caption: 'High-specification hardware engineered for 25-year field endurance.' }
];
