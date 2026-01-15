
export type Role = 'App Developer' | 'AI/ML Lead' | 'Web Developer' | 'UI/UX Designer';

export interface SocialLinks {
  github?: string;
  linkedin?: string;
  twitter?: string;
  portfolio?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: Role;
  avatar: string;
  skills: string[];
  bio: string;
  socials: SocialLinks;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  category: 'AI' | 'Web' | 'Mobile' | 'Hackathon' | 'Social Impact' | 'Safety & Security';
  image: string;
  techStack: string[];
  links: {
    github?: string;
    demo?: string;
  };
}

export interface Achievement {
  id: string;
  title: string;
  organization: string;
  date: string;
  description: string;
  icon: string;
}
