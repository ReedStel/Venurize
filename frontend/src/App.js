import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  ChevronRight, 
  Mail, 
  User, 
  ExternalLink, 
  Github, 
  Linkedin, 
  Star,
  Zap,
  Target,
  Rocket,
  Brain
} from 'lucide-react';
import './App.css';

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: "easeOut" }
};

const staggerChildren = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.2
    }
  }
};

// Email capture modal component
const EmailModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call to Brevo
    setTimeout(() => {
      setIsSuccess(true);
      setIsSubmitting(false);
      setTimeout(() => {
        onClose();
        setIsSuccess(false);
        setFormData({ name: '', email: '' });
      }, 2000);
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-charcoal-900 rounded-2xl p-8 max-w-md w-full glass border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            {isSuccess ? (
              <div className="text-center">
                <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Welcome to Venurize!</h3>
                <p className="text-gray-300">You're now on our exclusive waitlist.</p>
              </div>
            ) : (
              <>
                <h3 className="text-2xl font-bold text-white mb-6">Join Our Waitlist</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <input
                      type="text"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary-500 transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary-500 transition-colors"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-primary-600 to-primary-500 text-white py-3 rounded-lg font-semibold hover:from-primary-700 hover:to-primary-600 transition-all duration-200 transform hover:scale-105 disabled:opacity-50"
                  >
                    {isSubmitting ? 'Joining...' : 'Join Waitlist'}
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Project card component
const ProjectCard = ({ project, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay }}
    viewport={{ once: true }}
    className="bg-charcoal-800/50 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-primary-500/50 transition-all duration-300 group hover:transform hover:scale-105"
  >
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-xl font-bold text-white group-hover:text-primary-400 transition-colors">
        {project.name}
      </h3>
      <span className="text-sm text-emerald-400 bg-emerald-400/10 px-3 py-1 rounded-full">
        {project.status}
      </span>
    </div>
    <p className="text-gray-300 mb-4 leading-relaxed">{project.description}</p>
    <button className="flex items-center text-primary-400 hover:text-primary-300 transition-colors font-medium">
      Join Waitlist
      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
    </button>
  </motion.div>
);

function App() {
  const [emailModalOpen, setEmailModalOpen] = useState(false);
  
  // Scroll to projects section
  const scrollToProjects = () => {
    document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
  };

  // Pipeline projects data
  const pipelineProjects = [
    {
      name: "AutoPitch",
      description: "AI sales deck + pitch generator that creates compelling presentations in minutes.",
      status: "Coming Soon"
    },
    {
      name: "ClariBot",
      description: "Your doc-trained AI chatbot that answers questions instantly from your content.",
      status: "Coming Soon"
    },
    {
      name: "LeadMagnet AI",
      description: "More powerful version of VaultLaunch with advanced targeting capabilities.",
      status: "Coming Soon"
    },
    {
      name: "AdMock",
      description: "Viral ad generator for TikTok & Facebook that converts viewers into customers.",
      status: "Coming Soon"
    },
    {
      name: "ProofStack",
      description: "Social proof & testimonials dashboard that builds trust automatically.",
      status: "Coming Soon"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-charcoal-900 to-black">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b" 
            alt="Tech Background"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-charcoal-900/80 to-black/70"></div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <motion.h1 
              className="text-6xl md:text-8xl font-black text-white mb-6 leading-tight"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.2 }}
            >
              We build money-making
              <span className="block text-7xl md:text-[10rem] font-black bg-gradient-to-r from-primary-300 via-white to-emerald-300 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(255,255,255,0.8)] filter brightness-125 transform hover:scale-105 transition-all duration-500 leading-none">
                software. Fast.
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Venurize is a future-focused startup studio creating AI-powered tools for creators, founders, and agencies.
              <span className="block mt-4 text-emerald-400 font-semibold">
                We can build anything for anyone. Your vision, our execution.
              </span>
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-6 justify-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <button
                onClick={scrollToProjects}
                className="group bg-gradient-to-r from-primary-600 to-primary-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-primary-700 hover:to-primary-600 transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
              >
                View Our Projects
                <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button
                onClick={() => setEmailModalOpen(true)}
                className="group bg-transparent border-2 border-emerald-400 text-emerald-400 px-8 py-4 rounded-full font-semibold text-lg hover:bg-emerald-400 hover:text-black transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
              >
                Join Our Waitlist
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button
                onClick={() => document.getElementById('enquiries').scrollIntoView({ behavior: 'smooth' })}
                className="group bg-gradient-to-r from-emerald-600 to-emerald-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-emerald-700 hover:to-emerald-600 transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
              >
                Get Custom Software
                <Rocket className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About Venurize Section */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">About Venurize</h2>
            <p className="text-xl text-gray-300 leading-relaxed">
              Venurize is led by <span className="text-primary-400 font-semibold">Reed Stelfox</span> – a software engineering student, founder, and serial entrepreneur. We launch fast, validate with revenue, and build software designed to print money.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Project - VaultLaunch */}
      <section className="py-24 px-6 bg-gradient-to-r from-charcoal-900/50 to-primary-900/20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Featured Project</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-emerald-500 mx-auto"></div>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="relative">
                <img 
                  src="https://images.pexels.com/photos/16053029/pexels-photo-16053029.jpeg" 
                  alt="VaultLaunch Product"
                  className="rounded-2xl shadow-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-primary-500/20 to-emerald-500/20 rounded-2xl"></div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">VaultLaunch</h3>
              <p className="text-xl text-emerald-400 mb-6 font-semibold">
                "The fastest way to generate lead magnets that convert."
              </p>
              <p className="text-gray-300 mb-8 text-lg leading-relaxed">
                AI-powered generator for quizzes, eBooks, and checklists – used by creators to get more leads with less effort. This flagship product is funding Venurize's future innovations.
              </p>
              <a
                href="https://vaultlaunch.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-gradient-to-r from-emerald-600 to-emerald-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-emerald-700 hover:to-emerald-600 transition-all duration-300 transform hover:scale-105 inline-flex items-center"
              >
                Try VaultLaunch
                <ExternalLink className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Project Pipeline */}
      <section id="projects" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">What's launching next?</h2>
            <p className="text-xl text-gray-400">Our pipeline of game-changing AI tools</p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pipelineProjects.map((project, index) => (
              <ProjectCard key={project.name} project={project} delay={index * 0.1} />
            ))}
          </div>
        </div>
      </section>

      {/* Meet the Founder */}
      <section className="py-24 px-6 bg-gradient-to-r from-charcoal-800/50 to-primary-900/10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Meet the Founder</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-emerald-500 mx-auto"></div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h3 className="text-3xl font-bold text-white mb-2">Reed Stelfox</h3>
            <p className="text-xl text-primary-400 mb-6 font-semibold">Founder & Director</p>
            <p className="text-lg text-gray-300 leading-relaxed max-w-2xl mx-auto">
              "Building VaultLaunch. Leading Venurize into the future of AI-powered software."
            </p>
          </motion.div>
        </div>
      </section>

      {/* Vision/Mission */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="bg-gradient-to-r from-primary-900/30 to-emerald-900/30 backdrop-blur-sm border border-white/10 rounded-2xl p-12">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">Our Vision</h2>
              <p className="text-xl text-gray-300 leading-relaxed">
                We're building the next generation of AI-first software companies from the ground up. 
                <span className="text-primary-400 font-semibold"> No fluff – just profitable products that solve real problems.</span>
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Custom Software Enquiries */}
      <section id="enquiries" className="py-24 px-6 bg-gradient-to-r from-emerald-900/20 to-primary-900/20">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Need Custom Software?</h2>
            <p className="text-xl text-gray-300 mb-8">
              We build anything for anyone. From AI-powered SaaS to complex enterprise solutions.
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-primary-500 mx-auto"></div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-charcoal-800/50 backdrop-blur-sm border border-white/10 rounded-2xl p-8"
          >
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">What We Build</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full mt-3"></div>
                    <div>
                      <h4 className="text-lg font-semibold text-white">AI-Powered SaaS</h4>
                      <p className="text-gray-400">Custom AI tools and automation platforms</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full mt-3"></div>
                    <div>
                      <h4 className="text-lg font-semibold text-white">E-commerce Solutions</h4>
                      <p className="text-gray-400">High-converting online stores and marketplaces</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full mt-3"></div>
                    <div>
                      <h4 className="text-lg font-semibold text-white">Enterprise Software</h4>
                      <p className="text-gray-400">Custom business applications and integrations</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full mt-3"></div>
                    <div>
                      <h4 className="text-lg font-semibold text-white">Mobile Apps</h4>
                      <p className="text-gray-400">iOS and Android applications that scale</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">Start Your Project</h3>
                <form className="space-y-4">
                  <div>
                    <input
                      type="text"
                      placeholder="Your Name"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-emerald-400 transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      placeholder="Your Email"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-emerald-400 transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="Project Budget (Optional)"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-emerald-400 transition-colors"
                    />
                  </div>
                  <div>
                    <textarea
                      placeholder="Tell us about your project idea..."
                      rows="4"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-emerald-400 transition-colors resize-none"
                      required
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-emerald-600 to-emerald-500 text-white py-3 rounded-lg font-semibold hover:from-emerald-700 hover:to-emerald-600 transition-all duration-200 transform hover:scale-105 flex items-center justify-center"
                  >
                    <Rocket className="w-5 h-5 mr-2" />
                    Get Project Quote
                  </button>
                </form>
                <p className="text-sm text-gray-400 mt-4 text-center">
                  We'll respond within 24 hours with a detailed proposal.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 px-6 bg-gradient-to-r from-primary-900/40 to-emerald-900/40">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Want to stay in the loop as we launch?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join our exclusive waitlist and be the first to know about new releases.
            </p>
            <button
              onClick={() => setEmailModalOpen(true)}
              className="group bg-gradient-to-r from-emerald-600 to-emerald-500 text-white px-12 py-4 rounded-full font-bold text-xl hover:from-emerald-700 hover:to-emerald-600 transition-all duration-300 transform hover:scale-110 inline-flex items-center animate-glow"
            >
              <Mail className="w-6 h-6 mr-3" />
              Join Our Waitlist
              <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-16 px-6 bg-black/90">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1662098963427-fe6b7724d998" 
            alt="Premium Office Background"
            className="w-full h-full object-cover opacity-10"
          />
        </div>
        
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div className="md:col-span-2">
              <h3 className="text-2xl font-bold text-white mb-4">Venurize</h3>
              <p className="text-gray-400 mb-6">
                Building the next generation of AI-first software companies.
              </p>
              <div className="flex space-x-4">
                <a 
                  href="#" 
                  className="text-gray-400 hover:text-primary-400 transition-colors"
                >
                  <Linkedin className="w-6 h-6" />
                </a>
                <a 
                  href="#" 
                  className="text-gray-400 hover:text-primary-400 transition-colors"
                >
                  <Github className="w-6 h-6" />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Navigation</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Home</a></li>
                <li><a href="#projects" className="text-gray-400 hover:text-white transition-colors">Projects</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Connect</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">LinkedIn</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Twitter</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Email</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/10 pt-8">
            <p className="text-center text-gray-400">
              © 2025 Venurize Pty Ltd. Built with ambition in Australia.
            </p>
          </div>
        </div>
      </footer>

      {/* Email Modal */}
      <EmailModal isOpen={emailModalOpen} onClose={() => setEmailModalOpen(false)} />
    </div>
  );
}

export default App;