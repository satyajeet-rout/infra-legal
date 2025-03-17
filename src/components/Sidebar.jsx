
// import { ChevronRight, FileText, Search, PenTool } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { useNavigate, NavLink } from "react-router-dom";
// import { FiLogOut } from "react-icons/fi";

// const Sidebar = ({ onLogout, onSidebarToggle, isExpanded }) => {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.removeItem("auth");
//     onLogout();
//     navigate("/");
//   };

//   const handleIntegrationNavigation = () => {
//     navigate("/integrations");
//   };

//   const pages = [
//     {
//       id: "extract",
//       title: "Extract",
//       icon: <FileText size={20} />,
//       url: "/ExtractChat",
//     },
//     {
//       id: "research",
//       title: "Research Memo",
//       icon: <Search size={20} />,
//       url: "/ResearchChat",
//     },
//     {
//       id: "autodraft",
//       title: "AutoDraft",
//       icon: <PenTool size={20} />,
//       url: "/AutoDraftChat",
//     },
//         {
//       id: "newshub",
//       title: "Legal News HUB",
//       icon: <PenTool size={20} />,
//       url: "/newshub",
//     },
//     // {
//     //   id: "Ai Legal Research",
//     //   title: "Ai Legal Research",
//     //   icon: <Search size={20} />,
//     //   url: "/legalresearch",
//     // },
//   ];

//   return (
//     <div className="flex h-screen bg-gray-100 border">
//       <div
//         className={`bg-white h-full shadow-lg transition-all duration-300 flex flex-col ${
//           isExpanded ? "w-48" : "w-20"
//         }`}
//       >
//         <div className="p-4 border-b">
//           <div className="flex items-center justify-between">
//             {isExpanded && (
//               <img
//                 src="https://www.infrahive.ai/_next/image?url=%2Fimages%2Flogo%2Flogo.png&w=640&q=75"
//                 className="w-[100px] mx-auto"
//                 alt="Logo"
//               />
//             )}
//             <Button
//               variant="ghost"
//               size="icon"
//               onClick={() => onSidebarToggle(!isExpanded)}
//               className="ml-auto"
//             >
//               {isExpanded ? (
//                 <ChevronRight />
//               ) : (
//                 <img
//                   src="https://infrahive-ai-search.vercel.app/Logo%20(Digest).png"
//                   className="w-[40px] mx-auto"
//                   alt="Mini logo"
//                 />
//               )}
//             </Button>
//           </div>
//         </div>

//         <nav className="flex-1 p-2">
//           {pages.map((page) => (
//             <NavLink
//               to={page.url}
//               key={page.id}
//               className={({ isActive }) => `
//                 flex items-center w-full p-2 my-1 rounded-lg cursor-pointer
//                 transition-colors duration-200
//                 ${isActive ? "bg-blue-50 text-blue-600" : "hover:bg-gray-100"}
//                 ${isExpanded ? "px-4" : "px-2 justify-center"}
//               `}
//             >
//               <div className="min-w-[24px]">{page.icon}</div>
//               {isExpanded && <span className="ml-3 text-sm">{page.title}</span>}
//             </NavLink>
//           ))}
//         </nav>

//         <div className="p-2 mt-auto">
//           <NavLink
//             to="integrations"
//             key="integration"
//             className="flex items-center justify-center w-full text-black hover:text-white hover:bg-slate-100 rounded-lg p-2 transition-all"
//           >
//             <img
//               src="assets/integration.png"
//               className="w-5 h-5"
//               alt="Integration Icon"
//             />
//             {isExpanded && <span className="ml-3 text-black">Integrations</span>}
//           </NavLink>
//         </div>

//         <div className="p-2 mt-auto">
//           <button
//             onClick={handleLogout}
//             className="flex items-center justify-center w-full text-red-600 hover:text-white bg-red-100 hover:bg-red-600 rounded-lg p-2 transition-all"
//           >
//             <FiLogOut className="text-xl" />
//             {isExpanded && <span className="ml-3">Logout</span>}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;



// import { ChevronRight, FileText, Search, PenTool, Bell } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { useNavigate, NavLink } from "react-router-dom";
// import { FiLogOut } from "react-icons/fi";

// const Sidebar = ({ onLogout, onSidebarToggle, isExpanded, onNewsHubClick }) => {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.removeItem("auth");
//     onLogout();
//     navigate("/");
//   };

//   const handleIntegrationNavigation = () => {
//     navigate("/integrations");
//   };

