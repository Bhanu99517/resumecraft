import React from 'react';
import { motion } from 'motion/react';
import { 
  ChevronRight, 
  ChevronLeft,
  CheckCircle2,
  Sparkles,
  Zap,
  Briefcase,
  Palette,
  Type,
  Check,
  Layout,
  Users,
  Grid,
  GraduationCap
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useResume, TemplateType } from '../context/ResumeContext';
import { ResumePreview } from '../components/ResumePreview';
import { ScaleContainer } from '../components/ScaleContainer';

const primaryColors = [
  { name: 'Indigo', value: '#4f46e5' },
  { name: 'Rose', value: '#e11d48' },
  { name: 'Emerald', value: '#059669' },
  { name: 'Amber', value: '#b45309' },
  { name: 'Sky', value: '#0ea5e9' },
  { name: 'Slate', value: '#334155' },
  { name: 'Neutral', value: '#171717' },
];

const fontFamilies = [
  { name: 'Sans', value: 'font-sans' },
  { name: 'Serif', value: 'font-serif' },
  { name: 'Mono', value: 'font-mono' },
];

const templates = [
  { 
    id: 'modern', 
    name: 'Modern Professional', 
    description: 'Clean, two-column layout with a focus on readability and modern aesthetics.',
    icon: <Sparkles className="text-indigo-500" />,
    color: 'bg-indigo-50'
  },
  { 
    id: 'classic', 
    name: 'Classic Executive', 
    description: 'Traditional single-column layout that emphasizes experience and professional history.',
    icon: <Briefcase className="text-slate-500" />,
    color: 'bg-slate-50'
  },
  { 
    id: 'artistic', 
    name: 'Artistic Portfolio', 
    description: 'Bold, creative design with unique visual elements for designers and creatives.',
    icon: <Palette className="text-rose-500" />,
    color: 'bg-rose-50'
  },
  { 
    id: 'technical', 
    name: 'Technical Specialist', 
    description: 'Optimized for developers and engineers, highlighting skills and technical projects.',
    icon: <Zap className="text-emerald-500" />,
    color: 'bg-emerald-50'
  },
  { 
    id: 'minimal', 
    name: 'Minimalist Clean', 
    description: 'Ultra-clean design that lets your content speak for itself.',
    icon: <Sparkles className="text-neutral-500" />,
    color: 'bg-neutral-50'
  },
  { 
    id: 'elegant', 
    name: 'Elegant Serif', 
    description: 'Sophisticated typography and refined spacing for a premium feel.',
    icon: <Palette className="text-amber-500" />,
    color: 'bg-amber-50'
  },
  { 
    id: 'compact', 
    name: 'Compact Minimal', 
    description: 'Space-efficient design that packs a punch without feeling crowded.',
    icon: <Zap className="text-blue-500" />,
    color: 'bg-blue-50'
  },
  { 
    id: 'sidebar-left', 
    name: 'Sidebar Left', 
    description: 'Profile and skills on the left, experience on the right for a balanced look.',
    icon: <Layout className="text-indigo-500" />,
    color: 'bg-indigo-50'
  },
  { 
    id: 'bold-header', 
    name: 'Bold Header', 
    description: 'A large, colorful header section that makes an immediate impact.',
    icon: <Users className="text-violet-500" />,
    color: 'bg-violet-50'
  },
  { 
    id: 'grid-focus', 
    name: 'Grid Focus', 
    description: 'A layout that uses a grid for skills and education, perfect for technical roles.',
    icon: <Grid className="text-cyan-500" />,
    color: 'bg-cyan-50'
  },
  { 
    id: 'academic', 
    name: 'Academic CV', 
    description: 'A traditional, text-heavy layout optimized for academic and research roles.',
    icon: <GraduationCap className="text-neutral-500" />,
    color: 'bg-neutral-50'
  },
];

