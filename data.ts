
import { TeamMember, Project, Achievement } from './types';

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: '1',
    name: 'Kishori Birari',
    role: 'App Developer',
    avatar: 'images/kishori.png',
    skills: ['Flutter', 'React Native', 'Android', 'Firebase', 'REST APIs'],
    bio: 'Responsible for mobile app development and feature development, performance optimization, and delivering a smooth user experience across the app.',
    socials: { github: 'https://github.com/Kishori-12', linkedin: 'https://www.linkedin.com/in/kishori-birari' }
  },
  {
    id: '2',
    name: 'Rutuja Patil',
    role: 'AI/ML Lead',
    avatar: 'images/rutuja.png',
    skills: ['Python', 'TensorFlow', 'PyTorch', 'Machine Learning', 'Deep Learning', 'LLMs'],
    bio: 'Leads AI and backend intelligence development, building machine learning models and data-driven system logic.',
    socials: { github: 'https://github.com/patilrutuja23', linkedin: 'https://www.linkedin.com/in/rutuja-patil-1a1522301/' }
  },
  {
    id: '3',
    name: 'Alpana Pardesi',
    role: 'Web Developer',
    avatar: 'images/alpana.png',
    skills: ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js', 'Web Security'],
    bio: 'Handles web development and security, ensuring a reliable, responsive, and secure web platform.',
    socials: { github: 'https://github.com/alpana11', linkedin: 'https://www.linkedin.com/in/alpana-pardeshi/' }
  },
  {
    id: '4',
    name: 'Shraddha Pawar',
    role: 'UI/UX Designer',
    avatar: 'images/shraddha.png',
    skills: ['Figma', 'UI Design', 'UX Research', 'Wireframing', 'Prototyping'],
    bio: 'Designs intuitive user interfaces and plans clear user flows to deliver a seamless user experience.',
    socials: { github: 'https://github.com/ShraddhaPawar05', linkedin: 'https://www.linkedin.com/in/shraddha-pawar-34398a330' }
  }
];

export const PROJECTS: Project[] = [
  {
    id: 'p1',
    title: 'Prabhav',
    description: 'A purpose-driven digital initiative focused on creating social and community impact by solving real-life problems in sustainability, local business empowerment, and social development through simple, scalable technology.',
    category: 'Social Impact',
    image: 'images/prabhav.png',
    techStack: ['Flutter', 'MongoDB'],
    links: { github: '#', demo: '#' }
  },
  {
    id: 'p2',
    title: 'CodeGenie IDE',
    description: 'An AI-powered coding assistant IDE that helps developers generate, refactor, and debug code in real time using large language models.',
    category: 'AI',
    image: 'images/codegennie.png',
    techStack: ['Ollama', 'node.js', 'react', 'Gemini API'],
    links: { github: 'https://github.com/patilrutuja23/Codegennie', demo: 'https://codegennie.vercel.app/' }
  },
  {
    id: 'p3',
    title: 'Safe Haven',
    description: 'A safety-focused application that enables users to manage emergency contacts, report incidents, create personalized safety plans, and access support resources with secure authentication and real-time access to critical information.',
    category: 'Safety & Security',
    image: 'images/safeheaven.png',
    techStack: ['Flutter', 'Firebase', 'Authentication', 'Real-time Database'],
    links: { github: 'https://github.com/ShraddhaPawar05/SafeHavenProject', demo: '#' }
  },
  {
    id: 'p4',
    title: 'Parivartan',
    description: 'Parivartan is a social impact platform aimed at driving positive change by addressing community challenges through awareness, digital access, and technology-driven solutions that empower individuals and local communities.',
    category: 'Social Impact',
    image: 'images/parivartan.png',
    techStack: ['React Native', 'Microsoft Azure', 'Firebase', 'React', 'Node.js'],
    links: { github: '#', demo: '#' }
  }
];

// export const ACHIEVEMENTS: Achievement[] = [
//   {
//     id: 'a1',
//     title: '1st Place, Smart India Hackathon',
//     organization: 'Govt of India',
//     date: 'Dec 2023',
//     description: 'Developed an AI-driven disaster management tool for urban planning.',
//     icon: '🏆'
//   },
//   {
//     id: 'a2',
//     title: 'Google Cloud Student Innovators',
//     organization: 'Google',
//     date: 'Aug 2023',
//     description: 'Selected as one of the top 50 teams globally for innovative cloud solutions.',
//     icon: '☁️'
//   },
//   {
//     id: 'a3',
//     title: 'ETHIndia Finalists',
//     organization: 'Devfolio',
//     date: 'Nov 2023',
//     description: 'Ranked in the top 10 out of 500+ projects for blockchain innovation.',
//     icon: '🛡️'
//   }
// ];
