


// import React, { useState } from "react";
// import { Search } from "lucide-react";

// const HighCourtPartySearchPage = () => {
//   const [partyNameInput, setPartyNameInput] = useState("");
//   const [stage, setStage] = useState("BOTH");
//   const [year, setYear] = useState(new Date().getFullYear().toString());
//   const [benchId, setBenchId] = useState("");
//   const [searchResults, setSearchResults] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [searchPerformed, setSearchPerformed] = useState(false);

//   // Generate years for dropdown (last 30 years)
//   const currentYear = new Date().getFullYear();
//   const years = Array.from({ length: 30 }, (_, i) => (currentYear - i).toString());

//   // Function to fetch case data
//   const fetchCaseData = async () => {
//     if (!partyNameInput.trim()) return;

//     setIsLoading(true);
//     setError(null);

//     try {
//       // const response = await fetch(`/court-api/eciapi/17/high-court/search/party`, {
//       const response = await fetch(`https://mocki.io/v1/adb98e9c-b30b-4f81-aed5-c794618b7b19`, {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: "ECIAPI-XXaRks8npWTVUXpFpYc6nGj88cwPMq25",
//         },
//         // body: JSON.stringify({
//         //   name: partyNameInput,
//         //   stage: stage,
//         //   year: year,
//         //   benchId: benchId,
//         // }),
//       });

//       if (!response.ok) {
//         throw new Error(`Error ${response.status}: ${response.statusText}`);
//       }

//       const data = await response.json();
//       setSearchResults(data);
//       setSearchPerformed(true);
//     } catch (err) {
//       setError(err.message || "An error occurred during search");
//       setSearchResults(null);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     fetchCaseData();
//   };

//   // Clear results when search criteria changes
//   const handleInputChange = (e, setter) => {
//     setter(e.target.value);
//     if (searchPerformed) {
//       setSearchResults(null);
//       setSearchPerformed(false);
//     }
//   };

//   return (
//     <div className="p-6">
//       <h2 className="text-xl font-semibold mb-4">High Court Cases by Party Name</h2>
//       <div className="bg-white p-6 rounded-md border border-gray-200 max-w-xl shadow-sm">
//         <form onSubmit={handleSubmit}>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//             <div className="col-span-2">
//               <label htmlFor="party-input" className="block text-sm font-medium mb-1 text-gray-700">
//                 Party Name
//               </label>
//               <input
//                 type="text"
//                 id="party-input"
//                 value={partyNameInput}
//                 onChange={(e) => handleInputChange(e, setPartyNameInput)}
//                 className="w-full border border-gray-200 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-blue-600"
//                 placeholder="Enter party name"
//                 required
//               />
//             </div>

//             <div>
//               <label htmlFor="stage-select" className="block text-sm font-medium mb-1 text-gray-700">
//                 Stage
//               </label>
//               <select
//                 id="stage-select"
//                 value={stage}
//                 onChange={(e) => handleInputChange(e, setStage)}
//                 className="w-full border border-gray-200 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-blue-600"
//               >
//                 <option value="BOTH">BOTH</option>
//                 <option value="PENDING">PENDING</option>
//                 <option value="DISPOSED">DISPOSED</option>
//               </select>
//             </div>

//             <div>
//               <label htmlFor="year-select" className="block text-sm font-medium mb-1 text-gray-700">
//                 Year
//               </label>
//               <select
//                 id="year-select"
//                 value={year}
//                 onChange={(e) => handleInputChange(e, setYear)}
//                 className="w-full border border-gray-200 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-blue-600"
//               >
//                 {years.map((y) => (
//                   <option key={y} value={y}>
//                     {y}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <div>
//               <label htmlFor="bench-id" className="block text-sm font-medium mb-1 text-gray-700">
//                 Bench ID
//               </label>
//               <input
//                 type="text"
//                 id="bench-id"
//                 value={benchId}
//                 onChange={(e) => handleInputChange(e, setBenchId)}
//                 className="w-full border border-gray-200 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-blue-600"
//                 placeholder="Enter bench ID"
//                 required
//               />
//             </div>

//             <div className="md:col-start-2 md:flex md:justify-end items-end">
//               <button
//                 type="submit"
//                 className="w-full md:w-auto bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
//                 disabled={isLoading || !partyNameInput.trim()}
//               >
//                 {isLoading ? (
//                   <span>Searching...</span>
//                 ) : (
//                   <>
//                     <Search size={16} />
//                     <span>Search</span>
//                   </>
//                 )}
//               </button>
//             </div>
//           </div>
//         </form>
//       </div>

//       {/* Results Section */}
//       {error && (
//         <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-md text-red-700">
//           {error}
//         </div>
//       )}

//       {isLoading && (
//         <div className="mt-6 p-4 text-center">
//           <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
//           <p className="mt-2 text-gray-600">Fetching results...</p>
//         </div>
//       )}

//       {searchResults && (
//         <div className="mt-6">
//           <h3 className="text-lg font-medium mb-3">Search Results</h3>

//           {searchResults.length === 0 ? (
//             <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 text-yellow-700">
//               No results found for your search criteria.
//             </div>
//           ) : (
//             <div className="bg-white rounded-md border border-gray-200 shadow-sm overflow-x-auto">
//               <table className="w-full border-collapse">
//                 <thead>
//                   <tr className="bg-gray-100">
//                     <th className="border-b border-gray-200 p-3 text-left">CNR</th>
//                     <th className="border-b border-gray-200 p-3 text-left">Case Number</th>
//                     <th className="border-b border-gray-200 p-3 text-left">Title</th>
//                     <th className="border-b border-gray-200 p-3 text-left">Type</th>
//                     <th className="border-b border-gray-200 p-3 text-left">Decision Date</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {searchResults.map((result, index) => (
//                     <tr key={index} className="hover:bg-gray-50">
//                       <td className="border-b border-gray-200 p-3">{result.cnr}</td>
//                       <td className="border-b border-gray-200 p-3">{result.caseNumber}</td>
//                       <td className="border-b border-gray-200 p-3">{result.title}</td>
//                       <td className="border-b border-gray-200 p-3">{result.type}</td>
//                       <td className="border-b border-gray-200 p-3">{result.decisionDate}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>
//       )}

//       {searchPerformed && !searchResults && !isLoading && !error && (
//         <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-md p-4 text-yellow-700">
//           No results could be retrieved. Please try modifying your search criteria.
//         </div>
//       )}
//     </div>
//   );
// };

// export default HighCourtPartySearchPage;











// import React, { useState } from 'react';
// import { Search, X, ExternalLink } from 'lucide-react';

// const HighCourtSearchPage = ({ court, partyNameInput, setPartyNameInput, handlePartySearch }) => {
//   const [stage, setStage] = useState('PENDING');
//   const [type, setType] = useState('ANY');
//   const [year, setYear] = useState(new Date().getFullYear().toString());
//   const [searchResults, setSearchResults] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [showCaseDetails, setShowCaseDetails] = useState(false);
//   const [caseDetails, setCaseDetails] = useState(null);
//   const [isLoadingDetails, setIsLoadingDetails] = useState(false);
//   const [loadingDetailId, setLoadingDetailId] = useState(null);
//   const [detailsError, setDetailsError] = useState(null);
//   const [activeTab, setActiveTab] = useState('overview');

//   // Generate years for dropdown (last 30 years)
//   const currentYear = new Date().getFullYear();
//   const years = Array.from({ length: 30 }, (_, i) => (currentYear - i).toString());

//   // Function to format date to display in a readable format
//   const formatDate = (dateString) => {
//     if (!dateString) return 'N/A';
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-IN', {
//       day: '2-digit',
//       month: 'short',
//       year: 'numeric'
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setError(null);
    
//     try {
//       const response = await fetch(`https://infrahive-ai-legal-research-gyfsavdfd0c9ehh5.centralindia-01.azurewebsites.net/legal-infrahive/high-court/search/party/`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           name: partyNameInput,
//           stage: stage,
//           type: type,
//           year: year
//         }),
//       });
      
//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }
      
//       const data = await response.json();
//       setSearchResults(data);
//     } catch (err) {
//       setError(err.message || 'An error occurred during search');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Function to handle View Details button click
//   const handleViewDetails = async (cnr, rowIndex) => {
//     setIsLoadingDetails(true);
//     setLoadingDetailId(rowIndex);
//     setDetailsError(null);
//     setActiveTab('overview');
    
//     try {
//       const response = await fetch(`https://infrahive-ai-legal-research-gyfsavdfd0c9ehh5.centralindia-01.azurewebsites.net/legal-infrahive/high-court/case/`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           cnr: cnr
//         }),
//       });
      
//       if (!response.ok) {
//         throw new Error('Failed to fetch case details');
//       }
      
//       const data = await response.json();
//       setCaseDetails(data);
//       setShowCaseDetails(true);
//     } catch (err) {
//       setDetailsError(err.message || 'Failed to fetch case details');
//     } finally {
//       setIsLoadingDetails(false);
//       setLoadingDetailId(null);
//     }
//   };
  
//   const closeDetailsPopup = () => {
//     setShowCaseDetails(false);
//     setCaseDetails(null);
//     setDetailsError(null);
//   };
  
//   // Status badge component
//   const StatusBadge = ({ status }) => {
//     let bgColor = 'bg-yellow-100 text-yellow-800';
//     if (status === 'COMPLETED' || status === 'DISPOSED') {
//       bgColor = 'bg-green-100 text-green-800';
//     }
//     return (
//       <span className={`px-2 py-1 rounded-full text-xs font-medium ${bgColor}`}>
//         {status}
//       </span>
//     );
//   };
  
//   // Loading spinner component
//   const LoadingSpinner = () => (
//     <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
//   );
  
//   return (
//     <div className="p-6">
//       <h2 className="text-xl font-semibold mb-4">High Court Cases by Party Name</h2>
//       <div className="bg-white p-6 rounded-md border border-gray-200 max-w-xl">
//         <form onSubmit={handleSubmit}>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//             <div className="col-span-2">
//               <label htmlFor="party-input" className="block text-sm font-medium mb-1 text-gray-700">
//                 Party Name
//               </label>
//               <input 
//                 type="text" 
//                 id="party-input" 
//                 value={partyNameInput}
//                 onChange={(e) => setPartyNameInput(e.target.value)}
//                 className="w-full border border-gray-200 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-blue-600"
//                 placeholder="Enter party name"
//                 required
//               />
//             </div>
            
//             <div>
//               <label htmlFor="stage-select" className="block text-sm font-medium mb-1 text-gray-700">
//                 Stage
//               </label>
//               <select
//                 id="stage-select"
//                 value={stage}
//                 onChange={(e) => setStage(e.target.value)}
//                 className="w-full border border-gray-200 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-blue-600"
//               >
//                 <option value="PENDING">PENDING</option>
//                 <option value="COMPLETED">COMPLETED</option>
//               </select>
//             </div>
            
//             <div>
//               <label htmlFor="type-select" className="block text-sm font-medium mb-1 text-gray-700">
//                 Type
//               </label>
//               <select
//                 id="type-select"
//                 value={type}
//                 onChange={(e) => setType(e.target.value)}
//                 className="w-full border border-gray-200 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-blue-600"
//               >
//                 <option value="ANY">ANY</option>
//                 <option value="option 1">Option 1</option>
//                 <option value="option 2">Option 2</option>
//               </select>
//             </div>
            
//             <div>
//               <label htmlFor="year-select" className="block text-sm font-medium mb-1 text-gray-700">
//                 Year
//               </label>
//               <select
//                 id="year-select"
//                 value={year}
//                 onChange={(e) => setYear(e.target.value)}
//                 className="w-full border border-gray-200 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-blue-600"
//               >
//                 {years.map((y) => (
//                   <option key={y} value={y}>{y}</option>
//                 ))}
//               </select>
//             </div>
            
//             <div className="md:col-start-2 md:flex md:justify-end items-end">
//               <button 
//                 type="submit" 
//                 className="w-full md:w-auto bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
//                 disabled={isLoading}
//               >
//                 {isLoading ? (
//                   <div className="flex items-center space-x-2">
//                     <LoadingSpinner />
//                     <span>Searching...</span>
//                   </div>
//                 ) : (
//                   <>
//                     <Search size={16} />
//                     <span>Search</span>
//                   </>
//                 )}
//               </button>
//             </div>
//           </div>
//         </form>
//       </div>
//       {/* Loading Indicator */}
//       {isLoading && (
//         <div className="mt-6 flex items-center justify-center p-8">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
//         </div>
//       )}
      
//       {/* Error Message */}
//       {error && (
//         <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-md text-red-700">
//           {error}
//         </div>
//       )}
      
//       {/* Results Section */}
//       {!isLoading && searchResults && (
//         <div className="mt-6">
//           <h3 className="text-lg font-medium mb-3">Search Results</h3>
          
//           {searchResults.length === 0 ? (
//             <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 text-yellow-700">
//               No results found for your search criteria.
//             </div>
//           ) : (
//             <div className="overflow-x-auto">
//               <table className="w-full border-collapse">
//                 <thead>
//                   <tr className="bg-gray-100">
//                     <th className="border border-gray-200 p-2 text-left">#</th>
//                     <th className="border border-gray-200 p-2 text-left">CNR</th>
//                     <th className="border border-gray-200 p-2 text-left">Case Number</th>
//                     <th className="border border-gray-200 p-2 text-left">Petitioner</th>
//                     <th className="border border-gray-200 p-2 text-left">Respondent</th>
//                     <th className="border border-gray-200 p-2 text-left">Status</th>
//                     <th className="border border-gray-200 p-2 text-left">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {searchResults.map((result, index) => (
//                     <tr key={index} className="hover:bg-gray-50">
//                       <td className="border border-gray-200 p-2">{index + 1}</td>
//                       <td className="border border-gray-200 p-2">{result.cnr}</td>
//                       <td className="border border-gray-200 p-2 text-sm">{result.caseNumber || 'N/A'}</td>
//                       <td className="border border-gray-200 p-2">{result.petitioner || 'N/A'}</td>
//                       <td className="border border-gray-200 p-2">{result.respondent || 'N/A'}</td>
//                       <td className="border border-gray-200 p-2">
//                         <StatusBadge status={result.status || 'PENDING'} />
//                       </td>
//                       <td className="border border-gray-200 p-2">
//                         <button 
//                           className="text-sm text-blue-600 hover:text-blue-800 font-medium disabled:text-gray-400 disabled:cursor-not-allowed flex items-center space-x-1"
//                           onClick={() => handleViewDetails(result.cnr, index)}
//                           disabled={loadingDetailId === index}
//                         >
//                           {loadingDetailId === index ? (
//                             <>
//                               <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-blue-600"></div>
//                               <span>Loading...</span>
//                             </>
//                           ) : (
//                             <span>View Details</span>
//                           )}
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>
//       )}
      
//       {/* Case Details Popup */}
//       {showCaseDetails && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl max-h-screen overflow-y-auto">
//             <div className="flex justify-between items-center border-b p-4 sticky top-0 bg-white z-10">
//               <h3 className="text-lg font-semibold">Case Details</h3>
//               <button 
//                 onClick={closeDetailsPopup}
//                 className="text-gray-500 hover:text-gray-700"
//               >
//                 <X size={20} />
//               </button>
//             </div>
            
//             <div className="p-4">
//               {isLoadingDetails ? (
//                 <div className="flex justify-center items-center py-20">
//                   <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
//                 </div>
//               ) : detailsError ? (
//                 <div className="bg-red-50 border border-red-200 rounded-md p-4 text-red-700">
//                   {detailsError}
//                 </div>
//               ) : caseDetails ? (
//                 <div>
//                   {/* Case Title */}
//                   <div className="mb-6">
//                     <h2 className="text-xl font-bold mb-2">{caseDetails.title || `${caseDetails.parties.petitioners[0]} vs. ${caseDetails.parties.respondents[0]}`}</h2>
//                     <div className="flex flex-wrap gap-2 items-center">
//                       <span className="text-gray-600 text-sm">CNR: {caseDetails.cnr}</span>
//                       <span className="text-gray-600 text-sm mx-2">|</span>
//                       <span className="text-gray-600 text-sm">Filed: {formatDate(caseDetails.filing?.date)}</span>
//                       <span className="text-gray-600 text-sm mx-2">|</span>
//                       <StatusBadge status={caseDetails.status.caseStage || 'PENDING'} />
//                     </div>
//                   </div>
                  
