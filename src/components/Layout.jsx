


// components/Layout.jsx
import { useState, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { LoginPage } from "./LoginPage";
import { ChevronLeft } from "lucide-react";

const ENCRYPTED_PASSWORD = btoa(import.meta.env.VITE_DEMO_PASS);

function Layout() {
  const [localUser, setLocalUser] = useState(localStorage.getItem("auth"));
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  
  // Initialize state from localStorage or from path
  const location = useLocation();
  const initialNewsHubActive = localStorage.getItem("isNewsHubActive") === "true" || location.pathname === "/newshub";
  const initialLegalAIResearchActive = localStorage.getItem("isLegalAIResearchActive") === "true" || location.pathname === "/legal_ai_research";
  const initialCourtDashboardActive = localStorage.getItem("isCourtDashboardActive") === "true" || location.pathname === "/CourtDashboard";
  
  const [isNewsHubActive, setIsNewsHubActive] = useState(initialNewsHubActive);
  const [isLegalAIResearchActive, setIsLegalAIResearchActive] = useState(initialLegalAIResearchActive);
  const [isCourtDashboardActive, setIsCourtDashboardActive] = useState(initialCourtDashboardActive);
  
  const navigate = useNavigate();

  useEffect(() => {
    const authStatus = localStorage.getItem("auth");
    setLocalUser(authStatus === "true");
    
    // Reset full-page states if navigating away
    if (location.pathname !== "/newshub" && isNewsHubActive) {
      setIsNewsHubActive(false);
      localStorage.removeItem("isNewsHubActive");
    }
    
    if (location.pathname !== "/legal_ai_research" && isLegalAIResearchActive) {
      setIsLegalAIResearchActive(false);
      localStorage.removeItem("isLegalAIResearchActive");
    }
    
    if (location.pathname !== "/CourtDashboard" && isCourtDashboardActive) {
      setIsCourtDashboardActive(false);
      localStorage.removeItem("isCourtDashboardActive");
    }
    
    // Set localStorage based on current path if not already set
    if (location.pathname === "/newshub" && !isNewsHubActive) {
      setIsNewsHubActive(true);
      localStorage.setItem("isNewsHubActive", "true");
    }
    
    if (location.pathname === "/legal_ai_research" && !isLegalAIResearchActive) {
      setIsLegalAIResearchActive(true);
      localStorage.setItem("isLegalAIResearchActive", "true");
    }
    
    if (location.pathname === "/CourtDashboard" && !isCourtDashboardActive) {
      setIsCourtDashboardActive(true);
      localStorage.setItem("isCourtDashboardActive", "true");
    }
  }, [location.pathname, isNewsHubActive, isLegalAIResearchActive, isCourtDashboardActive]);

  const handleLogin = (password) => {
    if (btoa(password) === ENCRYPTED_PASSWORD) {
      localStorage.setItem("auth", "true");
      window.location.reload();
      setLocalUser(true);
    } else {
      alert("Invalid password or Username");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("auth");
    localStorage.removeItem("isNewsHubActive");
    localStorage.removeItem("isLegalAIResearchActive");
    localStorage.removeItem("isCourtDashboardActive");
    setLocalUser(false);
  };

  const handleSidebarToggle = (expanded) => {
    setIsSidebarExpanded(expanded);
  };

  const handleNewsHubClick = () => {
    setIsNewsHubActive(true);
    localStorage.setItem("isNewsHubActive", "true");
    navigate("/newshub");
  };

  const handleLegalAIResearchClick = () => {
    setIsLegalAIResearchActive(true);
    localStorage.setItem("isLegalAIResearchActive", "true");
    navigate("/legal_ai_research");
  };

  const handleCourtDashboardClick = () => {
    setIsCourtDashboardActive(true);
    localStorage.setItem("isCourtDashboardActive", "true");
    navigate("/CourtDashboard");
  };

  const handleReturnFromFullPage = () => {
    // Determine which full-page mode is active and reset it
    if (isNewsHubActive) {
      setIsNewsHubActive(false);
      localStorage.removeItem("isNewsHubActive");
      navigate("/");
    } else if (isLegalAIResearchActive) {
      setIsLegalAIResearchActive(false);
      localStorage.removeItem("isLegalAIResearchActive");
      navigate("/");
    } else if (isCourtDashboardActive) {
      setIsCourtDashboardActive(false);
      localStorage.removeItem("isCourtDashboardActive");
      navigate("/");
    }
  };

  // Only consider CourtDashboard as a full-page mode that hides sidebar
  const shouldHideSidebar = isCourtDashboardActive;

  return (
    <div className="flex">
      {localUser && !shouldHideSidebar && (
        <div className="overflow-hidden z-50 fixed">
          <Sidebar 
            onLogout={handleLogout} 
            onSidebarToggle={handleSidebarToggle}
            isExpanded={isSidebarExpanded}
            onNewsHubClick={handleNewsHubClick}
            onLegalAIResearchClick={handleLegalAIResearchClick}
            onCourtDashboardClick={handleCourtDashboardClick}
          />
        </div>
      )}

      {!localUser && <LoginPage onLogin={handleLogin} />}

      {localUser && (
        <div 
          className="overflow-y-scroll w-full transition-all duration-300"
          style={{ 
            marginLeft: shouldHideSidebar ? "0" : (isSidebarExpanded ? "192px" : "80px")
          }}
        >
          {/* Back button for Court Dashboard */}
          {isCourtDashboardActive && (
            <button 
              onClick={handleReturnFromFullPage} 
              className="fixed top-4 left-4 z-50 flex items-center gap-2 bg-white p-2 rounded-lg shadow-md hover:bg-gray-100 transition-colors"
            >
              <ChevronLeft size={20} />
              <span>Back</span>
            </button>
          )}
          <Outlet context={{ 
            isNewsHubActive, 
            isLegalAIResearchActive, 
            isCourtDashboardActive 
          }} />
        </div>
      )}
    </div>
  );
}

export default Layout;