import React, { createContext, useContext, useState, useRef, useEffect } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { auth, db, googleProvider, signInWithPopup, signOut, onAuthStateChanged } from '../firebase';
import { doc, setDoc, getDoc, onSnapshot, serverTimestamp, collection, query, where, orderBy, addDoc } from 'firebase/firestore';
import { User } from 'firebase/auth';

export interface ResumeData {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    website: string;
    summary: string;
  };
  experience: {
    id: string;
    company: string;
    position: string;
    duration: string;
    description: string;
  }[];
  education: {
    id: string;
    school: string;
    degree: string;
    year: string;
  }[];
  technicalSkills: string[];
  softSkills: string[];
  languages: {
    id: string;
    name: string;
    level: string;
  }[];
  organizations: {
    id: string;
    name: string;
    role: string;
    duration: string;
    description: string;
  }[];
  customization: {
    primaryColor: string;
    fontFamily: string;
  };
  templateCustomizations: {
    [key in TemplateType]?: {
      primaryColor: string;
      fontFamily: string;
    };
  };
}

export type TemplateType = 'modern' | 'classic' | 'artistic' | 'technical' | 'minimal' | 'elegant' | 'compact' | 'sidebar-left' | 'bold-header' | 'grid-focus' | 'academic';

interface ResumeContextType {
  data: ResumeData;
  setData: (data: ResumeData) => void;
  selectedTemplate: TemplateType;
  setSelectedTemplate: (template: TemplateType) => void;
  updateTemplateCustomization: (template: TemplateType, customization: { primaryColor?: string; fontFamily?: string }) => void;
  resumeRef: React.RefObject<HTMLDivElement | null>;
  handleDownload: () => Promise<void>;
  handlePrint: () => void;
  isDownloading: boolean;
  isSharing: boolean;
  isSavingDraft: boolean;
  downloadError: string | null;
  addExperience: () => void;
  addEducation: () => void;
  addLanguage: () => void;
  addOrganization: () => void;
  addTechnicalSkill: (skill: string) => void;
  removeTechnicalSkill: (skill: string) => void;
  addSoftSkill: (skill: string) => void;
  removeSoftSkill: (skill: string) => void;
  handleSaveDraft: (name?: string) => Promise<void>;
  handleShare: () => Promise<string | null>;
  savedResumes: any[];
  loadResume: (resumeId: string) => Promise<void>;
  user: User | null;
  signIn: () => Promise<void>;
  logout: () => Promise<void>;
  authLoading: boolean;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

const initialData: ResumeData = {
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    location: '',
    website: '',
    summary: '',
  },
  experience: [
    {
      id: '1',
      company: '',
      position: '',
      duration: '',
      description: '',
    },
  ],
  education: [
    {
      id: '1',
      school: '',
      degree: '',
      year: '',
    },
  ],
  technicalSkills: [],
  softSkills: [],
  languages: [
    { id: '1', name: '', level: '' },
  ],
  organizations: [
    {
      id: '1',
      name: '',
      role: '',
      duration: '',
      description: '',
    },
  ],
  customization: {
    primaryColor: '#1e293b',
    fontFamily: 'font-sans',
  },
  templateCustomizations: {
    modern: { primaryColor: '#4f46e5', fontFamily: 'font-sans' },
    classic: { primaryColor: '#334155', fontFamily: 'font-serif' },
    artistic: { primaryColor: '#e11d48', fontFamily: 'font-mono' },
    technical: { primaryColor: '#059669', fontFamily: 'font-mono' },
    minimal: { primaryColor: '#171717', fontFamily: 'font-sans' },
    elegant: { primaryColor: '#b45309', fontFamily: 'font-serif' },
    compact: { primaryColor: '#2563eb', fontFamily: 'font-sans' },
    'sidebar-left': { primaryColor: '#1e293b', fontFamily: 'font-sans' },
    'bold-header': { primaryColor: '#7c3aed', fontFamily: 'font-sans' },
    'grid-focus': { primaryColor: '#0891b2', fontFamily: 'font-sans' },
    academic: { primaryColor: '#000000', fontFamily: 'font-serif' },
  },
};