//   const handleNewsHubClick = () => {
//     // Call the provided callback to notify parent component
//     if (onNewsHubClick) {
//       onNewsHubClick();
//     }
//     navigate("/newshub");
//   };

//   const pages = [
//     {
//       id: "extract",
//       title: "Extract",
//       icon: <FileText size={20} />,
//       url: "/ExtractChat",
//     },
//     {
//       id: "research",
//       title: "Research Memo",
//       icon: <Search size={20} />,
//       url: "/ResearchChat",
//     },
//     {
//       id: "autodraft",
//       title: "AutoDraft",
//       icon: <PenTool size={20} />,
//       url: "/AutoDraftChat",
//     },
//     {
//       id: "newshub",
//       title: "Legal News HUB",
//       icon: <Bell size={20} />,
//       onClick: handleNewsHubClick, // Use onClick instead of url
//     },
    
//   ];

//   return (
//     <div className="flex h-screen bg-gray-100 border">
//       <div
//         className={`bg-white h-full shadow-lg transition-all duration-300 flex flex-col ${
//           isExpanded ? "w-48" : "w-20"
//         }`}
//       >
//         <div className="p-4 border-b">
//           <div className="flex items-center justify-between">
//             {isExpanded && (
//               <img
//                 src="https://www.infrahive.ai/_next/image?url=%2Fimages%2Flogo%2Flogo.png&w=640&q=75"
//                 className="w-[100px] mx-auto"
//                 alt="Logo"
//               />
//             )}
//             <Button
//               variant="ghost"
//               size="icon"
//               onClick={() => onSidebarToggle(!isExpanded)}
//               className="ml-auto"
//             >
//               {isExpanded ? (
//                 <ChevronRight />
//               ) : (
//                 <img
//                   src="https://infrahive-ai-search.vercel.app/Logo%20(Digest).png"
//                   className="w-[40px] mx-auto"
//                   alt="Mini logo"
//                 />
//               )}
//             </Button>
//           </div>
//         </div>

//         <nav className="flex-1 p-2">
//           {pages.map((page) => (
//             page.onClick ? (
//               // Button for items with onClick handler (NewsHub)
//               <button
//                 key={page.id}
//                 onClick={page.onClick}
//                 className={`
//                   flex items-center w-full p-2 my-1 rounded-lg cursor-pointer
//                   transition-colors duration-200 hover:bg-gray-100
//                   ${isExpanded ? "px-4" : "px-2 justify-center"}
//                 `}
//               >
//                 <div className="min-w-[24px]">{page.icon}</div>
//                 {isExpanded && <span className="ml-3 text-sm">{page.title}</span>}
//               </button>
//             ) : (
//               // NavLink for regular navigation items
//               <NavLink
//                 to={page.url}
//                 key={page.id}
//                 className={({ isActive }) => `
//                   flex items-center w-full p-2 my-1 rounded-lg cursor-pointer
//                   transition-colors duration-200
//                   ${isActive ? "bg-blue-50 text-blue-600" : "hover:bg-gray-100"}
//                   ${isExpanded ? "px-4" : "px-2 justify-center"}
//                 `}
//               >
//                 <div className="min-w-[24px]">{page.icon}</div>
//                 {isExpanded && <span className="ml-3 text-sm">{page.title}</span>}
//               </NavLink>
//             )
//           ))}
//         </nav>

//         <div className="p-2 mt-auto">
//           <NavLink
//             to="integrations"
//             key="integration"
//             className="flex items-center justify-center w-full text-black hover:text-white hover:bg-slate-100 rounded-lg p-2 transition-all"
//           >
//             <img
//               src="assets/integration.png"
//               className="w-5 h-5"
//               alt="Integration Icon"
//             />
//             {isExpanded && <span className="ml-3 text-black">Integrations</span>}
//           </NavLink>
//         </div>

//         <div className="p-2 mt-auto">
//           <button
//             onClick={handleLogout}
//             className="flex items-center justify-center w-full text-red-600 hover:text-white bg-red-100 hover:bg-red-600 rounded-lg p-2 transition-all"
//           >
//             <FiLogOut className="text-xl" />
//             {isExpanded && <span className="ml-3">Logout</span>}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;



// components/Sidebar.jsx
import { ChevronRight, FileText, Search, PenTool, Bell, Home, Database } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate, NavLink } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";