//                   {/* Tabs */}
//                   <div className="border-b mb-4">
//                     <div className="flex overflow-x-auto">
//                       <button 
//                         className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${activeTab === 'overview' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
//                         onClick={() => setActiveTab('overview')}
//                       >
//                         Overview
//                       </button>
//                       <button 
//                         className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${activeTab === 'parties' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
//                         onClick={() => setActiveTab('parties')}
//                       >
//                         Parties
//                       </button>
//                       <button 
//                         className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${activeTab === 'history' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
//                         onClick={() => setActiveTab('history')}
//                       >
//                         Case History
//                       </button>
//                       <button 
//                         className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${activeTab === 'ia' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
//                         onClick={() => setActiveTab('ia')}
//                       >
//                         IA Details
//                       </button>
//                       <button 
//                         className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${activeTab === 'documents' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
//                         onClick={() => setActiveTab('documents')}
//                       >
//                         Documents
//                       </button>
//                       {caseDetails.orders && caseDetails.orders.length > 0 && (
//                         <button 
//                           className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${activeTab === 'orders' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
//                           onClick={() => setActiveTab('orders')}
//                         >
//                           Orders
//                         </button>
//                       )}
//                     </div>
//                   </div>
//                   {/* Tab Content */}
//                   <div className="mb-4">
//                     {/* Overview Tab */}
//                     {activeTab === 'overview' && (
//                       <div className="space-y-6">
//                         {/* Case Information */}
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                           <div>
//                             <h3 className="text-sm font-medium text-gray-500 mb-1">Filing Number</h3>
//                             <p className="text-sm">{caseDetails.filing?.number || 'N/A'}</p>
//                           </div>
//                           <div>
//                             <h3 className="text-sm font-medium text-gray-500 mb-1">Filing Date</h3>
//                             <p className="text-sm">{formatDate(caseDetails.filing?.date)}</p>
//                           </div>
//                           <div>
//                             <h3 className="text-sm font-medium text-gray-500 mb-1">Registration Number</h3>
//                             <p className="text-sm">{caseDetails.registration?.number || 'N/A'}</p>
//                           </div>
//                           <div>
//                             <h3 className="text-sm font-medium text-gray-500 mb-1">Registration Date</h3>
//                             <p className="text-sm">{formatDate(caseDetails.registration?.date)}</p>
//                           </div>
//                         </div>
                        
//                         {/* Category Information */}
//                         <div>
//                           <h3 className="font-medium mb-2">Category Information</h3>
//                           <div className="grid grid-cols-1 gap-4 bg-gray-50 p-4 rounded-md">
//                             <div>
//                               <p className="text-sm text-gray-500">Category</p>
//                               <p className="text-sm">{caseDetails.categoryDetails?.category || 'N/A'}</p>
//                             </div>
//                             {caseDetails.categoryDetails?.subCategory && (
//                               <div>
//                                 <p className="text-sm text-gray-500">Sub Category</p>
//                                 <p className="text-sm">{caseDetails.categoryDetails.subCategory}</p>
//                               </div>
//                             )}
//                             {caseDetails.categoryDetails?.subSubCategory && (
//                               <div>
//                                 <p className="text-sm text-gray-500">Sub-Sub Category</p>
//                                 <p className="text-sm">{caseDetails.categoryDetails.subSubCategory}</p>
//                               </div>
//                             )}
//                           </div>
//                         </div>
                        
//                         {/* Status Information */}
//                         <div>
//                           <h3 className="font-medium mb-2">Status Information</h3>
//                           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-md">
//                             <div>
//                               <p className="text-sm text-gray-500">Case Stage</p>
//                               <p className="text-sm">{caseDetails.status.caseStage || 'N/A'}</p>
//                             </div>
//                             <div>
//                               <p className="text-sm text-gray-500">First Hearing Date</p>
//                               <p className="text-sm">{formatDate(caseDetails.status.firstHearingDate)}</p>
//                             </div>
//                             <div>
//                               <p className="text-sm text-gray-500">Next Hearing Date</p>
//                               <p className="text-sm">{formatDate(caseDetails.status.nextHearingDate)}</p>
//                             </div>
//                             {caseDetails.status.decisionDate && (
//                               <div>
//                                 <p className="text-sm text-gray-500">Decision Date</p>
//                                 <p className="text-sm">{formatDate(caseDetails.status.decisionDate)}</p>
//                               </div>
//                             )}
//                             {caseDetails.status.natureOfDisposal && (
//                               <div>
//                                 <p className="text-sm text-gray-500">Nature of Disposal</p>
//                                 <p className="text-sm">{caseDetails.status.natureOfDisposal}</p>
//                               </div>
//                             )}
//                             <div>
//                               <p className="text-sm text-gray-500">Court and Judge</p>
//                               <p className="text-sm">{caseDetails.status.courtNumberAndJudge || 'N/A'}</p>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     )}
                    
//                     {/* Parties Tab */}
//                     {activeTab === 'parties' && (
//                       <div className="space-y-6">
//                         {/* Petitioners */}
//                         <div>
//                           <h3 className="font-medium mb-2">Petitioners</h3>
//                           <ul className="bg-gray-50 p-4 rounded-md space-y-2">
//                             {caseDetails.parties.petitioners.map((petitioner, index) => (
//                               <li key={index} className="text-sm">{petitioner}</li>
//                             ))}
//                           </ul>
//                         </div>
                        
//                         {/* Respondents */}
//                         <div>
//                           <h3 className="font-medium mb-2">Respondents</h3>
//                           <ul className="bg-gray-50 p-4 rounded-md space-y-2">
//                             {caseDetails.parties.respondents.map((respondent, index) => (
//                               <li key={index} className="text-sm">{respondent}</li>
//                             ))}
//                           </ul>
//                         </div>
                        
//                         {/* Advocates */}
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                           <div>
//                             <h3 className="font-medium mb-2">Petitioner Advocates</h3>
//                             {caseDetails.parties.petitionerAdvocates && caseDetails.parties.petitionerAdvocates.length > 0 ? (
//                               <ul className="bg-gray-50 p-4 rounded-md space-y-2">
//                                 {caseDetails.parties.petitionerAdvocates.map((advocate, index) => (
//                                   <li key={index} className="text-sm">{advocate}</li>
//                                 ))}
//                               </ul>
//                             ) : (
//                               <p className="bg-gray-50 p-4 rounded-md text-sm text-gray-500">No advocate information available</p>
//                             )}
//                           </div>
//                           <div>
//                             <h3 className="font-medium mb-2">Respondent Advocates</h3>
//                             {caseDetails.parties.respondentAdvocates && caseDetails.parties.respondentAdvocates.length > 0 ? (
//                               <ul className="bg-gray-50 p-4 rounded-md space-y-2">
//                                 {caseDetails.parties.respondentAdvocates.map((advocate, index) => (
//                                   <li key={index} className="text-sm">{advocate}</li>
//                                 ))}
//                               </ul>
//                             ) : (
//                               <p className="bg-gray-50 p-4 rounded-md text-sm text-gray-500">No advocate information available</p>
//                             )}
//                           </div>
//                         </div>
//                       </div>
//                     )}
                    
//                     {/* History Tab */}
//                     {activeTab === 'history' && (
//                       <div>
//                         <h3 className="font-medium mb-4">Case History</h3>
//                         {caseDetails.history && caseDetails.history.length > 0 ? (
//                           <div className="overflow-x-auto">
//                             <table className="min-w-full border-collapse">
//                               <thead>
//                                 <tr className="bg-gray-100">
//                                   <th className="border border-gray-200 p-2 text-left text-xs font-medium text-gray-500">Business Date</th>
//                                   <th className="border border-gray-200 p-2 text-left text-xs font-medium text-gray-500">Next Date</th>
//                                   <th className="border border-gray-200 p-2 text-left text-xs font-medium text-gray-500">Purpose</th>
//                                   <th className="border border-gray-200 p-2 text-left text-xs font-medium text-gray-500">Judge</th>
//                                   <th className="border border-gray-200 p-2 text-left text-xs font-medium text-gray-500">Cause List</th>
//                                 </tr>
//                               </thead>
//                               <tbody>
//                                 {caseDetails.history.map((item, index) => (
//                                   <tr key={index} className="hover:bg-gray-50">
//                                     <td className="border border-gray-200 p-2 text-sm">{formatDate(item.businessDate)}</td>
//                                     <td className="border border-gray-200 p-2 text-sm">{formatDate(item.nextDate)}</td>
//                                     <td className="border border-gray-200 p-2 text-sm">{item.purpose}</td>
//                                     <td className="border border-gray-200 p-2 text-sm">{item.judge}</td>
//                                     <td className="border border-gray-200 p-2 text-sm">{item.causeList}</td>
//                                   </tr>
//                                 ))}
//                               </tbody>
//                             </table>
//                           </div>
//                         ) : (
//                           <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 text-yellow-700">
//                             No history records available for this case.
//                           </div>
//                         )}
//                       </div>
//                     )}
                    
//                     {/* IA Details Tab */}
//                     {activeTab === 'ia' && (
//                       <div>
//                         <h3 className="font-medium mb-4">IA Details</h3>
//                         {caseDetails.iaDetails && caseDetails.iaDetails.length > 0 ? (
//                           <div className="overflow-x-auto">
//                             <table className="min-w-full border-collapse">
//                               <thead>
//                                 <tr className="bg-gray-100">
//                                   <th className="border border-gray-200 p-2 text-left text-xs font-medium text-gray-500">IA Number</th>
//                                   <th className="border border-gray-200 p-2 text-left text-xs font-medium text-gray-500">Party</th>
//                                   <th className="border border-gray-200 p-2 text-left text-xs font-medium text-gray-500">Filing Date</th>
//                                   <th className="border border-gray-200 p-2 text-left text-xs font-medium text-gray-500">Next Date</th>
//                                   <th className="border border-gray-200 p-2 text-left text-xs font-medium text-gray-500">Status</th>
//                                 </tr>
//                               </thead>
//                               <tbody>
//                                 {caseDetails.iaDetails.map((ia, index) => (
//                                   <tr key={index} className="hover:bg-gray-50">
//                                     <td className="border border-gray-200 p-2 text-sm">{ia.iaNumber}</td>
//                                     <td className="border border-gray-200 p-2 text-sm">{ia.party}</td>
//                                     <td className="border border-gray-200 p-2 text-sm">{formatDate(ia.dateOfFiling)}</td>
//                                     <td className="border border-gray-200 p-2 text-sm">{formatDate(ia.nextDate)}</td>
//                                     <td className="border border-gray-200 p-2 text-sm">
//                                       <StatusBadge status={ia.status} />
//                                     </td>
//                                   </tr>
//                                 ))}
//                               </tbody>
//                             </table>
//                           </div>
//                         ) : (
//                           <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 text-yellow-700">
//                             No IA details available for this case.
//                           </div>
//                         )}
//                       </div>
//                     )}
//                     {/* Documents Tab */}
//                     {activeTab === 'documents' && (
//                       <div>
//                         <h3 className="font-medium mb-4">Document Details</h3>
//                         {caseDetails.documentDetails && caseDetails.documentDetails.length > 0 ? (
//                           <div className="overflow-x-auto">
//                             <table className="min-w-full border-collapse">
//                               <thead>
//                                 <tr className="bg-gray-100">
//                                   <th className="border border-gray-200 p-2 text-left text-xs font-medium text-gray-500">Doc. Number</th>
//                                   <th className="border border-gray-200 p-2 text-left text-xs font-medium text-gray-500">Document Name</th>
//                                   <th className="border border-gray-200 p-2 text-left text-xs font-medium text-gray-500">Receiving Date</th>
//                                   <th className="border border-gray-200 p-2 text-left text-xs font-medium text-gray-500">Filed By</th>
//                                   <th className="border border-gray-200 p-2 text-left text-xs font-medium text-gray-500">Advocate Name</th>
//                                 </tr>
//                               </thead>
//                               <tbody>
//                                 {caseDetails.documentDetails.map((doc, index) => (
//                                   <tr key={index} className="hover:bg-gray-50">
//                                     <td className="border border-gray-200 p-2 text-sm">{doc.documentNumber}</td>
//                                     <td className="border border-gray-200 p-2 text-sm">{doc.documentName}</td>
//                                     <td className="border border-gray-200 p-2 text-sm">{formatDate(doc.receivingDate)}</td>
//                                     <td className="border border-gray-200 p-2 text-sm">{doc.filedBy || 'N/A'}</td>
//                                     <td className="border border-gray-200 p-2 text-sm">{doc.advocateName}</td>
//                                   </tr>
//                                 ))}
//                               </tbody>
//                             </table>
//                           </div>
//                         ) : (
//                           <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 text-yellow-700">
//                             No document details available for this case.
//                           </div>
//                         )}
//                       </div>
//                     )}
                    
//                     {/* Orders Tab */}
//                     {activeTab === 'orders' && (
//                       <div>
//                         <h3 className="font-medium mb-4">Orders</h3>
//                         {caseDetails.orders && caseDetails.orders.length > 0 ? (
//                           <div className="space-y-3">
//                             {caseDetails.orders.map((order, index) => (
//                               <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
//                                 <span className="text-sm font-medium">{formatDate(order.date)}</span>
//                                 {order.url && (
//                                   <a 
//                                     href={order.url} 
//                                     target="_blank" 
//                                     rel="noopener noreferrer"
//                                     className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 text-sm"
//                                   >
//                                     <span>View Order</span>
//                                     <ExternalLink size={14} />
//                                   </a>
//                                 )}
//                               </div>
//                             ))}
//                           </div>
//                         ) : (
//                           <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 text-yellow-700">
//                             No orders available for this case.
//                           </div>
//                         )}
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               ) : null}
//             </div>
            
//             <div className="border-t p-4 flex justify-end">
//               <button
//                 onClick={closeDetailsPopup}
//                 className="bg-gray-100 text-gray-600 hover:bg-gray-200 px-4 py-2 rounded-md transition-colors"
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default HighCourtSearchPage;




// import React, { useState } from 'react';
// import { Search, X, ExternalLink } from 'lucide-react';

// const HighCourtSearchPage = ({ court, partyNameInput, setPartyNameInput, handlePartySearch }) => {
//   const [stage, setStage] = useState('BOTH');
//   const [year, setYear] = useState(new Date().getFullYear().toString());
//   const [benchId, setBenchId] = useState('0ba5ccaf');
//   const [searchResults, setSearchResults] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [showCaseDetails, setShowCaseDetails] = useState(false);
//   const [caseDetails, setCaseDetails] = useState(null);
//   const [isLoadingDetails, setIsLoadingDetails] = useState(false);
//   const [loadingDetailId, setLoadingDetailId] = useState(null);
//   const [detailsError, setDetailsError] = useState(null);
//   const [activeTab, setActiveTab] = useState('overview');

//   // Generate years for dropdown (last 30 years)
//   const currentYear = new Date().getFullYear();
//   const years = Array.from({ length: 30 }, (_, i) => (currentYear - i).toString());

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setError(null);
    
//     try {
//       const response = await fetch(`https://infrahive-ai-legal-research-gyfsavdfd0c9ehh5.centralindia-01.azurewebsites.net/legal-infrahive/high-court/search/party/`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           name: partyNameInput,
//           stage: stage,
//           year: year,
//           benchId: benchId
//         }),
//       });
      
//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }
      
//       const data = await response.json();
//       setSearchResults(data);
//     } catch (err) {
//       setError(err.message || 'An error occurred during search');
//     } finally {
//       setIsLoading(false);
//     }
//   };
  
//   // Function to format date to display in a readable format
//   const formatDate = (dateString) => {
//     if (!dateString) return 'N/A';
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-IN', {
//       day: '2-digit',
//       month: 'short',
//       year: 'numeric'
//     });
//   };

//   // Function to handle View Details button click
//   const handleViewDetails = async (cnr, rowIndex) => {
//     setIsLoadingDetails(true);
//     setLoadingDetailId(rowIndex);
//     setDetailsError(null);
//     setActiveTab('overview');
    
//     try {
//       const response = await fetch(`https://infrahive-ai-legal-research-gyfsavdfd0c9ehh5.centralindia-01.azurewebsites.net/legal-infrahive/high-court/case/`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           cnr: cnr
//         }),
//       });
      
