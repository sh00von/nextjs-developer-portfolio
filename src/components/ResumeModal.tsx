"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface ResumeModalContextType {
  isOpen: boolean;
  openResumeModal: () => void;
  closeResumeModal: () => void;
}

const ResumeModalContext = createContext<ResumeModalContextType>({
  isOpen: false,
  openResumeModal: () => {},
  closeResumeModal: () => {},
});

export function ResumeModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openResumeModal = () => setIsOpen(true);
  const closeResumeModal = () => setIsOpen(false);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        closeResumeModal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Lock scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <ResumeModalContext.Provider value={{ isOpen, openResumeModal, closeResumeModal }}>
      {children}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={closeResumeModal}
            aria-hidden="true"
          />

          {/* Modal Box */}
          <div
            className="relative z-10 flex h-full max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-[#e5e5e5] bg-white shadow-2xl transition-all"
            role="dialog"
            aria-modal="true"
            aria-labelledby="resume-modal-title"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#e5e5e5] bg-[#fcfcfc] px-5 py-4">
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#111111] text-white">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </span>
                <div>
                  <h2 id="resume-modal-title" className="text-base font-bold text-[#111111]">
                    Curriculum Vitae / Resume
                  </h2>
                  <p className="text-xs text-[#737373]">Md Minaruzzaman Shovon • PDF Preview</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href="/resume.pdf"
                  download="Md_Minaruzzaman_Shovon_Resume.pdf"
                  className="inline-flex items-center gap-1.5 rounded-lg bg-[#111111] px-3.5 py-1.5 text-xs font-semibold text-white shadow-xs hover:bg-[#333333] transition-colors"
                >
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span>Download</span>
                </a>

                <button
                  type="button"
                  onClick={closeResumeModal}
                  className="ml-1 rounded-lg border border-[#e5e5e5] bg-white p-1.5 text-[#737373] hover:bg-[#f5f5f5] hover:text-[#111111] transition-colors"
                  aria-label="Close modal"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* PDF Embed Body */}
            <div className="flex-1 bg-[#f5f5f5] p-2 sm:p-4 overflow-hidden">
              <iframe
                src="/resume.pdf#toolbar=1&navpanes=0"
                title="Md Minaruzzaman Shovon Resume PDF"
                className="h-full w-full rounded-xl border border-[#e5e5e5] bg-white"
              />
            </div>
          </div>
        </div>
      )}
    </ResumeModalContext.Provider>
  );
}

export function useResumeModal() {
  return useContext(ResumeModalContext);
}
