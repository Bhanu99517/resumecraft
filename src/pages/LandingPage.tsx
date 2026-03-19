import React from 'react';
import { motion } from 'motion/react';
import { 
  FileText, 
  ChevronRight, 
  CheckCircle2, 
  Sparkles, 
  Zap, 
  ShieldCheck,
  Star
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useResume } from '../context/ResumeContext';

export const LandingPage = () => {
  const navigate = useNavigate();
  const { user, signIn } = useResume();

  return (
    <div className="space-y-16 md:space-y-24 pb-24">
      {/* Hero Section */}
      <section className="relative pt-8 md:pt-12">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-indigo-50/50 blur-3xl rounded-full -z-10" />
        
        <div className="text-center space-y-6 md:space-y-8 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-neutral-200 shadow-sm text-[10px] sm:text-xs md:text-sm font-bold text-neutral-600"
          >
            <span className="flex h-2 w-2 rounded-full bg-emerald-500" />
            Trusted by 50,000+ Job Seekers
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-7xl font-bold text-neutral-900 tracking-tight leading-[1.1]"
          >
            Build a resume that <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">gets you hired.</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl text-neutral-500 max-w-2xl mx-auto leading-relaxed px-4"
          >
            Create a professional, ATS-friendly resume in minutes with our beautiful templates and intuitive builder.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col items-center gap-4 pt-4"
          >
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
              <button
                onClick={() => user ? navigate('/edit') : signIn()}
                className="w-full sm:w-auto px-10 py-5 bg-neutral-900 text-white rounded-2xl font-bold text-lg flex items-center justify-center gap-2 hover:bg-neutral-800 transition-all shadow-xl hover:-translate-y-1"
              >
                {user ? 'Continue Building' : 'Get Started'}
                <ChevronRight size={20} />
              </button>
              <button className="w-full sm:w-auto px-10 py-5 bg-white text-neutral-900 border border-neutral-200 rounded-2xl font-bold text-lg hover:bg-neutral-50 transition-all">
                View Templates
              </button>
            </div>
            {!user && (
              <button 
                onClick={signIn}
                className="flex items-center gap-2 text-sm font-bold text-neutral-500 hover:text-neutral-900 transition-colors"
              >
                <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-4 h-4" />
                Sign in with Google to save your progress
              </button>
            )}
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          {
            icon: <Sparkles className="text-amber-500" />,
            title: "Beautiful Templates",
            description: "Choose from a variety of professionally designed templates that stand out."
          },
          {
            icon: <Zap className="text-indigo-500" />,
            title: "Fast & Intuitive",
            description: "Our builder is designed for speed. Get your resume ready in under 10 minutes."
          },
          {
            icon: <ShieldCheck className="text-emerald-500" />,
            title: "ATS-Friendly",
            description: "All templates are optimized to pass through Applicant Tracking Systems."
          }
        ].map((feature, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="p-8 rounded-3xl bg-white border border-neutral-100 shadow-sm hover:shadow-md transition-all"
          >
            <div className="w-12 h-12 rounded-2xl bg-neutral-50 flex items-center justify-center mb-6">
              {feature.icon}
            </div>
            <h3 className="text-xl font-bold text-neutral-900 mb-3">{feature.title}</h3>
            <p className="text-neutral-500 leading-relaxed">{feature.description}</p>
          </motion.div>
        ))}
      </section>

      {/* Social Proof */}
      <section className="bg-neutral-900 rounded-[2rem] sm:rounded-[3rem] p-8 sm:p-12 md:p-20 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 blur-[100px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-violet-500/10 blur-[100px] rounded-full" />
        
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
              Join thousands of <br className="hidden sm:block" />
              successful professionals.
            </h2>
            <div className="space-y-4">
              {[
                "Free to use, no hidden costs",
                "Export to high-quality PDF",
                "Unlimited resume versions",
                "No account required to start"
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 text-neutral-300 text-sm sm:text-base">
                  <CheckCircle2 size={20} className="text-emerald-400" />
                  {item}
                </div>
              ))}
            </div>
            <button
              onClick={() => user ? navigate('/edit') : signIn()}
              className="w-full sm:w-auto px-8 py-4 bg-white text-neutral-900 rounded-xl font-bold hover:bg-neutral-100 transition-all"
            >
              {user ? 'Continue Building' : 'Get Started Now'}
            </button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-4 pt-0 sm:pt-12">
              <div className="bg-white/5 backdrop-blur-sm p-6 rounded-3xl border border-white/10">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="#fbbf24" className="text-amber-400" />)}
                </div>
                <p className="text-sm text-neutral-300 italic">"The best resume builder I've ever used. Simple and powerful."</p>
                <p className="mt-4 font-bold text-sm">— Sarah J., Product Designer</p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm p-6 rounded-3xl border border-white/10">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="#fbbf24" className="text-amber-400" />)}
                </div>
                <p className="text-sm text-neutral-300 italic">"Got an interview at Google using the Modern template!"</p>
                <p className="mt-4 font-bold text-sm">— Michael R., Software Engineer</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="bg-white/5 backdrop-blur-sm p-6 rounded-3xl border border-white/10">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="#fbbf24" className="text-amber-400" />)}
                </div>
                <p className="text-sm text-neutral-300 italic">"Clean designs and very easy to customize colors."</p>
                <p className="mt-4 font-bold text-sm">— David L., Marketing Lead</p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm p-6 rounded-3xl border border-white/10">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="#fbbf24" className="text-amber-400" />)}
                </div>
                <p className="text-sm text-neutral-300 italic">"Finally, a builder that doesn't feel like 1995."</p>
                <p className="mt-4 font-bold text-sm">— Elena K., HR Specialist</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
