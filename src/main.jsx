// import { StrictMode, useState, useEffect } from 'react';
// import { createRoot } from 'react-dom/client';
// import './index.css';
// import {
//   Route,
//   RouterProvider,
//   createBrowserRouter,
//   createRoutesFromElements,
//   Navigate,
// } from 'react-router-dom';

// import Dashboard from './components/Dashboard';
// import Layout from './components/Layout';
// import ResearchChat from './components/ResearchChat';
// import ExtractChat from './components/ExtractChat';
// import DraftChat from './components/DraftChat';
// import { LoginPage } from './components/LoginPage';
// import KnowledgeCards from './components/Integration';
// import { knowledgeData } from './lib/utils';
// import OnecleChat from './components/OnecleChat';
// import RbiChat from './components/RbiChat';
// import Extract from './extract/Extract';
// import ChatInterface from './components/ResearchChat';
// import { ContentProvider } from './context/contentContext';
// import HighCourtDashboard from './LegalResearch/HighCourtDashboard';

// // Mock password encryption for demo purposes
// const ENCRYPTED_PASSWORD = btoa(import.meta.env.VITE_DEMO_PASS); 

// console.log("Demo PAssword ins main",import.meta.env.DEMO_PASS)

// // Main App Component with authentication state
// const App = () => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   useEffect(() => {
//     // Check local storage for authentication status
//     const auth = localStorage.getItem('auth');
//     setIsAuthenticated(auth === 'true');
//   }, []);

//   const handleLogin = (password) => {
//     if (btoa(password) === ENCRYPTED_PASSWORD) {
//       localStorage.setItem('auth', 'true'); // Save auth status
//       setIsAuthenticated(true);
//     } else {
//       alert('Invalid password'); // Simple feedback for demo
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('auth'); // Clear authentication data
//     setIsAuthenticated(false);
//   };

//   // Protected Route Wrapper
//   const ProtectedRoute = ({ children }) => {
//     if (!isAuthenticated) {
//       return <Navigate to="/" />;
//     }
//     return children;
//   };

//   // Define the Router
//   const router = createBrowserRouter(
//     createRoutesFromElements(
//       <Route>
//         {/* Login Route */}
//         <Route path="/" element={<LoginPage onLogin={handleLogin} />} />
        
//         {/* Protected Routes */}
//         <Route 
//           path="/" 
//           element={<Layout onLogout={handleLogout} />} 
//         >
//           <Route
//             index
//             element={
//               <ProtectedRoute>
//                 <Dashboard />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="ExtractChat"
//             element={
//               <ProtectedRoute>
//                 {/* <ExtractChat /> */}
//                 <Extract/>
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="ResearchChat"
//             element={
//               <ProtectedRoute>
//                 {/* <ResearchChat /> */}
//                 <ChatInterface/>
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="AutoDraftChat"
//             element={
//               <ProtectedRoute>
//                 <DraftChat />
//               </ProtectedRoute>
//             }
//           />
//            <Route
//             path="integrations"
//             element={
//               <ProtectedRoute>
//                 <KnowledgeCards data={knowledgeData} />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="oneclechat"
//             element={
//               <ProtectedRoute>
//                 <OnecleChat />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="legalresearch"
//             element={
//               <ProtectedRoute>
//                 <HighCourtDashboard />
//               </ProtectedRoute>
//             }
//           />
//            <Route
//             path="integration/rbi-chat"
//             element={
//               <ProtectedRoute>
//                 <RbiChat />
//               </ProtectedRoute>
//             }
//           />
//           {/* Redirect unmatched routes */}
//           <Route path="*" element={<Navigate to="/" />} />
//         </Route>
//       </Route>
//     )
//   );

//   return <RouterProvider router={router} />;
// };

// // Render the App
// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <ContentProvider>
//       <App />
//     </ContentProvider>
//   </StrictMode>
// );




import { StrictMode, useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  Navigate,
  Outlet,
  useLocation,
  useNavigate
} from 'react-router-dom';

