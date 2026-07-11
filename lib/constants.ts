// ============================================================
//  lib/constants.ts  —  ALL WEDDING CONTENT LIVES HERE
//  Edit this file to update names, dates, events, media, etc.
// ============================================================

export const WEDDING = {
  // ── Couple ─────────────────────────────────────────────────
  bride: {
    name: "Aswani",
    nickname: "Kichu",
    nakshatram: "Thiruvonam",
    rashi: "Libra (Tula)",
    father: "Mr. Suresh",
    mother: "Mrs. Jintha",
    familyLabel: "Bride's Family",
  },
  groom: {
    name: "Dathan",
    nickname: "Dathan",
    nakshatram: "Krittika",
    rashi: "Mesha (Aries)",
    father: "Mr. T. Gopakumar Menon",
    mother: "Mrs. T. Sreedevi",
    familyLabel: "Groom's Family",
  },

  // ── Key Dates ───────────────────────────────────────────────
  weddingDate: {
    iso: "2027-02-14T09:15:00+05:30",    // ISO 8601 with IST offset
    display: "14th February 2027",
    day: "Sunday",
    time: "9:15 AM",
    muhurthamDisplay: "Sunday · 14th February 2027 · 9:15 AM",
  },

  // ── Venue ───────────────────────────────────────────────────
  venue: {
    name: "Gokulam Convention Centre",
    address: "Marine Drive Road, Ernakulam, Kerala 682011",
    mapsEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3929.0!2d76.2673!3d9.9816!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b0872b5cbe43f1b%3A0x71cb98c8bef63fad!2sMarine%20Drive%2C%20Ernakulam!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
    directionsUrl: "https://maps.google.com/?q=Marine+Drive+Ernakulam+Kerala",
  },

  // ── Media (drop in your own URLs when ready) ────────────────
  media: {
    /** Full-screen entry gate intro video. Leave empty to use tap-to-reveal animation. */
    entryVideoUrl: "/entry_opening.mp4",
    /** Background ambient music. Leave empty to disable the toggle. */
    bgMusicUrl: "",
    /** Highlight reel / memories section video. Leave empty to show placeholder. */
    memoriesVideoUrl: "",
  },

  // ── RSVP ────────────────────────────────────────────────────
  rsvp: {
    /** Paste your Zapier / backend webhook URL here to activate submissions. */
    endpointUrl: "https://wedding-backend-k67l.onrender.com/api/rsvp",
    clientId: "kichu-dathan-wedding-2027",
  },

  // ── Social ──────────────────────────────────────────────────
  hashtag: "#KichuWedsDathan",
  instagramHandle: "@yourhandle",

  // ── Our Story Timeline ───────────────────────────────────────
  story: [
    {
      year: "2019",
      icon: "☕",
      title: "First Meeting",
      description:
        "A mutual friend's gathering at a Kochi café on Marine Drive — a spilled chai and a shared laugh neither could forget.",
    },
    {
      year: "2020",
      icon: "🕌",
      title: "Temple Walk",
      description:
        "Their first real date — a quiet evening stroll around Ernakulapuram Shiva Temple, talking for hours as the lamps glowed golden.",
    },
    {
      year: "2021",
      icon: "🤝",
      title: "The Promise",
      description:
        "A misty morning in Munnar, amidst the tea gardens, he whispered the words that would change everything forever.",
    },
    {
      year: "2023",
      icon: "🏠",
      title: "Families Joined",
      description:
        "Two families, one heart. The elders gave their blessings at a beautiful pooja at the family home in Ernakulam.",
    },
    {
      year: "2027",
      icon: "💍",
      title: "Forever Begins",
      description:
        "On the most auspicious day, under the divine Muhurtham by the shores of Ernakulam, they begin the beautiful journey of a lifetime.",
    },
  ],

  // ── Ceremonies ──────────────────────────────────────────────
  ceremonies: [
    {
      id: "nischayathartham",
      icon: "💍",
      title: "Nischayathartham",
      malayalam: "നിശ്ചയതാർത്ഥം",
      subtitle: "Engagement Ceremony",
      date: "Feb 12, 2027",
      time: "11:00 AM – 1:00 PM",
      venue: "Gokulam Convention Centre",
      description:
        "The sacred exchange of rings and formal announcement of the union, blessed by both families with Vedic rituals.",
      dresscode: "Traditional Silk — no restriction",
      gradientFrom: "#C9972C",
      gradientTo: "#7A1F2B",
      highlighted: false,
    },
    {
      id: "haldi-nalanga",
      icon: "🌿",
      title: "Haldi & Nalanga",
      malayalam: "മഞ്ഞൾ ചടങ്ങ്",
      subtitle: "Turmeric & Fun Rituals",
      date: "Feb 12, 2027",
      time: "4:00 PM – 8:00 PM",
      venue: "Gokulam Convention Centre",
      description:
        "Auspicious turmeric rituals, flower decorations, and playful family games — the most laughter-filled evening!",
      dresscode: "Bright colours — Yellows & Greens preferred",
      gradientFrom: "#CF9A12",
      gradientTo: "#3E5C3A",
      highlighted: false,
    },
    {
      id: "sangeetham",
      icon: "🎵",
      title: "Sangeetham",
      malayalam: "സംഗീതം",
      subtitle: "Music & Dance Evening",
      date: "Feb 13, 2027",
      time: "6:30 PM – 10:00 PM",
      venue: "Gokulam Convention Centre",
      description:
        "An evening of classical and folk performances, Thiruvathira dances, and family skits celebrating the couple.",
      dresscode: "Semi-formal ethnic — Kasavu sarees & Kurtas",
      gradientFrom: "#B07B6E",
      gradientTo: "#591420",
      highlighted: false,
    },
    {
      id: "vivaha-muhurtham",
      icon: "🪔",
      title: "Vivaha Muhurtham",
      malayalam: "വിവാഹ മുഹൂർത്തം",
      subtitle: "The Sacred Wedding Ceremony",
      date: "Feb 14, 2027",
      time: "9:15 AM – 10:30 AM",
      venue: "Gokulam Convention Centre",
      description:
        "The most auspicious moment — the Mala exchange and tying of the sacred Thaali under divine Muhurtham. Witness the union of two souls.",
      dresscode: "Kasavu saree / Mundu — Traditional Kerala attire",
      gradientFrom: "#C4786A",
      gradientTo: "#7A1F2B",
      highlighted: true,
    },
    {
      id: "reception-sadhya",
      icon: "🌺",
      title: "Reception & Sadhya",
      malayalam: "സ്വീകരണം",
      subtitle: "Grand Celebration & Feast",
      date: "Feb 14, 2027",
      time: "7:00 PM – 11:00 PM",
      venue: "Gokulam Convention Centre",
      description:
        "An elegant evening reception with traditional Kerala Sadhya on banana leaf, blessings, and celebrations with all who love them.",
      dresscode: "Formal ethnic / Indo-western",
      gradientFrom: "#7B5EA7",
      gradientTo: "#C9972C",
      highlighted: false,
    },
  ],

  // ── RSVP event options ───────────────────────────────────────
  rsvpEvents: [
    { value: "Nischayathartham", label: "Nischayathartham", date: "12th Feb, 11:00 AM" },
    { value: "Haldi & Nalanga", label: "Haldi & Nalanga", date: "12th Feb, 4:00 PM" },
    { value: "Sangeetham", label: "Sangeetham", date: "13th Feb, 6:30 PM" },
    { value: "Vivaha Muhurtham", label: "Vivaha Muhurtham", date: "14th Feb, 9:15 AM", defaultChecked: true },
    { value: "Reception & Sadhya", label: "Reception & Sadhya", date: "14th Feb, 7:00 PM", defaultChecked: true },
  ],

  // ── Wedding Day Itinerary ────────────────────────────────────
  itinerary: [
    {
      time: "6:00 AM",
      icon: "🪔",
      title: "Pookalam & Nilavilakku Lighting",
      description: "Intricate floral Pookalam laid at the entrance; Nilavilakku lamps lit to invite prosperity.",
      tag: "Morning Rituals",
      highlighted: false,
    },
    {
      time: "7:00 AM",
      icon: "🚶",
      title: "Kashi Yatra Ceremony",
      description: "The playful mock-departure of the groom, intercepted by the bride's father.",
      tag: "Morning Rituals",
      highlighted: false,
    },
    {
      time: "7:30 AM",
      icon: "🌊",
      title: "Onjal (Sacred Swing) Ritual",
      description: "The couple seated on the flower-adorned swing while family sings Sopana Sangeetham.",
      tag: "Morning Rituals",
      highlighted: false,
    },
    {
      time: "8:00 AM",
      icon: "🎊",
      title: "Sadhya Prep & Family Games",
      description: "Playful games between families while the grand Sadhya is lovingly prepared.",
      tag: "Morning Rituals",
      highlighted: false,
    },
    {
      time: "8:45 AM",
      icon: "🏛️",
      title: "Gathering at the Mandapam",
      description: "Guests take their seats as Chenda Melam fills the air and priests begin the Vedic chants.",
      tag: "Sacred Ceremony",
      highlighted: false,
    },
    {
      time: "9:15 AM",
      icon: "🔥",
      title: "Vivaha Muhurtham",
      description:
        "The most auspicious moment — the couple united under divine blessings with Mala exchange & Thaali tying.",
      tag: "Sacred Ceremony",
      highlighted: true,
    },
    {
      time: "10:30 AM",
      icon: "💛",
      title: "Thaali Tying & Elder Blessings",
      description:
        "The sacred Thaali is tied as elders shower blessings and the Chenda Melam rises to a crescendo.",
      tag: "Sacred Ceremony",
      highlighted: false,
    },
    {
      time: "11:00 AM",
      icon: "📸",
      title: "Photography & Family Portraits",
      description: "Capturing timeless memories against the beautiful Ernakulam backdrops.",
      tag: "Celebrations",
      highlighted: false,
    },
    {
      time: "12:30 PM",
      icon: "🍽️",
      title: "Grand Kerala Sadhya",
      description: "Authentic Kerala feast on banana leaves with 26 traditional dishes.",
      tag: "Celebrations",
      highlighted: false,
    },
    {
      time: "2:30 PM",
      icon: "🌤️",
      title: "Rest & Guest Celebrations",
      description: "An afternoon for guests to mingle along Marine Drive and the couple to relax.",
      tag: "Celebrations",
      highlighted: false,
    },
    {
      time: "7:00 PM",
      icon: "🌹",
      title: "Wedding Reception & Dinner",
      description: "An elegant evening with the newlyweds greeting all guests, live music, and dinner.",
      tag: "Evening Reception",
      highlighted: false,
    },
    {
      time: "10:00 PM",
      icon: "✨",
      title: "Thiruvathira & Farewell",
      description: "Traditional Thiruvathira dance, music, and a heartfelt farewell to loved ones.",
      tag: "Evening Reception",
      highlighted: false,
    },
  ],

  // ── Gallery captions ─────────────────────────────────────────
  galleryCaptions: [
    "A love story begins",
    "Filtered coffee & forever",
    "Temple walks & whispers",
    "Family blessings",
    "Jasmine & silk",
    "The golden hour",
    "Nalangu laughter",
    "Pre-wedding glow",
    "Traditions & togetherness",
    "Thaali moment",
    "Family portrait",
    "The sadhya feast",
    "Reception evening",
    "Stars witnessed",
    "And they lived joyfully",
  ],

  // ── Design tokens (for reference / JS usage) ─────────────────
  colors: {
    cream: "#FFFBF3",
    cream2: "#FDF4E3",
    maroon: "#7A1F2B",
    maroonDark: "#591420",
    maroonLight: "#A8434F",
    gold: "#C9972C",
    goldLight: "#E8C568",
    goldPale: "#F5E4C0",
    green: "#3E5C3A",
    textDark: "#2B1810",
    textMid: "#6B5245",
    textLight: "#9C8574",
    border: "#EEE1CE",
  },
} as const;