//       if (!response.ok) {
//         throw new Error('Failed to fetch case details');
//       }
      
//       const data = await response.json();
//       setCaseDetails(data);
//       setShowCaseDetails(true);
//     } catch (err) {
//       setDetailsError(err.message || 'Failed to fetch case details');
//     } finally {
//       setIsLoadingDetails(false);
//       setLoadingDetailId(null);
//     }
//   };
  
//   const closeDetailsPopup = () => {
//     setShowCaseDetails(false);
//     setCaseDetails(null);
//     setDetailsError(null);
//   };
  
//   // Status badge component
//   const StatusBadge = ({ status }) => {
//     let bgColor = 'bg-yellow-100 text-yellow-800';
//     if (status === 'COMPLETED' || status === 'DISPOSED') {
//       bgColor = 'bg-green-100 text-green-800';
//     }
//     return (
//       <span className={`px-2 py-1 rounded-full text-xs font-medium ${bgColor}`}>
//         {status}
//       </span>
//     );
//   };
  
//   // Loading spinner component
//   const LoadingSpinner = () => (
//     <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
//   );
  
//   return (
//     <div className="p-6">
//       <h2 className="text-xl font-semibold mb-4">High Court Cases by Party Name</h2>
//       <div className="bg-white p-6 rounded-md border border-gray-200 max-w-xl">
//         <form onSubmit={handleSubmit}>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//             <div className="col-span-2">
//               <label htmlFor="party-input" className="block text-sm font-medium mb-1 text-gray-700">
//                 Party Name
//               </label>
//               <input 
//                 type="text" 
//                 id="party-input" 
//                 value={partyNameInput}
//                 onChange={(e) => setPartyNameInput(e.target.value)}
//                 className="w-full border border-gray-200 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-blue-600"
//                 placeholder="Enter party name"
//                 required
//               />
//             </div>
            
//             <div>
//               <label htmlFor="stage-select" className="block text-sm font-medium mb-1 text-gray-700">
//                 Stage
//               </label>
//               <select
//                 id="stage-select"
//                 value={stage}
//                 onChange={(e) => setStage(e.target.value)}
//                 className="w-full border border-gray-200 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-blue-600"
//               >
//                 <option value="BOTH">BOTH</option>
//                 <option value="PENDING">PENDING</option>
//                 <option value="DISPOSED">DISPOSED</option>
//               </select>
//             </div>
            
//             <div>
//               <label htmlFor="year-select" className="block text-sm font-medium mb-1 text-gray-700">
//                 Year
//               </label>
//               <select
//                 id="year-select"
//                 value={year}
//                 onChange={(e) => setYear(e.target.value)}
//                 className="w-full border border-gray-200 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-blue-600"
//               >
//                 {years.map((y) => (
//                   <option key={y} value={y}>{y}</option>
//                 ))}
//               </select>
//             </div>
            
//             <div>
//               <label htmlFor="bench-select" className="block text-sm font-medium mb-1 text-gray-700">
//                 Bench ID
//               </label>
//               <input
//                 type="text"
//                 id="bench-select"
//                 value={benchId}
//                 onChange={(e) => setBenchId(e.target.value)}
//                 className="w-full border border-gray-200 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-blue-600"
//               />
//             </div>
            
//             <div className="md:col-start-2 md:flex md:justify-end items-end">
//               <button 
//                 type="submit" 
//                 className="w-full md:w-auto bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
//                 disabled={isLoading}
//               >
//                 {isLoading ? (
//                   <div className="flex items-center space-x-2">
//                     <LoadingSpinner />
//                     <span>Searching...</span>
//                   </div>
//                 ) : (
//                   <>
//                     <Search size={16} />
//                     <span>Search</span>
//                   </>
//                 )}
//               </button>
//             </div>
//           </div>
//         </form>
//       </div>
//       {/* Loading Indicator */}
//       {isLoading && (
//         <div className="mt-6 flex items-center justify-center p-8">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
//         </div>
//       )}
      
//       {/* Error Message */}
//       {error && (
//         <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-md text-red-700">
//           {error}
//         </div>
//       )}
      
//       {/* Results Section */}
//       {!isLoading && searchResults && (
//         <div className="mt-6">
//           <h3 className="text-lg font-medium mb-3">Search Results</h3>
          
//           {searchResults.length === 0 ? (
//             <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 text-yellow-700">
//               No results found for your search criteria.
//             </div>
//           ) : (
//             <div className="overflow-x-auto">
//               <table className="w-full border-collapse">
//                 <thead>
//                   <tr className="bg-gray-100">
//                     <th className="border border-gray-200 p-2 text-left">#</th>
//                     <th className="border border-gray-200 p-2 text-left">CNR</th>
//                     <th className="border border-gray-200 p-2 text-left">Case Number</th>
//                     <th className="border border-gray-200 p-2 text-left">Petitioner</th>
//                     <th className="border border-gray-200 p-2 text-left">Respondent</th>
//                     <th className="border border-gray-200 p-2 text-left">Status</th>
//                     <th className="border border-gray-200 p-2 text-left">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {searchResults.map((result, index) => (
//                     <tr key={index} className="hover:bg-gray-50">
//                       <td className="border border-gray-200 p-2">{index + 1}</td>
//                       <td className="border border-gray-200 p-2">{result.cnr}</td>
//                       <td className="border border-gray-200 p-2 text-sm">{result.caseNumber || 'N/A'}</td>
//                       <td className="border border-gray-200 p-2">{result.petitioner || 'N/A'}</td>
//                       <td className="border border-gray-200 p-2">{result.respondent || 'N/A'}</td>
//                       <td className="border border-gray-200 p-2">
//                         <StatusBadge status={result.status || 'PENDING'} />
//                       </td>
//                       <td className="border border-gray-200 p-2">
//                         <button 
//                           className="text-sm text-blue-600 hover:text-blue-800 font-medium disabled:text-gray-400 disabled:cursor-not-allowed flex items-center space-x-1"
//                           onClick={() => handleViewDetails(result.cnr, index)}
//                           disabled={loadingDetailId === index}
//                         >
//                           {loadingDetailId === index ? (
//                             <>
//                               <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-blue-600"></div>
//                               <span>Loading...</span>
//                             </>
//                           ) : (
//                             <span>View Details</span>
//                           )}
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>
//       )}
      
//       {/* Case Details Popup */}
//       {showCaseDetails && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl max-h-screen overflow-y-auto">
//             <div className="flex justify-between items-center border-b p-4 sticky top-0 bg-white z-10">
//               <h3 className="text-lg font-semibold">Case Details</h3>
//               <button 
//                 onClick={closeDetailsPopup}
//                 className="text-gray-500 hover:text-gray-700"
//               >
//                 <X size={20} />
//               </button>
//             </div>
            
//             <div className="p-4">
//               {isLoadingDetails ? (
//                 <div className="flex justify-center items-center py-20">
//                   <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
//                 </div>
//               ) : detailsError ? (
//                 <div className="bg-red-50 border border-red-200 rounded-md p-4 text-red-700">
//                   {detailsError}
//                 </div>
//               ) : caseDetails ? (
//                 <div>
//                   {/* Case Title */}
//                   <div className="mb-6">
//                     <h2 className="text-xl font-bold mb-2">{caseDetails.title || `${caseDetails.parties.petitioners[0]} vs. ${caseDetails.parties.respondents[0]}`}</h2>
//                     <div className="flex flex-wrap gap-2 items-center">
//                       <span className="text-gray-600 text-sm">CNR: {caseDetails.cnr}</span>
//                       <span className="text-gray-600 text-sm mx-2">|</span>
//                       <span className="text-gray-600 text-sm">Filed: {formatDate(caseDetails.filing?.date)}</span>
//                       <span className="text-gray-600 text-sm mx-2">|</span>
//                       <StatusBadge status={caseDetails.status.caseStage || 'PENDING'} />
//                     </div>
//                   </div>
                  
//                   {/* Tabs */}
//                   <div className="border-b mb-4">
//                     <div className="flex overflow-x-auto">
//                       <button 
//                         className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${activeTab === 'overview' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
//                         onClick={() => setActiveTab('overview')}
//                       >
//                         Overview
//                       </button>
//                       <button 
//                         className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${activeTab === 'parties' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
//                         onClick={() => setActiveTab('parties')}
//                       >
//                         Parties
//                       </button>
//                       <button 
//                         className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${activeTab === 'history' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
//                         onClick={() => setActiveTab('history')}
//                       >
//                         Case History
//                       </button>
//                       <button 
//                         className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${activeTab === 'ia' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
//                         onClick={() => setActiveTab('ia')}
//                       >
//                         IA Details
//                       </button>
//                       <button 
//                         className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${activeTab === 'documents' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
//                         onClick={() => setActiveTab('documents')}
//                       >
//                         Documents
//                       </button>
//                       {caseDetails.orders && caseDetails.orders.length > 0 && (
//                         <button 
//                           className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${activeTab === 'orders' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
//                           onClick={() => setActiveTab('orders')}
//                         >
//                           Orders
//                         </button>
//                       )}
//                     </div>
//                   </div>
//                   {/* Tab Content */}
//                   <div className="mb-4">
//                     {/* Overview Tab */}
//                     {activeTab === 'overview' && (
//                       <div className="space-y-6">
//                         {/* Case Information */}
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                           <div>
//                             <h3 className="text-sm font-medium text-gray-500 mb-1">Filing Number</h3>
//                             <p className="text-sm">{caseDetails.filing?.number || 'N/A'}</p>
//                           </div>
//                           <div>
//                             <h3 className="text-sm font-medium text-gray-500 mb-1">Filing Date</h3>
//                             <p className="text-sm">{formatDate(caseDetails.filing?.date)}</p>
//                           </div>
//                           <div>
//                             <h3 className="text-sm font-medium text-gray-500 mb-1">Registration Number</h3>
//                             <p className="text-sm">{caseDetails.registration?.number || 'N/A'}</p>
//                           </div>
//                           <div>
//                             <h3 className="text-sm font-medium text-gray-500 mb-1">Registration Date</h3>
//                             <p className="text-sm">{formatDate(caseDetails.registration?.date)}</p>
//                           </div>
//                         </div>
                        
//                         {/* Category Information */}
//                         <div>
//                           <h3 className="font-medium mb-2">Category Information</h3>
//                           <div className="grid grid-cols-1 gap-4 bg-gray-50 p-4 rounded-md">
//                             <div>
//                               <p className="text-sm text-gray-500">Category</p>
//                               <p className="text-sm">{caseDetails.categoryDetails?.category || 'N/A'}</p>
//                             </div>
//                             {caseDetails.categoryDetails?.subCategory && (
//                               <div>
//                                 <p className="text-sm text-gray-500">Sub Category</p>
//                                 <p className="text-sm">{caseDetails.categoryDetails.subCategory}</p>
//                               </div>
//                             )}
//                             {caseDetails.categoryDetails?.subSubCategory && (
//                               <div>
//                                 <p className="text-sm text-gray-500">Sub-Sub Category</p>
//                                 <p className="text-sm">{caseDetails.categoryDetails.subSubCategory}</p>
//                               </div>
//                             )}
//                           </div>
//                         </div>
                        
//                         {/* Status Information */}
//                         <div>
//                           <h3 className="font-medium mb-2">Status Information</h3>
//                           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-md">
//                             <div>
//                               <p className="text-sm text-gray-500">Case Stage</p>
//                               <p className="text-sm">{caseDetails.status.caseStage || 'N/A'}</p>
//                             </div>
//                             <div>
//                               <p className="text-sm text-gray-500">First Hearing Date</p>
//                               <p className="text-sm">{formatDate(caseDetails.status.firstHearingDate)}</p>
//                             </div>
//                             <div>
//                               <p className="text-sm text-gray-500">Next Hearing Date</p>
//                               <p className="text-sm">{formatDate(caseDetails.status.nextHearingDate)}</p>
//                             </div>
//                             {caseDetails.status.decisionDate && (
//                               <div>
//                                 <p className="text-sm text-gray-500">Decision Date</p>
//                                 <p className="text-sm">{formatDate(caseDetails.status.decisionDate)}</p>
//                               </div>
//                             )}
//                             {caseDetails.status.natureOfDisposal && (
//                               <div>
//                                 <p className="text-sm text-gray-500">Nature of Disposal</p>
//                                 <p className="text-sm">{caseDetails.status.natureOfDisposal}</p>
//                               </div>
//                             )}
//                             <div>
//                               <p className="text-sm text-gray-500">Court and Judge</p>
//                               <p className="text-sm">{caseDetails.status.courtNumberAndJudge || 'N/A'}</p>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     )}
                    
//                     {/* Parties Tab */}
//                     {activeTab === 'parties' && (
//                       <div className="space-y-6">
//                         {/* Petitioners */}
//                         <div>
//                           <h3 className="font-medium mb-2">Petitioners</h3>
//                           <ul className="bg-gray-50 p-4 rounded-md space-y-2">
//                             {caseDetails.parties.petitioners.map((petitioner, index) => (
//                               <li key={index} className="text-sm">{petitioner}</li>
//                             ))}
//                           </ul>
//                         </div>
                        
//                         {/* Respondents */}
//                         <div>
//                           <h3 className="font-medium mb-2">Respondents</h3>
//                           <ul className="bg-gray-50 p-4 rounded-md space-y-2">
//                             {caseDetails.parties.respondents.map((respondent, index) => (
//                               <li key={index} className="text-sm">{respondent}</li>
//                             ))}
//                           </ul>
//                         </div>
                        
//                         {/* Advocates */}
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                           <div>
//                             <h3 className="font-medium mb-2">Petitioner Advocates</h3>
//                             {caseDetails.parties.petitionerAdvocates && caseDetails.parties.petitionerAdvocates.length > 0 ? (
//                               <ul className="bg-gray-50 p-4 rounded-md space-y-2">
//                                 {caseDetails.parties.petitionerAdvocates.map((advocate, index) => (
//                                   <li key={index} className="text-sm">{advocate}</li>
//                                 ))}
//                               </ul>
//                             ) : (
//                               <p className="bg-gray-50 p-4 rounded-md text-sm text-gray-500">No advocate information available</p>
//                             )}
//                           </div>
//                           <div>
//                             <h3 className="font-medium mb-2">Respondent Advocates</h3>
//                             {caseDetails.parties.respondentAdvocates && caseDetails.parties.respondentAdvocates.length > 0 ? (
//                               <ul className="bg-gray-50 p-4 rounded-md space-y-2">
//                                 {caseDetails.parties.respondentAdvocates.map((advocate, index) => (
//                                   <li key={index} className="text-sm">{advocate}</li>
//                                 ))}
//                               </ul>
//                             ) : (
//                               <p className="bg-gray-50 p-4 rounded-md text-sm text-gray-500">No advocate information available</p>
//                             )}
//                           </div>
//                         </div>
//                       </div>
//                     )}
                    
//                     {/* History Tab */}
//                     {activeTab === 'history' && (
//                       <div>
//                         <h3 className="font-medium mb-4">Case History</h3>
//                         {caseDetails.history && caseDetails.history.length > 0 ? (
//                           <div className="overflow-x-auto">
//                             <table className="min-w-full border-collapse">
//                               <thead>
//                                 <tr className="bg-gray-100">
//                                   <th className="border border-gray-200 p-2 text-left text-xs font-medium text-gray-500">Business Date</th>
//                                   <th className="border border-gray-200 p-2 text-left text-xs font-medium text-gray-500">Next Date</th>
//                                   <th className="border border-gray-200 p-2 text-left text-xs font-medium text-gray-500">Purpose</th>
//                                   <th className="border border-gray-200 p-2 text-left text-xs font-medium text-gray-500">Judge</th>
//                                   <th className="border border-gray-200 p-2 text-left text-xs font-medium text-gray-500">Cause List</th>
//                                 </tr>
//                               </thead>
//                               <tbody>
//                                 {caseDetails.history.map((item, index) => (
//                                   <tr key={index} className="hover:bg-gray-50">
//                                     <td className="border border-gray-200 p-2 text-sm">{formatDate(item.businessDate)}</td>
//                                     <td className="border border-gray-200 p-2 text-sm">{formatDate(item.nextDate)}</td>
//                                     <td className="border border-gray-200 p-2 text-sm">{item.purpose}</td>
//                                     <td className="border border-gray-200 p-2 text-sm">{item.judge}</td>
//                                     <td className="border border-gray-200 p-2 text-sm">{item.causeList}</td>
//                                   </tr>
//                                 ))}
//                               </tbody>
//                             </table>
//                           </div>
//                         ) : (
//                           <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 text-yellow-700">
//                             No history records available for this case.
//                           </div>
//                         )}
//                       </div>
//                     )}
                    