import Dashboard from './components/Dashboard';
import Layout from './components/Layout';
import ExtractChat from './components/ExtractChat';
import DraftChat from './components/DraftChat';
import { LoginPage } from './components/LoginPage';
import KnowledgeCards from './components/Integration';
import { knowledgeData } from './lib/utils';
import OnecleChat from './components/OnecleChat';
import RbiChat from './components/RbiChat';
import Extract from './extract/Extract';
import ChatInterface from './components/ResearchChat';
import { ContentProvider } from './context/contentContext';
import HighCourtDashboard from './LegalResearch/HighCourtDashboard';
import News from './news/News';
import LegalAiResearch from './LegalAIResearch/LegalAiResearch';

// Simplified password handling
const DEMO_PASSWORD = 'admin'; // Fallback password for development
const ENCRYPTED_PASSWORD = btoa(import.meta.env.VITE_DEMO_PASS || DEMO_PASSWORD);

// Auth Provider Component
const AuthWrapper = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  // Check authentication on initial load
  useEffect(() => {
    const auth = localStorage.getItem('auth');
    setIsAuthenticated(auth === 'true');
    setIsChecking(false);
    
    // Handle direct URL navigation
    if (auth === 'true' && location.pathname === '/') {
      navigate('/dashboard');
    }
  }, [location.pathname, navigate]);

  // Login handler
  const handleLogin = (password) => {
    if (btoa(password) === ENCRYPTED_PASSWORD || password === DEMO_PASSWORD) {
      localStorage.setItem('auth', 'true');
      setIsAuthenticated(true);
      
      // Navigate to the original URL if available, otherwise to dashboard
      const intendedPath = sessionStorage.getItem('intendedPath') || '/dashboard';
      sessionStorage.removeItem('intendedPath');
      navigate(intendedPath);
      return true;
    } else {
      alert('Invalid password');
      return false;
    }
  };

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem('auth');
    setIsAuthenticated(false);
    navigate('/');
  };

  // Show loading state
  if (isChecking) {
    return <div>Loading...</div>;
  }

  // Display login if not authenticated
  if (!isAuthenticated && location.pathname !== '/') {
    // Save the intended path for after login
    sessionStorage.setItem('intendedPath', location.pathname);
    return <Navigate to="/" replace />;
  }

  // Pass auth state and handlers to children
  return children({ 
    isAuthenticated, 
    handleLogin, 
    handleLogout 
  });
};

// Main App Component
const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AuthContainer />,
      children: [
        {
          index: true,
          element: <LoginWrapper />
        },
        {
          path: "dashboard",
          element: <Dashboard />
        },
        {
          path: "ExtractChat",
          element: <Extract />
        },
        {
          path: "ResearchChat",
          element: <ChatInterface />
        },
        {
          path: "AutoDraftChat",
          element: <DraftChat />
        },
        {
          path: "integrations",
          element: <KnowledgeCards data={knowledgeData} />
        },
        {
          path: "oneclechat",
          element: <OnecleChat />
        },
        {
          path: "newshub",
          element: <News />
        },
        {
          path: "legal_ai_research",
          element: <LegalAiResearch />
        },
        {
          path: "legalresearch",
          element: <HighCourtDashboard />
        },
        {
          path: "integration/rbi-chat",
          element: <RbiChat />
        },
        {
          path: "*",
          element: <Navigate to="/dashboard" replace />
        }
      ]
    }
  ]);

  return <RouterProvider router={router} />;
};

// Login wrapper component
const LoginWrapper = () => {
  return (
    <AuthWrapper>
      {({ isAuthenticated, handleLogin }) => 
        isAuthenticated ? 
          <Navigate to="/dashboard" /> : 
          <LoginPage onLogin={handleLogin} />
      }
    </AuthWrapper>
  );
};

// Auth container component
const AuthContainer = () => {
  return (
    <AuthWrapper>
      {({ isAuthenticated, handleLogout }) => 
        isAuthenticated && window.location.pathname !== '/' ? 
          <Layout onLogout={handleLogout}>
            <Outlet />
          </Layout> : 
          <Outlet />
      }
    </AuthWrapper>
  );
};

// Render the App
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ContentProvider>
      <App />
    </ContentProvider>
  </StrictMode>
);