export const SelectPage = () => {
  const { data, selectedTemplate, setSelectedTemplate, updateTemplateCustomization } = useResume();
  const navigate = useNavigate();

  const currentCustomization = data.templateCustomizations[selectedTemplate] || { primaryColor: '#1e293b', fontFamily: 'font-sans' };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-6xl mx-auto space-y-8"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-neutral-900">Choose your template</h2>
          <p className="text-neutral-500 mt-1 text-lg">Select a design that best represents your professional brand.</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/edit')}
            className="px-6 py-3 rounded-xl font-bold flex items-center gap-2 border border-neutral-200 hover:bg-neutral-50 transition-all"
          >
            <ChevronLeft size={18} />
            Back to Edit
          </button>
          <button
            onClick={() => navigate('/preview')}
            className="text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 hover:opacity-90 transition-all shadow-lg"
            style={{ backgroundColor: data.customization.primaryColor, boxShadow: `0 10px 15px -3px ${data.customization.primaryColor}33` }}
          >
            Finalize & Download
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Template List */}
        <div className="lg:col-span-5 space-y-4">
          {templates.map((template) => (
            <div
              key={template.id}
              role="button"
              tabIndex={0}
              onClick={() => setSelectedTemplate(template.id as any)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  setSelectedTemplate(template.id as any);
                }
              }}
              className={`w-full text-left p-6 rounded-2xl border-2 transition-all relative group overflow-hidden cursor-pointer ${
                selectedTemplate === template.id 
                  ? 'border-neutral-900 bg-white shadow-xl scale-[1.02] z-10' 
                  : 'border-neutral-100 bg-neutral-50/50 hover:border-neutral-300 hover:bg-white'
              }`}
              style={{ 
                borderColor: selectedTemplate === template.id ? data.customization.primaryColor : undefined,
                boxShadow: selectedTemplate === template.id ? `0 20px 25px -5px ${data.customization.primaryColor}22` : undefined
              }}
            >
              {selectedTemplate === template.id && (
                <div className="absolute top-4 right-4 text-emerald-500">
                  <CheckCircle2 size={24} fill="currentColor" className="text-white" />
                </div>
              )}
              <div className="flex gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${template.color}`}>
                  {template.icon}
                </div>
                <div className="space-y-1">
                  <h3 className="font-bold text-lg text-neutral-900">{template.name}</h3>
                  <p className="text-sm text-neutral-500 leading-relaxed">{template.description}</p>
                </div>
              </div>

              {selectedTemplate === template.id && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-6 pt-6 border-t border-neutral-100 space-y-6"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-xs font-bold text-neutral-400 uppercase tracking-wider">
                      <Palette size={14} />
                      Primary Color
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {primaryColors.map((color) => (
                        <button
                          key={color.value}
                          onClick={() => updateTemplateCustomization(template.id as TemplateType, { primaryColor: color.value })}
                          className={`w-8 h-8 rounded-full border-2 transition-all flex items-center justify-center ${
                            currentCustomization.primaryColor === color.value ? 'scale-110 shadow-md' : 'border-transparent hover:scale-105'
                          }`}
                          style={{ backgroundColor: color.value, borderColor: currentCustomization.primaryColor === color.value ? 'white' : 'transparent' }}
                          title={color.name}
                        >
                          {currentCustomization.primaryColor === color.value && (
                            <Check size={14} className="text-white" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-xs font-bold text-neutral-400 uppercase tracking-wider">
                      <Type size={14} />
                      Typography
                    </div>
                    <div className="flex gap-2">
                      {fontFamilies.map((font) => (
                        <button
                          key={font.value}
                          onClick={() => updateTemplateCustomization(template.id as TemplateType, { fontFamily: font.value })}
                          className={`flex-1 py-2 px-3 rounded-lg border-2 text-sm font-medium transition-all ${
                            currentCustomization.fontFamily === font.value
                              ? 'border-neutral-900 bg-neutral-900 text-white'
                              : 'border-neutral-100 bg-white text-neutral-600 hover:border-neutral-200'
                          }`}
                          style={{ 
                            borderColor: currentCustomization.fontFamily === font.value ? currentCustomization.primaryColor : undefined,
                            backgroundColor: currentCustomization.fontFamily === font.value ? currentCustomization.primaryColor : undefined
                          }}
                        >
                          {font.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          ))}
        </div>

        {/* Live Preview */}
        <div className="lg:col-span-7">
          <div className="bg-neutral-100 rounded-3xl p-4 sm:p-8 border border-neutral-200 sticky top-8 overflow-hidden mx-auto lg:mx-0">
            <div className="flex items-center justify-between mb-6">
              <span className="text-sm font-bold text-neutral-500 uppercase tracking-widest">Live Preview</span>
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              </div>
            </div>
            <div className="rounded-xl">
              <ScaleContainer baseWidth={800}>
                <div className="pointer-events-none select-none">
                  <ResumePreview />
                </div>
              </ScaleContainer>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