//                     {/* IA Details Tab */}
//                     {activeTab === 'ia' && (
//                       <div>
//                         <h3 className="font-medium mb-4">IA Details</h3>
//                         {caseDetails.iaDetails && caseDetails.iaDetails.length > 0 ? (
//                           <div className="overflow-x-auto">
//                             <table className="min-w-full border-collapse">
//                               <thead>
//                                 <tr className="bg-gray-100">
//                                   <th className="border border-gray-200 p-2 text-left text-xs font-medium text-gray-500">IA Number</th>
//                                   <th className="border border-gray-200 p-2 text-left text-xs font-medium text-gray-500">Party</th>
//                                   <th className="border border-gray-200 p-2 text-left text-xs font-medium text-gray-500">Filing Date</th>
//                                   <th className="border border-gray-200 p-2 text-left text-xs font-medium text-gray-500">Next Date</th>
//                                   <th className="border border-gray-200 p-2 text-left text-xs font-medium text-gray-500">Status</th>
//                                 </tr>
//                               </thead>
//                               <tbody>
//                                 {caseDetails.iaDetails.map((ia, index) => (
//                                   <tr key={index} className="hover:bg-gray-50">
//                                     <td className="border border-gray-200 p-2 text-sm">{ia.iaNumber}</td>
//                                     <td className="border border-gray-200 p-2 text-sm">{ia.party}</td>
//                                     <td className="border border-gray-200 p-2 text-sm">{formatDate(ia.dateOfFiling)}</td>
//                                     <td className="border border-gray-200 p-2 text-sm">{formatDate(ia.nextDate)}</td>
//                                     <td className="border border-gray-200 p-2 text-sm">
//                                       <StatusBadge status={ia.status} />
//                                     </td>
//                                   </tr>
//                                 ))}
//                               </tbody>
//                             </table>
//                           </div>
//                         ) : (
//                           <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 text-yellow-700">
//                             No IA details available for this case.
//                           </div>
//                         )}
//                       </div>
//                     )}
//                     {/* Documents Tab */}
//                     {activeTab === 'documents' && (
//                       <div>
//                         <h3 className="font-medium mb-4">Document Details</h3>
//                         {caseDetails.documentDetails && caseDetails.documentDetails.length > 0 ? (
//                           <div className="overflow-x-auto">
//                             <table className="min-w-full border-collapse">
//                               <thead>
//                                 <tr className="bg-gray-100">
//                                   <th className="border border-gray-200 p-2 text-left text-xs font-medium text-gray-500">Doc. Number</th>
//                                   <th className="border border-gray-200 p-2 text-left text-xs font-medium text-gray-500">Document Name</th>
//                                   <th className="border border-gray-200 p-2 text-left text-xs font-medium text-gray-500">Receiving Date</th>
//                                   <th className="border border-gray-200 p-2 text-left text-xs font-medium text-gray-500">Filed By</th>
//                                   <th className="border border-gray-200 p-2 text-left text-xs font-medium text-gray-500">Advocate Name</th>
//                                 </tr>
//                               </thead>
//                               <tbody>
//                                 {caseDetails.documentDetails.map((doc, index) => (
//                                   <tr key={index} className="hover:bg-gray-50">
//                                     <td className="border border-gray-200 p-2 text-sm">{doc.documentNumber}</td>
//                                     <td className="border border-gray-200 p-2 text-sm">{doc.documentName}</td>
//                                     <td className="border border-gray-200 p-2 text-sm">{formatDate(doc.receivingDate)}</td>
//                                     <td className="border border-gray-200 p-2 text-sm">{doc.filedBy || 'N/A'}</td>
//                                     <td className="border border-gray-200 p-2 text-sm">{doc.advocateName}</td>
//                                   </tr>
//                                 ))}
//                               </tbody>
//                             </table>
//                           </div>
//                         ) : (
//                           <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 text-yellow-700">
//                             No document details available for this case.
//                           </div>
//                         )}
//                       </div>
//                     )}
                    
//                     {/* Orders Tab */}
//                     {activeTab === 'orders' && (
//                       <div>
//                         <h3 className="font-medium mb-4">Orders</h3>
//                         {caseDetails.orders && caseDetails.orders.length > 0 ? (
//                           <div className="space-y-3">
//                             {caseDetails.orders.map((order, index) => (
//                               <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
//                                 <span className="text-sm font-medium">{formatDate(order.date)}</span>
//                                 {order.url && (
//                                   <a 
//                                     href={order.url} 
//                                     target="_blank" 
//                                     rel="noopener noreferrer"
//                                     className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 text-sm"
//                                   >
//                                     <span>View Order</span>
//                                     <ExternalLink size={14} />
//                                   </a>
//                                 )}
//                               </div>
//                             ))}
//                           </div>
//                         ) : (
//                           <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 text-yellow-700">
//                             No orders available for this case.
//                           </div>
//                         )}
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               ) : null}
//             </div>
            
//             <div className="border-t p-4 flex justify-end">
//               <button
//                 onClick={closeDetailsPopup}
//                 className="bg-gray-100 text-gray-600 hover:bg-gray-200 px-4 py-2 rounded-md transition-colors"
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default HighCourtSearchPage;




// import React, { useState } from 'react';
// import { Search, X, ExternalLink } from 'lucide-react';

// const HighCourtSearchPage = ({ court, partyNameInput, setPartyNameInput, handlePartySearch }) => {
//   const [stage, setStage] = useState('BOTH');
//   const [year, setYear] = useState(new Date().getFullYear().toString());
//   const [benchId, setBenchId] = useState('0ba5ccaf');
//   const [searchResults, setSearchResults] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [showCaseDetails, setShowCaseDetails] = useState(false);
//   const [caseDetails, setCaseDetails] = useState(null);
//   const [isLoadingDetails, setIsLoadingDetails] = useState(false);
//   const [loadingDetailId, setLoadingDetailId] = useState(null);
//   const [detailsError, setDetailsError] = useState(null);
//   const [activeTab, setActiveTab] = useState('overview');

//   // Generate years for dropdown (last 30 years)
//   const currentYear = new Date().getFullYear();
//   const years = Array.from({ length: 30 }, (_, i) => (currentYear - i).toString());

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setError(null);
    
//     try {
//       const response = await fetch(`https://infrahive-ai-legal-research-gyfsavdfd0c9ehh5.centralindia-01.azurewebsites.net/legal-infrahive/high-court/search/party/`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           name: partyNameInput,
//           stage: stage,
//           year: year,
//           benchId: benchId
//         }),
//       });
      
//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }
      
//       const data = await response.json();
//       setSearchResults(data);
//     } catch (err) {
//       setError(err.message || 'An error occurred during search');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const formatDate = (dateString) => {
//     if (!dateString) return 'N/A';
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-IN', {
//       day: '2-digit',
//       month: 'short',
//       year: 'numeric'
//     });
//   };

//   const LoadingSpinner = () => (
//     <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
//   );

//   const StatusBadge = ({ status }) => {
//     let bgColor = 'bg-yellow-100 text-yellow-800';
//     if (status === 'COMPLETED' || status === 'DISPOSED') {
//       bgColor = 'bg-green-100 text-green-800';
//     }
//     return (
//       <span className={`px-2 py-1 rounded-full text-xs font-medium ${bgColor}`}>
//         {status}
//       </span>
//     );
//   };

//   // Function to handle View Details button click
//   const handleViewDetails = async (cnr, rowIndex) => {
//     setIsLoadingDetails(true);
//     setLoadingDetailId(rowIndex);
//     setDetailsError(null);
//     setActiveTab('overview');
    
//     try {
//       const response = await fetch(`https://infrahive-ai-legal-research-gyfsavdfd0c9ehh5.centralindia-01.azurewebsites.net/legal-infrahive/high-court/case/`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           cnr: cnr
//         }),
//       });
      
//       if (!response.ok) {
//         throw new Error('Failed to fetch case details');
//       }
      
//       const data = await response.json();
//       setCaseDetails(data);
//       setShowCaseDetails(true);
//     } catch (err) {
//       setDetailsError(err.message || 'Failed to fetch case details');
//     } finally {
//       setIsLoadingDetails(false);
//       setLoadingDetailId(null);
//     }
//   };
//     // ... continuing from Part 1

//   const closeDetailsPopup = () => {
//     setShowCaseDetails(false);
//     setCaseDetails(null);
//     setDetailsError(null);
//   };

//   return (
//     <div className="p-6">
//       <h2 className="text-xl font-semibold mb-4">High Court Cases by Party Name</h2>
//       {/* Search Form */}
//       <div className="bg-white p-6 rounded-md border border-gray-200 max-w-xl">
//         <form onSubmit={handleSubmit}>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//             <div className="col-span-2">
//               <label htmlFor="party-input" className="block text-sm font-medium mb-1 text-gray-700">
//                 Party Name
//               </label>
//               <input 
//                 type="text" 
//                 id="party-input" 
//                 value={partyNameInput}
//                 onChange={(e) => setPartyNameInput(e.target.value)}
//                 className="w-full border border-gray-200 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-blue-600"
//                 placeholder="Enter party name"
//                 required
//               />
//             </div>
            
//             <div>
//               <label htmlFor="stage-select" className="block text-sm font-medium mb-1 text-gray-700">
//                 Stage
//               </label>
//               <select
//                 id="stage-select"
//                 value={stage}
//                 onChange={(e) => setStage(e.target.value)}
//                 className="w-full border border-gray-200 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-blue-600"
//               >
//                 <option value="BOTH">BOTH</option>
//                 <option value="PENDING">PENDING</option>
//                 <option value="DISPOSED">DISPOSED</option>
//               </select>
//             </div>
            
//             <div>
//               <label htmlFor="year-select" className="block text-sm font-medium mb-1 text-gray-700">
//                 Year
//               </label>
//               <select
//                 id="year-select"
//                 value={year}
//                 onChange={(e) => setYear(e.target.value)}
//                 className="w-full border border-gray-200 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-blue-600"
//               >
//                 {years.map((y) => (
//                   <option key={y} value={y}>{y}</option>
//                 ))}
//               </select>
//             </div>
            
//             <div>
//               <label htmlFor="bench-select" className="block text-sm font-medium mb-1 text-gray-700">
//                 Bench ID
//               </label>
//               <input
//                 type="text"
//                 id="bench-select"
//                 value={benchId}
//                 onChange={(e) => setBenchId(e.target.value)}
//                 className="w-full border border-gray-200 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-blue-600"
//               />
//             </div>
            
//             <div className="md:col-start-2 md:flex md:justify-end items-end">
//               <button 
//                 type="submit" 
//                 className="w-full md:w-auto bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
//                 disabled={isLoading}
//               >
//                 {isLoading ? (
//                   <div className="flex items-center space-x-2">
//                     <LoadingSpinner />
//                     <span>Searching...</span>
//                   </div>
//                 ) : (
//                   <>
//                     <Search size={16} />
//                     <span>Search</span>
//                   </>
//                 )}
//               </button>
//             </div>
//           </div>
//         </form>
//       </div>

//       {/* Loading Indicator */}
//       {isLoading && (
//         <div className="mt-6 flex items-center justify-center p-8">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
//         </div>
//       )}
      
//       {/* Error Message */}
//       {error && (
//         <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-md text-red-700">
//           {error}
//         </div>
//       )}
      
//       {/* Search Results */}
//       {!isLoading && searchResults && (
//         <div className="mt-6">
//           <h3 className="text-lg font-medium mb-3">Search Results</h3>
          
//           {searchResults.length === 0 ? (
//             <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 text-yellow-700">
//               No results found for your search criteria.
//             </div>
//           ) : (
//             <div className="overflow-x-auto">
//               <table className="w-full border-collapse">
//                 <thead>
//                   <tr className="bg-gray-100">
//                     <th className="border border-gray-200 p-2 text-left">CNR</th>
//                     <th className="border border-gray-200 p-2 text-left">Case Number</th>
//                     <th className="border border-gray-200 p-2 text-left">Title</th>
//                     <th className="border border-gray-200 p-2 text-left">Decision Date</th>
//                     <th className="border border-gray-200 p-2 text-left">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {searchResults.map((result, index) => (
//                     <tr key={index} className="hover:bg-gray-50">
//                       <td className="border border-gray-200 p-2">{result.cnr}</td>
//                       <td className="border border-gray-200 p-2">{`${result.type} ${result.caseNumber}`}</td>
//                       <td className="border border-gray-200 p-2">{result.title}</td>
//                       <td className="border border-gray-200 p-2">{formatDate(result.decisionDate)}</td>
//                       <td className="border border-gray-200 p-2">
//                         <button 
//                           className="text-sm text-blue-600 hover:text-blue-800 font-medium disabled:text-gray-400 disabled:cursor-not-allowed flex items-center space-x-1"
//                           onClick={() => handleViewDetails(result.cnr, index)}
//                           disabled={loadingDetailId === index}
//                         >
//                           {loadingDetailId === index ? (
//                             <>
//                               <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-blue-600"></div>
//                               <span>Loading...</span>
//                             </>
//                           ) : (
//                             <span>View Details</span>
//                           )}
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>
//       )}
//             {/* Case Details Popup */}
//       {showCaseDetails && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
//             <div className="flex justify-between items-center border-b p-4 sticky top-0 bg-white z-10">
//               <h3 className="text-lg font-semibold">Case Details</h3>
//               <button 
//                 onClick={closeDetailsPopup}
//                 className="text-gray-500 hover:text-gray-700"
//               >
//                 <X size={20} />
//               </button>
//             </div>
            
//             <div className="p-4">
//               {isLoadingDetails ? (
//                 <div className="flex justify-center items-center py-20">
//                   <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
//                 </div>
//               ) : detailsError ? (
//                 <div className="bg-red-50 border border-red-200 rounded-md p-4 text-red-700">
//                   {detailsError}
//                 </div>
//               ) : caseDetails ? (
//                 <div>
//                   {/* Case Title */}
//                   <div className="mb-6">
//                     <h2 className="text-xl font-bold mb-2">
//                       {`${caseDetails.filing?.number || ''} - ${caseDetails.parties.petitioners[0]} vs. ${caseDetails.parties.respondents[0]}`}
//                     </h2>
//                     <div className="flex flex-wrap gap-2 items-center">
//                       <span className="text-gray-600 text-sm">CNR: {caseDetails.cnr}</span>
//                       <span className="text-gray-600 text-sm mx-2">|</span>
//                       <span className="text-gray-600 text-sm">Filed: {formatDate(caseDetails.filing?.date)}</span>
//                       <span className="text-gray-600 text-sm mx-2">|</span>
//                       <StatusBadge status={caseDetails.status.caseStage || 'PENDING'} />
//                     </div>
//                   </div>
                  
//                   {/* Tabs */}
//                   <div className="border-b mb-4">
//                     <div className="flex overflow-x-auto">
//                       <button 
//                         className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${activeTab === 'overview' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
//                         onClick={() => setActiveTab('overview')}
//                       >
//                         Overview
//                       </button>
//                       <button 
//                         className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${activeTab === 'parties' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
//                         onClick={() => setActiveTab('parties')}
//                       >
//                         Parties
//                       </button>
//                       <button 
//                         className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${activeTab === 'history' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
//                         onClick={() => setActiveTab('history')}
//                       >
//                         Case History
//                       </button>
//                       <button 
//                         className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${activeTab === 'acts' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
//                         onClick={() => setActiveTab('acts')}
//                       >
//                         Acts
//                       </button>
//                       <button 
//                         className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${activeTab === 'subMatters' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
//                         onClick={() => setActiveTab('subMatters')}
//                       >
//                         Sub Matters
//                       </button>
//                       <button 
//                         className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${activeTab === 'ia' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
//                         onClick={() => setActiveTab('ia')}
//                       >
//                         IA Details
//                       </button>
//                       <button 
//                         className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${activeTab === 'documents' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
//                         onClick={() => setActiveTab('documents')}
//                       >
//                         Documents
//                       </button>
//                       <button 
//                         className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${activeTab === 'objections' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
//                         onClick={() => setActiveTab('objections')}
//                       >
//                         Objections
//                       </button>
//                       {caseDetails.orders && caseDetails.orders.length > 0 && (
//                         <button 
//                           className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${activeTab === 'orders' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
//                           onClick={() => setActiveTab('orders')}
//                         >
//                           Orders
//                         </button>
//                       )}
//                     </div>
//                   </div>