export const ResumeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<ResumeData>(initialData);
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateType>('modern');
  const [isDownloading, setIsDownloading] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const [isSavingDraft, setIsSavingDraft] = useState(false);
  const [downloadError, setDownloadError] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [savedResumes, setSavedResumes] = useState<any[]>([]);
  const resumeRef = useRef<HTMLDivElement>(null);

  // Auth Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Load data from Firestore when user logs in
  useEffect(() => {
    if (!user) {
      setData(initialData);
      return;
    }

    const resumeDocRef = doc(db, 'resumes', user.uid);
    const unsubscribe = onSnapshot(resumeDocRef, (docSnap) => {
      if (docSnap.exists()) {
        const firestoreData = docSnap.data().data as ResumeData;
        setData(firestoreData);
      }
    });

    return () => unsubscribe();
  }, [user]);

  // Load saved resumes
  useEffect(() => {
    if (!user) {
      setSavedResumes([]);
      return;
    }

    const q = query(
      collection(db, 'saved_resumes'),
      where('userId', '==', user.uid),
      orderBy('updatedAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const resumes: any[] = [];
      querySnapshot.forEach((doc) => {
        resumes.push({ id: doc.id, ...doc.data() });
      });
      setSavedResumes(resumes);
    });

    return () => unsubscribe();
  }, [user]);

  // Save data to Firestore when it changes
  useEffect(() => {
    if (!user) return;

    const saveTimeout = setTimeout(async () => {
      try {
        await setDoc(doc(db, 'resumes', user.uid), {
          userId: user.uid,
          data: data,
          updatedAt: serverTimestamp()
        }, { merge: true });
      } catch (error) {
        console.error('Error saving to Firestore:', error);
      }
    }, 2000); // Debounce save

    return () => clearTimeout(saveTimeout);
  }, [data, user]);

  const signIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const updateTemplateCustomization = (template: TemplateType, customization: { primaryColor?: string; fontFamily?: string }) => {
    setData(prev => {
      const currentTemplateCustomization = prev.templateCustomizations[template] || { primaryColor: '#1e293b', fontFamily: 'font-sans' };
      const updatedTemplateCustomization = {
        ...currentTemplateCustomization,
        ...customization
      };

      const newData = {
        ...prev,
        templateCustomizations: {
          ...prev.templateCustomizations,
          [template]: updatedTemplateCustomization
        }
      };

      // If the updated template is the currently selected one, also update the global customization
      if (template === selectedTemplate) {
        newData.customization = updatedTemplateCustomization;
      }

      return newData;
    });
  };

  // Sync global customization when template changes
  React.useEffect(() => {
    const templateCustomization = data.templateCustomizations[selectedTemplate];
    if (templateCustomization) {
      setData(prev => ({
        ...prev,
        customization: templateCustomization
      }));
    }
  }, [selectedTemplate]);

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = async () => {
    if (!resumeRef.current) return;

    setIsDownloading(true);
    setDownloadError(null);

    try {
      const element = resumeRef.current;
      
      // Temporary fix for oklch colors which html2canvas might struggle with
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        onclone: (clonedDoc) => {
          const elements = clonedDoc.getElementsByTagName('*');
          for (let i = 0; i < elements.length; i++) {
            const el = elements[i] as HTMLElement;
            const style = window.getComputedStyle(el);
            
            // Iterate over all computed styles to find problematic color functions
            // html2canvas doesn't support oklch/oklab yet
            for (let j = 0; j < style.length; j++) {
              const prop = style[j];
              const val = style.getPropertyValue(prop);
              
              if (val && (val.includes('oklch') || val.includes('oklab') || val.includes('color-mix'))) {
                // Fallback to safe colors to prevent html2canvas from crashing
                if (prop.includes('background')) {
                  el.style.setProperty(prop, '#ffffff', 'important');
                } else if (prop.includes('shadow')) {
                  el.style.setProperty(prop, 'none', 'important');
                } else if (prop.includes('color') || prop.includes('border') || prop.includes('fill') || prop.includes('stroke')) {
                  el.style.setProperty(prop, '#000000', 'important');
                }
              }
            }
          }
        }
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${data.personalInfo.fullName.replace(/\s+/g, '_')}_Resume.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      setDownloadError('Failed to generate PDF. Please try again or use a different browser.');
    } finally {
      setIsDownloading(false);
    }
  };

  const addExperience = () => {
    setData(prev => ({
      ...prev,
      experience: [...prev.experience, {
        id: Date.now().toString(),
        company: '',
        position: '',
        duration: '',
        description: '',
      }]
    }));
  };

  const addEducation = () => {
    setData(prev => ({
      ...prev,
      education: [...prev.education, {
        id: Date.now().toString(),
        school: '',
        degree: '',
        year: '',
      }]
    }));
  };

  const addLanguage = () => {
    setData(prev => ({
      ...prev,
      languages: [...prev.languages, {
        id: Date.now().toString(),
        name: '',
        level: '',
      }]
    }));
  };

  const addOrganization = () => {
    setData(prev => ({
      ...prev,
      organizations: [...prev.organizations, {
        id: Date.now().toString(),
        name: '',
        role: '',
        duration: '',
        description: '',
      }]
    }));
  };

  const addTechnicalSkill = (skill: string) => {
    if (skill && !data.technicalSkills.includes(skill)) {
      setData(prev => ({
        ...prev,
        technicalSkills: [...prev.technicalSkills, skill]
      }));
    }
  };

  const removeTechnicalSkill = (skill: string) => {
    setData(prev => ({
      ...prev,
      technicalSkills: prev.technicalSkills.filter(s => s !== skill)
    }));
  };

  const addSoftSkill = (skill: string) => {
    if (skill && !data.softSkills.includes(skill)) {
      setData(prev => ({
        ...prev,
        softSkills: [...prev.softSkills, skill]
      }));
    }
  };

  const removeSoftSkill = (skill: string) => {
    setData(prev => ({
      ...prev,
      softSkills: prev.softSkills.filter(s => s !== skill)
    }));
  };

  const handleSaveDraft = async (name?: string) => {
    if (!user) return;
    setIsSavingDraft(true);

    try {
      await addDoc(collection(db, 'saved_resumes'), {
        userId: user.uid,
        name: name || `Resume ${new Date().toLocaleDateString()}`,
        data: data,
        template: selectedTemplate,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      console.error('Error saving draft:', error);
    } finally {
      setIsSavingDraft(false);
    }
  };

  const handleShare = async () => {
    setIsSharing(true);
    try {
      const docRef = await addDoc(collection(db, 'shared_resumes'), {
        data: data,
        template: selectedTemplate,
        createdAt: serverTimestamp()
      });
      return `${window.location.origin}/view/${docRef.id}`;
    } catch (error) {
      console.error('Error sharing resume:', error);
      return null;
    } finally {
      setIsSharing(false);
    }
  };

  const loadResume = async (resumeId: string) => {
    try {
      const docRef = doc(db, 'saved_resumes', resumeId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const resumeData = docSnap.data();
        setData(resumeData.data);
        setSelectedTemplate(resumeData.template);
      }
    } catch (error) {
      console.error('Error loading resume:', error);
    }
  };

  return (
    <ResumeContext.Provider value={{ 
      data, 
      setData, 
      selectedTemplate, 
      setSelectedTemplate, 
      updateTemplateCustomization,
      resumeRef, 
      handleDownload,
      handlePrint,
      isDownloading,
      isSharing,
      isSavingDraft,
      downloadError,
      addExperience,
      addEducation,
      addLanguage,
      addOrganization,
      addTechnicalSkill,
      removeTechnicalSkill,
      addSoftSkill,
      removeSoftSkill,
      handleSaveDraft,
      handleShare,
      savedResumes,
      loadResume,
      user,
      signIn,
      logout,
      authLoading
    }}>
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = () => {
  const context = useContext(ResumeContext);
  if (context === undefined) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
};
