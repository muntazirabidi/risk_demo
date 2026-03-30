import { useState, useEffect } from 'react';

const getLoadingMessages = (companyName) => [
  { message: `Deploying hunter agents for ${companyName}...`, phase: 'INGEST', duration: 3000 },
  { message: `Crawling financial databases and SEC filings...`, phase: 'INGEST', duration: 4000 },
  { message: `Scanning sanctions lists and regulatory actions...`, phase: 'ANALYZE', duration: 4000 },
  { message: `Evaluating ESG controversies and compliance...`, phase: 'ANALYZE', duration: 4000 },
  { message: `Cross-verifying findings across sources...`, phase: 'ANALYZE', duration: 3000 },
  { message: `Synthesizing risk assessment report...`, phase: 'REPORT', duration: 5000 },
];

export default function LoadingState({ companyName = 'company' }) {
  const LOADING_MESSAGES = getLoadingMessages(companyName);
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => prev >= 100 ? 100 : prev + 1);
    }, 300);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (currentStep < LOADING_MESSAGES.length - 1) {
      const timeout = setTimeout(() => {
        setCurrentStep((prev) => prev + 1);
      }, LOADING_MESSAGES[currentStep].duration);
      return () => clearTimeout(timeout);
    }
  }, [currentStep]);

  const currentPhase = LOADING_MESSAGES[currentStep].phase;

  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      <div className="border border-slate-200 bg-white">
        {/* Header bar */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
          <div>
            <div className="text-[10px] font-medium text-slate-400 uppercase tracking-[0.15em] mb-1">Multi-Agent Assessment</div>
            <div className="text-base font-medium tracking-tight">{companyName}</div>
          </div>
          <div className="text-right">
            <div className="text-[10px] font-medium text-slate-400 uppercase tracking-[0.15em] mb-1">Phase</div>
            <div className="text-sm font-mono font-medium text-white">{currentPhase}</div>
          </div>
        </div>

        <div className="p-6">
          {/* Progress bar */}
          <div className="mb-6">
            <div className="w-full bg-slate-100 h-1.5 overflow-hidden">
              <div
                className="bg-slate-900 h-1.5 transition-all duration-300 ease-out"
                style={{ width: `${Math.min(progress, 95)}%` }}
              ></div>
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider">Progress</span>
              <span className="text-[10px] font-mono font-medium text-slate-700">{Math.min(progress, 95)}%</span>
            </div>
          </div>

          {/* Current action */}
          <div className="flex items-center gap-3 mb-6 py-3 px-4 bg-slate-50 border border-slate-200">
            <div className="w-2 h-2 bg-slate-900 animate-pulse flex-shrink-0"></div>
            <p className="text-sm text-slate-700 font-medium">
              {LOADING_MESSAGES[currentStep].message}
            </p>
          </div>

          {/* Step indicators */}
          <div className="space-y-2">
            {LOADING_MESSAGES.map((step, index) => (
              <div
                key={index}
                className={`flex items-center gap-3 text-xs transition-all duration-300 ${
                  index <= currentStep ? 'opacity-100' : 'opacity-30'
                }`}
              >
                <div className={`w-5 h-5 flex items-center justify-center flex-shrink-0 text-[10px] font-medium ${
                  index < currentStep
                    ? 'bg-slate-900 text-white'
                    : index === currentStep
                    ? 'border-2 border-slate-900 text-slate-900'
                    : 'border border-slate-300 text-slate-400'
                }`}>
                  {index < currentStep ? (
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </div>
                <span className={`${index <= currentStep ? 'text-slate-700' : 'text-slate-400'}`}>
                  {step.message.replace(`${companyName}`, '...').replace('Deploying hunter agents for ...', 'Deploy hunter agents')}
                </span>
                <span className="text-[9px] font-medium text-slate-400 uppercase tracking-wider ml-auto">{step.phase}</span>
              </div>
            ))}
          </div>

          {/* Estimated time */}
          <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between">
            <p className="text-[10px] text-slate-400 uppercase tracking-wider">Estimated: 30-60 seconds</p>
            <p className="text-[10px] text-slate-400 uppercase tracking-wider">20+ agents active</p>
          </div>
        </div>
      </div>
    </div>
  );
}
