import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import VendorPortfolio from './components/VendorPortfolio';
import VendorDetail from './pages/VendorDetail';
import ReportViewer from './pages/ReportViewer';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/portfolio" element={<VendorPortfolio />} />
      <Route path="/portfolio/:vendorId" element={<VendorDetail />} />
      <Route path="/report/:vendorId" element={<ReportViewer />} />
    </Routes>
  );
}

export default App;