//                   {/* Tab Content */}
//                   <div className="mb-4">
//                                     {/* Overview Tab */}
//                     {activeTab === 'overview' && (
//                       <div className="space-y-6">
//                         {/* Case Information */}
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                           <div>
//                             <h3 className="text-sm font-medium text-gray-500 mb-1">Filing Number</h3>
//                             <p className="text-sm">{caseDetails.filing?.number || 'N/A'}</p>
//                           </div>
//                           <div>
//                             <h3 className="text-sm font-medium text-gray-500 mb-1">Filing Date</h3>
//                             <p className="text-sm">{formatDate(caseDetails.filing?.date)}</p>
//                           </div>
//                           <div>
//                             <h3 className="text-sm font-medium text-gray-500 mb-1">Registration Number</h3>
//                             <p className="text-sm">{caseDetails.registration?.number || 'N/A'}</p>
//                           </div>
//                           <div>
//                             <h3 className="text-sm font-medium text-gray-500 mb-1">Registration Date</h3>
//                             <p className="text-sm">{formatDate(caseDetails.registration?.date)}</p>
//                           </div>
//                         </div>
                        
//                         {/* Category Information */}
//                         <div>
//                           <h3 className="font-medium mb-2">Category Information</h3>
//                           <div className="grid grid-cols-1 gap-4 bg-gray-50 p-4 rounded-md">
//                             <div>
//                               <p className="text-sm text-gray-500">Category</p>
//                               <p className="text-sm">{caseDetails.categoryDetails?.category || 'N/A'}</p>
//                             </div>
//                             {caseDetails.categoryDetails?.subCategory && (
//                               <div>
//                                 <p className="text-sm text-gray-500">Sub Category</p>
//                                 <p className="text-sm">{caseDetails.categoryDetails.subCategory}</p>
//                               </div>
//                             )}
//                             {caseDetails.categoryDetails?.subSubCategory && (
//                               <div>
//                                 <p className="text-sm text-gray-500">Sub-Sub Category</p>
//                                 <p className="text-sm">{caseDetails.categoryDetails.subSubCategory}</p>
//                               </div>
//                             )}
//                           </div>
//                         </div>
                        
//                         {/* Status Information */}
//                         <div>
//                           <h3 className="font-medium mb-2">Status Information</h3>
//                           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-md">
//                             <div>
//                               <p className="text-sm text-gray-500">Case Stage</p>
//                               <p className="text-sm">{caseDetails.status.caseStage || 'N/A'}</p>
//                             </div>
//                             <div>
//                               <p className="text-sm text-gray-500">First Hearing Date</p>
//                               <p className="text-sm">{formatDate(caseDetails.status.firstHearingDate)}</p>
//                             </div>
//                             <div>
//                               <p className="text-sm text-gray-500">Next Hearing Date</p>
//                               <p className="text-sm">{formatDate(caseDetails.status.nextHearingDate)}</p>
//                             </div>
//                             {caseDetails.status.decisionDate && (
//                               <div>
//                                 <p className="text-sm text-gray-500">Decision Date</p>
//                                 <p className="text-sm">{formatDate(caseDetails.status.decisionDate)}</p>
//                               </div>
//                             )}
//                             {caseDetails.status.natureOfDisposal && (
//                               <div>
//                                 <p className="text-sm text-gray-500">Nature of Disposal</p>
//                                 <p className="text-sm">{caseDetails.status.natureOfDisposal}</p>
//                               </div>
//                             )}
//                             <div>
//                               <p className="text-sm text-gray-500">Court and Judge</p>
//                               <p className="text-sm">{caseDetails.status.courtNumberAndJudge || 'N/A'}</p>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     )}
                    
//                     {/* Parties Tab */}
//                     {activeTab === 'parties' && (
//                       <div className="space-y-6">
//                         {/* Petitioners */}
//                         <div>
//                           <h3 className="font-medium mb-2">Petitioners</h3>
//                           <ul className="bg-gray-50 p-4 rounded-md space-y-2">
//                             {caseDetails.parties.petitioners.map((petitioner, index) => (
//                               <li key={index} className="text-sm">{petitioner}</li>
//                             ))}
//                           </ul>
//                         </div>
                        
//                         {/* Respondents */}
//                         <div>
//                           <h3 className="font-medium mb-2">Respondents</h3>
//                           <ul className="bg-gray-50 p-4 rounded-md space-y-2">
//                             {caseDetails.parties.respondents.map((respondent, index) => (
//                               <li key={index} className="text-sm">{respondent}</li>
//                             ))}
//                           </ul>
//                         </div>
                        
//                         {/* Advocates */}
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                           <div>
//                             <h3 className="font-medium mb-2">Petitioner Advocates</h3>
//                             {caseDetails.parties.petitionerAdvocates && caseDetails.parties.petitionerAdvocates.length > 0 ? (
//                               <ul className="bg-gray-50 p-4 rounded-md space-y-2">
//                                 {caseDetails.parties.petitionerAdvocates.map((advocate, index) => (
//                                   <li key={index} className="text-sm">{advocate}</li>
//                                 ))}
//                               </ul>
//                             ) : (
//                               <p className="bg-gray-50 p-4 rounded-md text-sm text-gray-500">No advocate information available</p>
//                             )}
//                           </div>
//                           <div>
//                             <h3 className="font-medium mb-2">Respondent Advocates</h3>
//                             {caseDetails.parties.respondentAdvocates && caseDetails.parties.respondentAdvocates.length > 0 ? (
//                               <ul className="bg-gray-50 p-4 rounded-md space-y-2">
//                                 {caseDetails.parties.respondentAdvocates.map((advocate, index) => (
//                                   <li key={index} className="text-sm">{advocate}</li>
//                                 ))}
//                               </ul>
//                             ) : (
//                               <p className="bg-gray-50 p-4 rounded-md text-sm text-gray-500">No advocate information available</p>
//                             )}
//                           </div>
//                         </div>
//                       </div>
//                     )}
//                                         {/* Acts Tab */}
//                     {activeTab === 'acts' && (
//                       <div>
//                         <h3 className="font-medium mb-4">Acts</h3>
//                         {caseDetails.acts && caseDetails.acts.length > 0 ? (
//                           <div className="bg-gray-50 p-4 rounded-md">
//                             <ul className="space-y-2">
//                               {caseDetails.acts.map((act, index) => (
//                                 <li key={index} className="text-sm">{act}</li>
//                               ))}
//                             </ul>
//                           </div>
//                         ) : (
//                           <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 text-yellow-700">
//                             No acts listed for this case.
//                           </div>
//                         )}
//                       </div>
//                     )}

//                     {/* Sub Matters Tab */}
//                     {activeTab === 'subMatters' && (
//                       <div>
//                         <h3 className="font-medium mb-4">Sub Matters</h3>
//                         {caseDetails.subMatters && caseDetails.subMatters.length > 0 ? (
//                           <div className="bg-gray-50 p-4 rounded-md">
//                             <ul className="space-y-2">
//                               {caseDetails.subMatters.map((matter, index) => (
//                                 <li key={index} className="text-sm">{matter}</li>
//                               ))}
//                             </ul>
//                           </div>
//                         ) : (
//                           <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 text-yellow-700">
//                             No sub matters available for this case.
//                           </div>
//                         )}
//                       </div>
//                     )}

//                     {/* History Tab */}
//                     {activeTab === 'history' && (
//                       <div>
//                         <h3 className="font-medium mb-4">Case History</h3>
//                         {caseDetails.history && caseDetails.history.length > 0 ? (
//                           <div className="overflow-x-auto">
//                             <table className="min-w-full border-collapse">
//                               <thead>
//                                 <tr className="bg-gray-100">
//                                   <th className="border border-gray-200 p-2 text-left text-xs font-medium text-gray-500">Business Date</th>
//                                   <th className="border border-gray-200 p-2 text-left text-xs font-medium text-gray-500">Next Date</th>
//                                   <th className="border border-gray-200 p-2 text-left text-xs font-medium text-gray-500">Purpose</th>
//                                   <th className="border border-gray-200 p-2 text-left text-xs font-medium text-gray-500">Judge</th>
//                                   <th className="border border-gray-200 p-2 text-left text-xs font-medium text-gray-500">Cause List</th>
//                                 </tr>
//                               </thead>
//                               <tbody>
//                                 {caseDetails.history.map((item, index) => (
//                                   <tr key={index} className="hover:bg-gray-50">
//                                     <td className="border border-gray-200 p-2 text-sm">{formatDate(item.businessDate)}</td>
//                                     <td className="border border-gray-200 p-2 text-sm">{formatDate(item.nextDate)}</td>
//                                     <td className="border border-gray-200 p-2 text-sm">{item.purpose || 'N/A'}</td>
//                                     <td className="border border-gray-200 p-2 text-sm">{item.judge || 'N/A'}</td>
//                                     <td className="border border-gray-200 p-2 text-sm">{item.causeList || 'N/A'}</td>
//                                   </tr>
//                                 ))}
//                               </tbody>
//                             </table>
//                           </div>
//                         ) : (
//                           <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 text-yellow-700">
//                             No history records available for this case.
//                           </div>
//                         )}
//                       </div>
//                     )}

//                     {/* IA Details Tab */}
//                     {activeTab === 'ia' && (
//                       <div>
//                         <h3 className="font-medium mb-4">IA Details</h3>
//                         {caseDetails.iaDetails && caseDetails.iaDetails.length > 0 ? (
//                           <div className="overflow-x-auto">
//                             <table className="min-w-full border-collapse">
//                               <thead>
//                                 <tr className="bg-gray-100">
//                                   <th className="border border-gray-200 p-2 text-left text-xs font-medium text-gray-500">IA Number</th>
//                                   <th className="border border-gray-200 p-2 text-left text-xs font-medium text-gray-500">Party</th>
//                                   <th className="border border-gray-200 p-2 text-left text-xs font-medium text-gray-500">Filing Date</th>
//                                   <th className="border border-gray-200 p-2 text-left text-xs font-medium text-gray-500">Next Date</th>
//                                   <th className="border border-gray-200 p-2 text-left text-xs font-medium text-gray-500">Status</th>
//                                 </tr>
//                               </thead>
//                               <tbody>
//                                 {caseDetails.iaDetails.map((ia, index) => (
//                                   <tr key={index} className="hover:bg-gray-50">
//                                     <td className="border border-gray-200 p-2 text-sm">{ia.iaNumber}</td>
//                                     <td className="border border-gray-200 p-2 text-sm">{ia.party}</td>
//                                     <td className="border border-gray-200 p-2 text-sm">{formatDate(ia.dateOfFiling)}</td>
//                                     <td className="border border-gray-200 p-2 text-sm">{formatDate(ia.nextDate)}</td>
//                                     <td className="border border-gray-200 p-2 text-sm">
//                                       <StatusBadge status={ia.status} />
//                                     </td>
//                                   </tr>
//                                 ))}
//                               </tbody>
//                             </table>
//                           </div>
//                         ) : (
//                           <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 text-yellow-700">
//                             No IA details available for this case.
//                           </div>
//                         )}
//                       </div>
//                     )}
//                                         {/* Documents Tab */}
//                     {activeTab === 'documents' && (
//                       <div>
//                         <h3 className="font-medium mb-4">Document Details</h3>
//                         {caseDetails.documentDetails && caseDetails.documentDetails.length > 0 ? (
//                           <div className="overflow-x-auto">
//                             <table className="min-w-full border-collapse">
//                               <thead>
//                                 <tr className="bg-gray-100">
//                                   <th className="border border-gray-200 p-2 text-left text-xs font-medium text-gray-500">Doc. Number</th>
//                                   <th className="border border-gray-200 p-2 text-left text-xs font-medium text-gray-500">Document Name</th>
//                                   <th className="border border-gray-200 p-2 text-left text-xs font-medium text-gray-500">Receiving Date</th>
//                                   <th className="border border-gray-200 p-2 text-left text-xs font-medium text-gray-500">Filed By</th>
//                                   <th className="border border-gray-200 p-2 text-left text-xs font-medium text-gray-500">Advocate Name</th>
//                                 </tr>
//                               </thead>
//                               <tbody>
//                                 {caseDetails.documentDetails.map((doc, index) => (
//                                   <tr key={index} className="hover:bg-gray-50">
//                                     <td className="border border-gray-200 p-2 text-sm">{doc.documentNumber}</td>
//                                     <td className="border border-gray-200 p-2 text-sm">{doc.documentName}</td>
//                                     <td className="border border-gray-200 p-2 text-sm">{formatDate(doc.receivingDate)}</td>
//                                     <td className="border border-gray-200 p-2 text-sm">{doc.filedBy || 'N/A'}</td>
//                                     <td className="border border-gray-200 p-2 text-sm">{doc.advocateName || 'N/A'}</td>
//                                   </tr>
//                                 ))}
//                               </tbody>
//                             </table>
//                           </div>
//                         ) : (
//                           <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 text-yellow-700">
//                             No document details available for this case.
//                           </div>
//                         )}
//                       </div>
//                     )}

//                     {/* Objections Tab */}
//                     {activeTab === 'objections' && (
//                       <div>
//                         <h3 className="font-medium mb-4">Objections</h3>
//                         {caseDetails.objections && caseDetails.objections.length > 0 ? (
//                           <div className="space-y-4">
//                             {caseDetails.objections.map((objection, index) => (
//                               <div key={index} className="bg-gray-50 p-4 rounded-md">
//                                 <p className="text-sm">{objection}</p>
//                               </div>
//                             ))}
//                           </div>
//                         ) : (
//                           <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 text-yellow-700">
//                             No objections listed for this case.
//                           </div>
//                         )}
//                       </div>
//                     )}
                    
//                     {/* Orders Tab */}
//                     {activeTab === 'orders' && (
//                       <div>
//                         <h3 className="font-medium mb-4">Orders</h3>
//                         {caseDetails.orders && caseDetails.orders.length > 0 ? (
//                           <div className="space-y-3">
//                             {caseDetails.orders.map((order, index) => (
//                               <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
//                                 <div className="flex items-center space-x-4">
//                                   <span className="text-sm font-medium">Order {order.number}</span>
//                                   <span className="text-sm text-gray-500">{formatDate(order.date)}</span>
//                                 </div>
//                                 {order.orderURL && (
//                                   <a 
//                                     href={order.orderURL} 
//                                     target="_blank" 
//                                     rel="noopener noreferrer"
//                                     className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 text-sm"
//                                   >
//                                     <span>View Order</span>
//                                     <ExternalLink size={14} />
//                                   </a>
//                                 )}
//                               </div>
//                             ))}
//                           </div>
//                         ) : (
//                           <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 text-yellow-700">
//                             No orders available for this case.
//                           </div>
//                         )}
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               ) : null}
//             </div>
            
//             <div className="border-t p-4 flex justify-end">
//               <button
//                 onClick={closeDetailsPopup}
//                 className="bg-gray-100 text-gray-600 hover:bg-gray-200 px-4 py-2 rounded-md transition-colors"
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default HighCourtSearchPage;



// import React, { useState } from 'react';
// import { Search, X, ExternalLink } from 'lucide-react';

// const HighCourtSearchPage = ({ court, partyNameInput, setPartyNameInput, handlePartySearch }) => {
//   const [stage, setStage] = useState('BOTH');
//   const [year, setYear] = useState(new Date().getFullYear().toString());
//   const [benchId, setBenchId] = useState('0ba5ccaf');
//   const [searchResults, setSearchResults] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [showCaseDetails, setShowCaseDetails] = useState(false);
//   const [caseDetails, setCaseDetails] = useState(null);
//   const [isLoadingDetails, setIsLoadingDetails] = useState(false);
//   const [loadingDetailId, setLoadingDetailId] = useState(null);
//   const [detailsError, setDetailsError] = useState(null);
//   const [activeTab, setActiveTab] = useState('overview');
//   const [searchQuery, setSearchQuery] = useState('');
//   const currentYear = new Date().getFullYear();
//   const years = Array.from({ length: 30 }, (_, i) => (currentYear - i).toString());

