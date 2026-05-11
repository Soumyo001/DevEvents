// MongoDB Playground
use('dev_events');

const seedEvents = [
  // 3. Web Summit 2026
  {
    title: "Web Summit 2026",
    slug: "web-summit-2026",
    description:
      "One of the largest technology conferences in the world, gathering 70,000+ attendees across startups, investors, and global tech leaders.",
    overview:
      "Web Summit is widely regarded as one of the most important technology conferences on the planet. Held annually in Lisbon, Portugal, the event attracts founders, CEOs, investors, journalists, and policymakers from across the globe. The 2026 edition continues its tradition of offering a diverse lineup of keynote speakers from tech, politics, science, and culture — all united by the theme of how technology reshapes human civilization. The event spreads across the Altice Arena and FIL Lisbon exhibition halls, with hundreds of stages running in parallel throughout the week. ALPHA, the startup exhibition program, spotlights the most promising early-stage companies. INVESTOR SUMMIT connects pre-qualified startups with top-tier VCs. Night Summit, Web Summit's official evening events program, offers exclusive networking parties and side events throughout Lisbon. Dedicated tracks cover AI ethics, climate tech, fintech, health tech, and the future of work.",
    image: "https://websummit.com/static/media/web-summit-2026-banner.png",
    timezone: "Europe/Lisbon",
    start_datetime: new Date("2026-11-10T09:00:00Z"),
    end_datetime: new Date("2026-11-13T18:00:00Z"),
    registration_deadline: new Date("2026-10-25T23:59:00Z"),
    capacity: 70000,
    bookingCount: 0,
    venue: {
      name: "Altice Arena & FIL Lisbon",
      city: "Lisbon",
      state: "",
      country: "Portugal",
      mode: "In-Person",
    },
    agenda: [
      { start_datetime: new Date("2026-11-10T09:00:00Z"), end_datetime: new Date("2026-11-10T11:00:00Z"), title: "Opening Night & Welcome Keynote", description: "Paddy Cosgrave opens Web Summit 2026 with a global state-of-tech address." },
      { start_datetime: new Date("2026-11-11T09:30:00Z"), end_datetime: new Date("2026-11-11T12:30:00Z"), title: "AI & Society: Governing the Ungovernable", description: "Panel discussion featuring EU tech regulators, AI lab founders, and ethicists." },
      { start_datetime: new Date("2026-11-11T14:00:00Z"), end_datetime: new Date("2026-11-11T16:00:00Z"), title: "ALPHA Startup Pitches – Day 1", description: "50 of the world's most promising seed-stage startups pitch to live audiences and investors." },
      { start_datetime: new Date("2026-11-12T09:00:00Z"), end_datetime: new Date("2026-11-12T11:00:00Z"), title: "Climate Tech & Green Innovation", description: "How technology companies are racing to meet net-zero targets by 2030." },
      { start_datetime: new Date("2026-11-13T15:00:00Z"), end_datetime: new Date("2026-11-13T18:00:00Z"), title: "Closing Ceremony & Startup Awards", description: "Announcing the Web Summit 2026 startup competition winners and closing remarks." },
    ],
    organizer: { organizer_name: "Web Summit", description: "Web Summit is a global technology events company headquartered in Lisbon, Portugal." },
    audience: ["Startup Founders", "Investors", "Tech Executives", "Journalists", "Policymakers", "Engineers"],
    tags: ["Startups", "VC", "AI Ethics", "Climate Tech", "Fintech", "Lisbon", "Innovation"],
    is_published: true,
    is_featured: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },

  // 4. PyCon US 2026
  {
    title: "PyCon US 2026",
    slug: "pycon-us-2026",
    description:
      "The largest annual gathering of the Python programming community in North America, featuring talks, sprints, and open-source collaboration.",
    overview:
      "PyCon US is the flagship conference organized by the Python Software Foundation and the beating heart of the global Python community. Held in Pittsburgh in 2026, the event welcomes thousands of Python developers ranging from complete beginners to core CPython contributors. The conference structure includes multiple days of tutorials (pre-conference), the main conference with parallel talk tracks, and development sprints that run for four days after the main event. Talks span beginner to advanced levels across topics including web development with Django and FastAPI, data science with pandas and NumPy, machine learning, async programming, performance optimization, and Python's internals. The Open Spaces program enables spontaneous community-driven sessions on any Python-related topic. PyCon US is also a major fundraising event for the Python Software Foundation, supporting the long-term sustainability of the Python language and its ecosystem.",
    image: "https://pycon.org/static/2026/images/pycon-us-2026-og.jpg",
    timezone: "America/New_York",
    start_datetime: new Date("2026-05-14T09:00:00Z"),
    end_datetime: new Date("2026-05-22T17:00:00Z"),
    registration_deadline: new Date("2026-05-01T23:59:00Z"),
    capacity: 3500,
    bookingCount: 0,
    venue: { name: "David L. Lawrence Convention Center", city: "Pittsburgh", state: "Pennsylvania", country: "United States", mode: "Hybrid" },
    agenda: [
      { start_datetime: new Date("2026-05-14T09:00:00Z"), end_datetime: new Date("2026-05-15T17:00:00Z"), title: "Pre-Conference Tutorials", description: "Full-day deep-dive tutorials on asyncio, Rust extensions for Python, and ML deployment." },
      { start_datetime: new Date("2026-05-16T09:00:00Z"), end_datetime: new Date("2026-05-16T10:00:00Z"), title: "Opening Keynote", description: "PSF Chair keynote on the state of Python and community milestones." },
      { start_datetime: new Date("2026-05-16T11:00:00Z"), end_datetime: new Date("2026-05-18T17:00:00Z"), title: "Main Conference Talks", description: "Three days of curated talks across 5 tracks covering all aspects of Python development." },
      { start_datetime: new Date("2026-05-19T09:00:00Z"), end_datetime: new Date("2026-05-22T17:00:00Z"), title: "Development Sprints", description: "Collaborative open-source contribution sessions on CPython, pip, Django, and more." },
    ],
    organizer: { organizer_name: "Python Software Foundation", description: "The PSF is a non-profit organization devoted to advancing open source technology related to the Python programming language." },
    audience: ["Python Developers", "Data Scientists", "Web Developers", "Open Source Contributors", "Students"],
    tags: ["Python", "Open Source", "Data Science", "Web Development", "Programming", "PSF"],
    is_published: true,
    is_featured: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },

  // 5. CES 2027
  {
    title: "CES 2027 – Consumer Electronics Show",
    slug: "ces-2027-consumer-electronics-show",
    description: "The world's most influential technology event, showcasing breakthrough technologies and global innovators from across the consumer electronics industry.",
    overview: "CES 2027 is the definitive global stage where next-generation innovations are introduced to the marketplace. Organized by the Consumer Technology Association (CTA), CES brings together over 170,000 industry professionals from 160+ countries across more than 2.5 million net square feet of exhibit space in Las Vegas. The 2027 edition spotlights transformative tech categories including connected vehicles and autonomous mobility, smart home ecosystems, health and wellness technology, immersive entertainment (XR/AR/VR), robotics, sustainable tech, and the convergence of AI with consumer products. Exhibitors range from Fortune 500 companies to innovative startups competing for the coveted CES Innovation Awards. The conference program includes C-Space, a curated content program for C-suite executives; CES Unveiled, an invite-only media event; and specialized show floors dedicated to each major technology vertical. Policy summits, investor meetups, and private product briefings fill every corridor of the Las Vegas Convention Center and surrounding hotels.",
    image: "https://www.ces.tech/media/2027/ces-2027-logo-banner.jpg",
    timezone: "America/Los_Angeles",
    start_datetime: new Date("2027-01-07T09:00:00Z"),
    end_datetime: new Date("2027-01-10T18:00:00Z"),
    registration_deadline: new Date("2026-12-20T23:59:00Z"),
    capacity: 170000,
    bookingCount: 0,
    venue: { name: "Las Vegas Convention Center", city: "Las Vegas", state: "Nevada", country: "United States", mode: "In-Person" },
    agenda: [
      { start_datetime: new Date("2027-01-07T09:00:00Z"), end_datetime: new Date("2027-01-07T11:00:00Z"), title: "CES 2027 Opening Keynote", description: "CTA President Gary Shapiro and partner keynote from a major tech CEO." },
      { start_datetime: new Date("2027-01-07T14:00:00Z"), end_datetime: new Date("2027-01-07T16:00:00Z"), title: "Automotive Innovation Summit", description: "The latest in EV platforms, autonomous driving systems, and in-vehicle AI." },
      { start_datetime: new Date("2027-01-08T10:00:00Z"), end_datetime: new Date("2027-01-08T12:00:00Z"), title: "AI in the Home – Smart Living", description: "How AI is redefining appliances, security, and ambient computing in residential spaces." },
      { start_datetime: new Date("2027-01-09T09:00:00Z"), end_datetime: new Date("2027-01-09T11:00:00Z"), title: "Health Tech & Digital Wellness", description: "Wearables, telehealth devices, AI diagnostics, and the future of personalized medicine." },
      { start_datetime: new Date("2027-01-10T14:00:00Z"), end_datetime: new Date("2027-01-10T16:00:00Z"), title: "CES Innovation Awards Ceremony", description: "Recognizing the most forward-thinking products across 28 product categories." },
    ],
    organizer: { organizer_name: "Consumer Technology Association (CTA)", description: "CTA is the US trade association representing the consumer technology industry, producer of the annual CES event." },
    audience: ["Tech Executives", "Product Managers", "Hardware Engineers", "Investors", "Journalists", "Retailers", "Consumers"],
    tags: ["Consumer Electronics", "AI", "Smart Home", "Electric Vehicles", "Robotics", "Innovation", "CES"],
    is_published: true,
    is_featured: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },

  // 6. React Summit 2026
  {
    title: "React Summit 2026",
    slug: "react-summit-2026",
    description: "The world's biggest React conference, bringing together the global React community for two days of talks, workshops, and open-source collaboration.",
    overview: "React Summit is the largest conference dedicated to the React ecosystem, held annually in Amsterdam with a simultaneous remote attendance option for developers worldwide. The 2026 edition hosts over 50 speakers across two stages covering the complete React landscape: React Server Components, Next.js 15, Remix, React Native, state management patterns, testing strategies, performance optimization, and the emerging edge runtime paradigm. Workshop days before the main conference offer in-depth, hands-on training with expert instructors on topics like advanced TypeScript with React, full-stack app architecture, and animation with Framer Motion. The Expo area features leading companies in the React ecosystem showcasing tools, libraries, and job opportunities. Evening networking events at iconic Amsterdam venues give attendees a chance to connect with speakers and peers from over 80 countries. React Summit is organized by GitNation, the same team behind JSNation, VueConf, and Node Congress.",
    image: "https://reactsummit.com/static/react-summit-2026-og.jpg",
    timezone: "Europe/Amsterdam",
    start_datetime: new Date("2026-06-12T09:00:00Z"),
    end_datetime: new Date("2026-06-13T18:30:00Z"),
    registration_deadline: new Date("2026-06-01T23:59:00Z"),
    capacity: 2500,
    bookingCount: 0,
    venue: { name: "Beurs van Berlage", city: "Amsterdam", state: "", country: "Netherlands", mode: "Hybrid" },
    agenda: [
      { start_datetime: new Date("2026-06-12T09:00:00Z"), end_datetime: new Date("2026-06-12T09:45:00Z"), title: "Opening Keynote: The Future of React", description: "Meta's React core team on the roadmap for React 20 and compiler advancements." },
      { start_datetime: new Date("2026-06-12T10:00:00Z"), end_datetime: new Date("2026-06-12T10:45:00Z"), title: "React Server Components in Production", description: "Lessons learned from migrating large-scale apps to the RSC paradigm." },
      { start_datetime: new Date("2026-06-12T14:00:00Z"), end_datetime: new Date("2026-06-12T14:45:00Z"), title: "React Native New Architecture Deep Dive", description: "Fabric renderer and JSI: what they mean for performance in cross-platform apps." },
      { start_datetime: new Date("2026-06-13T09:00:00Z"), end_datetime: new Date("2026-06-13T09:45:00Z"), title: "Testing Modern React Apps", description: "Component testing with Vitest, React Testing Library, and Playwright." },
      { start_datetime: new Date("2026-06-13T15:00:00Z"), end_datetime: new Date("2026-06-13T18:30:00Z"), title: "Closing Panel & Community Q&A", description: "Open discussion with core contributors on the React ecosystem's direction." },
    ],
    organizer: { organizer_name: "GitNation", description: "GitNation is the organizer of major JavaScript conferences including React Summit, JSNation, and VueConf." },
    audience: ["Frontend Developers", "React Developers", "Full-Stack Engineers", "Mobile Developers"],
    tags: ["React", "JavaScript", "Frontend", "Next.js", "React Native", "TypeScript", "Amsterdam"],
    is_published: true,
    is_featured: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },

  // 7. TED2026
  {
    title: "TED2026: The Turning Point",
    slug: "ted2026-the-turning-point",
    description: "TED's flagship annual conference where the world's leading thinkers share ideas worth spreading across science, technology, design, and global issues.",
    overview: "TED2026: The Turning Point convenes in Vancouver for five transformative days, gathering scientists, artists, entrepreneurs, activists, and world leaders to share ideas that challenge assumptions and inspire action. The conference theme — 'The Turning Point' — reflects a global moment of inflection across climate, AI, democracy, and human health. Each session is carefully curated by TED's editorial team to offer a mix of long-form talks, short surprise performances, and intimate conversations. Attendees at TED are known as 'fellows' and are selected based on application; the conference maintains a strict no-filming-on-phones policy to preserve the atmosphere of presence and engagement. Every talk from TED2026 will be professionally recorded and released to the public on TED.com within weeks of the event. Alongside the mainstage program, TED hosts workshops, art installations, and the TED Prize announcement. Afternoons feature themed 'salons' where small groups engage in guided discussions with speakers.",
    image: "https://tedconfblog.files.wordpress.com/2026/ted2026-banner.jpg",
    timezone: "America/Vancouver",
    start_datetime: new Date("2026-04-20T09:00:00Z"),
    end_datetime: new Date("2026-04-24T20:00:00Z"),
    registration_deadline: new Date("2026-03-15T23:59:00Z"),
    capacity: 1800,
    bookingCount: 0,
    venue: { name: "Vancouver Convention Centre", city: "Vancouver", state: "British Columbia", country: "Canada", mode: "In-Person" },
    agenda: [
      { start_datetime: new Date("2026-04-20T09:00:00Z"), end_datetime: new Date("2026-04-20T12:30:00Z"), title: "Session 1: Rethinking the Possible", description: "Opening session exploring breakthroughs in physics, biology, and human cognition." },
      { start_datetime: new Date("2026-04-21T09:00:00Z"), end_datetime: new Date("2026-04-21T12:30:00Z"), title: "Session 2: The Climate Bet", description: "Scientists and entrepreneurs on the technologies that could still reverse warming." },
      { start_datetime: new Date("2026-04-22T09:00:00Z"), end_datetime: new Date("2026-04-22T12:30:00Z"), title: "Session 3: Mind & Machine", description: "Neuroscience, AI consciousness debates, and human-computer symbiosis." },
      { start_datetime: new Date("2026-04-23T09:00:00Z"), end_datetime: new Date("2026-04-23T12:30:00Z"), title: "Session 4: Power & Justice", description: "Political scientists, lawyers, and activists on rebuilding democratic systems." },
      { start_datetime: new Date("2026-04-24T09:00:00Z"), end_datetime: new Date("2026-04-24T12:30:00Z"), title: "Session 5: Wonder", description: "Art, poetry, music, and moments of pure beauty to close the conference." },
    ],
    organizer: { organizer_name: "TED Conferences LLC", description: "TED is a nonprofit organization devoted to spreading ideas through short, powerful talks." },
    audience: ["Scientists", "Entrepreneurs", "Artists", "Policymakers", "Educators", "Thought Leaders"],
    tags: ["Ideas", "Innovation", "Science", "Climate", "AI", "Philosophy", "TED Talks"],
    is_published: true,
    is_featured: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },

  // 8. Coachella 2026 Livestream
  {
    title: "Coachella 2026 – Official Livestream",
    slug: "coachella-2026-official-livestream",
    description: "Stream the full Coachella Valley Music and Arts Festival 2026 live from the Empire Polo Club in Indio, California — all stages, all weekends.",
    overview: "Coachella Valley Music and Arts Festival is one of the most iconic and culturally significant music and arts events in the world. The 2026 Coachella Official Livestream brings the full festival experience to global audiences who can't be there in person. Headliners performing across both weekends span genres from hip-hop, pop, electronic, and rock to indie and K-pop. The livestream covers all major stages: the Main Stage, Sahara Tent, Outdoor Theatre, Mojave Stage, and Gobi Tent — ensuring fans worldwide can catch every major act in real time. In addition to musical performances, the stream captures the festival's celebrated art installations, fashion moments, and behind-the-scenes content. Coachella's livestream has historically attracted tens of millions of viewers per weekend and is available free on YouTube. Watch parties, social features, and multi-cam options are built directly into the stream interface.",
    image: "https://www.coachella.com/images/2026/coachella-2026-livestream-banner.jpg",
    timezone: "America/Los_Angeles",
    start_datetime: new Date("2026-04-10T22:00:00Z"),
    end_datetime: new Date("2026-04-26T07:00:00Z"),
    registration_deadline: new Date("2026-04-09T23:59:00Z"),
    capacity: null,
    bookingCount: 0,
    venue: { mode: "Online" },
    agenda: [
      { start_datetime: new Date("2026-04-10T22:00:00Z"), end_datetime: new Date("2026-04-11T04:00:00Z"), title: "Weekend 1 – Friday Livestream", description: "Main Stage headliner + Sahara and Outdoor Theatre coverage." },
      { start_datetime: new Date("2026-04-11T22:00:00Z"), end_datetime: new Date("2026-04-12T04:00:00Z"), title: "Weekend 1 – Saturday Livestream", description: "Saturday headliner set and full cross-stage coverage." },
      { start_datetime: new Date("2026-04-12T22:00:00Z"), end_datetime: new Date("2026-04-13T05:00:00Z"), title: "Weekend 1 – Sunday Livestream", description: "Sunday closing headliner and festival wrap highlights." },
      { start_datetime: new Date("2026-04-24T22:00:00Z"), end_datetime: new Date("2026-04-26T05:00:00Z"), title: "Weekend 2 – Full Livestream", description: "Complete coverage of Weekend 2 across all stages." },
    ],
    organizer: { organizer_name: "Goldenvoice / AEG Presents", description: "Goldenvoice is the Los Angeles-based concert promotion company that produces Coachella and Stagecoach festivals." },
    audience: ["Music Fans", "Festival Goers", "Pop Culture Enthusiasts", "Global Audiences"],
    tags: ["Music Festival", "Coachella", "Live Music", "Livestream", "Pop", "Electronic", "Hip-Hop"],
    is_published: true,
    is_featured: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },

  // 9. WEF Annual Meeting 2027
  {
    title: "World Economic Forum Annual Meeting 2027",
    slug: "world-economic-forum-annual-meeting-2027",
    description: "The premier global event for public-private cooperation, bringing together heads of state, CEOs, and civil society leaders in Davos, Switzerland.",
    overview: "The World Economic Forum Annual Meeting in Davos is the world's foremost platform for international public-private cooperation. Each January, Davos transforms into the temporary capital of global decision-making, hosting over 3,000 leaders from government, business, civil society, and academia. The 2027 theme — 'Resilience in an Age of Polycrisis' — acknowledges the interlocking challenges of climate change, geopolitical instability, technological disruption, and global health. The five-day program features plenary sessions, closed-door strategic dialogues, interactive workshops, and bilateral meetings between world leaders. The Congress Centre and surrounding hotels host formal sessions, while Promenade side events organized by nations, companies, and NGOs create a parallel universe of deal-making and coalition-building. WEF's annual Global Risks Report and Global Competitiveness Report are typically released in conjunction with the Davos meeting. Journalists from over 500 media organizations provide live coverage globally.",
    image: "https://www.weforum.org/media/2027/davos-annual-meeting-2027-banner.jpg",
    timezone: "Europe/Zurich",
    start_datetime: new Date("2027-01-19T08:00:00Z"),
    end_datetime: new Date("2027-01-23T18:00:00Z"),
    registration_deadline: new Date("2026-12-01T23:59:00Z"),
    capacity: 3000,
    bookingCount: 0,
    venue: { name: "Congress Centre Davos", city: "Davos", state: "Graubünden", country: "Switzerland", mode: "In-Person" },
    agenda: [
      { start_datetime: new Date("2027-01-19T09:00:00Z"), end_datetime: new Date("2027-01-19T11:00:00Z"), title: "Opening Plenary: The State of the World", description: "WEF Founder Klaus Schwab and heads of state open the 2027 Annual Meeting." },
      { start_datetime: new Date("2027-01-20T10:00:00Z"), end_datetime: new Date("2027-01-20T12:00:00Z"), title: "AI Governance: Striking the Global Balance", description: "Heads of major AI labs, regulators from US/EU/China, and civil society on binding AI treaties." },
      { start_datetime: new Date("2027-01-21T09:00:00Z"), end_datetime: new Date("2027-01-21T11:00:00Z"), title: "Climate Finance Mobilization", description: "How $1 trillion in annual green investment can be unlocked through multilateral mechanisms." },
      { start_datetime: new Date("2027-01-22T10:00:00Z"), end_datetime: new Date("2027-01-22T12:00:00Z"), title: "The Future of Trade in a Fragmented World", description: "WTO Director-General and trade ministers on navigating de-globalization trends." },
      { start_datetime: new Date("2027-01-23T14:00:00Z"), end_datetime: new Date("2027-01-23T16:00:00Z"), title: "Closing Session: Commitments & Next Steps", description: "Public pledges from participating governments and corporations on shared priorities." },
    ],
    organizer: { organizer_name: "World Economic Forum (WEF)", description: "The WEF is an international non-governmental organization committed to improving the state of the world through public-private cooperation." },
    audience: ["Heads of State", "CEOs", "Finance Ministers", "NGO Leaders", "Journalists", "Academics"],
    tags: ["Davos", "Global Economy", "Policy", "Climate", "AI Governance", "Trade", "Leadership"],
    is_published: true,
    is_featured: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },

  // 10. DockerCon 2026
  {
    title: "DockerCon 2026",
    slug: "dockercon-2026",
    description: "The official Docker conference for developers and platform engineers, featuring the latest in container technology, cloud-native development, and developer experience.",
    overview: "DockerCon 2026 returns as the premier gathering for the global container and cloud-native developer community. As containerization becomes ubiquitous across the software industry, DockerCon serves as the nexus for sharing knowledge, best practices, and innovations in how developers build, ship, and run applications. The 2026 conference in Seattle features keynote presentations from Docker's leadership team announcing new features in Docker Desktop, Docker Hub, and the Docker Build Cloud platform. Technical sessions cover container security hardening, multi-arch builds, Compose v3 in production, Wasm + containers, and the evolving relationship between Docker and Kubernetes. Workshops offer hands-on labs in real cloud environments. The Community Lounge connects contributors to open-source Docker projects. DockerCon consistently attracts DevOps engineers, platform teams, and CTOs looking to reduce developer friction and accelerate software delivery pipelines.",
    image: "https://www.dockercon.com/images/dockercon-2026-seattle-banner.jpg",
    timezone: "America/Los_Angeles",
    start_datetime: new Date("2026-09-15T09:00:00Z"),
    end_datetime: new Date("2026-09-16T18:00:00Z"),
    registration_deadline: new Date("2026-09-05T23:59:00Z"),
    capacity: 5000,
    bookingCount: 0,
    venue: { name: "Seattle Convention Center", city: "Seattle", state: "Washington", country: "United States", mode: "Hybrid" },
    agenda: [
      { start_datetime: new Date("2026-09-15T09:00:00Z"), end_datetime: new Date("2026-09-15T10:30:00Z"), title: "Opening Keynote: The Developer Platform of Tomorrow", description: "Docker CEO on the vision for AI-assisted containerized development and new product announcements." },
      { start_datetime: new Date("2026-09-15T11:00:00Z"), end_datetime: new Date("2026-09-15T12:00:00Z"), title: "Container Security in Depth", description: "CVE scanning, SBOM generation, and runtime security with Docker Scout." },
      { start_datetime: new Date("2026-09-15T14:00:00Z"), end_datetime: new Date("2026-09-15T15:00:00Z"), title: "Docker + WebAssembly: The Next Frontier", description: "Running Wasm workloads alongside containers and what it means for portability." },
      { start_datetime: new Date("2026-09-16T09:00:00Z"), end_datetime: new Date("2026-09-16T10:30:00Z"), title: "Platform Engineering with Docker Build Cloud", description: "Accelerating CI/CD pipelines with remote build infrastructure and cache sharing." },
      { start_datetime: new Date("2026-09-16T14:00:00Z"), end_datetime: new Date("2026-09-16T18:00:00Z"), title: "Hands-On Workshops", description: "Three parallel workshop tracks: Docker for AI/ML, Advanced Compose, and Multi-Arch Builds." },
    ],
    organizer: { organizer_name: "Docker, Inc.", description: "Docker is the company behind the Docker container platform and the DockerHub registry, enabling developers to build, share, and run applications." },
    audience: ["DevOps Engineers", "Platform Engineers", "Backend Developers", "CTOs", "SREs", "Cloud Architects"],
    tags: ["Docker", "Containers", "DevOps", "Cloud Native", "Kubernetes", "CI/CD", "WebAssembly"],
    is_published: true,
    is_featured: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },

  // 11. Apple WWDC 2026
  {
    title: "Apple WWDC 2026",
    slug: "apple-wwdc-2026",
    description: "Apple's Worldwide Developers Conference — the annual event where Apple unveils the next generation of iOS, macOS, visionOS, and its developer platforms.",
    overview: "Apple's Worldwide Developers Conference (WWDC) 2026 takes place at Apple Park in Cupertino, offering a week of sessions, labs, and one-on-one appointments with Apple engineers. The conference opens with a highly anticipated keynote that traditionally previews the next major versions of Apple's operating systems: iOS 20, iPadOS 20, macOS Tahoe, watchOS 13, tvOS 20, and visionOS 3. The developer content — available entirely online via the Apple Developer app — covers SwiftUI advances, Swift concurrency improvements, ARKit and RealityKit for spatial computing, Core ML and on-device AI APIs, and new App Store policies. In-person ticket winners have exclusive access to design labs, testing sessions, and informal meet-the-engineer tables across Apple's campus. The WWDC Platforms State of the Union session provides a deeper technical dive for developers the day after the keynote. Evening social events take place in Cupertino with the broader developer community.",
    image: "https://developer.apple.com/wwdc26/images/og-image.jpg",
    timezone: "America/Los_Angeles",
    start_datetime: new Date("2026-06-08T17:00:00Z"),
    end_datetime: new Date("2026-06-12T20:00:00Z"),
    registration_deadline: new Date("2026-05-20T23:59:00Z"),
    capacity: 1000,
    bookingCount: 0,
    venue: { name: "Apple Park", city: "Cupertino", state: "California", country: "United States", mode: "Hybrid" },
    agenda: [
      { start_datetime: new Date("2026-06-08T17:00:00Z"), end_datetime: new Date("2026-06-08T19:30:00Z"), title: "WWDC26 Keynote", description: "Tim Cook and Apple's SVPs reveal iOS 20, macOS Tahoe, and visionOS 3." },
      { start_datetime: new Date("2026-06-09T09:00:00Z"), end_datetime: new Date("2026-06-09T11:30:00Z"), title: "Platforms State of the Union", description: "Deep technical overview of all 2026 Apple platform changes for developers." },
      { start_datetime: new Date("2026-06-09T13:00:00Z"), end_datetime: new Date("2026-06-12T17:00:00Z"), title: "Developer Sessions & Labs", description: "Hundreds of video sessions and in-person engineering labs covering every Apple framework." },
      { start_datetime: new Date("2026-06-10T10:00:00Z"), end_datetime: new Date("2026-06-10T12:00:00Z"), title: "SwiftUI & Swift 6 Session", description: "New SwiftUI components, animations, and Swift 6 concurrency model updates." },
      { start_datetime: new Date("2026-06-11T10:00:00Z"), end_datetime: new Date("2026-06-11T12:00:00Z"), title: "Spatial Computing with visionOS 3", description: "New RealityKit APIs, SharePlay for visionOS, and spatial UI design patterns." },
    ],
    organizer: { organizer_name: "Apple Inc.", description: "Apple is a multinational technology company that develops consumer electronics, software, and online services." },
    audience: ["iOS Developers", "macOS Developers", "Swift Developers", "App Designers", "Indie Developers"],
    tags: ["Apple", "iOS", "Swift", "SwiftUI", "macOS", "visionOS", "WWDC", "Developer Conference"],
    is_published: true,
    is_featured: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },

  // 12. Global AI Safety Summit 2026
  {
    title: "Global AI Safety Summit 2026",
    slug: "global-ai-safety-summit-2026",
    description: "An intergovernmental summit bringing together world governments, frontier AI labs, and researchers to coordinate international policy on advanced AI systems.",
    overview: "The Global AI Safety Summit 2026 marks the third edition of the landmark conference series inaugurated at Bletchley Park in 2023. Hosted by the Republic of Korea in Seoul, the 2026 summit expands on prior agreements with a focus on establishing binding international norms around frontier AI development, evaluation, and deployment. Government delegations from over 40 nations participate alongside representatives from Anthropic, OpenAI, Google DeepMind, Mistral, and other frontier AI laboratories. The summit's technical agenda covers multi-agent AI risk, biological weapon uplift testing methodologies, proposed international AI auditing standards, and best practices for red-teaming advanced systems. Civil society groups and academic researchers present independent policy recommendations. The summit concludes with the ratification of the Seoul AI Accord — a multilateral agreement on minimum safety standards for AI systems exceeding a defined capability threshold. The proceedings are recorded and published in full as a public record.",
    image: "https://aisafetysummit.gov.kr/2026/og-summit-banner.jpg",
    timezone: "Asia/Seoul",
    start_datetime: new Date("2026-06-22T09:00:00Z"),
    end_datetime: new Date("2026-06-23T18:00:00Z"),
    registration_deadline: new Date("2026-06-01T23:59:00Z"),
    capacity: 800,
    bookingCount: 0,
    venue: { name: "COEX Convention & Exhibition Center", city: "Seoul", state: "", country: "South Korea", mode: "Hybrid" },
    agenda: [
      { start_datetime: new Date("2026-06-22T09:00:00Z"), end_datetime: new Date("2026-06-22T10:30:00Z"), title: "Opening Ceremony & Government Statements", description: "Host government and co-chair opening remarks from the EU, US, UK, China, and India delegations." },
      { start_datetime: new Date("2026-06-22T11:00:00Z"), end_datetime: new Date("2026-06-22T13:00:00Z"), title: "State of Frontier AI: Technical Briefings", description: "Anthropic, OpenAI, DeepMind, and Mistral present safety evaluations of their latest models." },
      { start_datetime: new Date("2026-06-22T14:00:00Z"), end_datetime: new Date("2026-06-22T16:00:00Z"), title: "Biological Risk & AI: Red Lines and Testing", description: "Expert session on uplift testing methodologies and proposed international red-line definitions." },
      { start_datetime: new Date("2026-06-23T09:00:00Z"), end_datetime: new Date("2026-06-23T11:00:00Z"), title: "International AI Auditing Standards", description: "Proposals for a UN-affiliated body to conduct third-party audits of frontier model developers." },
      { start_datetime: new Date("2026-06-23T14:00:00Z"), end_datetime: new Date("2026-06-23T18:00:00Z"), title: "Seoul AI Accord: Negotiation & Signing", description: "Final negotiation session and multilateral signing of the Seoul AI Safety Accord." },
    ],
    organizer: { organizer_name: "Ministry of Science and ICT, Republic of Korea", description: "Korea's Ministry of Science and ICT co-organizes the 2026 AI Safety Summit in partnership with the UK DSIT and the EU Commission." },
    audience: ["Government Officials", "AI Researchers", "Policy Makers", "AI Lab Representatives", "Civil Society Organizations", "Academics"],
    tags: ["AI Safety", "Policy", "International Summit", "Frontier AI", "AI Governance", "Seoul", "Regulation"],
    is_published: true,
    is_featured: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },

  // 13. Next.js Conf 2026
  {
    title: "Next.js Conf 2026",
    slug: "nextjs-conf-2026",
    description: "Vercel's official annual conference celebrating the Next.js ecosystem — featuring major framework announcements, real-world case studies, and the global Next.js community.",
    overview: "Next.js Conf is the official annual event organized by Vercel to celebrate and advance the Next.js open-source framework and the broader React web development ecosystem. Now in its seventh edition, the 2026 conference features a flagship online broadcast accessible to hundreds of thousands of developers worldwide, alongside a smaller curated in-person gathering in San Francisco. The keynote traditionally unveils the next major version of Next.js, with 2026 expected to feature Next.js 16 with expanded support for server actions at scale, edge-first deployment architecture improvements, and new image/font optimization primitives. Talks from the Vercel engineering team, major Next.js contributors, and companies like Shopify, GitHub, and The New York Times share how they use Next.js in production at scale. Lightning talks from community members highlight open-source innovations. The conference is a major driver of Next.js adoption, regularly generating millions of stream views globally, and serves as the community's annual gathering point.",
    image: "https://nextjs.org/conf/2026/og-image.jpg",
    timezone: "America/Los_Angeles",
    start_datetime: new Date("2026-10-22T16:00:00Z"),
    end_datetime: new Date("2026-10-22T21:00:00Z"),
    registration_deadline: new Date("2026-10-21T23:59:00Z"),
    capacity: null,
    bookingCount: 0,
    venue: { mode: "Online" },
    agenda: [
      { start_datetime: new Date("2026-10-22T16:00:00Z"), end_datetime: new Date("2026-10-22T17:30:00Z"), title: "Keynote: Next.js 16 Announcement", description: "Guillermo Rauch and the Vercel team unveil Next.js 16 and a new Vercel platform feature." },
      { start_datetime: new Date("2026-10-22T17:30:00Z"), end_datetime: new Date("2026-10-22T18:15:00Z"), title: "Next.js at Scale: Shopify's Migration Story", description: "How Shopify migrated 1,000+ storefronts to Next.js App Router with zero downtime." },
      { start_datetime: new Date("2026-10-22T18:15:00Z"), end_datetime: new Date("2026-10-22T19:00:00Z"), title: "The Edge Runtime in 2026", description: "Server functions, edge middleware, and the performance future of Next.js deployments." },
      { start_datetime: new Date("2026-10-22T19:00:00Z"), end_datetime: new Date("2026-10-22T20:00:00Z"), title: "Community Lightning Talks", description: "Eight community-selected talks showcasing the best open-source contributions to the ecosystem." },
      { start_datetime: new Date("2026-10-22T20:00:00Z"), end_datetime: new Date("2026-10-22T21:00:00Z"), title: "Q&A & Closing", description: "Live Q&A with the Vercel and Next.js core team, followed by community announcements." },
    ],
    organizer: { organizer_name: "Vercel", description: "Vercel is the company behind Next.js and a cloud platform for frontend developers, focused on performance and developer experience." },
    audience: ["Frontend Developers", "Full-Stack Engineers", "Next.js Developers", "React Developers", "Web Architects"],
    tags: ["Next.js", "Vercel", "React", "Frontend", "Web Development", "JavaScript", "Edge Computing"],
    is_published: true,
    is_featured: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

// Insert all events at once
const result = db.getCollection('events').insertMany(seedEvents);
print(`Inserted ${result.insertedIds.length} events`);

// In MongoDB Playground
// const events = db.events.find({}).toArray();
// const tagCounts = {};
// const audienceCounts = {};

// events.forEach(e => {
//     e.tags?.forEach(t => {
//         tagCounts[t] = (tagCounts[t] || 0) + 1;
//     });
//     e.audience?.forEach(a => {
//         audienceCounts[a] = (audienceCounts[a] || 0) + 1;
//     });
// });

// const taxonomies = [
//     ...Object.entries(tagCounts).map(([value, count]) => ({
//         type: "tag",
//         value,
//         slug: value.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""),
//         usageCount: count,
//         createdAt: new Date(),
//         updatedAt: new Date(),
//     })),
//     ...Object.entries(audienceCounts).map(([value, count]) => ({
//         type: "audience",
//         value,
//         slug: value.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""),
//         usageCount: count,
//         createdAt: new Date(),
//         updatedAt: new Date(),
//     })),
// ];

// db.taxonomies.insertMany(taxonomies);