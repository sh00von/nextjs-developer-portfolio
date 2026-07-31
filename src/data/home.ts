export const socials = [
  ["GitHub", "https://github.com/sh00von"],
  ["Facebook", "https://www.facebook.com/minar.svn"],
  ["LinkedIn", "https://www.linkedin.com/in/minarsvn9090/"],
  ["Patchstack", "https://vdp.patchstack.com/database/researchers/093a22ad-bf3b-4fd3-96cf-9e6cef3eb7db"],
  ["Google Scholar", "https://scholar.google.com/citations?user=tht8Z1oAAAAJ&hl=en"],
  ["ResearchGate", "https://www.researchgate.net/profile/Md-Shovon-13"],
  ["Resume", "/resume.pdf"],
] as const;

export const education = [
  ["Chittagong University of Engineering and Technology (CUET)", "Undergraduate, Water Resources Engineering"],
  ["Chittagong College", "College"],
  ["Chattogram Cantonment Public College", "School"],
] as const;

export const experience = [
  ["Todvob", "https://todvob.com/", "Chief Technology Officer (CTO), Jan 2026-Present"],
  ["Blendin", "https://blendin247.com/", "Web Developer, 2025-Present"],
  ["Logifu PTY LTD", "https://www.logifu.com/", "Senior Software Developer, 2025-2026"],
] as const;

export const volunteers = [
  ["WRRO", "https://www.facebook.com/wrro.cuet", "Joint Research Secretary, 2025-Present"],
  ["Cyber Security Club, CUET", "https://www.facebook.com/cybersec.cuet", "President, 2025"],
  ["Nogorful", "https://nogorful.org/", "ICT Director, 2024-Present"],
  ["Ongko", "https://www.facebook.com/ongko.org/", "Founder and President, 2019-2020"],
] as const;

export const publications = [
  {
    href: "https://doi.org/10.31223/X5S767",
    title:
      "Analyzing Seasonal Variations in Air Quality with Google Earth Engine: A Case Study of Chattogram, Bangladesh",
    date: "Mar 2026",
    authors: "Md. Minaruzzaman Shovon, Md. Tamim",
    label: "Preprint / EarthArXiv",
  },
  {
    href: "https://www.researchgate.net/publication/399071973_Analysis_and_Prediction_of_Time_Series_Variations_in_Rainfall_by_Machine_Learning_Approach_A_Case_Study_of_Sylhet_and_Sreemangal",
    title:
      "Analysis and Prediction of Time Series Variations in Rainfall by Machine Learning Approach: A Case Study of Sylhet and Sreemangal",
    date: "Dec 2025",
    authors:
      "Muhammad Obaid Chowdhury, Arafat Kabir, Md. Minaruzzaman Shovon, Priya Chowdhury",
    label: "Conference Paper",
    featured: "Most read in the last month",
  },
  {
    href: "https://www.researchgate.net/publication/399604495_Seasonal_Anomaly_Detection_in_the_Halda_River_Using_a_Multivariate_Deep_Learning_Framework",
    title: "Seasonal Anomaly Detection in the Halda River Using a Multivariate Deep Learning Framework",
    date: "Dec 2025",
    authors: "Md. Minaruzzaman Shovon, H A Hossain Tamjid, MD. Tamim",
    label: "Conference Paper",
  },
] as const;

