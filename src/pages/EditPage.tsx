import React from 'react';
import { motion } from 'motion/react';
import { 
  Layout, 
  ChevronRight, 
  User, 
  Briefcase, 
  GraduationCap, 
  Code, 
  Users, 
  Languages, 
  Plus, 
  Trash2 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useResume } from '../context/ResumeContext';

const colorOptions = [
  { name: 'Slate', value: '#1e293b' },
  { name: 'Indigo', value: '#4f46e5' },
  { name: 'Emerald', value: '#059669' },
  { name: 'Rose', value: '#e11d48' },
  { name: 'Amber', value: '#d97706' },
  { name: 'Violet', value: '#7c3aed' },
  { name: 'Sky', value: '#0284c7' },
  { name: 'Black', value: '#171717' },
];

const fontOptions = [
  { name: 'Modern Sans', value: 'font-sans' },
  { name: 'Elegant Serif', value: 'font-serif' },
  { name: 'Technical Mono', value: 'font-mono' },
];

export const EditPage = () => {
  const { 
    data, 
    setData, 
    addExperience, 
    addEducation, 
    addLanguage, 
    addOrganization,
    addTechnicalSkill,
    removeTechnicalSkill,
    addSoftSkill,
    removeSoftSkill,
    user,
    signIn
  } = useResume();
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="max-w-4xl mx-auto space-y-8"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Layout style={{ color: data.customization.primaryColor }} />
          Edit Details
        </h2>
        <div className="flex items-center gap-4">
          {!user && (
            <button
              onClick={signIn}
              className="hidden md:flex items-center gap-2 text-sm font-bold text-neutral-500 hover:text-neutral-900 transition-colors"
            >
              Sign in to save progress
            </button>
          )}
          <button
            onClick={() => navigate('/select')}
            className="text-white px-6 py-2 rounded-xl font-bold flex items-center gap-2 hover:opacity-90 transition-all shadow-lg"
            style={{ backgroundColor: data.customization.primaryColor, boxShadow: `0 10px 15px -3px ${data.customization.primaryColor}33` }}
          >
            Choose Template
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Customization */}
      <section className="bg-white p-8 rounded-2xl border border-neutral-200 shadow-sm space-y-6">
        <h3 className="text-lg font-bold flex items-center gap-2 border-b pb-4">
          <Layout size={20} style={{ color: data.customization.primaryColor }} />
          Template Customization
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <label className="text-sm font-semibold text-neutral-600">Theme Color</label>
            <div className="flex flex-wrap gap-3">
              {colorOptions.map((color) => (
                <button
                  key={color.value}
                  onClick={() => setData({ ...data, customization: { ...data.customization, primaryColor: color.value } })}
                  className={`w-10 h-10 rounded-full border-2 transition-all ${
                    data.customization.primaryColor === color.value ? 'border-neutral-900 scale-110' : 'border-transparent hover:scale-105'
                  }`}
                  style={{ backgroundColor: color.value }}
                  title={color.name}
                />
              ))}
              <div className="relative w-10 h-10 rounded-full border border-neutral-200 overflow-hidden">
                <input
                  type="color"
                  value={data.customization.primaryColor}
                  onChange={(e) => setData({ ...data, customization: { ...data.customization, primaryColor: e.target.value } })}
                  className="absolute inset-0 w-[200%] h-[200%] -translate-x-1/4 -translate-y-1/4 cursor-pointer"
                />
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <label className="text-sm font-semibold text-neutral-600">Typography Style</label>
            <div className="grid grid-cols-1 gap-2">
              {fontOptions.map((font) => (
                <button
                  key={font.value}
                  onClick={() => setData({ ...data, customization: { ...data.customization, fontFamily: font.value } })}
                  className={`px-4 py-2 rounded-lg border text-left transition-all ${
                    data.customization.fontFamily === font.value 
                      ? 'bg-neutral-50 font-bold' 
                      : 'border-neutral-200 hover:border-neutral-400'
                  } ${font.value}`}
                  style={{ 
                    borderColor: data.customization.fontFamily === font.value ? data.customization.primaryColor : undefined,
                    boxShadow: data.customization.fontFamily === font.value ? `0 0 0 1px ${data.customization.primaryColor}` : undefined
                  }}
                >
                  {font.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Personal Info */}
      <section className="bg-white p-8 rounded-2xl border border-neutral-200 shadow-sm space-y-6">
        <h3 className="text-lg font-bold flex items-center gap-2 border-b pb-4">
          <User size={20} style={{ color: data.customization.primaryColor }} />
          Personal Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-neutral-600">Full Name</label>
              <input
                type="text"
                value={data.personalInfo.fullName}
                onChange={(e) => setData({ ...data, personalInfo: { ...data.personalInfo, fullName: e.target.value } })}
                className="w-full px-4 py-2 rounded-lg border border-neutral-200 outline-none transition-all focus:ring-2"
                style={{ '--tw-ring-color': data.customization.primaryColor } as any}
                placeholder="John Doe"
              />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-neutral-600">Email Address</label>
            <input
              type="email"
              value={data.personalInfo.email}
              onChange={(e) => setData({ ...data, personalInfo: { ...data.personalInfo, email: e.target.value } })}
              className="w-full px-4 py-2 rounded-lg border border-neutral-200 outline-none transition-all focus:ring-2"
              style={{ '--tw-ring-color': data.customization.primaryColor } as any}
              placeholder="john@example.com"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-neutral-600">Phone Number</label>
            <input
              type="tel"
              value={data.personalInfo.phone}
              onChange={(e) => setData({ ...data, personalInfo: { ...data.personalInfo, phone: e.target.value } })}
              className="w-full px-4 py-2 rounded-lg border border-neutral-200 outline-none transition-all focus:ring-2"
              style={{ '--tw-ring-color': data.customization.primaryColor } as any}
              placeholder="+1 (555) 000-0000"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-neutral-600">Location</label>
            <input
              type="text"
              value={data.personalInfo.location}
              onChange={(e) => setData({ ...data, personalInfo: { ...data.personalInfo, location: e.target.value } })}
              className="w-full px-4 py-2 rounded-lg border border-neutral-200 outline-none transition-all focus:ring-2"
              style={{ '--tw-ring-color': data.customization.primaryColor } as any}
              placeholder="New York, NY"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-neutral-600">Website / Portfolio</label>
            <input
              type="url"
              value={data.personalInfo.website}
              onChange={(e) => setData({ ...data, personalInfo: { ...data.personalInfo, website: e.target.value } })}
              className="w-full px-4 py-2 rounded-lg border border-neutral-200 outline-none transition-all focus:ring-2"
              style={{ '--tw-ring-color': data.customization.primaryColor } as any}
              placeholder="https://portfolio.com"
            />
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-neutral-600">Professional Summary</label>
          <textarea
            value={data.personalInfo.summary}
            onChange={(e) => setData({ ...data, personalInfo: { ...data.personalInfo, summary: e.target.value } })}
            className="w-full px-4 py-2 rounded-lg border border-neutral-200 outline-none transition-all min-h-[100px] focus:ring-2"
            style={{ '--tw-ring-color': data.customization.primaryColor } as any}
            placeholder="Briefly describe your professional background and key achievements..."
          />
        </div>
      </section>

      {/* Experience */}
      <section className="bg-white p-8 rounded-2xl border border-neutral-200 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b pb-4">
          <h3 className="text-lg font-bold flex items-center gap-2">
            <Briefcase size={20} style={{ color: data.customization.primaryColor }} />
            Work Experience
          </h3>
          <button
            onClick={addExperience}
            className="px-3 py-1 rounded-lg flex items-center gap-1 text-sm font-bold transition-colors"
            style={{ color: data.customization.primaryColor }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = `${data.customization.primaryColor}11`}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = ''}
          >
            <Plus size={16} /> Add Experience
          </button>
        </div>
        <div className="space-y-8">
          {data.experience.map((exp, idx) => (
            <div key={exp.id} className="relative p-6 rounded-xl border border-neutral-100 bg-neutral-50/50 space-y-4">
              <button
                onClick={() => setData({ ...data, experience: data.experience.filter(e => e.id !== exp.id) })}
                className="absolute top-4 right-4 text-neutral-400 hover:text-red-500 transition-colors"
              >
                <Trash2 size={18} />
              </button>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Company Name"
                    value={exp.company}
                    onChange={(e) => {
                      const newExp = [...data.experience];
                      newExp[idx].company = e.target.value;
                      setData({ ...data, experience: newExp });
                    }}
                    className="w-full px-4 py-2 rounded-lg border border-neutral-200 outline-none focus:ring-2"
                    style={{ '--tw-ring-color': data.customization.primaryColor } as any}
                  />
                  <input
                    type="text"
                    placeholder="Position"
                    value={exp.position}
                    onChange={(e) => {
                      const newExp = [...data.experience];
                      newExp[idx].position = e.target.value;
                      setData({ ...data, experience: newExp });
                    }}
                    className="w-full px-4 py-2 rounded-lg border border-neutral-200 outline-none focus:ring-2"
                    style={{ '--tw-ring-color': data.customization.primaryColor } as any}
                  />
                  <input
                    type="text"
                    placeholder="Duration (e.g. 2020 - Present)"
                    value={exp.duration}
                    onChange={(e) => {
                      const newExp = [...data.experience];
                      newExp[idx].duration = e.target.value;
                      setData({ ...data, experience: newExp });
                    }}
                    className="w-full px-4 py-2 rounded-lg border border-neutral-200 outline-none focus:ring-2"
                    style={{ '--tw-ring-color': data.customization.primaryColor } as any}
                  />
              </div>
                <textarea
                  placeholder="Description of your responsibilities and achievements..."
                  value={exp.description}
                  onChange={(e) => {
                    const newExp = [...data.experience];
                    newExp[idx].description = e.target.value;
                    setData({ ...data, experience: newExp });
                  }}
                  className="w-full px-4 py-2 rounded-lg border border-neutral-200 outline-none min-h-[80px] focus:ring-2"
                  style={{ '--tw-ring-color': data.customization.primaryColor } as any}
                />
            </div>
          ))}
        </div>
      </section>

      {/* Education */}
      <section className="bg-white p-8 rounded-2xl border border-neutral-200 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b pb-4">
          <h3 className="text-lg font-bold flex items-center gap-2">
            <GraduationCap size={20} style={{ color: data.customization.primaryColor }} />
            Education
          </h3>
          <button
            onClick={addEducation}
            className="px-3 py-1 rounded-lg flex items-center gap-1 text-sm font-bold transition-colors"
            style={{ color: data.customization.primaryColor }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = `${data.customization.primaryColor}11`}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = ''}
          >
            <Plus size={16} /> Add Education
          </button>
        </div>
        <div className="space-y-6">
          {data.education.map((edu, idx) => (
            <div key={edu.id} className="relative p-6 rounded-xl border border-neutral-100 bg-neutral-50/50 space-y-4">
              <button
                onClick={() => setData({ ...data, education: data.education.filter(e => e.id !== edu.id) })}
                className="absolute top-4 right-4 text-neutral-400 hover:text-red-500 transition-colors"
              >
                <Trash2 size={18} />
              </button>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <input
                    type="text"
                    placeholder="School/University"
                    value={edu.school}
                    onChange={(e) => {
                      const newEdu = [...data.education];
                      newEdu[idx].school = e.target.value;
                      setData({ ...data, education: newEdu });
                    }}
                    className="w-full px-4 py-2 rounded-lg border border-neutral-200 outline-none focus:ring-2"
                    style={{ '--tw-ring-color': data.customization.primaryColor } as any}
                  />
                  <input
                    type="text"
                    placeholder="Degree"
                    value={edu.degree}
                    onChange={(e) => {
                      const newEdu = [...data.education];
                      newEdu[idx].degree = e.target.value;
                      setData({ ...data, education: newEdu });
                    }}
                    className="w-full px-4 py-2 rounded-lg border border-neutral-200 outline-none focus:ring-2"
                    style={{ '--tw-ring-color': data.customization.primaryColor } as any}
                  />
                  <input
                    type="text"
                    placeholder="Year"
                    value={edu.year}
                    onChange={(e) => {
                      const newEdu = [...data.education];
                      newEdu[idx].year = e.target.value;
                      setData({ ...data, education: newEdu });
                    }}
                    className="w-full px-4 py-2 rounded-lg border border-neutral-200 outline-none focus:ring-2"
                    style={{ '--tw-ring-color': data.customization.primaryColor } as any}
                  />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section className="bg-white p-8 rounded-2xl border border-neutral-200 shadow-sm space-y-8">
        <div className="space-y-6">
          <h3 className="text-lg font-bold flex items-center gap-2 border-b pb-4">
            <Code size={20} style={{ color: data.customization.primaryColor }} />
            Technical Skills
          </h3>
          <div className="space-y-4">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Add a technical skill (e.g. React, Python, AWS)"
                className="flex-1 px-4 py-2 rounded-lg border border-neutral-200 outline-none focus:ring-2"
                style={{ '--tw-ring-color': data.customization.primaryColor } as any}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    addTechnicalSkill((e.target as HTMLInputElement).value);
                    (e.target as HTMLInputElement).value = '';
                  }
                }}
              />
              <button 
                onClick={() => {
                  const input = document.querySelector('input[placeholder*="Add a technical skill"]') as HTMLInputElement;
                  addTechnicalSkill(input.value);
                  input.value = '';
                }}
                className="text-white px-4 py-2 rounded-lg hover:opacity-90 transition-colors"
                style={{ backgroundColor: data.customization.primaryColor }}
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {data.technicalSkills.map((skill) => (
                <span 
                  key={skill}
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium border"
                  style={{ 
                    backgroundColor: `${data.customization.primaryColor}11`, 
                    color: data.customization.primaryColor,
                    borderColor: `${data.customization.primaryColor}33`
                  }}
                >
                  {skill}
                  <button onClick={() => removeTechnicalSkill(skill)} className="hover:text-red-500">
                    <Trash2 size={14} />
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-lg font-bold flex items-center gap-2 border-b pb-4">
            <Users size={20} style={{ color: data.customization.primaryColor }} />
            Soft Skills
          </h3>
          <div className="space-y-4">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Add a soft skill (e.g. Leadership, Communication)"
                className="flex-1 px-4 py-2 rounded-lg border border-neutral-200 outline-none focus:ring-2"
                style={{ '--tw-ring-color': data.customization.primaryColor } as any}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    addSoftSkill((e.target as HTMLInputElement).value);
                    (e.target as HTMLInputElement).value = '';
                  }
                }}
              />
              <button 
                onClick={() => {
                  const input = document.querySelector('input[placeholder*="Add a soft skill"]') as HTMLInputElement;
                  addSoftSkill(input.value);
                  input.value = '';
                }}
                className="text-white px-4 py-2 rounded-lg hover:opacity-90 transition-colors"
                style={{ backgroundColor: data.customization.primaryColor }}
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {data.softSkills.map((skill) => (
                <span 
                  key={skill}
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium border"
                  style={{ 
                    backgroundColor: `${data.customization.primaryColor}11`, 
                    color: data.customization.primaryColor,
                    borderColor: `${data.customization.primaryColor}33`
                  }}
                >
                  {skill}
                  <button onClick={() => removeSoftSkill(skill)} className="hover:text-red-500">
                    <Trash2 size={14} />
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Languages */}
      <section className="bg-white p-8 rounded-2xl border border-neutral-200 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b pb-4">
          <h3 className="text-lg font-bold flex items-center gap-2">
            <Languages size={20} style={{ color: data.customization.primaryColor }} />
            Languages
          </h3>
          <button
            onClick={addLanguage}
            className="px-3 py-1 rounded-lg flex items-center gap-1 text-sm font-bold transition-colors"
            style={{ color: data.customization.primaryColor }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = `${data.customization.primaryColor}11`}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = ''}
          >
            <Plus size={16} /> Add Language
          </button>
        </div>
        <div className="space-y-4">
          {data.languages.map((lang, idx) => (
            <div key={lang.id} className="relative p-6 rounded-xl border border-neutral-100 bg-neutral-50/50 space-y-4">
              <button
                onClick={() => setData({ ...data, languages: data.languages.filter(l => l.id !== lang.id) })}
                className="absolute top-4 right-4 text-neutral-400 hover:text-red-500 transition-colors"
              >
                <Trash2 size={18} />
              </button>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Language (e.g. English)"
                  value={lang.name}
                  onChange={(e) => {
                    const newLangs = [...data.languages];
                    newLangs[idx].name = e.target.value;
                    setData({ ...data, languages: newLangs });
                  }}
                  className="w-full px-4 py-2 rounded-lg border border-neutral-200 outline-none focus:ring-2"
                  style={{ '--tw-ring-color': data.customization.primaryColor } as any}
                />
                <input
                  type="text"
                  placeholder="Level (e.g. Native, Fluent)"
                  value={lang.level}
                  onChange={(e) => {
                    const newLangs = [...data.languages];
                    newLangs[idx].level = e.target.value;
                    setData({ ...data, languages: newLangs });
                  }}
                  className="w-full px-4 py-2 rounded-lg border border-neutral-200 outline-none focus:ring-2"
                  style={{ '--tw-ring-color': data.customization.primaryColor } as any}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Organizations */}
      <section className="bg-white p-8 rounded-2xl border border-neutral-200 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b pb-4">
          <h3 className="text-lg font-bold flex items-center gap-2">
            <Users size={20} style={{ color: data.customization.primaryColor }} />
            Organizations & Volunteering
          </h3>
          <button
            onClick={addOrganization}
            className="px-3 py-1 rounded-lg flex items-center gap-1 text-sm font-bold transition-colors"
            style={{ color: data.customization.primaryColor }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = `${data.customization.primaryColor}11`}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = ''}
          >
            <Plus size={16} /> Add Organization
          </button>
        </div>
        <div className="space-y-8">
          {data.organizations.map((org, idx) => (
            <div key={org.id} className="relative p-6 rounded-xl border border-neutral-100 bg-neutral-50/50 space-y-4">
              <button
                onClick={() => setData({ ...data, organizations: data.organizations.filter(o => o.id !== org.id) })}
                className="absolute top-4 right-4 text-neutral-400 hover:text-red-500 transition-colors"
              >
                <Trash2 size={18} />
              </button>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Organization Name"
                  value={org.name}
                  onChange={(e) => {
                    const newOrgs = [...data.organizations];
                    newOrgs[idx].name = e.target.value;
                    setData({ ...data, organizations: newOrgs });
                  }}
                  className="w-full px-4 py-2 rounded-lg border border-neutral-200 outline-none focus:ring-2"
                  style={{ '--tw-ring-color': data.customization.primaryColor } as any}
                />
                <input
                  type="text"
                  placeholder="Role"
                  value={org.role}
                  onChange={(e) => {
                    const newOrgs = [...data.organizations];
                    newOrgs[idx].role = e.target.value;
                    setData({ ...data, organizations: newOrgs });
                  }}
                  className="w-full px-4 py-2 rounded-lg border border-neutral-200 outline-none focus:ring-2"
                  style={{ '--tw-ring-color': data.customization.primaryColor } as any}
                />
                <input
                  type="text"
                  placeholder="Duration"
                  value={org.duration}
                  onChange={(e) => {
                    const newOrgs = [...data.organizations];
                    newOrgs[idx].duration = e.target.value;
                    setData({ ...data, organizations: newOrgs });
                  }}
                  className="w-full px-4 py-2 rounded-lg border border-neutral-200 outline-none focus:ring-2"
                  style={{ '--tw-ring-color': data.customization.primaryColor } as any}
                />
              </div>
              <textarea
                placeholder="Description of your contributions..."
                value={org.description}
                onChange={(e) => {
                  const newOrgs = [...data.organizations];
                  newOrgs[idx].description = e.target.value;
                  setData({ ...data, organizations: newOrgs });
                }}
                className="w-full px-4 py-2 rounded-lg border border-neutral-200 outline-none min-h-[80px] focus:ring-2"
                style={{ '--tw-ring-color': data.customization.primaryColor } as any}
              />
            </div>
          ))}
        </div>
      </section>

      <div className="flex justify-end pt-4 pb-12">
        <button
          onClick={() => navigate('/preview')}
          className="text-white px-10 py-4 rounded-2xl font-bold flex items-center gap-2 hover:opacity-90 transition-all shadow-xl hover:-translate-y-1"
          style={{ backgroundColor: data.customization.primaryColor, boxShadow: `0 20px 25px -5px ${data.customization.primaryColor}33` }}
        >
          Save & Preview
          <ChevronRight size={20} />
        </button>
      </div>
    </motion.div>
  );
};
