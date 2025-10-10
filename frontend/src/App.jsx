import { useState } from 'react';
import AssessmentForm from './components/AssessmentForm';
import QuickDemoButtons from './components/QuickDemoButtons';
import LoadingState from './components/LoadingState';
import RiskDashboard from './components/RiskDashboard';
import UseCases from './components/UseCases';

// Use environment variable for API URL with fallback
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';

function App() {
  const [state, setState] = useState({
    isLoading: false,
    error: null,
    assessment: null,
    metadata: null,
  });
  const [selectedCompany, setSelectedCompany] = useState(null);

  const assessCompanyRisk = async (formData) => {
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
      <header className="bg-white border-b border-gray-100 backdrop-blur-lg bg-opacity-90 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-5 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2.5">
                <div className="relative">
                  <div className="w-3 h-3 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full shadow-lg shadow-blue-500/50"></div>
                  <div className="absolute inset-0 w-3 h-3 bg-blue-600 rounded-full animate-ping opacity-20"></div>
                </div>
                <div className="w-2.5 h-2.5 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full shadow-md shadow-blue-400/40"></div>
                <div className="w-2 h-2 bg-gradient-to-br from-blue-400 to-blue-500 rounded-full shadow-sm shadow-blue-300/30"></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 tracking-tight bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text">
                  Spectrum
                </h1>
                <p className="text-xs text-gray-500 font-medium">Vendor Due Diligence</p>
              </div>
            </div>
            {state.assessment && (
              <button
                onClick={handleNewAssessment}
                className="px-4 py-2 text-sm text-gray-700 hover:text-blue-600 font-semibold transition-all duration-200 hover:bg-blue-50 rounded-lg"
              >
                + New Assessment
              </button>
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
              <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-4 tracking-tight">
                Vendor Due Diligence
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Fast risk assessment for suppliers, vendors, and partners
              </p>
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

            {/* Use Cases Section - Only show on landing page */}
            <UseCases />
          </>
        )}

        {/* Loading State */}
        {state.isLoading && <LoadingState />}

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
      <footer className="bg-gradient-to-r from-gray-50 to-white border-t border-gray-100 mt-20">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm font-semibold text-gray-700 mb-1">
              Vendor intelligence at the speed of business
            </p>
            <p className="text-xs text-gray-500">
              Fast risk assessment for your supply chain
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;