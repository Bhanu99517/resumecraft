import React from 'react';
import { Mail, Phone, MapPin, Globe, Briefcase, GraduationCap, Code, Languages, Users, ExternalLink, Calendar, Award, BookOpen, Target } from 'lucide-react';
import { useResume } from '../context/ResumeContext';

interface ResumePreviewProps {
  data?: any;
  selectedTemplate?: string;
  isThumbnail?: boolean;
}

export const ResumePreview = ({ data: propData, selectedTemplate: propTemplate, isThumbnail }: ResumePreviewProps = {}) => {
  const context = useResume();
  const data = propData || context.data;
  const selectedTemplate = propTemplate || context.selectedTemplate;
  const { resumeRef, downloadError: contextDownloadError } = context;
  const downloadError = isThumbnail ? null : contextDownloadError;

  const renderTemplate = () => {
    switch (selectedTemplate) {
      case 'modern':
        return (
          <div className="p-12 grid grid-cols-12 gap-8 h-full">
            <div className="col-span-4 space-y-8 border-r pr-8" style={{ borderColor: '#e5e5e5' }}>
              <div className="space-y-4">
                <h3 className="text-xs font-black uppercase tracking-widest" style={{ color: data.customization.primaryColor }}>Contact</h3>
                <div className="space-y-2 text-sm">
                  {data.personalInfo.email && <div className="flex items-center gap-2"><Mail size={14} /> {data.personalInfo.email}</div>}
                  {data.personalInfo.phone && <div className="flex items-center gap-2"><Phone size={14} /> {data.personalInfo.phone}</div>}
                  {data.personalInfo.location && <div className="flex items-center gap-2"><MapPin size={14} /> {data.personalInfo.location}</div>}
                  {data.personalInfo.website && <div className="flex items-center gap-2"><Globe size={14} /> {data.personalInfo.website}</div>}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xs font-black uppercase tracking-widest" style={{ color: data.customization.primaryColor }}>Technical Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {data.technicalSkills.map(s => (
                    <span key={s} className="px-2 py-1 rounded text-xs font-medium" style={{ backgroundColor: '#f5f5f5' }}>{s}</span>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xs font-black uppercase tracking-widest" style={{ color: data.customization.primaryColor }}>Soft Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {data.softSkills.map(s => (
                    <span key={s} className="px-2 py-1 rounded text-xs font-medium" style={{ backgroundColor: '#f5f5f5' }}>{s}</span>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xs font-black uppercase tracking-widest" style={{ color: data.customization.primaryColor }}>Education</h3>
                {data.education.map(edu => (
                  <div key={edu.id} className="space-y-1">
                    <div className="font-bold text-sm">{edu.degree}</div>
                    <div className="text-xs" style={{ color: '#737373' }}>{edu.school}</div>
                    <div className="text-xs" style={{ color: '#a3a3a3' }}>{edu.year}</div>
                  </div>
                ))}
              </div>

              {data.languages.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-xs font-black uppercase tracking-widest" style={{ color: data.customization.primaryColor }}>Languages</h3>
                  <div className="space-y-1">
                    {data.languages.map(lang => (
                      <div key={lang.id} className="text-sm">
                        <span className="font-bold">{lang.name}</span>
                        {lang.level && <span className="text-xs ml-2" style={{ color: '#737373' }}>({lang.level})</span>}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="col-span-8 space-y-8">
              <div className="space-y-2">
                <h1 className="text-4xl font-black tracking-tight" style={{ color: '#171717' }}>{data.personalInfo.fullName || 'Your Name'}</h1>
                <p className="leading-relaxed" style={{ color: '#525252' }}>{data.personalInfo.summary}</p>
              </div>

              <div className="space-y-6">
                <h3 className="text-xs font-black uppercase tracking-widest border-b pb-2" style={{ color: data.customization.primaryColor, borderColor: `${data.customization.primaryColor}33` }}>Experience</h3>
                {data.experience.map(exp => (
                  <div key={exp.id} className="space-y-2">
                    <div className="flex justify-between items-baseline">
                      <h4 className="font-bold text-lg">{exp.position}</h4>
                      <span className="text-xs font-medium" style={{ color: '#a3a3a3' }}>{exp.duration}</span>
                    </div>
                    <div className="text-sm font-bold" style={{ color: data.customization.primaryColor }}>{exp.company}</div>
                    <p className="text-sm whitespace-pre-line" style={{ color: '#525252' }}>{exp.description}</p>
                  </div>
                ))}
              </div>

              {data.organizations.length > 0 && (
                <div className="space-y-6">
                  <h3 className="text-xs font-black uppercase tracking-widest border-b pb-2" style={{ color: data.customization.primaryColor, borderColor: `${data.customization.primaryColor}33` }}>Organizations</h3>
                  {data.organizations.map(org => (
                    <div key={org.id} className="space-y-2">
                      <div className="flex justify-between items-baseline">
                        <h4 className="font-bold text-lg">{org.role}</h4>
                        <span className="text-xs font-medium" style={{ color: '#a3a3a3' }}>{org.duration}</span>
                      </div>
                      <div className="text-sm font-bold" style={{ color: data.customization.primaryColor }}>{org.name}</div>
                      <p className="text-sm whitespace-pre-line" style={{ color: '#525252' }}>{org.description}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        );
      case 'professional':
        return (
          <div className="grid grid-cols-12 gap-0 h-full min-h-[1000px] bg-white">
            <div className="col-span-4 bg-neutral-900 text-white p-12 space-y-10">
              <div className="space-y-4">
                <h1 className="text-4xl font-black uppercase leading-none tracking-tighter">{data.personalInfo.fullName || 'Your Name'}</h1>
                <div className="h-2 w-12" style={{ backgroundColor: data.customization.primaryColor }} />
              </div>
              
              <div className="space-y-6 text-sm">
                <div className="flex items-center gap-3 text-neutral-400">
                  <Mail size={16} />
                  <span>{data.personalInfo.email}</span>
                </div>
                <div className="flex items-center gap-3 text-neutral-400">
                  <Phone size={16} />
                  <span>{data.personalInfo.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-neutral-400">
                  <MapPin size={16} />
                  <span>{data.personalInfo.location}</span>
                </div>
                {data.personalInfo.website && (
                  <div className="flex items-center gap-3 text-neutral-400">
                    <Globe size={16} />
                    <span>{data.personalInfo.website}</span>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-500">Education</h3>
                {data.education.map(edu => (
                  <div key={edu.id} className="space-y-1">
                    <div className="font-bold text-sm">{edu.degree}</div>
                    <div className="text-xs text-neutral-400">{edu.school}</div>
                    <div className="text-xs font-bold" style={{ color: data.customization.primaryColor }}>{edu.year}</div>
                  </div>
                ))}
              </div>

              {data.languages.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-500">Languages</h3>
                  <div className="space-y-2">
                    {data.languages.map(lang => (
                      <div key={lang.id} className="flex justify-between text-xs">
                        <span className="text-neutral-300">{lang.name}</span>
                        <span style={{ color: data.customization.primaryColor }}>{lang.level}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="col-span-8 p-12 space-y-10">
              <div className="space-y-4">
                <h3 className="text-sm font-bold uppercase border-b-2 pb-1" style={{ borderColor: data.customization.primaryColor }}>Professional Summary</h3>
                <p className="text-sm leading-relaxed italic" style={{ color: '#404040' }}>{data.personalInfo.summary}</p>
              </div>

              <div className="space-y-6">
                <h3 className="text-sm font-bold uppercase border-b-2 pb-1" style={{ borderColor: data.customization.primaryColor }}>Experience</h3>
                {data.experience.map(exp => (
                  <div key={exp.id} className="space-y-2">
                    <div className="flex justify-between font-bold">
                      <span style={{ color: data.customization.primaryColor }}>{exp.company}</span>
                      <span>{exp.duration}</span>
                    </div>
                    <div className="italic text-sm">{exp.position}</div>
                    <p className="text-sm whitespace-pre-line" style={{ color: '#404040' }}>{exp.description}</p>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-sm font-bold uppercase border-b-2 pb-1" style={{ borderColor: data.customization.primaryColor }}>Technical Skills</h3>
                  <div className="text-sm" style={{ color: '#404040' }}>
                    {data.technicalSkills.join(' • ')}
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-sm font-bold uppercase border-b-2 pb-1" style={{ borderColor: data.customization.primaryColor }}>Soft Skills</h3>
                  <div className="text-sm" style={{ color: '#404040' }}>
                    {data.softSkills.join(' • ')}
                  </div>
                </div>
              </div>

              {data.organizations.length > 0 && (
                <div className="space-y-6">
                  <h3 className="text-sm font-bold uppercase border-b-2 pb-1" style={{ borderColor: data.customization.primaryColor }}>Organizations</h3>
                  {data.organizations.map(org => (
                    <div key={org.id} className="space-y-2">
                      <div className="flex justify-between font-bold">
                        <span style={{ color: data.customization.primaryColor }}>{org.name}</span>
                        <span>{org.duration}</span>
                      </div>
                      <div className="italic text-sm">{org.role}</div>
                      <p className="text-sm whitespace-pre-line" style={{ color: '#404040' }}>{org.description}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        );
      case 'minimal':
        return (
          <div className="max-w-xl mx-auto space-y-10 py-12 px-12">
            <div className="space-y-2">
              <h1 className="text-3xl font-light tracking-tight" style={{ color: '#171717' }}>{data.personalInfo.fullName || 'Your Name'}</h1>
              <div className="flex flex-wrap gap-4 text-xs text-neutral-500">
                {data.personalInfo.email} • {data.personalInfo.phone} • {data.personalInfo.location}
                {data.personalInfo.website && <> • {data.personalInfo.website}</>}
              </div>
            </div>

            <div className="space-y-8">
              <section className="space-y-3">
                <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400">Summary</h3>
                <p className="text-sm leading-relaxed text-neutral-600">{data.personalInfo.summary}</p>
              </section>

              <section className="space-y-6">
                <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400">Experience</h3>
                <div className="space-y-6">
                  {data.experience.map(exp => (
                    <div key={exp.id} className="space-y-1">
                      <div className="flex justify-between items-baseline">
                        <h4 className="font-medium text-sm">{exp.position}</h4>
                        <span className="text-[10px] text-neutral-400">{exp.duration}</span>
                      </div>
                      <div className="text-xs text-neutral-500">{exp.company}</div>
                      <p className="text-xs leading-relaxed text-neutral-600 mt-1">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </section>

              {data.organizations.length > 0 && (
                <section className="space-y-6">
                  <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400">Organizations</h3>
                  <div className="space-y-6">
                    {data.organizations.map(org => (
                      <div key={org.id} className="space-y-1">
                        <div className="flex justify-between items-baseline">
                          <h4 className="font-medium text-sm">{org.role}</h4>
                          <span className="text-[10px] text-neutral-400">{org.duration}</span>
                        </div>
                        <div className="text-xs text-neutral-500">{org.name}</div>
                        <p className="text-xs leading-relaxed text-neutral-600 mt-1">{org.description}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              <div className="grid grid-cols-2 gap-12">
                <section className="space-y-3">
                  <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400">Education</h3>
                  {data.education.map(edu => (
                    <div key={edu.id} className="space-y-0.5">
                      <div className="text-sm font-medium">{edu.degree}</div>
                      <div className="text-xs text-neutral-500">{edu.school}</div>
                      <div className="text-[10px] text-neutral-400">{edu.year}</div>
                    </div>
                  ))}
                </section>
                <section className="space-y-3">
                  <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400">Technical Skills</h3>
                  <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-neutral-600">
                    {data.technicalSkills.map(s => <span key={s}>{s}</span>)}
                  </div>
                  <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400 pt-2">Soft Skills</h3>
                  <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-neutral-600">
                    {data.softSkills.map(s => <span key={s}>{s}</span>)}
                  </div>
                </section>
              </div>

              {data.languages.length > 0 && (
                <section className="space-y-3">
                  <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400">Languages</h3>
                  <div className="flex flex-wrap gap-x-4 text-xs text-neutral-600">
                    {data.languages.map(l => (
                      <span key={l.id}>{l.name} <span className="text-neutral-400">({l.level})</span></span>
                    ))}
                  </div>
                </section>
              )}
            </div>
          </div>
        );
      case 'creative':
        return (
          <div className="space-y-0 h-full flex flex-col">
            <div className="p-12 text-white space-y-4" style={{ backgroundColor: data.customization.primaryColor }}>
              <h1 className="text-6xl font-black tracking-tighter uppercase">{data.personalInfo.fullName || 'Your Name'}</h1>
              <div className="flex flex-wrap gap-6 text-sm font-medium opacity-90">
                {data.personalInfo.email && <div className="flex items-center gap-2"><Mail size={16} /> {data.personalInfo.email}</div>}
                {data.personalInfo.phone && <div className="flex items-center gap-2"><Phone size={16} /> {data.personalInfo.phone}</div>}
                {data.personalInfo.location && <div className="flex items-center gap-2"><MapPin size={16} /> {data.personalInfo.location}</div>}
                {data.personalInfo.website && <div className="flex items-center gap-2"><Globe size={16} /> {data.personalInfo.website}</div>}
              </div>
            </div>
            
            <div className="flex-1 grid grid-cols-12">
              <div className="col-span-4 bg-neutral-50 p-12 space-y-10">
                <div className="space-y-4">
                  <h3 className="text-xl font-black uppercase tracking-tight" style={{ color: data.customization.primaryColor }}>Technical Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {data.technicalSkills.map(s => (
                      <span key={s} className="px-3 py-1.5 bg-white shadow-sm rounded-lg text-xs font-bold border border-neutral-100">{s}</span>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-black uppercase tracking-tight" style={{ color: data.customization.primaryColor }}>Soft Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {data.softSkills.map(s => (
                      <span key={s} className="px-3 py-1.5 bg-white shadow-sm rounded-lg text-xs font-bold border border-neutral-100">{s}</span>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-black uppercase tracking-tight" style={{ color: data.customization.primaryColor }}>Education</h3>
                  {data.education.map(edu => (
                    <div key={edu.id} className="space-y-1">
                      <div className="font-bold text-sm">{edu.degree}</div>
                      <div className="text-xs" style={{ color: '#737373' }}>{edu.school}</div>
                      <div className="text-xs font-bold" style={{ color: data.customization.primaryColor }}>{edu.year}</div>
                    </div>
                  ))}
                </div>

                {data.languages.length > 0 && (
                  <div className="space-y-4">
                    <h3 className="text-xl font-black uppercase tracking-tight" style={{ color: data.customization.primaryColor }}>Languages</h3>
                    <div className="space-y-3">
                      {data.languages.map(lang => (
                        <div key={lang.id} className="space-y-1">
                          <div className="text-sm font-bold">{lang.name}</div>
                          <div className="h-1.5 w-full bg-neutral-200 rounded-full overflow-hidden">
                            <div className="h-full" style={{ backgroundColor: data.customization.primaryColor, width: lang.level.toLowerCase().includes('native') ? '100%' : lang.level.toLowerCase().includes('fluent') ? '90%' : '70%' }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="col-span-8 p-12 space-y-10">
                <div className="space-y-4">
                  <h3 className="text-xl font-black uppercase tracking-tight pb-2 border-b-4" style={{ borderColor: data.customization.primaryColor }}>About Me</h3>
                  <p className="text-lg leading-relaxed" style={{ color: '#404040' }}>{data.personalInfo.summary}</p>
                </div>

                <div className="space-y-8">
                  <h3 className="text-xl font-black uppercase tracking-tight pb-2 border-b-4" style={{ borderColor: data.customization.primaryColor }}>Experience</h3>
                  {data.experience.map(exp => (
                    <div key={exp.id} className="relative pl-6 border-l-2" style={{ borderColor: '#e5e5e5' }}>
                      <div className="absolute -left-[5px] top-2 w-2 h-2 rounded-full" style={{ backgroundColor: data.customization.primaryColor }} />
                      <div className="flex justify-between items-baseline mb-1">
                        <h4 className="font-black text-xl">{exp.position}</h4>
                        <span className="text-xs font-bold px-2 py-1 rounded" style={{ backgroundColor: `${data.customization.primaryColor}11`, color: data.customization.primaryColor }}>{exp.duration}</span>
                      </div>
                      <div className="text-sm font-bold mb-2 uppercase tracking-wide" style={{ color: data.customization.primaryColor }}>{exp.company}</div>
                      <p className="text-sm whitespace-pre-line" style={{ color: '#525252' }}>{exp.description}</p>
                    </div>
                  ))}
                </div>

                {data.organizations.length > 0 && (
                  <div className="space-y-8">
                    <h3 className="text-xl font-black uppercase tracking-tight pb-2 border-b-4" style={{ borderColor: data.customization.primaryColor }}>Organizations</h3>
                    {data.organizations.map(org => (
                      <div key={org.id} className="relative pl-6 border-l-2" style={{ borderColor: '#e5e5e5' }}>
                        <div className="absolute -left-[5px] top-2 w-2 h-2 rounded-full" style={{ backgroundColor: data.customization.primaryColor }} />
                        <div className="flex justify-between items-baseline mb-1">
                          <h4 className="font-black text-xl">{org.role}</h4>
                          <span className="text-xs font-bold px-2 py-1 rounded" style={{ backgroundColor: `${data.customization.primaryColor}11`, color: data.customization.primaryColor }}>{org.duration}</span>
                        </div>
                        <div className="text-sm font-bold mb-2 uppercase tracking-wide" style={{ color: data.customization.primaryColor }}>{org.name}</div>
                        <p className="text-sm whitespace-pre-line" style={{ color: '#525252' }}>{org.description}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      case 'compact':
        return (
          <div className="grid grid-cols-12 gap-0 h-full min-h-[1000px] bg-white">
            <div className="col-span-1 bg-neutral-900" />
            <div className="col-span-11 p-12 space-y-8">
              <div className="flex justify-between items-end border-b-2 pb-4" style={{ borderColor: data.customization.primaryColor }}>
                <div className="space-y-1">
                  <h1 className="text-3xl font-bold uppercase tracking-tighter" style={{ color: data.customization.primaryColor }}>{data.personalInfo.fullName || 'Your Name'}</h1>
                  <div className="flex gap-3 text-neutral-500 font-medium">
                    {data.personalInfo.email} • {data.personalInfo.phone} • {data.personalInfo.location}
                    {data.personalInfo.website && <> • {data.personalInfo.website}</>}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-8">
                <div className="col-span-2 space-y-6">
                  <section className="space-y-3">
                    <h3 className="font-bold uppercase tracking-widest border-b" style={{ color: data.customization.primaryColor, borderColor: '#e5e5e5' }}>Experience</h3>
                    <div className="space-y-4">
                      {data.experience.map(exp => (
                        <div key={exp.id} className="space-y-1">
                          <div className="flex justify-between font-bold text-sm">
                            <span>{exp.position}</span>
                            <span style={{ color: data.customization.primaryColor }}>{exp.duration}</span>
                          </div>
                          <div className="font-bold italic text-neutral-600">{exp.company}</div>
                          <p className="text-neutral-600 leading-snug whitespace-pre-line">{exp.description}</p>
                        </div>
                      ))}
                    </div>
                  </section>

                  {data.organizations.length > 0 && (
                    <section className="space-y-3">
                      <h3 className="font-bold uppercase tracking-widest border-b" style={{ color: data.customization.primaryColor, borderColor: '#e5e5e5' }}>Organizations</h3>
                      <div className="space-y-4">
                        {data.organizations.map(org => (
                          <div key={org.id} className="space-y-1">
                            <div className="flex justify-between font-bold text-sm">
                              <span>{org.role}</span>
                              <span style={{ color: data.customization.primaryColor }}>{org.duration}</span>
                            </div>
                            <div className="font-bold italic text-neutral-600">{org.name}</div>
                            <p className="text-neutral-600 leading-snug whitespace-pre-line">{org.description}</p>
                          </div>
                        ))}
                      </div>
                    </section>
                  )}
                </div>

                <div className="space-y-6">
                  <section className="space-y-2">
                    <h3 className="font-bold uppercase tracking-widest border-b" style={{ color: data.customization.primaryColor, borderColor: '#e5e5e5' }}>Summary</h3>
                    <p className="text-neutral-600 leading-relaxed">{data.personalInfo.summary}</p>
                  </section>

                  <section className="space-y-2">
                    <h3 className="font-bold uppercase tracking-widest border-b" style={{ color: data.customization.primaryColor, borderColor: '#e5e5e5' }}>Technical Skills</h3>
                    <div className="grid grid-cols-1 gap-1 text-sm">
                      {data.technicalSkills.map(s => (
                        <div key={s} className="flex items-center gap-2">
                          <div className="w-1 h-1 rounded-full" style={{ backgroundColor: data.customization.primaryColor }} />
                          {s}
                        </div>
                      ))}
                    </div>
                  </section>

                  <section className="space-y-2">
                    <h3 className="font-bold uppercase tracking-widest border-b" style={{ color: data.customization.primaryColor, borderColor: '#e5e5e5' }}>Soft Skills</h3>
                    <div className="grid grid-cols-1 gap-1 text-sm">
                      {data.softSkills.map(s => (
                        <div key={s} className="flex items-center gap-2">
                          <div className="w-1 h-1 rounded-full" style={{ backgroundColor: data.customization.primaryColor }} />
                          {s}
                        </div>
                      ))}
                    </div>
                  </section>

                  <section className="space-y-2">
                    <h3 className="font-bold uppercase tracking-widest border-b" style={{ color: data.customization.primaryColor, borderColor: '#e5e5e5' }}>Education</h3>
                    {data.education.map(edu => (
                      <div key={edu.id} className="space-y-0.5 text-sm">
                        <div className="font-bold">{edu.degree}</div>
                        <div className="text-neutral-500">{edu.school}</div>
                        <div className="italic">{edu.year}</div>
                      </div>
                    ))}
                  </section>

                  {data.languages.length > 0 && (
                    <section className="space-y-2">
                      <h3 className="font-bold uppercase tracking-widest border-b" style={{ color: data.customization.primaryColor, borderColor: '#e5e5e5' }}>Languages</h3>
                      {data.languages.map(lang => (
                        <div key={lang.id} className="flex justify-between text-sm">
                          <span className="font-bold">{lang.name}</span>
                          <span className="text-neutral-500">{lang.level}</span>
                        </div>
                      ))}
                    </section>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      case 'elegant':
        return (
          <div className="max-w-2xl mx-auto space-y-16 py-12 px-12 bg-[#fdfcf8] min-h-[1000px]">
            <div className="text-center space-y-8">
              <div className="space-y-2">
                <div className="text-[10px] uppercase tracking-[0.4em] text-neutral-400 font-bold">Curriculum Vitae</div>
                <h1 className="text-6xl font-serif italic tracking-tight" style={{ color: data.customization.primaryColor }}>{data.personalInfo.fullName || 'Your Name'}</h1>
              </div>
              <div className="flex justify-center gap-12 text-[10px] uppercase tracking-[0.2em] font-bold text-neutral-500">
                <span>{data.personalInfo.location}</span>
                <span>{data.personalInfo.email}</span>
                <span>{data.personalInfo.phone}</span>
                {data.personalInfo.website && <span>{data.personalInfo.website}</span>}
              </div>
              <div className="h-px w-32 bg-neutral-200 mx-auto" />
            </div>

            <div className="space-y-6 text-center max-w-lg mx-auto">
              <p className="text-2xl font-serif leading-relaxed italic text-neutral-700">{data.personalInfo.summary}</p>
            </div>

            <div className="space-y-20">
              <section className="space-y-12">
                <div className="flex items-center gap-8">
                  <div className="h-px flex-1 bg-neutral-100" />
                  <h3 className="text-[10px] font-bold uppercase tracking-[0.5em] text-neutral-400">Experience</h3>
                  <div className="h-px flex-1 bg-neutral-100" />
                </div>
                <div className="space-y-16">
                  {data.experience.map(exp => (
                    <div key={exp.id} className="space-y-4 text-center">
                      <div className="space-y-2">
                        <div className="text-[10px] uppercase tracking-widest text-neutral-400 font-bold">{exp.duration}</div>
                        <h4 className="text-3xl font-serif italic">{exp.position}</h4>
                        <div className="text-sm font-bold uppercase tracking-widest" style={{ color: data.customization.primaryColor }}>{exp.company}</div>
                      </div>
                      <p className="text-sm leading-relaxed max-w-lg mx-auto text-neutral-600 italic">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </section>

              {data.organizations.length > 0 && (
                <section className="space-y-12">
                  <div className="flex items-center gap-8">
                    <div className="h-px flex-1 bg-neutral-100" />
                    <h3 className="text-[10px] font-bold uppercase tracking-[0.5em] text-neutral-400">Organizations</h3>
                    <div className="h-px flex-1 bg-neutral-100" />
                  </div>
                  <div className="space-y-16">
                    {data.organizations.map(org => (
                      <div key={org.id} className="space-y-4 text-center">
                        <div className="space-y-2">
                          <div className="text-[10px] uppercase tracking-widest text-neutral-400 font-bold">{org.duration}</div>
                          <h4 className="text-3xl font-serif italic">{org.role}</h4>
                          <div className="text-sm font-bold uppercase tracking-widest" style={{ color: data.customization.primaryColor }}>{org.name}</div>
                        </div>
                        <p className="text-sm leading-relaxed max-w-lg mx-auto text-neutral-600 italic">{org.description}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              <div className="grid grid-cols-2 gap-20">
                <section className="space-y-8">
                  <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-neutral-400 border-b pb-4">Education</h3>
                  <div className="space-y-8">
                    {data.education.map(edu => (
                      <div key={edu.id} className="space-y-1">
                        <div className="font-serif text-xl italic">{edu.degree}</div>
                        <div className="text-xs uppercase tracking-widest text-neutral-500 font-bold">{edu.school}</div>
                        <div className="text-[10px] italic text-neutral-400">{edu.year}</div>
                      </div>
                    ))}
                  </div>
                </section>
                <section className="space-y-8">
                  <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-neutral-400 border-b pb-4">Technical Expertise</h3>
                  <div className="flex flex-wrap gap-x-8 gap-y-4 text-sm font-serif italic text-neutral-600">
                    {data.technicalSkills.map(s => <span key={s}>{s}</span>)}
                  </div>
                  <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-neutral-400 border-b pb-4 pt-8">Soft Skills</h3>
                  <div className="flex flex-wrap gap-x-8 gap-y-4 text-sm font-serif italic text-neutral-600">
                    {data.softSkills.map(s => <span key={s}>{s}</span>)}
                  </div>
                  {data.languages.length > 0 && (
                    <div className="pt-8 space-y-4">
                      <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-neutral-400 border-b pb-4">Languages</h3>
                      <div className="space-y-2">
                        {data.languages.map(l => (
                          <div key={l.id} className="flex justify-between text-sm font-serif italic text-neutral-600">
                            <span>{l.name}</span>
                            <span className="text-neutral-400">{l.level}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </section>
              </div>
            </div>
          </div>
        );
      case 'classic':
        return (
          <div className="space-y-12 py-12 px-12 bg-white min-h-[1000px]">
            <div className="flex justify-between items-start border-b-4 pb-8" style={{ borderColor: '#171717' }}>
              <div className="space-y-4">
                <h1 className="text-6xl font-serif font-bold uppercase tracking-tighter leading-none" style={{ color: '#171717' }}>
                  {data.personalInfo.fullName?.split(' ')[0] || 'Your'}<br/>
                  <span style={{ color: data.customization.primaryColor }}>{data.personalInfo.fullName?.split(' ')[1] || 'Name'}</span>
                </h1>
                <p className="text-xl font-serif italic text-neutral-500 max-w-md">{data.personalInfo.summary}</p>
              </div>
              <div className="text-right space-y-1 text-sm font-bold uppercase tracking-widest text-neutral-400">
                <div>{data.personalInfo.location}</div>
                <div style={{ color: data.customization.primaryColor }}>{data.personalInfo.email}</div>
                <div>{data.personalInfo.phone}</div>
                {data.personalInfo.website && <div style={{ color: data.customization.primaryColor }}>{data.personalInfo.website}</div>}
              </div>
            </div>

            <div className="space-y-16">
              <section className="relative">
                <div className="absolute -left-12 top-0 text-6xl font-serif font-bold opacity-5 select-none">01</div>
                <h3 className="text-xs font-bold uppercase tracking-[0.4em] mb-8 flex items-center gap-4">
                  <span className="w-8 h-px bg-neutral-200" />
                  Experience
                </h3>
                <div className="space-y-12">
                  {data.experience.map(exp => (
                    <div key={exp.id} className="grid grid-cols-12 gap-8">
                      <div className="col-span-3 text-sm font-bold text-neutral-300 uppercase tracking-widest pt-1">{exp.duration}</div>
                      <div className="col-span-9 space-y-2">
                        <h4 className="text-2xl font-serif font-bold">{exp.position}</h4>
                        <div className="text-sm font-bold uppercase tracking-widest" style={{ color: data.customization.primaryColor }}>{exp.company}</div>
                        <p className="text-sm leading-relaxed text-neutral-600 whitespace-pre-line">{exp.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {data.organizations.length > 0 && (
                <section className="relative">
                  <div className="absolute -left-12 top-0 text-6xl font-serif font-bold opacity-5 select-none">02</div>
                  <h3 className="text-xs font-bold uppercase tracking-[0.4em] mb-8 flex items-center gap-4">
                    <span className="w-8 h-px bg-neutral-200" />
                    Organizations
                  </h3>
                  <div className="space-y-12">
                    {data.organizations.map(org => (
                      <div key={org.id} className="grid grid-cols-12 gap-8">
                        <div className="col-span-3 text-sm font-bold text-neutral-300 uppercase tracking-widest pt-1">{org.duration}</div>
                        <div className="col-span-9 space-y-2">
                          <h4 className="text-2xl font-serif font-bold">{org.role}</h4>
                          <div className="text-sm font-bold uppercase tracking-widest" style={{ color: data.customization.primaryColor }}>{org.name}</div>
                          <p className="text-sm leading-relaxed text-neutral-600 whitespace-pre-line">{org.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              <div className="grid grid-cols-2 gap-16">
                <section className="relative">
                  <div className="absolute -left-8 top-0 text-4xl font-serif font-bold opacity-5 select-none">03</div>
                  <h3 className="text-xs font-bold uppercase tracking-[0.4em] mb-6 flex items-center gap-4">
                    <span className="w-4 h-px bg-neutral-200" />
                    Education
                  </h3>
                  <div className="space-y-6">
                    {data.education.map(edu => (
                      <div key={edu.id} className="space-y-1">
                        <div className="font-serif text-lg font-bold">{edu.degree}</div>
                        <div className="text-sm font-bold text-neutral-400 uppercase tracking-widest">{edu.school}</div>
                        <div className="text-xs italic text-neutral-300">{edu.year}</div>
                      </div>
                    ))}
                  </div>
                </section>
                <section className="relative">
                  <div className="absolute -left-8 top-0 text-4xl font-serif font-bold opacity-5 select-none">04</div>
                  <h3 className="text-xs font-bold uppercase tracking-[0.4em] mb-6 flex items-center gap-4">
                    <span className="w-4 h-px bg-neutral-200" />
                    Technical Expertise
                  </h3>
                  <div className="space-y-6">
                    <div className="flex flex-wrap gap-2">
                      {data.technicalSkills.map(s => (
                        <span key={s} className="px-3 py-1 border border-neutral-100 text-xs font-bold uppercase tracking-widest text-neutral-500">{s}</span>
                      ))}
                    </div>
                  </div>
                  <h3 className="text-xs font-bold uppercase tracking-[0.4em] mb-6 mt-8 flex items-center gap-4">
                    <span className="w-4 h-px bg-neutral-200" />
                    Soft Skills
                  </h3>
                  <div className="space-y-6">
                    <div className="flex flex-wrap gap-2">
                      {data.softSkills.map(s => (
                        <span key={s} className="px-3 py-1 border border-neutral-100 text-xs font-bold uppercase tracking-widest text-neutral-500">{s}</span>
                      ))}
                    </div>
                    {data.languages.length > 0 && (
                      <div className="pt-4 space-y-3">
                        <div className="text-[10px] font-bold uppercase tracking-widest text-neutral-300">Languages</div>
                        <div className="space-y-1">
                          {data.languages.map(l => (
                            <div key={l.id} className="flex justify-between text-xs font-bold uppercase tracking-widest">
                              <span className="text-neutral-500">{l.name}</span>
                              <span style={{ color: data.customization.primaryColor }}>{l.level}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </section>
              </div>
            </div>
          </div>
        );
      case 'artistic':
        return (
          <div className="bg-white text-neutral-900 min-h-[1000px] font-sans selection:bg-neutral-900 selection:text-white">
            <div className="p-12 md:p-16 space-y-20">
              <header className="space-y-10">
                <div className="flex justify-between items-start border-b border-neutral-200 pb-6">
                  <div className="text-[10px] font-black uppercase tracking-[0.5em] text-neutral-400">
                    Portfolio / {new Date().getFullYear()}
                  </div>
                  <div className="text-right space-y-1 text-[10px] font-black uppercase tracking-widest">
                    <div>{data.personalInfo.location}</div>
                    <div style={{ color: data.customization.primaryColor }}>{data.personalInfo.email}</div>
                  </div>
                </div>
                
                <div className="relative">
                  <h1 className="text-7xl font-black leading-[0.9] tracking-tighter uppercase">
                    {data.personalInfo.fullName?.split(' ')[0] || 'CREATIVE'}<br/>
                    <span className="opacity-20">{data.personalInfo.fullName?.split(' ').slice(1).join(' ') || 'DIRECTOR'}</span>
                  </h1>
                  <div 
                    className="absolute -bottom-2 right-0 w-24 h-24 rounded-full flex items-center justify-center text-white text-[10px] font-bold rotate-12 shadow-xl"
                    style={{ backgroundColor: data.customization.primaryColor }}
                  >
                    AVAILABLE
                  </div>
                </div>

                <div className="grid grid-cols-12 gap-8 pt-8">
                  <div className="col-span-12 md:col-span-7">
                    <p className="text-xl font-medium leading-tight tracking-tight text-neutral-800">
                      {data.personalInfo.summary}
                    </p>
                  </div>
                  <div className="col-span-12 md:col-span-5 flex flex-col justify-end items-end gap-2">
                    {data.personalInfo.website && (
                      <div className="text-xs font-bold border-b-2 border-neutral-900 pb-0.5">
                        {data.personalInfo.website.replace(/^https?:\/\//, '')}
                      </div>
                    )}
                    <div className="text-xs font-bold">{data.personalInfo.phone}</div>
                  </div>
                </div>
              </header>

              <div className="grid grid-cols-12 gap-12">
                <div className="col-span-12 md:col-span-8 space-y-16">
                  <section className="space-y-10">
                    <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-neutral-400 flex items-center gap-4">
                      Experience <div className="h-px flex-1 bg-neutral-100" />
                    </h2>
                    <div className="space-y-12">
                      {data.experience.map((exp, i) => (
                        <div key={exp.id} className="group relative">
                          <div className="absolute -left-6 top-0 text-[10px] font-black text-neutral-200 group-hover:text-neutral-900 transition-colors">
                            0{i + 1}
                          </div>
                          <div className="space-y-3">
                            <div className="flex justify-between items-baseline">
                              <h3 className="text-3xl font-black tracking-tighter uppercase leading-none">{exp.position}</h3>
                              <span className="text-[10px] font-black text-neutral-400">{exp.duration}</span>
                            </div>
                            <div className="text-xs font-black uppercase tracking-widest" style={{ color: data.customization.primaryColor }}>{exp.company}</div>
                            <p className="text-base leading-relaxed text-neutral-500 max-w-xl">{exp.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>

                  {data.organizations.length > 0 && (
                    <section className="space-y-10">
                      <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-neutral-400 flex items-center gap-4">
                        Organizations <div className="h-px flex-1 bg-neutral-100" />
                      </h2>
                      <div className="space-y-12">
                        {data.organizations.map((org, i) => (
                          <div key={org.id} className="group relative">
                            <div className="absolute -left-6 top-0 text-[10px] font-black text-neutral-200 group-hover:text-neutral-900 transition-colors">
                              0{i + 1}
                            </div>
                            <div className="space-y-3">
                              <div className="flex justify-between items-baseline">
                                <h3 className="text-3xl font-black tracking-tighter uppercase leading-none">{org.role}</h3>
                                <span className="text-[10px] font-black text-neutral-400">{org.duration}</span>
                              </div>
                              <div className="text-xs font-black uppercase tracking-widest" style={{ color: data.customization.primaryColor }}>{org.name}</div>
                              <p className="text-base leading-relaxed text-neutral-500 max-w-xl">{org.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </section>
                  )}
                </div>

                <div className="col-span-12 md:col-span-4 space-y-16">
                  <section className="space-y-6">
                    <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-neutral-400">Expertise</h2>
                    <div className="flex flex-wrap gap-2">
                      {data.technicalSkills.map(s => (
                        <span key={s} className="px-3 py-1.5 bg-neutral-100 text-[9px] font-black uppercase tracking-widest hover:bg-neutral-900 hover:text-white transition-colors cursor-default">
                          {s}
                        </span>
                      ))}
                    </div>
                  </section>

                  <section className="space-y-6">
                    <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-neutral-400">Education</h2>
                    <div className="space-y-6">
                      {data.education.map(edu => (
                        <div key={edu.id} className="space-y-1">
                          <div className="text-xs font-black uppercase tracking-tight leading-none">{edu.degree}</div>
                          <div className="text-[9px] font-black uppercase tracking-widest text-neutral-400">{edu.school}</div>
                          <div className="text-[9px] font-black" style={{ color: data.customization.primaryColor }}>{edu.year}</div>
                        </div>
                      ))}
                    </div>
                  </section>

                  {data.languages.length > 0 && (
                    <section className="space-y-6">
                      <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-neutral-400">Languages</h2>
                      <div className="space-y-3">
                        {data.languages.map(l => (
                          <div key={l.id} className="flex justify-between items-center border-b border-neutral-100 pb-1.5">
                            <span className="text-[9px] font-black uppercase tracking-widest">{l.name}</span>
                            <span className="text-[9px] font-black uppercase tracking-widest text-neutral-400">{l.level}</span>
                          </div>
                        ))}
                      </div>
                    </section>
                  )}
                </div>
              </div>

              <footer className="pt-16 border-t border-neutral-200 flex justify-between items-center text-[7px] font-black uppercase tracking-[0.5em] text-neutral-400">
                <span>Generated_By_Resumake_v2.0</span>
                <span>Checksum: {Math.random().toString(36).substring(7).toUpperCase()}</span>
              </footer>
            </div>
          </div>
        );
      case 'technical':
        return (
          <div className="p-12 space-y-10 bg-[#0a0a0a] text-[#00ff41] min-h-[1000px] font-mono text-sm leading-relaxed border-8 border-[#1a1a1a]">
            <header className="space-y-6 border-b border-[#00ff41]/30 pb-8">
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <div className="text-xs opacity-50 tracking-[0.3em]">USER_PROFILE_v1.0</div>
                  <h1 className="text-5xl font-bold tracking-tighter uppercase">{data.personalInfo.fullName || 'ANONYMOUS'}</h1>
                  <div className="inline-block bg-[#00ff41] text-black px-2 py-0.5 text-xs font-bold">
                    {data.technicalSkills[0] || 'DEVELOPER'} // {data.technicalSkills[1] || 'ENGINEER'}
                  </div>
                </div>
                <div className="text-right text-[10px] space-y-1 opacity-70">
                  <div>[LOC] {data.personalInfo.location}</div>
                  <div>[NET] {data.personalInfo.email}</div>
                  <div>[TEL] {data.personalInfo.phone}</div>
                  {data.personalInfo.website && <div>[URL] {data.personalInfo.website}</div>}
                </div>
              </div>
            </header>

            <div className="grid grid-cols-12 gap-10">
              <div className="col-span-8 space-y-12">
                <section className="space-y-4">
                  <h3 className="text-base font-bold flex items-center gap-2">
                    <span className="w-2 h-2 bg-[#00ff41] animate-pulse" />
                    ./summary.sh
                  </h3>
                  <p className="opacity-80 border-l-2 border-[#00ff41]/20 pl-4 italic">
                    {data.personalInfo.summary}
                  </p>
                </section>

                <section className="space-y-6">
                  <h3 className="text-base font-bold flex items-center gap-2">
                    <span className="w-2 h-2 bg-[#00ff41]" />
                    ./experience_log
                  </h3>
                  <div className="space-y-8">
                    {data.experience.map(exp => (
                      <div key={exp.id} className="space-y-2 group">
                        <div className="flex justify-between items-baseline">
                          <span className="text-lg font-bold text-white group-hover:text-[#00ff41] transition-colors">{exp.position}</span>
                          <span className="text-[10px] opacity-50">[{exp.duration}]</span>
                        </div>
                        <div className="text-xs font-bold uppercase tracking-widest opacity-70">@ {exp.company}</div>
                        <p className="opacity-60 text-xs whitespace-pre-line leading-relaxed">{exp.description}</p>
                      </div>
                    ))}
                  </div>
                </section>

                {data.organizations.length > 0 && (
                  <section className="space-y-6">
                    <h3 className="text-base font-bold flex items-center gap-2">
                      <span className="w-2 h-2 bg-[#00ff41]" />
                      ./volunteering
                    </h3>
                    <div className="space-y-8">
                      {data.organizations.map(org => (
                        <div key={org.id} className="space-y-2 group">
                          <div className="flex justify-between items-baseline">
                            <span className="text-lg font-bold text-white group-hover:text-[#00ff41] transition-colors">{org.role}</span>
                            <span className="text-[10px] opacity-50">[{org.duration}]</span>
                          </div>
                          <div className="text-xs font-bold uppercase tracking-widest opacity-70">@ {org.name}</div>
                          <p className="opacity-60 text-xs whitespace-pre-line leading-relaxed">{org.description}</p>
                        </div>
                      ))}
                    </div>
                  </section>
                )}
              </div>

              <div className="col-span-4 space-y-12">
                <section className="space-y-4">
                  <h3 className="text-base font-bold border-b border-[#00ff41]/30 pb-2">./tech_stack</h3>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <div className="text-[10px] opacity-50 uppercase tracking-widest">Core_Skills</div>
                      <div className="flex flex-wrap gap-2">
                        {data.technicalSkills.map(s => (
                          <span key={s} className="px-2 py-0.5 border border-[#00ff41]/30 text-[10px] hover:bg-[#00ff41] hover:text-black transition-all cursor-default">{s}</span>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="text-[10px] opacity-50 uppercase tracking-widest">Soft_Skills</div>
                      <div className="flex flex-wrap gap-2">
                        {data.softSkills.map(s => (
                          <span key={s} className="px-2 py-0.5 border border-[#00ff41]/30 text-[10px] opacity-70">{s}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </section>

                <section className="space-y-4">
                  <h3 className="text-base font-bold border-b border-[#00ff41]/30 pb-2">./education</h3>
                  <div className="space-y-4">
                    {data.education.map(edu => (
                      <div key={edu.id} className="space-y-1">
                        <div className="font-bold text-white text-xs">{edu.degree}</div>
                        <div className="text-[10px] opacity-50">{edu.school}</div>
                        <div className="text-[10px] font-bold">{edu.year}</div>
                      </div>
                    ))}
                  </div>
                </section>

                {data.languages.length > 0 && (
                  <section className="space-y-4">
                    <h3 className="text-base font-bold border-b border-[#00ff41]/30 pb-2">./languages</h3>
                    <div className="space-y-2">
                      {data.languages.map(l => (
                        <div key={l.id} className="flex justify-between items-center text-[10px]">
                          <span className="font-bold">{l.name}</span>
                          <span className="opacity-50">[{l.level}]</span>
                        </div>
                      ))}
                    </div>
                  </section>
                )}
              </div>
            </div>

            <footer className="pt-10 border-t border-[#00ff41]/20 flex justify-between items-center text-[8px] opacity-30 uppercase tracking-[0.5em]">
              <span>System_Ready_v2.0</span>
              <span>{new Date().toISOString()}</span>
            </footer>
          </div>
        );
      case 'sidebar-left':
        return (
          <div className="flex min-h-[297mm]">
            {/* Left Sidebar */}
            <div className="w-1/3 p-10 text-white space-y-8" style={{ backgroundColor: data.customization.primaryColor }}>
              <div className="space-y-4">
                <div className="w-24 h-24 rounded-full bg-white/10 flex items-center justify-center border-2 border-white/20">
                  <span className="text-3xl font-black">{data.personalInfo.fullName?.charAt(0) || 'Y'}</span>
                </div>
                <h1 className="text-2xl font-black leading-tight">{data.personalInfo.fullName || 'Your Name'}</h1>
              </div>

              <div className="space-y-6 pt-6">
                <section className="space-y-3">
                  <h3 className="text-[10px] font-black uppercase tracking-[0.2em] opacity-50">Contact</h3>
                  <div className="space-y-2 text-xs opacity-90">
                    {data.personalInfo.email && <div className="flex items-center gap-2"><Mail size={12} /> {data.personalInfo.email}</div>}
                    {data.personalInfo.phone && <div className="flex items-center gap-2"><Phone size={12} /> {data.personalInfo.phone}</div>}
                    {data.personalInfo.location && <div className="flex items-center gap-2"><MapPin size={12} /> {data.personalInfo.location}</div>}
                    {data.personalInfo.website && <div className="flex items-center gap-2"><Globe size={12} /> {data.personalInfo.website}</div>}
                  </div>
                </section>

                <section className="space-y-3">
                  <h3 className="text-[10px] font-black uppercase tracking-[0.2em] opacity-50">Expertise</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {data.technicalSkills.map(s => (
                      <span key={s} className="px-2 py-1 rounded bg-white/10 text-[10px] font-medium border border-white/10">{s}</span>
                    ))}
                  </div>
                </section>

                <section className="space-y-3">
                  <h3 className="text-[10px] font-black uppercase tracking-[0.2em] opacity-50">Soft Skills</h3>
                  <div className="space-y-1.5">
                    {data.softSkills.map(s => (
                      <div key={s} className="flex items-center gap-2 text-xs opacity-90">
                        <div className="w-1 h-1 rounded-full bg-white/40" />
                        {s}
                      </div>
                    ))}
                  </div>
                </section>

                <section className="space-y-3">
                  <h3 className="text-[10px] font-black uppercase tracking-[0.2em] opacity-50">Languages</h3>
                  <div className="space-y-2">
                    {data.languages.map(lang => (
                      <div key={lang.id} className="text-xs opacity-90">
                        <div className="font-bold">{lang.name}</div>
                        <div className="text-[10px] opacity-60">{lang.level}</div>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </div>

            {/* Main Content */}
            <div className="w-2/3 p-12 space-y-10 bg-white">
              <section className="space-y-4">
                <h2 className="text-xs font-black uppercase tracking-[0.3em] text-neutral-400 flex items-center gap-3">
                  <Users size={14} style={{ color: data.customization.primaryColor }} />
                  Profile Summary
                </h2>
                <p className="text-sm leading-relaxed text-neutral-600 italic">
                  {data.personalInfo.summary}
                </p>
              </section>

              <section className="space-y-6">
                <h2 className="text-xs font-black uppercase tracking-[0.3em] text-neutral-400 flex items-center gap-3">
                  <Briefcase size={14} style={{ color: data.customization.primaryColor }} />
                  Professional Experience
                </h2>
                <div className="space-y-8">
                  {data.experience.map(exp => (
                    <div key={exp.id} className="relative pl-6 border-l-2 border-neutral-100">
                      <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-white border-2" style={{ borderColor: data.customization.primaryColor }} />
                      <div className="space-y-1">
                        <div className="flex justify-between items-baseline">
                          <h4 className="font-bold text-lg text-neutral-900">{exp.position}</h4>
                          <span className="text-[10px] font-black text-neutral-400 uppercase">{exp.duration}</span>
                        </div>
                        <div className="text-sm font-bold" style={{ color: data.customization.primaryColor }}>{exp.company}</div>
                        <p className="text-sm text-neutral-600 mt-2 leading-relaxed">{exp.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section className="space-y-6">
                <h2 className="text-xs font-black uppercase tracking-[0.3em] text-neutral-400 flex items-center gap-3">
                  <GraduationCap size={14} style={{ color: data.customization.primaryColor }} />
                  Education
                </h2>
                <div className="grid grid-cols-2 gap-6">
                  {data.education.map(edu => (
                    <div key={edu.id} className="space-y-1">
                      <div className="font-bold text-sm text-neutral-900">{edu.degree}</div>
                      <div className="text-xs text-neutral-500">{edu.school}</div>
                      <div className="text-[10px] font-bold text-neutral-400">{edu.year}</div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        );
      case 'bold-header':
        return (
          <div className="flex flex-col min-h-[297mm] bg-white">
            {/* Bold Header */}
            <div className="p-16 text-white relative overflow-hidden" style={{ backgroundColor: data.customization.primaryColor }}>
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full -ml-32 -mb-32 blur-3xl" />
              
              <div className="relative z-10 flex flex-col md:flex-row justify-between items-end gap-8">
                <div className="space-y-4">
                  <h1 className="text-6xl font-black tracking-tighter leading-none">{data.personalInfo.fullName || 'Your Name'}</h1>
                  <div className="flex flex-wrap gap-4 text-sm font-medium opacity-80">
                    {data.personalInfo.email && <div className="flex items-center gap-2"><Mail size={14} /> {data.personalInfo.email}</div>}
                    {data.personalInfo.phone && <div className="flex items-center gap-2"><Phone size={14} /> {data.personalInfo.phone}</div>}
                    {data.personalInfo.location && <div className="flex items-center gap-2"><MapPin size={14} /> {data.personalInfo.location}</div>}
                  </div>
                </div>
                <div className="text-right hidden md:block">
                  <div className="text-4xl font-black opacity-20 uppercase tracking-[0.2em]">RESUME</div>
                </div>
              </div>
            </div>

            <div className="p-16 grid grid-cols-12 gap-12">
              <div className="col-span-8 space-y-12">
                <section className="space-y-4">
                  <h2 className="text-2xl font-black text-neutral-900 flex items-center gap-3">
                    <span className="w-8 h-1" style={{ backgroundColor: data.customization.primaryColor }} />
                    About Me
                  </h2>
                  <p className="text-lg text-neutral-600 leading-relaxed font-medium">
                    {data.personalInfo.summary}
                  </p>
                </section>

                <section className="space-y-8">
                  <h2 className="text-2xl font-black text-neutral-900 flex items-center gap-3">
                    <span className="w-8 h-1" style={{ backgroundColor: data.customization.primaryColor }} />
                    Experience
                  </h2>
                  <div className="space-y-10">
                    {data.experience.map(exp => (
                      <div key={exp.id} className="space-y-3">
                        <div className="flex justify-between items-center">
                          <h4 className="text-xl font-bold text-neutral-900">{exp.position}</h4>
                          <span className="px-3 py-1 rounded-full bg-neutral-100 text-[10px] font-black text-neutral-500 uppercase tracking-wider">{exp.duration}</span>
                        </div>
                        <div className="text-lg font-bold" style={{ color: data.customization.primaryColor }}>{exp.company}</div>
                        <p className="text-neutral-600 leading-relaxed">{exp.description}</p>
                      </div>
                    ))}
                  </div>
                </section>
              </div>

              <div className="col-span-4 space-y-12">
                <section className="space-y-6">
                  <h3 className="text-sm font-black uppercase tracking-widest text-neutral-400">Skills</h3>
                  <div className="space-y-8">
                    <div className="space-y-3">
                      <p className="text-[10px] font-black uppercase tracking-wider text-neutral-500">Technical</p>
                      <div className="flex flex-wrap gap-2">
                        {data.technicalSkills.map(s => (
                          <span key={s} className="px-3 py-1.5 rounded-xl bg-neutral-50 text-xs font-bold text-neutral-700 border border-neutral-100">{s}</span>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-3">
                      <p className="text-[10px] font-black uppercase tracking-wider text-neutral-500">Soft Skills</p>
                      <div className="flex flex-wrap gap-2">
                        {data.softSkills.map(s => (
                          <span key={s} className="px-3 py-1.5 rounded-xl bg-neutral-50 text-xs font-bold text-neutral-700 border border-neutral-100">{s}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </section>

                <section className="space-y-6">
                  <h3 className="text-sm font-black uppercase tracking-widest text-neutral-400">Education</h3>
                  <div className="space-y-6">
                    {data.education.map(edu => (
                      <div key={edu.id} className="space-y-1">
                        <div className="font-bold text-neutral-900">{edu.degree}</div>
                        <div className="text-sm text-neutral-500">{edu.school}</div>
                        <div className="text-xs font-bold" style={{ color: data.customization.primaryColor }}>{edu.year}</div>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </div>
          </div>
        );
      case 'grid-focus':
        return (
          <div className="p-12 space-y-12 bg-white min-h-[297mm]">
            <header className="flex justify-between items-start border-b-4 border-neutral-900 pb-8">
              <div className="space-y-2">
                <h1 className="text-5xl font-black tracking-tighter text-neutral-900 uppercase">{data.personalInfo.fullName || 'Your Name'}</h1>
                <div className="flex gap-6 text-sm font-bold text-neutral-500">
                  {data.personalInfo.email && <div className="flex items-center gap-2"><Mail size={14} /> {data.personalInfo.email}</div>}
                  {data.personalInfo.phone && <div className="flex items-center gap-2"><Phone size={14} /> {data.personalInfo.phone}</div>}
                  {data.personalInfo.location && <div className="flex items-center gap-2"><MapPin size={14} /> {data.personalInfo.location}</div>}
                </div>
              </div>
              <div className="w-16 h-16 flex items-center justify-center rounded-2xl text-white" style={{ backgroundColor: data.customization.primaryColor }}>
                <Target size={32} />
              </div>
            </header>

            <div className="grid grid-cols-12 gap-12">
              <div className="col-span-12">
                <p className="text-xl font-medium text-neutral-600 leading-relaxed border-l-4 pl-6" style={{ borderColor: data.customization.primaryColor }}>
                  {data.personalInfo.summary}
                </p>
              </div>

              <div className="col-span-8 space-y-12">
                <section className="space-y-8">
                  <h2 className="text-xs font-black uppercase tracking-[0.4em] text-neutral-400">Experience</h2>
                  <div className="space-y-12">
                    {data.experience.map(exp => (
                      <div key={exp.id} className="grid grid-cols-4 gap-4">
                        <div className="col-span-1">
                          <span className="text-sm font-black text-neutral-900">{exp.duration}</span>
                        </div>
                        <div className="col-span-3 space-y-2">
                          <h4 className="text-xl font-bold text-neutral-900">{exp.position}</h4>
                          <div className="text-sm font-black uppercase tracking-wider" style={{ color: data.customization.primaryColor }}>{exp.company}</div>
                          <p className="text-sm text-neutral-600 leading-relaxed">{exp.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </div>

              <div className="col-span-4 space-y-12">
                <section className="space-y-6">
                  <h2 className="text-xs font-black uppercase tracking-[0.4em] text-neutral-400">Skills Grid</h2>
                  <div className="grid grid-cols-2 gap-2">
                    {data.technicalSkills.map(s => (
                      <div key={s} className="p-3 bg-neutral-50 border border-neutral-100 text-[10px] font-black text-center uppercase tracking-wider text-neutral-700">
                        {s}
                      </div>
                    ))}
                  </div>
                </section>

                <section className="space-y-6">
                  <h2 className="text-xs font-black uppercase tracking-[0.4em] text-neutral-400">Education</h2>
                  <div className="space-y-6">
                    {data.education.map(edu => (
                      <div key={edu.id} className="space-y-1">
                        <div className="font-bold text-neutral-900">{edu.degree}</div>
                        <div className="text-xs text-neutral-500">{edu.school}</div>
                        <div className="text-[10px] font-black text-neutral-400">{edu.year}</div>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </div>
          </div>
        );
      case 'academic':
        return (
          <div className="p-16 space-y-10 bg-white min-h-[297mm] text-neutral-900">
            <header className="text-center space-y-4 border-b pb-10">
              <h1 className="text-4xl font-serif font-bold tracking-tight">{data.personalInfo.fullName || 'Your Name'}</h1>
              <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-serif italic text-neutral-600">
                {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
                {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
                {data.personalInfo.location && <span>{data.personalInfo.location}</span>}
                {data.personalInfo.website && <span>{data.personalInfo.website}</span>}
              </div>
            </header>

            <section className="space-y-4">
              <h2 className="text-lg font-serif font-bold uppercase tracking-widest border-b-2 pb-1" style={{ borderColor: data.customization.primaryColor }}>Research Interests</h2>
              <p className="text-sm leading-relaxed font-serif">
                {data.personalInfo.summary}
              </p>
            </section>

            <section className="space-y-6">
              <h2 className="text-lg font-serif font-bold uppercase tracking-widest border-b-2 pb-1" style={{ borderColor: data.customization.primaryColor }}>Education</h2>
              <div className="space-y-4">
                {data.education.map(edu => (
                  <div key={edu.id} className="flex justify-between items-start">
                    <div className="space-y-1">
                      <div className="font-bold font-serif">{edu.school}</div>
                      <div className="text-sm italic font-serif">{edu.degree}</div>
                    </div>
                    <div className="text-sm font-serif">{edu.year}</div>
                  </div>
                ))}
              </div>
            </section>

            <section className="space-y-6">
              <h2 className="text-lg font-serif font-bold uppercase tracking-widest border-b-2 pb-1" style={{ borderColor: data.customization.primaryColor }}>Professional Appointments</h2>
              <div className="space-y-8">
                {data.experience.map(exp => (
                  <div key={exp.id} className="space-y-2">
                    <div className="flex justify-between items-start">
                      <div className="font-bold font-serif">{exp.company}</div>
                      <div className="text-sm font-serif">{exp.duration}</div>
                    </div>
                    <div className="text-sm italic font-serif">{exp.position}</div>
                    <p className="text-sm font-serif leading-relaxed text-neutral-700">{exp.description}</p>
                  </div>
                ))}
              </div>
            </section>

            <div className="grid grid-cols-2 gap-12">
              <section className="space-y-4">
                <h2 className="text-lg font-serif font-bold uppercase tracking-widest border-b-2 pb-1" style={{ borderColor: data.customization.primaryColor }}>Technical Expertise</h2>
                <ul className="list-disc list-inside text-sm font-serif space-y-1 text-neutral-700">
                  {data.technicalSkills.map(s => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-lg font-serif font-bold uppercase tracking-widest border-b-2 pb-1" style={{ borderColor: data.customization.primaryColor }}>Languages</h2>
                <div className="space-y-2">
                  {data.languages.map(lang => (
                    <div key={lang.id} className="text-sm font-serif">
                      <span className="font-bold">{lang.name}</span>: {lang.level}
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="relative">
      {downloadError && (
        <div className="absolute top-4 left-4 right-4 z-50 bg-rose-50 border border-rose-200 p-4 rounded-xl flex items-center gap-3 text-rose-600 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center shrink-0">
            <span className="font-bold">!</span>
          </div>
          <div className="flex-1">
            <p className="text-sm font-bold">Download Failed</p>
            <p className="text-xs opacity-80">{downloadError}</p>
          </div>
        </div>
      )}
      <div className={isThumbnail ? "w-full aspect-[1/1.414] overflow-hidden rounded-xl border border-neutral-200 relative bg-white shadow-sm group-hover:shadow-md transition-shadow" : ""}>
        <div 
          ref={!isThumbnail ? resumeRef : null} 
          className={`bg-white mx-auto ${data.customization.fontFamily} transition-all duration-500 ${isThumbnail ? 'absolute top-0 left-0 origin-top-left scale-[0.25] pointer-events-none' : 'shadow-2xl w-[800px] min-h-[1131px]'}`}
          style={isThumbnail ? { width: '800px', height: '1131px' } : {}}
        >
          {renderTemplate()}
        </div>
      </div>
    </div>
  );
};