//   const filteredResults = searchResults
//     ? searchResults.filter((result) =>
//         Object.values(result).some((value) =>
//           String(value).toLowerCase().includes(searchQuery.toLowerCase())
//         )
//       )
//     : [];

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setError(null);
//     try {
//       const response = await fetch(`https://infrahive-ai-legal-research-gyfsavdfd0c9ehh5.centralindia-01.azurewebsites.net/legal-infrahive/high-court/search/party/`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ name: partyNameInput, stage, year, benchId }),
//       });
//       if (!response.ok) throw new Error('Network response was not ok');
//       setSearchResults(await response.json());
//     } catch (err) {
//       setError(err.message || 'An error occurred during search');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const formatDate = (dateString) => {
//     if (!dateString) return 'N/A';
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
//   };

//   const handleViewDetails = async (cnr, rowIndex) => {
//     setIsLoadingDetails(true);
//     setLoadingDetailId(rowIndex);
//     setDetailsError(null);
//     setActiveTab('overview');
//     try {
//       const response = await fetch(`https://infrahive-ai-legal-research-gyfsavdfd0c9ehh5.centralindia-01.azurewebsites.net/legal-infrahive/high-court/case/`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ cnr }),
//       });
//       if (!response.ok) throw new Error('Failed to fetch case details');
//       setCaseDetails(await response.json());
//       setShowCaseDetails(true);
//     } catch (err) {
//       setDetailsError(err.message || 'Failed to fetch case details');
//     } finally {
//       setIsLoadingDetails(false);
//       setLoadingDetailId(null);
//     }
//   };

//   const closeDetailsPopup = () => {
//     setShowCaseDetails(false);
//     setCaseDetails(null);
//     setDetailsError(null);
//   };

//   const StatusBadge = ({ status }) => {
//     const bgColor = status === 'COMPLETED' || status === 'DISPOSED' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800';
//     return <span className={`px-2 py-1 rounded-full text-xs font-medium ${bgColor}`}>{status}</span>;
//   };

//   const LoadingSpinner = () => <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>;

//   return (
//     <div className="p-6">
//       <h2 className="text-xl font-semibold mb-4">High Court Cases by Party Name</h2>
//       <div className="bg-white p-6 rounded-md border border-gray-200 max-w-xl">
//         {/* <form onSubmit={handleSubmit}>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//             <div className="col-span-2">
//               <label htmlFor="party-input" className="block text-sm font-medium mb-1 text-gray-700">Party Name</label>
//               <input
//                 type="text"
//                 id="party-input"
//                 value={partyNameInput}
//                 onChange={(e) => setPartyNameInput(e.target.value)}
//                 className="w-full border border-gray-200 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-blue-600"
//                 placeholder="Enter party name"
//                 required
//               />
//             </div>
//             <div>
//               <label htmlFor="stage-select" className="block text-sm font-medium mb-1 text-gray-700">Stage</label>
//               <select
//                 id="stage-select"
//                 value={stage}
//                 onChange={(e) => setStage(e.target.value)}
//                 className="w-full border border-gray-200 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-blue-600"
//               >
//                 <option value="BOTH">BOTH</option>
//                 <option value="PENDING">PENDING</option>
//                 <option value="DISPOSED">DISPOSED</option>
//               </select>
//             </div>
//             <div>
//               <label htmlFor="year-select" className="block text-sm font-medium mb-1 text-gray-700">Year</label>
//               <select
//                 id="year-select"
//                 value={year}
//                 onChange={(e) => setYear(e.target.value)}
//                 className="w-full border border-gray-200 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-blue-600"
//               >
//                 {years.map((y) => <option key={y} value={y}>{y}</option>)}
//               </select>
//             </div>
//             <div>
//               <label htmlFor="bench-select" className="block text-sm font-medium mb-1 text-gray-700">Bench ID</label>
//               <input
//                 type="text"
//                 id="bench-select"
//                 value={benchId}
//                 onChange={(e) => setBenchId(e.target.value)}
//                 className="w-full border border-gray-200 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-blue-600"
//               />
//             </div>
//             <div className="md:col-start-2 md:flex md:justify-end items-end">
//               <button
//                 type="submit"
//                 className="w-full md:w-auto bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
//                 disabled={isLoading}
//               >
//                 {isLoading ? <><LoadingSpinner /><span>Searching...</span></> : <><Search size={16} /><span>Search</span></>}
//               </button>
//             </div>
//           </div>
//         </form> */}

//         <form onSubmit={handleSubmit}>
//   <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//     <div className="col-span-2">
//       <label htmlFor="party-input" className="block text-sm font-medium mb-1 text-gray-700">Party Name</label>
//       <input
//         type="text"
//         id="party-input"
//         value={partyNameInput}
//         onChange={(e) => setPartyNameInput(e.target.value)}
//         className="w-full border border-gray-200 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-blue-600"
//         placeholder="Enter party name"
//         required
//       />
//       <div className="text-sm text-gray-500 mt-1">Example: ASHOK</div>
//     </div>
    
//     <div>
//       <label htmlFor="stage-select" className="block text-sm font-medium mb-1 text-gray-700">Stage</label>
//       <select
//         id="stage-select"
//         value={stage}
//         onChange={(e) => setStage(e.target.value)}
//         className="w-full border border-gray-200 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-blue-600"
//       >
//         <option value="BOTH">BOTH</option>
//         <option value="PENDING">PENDING</option>
//         <option value="DISPOSED">DISPOSED</option>
//       </select>
//       <div className="text-sm text-gray-500 mt-1">Example: BOTH</div>
//     </div>
    
//     <div>
//       <label htmlFor="year-select" className="block text-sm font-medium mb-1 text-gray-700">Year</label>
//       <select
//         id="year-select"
//         value={year}
//         onChange={(e) => setYear(e.target.value)}
//         className="w-full border border-gray-200 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-blue-600"
//       >
//         {years.map((y) => <option key={y} value={y}>{y}</option>)}
//       </select>
//       <div className="text-sm text-gray-500 mt-1">Example: 2024</div>
//     </div>
    
//     <div>
//       <label htmlFor="bench-select" className="block text-sm font-medium mb-1 text-gray-700">Bench ID</label>
//       <input
//         type="text"
//         id="bench-select"
//         value={benchId}
//         onChange={(e) => setBenchId(e.target.value)}
//         className="w-full border border-gray-200 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-blue-600"
//       />
//       <div className="text-sm text-gray-500 mt-1">Example: 0ba5ccaf</div>
//     </div>
    
//     <div className="md:col-start-2 md:flex md:justify-end items-end">
//       <button
//         type="submit"
//         className="w-full md:w-auto bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
//         disabled={isLoading}
//       >
//         {isLoading ? 
//           <><LoadingSpinner /><span>Searching...</span></> : 
//           <><Search size={16} /><span>Search</span></>
//         }
//       </button>
//     </div>
//   </div>
// </form>
//       </div>

//       {isLoading && (
//         <div className="mt-6 flex items-center justify-center p-8">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
//         </div>
//       )}

//       {error && (
//         <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-md text-red-700">{error}</div>
//       )}

//       {!isLoading && searchResults && (
//         <div className="mt-6">
//           <div className="flex justify-between items-center mb-3">
//             <h3 className="text-lg font-medium">Search Results</h3>
//             <div className="relative">
//               <input
//                 type="text"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 placeholder="Search Data..."
//                 className="w-64 border border-black shadow-md rounded-md pl-10 p-2 focus:outline-none focus:ring-1 focus:ring-blue-600"
//               />
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <Search size={16} className="text-gray-900" />
//               </div>
//             </div>
//           </div>

//           {filteredResults.length === 0 ? (
//             <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 text-yellow-700">
//               No results found for your search criteria.
//             </div>
//           ) : (
//               <div className="w-full bg-white rounded-lg shadow-sm overflow-hidden border-4 border-white">
//       <table className="w-full">
//         <thead>
//           <tr className="border-b border-white bg-gray-300 mx-auto">
//             <th className="px-6 py-4 text-sm font-medium text-black text-left">CNR</th>
//             <th className="px-6 py-4 text-sm font-medium text-black text-left">CASE NUMBER</th>
//             <th className="px-6 py-4 text-sm font-medium text-black text-left">TITLE</th>
//             <th className="px-6 py-4 text-sm font-medium text-black text-left">DECISION DATE</th>
//             <th className="px-6 py-4 text-sm font-medium text-black text-left">ACTIONS</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredResults.map((result, index) => (
//             <tr 
//               key={index} 
//               className="border-b hover:bg-gray-50 last:border-b-0"
//             >
//               <td className="px-6 py-4 text-sm text-gray-700">
//                 {result.cnr}
//               </td>
//               <td className="px-6 py-4 text-sm text-gray-700">
//                 {`${result.type} ${result.caseNumber}`}
//               </td>
//               <td className="px-6 py-4 text-sm text-gray-700">
//                 {result.title}
//               </td>
//               <td className="px-6 py-4 text-sm text-gray-700">
//                 {formatDate(result.decisionDate)}
//               </td>
//               <td className="px-6 py-4">
//                 <button 
//                   className="flex items-center justify-center w-32 h-10 space-x-2 px-5 py-2 text-sm text-blue-600 bg-blue-100 rounded-full hover:bg-blue-100 transition-colors"
//                   onClick={() => handleViewDetails(result.cnr, index)}
//                   disabled={loadingDetailId === index}
//                 >
//                   {loadingDetailId === index ? (
//                     <div className="flex items-center space-x-2">
//                       <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
//                       <span>Loading...</span>
//                     </div>
//                   ) : (
//                     <span className="flex items-center space-x-1">
//                       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
//                         <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
//                         <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
//                       </svg>
//                       <span>Details</span>
//                     </span>
//                   )}
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//           )}
//         </div>
//       )}

      


