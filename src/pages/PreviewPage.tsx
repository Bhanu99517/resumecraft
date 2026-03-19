import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Download, 
  ChevronLeft,
  Printer,
  Share2,
  FileText,
  CheckCircle2,
  Copy,
  ExternalLink,
  Loader2,
  X
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useResume } from '../context/ResumeContext';
import { ResumePreview } from '../components/ResumePreview';
import { ScaleContainer } from '../components/ScaleContainer';

export const PreviewPage = () => {
  const { 
    data, 
    handleDownload, 
    isDownloading,
    handlePrint,
    handleShare,
    handleSaveDraft,
    isSharing,
    isSavingDraft,
    user,
    signIn
  } = useResume();
  const navigate = useNavigate();
  const [shareUrl, setShareUrl] = React.useState<string | null>(null);
  const [showShareModal, setShowShareModal] = React.useState(false);
  const [copySuccess, setCopySuccess] = React.useState(false);

  const onShare = async () => {
    const url = await handleShare();
    if (url) {
      setShareUrl(url);
      setShowShareModal(true);
    }
  };

  const onSaveDraft = async () => {
    if (!user) {
      if (window.confirm('You need to sign in to save drafts. Sign in now?')) {
        signIn();
      }
      return;
    }
    await handleSaveDraft();
  };

  const copyToClipboard = () => {
    if (shareUrl) {
      navigator.clipboard.writeText(shareUrl);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      className="max-w-5xl mx-auto space-y-8"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-6 rounded-3xl border border-neutral-200 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600">
            <CheckCircle2 size={28} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-neutral-900">Your resume is ready!</h2>
            <p className="text-neutral-500">Review your final document and download the PDF.</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => navigate('/select')}
            className="px-6 py-3 rounded-xl font-bold flex items-center gap-2 border border-neutral-200 hover:bg-neutral-50 transition-all"
          >
            <ChevronLeft size={18} />
            Edit Again
          </button>
          <button
            onClick={handleDownload}
            disabled={isDownloading}
            className="text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 hover:opacity-90 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ backgroundColor: data.customization.primaryColor, boxShadow: `0 10px 15px -3px ${data.customization.primaryColor}33` }}
          >
            {isDownloading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Download size={18} />
                Download PDF
              </>
            )}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Actions */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-white p-6 rounded-3xl border border-neutral-200 space-y-6">
            <h3 className="font-bold text-neutral-900 border-b pb-4">Quick Actions</h3>
            <div className="space-y-2">
              <button 
                onClick={handlePrint}
                className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-neutral-50 transition-colors text-neutral-600 font-medium"
              >
                <Printer size={18} />
                Print Resume
              </button>
              <button 
                onClick={onShare}
                disabled={isSharing}
                className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-neutral-50 transition-colors text-neutral-600 font-medium disabled:opacity-50"
              >
                {isSharing ? <Loader2 size={18} className="animate-spin" /> : <Share2 size={18} />}
                {isSharing ? 'Generating Link...' : 'Share Link'}
              </button>
              <button 
                onClick={onSaveDraft}
                disabled={isSavingDraft}
                className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-neutral-50 transition-colors text-neutral-600 font-medium disabled:opacity-50"
              >
                {isSavingDraft ? <Loader2 size={18} className="animate-spin" /> : <FileText size={18} />}
                {isSavingDraft ? 'Saving Draft...' : 'Save as Draft'}
              </button>
            </div>
          </div>

          {/* Share Modal */}
          <AnimatePresence>
            {showShareModal && (
              <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setShowShareModal(false)}
                  className="absolute inset-0 bg-neutral-900/60 backdrop-blur-sm"
                />
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 20 }}
                  className="relative bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl space-y-6"
                >
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <h3 className="text-xl font-bold text-neutral-900">Share Resume</h3>
                      <p className="text-neutral-500 text-sm">Anyone with this link can view your resume.</p>
                    </div>
                    <button 
                      onClick={() => setShowShareModal(false)}
                      className="p-2 hover:bg-neutral-100 rounded-xl transition-colors"
                    >
                      <X size={20} />
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-2 p-3 bg-neutral-50 rounded-xl border border-neutral-200">
                      <input 
                        type="text" 
                        readOnly 
                        value={shareUrl || ''} 
                        className="flex-1 bg-transparent border-none focus:ring-0 text-sm text-neutral-600 font-mono overflow-hidden text-ellipsis"
                      />
                      <button 
                        onClick={copyToClipboard}
                        className={`p-2 rounded-lg transition-all ${copySuccess ? 'bg-emerald-500 text-white' : 'hover:bg-neutral-200 text-neutral-500'}`}
                      >
                        {copySuccess ? <CheckCircle2 size={18} /> : <Copy size={18} />}
                      </button>
                    </div>

                    <div className="flex gap-3">
                      <a 
                        href={shareUrl || '#'} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 py-3 bg-neutral-900 text-white rounded-xl font-bold hover:bg-neutral-800 transition-all"
                      >
                        <ExternalLink size={18} />
                        Open Link
                      </a>
                    </div>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>

          <div className="bg-neutral-900 p-6 rounded-3xl text-white space-y-4">
            <h3 className="font-bold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Pro Tip
            </h3>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Tailor your resume for each job application by highlighting the most relevant skills and experiences.
            </p>
          </div>
        </div>

        {/* Final Resume Preview */}
        <div className="lg:col-span-3">
          <div className="bg-neutral-100 rounded-3xl p-4 sm:p-8 border border-neutral-200 overflow-hidden mx-auto lg:mx-0">
            <div className="rounded-xl">
              <ScaleContainer baseWidth={800}>
                <div className="pointer-events-none select-none sm:pointer-events-auto sm:select-auto">
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