export const securityDisclosures = [
  {
    href: "/security/cve-2026-15048",
    title: "CVE-2026-15048 — GeekyBot Unauthenticated Sensitive Information Exposure",
    outlet: "WPScan / CVE",
    section: "Security Research",
    date: "Jul 2026",
    description:
      "Discovered and reported CVE-2026-15048, a medium-severity (CVSS 5.3) Information Exposure vulnerability in GeekyBot < 1.2.8. Missing authorization checks allow unauthenticated attackers to retrieve chat-history session metadata, user IDs, and WordPress usernames. Patched in version 1.2.8.",
  },
  {
    href: "/security/cve-2026-14322",
    title: "CVE-2026-14322 — Timetics Unauthenticated Booking Auto-Approval",
    outlet: "WPScan / CVE",
    section: "Security Research",
    date: "Jul 2026",
    description:
      "Discovered and reported CVE-2026-14322, a medium-severity (CVSS 5.3) Broken Access Control vulnerability in Timetics < 1.0.57. Unauthenticated users can create fully-approved bookings for priced appointments without making any payment by manipulating payment_method. Patched in version 1.0.57.",
  },
  {
    href: "/security/cve-2026-10749",
    title: "CVE-2026-10749 — Post Duplicator PHP Object Injection",
    outlet: "WPScan / CVE",
    section: "Security Research",
    date: "Jun 2026",
    description:
      "Discovered and reported CVE-2026-10749, a high-severity (CVSS 7.2) PHP Object Injection vulnerability in Post Duplicator ≤ 3.0.14. Authenticated Contributors can inject malicious serialized objects via the customMetaData parameter, enabling remote code execution when a gadget chain is present. Patched in version 3.0.15.",
  },
  {
    href: "/security/cve-2026-57661",
    title: "CVE-2026-57661 — WPComplete Broken Access Control",
    outlet: "Patchstack / CVE",
    section: "Security Research",
    date: "Jun 2026",
    description:
      "Discovered and reported CVE-2026-57661, a medium-severity (CVSS 5.4) Broken Access Control vulnerability in WPComplete ≤ 2.9.5.5. Missing authorization and nonce validation allows Subscriber-level users to perform privileged actions. Patched in version 2.9.5.6.",
  },
  {
    href: "/security/cve-2026-14821",
    title: "CVE-2026-14821 — Quiz and Survey Master Missing Authorization",
    outlet: "WPScan / CVE",
    section: "Security Research",
    date: "May 2026",
    description:
      "Discovered and reported CVE-2026-14821, a low-severity (CVSS 2.7) Missing Authorization vulnerability in Quiz and Survey Master (QSM) < 11.1.5. Authenticated Contributors can delete arbitrary output templates due to missing capability checks. Patched in version 11.1.5.",
  },
  {
    href: "https://wordpress.org/plugins/mappress-google-maps-for-wordpress/#developers",
    title: "MapPress Maps 2.97.2 Security Assistance",
    outlet: "WordPress.org",
    section: "Security Research",
    date: "2026",
    description:
      "Discovered and reported security vulnerabilities in MapPress Maps for WordPress. Received formal author appreciation and changelog recognition in version 2.97.2 ('Thanks to https://shovon.bd for security assistance in 2.97').",
  },
  {
    href: "https://wordpress.org/plugins/wp-store-locator/#developers",
    title: "WP Store Locator 2.3.1 Security Fix",
    outlet: "WordPress.org",
    section: "Security Research",
    date: "2026",
    description:
      "Discovered and reported a high-severity Stored XSS vulnerability (CVSS 8.1) in WP Store Locator (<= 2.3.0). Coordinated a responsible disclosure resulting in a critical patch in version 2.3.1 and formal recognition in the changelog.",
  },
] as const;

export const pressCoverage = [
  {
    href: "https://www.thedailystar.net/tech-startup/news/digital-resistance-websites-kept-the-revolution-alive-3677231",
    title: "Digital resistance: The websites that kept the revolution alive",
    outlet: "The Daily Star",
    section: "Tech & Startup",
    date: "2024",
    description:
      "Featured for co-developing The Inquilab with Daniel Rozario (Varendra University) — an open-source archive of martyrs, stories, and key events of the July 2024 protests, preserved via the Wayback Machine and exposed through a public API.",
  },
] as const;

export const featured = [...securityDisclosures, ...pressCoverage] as const;

export const certifications = [
  ["CISSP by InfoSec", "InfoSEC, Jun 2025"],
  ["Cybersecurity Attack and Defense Fundamentals", "EC-Council, Jun 2025"],
  ["Microsoft Python Development", "Microsoft, Jun 2025"],
  ["Google Cybersecurity Professional", "Google, Jun 2025"],
  ["GIS & Its Application", "Enhancing Digital Government & Economy Project, Apr 2025"],
] as const;

export const achievements = [
  ["Ranked 11th - NextGen Hackathon", "International Islamic University Chittagong", "2025"],
  ["Finalist - BCS ICT FEST 2025 (Top 21 of 150+ Teams)", "Bangladesh Computer Society", "2025"],
  ["Ranked 246th out of 760 Participants - KnightCTF 2025", "Organized by Knight Squad", "2025"],
  [
    "2nd Runner-Up - IEEE CS Hackathon",
    "IEEE Computer Society, Bangladesh University of Engineering and Technology",
    "2024",
  ],
  [
    "Local Qualifier - NASA Space Apps Challenge 2024",
    "Earth Science Division, Science Mission Directorate, NASA",
    "2024",
  ],
  ["Ranked 26th out of 106 Teams - SMP CTF 2024", "Organized by SMP Cyber Security", "2024"],
  [
    "1st Place - AutoCAD Design Competition",
    "Department of Water Resources Engineering, Chittagong University of Engineering and Technology",
    "2023",
  ],
] as const;

export const gallery = [
  ["/images/lst_high_res.png", "High Resolution LST"],
  ["/images/padma_pulse.png", "Padma Pulse"],
  ["/images/seminar_ccsc.png", "seminar CCSC"],
  ["/images/truss_solver.png", "Truss Solver"],
  ["/images/uap_ccsc.png", "UAP CCSC"],
  ["/images/exabytebd.png", "ExabyteBD"],
  ["/images/math_solver.png", "Math Solver"],
] as const;

export const skills = [
  ["Frontend", "Next.js", "React", "Expo (React Native)", "TypeScript", "Tailwind CSS"],
  ["Backend", "Node.js", "Express.js", "REST APIs", "Authentication Systems"],
  ["Database", "MongoDB", "Mongoose", "Firebase"],
  ["GIS/ML Modelling", "QGIS", "ArcGIS", "ETABS", "AutoCAD", "HEC-RAS"],
] as const;
