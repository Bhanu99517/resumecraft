import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { ResumePreview } from '../components/ResumePreview';
import { ScaleContainer } from '../components/ScaleContainer';
import { ResumeData, TemplateType, useResume } from '../context/ResumeContext';
import { FileText, ChevronLeft, ExternalLink } from 'lucide-react';

const ViewResumeContent = () => {
  const { id } = useParams();
  const { setData, setSelectedTemplate } = useResume();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [resumeName, setResumeName] = useState('');

  useEffect(() => {
    const fetchResume = async () => {
      if (!id) return;
      try {
        const docRef = doc(db, 'shared_resumes', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setData(data.data);
          setSelectedTemplate(data.template);
          setResumeName(data.data.personalInfo.fullName);
        } else {
          setError('Resume not found');
        }
      } catch (err) {
        console.error('Error fetching shared resume:', err);
        setError('Failed to load resume');
      } finally {
        setLoading(false);
      }
    };

    fetchResume();
  }, [id, setData, setSelectedTemplate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-12 h-12 border-4 border-neutral-200 border-t-neutral-900 rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6 space-y-6">
        <div className="w-20 h-20 bg-rose-50 text-rose-500 rounded-3xl flex items-center justify-center">
          <FileText size={40} />
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-black tracking-tight text-neutral-900">Resume Not Found</h1>
          <p className="text-neutral-500 max-w-md mx-auto">{error}</p>
        </div>
        <Link to="/" className="px-8 py-3 bg-neutral-900 text-white rounded-xl font-bold hover:bg-neutral-800 transition-all shadow-lg">
          Go to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-6 rounded-3xl border border-neutral-200 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-neutral-900 flex items-center justify-center text-white">
            <FileText size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-neutral-900">{resumeName}'s Resume</h2>
            <p className="text-neutral-500">Shared via Resumake</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/" className="px-6 py-3 rounded-xl font-bold flex items-center gap-2 border border-neutral-200 hover:bg-neutral-50 transition-all">
            <ChevronLeft size={18} />
            Build Your Own
          </Link>
          <button 
            onClick={() => window.print()}
            className="px-6 py-3 bg-neutral-900 text-white rounded-xl font-bold flex items-center gap-2 hover:bg-neutral-800 transition-all shadow-lg"
          >
            <ExternalLink size={18} />
            Print PDF
          </button>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-4 sm:p-8 border border-neutral-200 overflow-hidden shadow-xl">
        <div className="rounded-xl">
          <ScaleContainer baseWidth={800}>
            <div className="pointer-events-none select-none sm:pointer-events-auto sm:select-auto">
              <ResumePreview />
            </div>
          </ScaleContainer>
        </div>
      </div>
    </div>
  );
};

export const ViewPage = () => <ViewResumeContent />;