const Sidebar = ({ 
  onLogout, 
  onSidebarToggle, 
  isExpanded, 
  onNewsHubClick, 
  onLegalAIResearchClick,
  onCourtDashboardClick 
}) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("auth");
    onLogout();
    navigate("/");
  };

  const handleIntegrationNavigation = () => {
    navigate("/integrations");
  };

  const handleNewsHubClick = () => {
    // Call the provided callback to notify parent component
    if (onNewsHubClick) {
      onNewsHubClick();
    }
  };

  const handleLegalAIResearchClick = () => {
    // Call the provided callback to notify parent component
    if (onLegalAIResearchClick) {
      onLegalAIResearchClick();
    }
  };

  const handleCourtDashboardClick = () => {
    // Call the provided callback to notify parent component
    if (onCourtDashboardClick) {
      onCourtDashboardClick();
    }
  };

  const pages = [
    {
      id: "extract",
      title: "Extract",
      icon: <FileText size={20} />,
      url: "/ExtractChat",
    },
    {
      id: "research",
      title: "Research Memo",
      icon: <Search size={20} />,
      url: "/ResearchChat",
    },
    {
      id: "autodraft",
      title: "AutoDraft",
      icon: <PenTool size={20} />,
      url: "/AutoDraftChat",
    },
    {
      id: "newshub",
      title: "Legal News HUB",
      icon: <Bell size={20} />,
      onClick: handleNewsHubClick, // Use onClick instead of url
    },
    {
      id: "legalairesearch",
      title: "Legal AI Research",
      icon: <Database size={20} />,
      onClick: handleLegalAIResearchClick, // Use onClick instead of url
    },
  ];

  return (
    <div className="flex h-screen bg-gray-100 border">
      <div
        className={`bg-white h-full shadow-lg transition-all duration-300 flex flex-col ${
          isExpanded ? "w-48" : "w-20"
        }`}
      >
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            {isExpanded && (
              <img
                src="https://www.infrahive.ai/_next/image?url=%2Fimages%2Flogo%2Flogo.png&w=640&q=75"
                className="w-[100px] mx-auto"
                alt="Logo"
              />
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onSidebarToggle(!isExpanded)}
              className="ml-auto"
            >
              {isExpanded ? (
                <ChevronRight />
              ) : (
                <img
                  src="https://infrahive-ai-search.vercel.app/Logo%20(Digest).png"
                  className="w-[40px] mx-auto"
                  alt="Mini logo"
                />
              )}
            </Button>
          </div>
        </div>

        <nav className="flex-1 p-2">
          {pages.map((page) => (
            page.onClick ? (
              // Button for items with onClick handler (NewsHub, LegalAIResearch, CourtDashboard)
              <button
                key={page.id}
                onClick={page.onClick}
                className={`
                  flex items-center w-full p-2 my-1 rounded-lg cursor-pointer
                  transition-colors duration-200 hover:bg-gray-100
                  ${isExpanded ? "px-4" : "px-2 justify-center"}
                `}
              >
                <div className="min-w-[24px]">{page.icon}</div>
                {isExpanded && <span className="ml-3 text-sm">{page.title}</span>}
              </button>
            ) : (
              // NavLink for regular navigation items
              <NavLink
                to={page.url}
                key={page.id}
                className={({ isActive }) => `
                  flex items-center w-full p-2 my-1 rounded-lg cursor-pointer
                  transition-colors duration-200
                  ${isActive ? "bg-blue-50 text-blue-600" : "hover:bg-gray-100"}
                  ${isExpanded ? "px-4" : "px-2 justify-center"}
                `}
              >
                <div className="min-w-[24px]">{page.icon}</div>
                {isExpanded && <span className="ml-3 text-sm">{page.title}</span>}
              </NavLink>
            )
          ))}
        </nav>

        <div className="p-2 mt-auto">
          <NavLink
            to="integrations"
            key="integration"
            className="flex items-center justify-center w-full text-black hover:text-white hover:bg-slate-100 rounded-lg p-2 transition-all"
          >
            <img
              src="assets/integration.png"
              className="w-5 h-5"
              alt="Integration Icon"
            />
            {isExpanded && <span className="ml-3 text-black">Integrations</span>}
          </NavLink>
        </div>

        <div className="p-2 mt-auto">
          <button
            onClick={handleLogout}
            className="flex items-center justify-center w-full text-red-600 hover:text-white bg-red-100 hover:bg-red-600 rounded-lg p-2 transition-all"
          >
            <FiLogOut className="text-xl" />
            {isExpanded && <span className="ml-3">Logout</span>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;