//       {showCaseDetails && (
//   <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//     <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
//       <div className="flex justify-between items-center border-b p-4 sticky top-0 bg-white z-10">
//         <h3 className="text-lg font-semibold">Case Details</h3>
//         <button onClick={closeDetailsPopup} className="text-gray-500 hover:text-gray-700"><X size={20} /></button>
//       </div>
//       <div className="p-4">
//         {isLoadingDetails ? (
//           <div className="flex justify-center items-center py-20">
//             <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
//           </div>
//         ) : detailsError ? (
//           <div className="bg-red-50 border border-red-200 rounded-md p-4 text-red-700">{detailsError}</div>
//         ) : caseDetails ? (
//           <div>
//             <div className="mb-6">
//               <h2 className="text-xl font-bold mb-2">{`${caseDetails.filing?.number || ''} - ${caseDetails.parties.petitioners[0]} vs. ${caseDetails.parties.respondents[0]}`}</h2>
//               <div className="flex flex-wrap gap-2 items-center">
//                 <span className="text-black text-sm font-medium">CNR: {caseDetails.cnr}</span>
//                 <span className="text-black text-sm mx-2 font-medium">|</span>
//                 <span className="text-black text-sm font-medium">Filed: {formatDate(caseDetails.filing?.date)}</span>
//                 <span className="text-black text-sm mx-2 font-medium">|</span>
//                 <StatusBadge status={caseDetails.status.caseStage || 'PENDING'} />
//               </div>
//             </div>
//             <div className="border-b mb-4">
//               <div className="flex overflow-x-auto">
//                 {['overview', 'parties', 'history', 'acts', 'subMatters', 'ia', 'documents', 'objections', ...(caseDetails.orders?.length ? ['orders'] : [])].map((tab) => (
//                   <button
//                     key={tab}
//                     className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${activeTab === tab ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
//                     onClick={() => setActiveTab(tab)}
//                   >
//                     {tab.charAt(0).toUpperCase() + tab.slice(1)}
//                   </button>
//                 ))}
//               </div>
//             </div>
//             <div className="mb-4">
//               {activeTab === 'overview' && (
//                 <div className="space-y-6">
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     {[
//                       { label: 'Filing Number', value: caseDetails.filing?.number || 'N/A' },
//                       { label: 'Filing Date', value: formatDate(caseDetails.filing?.date) },
//                       { label: 'Registration Number', value: caseDetails.registration?.number || 'N/A' },
//                       { label: 'Registration Date', value: formatDate(caseDetails.registration?.date) },
//                     ].map((item, index) => (
//                       <div key={index}>
//                         <h3 className="text-sm font-medium text-gray-500 mb-1">{item.label}</h3>
//                         <p className="text-sm">{item.value}</p>
//                       </div>
//                     ))}
//                   </div>
//                   <div>
//                     <h3 className="font-medium mb-2">Category Information</h3>
//                     <div className="grid grid-cols-1 gap-4 bg-gray-50 p-4 rounded-md">
//                       {[
//                         { label: 'Category', value: caseDetails.categoryDetails?.category || 'N/A' },
//                         { label: 'Sub Category', value: caseDetails.categoryDetails?.subCategory },
//                         { label: 'Sub-Sub Category', value: caseDetails.categoryDetails?.subSubCategory },
//                       ].map((item, index) => item.value && (
//                         <div key={index}>
//                           <p className="text-sm text-gray-500">{item.label}</p>
//                           <p className="text-sm">{item.value}</p>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                   <div>
//                     <h3 className="font-medium mb-2">Status Information</h3>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-md">
//                       {[
//                         { label: 'Case Stage', value: caseDetails.status.caseStage || 'N/A' },
//                         { label: 'First Hearing Date', value: formatDate(caseDetails.status.firstHearingDate) },
//                         { label: 'Next Hearing Date', value: formatDate(caseDetails.status.nextHearingDate) },
//                         { label: 'Decision Date', value: formatDate(caseDetails.status.decisionDate) },
//                         { label: 'Nature of Disposal', value: caseDetails.status.natureOfDisposal },
//                         { label: 'Court and Judge', value: caseDetails.status.courtNumberAndJudge || 'N/A' },
//                       ].map((item, index) => item.value && (
//                         <div key={index}>
//                           <p className="text-sm text-gray-500">{item.label}</p>
//                           <p className="text-sm">{item.value}</p>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               )}
//               {activeTab === 'parties' && (
//                 <div className="space-y-6">
//                   <div>
//                     <h3 className="font-medium mb-2">Petitioners</h3>
//                     <ul className="bg-gray-50 p-4 rounded-md space-y-2">
//                       {caseDetails.parties.petitioners.map((petitioner, index) => (
//                         <li key={index} className="text-sm">{petitioner}</li>
//                       ))}
//                     </ul>
//                   </div>
//                   <div>
//                     <h3 className="font-medium mb-2">Respondents</h3>
//                     <ul className="bg-gray-50 p-4 rounded-md space-y-2">
//                       {caseDetails.parties.respondents.map((respondent, index) => (
//                         <li key={index} className="text-sm">{respondent}</li>
//                       ))}
//                     </ul>
//                   </div>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <div>
//                       <h3 className="font-medium mb-2">Petitioner Advocates</h3>
//                       {caseDetails.parties.petitionerAdvocates?.length ? (
//                         <ul className="bg-gray-50 p-4 rounded-md space-y-2">
//                           {caseDetails.parties.petitionerAdvocates.map((advocate, index) => (
//                             <li key={index} className="text-sm">{advocate}</li>
//                           ))}
//                         </ul>
//                       ) : (
//                         <p className="bg-gray-50 p-4 rounded-md text-sm text-gray-500">No advocate information available</p>
//                       )}
//                     </div>
//                     <div>
//                       <h3 className="font-medium mb-2">Respondent Advocates</h3>
//                       {caseDetails.parties.respondentAdvocates?.length ? (
//                         <ul className="bg-gray-50 p-4 rounded-md space-y-2">
//                           {caseDetails.parties.respondentAdvocates.map((advocate, index) => (
//                             <li key={index} className="text-sm">{advocate}</li>
//                           ))}
//                         </ul>
//                       ) : (
//                         <p className="bg-gray-50 p-4 rounded-md text-sm text-gray-500">No advocate information available</p>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               )}
//               {activeTab === 'acts' && (
//                 <div>
//                   <h3 className="font-medium mb-4">Acts</h3>
//                   {caseDetails.acts?.length ? (
//                     <div className="bg-gray-50 p-4 rounded-md">
//                       <ul className="space-y-2">
//                         {caseDetails.acts.map((act, index) => (
//                           <li key={index} className="text-sm">
//                             {/* Fix: Check if act is an object and render appropriately */}
//                             {typeof act === 'object' && act !== null 
//                               ? `${act.act || ''} ${act.section ? `- ${act.section}` : ''}`
//                               : act}
//                           </li>
//                         ))}
//                       </ul>
//                     </div>
//                   ) : (
//                     <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 text-yellow-700">No acts listed for this case.</div>
//                   )}
//                 </div>
//               )}
//               {activeTab === 'subMatters' && (
//                 <div>
//                   <h3 className="font-medium mb-4">Sub Matters</h3>
//                   {caseDetails.subMatters?.length ? (
//                     <div className="bg-gray-50 p-4 rounded-md">
//                       <ul className="space-y-2">
//                         {caseDetails.subMatters.map((matter, index) => (
//                           <li key={index} className="text-sm">
//                             {/* Fix: Check if matter is an object and render appropriately */}
//                             {typeof matter === 'object' && matter !== null
//                               ? JSON.stringify(matter)
//                               : matter}
//                           </li>
//                         ))}
//                       </ul>
//                     </div>
//                   ) : (
//                     <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 text-yellow-700">No sub matters available for this case.</div>
//                   )}
//                 </div>
//               )}
//               {activeTab === 'history' && (
//                 <div>
//                   <h3 className="font-medium mb-4">Case History</h3>
//                   {caseDetails.history?.length ? (
//                     <div className="overflow-x-auto">
//                       <table className="min-w-full border-collapse">
//                         <thead>
//                           <tr className="bg-gray-100">
//                             <th className="border border-gray-300 p-2 text-left text-xs font-medium text-gray-500">Business Date</th>
//                             <th className="border border-gray-300 p-2 text-left text-xs font-medium text-gray-500">Next Date</th>
//                             <th className="border border-gray-300 p-2 text-left text-xs font-medium text-gray-500">Purpose</th>
//                             <th className="border border-gray-300 p-2 text-left text-xs font-medium text-gray-500">Judge</th>
//                             <th className="border border-gray-300 p-2 text-left text-xs font-medium text-gray-500">Cause List</th>
//                           </tr>
//                         </thead>
//                         <tbody>
//                           {caseDetails.history.map((item, index) => (
//                             <tr key={index} className="hover:bg-gray-50">
//                               <td className="border border-gray-300 p-2 text-sm">{formatDate(item.businessDate)}</td>
//                               <td className="border border-gray-300 p-2 text-sm">{formatDate(item.nextDate)}</td>
//                               <td className="border border-gray-300 p-2 text-sm">{item.purpose || 'N/A'}</td>
//                               <td className="border border-gray-300 p-2 text-sm">{item.judge || 'N/A'}</td>
//                               <td className="border border-gray-300 p-2 text-sm">{item.causeList || 'N/A'}</td>
//                             </tr>
//                           ))}
//                         </tbody>
//                       </table>
//                     </div>
//                   ) : (
//                     <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 text-yellow-700">No history records available for this case.</div>
//                   )}
//                 </div>
//               )}
//               {activeTab === 'ia' && (
//                 <div>
//                   <h3 className="font-medium mb-4">IA Details</h3>
//                   {caseDetails.iaDetails?.length ? (
//                     <div className="overflow-x-auto">
//                       <table className="min-w-full border-collapse">
//                         <thead>
//                           <tr className="bg-gray-100">
//                             <th className="border border-gray-300 p-2 text-left text-xs font-medium text-gray-500">IA Number</th>
//                             <th className="border border-gray-300 p-2 text-left text-xs font-medium text-gray-500">Party</th>
//                             <th className="border border-gray-300 p-2 text-left text-xs font-medium text-gray-500">Filing Date</th>
//                             <th className="border border-gray-300 p-2 text-left text-xs font-medium text-gray-500">Next Date</th>
//                             <th className="border border-gray-300 p-2 text-left text-xs font-medium text-gray-500">Status</th>
//                           </tr>
//                         </thead>
//                         <tbody>
//                           {caseDetails.iaDetails.map((ia, index) => (
//                             <tr key={index} className="hover:bg-gray-50">
//                               <td className="border border-gray-300 p-2 text-sm">{ia.iaNumber}</td>
//                               <td className="border border-gray-300 p-2 text-sm">{ia.party}</td>
//                               <td className="border border-gray-300 p-2 text-sm">{formatDate(ia.dateOfFiling)}</td>
//                               <td className="border border-gray-300 p-2 text-sm">{formatDate(ia.nextDate)}</td>
//                               <td className="border border-gray-300 p-2 text-sm"><StatusBadge status={ia.status} /></td>
//                             </tr>
//                           ))}
//                         </tbody>
//                       </table>
//                     </div>
//                   ) : (
//                     <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 text-yellow-700">No IA details available for this case.</div>
//                   )}
//                 </div>
//               )}
//               {activeTab === 'documents' && (
//                 <div>
//                   <h3 className="font-medium mb-4">Document Details</h3>
//                   {caseDetails.documentDetails?.length ? (
//                     <div className="overflow-x-auto">
//                       <table className="min-w-full border-collapse">
//                         <thead>
//                           <tr className="bg-gray-100">
//                             <th className="border border-gray-300 p-2 text-left text-xs font-medium text-gray-500">Doc. Number</th>
//                             <th className="border border-gray-300 p-2 text-left text-xs font-medium text-gray-500">Document Name</th>
//                             <th className="border border-gray-300 p-2 text-left text-xs font-medium text-gray-500">Receiving Date</th>
//                             <th className="border border-gray-300 p-2 text-left text-xs font-medium text-gray-500">Filed By</th>
//                             <th className="border border-gray-300 p-2 text-left text-xs font-medium text-gray-500">Advocate Name</th>
//                           </tr>
//                         </thead>
//                         <tbody>
//                           {caseDetails.documentDetails.map((doc, index) => (
//                             <tr key={index} className="hover:bg-gray-50">
//                               <td className="border border-gray-300 p-2 text-sm">{doc.documentNumber}</td>
//                               <td className="border border-gray-300 p-2 text-sm">{doc.documentName}</td>
//                               <td className="border border-gray-300 p-2 text-sm">{formatDate(doc.receivingDate)}</td>
//                               <td className="border border-gray-300 p-2 text-sm">{doc.filedBy || 'N/A'}</td>
//                               <td className="border border-gray-300 p-2 text-sm">{doc.advocateName || 'N/A'}</td>
//                             </tr>
//                           ))}
//                         </tbody>
//                       </table>
//                     </div>
//                   ) : (
//                     <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 text-yellow-700">No document details available for this case.</div>
//                   )}
//                 </div>
//               )}
//               {activeTab === 'objections' && (
//                 <div>
//                   <h3 className="font-medium mb-4">Objections</h3>
//                   {caseDetails.objections?.length ? (
//                     <div className="space-y-4">
//                       {caseDetails.objections.map((objection, index) => (
//                         <div key={index} className="bg-gray-50 p-4 rounded-md">
//                           <p className="text-sm">
//                             {/* Fix: Check if objection is an object and render appropriately */}
//                             {typeof objection === 'object' && objection !== null
//                               ? JSON.stringify(objection)
//                               : objection}
//                           </p>
//                         </div>
//                       ))}
//                     </div>
//                   ) : (
//                     <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 text-yellow-700">No objections listed for this case.</div>
//                   )}
//                 </div>
//               )}
//               {activeTab === 'orders' && (
//                 <div>
//                   <h3 className="font-medium mb-4">Orders</h3>
//                   {caseDetails.orders?.length ? (
//                     <div className="space-y-3">
//                       {caseDetails.orders.map((order, index) => (
//                         <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
//                           <div className="flex items-center space-x-4">
//                             <span className="text-sm font-medium">Order {order.number}</span>
//                             <span className="text-sm text-gray-500">{formatDate(order.date)}</span>
//                           </div>
//                           {order.orderURL && (
//                             <a
//                               href={order.orderURL}
//                               target="_blank"
//                               rel="noopener noreferrer"
//                               className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 text-sm"
//                             >
//                               <span>View Order</span>
//                               <ExternalLink size={14} />
//                             </a>
//                           )}
//                         </div>
//                       ))}
//                     </div>
//                   ) : (
//                     <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 text-yellow-700">No orders available for this case.</div>
//                   )}
//                 </div>
//               )}
//             </div>
//           </div>
//         ) : null}
//       </div>
//       <div className="border-t p-4 flex justify-end">
//         <button onClick={closeDetailsPopup} className="bg-gray-100 text-gray-600 hover:bg-gray-200 px-4 py-2 rounded-md transition-colors">Close</button>
//       </div>
//     </div>
//   </div>
// )}
//     </div>
//   );
// };

// export default HighCourtSearchPage;






import React, { useState } from 'react';
import { Search, X, ExternalLink, AlertTriangle } from 'lucide-react';

const HighCourtSearchPage = ({ court, partyNameInput, setPartyNameInput, handlePartySearch }) => {
  const [stage, setStage] = useState('BOTH');
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const [benchId, setBenchId] = useState('0ba5ccaf');
  const [searchResults, setSearchResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showCaseDetails, setShowCaseDetails] = useState(false);
  const [caseDetails, setCaseDetails] = useState(null);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);
  const [loadingDetailId, setLoadingDetailId] = useState(null);
  const [detailsError, setDetailsError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 30 }, (_, i) => (currentYear - i).toString());

  const filteredResults = searchResults
    ? searchResults.filter((result) =>
        Object.values(result).some((value) =>
          String(value).toLowerCase().includes(searchQuery.toLowerCase())
        )
      )
    : [];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSearchResults(null);

    try {
      const response = await fetch(`https://infrahive-ai-legal-research-gyfsavdfd0c9ehh5.centralindia-01.azurewebsites.net/legal-infrahive/high-court/search/party/`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': 'ECIAPI-XXaRks8npWTVUXpFpYc6nGj88cwPMq25'
        },
        body: JSON.stringify({ name: partyNameInput, stage, year, benchId }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Handle specific API error responses
        if (response.status === 403) {
          throw new Error('Access denied. Your session may have expired or you don\'t have permission to access this resource.');
        } else if (data && data.error) {
          throw new Error(data.error);
        } else {
          throw new Error(`Server error: ${response.status}`);
        }
      }

      // Check if the response contains an error field
      if (data && data.error) {
        throw new Error(data.error);
      }

      setSearchResults(data);
    } catch (err) {
      console.error('Search error:', err);
      setError(err.message || 'An error occurred during search');
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return 'N/A';
      return date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
    } catch (error) {
      return 'N/A';
    }
  };

  const handleViewDetails = async (cnr, rowIndex) => {
    setIsLoadingDetails(true);
    setLoadingDetailId(rowIndex);
    setDetailsError(null);
    setActiveTab('overview');
    
    try {
      const response = await fetch(`https://infrahive-ai-legal-research-gyfsavdfd0c9ehh5.centralindia-01.azurewebsites.net/legal-infrahive/high-court/case/`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': 'ECIAPI-XXaRks8npWTVUXpFpYc6nGj88cwPMq25'
        },
        body: JSON.stringify({ cnr }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Handle specific API error responses
        if (response.status === 403) {
          throw new Error('Access denied. Your session may have expired or you don\'t have permission to access this resource.');
        } else if (data && data.error) {
          throw new Error(data.error);
        } else {
          throw new Error(`Server error: ${response.status}`);
        }
      }

      // Check if the response contains an error field
      if (data && data.error) {
        throw new Error(data.error);
      }

      setCaseDetails(data);
      setShowCaseDetails(true);
    } catch (err) {
      console.error('Details error:', err);
      setDetailsError(err.message || 'Failed to fetch case details');
    } finally {
      setIsLoadingDetails(false);
      setLoadingDetailId(null);
    }
  };

  const retryWithDelay = async (callback, retries = 3, delay = 1000) => {
    try {
      return await callback();
    } catch (error) {
      if (retries > 0) {
        await new Promise(resolve => setTimeout(resolve, delay));
        return retryWithDelay(callback, retries - 1, delay);
      }
      throw error;
    }
  };

  const handleRetry = () => {
    if (error && error.includes("403")) {
      // For 403 errors, we might need to refresh the auth token or inform the user
      setError("Session may have expired. Please refresh the page and try again.");
    } else {
      // For other errors, just retry the search
      handleSubmit(new Event('submit'));
    }
  };

  const closeDetailsPopup = () => {
    setShowCaseDetails(false);
    setCaseDetails(null);
    setDetailsError(null);
  };

  const StatusBadge = ({ status }) => {
    const bgColor = status === 'COMPLETED' || status === 'DISPOSED' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800';
    return <span className={`px-2 py-1 rounded-full text-xs font-medium ${bgColor}`}>{status}</span>;
  };

  const LoadingSpinner = () => <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>;

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">High Court Cases by Party Name</h2>
      <div className="bg-white p-6 rounded-md border border-gray-200 max-w-xl">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="col-span-2">
              <label htmlFor="party-input" className="block text-sm font-medium mb-1 text-gray-700">Party Name</label>
              <input
                type="text"
                id="party-input"
                value={partyNameInput}
                onChange={(e) => setPartyNameInput(e.target.value)}
                className="w-full border border-gray-200 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-blue-600"
                placeholder="Enter party name"
                required
              />
              <div className="text-sm text-gray-500 mt-1">Example: ASHOK</div>
            </div>
            
            <div>
              <label htmlFor="stage-select" className="block text-sm font-medium mb-1 text-gray-700">Stage</label>
              <select
                id="stage-select"
                value={stage}
                onChange={(e) => setStage(e.target.value)}
                className="w-full border border-gray-200 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-blue-600"
              >
                <option value="BOTH">BOTH</option>
                <option value="PENDING">PENDING</option>
                <option value="DISPOSED">DISPOSED</option>
              </select>
              <div className="text-sm text-gray-500 mt-1">Example: BOTH</div>
            </div>
            
            <div>
              <label htmlFor="year-select" className="block text-sm font-medium mb-1 text-gray-700">Year</label>
              <select
                id="year-select"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="w-full border border-gray-200 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-blue-600"
              >
                {years.map((y) => <option key={y} value={y}>{y}</option>)}
              </select>
              <div className="text-sm text-gray-500 mt-1">Example: 2024</div>
            </div>
            
            <div>
              <label htmlFor="bench-select" className="block text-sm font-medium mb-1 text-gray-700">Bench ID</label>
              <input
                type="text"
                id="bench-select"
                value={benchId}
                onChange={(e) => setBenchId(e.target.value)}
                className="w-full border border-gray-200 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
              <div className="text-sm text-gray-500 mt-1">Example: 0ba5ccaf</div>
            </div>
            
            <div className="md:col-start-2 md:flex md:justify-end items-end">
              <button
                type="submit"
                className="w-full md:w-auto bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                disabled={isLoading}
              >
                {isLoading ? 
                  <><LoadingSpinner /><span>Searching...</span></> : 
                  <><Search size={16} /><span>Search</span></>
                }
              </button>
            </div>
          </div>
        </form>
      </div>

      {isLoading && (
        <div className="mt-6 flex items-center justify-center p-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      )}

      {error && (
        <div className="mt-6 bg-red-50 border border-red-200 rounded-md text-red-700">
          <div className="p-4 flex items-start">
            <AlertTriangle className="h-5 w-5 mr-3 flex-shrink-0" />
            <div className="flex-1">
              <p className="font-medium">{error}</p>
              {error.includes("403") && (
                <p className="mt-1 text-sm">This could be due to an expired session, authentication issue, or server restriction.</p>
              )}
              <div className="mt-3">
                <button 
                  onClick={handleRetry}
                  className="bg-red-100 text-red-800 px-3 py-1 rounded-md text-sm hover:bg-red-200 transition-colors"
                >
                  Retry Request
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {!isLoading && searchResults && (
        <div className="mt-6">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-medium">Search Results</h3>
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Data..."
                className="w-64 border border-black shadow-md rounded-md pl-10 p-2 focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={16} className="text-gray-900" />
              </div>
            </div>
          </div>

          {filteredResults.length === 0 ? (
            <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 text-yellow-700">
              No results found for your search criteria.
            </div>
          ) : (
            <div className="w-full bg-white rounded-lg shadow-sm overflow-hidden border-4 border-white">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white bg-gray-300 mx-auto">
                    <th className="px-6 py-4 text-sm font-medium text-black text-left">CNR</th>
                    <th className="px-6 py-4 text-sm font-medium text-black text-left">CASE NUMBER</th>
                    <th className="px-6 py-4 text-sm font-medium text-black text-left">TITLE</th>
                    <th className="px-6 py-4 text-sm font-medium text-black text-left">DECISION DATE</th>
                    <th className="px-6 py-4 text-sm font-medium text-black text-left">ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredResults.map((result, index) => (
                    <tr 
                      key={index} 
                      className="border-b hover:bg-gray-50 last:border-b-0"
                    >
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {result.cnr}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {`${result.type || ''} ${result.caseNumber || ''}`}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {result.title || 'N/A'}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {formatDate(result.decisionDate)}
                      </td>
                      <td className="px-6 py-4">
                        <button 
                          className="flex items-center justify-center w-32 h-10 space-x-2 px-5 py-2 text-sm text-blue-600 bg-blue-100 rounded-full hover:bg-blue-100 transition-colors"
                          onClick={() => handleViewDetails(result.cnr, index)}
                          disabled={loadingDetailId === index}
                        >
                          {loadingDetailId === index ? (
                            <div className="flex items-center space-x-2">
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                              <span>Loading...</span>
                            </div>
                          ) : (
                            <span className="flex items-center space-x-1">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                              </svg>
                              <span>Details</span>
                            </span>
                          )}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {showCaseDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b p-4 sticky top-0 bg-white z-10">
              <h3 className="text-lg font-semibold">Case Details</h3>
              <button onClick={closeDetailsPopup} className="text-gray-500 hover:text-gray-700"><X size={20} /></button>
            </div>
            <div className="p-4">
              {isLoadingDetails ? (
                <div className="flex justify-center items-center py-20">
                  <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
                </div>
              ) : detailsError ? (
                <div className="bg-red-50 border border-red-200 rounded-md p-4">
                  <div className="flex items-start">
                    <AlertTriangle className="h-5 w-5 mr-3 flex-shrink-0 text-red-600" />
                    <div className="flex-1 text-red-700">
                      <p className="font-medium">{detailsError}</p>
                      {detailsError.includes("403") && (
                        <p className="mt-1 text-sm">This could be due to an expired session or authentication issue.</p>
                      )}
                      <div className="mt-3">
                        <button 
                          onClick={() => handleViewDetails(caseDetails?.cnr || "", loadingDetailId)}
                          className="bg-red-100 text-red-800 px-3 py-1 rounded-md text-sm hover:bg-red-200 transition-colors"
                        >
                          Retry
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : caseDetails ? (
                <div>
                  {/* Case Details Content */}
                  <div className="mb-6">
                    <h2 className="text-xl font-bold mb-2">{`${caseDetails.filing?.number || ''} - ${caseDetails.parties?.petitioners?.[0] || 'Unknown'} vs. ${caseDetails.parties?.respondents?.[0] || 'Unknown'}`}</h2>
                    <div className="flex flex-wrap gap-2 items-center">
                      <span className="text-black text-sm font-medium">CNR: {caseDetails.cnr || 'N/A'}</span>
                      <span className="text-black text-sm mx-2 font-medium">|</span>
                      <span className="text-black text-sm font-medium">Filed: {formatDate(caseDetails.filing?.date)}</span>
                      <span className="text-black text-sm mx-2 font-medium">|</span>
                      <StatusBadge status={caseDetails.status?.caseStage || 'PENDING'} />
                    </div>
                  </div>
                  
                  {/* Tab Navigation, etc. goes here */}
                  {/* This should include all the tabs and content from your original component */}
                </div>
              ) : (
                <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 text-yellow-700">
                  No case details available.
                </div>
              )}
            </div>
            <div className="border-t p-4 flex justify-end">
              <button onClick={closeDetailsPopup} className="bg-gray-100 text-gray-600 hover:bg-gray-200 px-4 py-2 rounded-md transition-colors">Close</button>
            </div>
          </div>
        </div>
      )}


      {showCaseDetails && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
    <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
      <div className="flex justify-between items-center border-b p-4 sticky top-0 bg-white z-10">
        <h3 className="text-lg font-semibold">Case Details</h3>
        <button onClick={closeDetailsPopup} className="text-gray-500 hover:text-gray-700"><X size={20} /></button>
      </div>
      <div className="p-4">
        {isLoadingDetails ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
          </div>
        ) : detailsError ? (
          <div className="bg-red-50 border border-red-200 rounded-md p-4 text-red-700">{detailsError}</div>
        ) : caseDetails ? (
          <div>
            <div className="mb-6">
              <h2 className="text-xl font-bold mb-2">{`${caseDetails.filing?.number || ''} - ${caseDetails.parties.petitioners[0]} vs. ${caseDetails.parties.respondents[0]}`}</h2>
              <div className="flex flex-wrap gap-2 items-center">
                <span className="text-black text-sm font-medium">CNR: {caseDetails.cnr}</span>
                <span className="text-black text-sm mx-2 font-medium">|</span>
                <span className="text-black text-sm font-medium">Filed: {formatDate(caseDetails.filing?.date)}</span>
                <span className="text-black text-sm mx-2 font-medium">|</span>
                <StatusBadge status={caseDetails.status.caseStage || 'PENDING'} />
              </div>
            </div>
            <div className="border-b mb-4">
              <div className="flex overflow-x-auto">
                {['overview', 'parties', 'history', 'acts', 'subMatters', 'ia', 'documents', 'objections', ...(caseDetails.orders?.length ? ['orders'] : [])].map((tab) => (
                  <button
                    key={tab}
                    className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${activeTab === tab ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            <div className="mb-4">
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { label: 'Filing Number', value: caseDetails.filing?.number || 'N/A' },
                      { label: 'Filing Date', value: formatDate(caseDetails.filing?.date) },
                      { label: 'Registration Number', value: caseDetails.registration?.number || 'N/A' },
                      { label: 'Registration Date', value: formatDate(caseDetails.registration?.date) },
                    ].map((item, index) => (
                      <div key={index}>
                        <h3 className="text-sm font-medium text-gray-500 mb-1">{item.label}</h3>
                        <p className="text-sm">{item.value}</p>
                      </div>
                    ))}
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">Category Information</h3>
                    <div className="grid grid-cols-1 gap-4 bg-gray-50 p-4 rounded-md">
                      {[
                        { label: 'Category', value: caseDetails.categoryDetails?.category || 'N/A' },
                        { label: 'Sub Category', value: caseDetails.categoryDetails?.subCategory },
                        { label: 'Sub-Sub Category', value: caseDetails.categoryDetails?.subSubCategory },
                      ].map((item, index) => item.value && (
                        <div key={index}>
                          <p className="text-sm text-gray-500">{item.label}</p>
                          <p className="text-sm">{item.value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">Status Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-md">
                      {[
                        { label: 'Case Stage', value: caseDetails.status.caseStage || 'N/A' },
                        { label: 'First Hearing Date', value: formatDate(caseDetails.status.firstHearingDate) },
                        { label: 'Next Hearing Date', value: formatDate(caseDetails.status.nextHearingDate) },
                        { label: 'Decision Date', value: formatDate(caseDetails.status.decisionDate) },
                        { label: 'Nature of Disposal', value: caseDetails.status.natureOfDisposal },
                        { label: 'Court and Judge', value: caseDetails.status.courtNumberAndJudge || 'N/A' },
                      ].map((item, index) => item.value && (
                        <div key={index}>
                          <p className="text-sm text-gray-500">{item.label}</p>
                          <p className="text-sm">{item.value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              {activeTab === 'parties' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-2">Petitioners</h3>
                    <ul className="bg-gray-50 p-4 rounded-md space-y-2">
                      {caseDetails.parties.petitioners.map((petitioner, index) => (
                        <li key={index} className="text-sm">{petitioner}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">Respondents</h3>
                    <ul className="bg-gray-50 p-4 rounded-md space-y-2">
                      {caseDetails.parties.respondents.map((respondent, index) => (
                        <li key={index} className="text-sm">{respondent}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-medium mb-2">Petitioner Advocates</h3>
                      {caseDetails.parties.petitionerAdvocates?.length ? (
                        <ul className="bg-gray-50 p-4 rounded-md space-y-2">
                          {caseDetails.parties.petitionerAdvocates.map((advocate, index) => (
                            <li key={index} className="text-sm">{advocate}</li>
                          ))}
                        </ul>
                      ) : (
                        <p className="bg-gray-50 p-4 rounded-md text-sm text-gray-500">No advocate information available</p>
                      )}
                    </div>
                    <div>
                      <h3 className="font-medium mb-2">Respondent Advocates</h3>
                      {caseDetails.parties.respondentAdvocates?.length ? (
                        <ul className="bg-gray-50 p-4 rounded-md space-y-2">
                          {caseDetails.parties.respondentAdvocates.map((advocate, index) => (
                            <li key={index} className="text-sm">{advocate}</li>
                          ))}
                        </ul>
                      ) : (
                        <p className="bg-gray-50 p-4 rounded-md text-sm text-gray-500">No advocate information available</p>
                      )}
                    </div>
                  </div>
                </div>
              )}
              {activeTab === 'acts' && (
                <div>
                  <h3 className="font-medium mb-4">Acts</h3>
                  {caseDetails.acts?.length ? (
                    <div className="bg-gray-50 p-4 rounded-md">
                      <ul className="space-y-2">
                        {caseDetails.acts.map((act, index) => (
                          <li key={index} className="text-sm">
                            {/* Fix: Check if act is an object and render appropriately */}
                            {typeof act === 'object' && act !== null 
                              ? `${act.act || ''} ${act.section ? `- ${act.section}` : ''}`
                              : act}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 text-yellow-700">No acts listed for this case.</div>
                  )}
                </div>
              )}
              {activeTab === 'subMatters' && (
                <div>
                  <h3 className="font-medium mb-4">Sub Matters</h3>
                  {caseDetails.subMatters?.length ? (
                    <div className="bg-gray-50 p-4 rounded-md">
                      <ul className="space-y-2">
                        {caseDetails.subMatters.map((matter, index) => (
                          <li key={index} className="text-sm">
                            {/* Fix: Check if matter is an object and render appropriately */}
                            {typeof matter === 'object' && matter !== null
                              ? JSON.stringify(matter)
                              : matter}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 text-yellow-700">No sub matters available for this case.</div>
                  )}
                </div>
              )}
              {activeTab === 'history' && (
                <div>
                  <h3 className="font-medium mb-4">Case History</h3>
                  {caseDetails.history?.length ? (
                    <div className="overflow-x-auto">
                      <table className="min-w-full border-collapse">
                        <thead>
                          <tr className="bg-gray-100">
                            <th className="border border-gray-300 p-2 text-left text-xs font-medium text-gray-500">Business Date</th>
                            <th className="border border-gray-300 p-2 text-left text-xs font-medium text-gray-500">Next Date</th>
                            <th className="border border-gray-300 p-2 text-left text-xs font-medium text-gray-500">Purpose</th>
                            <th className="border border-gray-300 p-2 text-left text-xs font-medium text-gray-500">Judge</th>
                            <th className="border border-gray-300 p-2 text-left text-xs font-medium text-gray-500">Cause List</th>
                          </tr>
                        </thead>
                        <tbody>
                          {caseDetails.history.map((item, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                              <td className="border border-gray-300 p-2 text-sm">{formatDate(item.businessDate)}</td>
                              <td className="border border-gray-300 p-2 text-sm">{formatDate(item.nextDate)}</td>
                              <td className="border border-gray-300 p-2 text-sm">{item.purpose || 'N/A'}</td>
                              <td className="border border-gray-300 p-2 text-sm">{item.judge || 'N/A'}</td>
                              <td className="border border-gray-300 p-2 text-sm">{item.causeList || 'N/A'}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 text-yellow-700">No history records available for this case.</div>
                  )}
                </div>
              )}
              {activeTab === 'ia' && (
                <div>
                  <h3 className="font-medium mb-4">IA Details</h3>
                  {caseDetails.iaDetails?.length ? (
                    <div className="overflow-x-auto">
                      <table className="min-w-full border-collapse">
                        <thead>
                          <tr className="bg-gray-100">
                            <th className="border border-gray-300 p-2 text-left text-xs font-medium text-gray-500">IA Number</th>
                            <th className="border border-gray-300 p-2 text-left text-xs font-medium text-gray-500">Party</th>
                            <th className="border border-gray-300 p-2 text-left text-xs font-medium text-gray-500">Filing Date</th>
                            <th className="border border-gray-300 p-2 text-left text-xs font-medium text-gray-500">Next Date</th>
                            <th className="border border-gray-300 p-2 text-left text-xs font-medium text-gray-500">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {caseDetails.iaDetails.map((ia, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                              <td className="border border-gray-300 p-2 text-sm">{ia.iaNumber}</td>
                              <td className="border border-gray-300 p-2 text-sm">{ia.party}</td>
                              <td className="border border-gray-300 p-2 text-sm">{formatDate(ia.dateOfFiling)}</td>
                              <td className="border border-gray-300 p-2 text-sm">{formatDate(ia.nextDate)}</td>
                              <td className="border border-gray-300 p-2 text-sm"><StatusBadge status={ia.status} /></td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 text-yellow-700">No IA details available for this case.</div>
                  )}
                </div>
              )}
              {activeTab === 'documents' && (
                <div>
                  <h3 className="font-medium mb-4">Document Details</h3>
                  {caseDetails.documentDetails?.length ? (
                    <div className="overflow-x-auto">
                      <table className="min-w-full border-collapse">
                        <thead>
                          <tr className="bg-gray-100">
                            <th className="border border-gray-300 p-2 text-left text-xs font-medium text-gray-500">Doc. Number</th>
                            <th className="border border-gray-300 p-2 text-left text-xs font-medium text-gray-500">Document Name</th>
                            <th className="border border-gray-300 p-2 text-left text-xs font-medium text-gray-500">Receiving Date</th>
                            <th className="border border-gray-300 p-2 text-left text-xs font-medium text-gray-500">Filed By</th>
                            <th className="border border-gray-300 p-2 text-left text-xs font-medium text-gray-500">Advocate Name</th>
                          </tr>
                        </thead>
                        <tbody>
                          {caseDetails.documentDetails.map((doc, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                              <td className="border border-gray-300 p-2 text-sm">{doc.documentNumber}</td>
                              <td className="border border-gray-300 p-2 text-sm">{doc.documentName}</td>
                              <td className="border border-gray-300 p-2 text-sm">{formatDate(doc.receivingDate)}</td>
                              <td className="border border-gray-300 p-2 text-sm">{doc.filedBy || 'N/A'}</td>
                              <td className="border border-gray-300 p-2 text-sm">{doc.advocateName || 'N/A'}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 text-yellow-700">No document details available for this case.</div>
                  )}
                </div>
              )}
              {activeTab === 'objections' && (
                <div>
                  <h3 className="font-medium mb-4">Objections</h3>
                  {caseDetails.objections?.length ? (
                    <div className="space-y-4">
                      {caseDetails.objections.map((objection, index) => (
                        <div key={index} className="bg-gray-50 p-4 rounded-md">
                          <p className="text-sm">
                            {/* Fix: Check if objection is an object and render appropriately */}
                            {typeof objection === 'object' && objection !== null
                              ? JSON.stringify(objection)
                              : objection}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 text-yellow-700">No objections listed for this case.</div>
                  )}
                </div>
              )}
              {activeTab === 'orders' && (
                <div>
                  <h3 className="font-medium mb-4">Orders</h3>
                  {caseDetails.orders?.length ? (
                    <div className="space-y-3">
                      {caseDetails.orders.map((order, index) => (
                        <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                          <div className="flex items-center space-x-4">
                            <span className="text-sm font-medium">Order {order.number}</span>
                            <span className="text-sm text-gray-500">{formatDate(order.date)}</span>
                          </div>
                          {order.orderURL && (
                            <a
                              href={order.orderURL}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 text-sm"
                            >
                              <span>View Order</span>
                              <ExternalLink size={14} />
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 text-yellow-700">No orders available for this case.</div>
                  )}
                </div>
              )}
            </div>
          </div>
        ) : null}
      </div>
      <div className="border-t p-4 flex justify-end">
        <button onClick={closeDetailsPopup} className="bg-gray-100 text-gray-600 hover:bg-gray-200 px-4 py-2 rounded-md transition-colors">Close</button>
      </div>
    </div>
  </div>
)}
    </div>
  );
};

export default HighCourtSearchPage;