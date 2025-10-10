import { useState, useEffect } from 'react';

const LOADING_MESSAGES = [
  { message: 'Searching financial databases...', duration: 3000 },
  { message: 'Analyzing credit data...', duration: 4000 },
  { message: 'Evaluating market position...', duration: 4000 },
  { message: 'Assessing operational risks...', duration: 4000 },
  { message: 'Reviewing business continuity...', duration: 3000 },
  { message: 'Generating comprehensive report...', duration: 5000 },
];

export default function LoadingState() {
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
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 opacity-50"></div>

        <div className="relative z-10">
          {/* Animated Icon */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-20 animate-ping"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-30 animate-ping" style={{ animationDelay: '0.5s' }}></div>
              <div className="relative bg-gradient-to-br from-blue-600 to-blue-700 rounded-full p-5 shadow-2xl shadow-blue-500/50">
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
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-2">
            Analyzing Risk Profile
          </h2>
          <p className="text-center text-gray-500 text-sm mb-6">
            Gathering intelligence from multiple sources
          </p>

          {/* Current Step Message */}
          <p className="text-center text-gray-600 font-medium mb-8 h-6 transition-all duration-300">
            {LOADING_MESSAGES[currentStep].message}
          </p>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden shadow-inner">
              <div
                className="bg-gradient-to-r from-blue-600 via-blue-500 to-purple-600 h-3 rounded-full transition-all duration-300 ease-out shadow-lg"
                style={{ width: `${Math.min(progress, 95)}%` }}
              ></div>
            </div>
            <div className="flex justify-between mt-2 text-xs text-gray-500">
              <span>Starting...</span>
              <span className="font-semibold text-blue-600">{Math.min(progress, 95)}%</span>
              <span>Complete</span>
            </div>
          </div>

          {/* Step Indicators */}
          <div className="flex justify-between items-center text-xs text-gray-500 mb-6">
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
                      ? 'bg-gradient-to-br from-green-500 to-green-600 text-white shadow-lg'
                      : index === currentStep
                      ? 'bg-gradient-to-br from-blue-600 to-blue-700 text-white animate-pulse shadow-lg shadow-blue-500/50'
                      : 'bg-gray-200 text-gray-500 border-2 border-gray-300'
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
          <div className="text-center bg-blue-50 border border-blue-100 rounded-lg py-3 px-4">
            <p className="text-sm text-blue-800 font-medium flex items-center justify-center gap-2">
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
