import React from 'react';
import { motion } from 'motion/react';
import { useResume } from '../context/ResumeContext';
import { useNavigate } from 'react-router-dom';
import { FileText, Clock, ChevronRight, Trash2, Plus, Edit3 } from 'lucide-react';
import { db } from '../firebase';
import { doc, deleteDoc } from 'firebase/firestore';
import { ResumePreview } from '../components/ResumePreview';

export const SavedResumes = () => {
  const { savedResumes, loadResume, user } = useResume();
  const navigate = useNavigate();

  const handleLoad = async (id: string) => {
    await loadResume(id);
    navigate('/edit');
  };

  const handleDelete = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this resume?')) {
      try {
        await deleteDoc(doc(db, 'saved_resumes', id));
      } catch (error) {
        console.error('Error deleting resume:', error);
      }
    }
  };

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-4">
        <div className="w-16 h-16 bg-neutral-100 rounded-2xl flex items-center justify-center text-neutral-400">
          <FileText size={32} />
        </div>
        <h2 className="text-2xl font-bold text-neutral-900">Sign in to see your resumes</h2>
        <p className="text-neutral-500 max-w-md">
          Your saved resumes will appear here once you've signed in and saved some drafts.
        </p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-6xl mx-auto space-y-8 px-4"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-neutral-900">Saved Resumes</h1>
          <p className="text-neutral-500">Manage and edit your saved resume drafts.</p>
        </div>
        <button
          onClick={() => navigate('/select')}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-neutral-900 text-white rounded-xl font-bold hover:bg-neutral-800 transition-all shadow-lg"
        >
          <Plus size={18} />
          Create New
        </button>
      </div>

      {savedResumes.length === 0 ? (
        <div className="bg-white border border-neutral-200 rounded-3xl p-12 text-center space-y-4">
          <div className="w-16 h-16 bg-neutral-50 rounded-2xl flex items-center justify-center text-neutral-300 mx-auto">
            <FileText size={32} />
          </div>
          <h3 className="text-xl font-bold text-neutral-900">No resumes saved yet</h3>
          <p className="text-neutral-500 max-w-sm mx-auto">
            Start building your resume and save it as a draft to see it here.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {savedResumes.map((resume) => (
            <motion.div
              key={resume.id}
              whileHover={{ y: -8 }}
              className="group flex flex-col space-y-4"
            >
              <div 
                onClick={() => handleLoad(resume.id)}
                className="relative cursor-pointer"
              >
                <ResumePreview 
                  data={resume.data} 
                  selectedTemplate={resume.template} 
                  isThumbnail={true} 
                />
                
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center gap-3">
                  <button
                    onClick={() => handleLoad(resume.id)}
                    className="p-3 bg-white text-neutral-900 rounded-full shadow-xl hover:scale-110 transition-transform"
                  >
                    <Edit3 size={20} />
                  </button>
                  <button
                    onClick={(e) => handleDelete(e, resume.id)}
                    className="p-3 bg-rose-500 text-white rounded-full shadow-xl hover:scale-110 transition-transform"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>

              <div className="flex items-start justify-between px-1">
                <div className="space-y-1">
                  <h3 className="font-bold text-neutral-900 truncate max-w-[200px]">{resume.name}</h3>
                  <div className="flex items-center gap-2 text-xs text-neutral-400">
                    <Clock size={12} />
                    {resume.updatedAt?.toDate().toLocaleDateString()}
                  </div>
                </div>
                <button
                  onClick={() => handleLoad(resume.id)}
                  className="p-2 text-neutral-400 hover:text-neutral-900 transition-colors"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};
