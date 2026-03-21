import btechImg from '../static/Education/btech.png';
import higherSecImg from '../static/Education/higher secondary.png';
import secImg from '../static/Education/secondary.png';

import feamImg from '../static/Experience/FEAM.png';
import ammachiImg from '../static/Experience/AMMACHILABS.png';
import tibsImg from '../static/Experience/TIBS.png';

import tumorsProjImg from '../static/Project/TUMORS.png';
import academiaProjImg from '../static/Project/Academia.png';
import heypageProjImg from '../static/Project/Heypage.png';

import tumorsPubImg from '../static/Publication/Tumors.png';
import designPubImg from '../static/Publication/degin.png';

export const portfolioData = {
  name: "Naveen Krishnan Radhakrishna Pillai",
  title: "Electronics and Computer Engineer",
  tagline: "Building intelligent systems using machine learning, signal processing, and scalable web applications.",
  about: "Machine learning and signal processing focused Electronics and Computer Engineering graduate, with hands-on experience in medical imaging systems and data-driven applications.\n\nBuilt real-time tumor detection platforms and scalable web tools, combining research and engineering for practical impact in healthcare and analytics.\n\nInterested in solving real-world problems using AI, signal processing, and full-stack systems.",
  stats: {
    cgpa: "7.71",
    experiences: 3,
    projects: 5
  },
  education: [
    {
      degree: "B.Tech in Electronics and Computer Engineering",
      institution: "Amrita Vishwa Vidyapeetham",
      duration: "2021 — 2025",
      score: "CGPA: 7.71",
      link: "https://www.amrita.edu/campus/amritapuri/",
      preview: btechImg
    },
    {
      degree: "Higher Secondary",
      institution: "Good Shepherd Public School",
      duration: "2019 — 2021",
      score: "88%",
      link: "https://goodshepherdjc.com/",
      preview: higherSecImg
    },
    {
      degree: "Secondary",
      institution: "Kendriya Vidyalaya Sangathan",
      duration: "2016 — 2019",
      score: "85.6%",
      link: "https://adoor.kvs.ac.in/",
      preview: secImg
    }
  ],
  experience: [
    {
      role: "Intern",
      organization: "Centre for Flexible Electronics and Advanced Materials",
      duration: "Jan 2025 — Jul 2025",
      description: "Developed a web-based tumor monitoring system enabling real-time detection and statistical reporting for medical analysis.",
      link: "https://www.amrita.edu/center/flexible-electronics-advanced-materials/",
      preview: feamImg
    },
    {
      role: "Intern",
      organization: "AmmaChi Labs",
      duration: "Aug 2024 — Feb 2025",
      description: "Worked on drone-based data collection for coconut disease detection, supporting field surveys and agricultural analytics.",
      link: "https://www.amrita.edu/center/ammachi/",
      preview: ammachiImg
    },
    {
      role: "Intern",
      organization: "Tranquility IoT and Big Data Solutions (TIBS)",
      duration: "Sep 2023 — Aug 2024",
      description: "Tested and optimized antenna systems and sensor communication, achieving reliable long-range data transmission up to 3 km.",
      link: "https://www.tibsglobal.com/",
      preview: tibsImg
    }
  ],
  projects: [
    {
      title: "Microwave Imaging for Tumor Detection using Antennas",
      year: "2025",
      description: "Developed a non-invasive tumor detection system using microwave imaging and advanced reconstruction algorithms with real-time diagnostics and cloud-based monitoring.",
      link: "https://tumors.onrender.com/login?next=https://tumors.onrender.com/",
      image: tumorsProjImg
    },
    {
      title: "Academia – Student Productivity Platform",
      year: "2025",
      description: "Built a student platform with CGPA analysis, attendance tracking, reminders, exam scheduling, and expense management.",
      link: "https://academialite.lovable.app/",
      image: academiaProjImg
    },
    {
      title: "Heypage – Personal Link Manager",
      year: "2026",
      description: "Created a personal link aggregation platform to organize and share important links across categories.",
      link: "https://www.heypage.online/",
      image: heypageProjImg
    }
  ],
  skills: {
    technical: ["Python", "MATLAB", "R", "LTSpice", "Cisco Packet Tracer"],
    domains: ["Machine Learning", "Signal Processing", "Web Development"],
    soft: ["Communication", "Collaboration"]
  },
  languages: [
    { name: "Malayalam", level: "Native" },
    { name: "English", level: "Advanced", score: "IELTS 7.0" }
  ],
  publications: [
    {
      title: "Tumor Detection and Characterization Using Microwave Imaging Technique—An Experimental Calibration Approach",
      publisher: "MDPI Sensors",
      year: "2026",
      description: "Achieved over 96% accuracy in tumor detection using a modified beamforming algorithm with reconstruction under 48 seconds.",
      link: "https://www.mdpi.com/1424-8220/26/3/1014",
      image: tumorsPubImg
    },
    {
      title: "Design, Development, and Analysis of Spiral Microstrip Resonator Filter",
      publisher: "IEEE",
      description: "Designed and validated a microstrip sensor with less than 3% frequency error using HFSS simulations and prototyping.",
      link: "https://ieeexplore.ieee.org/abstract/document/10845310",
      image: designPubImg
    }
  ],
  volunteering: [
    {
      title: "ARISE",
      description: "Annual event at Amrita Vishwa Vidyapeetham recognizing research and publication contributions."
    },
    {
      title: "AMMA's 70th Birthday",
      description: "Assisted in organizing large-scale institutional events and coordination activities."
    },
    {
      title: "Student Social Responsibility (SSR)",
      description: "Conducted awareness sessions on cyber scams and digital safety for students."
    }
  ],
  contact: {
    location: "Kerala, India",
    email: "nkrnaveen385@gmail.com",
    github: "https://github.com/hasselx",
    linkedin: "https://linkedin.com/in/nkrnaveen385",
    heypage: "https://heypage.online/hasselx"
  }
};
