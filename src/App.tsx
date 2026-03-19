import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FileText, 
  ChevronLeft, 
  Github, 
  Twitter, 
  Linkedin,
  Menu,
  X,
  Bookmark,
  LogOut
} from 'lucide-react';
import { ResumeProvider, useResume } from './context/ResumeContext';
import { LandingPage } from './pages/LandingPage';
import { EditPage } from './pages/EditPage';
import { SelectPage } from './pages/SelectPage';
import { PreviewPage } from './pages/PreviewPage';
import { SavedResumes } from './pages/SavedResumes';
import { ViewPage } from './pages/ViewPage';

const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { data, user, signIn, logout, authLoading } = useResume();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const handleLogout = async () => {
    if (window.confirm('Are you sure you want to sign out?')) {
      await logout();
      setIsMenuOpen(false);
    }
  };

  // Close menu on resize, lock scroll, and handle Escape key
  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const isLanding = location.pathname === '/';
  const isEdit = location.pathname === '/edit';
  const isSelect = location.pathname === '/select';
  const isPreview = location.pathname === '/preview';

  const steps = [
    { path: '/edit', label: 'Details' },
    { path: '/select', label: 'Template' },
    { path: '/preview', label: 'Preview' },
  ];

  const currentStepIdx = steps.findIndex(s => s.path === location.pathname);

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-neutral-900 rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform overflow-hidden">
                <img 
                  src="https://i.ibb.co/9LgQWsK/Whats-App-Image-2026-03-19-at-3-11-19-PM.jpg" 
                  alt="Logo" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="text-lg sm:text-xl font-black tracking-tighter">RESUMAKE</span>
            </Link>

            {!isLanding && (
              <div className="hidden md:flex items-center gap-8">
                {steps.map((step, idx) => (
                  <div key={step.path} className="flex items-center gap-3">
                    <div 
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                        idx <= currentStepIdx 
                          ? 'bg-neutral-900 text-white' 
                          : 'bg-neutral-100 text-neutral-400'
                      }`}
                      style={{ 
                        backgroundColor: idx <= currentStepIdx ? data.customization.primaryColor : undefined 
                      }}
                    >
                      {idx + 1}
                    </div>
                    <span className={`text-sm font-bold ${idx <= currentStepIdx ? 'text-neutral-900' : 'text-neutral-400'}`}>
                      {step.label}
                    </span>
                    {idx < steps.length - 1 && (
                      <div className="w-8 h-[2px] bg-neutral-100 mx-2" />
                    )}
                  </div>
                ))}
              </div>
            )}

            <div className="flex items-center gap-4">
              {authLoading ? (
                <div className="w-8 h-8 border-2 border-neutral-200 border-t-neutral-900 rounded-full animate-spin" />
              ) : user ? (
                <div className="flex items-center gap-4">
                  <Link 
                    to="/saved" 
                    className="hidden sm:flex items-center gap-1.5 text-sm font-bold text-neutral-600 hover:text-neutral-900 transition-colors"
                  >
                    <Bookmark size={16} />
                    Saved
                  </Link>
                  <div className="flex items-center gap-3 pl-4 border-l border-neutral-200">
                    <div className="hidden sm:flex flex-col items-end">
                      <span className="text-xs font-bold text-neutral-900 leading-none">{user.displayName}</span>
                      <button onClick={handleLogout} className="text-[10px] font-bold text-neutral-400 hover:text-rose-500 transition-colors">Sign Out</button>
                    </div>
                    <img 
                      src={user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName}`} 
                      alt={user.displayName || 'User'} 
                      className="w-10 h-10 rounded-xl border border-neutral-200"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
              ) : (
                <button 
                  onClick={signIn}
                  className="hidden sm:block text-sm font-bold text-neutral-600 hover:text-neutral-900"
                >
                  Sign In
                </button>
              )}

              {isLanding && !user && (
                <button 
                  onClick={() => navigate('/edit')}
                  className="px-6 py-2.5 bg-neutral-900 text-white rounded-xl font-bold text-sm hover:bg-neutral-800 transition-all shadow-lg"
                >
                  Get Started
                </button>
              )}

              {!isLanding && (
                <button
                  onClick={() => navigate('/')}
                  className="hidden sm:flex items-center gap-2 text-sm font-bold text-neutral-500 hover:text-neutral-900 transition-colors"
                >
                  <ChevronLeft size={16} />
                  Exit Editor
                </button>
              )}
              
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-neutral-100"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMenuOpen(false)}
                className="fixed inset-0 bg-neutral-900/40 backdrop-blur-sm z-[60] md:hidden"
              />
              
              {/* Menu Content */}
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                role="dialog"
                aria-modal="true"
                aria-label="Mobile Navigation Menu"
                className="fixed top-0 right-0 bottom-0 w-[80%] max-w-sm bg-white z-[70] md:hidden shadow-2xl flex flex-col"
              >
                <div 
                  className="p-6 flex justify-between items-center border-b border-neutral-100"
                >
                  <span className="font-black tracking-tighter text-lg">MENU</span>
                  <button 
                    onClick={() => setIsMenuOpen(false)}
                    aria-label="Close menu"
                    className="p-2 rounded-xl hover:bg-neutral-100 transition-colors focus:outline-none focus:ring-2 focus:ring-neutral-900"
                  >
                    <X size={24} />
                  </button>
                </div>

                <div 
                  className="flex-1 overflow-y-auto p-6 space-y-8"
                  style={{
                    height: '48px',
                    width: '300.15px',
                    marginBottom: '0px',
                    marginTop: '0px',
                    paddingTop: '52px',
                    paddingBottom: '420px',
                    backgroundColor: '#f6f1f1'
                  }}
                >
                  <motion.div 
                    initial="hidden"
                    animate="visible"
                    variants={{
                      visible: { transition: { staggerChildren: 0.05 } }
                    }}
                    className="space-y-2"
                    style={{
                      marginBottom: '0px',
                      paddingTop: '0px',
                      marginLeft: '0px',
                      marginTop: '-5px'
                    }}
                  >
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400 mb-4">Navigation</p>
                    <motion.div variants={{ hidden: { opacity: 0, x: 20 }, visible: { opacity: 1, x: 0 } }}>
                      <Link
                        to="/"
                        onClick={() => setIsMenuOpen(false)}
                        className={`flex items-center gap-3 p-4 rounded-2xl transition-all ${
                          location.pathname === '/' ? 'bg-neutral-900 text-white shadow-lg' : 'hover:bg-neutral-50 text-neutral-600'
                        }`}
                      >
                        Home
                      </Link>
                    </motion.div>
                    {steps.map((step, idx) => (
                      <motion.div key={step.path} variants={{ hidden: { opacity: 0, x: 20 }, visible: { opacity: 1, x: 0 } }}>
                        <Link
                          to={step.path}
                          onClick={() => setIsMenuOpen(false)}
                          className={`flex items-center gap-3 p-4 rounded-2xl transition-all ${
                            location.pathname === step.path ? 'bg-neutral-900 text-white shadow-lg' : 'hover:bg-neutral-50 text-neutral-600'
                          }`}
                          style={{
                            paddingTop: '15px',
                            paddingBottom: '15px'
                          }}
                        >
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                            location.pathname === step.path ? 'bg-white/20' : 'bg-neutral-100'
                          }`}>
                            {idx + 1}
                          </div>
                          {step.label}
                        </Link>
                      </motion.div>
                    ))}
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="pt-8 border-t border-neutral-100 space-y-6"
                    style={{
                      paddingTop: '20px',
                      marginLeft: '0px',
                      marginBottom: '0px'
                    }}
                  >
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400">Account</p>
                    {user ? (
                      <div 
                        className="space-y-4"
                        style={{
                          paddingTop: '0px',
                          marginTop: '-5px'
                        }}
                      >
                        <div 
                          className="flex items-center gap-3 px-2"
                          style={{
                            paddingTop: '0px'
                          }}
                        >
                          <img 
                            src={user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName}`} 
                            alt={user.displayName || 'User'} 
                            className="w-12 h-12 rounded-2xl border border-neutral-200"
                            referrerPolicy="no-referrer"
                          />
                          <div>
                            <p className="font-bold text-neutral-900">{user.displayName}</p>
                            <p className="text-xs text-slate-500">{user.email}</p>
                          </div>
                        </div>
                        <Link 
                          to="/saved" 
                          onClick={() => setIsMenuOpen(false)}
                          className="w-full flex items-center gap-3 p-4 rounded-2xl hover:bg-neutral-50 text-neutral-600 font-bold transition-all"
                          style={{
                            paddingTop: '15px',
                            paddingBottom: '15px'
                          }}
                        >
                          <Bookmark size={18} />
                          Saved Resumes
                        </Link>
                        <button 
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 p-4 rounded-2xl bg-rose-50 text-rose-600 font-bold transition-all"
                          style={{
                            paddingTop: '15px',
                            paddingBottom: '15px'
                          }}
                        >
                          <LogOut size={18} />
                          Sign Out
                        </button>
                      </div>
                    ) : (
                      <button 
                        onClick={() => {
                          signIn();
                          setIsMenuOpen(false);
                        }}
                        className="w-full flex items-center gap-3 p-4 rounded-2xl bg-neutral-50 text-neutral-900 font-bold transition-all"
                      >
                        Sign In with Google
                      </button>
                    )}
                    {!isLanding && (
                      <button 
                        onClick={() => {
                          setIsMenuOpen(false);
                          navigate('/');
                        }}
                        className="w-full flex items-center gap-3 p-4 rounded-2xl hover:bg-neutral-50 text-neutral-600 font-bold transition-all"
                      >
                        <ChevronLeft size={18} />
                        Exit Editor
                      </button>
                    )}
                  </motion.div>
                </div>

                <div 
                  className="p-6 bg-neutral-50 border-t border-neutral-100"
                  style={{
                    paddingTop: '5px',
                    paddingBottom: '5px',
                    paddingLeft: '10px',
                    paddingRight: '10px'
                  }}
                >
                  <button 
                    onClick={() => {
                      setIsMenuOpen(false);
                      if (isLanding) navigate('/edit');
                    }}
                    className="w-full py-4 bg-neutral-900 text-white rounded-2xl font-bold shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all"
                    style={{ backgroundColor: data.customization.primaryColor }}
                  >
                    {isLanding ? 'Get Started' : 'Continue Building'}
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <AnimatePresence mode="wait">
          {children}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-neutral-200 pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-1 space-y-6">
              <Link to="/" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-neutral-900 rounded-lg flex items-center justify-center text-white">
                  <FileText size={20} />
                </div>
                <span className="text-lg font-black tracking-tighter">RESUMAKE</span>
              </Link>
              <p className="text-neutral-500 text-sm leading-relaxed">
                Empowering professionals to build their dream careers with beautiful, effective resumes.
              </p>
              <div className="flex gap-4">
                <a href="#" className="text-neutral-400 hover:text-neutral-900 transition-colors"><Twitter size={20} /></a>
                <a href="#" className="text-neutral-400 hover:text-neutral-900 transition-colors"><Github size={20} /></a>
                <a href="#" className="text-neutral-400 hover:text-neutral-900 transition-colors"><Linkedin size={20} /></a>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold text-neutral-900 mb-6">Product</h4>
              <ul className="space-y-4 text-sm text-neutral-500">
                <li><a href="#" className="hover:text-neutral-900 transition-colors">Templates</a></li>
                <li><a href="#" className="hover:text-neutral-900 transition-colors">Builder</a></li>
                <li><a href="#" className="hover:text-neutral-900 transition-colors">Examples</a></li>
                <li><a href="#" className="hover:text-neutral-900 transition-colors">Pricing</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-neutral-900 mb-6">Resources</h4>
              <ul className="space-y-4 text-sm text-neutral-500">
                <li><a href="#" className="hover:text-neutral-900 transition-colors">Career Blog</a></li>
                <li><a href="#" className="hover:text-neutral-900 transition-colors">Resume Guide</a></li>
                <li><a href="#" className="hover:text-neutral-900 transition-colors">Cover Letter</a></li>
                <li><a href="#" className="hover:text-neutral-900 transition-colors">Help Center</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-neutral-900 mb-6">Legal</h4>
              <ul className="space-y-4 text-sm text-neutral-500">
                <li><a href="#" className="hover:text-neutral-900 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-neutral-900 transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-neutral-900 transition-colors">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-neutral-100 pt-10 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-neutral-400 text-sm">© 2026 Resumake. All rights reserved.</p>
            <div className="flex items-center gap-2 text-sm text-neutral-400">
              Made with <span className="text-rose-500">♥</span> for developers
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ResumeProvider>
      <Router>
        <AppLayout>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/edit" element={<EditPage />} />
            <Route path="/select" element={<SelectPage />} />
            <Route path="/preview" element={<PreviewPage />} />
            <Route path="/saved" element={<SavedResumes />} />
            <Route path="/view/:id" element={<ViewPage />} />
          </Routes>
        </AppLayout>
      </Router>
    </ResumeProvider>
  );
};

export default App;
