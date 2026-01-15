
import React from 'react';
import { motion } from 'framer-motion';
import { 
  Github, 
  Linkedin, 
  ArrowRight, 
  ExternalLink, 
  Code2, 
  Cpu, 
  Layout, 
  Database, 
  Trophy,
  Mail,
  ChevronRight,
  Rocket
} from 'lucide-react';
import { Navbar } from './components/Navbar';
import { AIAssistant } from './components/AIAssistant';
import { TEAM_MEMBERS, PROJECTS, ACHIEVEMENTS } from './data';

const App: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 overflow-x-hidden">
      {/* Background blobs */}
      <div className="absolute top-0 left-0 w-full h-screen overflow-hidden -z-10 pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-indigo-600/20 blur-[120px] rounded-full animate-pulse"></div>
        <div className="absolute top-[20%] -right-[5%] w-[30%] h-[30%] bg-violet-600/20 blur-[120px] rounded-full animate-pulse delay-700"></div>
        <div className="absolute bottom-[10%] left-[20%] w-[25%] h-[25%] bg-blue-600/10 blur-[100px] rounded-full"></div>
      </div>

      <Navbar />

      <main>
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6">
          <div className="max-w-7xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl md:text-8xl font-black mb-8 leading-tight">                  
                <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-blue-400 bg-clip-text text-transparent">
                  Team Nirmaan
                </span>
              </h1>
              <span className="inline-block py-1 px-4 mb-6 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-widest font-mono">
                Architecting Digital Excellence
              </span>
              <h1 className="text-5xl md:text-8xl font-black mb-8 leading-tight">
                Building the Future <br />
                <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-blue-400 bg-clip-text text-transparent">
                  with AI & Code.
                </span>
              </h1>
              <p className="max-w-2xl mx-auto text-slate-400 text-lg md:text-xl mb-10 leading-relaxed">
                Nirmaan is a team of passionate engineers and designers working together to create AI-powered solutions that make a real difference in everyday life.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a 
                  href="#projects" 
                  className="w-full sm:w-auto px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-xl shadow-indigo-600/20 group"
                >
                  View Projects <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
                <a 
                  href="#team" 
                  className="w-full sm:w-auto px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-2xl font-bold transition-all border border-slate-700/50"
                >
                  Meet the Team
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 px-6 bg-slate-900/30">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold mb-6">Innovative by Choice, <br />Problem Solvers by Design.</h2>
              <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                Nirmaan began in hackathons, where ideas meet action. Led by four passionate women engineers, we bring together machine learning and full-stack development to create solutions that truly matter.
              </p>
              <div className="grid grid-cols-2 gap-6">
                {[
                  { icon: <Cpu className="text-indigo-400" />, title: "AI Native", desc: "Integrated intelligence in every layer." },
                  { icon: <Code2 className="text-blue-400" />, title: "Scalable", desc: "Built to handle millions of users." },
                  { icon: <Layout className="text-violet-400" />, title: "Immersive", desc: "Designs that focus on usability." },
                  { icon: <Database className="text-emerald-400" />, title: "Reliable", desc: "Robust and secure by default." },
                ].map((item, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700/50">
                    <div className="mb-3">{item.icon}</div>
                    <h4 className="font-bold text-slate-100 mb-1">{item.title}</h4>
                    <p className="text-xs text-slate-400">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-indigo-600/20 blur-[80px] rounded-full"></div>
              <img 
                src="https://picsum.photos/seed/nirmaan-team/800/800" 
                alt="Innovation" 
                className="relative z-10 rounded-3xl border border-slate-700/50 shadow-2xl grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section id="team" className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-6xl font-black mb-4">Meet the Minds</h2>
              <p className="text-slate-400 max-w-xl mx-auto">A diverse group of specialists united by a common goal: pushing the boundaries of what's possible.</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {TEAM_MEMBERS.map((member) => (
                <motion.div
                  key={member.id}
                  whileHover={{ y: -10 }}
                  className="group relative bg-slate-900 border border-slate-800 rounded-3xl p-6 overflow-hidden transition-all hover:border-indigo-500/50"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600/10 blur-3xl -z-10 group-hover:bg-indigo-600/20 transition-all"></div>
                  <img src={member.avatar} alt={member.name} className="w-24 h-24 mb-6 rounded-2xl bg-slate-800 p-2" />
                  <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                  <p className="text-indigo-400 text-sm font-semibold mb-4 font-mono">{member.role}</p>
                  <p className="text-slate-400 text-sm mb-6 leading-relaxed">{member.bio}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {member.skills.slice(0, 3).map(skill => (
                      <span key={skill} className="px-2 py-1 bg-slate-800 text-slate-300 text-[10px] font-bold rounded-md uppercase tracking-wider">{skill}</span>
                    ))}
                  </div>
                  <div className="flex items-center gap-4">
                    <a href={member.socials.github} className="text-slate-500 hover:text-white transition-colors"><Github className="w-5 h-5" /></a>
                    <a href={member.socials.linkedin} className="text-slate-500 hover:text-white transition-colors"><Linkedin className="w-5 h-5" /></a>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-24 px-6 bg-slate-900/20">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
              <div>
                <h2 className="text-4xl md:text-6xl font-black mb-4">Featured Work</h2>
                <p className="text-slate-400">Our latest breakthroughs in engineering and design.</p>
              </div>
              <div className="flex gap-2">
                {['All', 'AI', 'Web', 'Hackathon'].map((cat) => (
                  <button key={cat} className="px-5 py-2 rounded-full bg-slate-800 hover:bg-slate-700 text-sm font-bold border border-slate-700/50 transition-all">
                    {cat}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {PROJECTS.map((project) => (
                <div key={project.id} className="group relative bg-slate-900 border border-slate-800 rounded-[2.5rem] overflow-hidden hover:border-indigo-500/50 transition-all">
                  <div className="aspect-video overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="p-8">
                    <div className="flex justify-between items-start mb-4">
                      <span className="px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-bold uppercase rounded-full tracking-widest">
                        {project.category}
                      </span>
                      <div className="flex gap-3">
                        <a href={project.links.github} className="text-slate-400 hover:text-white transition-colors"><Github className="w-5 h-5" /></a>
                        <a href={project.links.demo} className="text-slate-400 hover:text-white transition-colors"><ExternalLink className="w-5 h-5" /></a>
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold mb-3">{project.title}</h3>
                    <p className="text-slate-400 mb-6 line-clamp-2">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map(tech => (
                        <span key={tech} className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{tech}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        {/* <section id="timeline" className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
             <div className="text-center mb-16">
              <h2 className="text-4xl md:text-6xl font-black mb-4">Impact Timeline</h2>
              <p className="text-slate-400">Milestones that define our journey so far.</p>
            </div>
            <div className="space-y-8">
              {ACHIEVEMENTS.map((ach) => (
                <div key={ach.id} className="group flex flex-col md:flex-row gap-8 bg-slate-900/50 p-8 rounded-3xl border border-slate-800 hover:bg-slate-800/50 transition-all">
                  <div className="md:w-32 flex-shrink-0">
                    <span className="text-indigo-400 font-mono font-bold">{ach.date}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl">{ach.icon}</span>
                      <h3 className="text-xl font-bold">{ach.title}</h3>
                    </div>
                    <p className="text-slate-400 font-medium mb-2">{ach.organization}</p>
                    <p className="text-slate-500 text-sm">{ach.description}</p>
                  </div>
                  <div className="flex items-center">
                    <ChevronRight className="w-6 h-6 text-slate-700 group-hover:text-indigo-500 transition-colors" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section> */}

        {/* Contact Section */}
        <section id="contact" className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-[3rem] p-8 md:p-16 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[80px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
              <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-4xl md:text-6xl font-black mb-6">Have a Big Idea? <br />Let's Build It.</h2>
                  <p className="text-indigo-100 text-lg mb-8 opacity-80">
                    want to connect with us. Whether you have a project in mind, need collaboration, or just want to say hello, we're all ears!
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 text-white">
                      <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                        <Mail className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-sm font-medium opacity-60">Email Us</p>
                        <p className="font-bold">teamnirmaan@gmail.com</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-white">
                      <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                        <Trophy className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-sm font-medium opacity-60">Success Stories</p>
                        <p className="font-bold">3+ Projects completed</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-3xl p-8 shadow-2xl">
                  <form className="space-y-6">
                    <div>
                      <label className="block text-slate-900 text-sm font-bold mb-2">Name</label>
                      <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900" placeholder="John Doe" />
                    </div>
                    <div>
                      <label className="block text-slate-900 text-sm font-bold mb-2">Email</label>
                      <input type="email" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900" placeholder="john@example.com" />
                    </div>
                    <div>
                      <label className="block text-slate-900 text-sm font-bold mb-2">Message</label>
                      <textarea rows={4} className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900" placeholder="How can we help?"></textarea>
                    </div>
                    <button className="w-full py-4 bg-slate-950 text-white rounded-2xl font-black hover:bg-slate-800 transition-colors">
                      SEND MESSAGE
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-slate-900">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
             {/* Fixed Rocket icon here */}
             <Rocket className="w-8 h-8 text-indigo-500" />
             <span className="text-2xl font-black tracking-tighter">NIRMAAN</span>
          </div>
          <div className="flex gap-8 text-slate-500 text-sm font-medium">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            {/* <a href="#" className="hover:text-white transition-colors">Twitter</a>
            <a href="#" className="hover:text-white transition-colors">LinkedIn</a> */}
          </div>
          <p className="text-slate-600 text-sm">
            &copy; {new Date().getFullYear()} Nirmaan Tech. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Dynamic AI Assistant */}
      <AIAssistant />
    </div>
  );
};

export default App;
