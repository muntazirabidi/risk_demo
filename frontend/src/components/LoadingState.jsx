import { useState, useEffect } from 'react';

// Dynamic messages that include company name
const getLoadingMessages = (companyName) => [
  { message: `Searching financial databases for ${companyName}...`, icon: '💰', duration: 3000 },
  { message: `Analyzing ${companyName}'s credit profile...`, icon: '📊', duration: 4000 },
  { message: `Evaluating market position & competitors...`, icon: '🎯', duration: 4000 },
  { message: `Assessing operational & supply chain risks...`, icon: '⚙️', duration: 4000 },
  { message: `Reviewing compliance & certifications...`, icon: '✅', duration: 3000 },
  { message: `Generating comprehensive risk report...`, icon: '📋', duration: 5000 },
];

export default function LoadingState({ companyName = 'company' }) {
  const LOADING_MESSAGES = getLoadingMessages(companyName);
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100;
        return prev + 1;
      });
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

  return (
    <div className="max-w-3xl mx-auto animate-fade-in">
      <div className="card relative overflow-hidden">
        {/* Background gradient animation */}
        <div className="absolute inset-0 bg-gradient-to-br from-teal-50 via-white to-slate-50 opacity-50"></div>

        <div className="relative z-10">
          {/* Animated Icon */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-teal-600 rounded-full opacity-20 animate-ping"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-teal-500 rounded-full opacity-30 animate-ping" style={{ animationDelay: '0.5s' }}></div>
              <div className="relative bg-gradient-to-br from-teal-600 to-teal-700 rounded-full p-5 shadow-2xl shadow-teal-500/50">
                <svg
                  className="w-14 h-14 text-white animate-pulse"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Title */}
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-2">
            Analyzing <span className="bg-gradient-to-r from-teal-600 to-teal-700 bg-clip-text text-transparent">{companyName}</span>
          </h2>
          <p className="text-center text-slate-500 text-sm mb-6">
            Our AI agents are gathering intelligence from multiple sources
          </p>

          {/* Current Step Message with Icon */}
          <div className="flex items-center justify-center gap-3 mb-8 h-8 transition-all duration-300">
            <span className="text-2xl animate-bounce">{LOADING_MESSAGES[currentStep].icon}</span>
            <p className="text-slate-700 font-semibold">
              {LOADING_MESSAGES[currentStep].message}
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden shadow-inner">
              <div
                className="bg-gradient-to-r from-teal-600 via-teal-500 to-emerald-500 h-3 rounded-full transition-all duration-300 ease-out shadow-lg"
                style={{ width: `${Math.min(progress, 95)}%` }}
              ></div>
            </div>
            <div className="flex justify-between mt-2 text-xs text-slate-500">
              <span>Starting...</span>
              <span className="font-semibold text-teal-600">{Math.min(progress, 95)}%</span>
              <span>Complete</span>
            </div>
          </div>

          {/* Step Indicators */}
          <div className="flex justify-between items-center text-xs text-slate-500 mb-6">
            {LOADING_MESSAGES.map((step, index) => (
              <div
                key={index}
                className={`flex flex-col items-center transition-all duration-300 ${
                  index <= currentStep ? 'opacity-100' : 'opacity-30'
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center mb-1 transition-all duration-300 ${
                    index < currentStep
                      ? 'bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-lg'
                      : index === currentStep
                      ? 'bg-gradient-to-br from-teal-600 to-teal-700 text-white animate-pulse shadow-lg shadow-teal-500/50'
                      : 'bg-slate-200 text-slate-500 border-2 border-slate-300'
                  }`}
                >
                  {index < currentStep ? (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <span className="font-semibold">{index + 1}</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Estimated Time */}
          <div className="text-center bg-teal-50 border border-teal-100 rounded-lg py-3 px-4">
            <p className="text-sm text-teal-800 font-medium flex items-center justify-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Estimated time: 30-60 seconds
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
