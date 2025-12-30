import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AssessmentForm from '../components/AssessmentForm';
import QuickDemoButtons from '../components/QuickDemoButtons';
import LoadingState from '../components/LoadingState';
import RiskDashboard from '../components/RiskDashboard';
import UseCases from '../components/UseCases';

// Use environment variable for API URL with fallback
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';

function LandingPage() {
  const navigate = useNavigate();
  const [state, setState] = useState({
    isLoading: false,
    error: null,
    assessment: null,
    metadata: null,
  });
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [loadingCompanyName, setLoadingCompanyName] = useState('');

  const assessCompanyRisk = async (formData) => {
    setLoadingCompanyName(formData.companyName);
    setState({ isLoading: true, error: null, assessment: null, metadata: null });

    try {
      // Create abort controller for timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 150000); // 150 seconds timeout

      const response = await fetch(`${API_BASE_URL}/assess-risk`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Risk assessment failed');
      }

      setState({
        isLoading: false,
        error: null,
        assessment: result.data,
        metadata: result.metadata,
      });
    } catch (error) {
      console.error('Assessment error:', error);

      let errorMessage = 'An unexpected error occurred. Please try again.';

      if (error.name === 'AbortError') {
        errorMessage = 'Request timed out. The assessment is taking longer than expected. Please try again.';
      } else if (error.message.includes('Failed to fetch')) {
        errorMessage = 'Cannot connect to the server. Please ensure the backend is running on port 3001.';
      } else if (error.message) {
        errorMessage = error.message;
      }

      setState({
        isLoading: false,
        error: errorMessage,
        assessment: null,
        metadata: null,
      });
    }
  };

  const handleFormSubmit = (formData) => {
    assessCompanyRisk(formData);
  };

  const handleQuickDemo = (company) => {
    // Fill the form instead of immediately running assessment
    setSelectedCompany(company);
  };

  const handleNewAssessment = () => {
    setState({
      isLoading: false,
      error: null,
      assessment: null,
      metadata: null,
    });
    setSelectedCompany(null);
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-slate-900"></div>
                <div className="w-2 h-2 rounded-full bg-slate-600"></div>
                <div className="w-2 h-2 rounded-full bg-slate-400"></div>
              </div>
              <div className="border-l border-slate-200 pl-3">
                <h1 className="text-xl font-semibold text-slate-900 tracking-tight">Spectrum</h1>
                <p className="text-xs text-slate-500 font-medium">Vendor Due Diligence</p>
              </div>
            </div>
            {state.assessment ? (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => navigate('/portfolio')}
                  className="px-4 py-2 text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors"
                >
                  View Portfolio
                </button>
                <button
                  onClick={handleNewAssessment}
                  className="px-4 py-2 text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors"
                >
                  + New Assessment
                </button>
                <button className="px-5 py-2 text-sm font-medium bg-slate-900 text-white hover:bg-slate-800 transition-colors">
                  Book a Demo
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => navigate('/portfolio')}
                  className="px-4 py-2 text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors"
                >
                  View Portfolio
                </button>
                <button className="px-5 py-2 text-sm font-medium bg-slate-900 text-white hover:bg-slate-800 transition-colors">
                  Book a Demo
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {!state.isLoading && !state.assessment && (
          <>
            {/* Hero Section */}
            <div className="text-center mb-12 animate-fade-in">
              <div className="inline-flex items-center gap-2 bg-slate-100 px-4 py-2 mb-4 border border-slate-200">
                <svg className="w-4 h-4 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span className="text-xs font-medium text-slate-700 uppercase tracking-wider">Live Demo</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-light mb-4 tracking-tight text-black">
                AI-Powered Vendor Intelligence
              </h1>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-3">
                See our multi-agent AI system analyze vendor risk in real-time
              </p>
              <p className="text-sm text-slate-500 max-w-xl mx-auto mb-8">
                Enter any company name below to watch our AI perform instant risk assessment across 5 critical dimensions
              </p>

              {/* How it works - 3 steps */}
              <div className="flex flex-wrap justify-center gap-6 max-w-3xl mx-auto">
                <div className="flex items-center gap-3 bg-white px-4 py-2 border border-slate-200">
                  <div className="w-7 h-7 bg-slate-900 flex items-center justify-center text-white font-medium text-xs">1</div>
                  <span className="text-xs font-medium text-slate-700 uppercase tracking-wider">Enter company name</span>
                </div>
                <div className="flex items-center gap-3 bg-white px-4 py-2 border border-slate-200">
                  <div className="w-7 h-7 bg-slate-900 flex items-center justify-center text-white font-medium text-xs">2</div>
                  <span className="text-xs font-medium text-slate-700 uppercase tracking-wider">AI analyzes risk factors</span>
                </div>
                <div className="flex items-center gap-3 bg-white px-4 py-2 border border-slate-200">
                  <div className="w-7 h-7 bg-slate-900 flex items-center justify-center text-white font-medium text-xs">3</div>
                  <span className="text-xs font-medium text-slate-700 uppercase tracking-wider">Get instant report</span>
                </div>
              </div>
            </div>

            {/* Quick Demo Buttons */}
            <QuickDemoButtons
              onSelectCompany={handleQuickDemo}
              isLoading={state.isLoading}
            />

            {/* Assessment Form */}
            <AssessmentForm
              onSubmit={handleFormSubmit}
              isLoading={state.isLoading}
              initialData={selectedCompany}
            />

            {/* Error Display */}
            {state.error && (
              <div className="max-w-3xl mx-auto mt-6">
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
                  <div className="flex items-start">
                    <svg
                      className="w-6 h-6 text-red-500 mr-3 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <div>
                      <h3 className="text-red-800 font-semibold mb-1">
                        Assessment Error
                      </h3>
                      <p className="text-red-700">{state.error}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Value Proposition Section */}
            <div className="max-w-5xl mx-auto mt-16 mb-8">
              <div className="bg-slate-50 border border-slate-200 p-8">
                <h3 className="text-xl font-light text-black text-center mb-8">Why Procurement Teams Choose Spectrum</h3>
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <div className="text-xs font-medium text-red-700 uppercase tracking-wider mb-3 flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      Traditional Process
                    </div>
                    <ul className="space-y-3 text-sm text-slate-700">
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 mt-1">•</span>
                        <span>90+ days average assessment time</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 mt-1">•</span>
                        <span>$15-20K cost per vendor assessment</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 mt-1">•</span>
                        <span>Manual data collection across scattered sources</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 mt-1">•</span>
                        <span>Point-in-time snapshots, no continuous monitoring</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 mt-1">•</span>
                        <span>Subjective scoring without audit trails</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <div className="text-xs font-medium text-emerald-700 uppercase tracking-wider mb-3 flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      With Spectrum
                    </div>
                    <ul className="space-y-3 text-sm text-slate-700">
                      <li className="flex items-start gap-2">
                        <span className="text-emerald-600 mt-1">✓</span>
                        <span><strong>24-48 hours</strong> comprehensive report delivery</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-emerald-600 mt-1">✓</span>
                        <span><strong>Fixed per-report pricing</strong> with volume discounts</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-emerald-600 mt-1">✓</span>
                        <span>AI aggregates data from 100+ verified sources</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-emerald-600 mt-1">✓</span>
                        <span>Continuous monitoring with real-time alerts</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-emerald-600 mt-1">✓</span>
                        <span>Evidence-based analysis with full audit trails</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="mt-8 text-center">
                  <button
                    onClick={() => navigate('/portfolio')}
                    className="px-6 py-3 bg-black text-white text-sm font-medium hover:bg-slate-800 transition-colors uppercase tracking-wider"
                  >
                    View Sample Reports →
                  </button>
                </div>
              </div>
            </div>

            {/* Use Cases Section - Only show on landing page */}
            <UseCases />
          </>
        )}

        {/* Loading State */}
        {state.isLoading && <LoadingState companyName={loadingCompanyName} />}

        {/* Results Dashboard */}
        {state.assessment && state.metadata && (
          <RiskDashboard
            assessment={state.assessment}
            metadata={state.metadata}
            onNewAssessment={handleNewAssessment}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-b from-slate-50 to-slate-100 border-t border-slate-200 mt-20">
        <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            {/* Logo */}
            <div className="flex items-center justify-center gap-2.5 mb-4">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 bg-gradient-to-br from-teal-600 to-teal-700 rounded-full shadow-lg shadow-teal-500/50"></div>
                <div className="w-2 h-2 bg-gradient-to-br from-teal-500 to-teal-600 rounded-full"></div>
                <div className="w-1.5 h-1.5 bg-gradient-to-br from-teal-400 to-teal-500 rounded-full"></div>
              </div>
              <span className="text-xl font-bold text-slate-900">Spectrum</span>
            </div>
            <p className="text-base font-semibold text-slate-700 mb-2">
              Vendor intelligence at the speed of business
            </p>
            <p className="text-sm text-slate-500 max-w-md mx-auto">
              AI-powered due diligence for modern procurement teams. Assess vendor risk in seconds, not weeks.
            </p>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span className="font-medium">SOC 2 Compliant</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <svg className="w-5 h-5 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span className="font-medium">Enterprise Security</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span className="font-medium">Real-time Analysis</span>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center pt-6 border-t border-slate-200">
            <p className="text-xs text-slate-400">
              &copy; {new Date().getFullYear()} Spectrum. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
