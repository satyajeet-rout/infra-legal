


// import React, { useState } from 'react';
// import { Search, X, ExternalLink } from 'lucide-react';

// // Error Message Component
// const ErrorMessage = ({ message }) => (
//   <div className="bg-red-50 border border-red-200 rounded-md p-4">
//     <div className="flex">
//       <div className="flex-shrink-0">
//         <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
//           <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
//         </svg>
//       </div>
//       <div className="ml-3">
//         <p className="text-sm text-red-700">{message}</p>
//       </div>
//     </div>
//   </div>
// );

// // Loading Spinner Component
// const LoadingSpinner = () => (
//   <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
// );

// // Status Badge Component
// const StatusBadge = ({ status }) => {
//   let bgColor = 'bg-yellow-100 text-yellow-800';
//   if (status === 'COMPLETED' || status === 'DISPOSED') {
//     bgColor = 'bg-green-100 text-green-800';
//   }
//   return (
//     <span className={`px-2 py-1 rounded-full text-xs font-medium ${bgColor}`}>
//       {status}
//     </span>
//   );
// };
// const PartySearchPage = ({ court, partyNameInput, setPartyNameInput, handlePartySearch }) => {
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
//     // Function to extract year from diary number
//   const extractYearFromDiaryNumber = (diaryNumber) => {
//     const parts = diaryNumber.split('/');
//     if (parts.length === 2) {
//       return parts[1];
//     }
//     return new Date().getFullYear().toString();
//   };

//   // Function to format date
//   const formatDate = (dateString) => {
//     if (!dateString) return 'N/A';
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-IN', {
//       day: '2-digit',
//       month: 'short',
//       year: 'numeric'
//     });
//   };

//   // Function to format case details
//   const formatCaseDetails = (caseNumber) => {
//     const lines = caseNumber.split(/Registered on/);
//     if (lines.length > 1) {
//       return (
//         <>
//           {lines[0]}
//           <br />
//           <span className="text-xs">Registered on{lines[1]}</span>
//         </>
//       );
//     }
//     return caseNumber;
//   };
//     const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setError(null);
//     setSearchResults(null);
    
//     try {
//       const response = await fetch(`https://infrahive-ai-legal-research-gyfsavdfd0c9ehh5.centralindia-01.azurewebsites.net/legal-infrahive/supreme-court/search-party/`, {
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
      
//       const data = await response.json();
      
//       if (data.error) {
//         throw new Error(data.error);
//       }
      
//       if (!response.ok) {
//         throw new Error(`Server responded with status: ${response.status}`);
//       }
      
//       setSearchResults(data);
//     } catch (err) {
//       let errorMessage = 'An error occurred during search';
      
//       if (err.message.includes('403')) {
//         errorMessage = 'Access denied. Please try again later or contact support if the issue persists.';
//       } else if (err.message.includes('Failed to retrieve data')) {
//         errorMessage = 'Unable to fetch results. Please try again later.';
//       }
      
//       setError(errorMessage);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleViewDetails = async (diaryNumber, rowIndex) => {
//     setIsLoadingDetails(true);
//     setLoadingDetailId(rowIndex);
//     setDetailsError(null);
//     setActiveTab('overview');
//     setCaseDetails(null);
    
//     const year = extractYearFromDiaryNumber(diaryNumber);
//     const diaryNumberOnly = diaryNumber.split('/')[0];
    
//     try {
//       const response = await fetch(`https://infrahive-ai-legal-research-gyfsavdfd0c9ehh5.centralindia-01.azurewebsites.net/legal-infrahive/supreme-court/case/`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           diaryNumber: diaryNumberOnly,
//           year: year
//         }),
//       });
      
//       const data = await response.json();
      
//       if (data.error) {
//         throw new Error(data.error);
//       }
      
//       if (!response.ok) {
//         throw new Error(`Server responded with status: ${response.status}`);
//       }
      
//       setCaseDetails(data);
//       setShowCaseDetails(true);
//     } catch (err) {
//       let errorMessage = 'Failed to fetch case details';
      
//       if (err.message.includes('403')) {
//         errorMessage = 'Access denied. Please try again later or contact support if the issue persists.';
//       } else if (err.message.includes('Failed to retrieve data')) {
//         errorMessage = 'Unable to fetch case details. Please try again later.';
//       }
      
//       setDetailsError(errorMessage);
//       setShowCaseDetails(true);
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
//     return (
//     <div className="p-6">
//       <h2 className="text-xl font-semibold mb-4">Supreme Court Cases by Party Name</h2>
//       <div className="bg-white p-6 rounded-md border border-gray-200 max-w-xl">
//         {/* Search Form */}
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
//               </div>
//                   {/* Stage Select */}
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
            
//             {/* Type Select */}
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
            
//             {/* Year Select */}
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
            
//             {/* Search Button */}
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
      
//       {/* Loading and Error States */}
//       {isLoading && (
//         <div className="mt-6 flex items-center justify-center p-8">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
//         </div>
//       )}
      
//         {error && <ErrorMessage message={error} />}
//             {/* Results Section */}
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
//                     <th className="border border-gray-200 p-2 text-left">Diary Number</th>
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
//                       <td className="border border-gray-200 p-2">{result["#"]}</td>
//                       <td className="border border-gray-200 p-2">{result.diaryNumber}</td>
//                       <td className="border border-gray-200 p-2 text-sm">{formatCaseDetails(result.caseNumber)}</td>
//                       <td className="border border-gray-200 p-2">{result.petitioner}</td>
//                       <td className="border border-gray-200 p-2">{result.respondent}</td>
//                       <td className="border border-gray-200 p-2">
//                         <StatusBadge status={result.status} />
//                       </td>
//                       <td className="border border-gray-200 p-2">
//                         <button 
//                           className="text-sm text-blue-600 hover:text-blue-800 font-medium disabled:text-gray-400 disabled:cursor-not-allowed flex items-center space-x-1"
//                           onClick={() => handleViewDetails(result.diaryNumber, index)}
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
//         )}
//             {/* Case Details Modal */}
//       {showCaseDetails && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl max-h-screen overflow-y-auto">
//             {/* Modal Header */}
//             <div className="flex justify-between items-center border-b p-4 sticky top-0 bg-white z-10">
//               <h3 className="text-lg font-semibold">Case Details</h3>
//               <button 
//                 onClick={closeDetailsPopup}
//                 className="text-gray-500 hover:text-gray-700"
//               >
//                 <X size={20} />
//               </button>
//             </div>
            
//             {/* Modal Content */}
//             <div className="p-4">
//               {isLoadingDetails ? (
//                 <div className="flex justify-center items-center py-20">
//                   <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
//                 </div>
//               ) : detailsError ? (
//                 <ErrorMessage message={detailsError} />
//               ) : caseDetails ? (
//                 <div>
//                   {/* Case Title Section */}
//                   <div className="mb-6">
//                     <h2 className="text-xl font-bold mb-2">{caseDetails.title}</h2>
//                     <div className="flex flex-wrap gap-2 items-center">
//                       <span className="text-gray-600 text-sm">CNR: {caseDetails.cnr}</span>
//                       <span className="text-gray-600 text-sm mx-2">|</span>
//                       <span className="text-gray-600 text-sm">Filed: {formatDate(caseDetails.details.filedOn)}</span>
//                       <span className="text-gray-600 text-sm mx-2">|</span>
//                       <StatusBadge status={caseDetails.status.stage} />
//                     </div>
//                   </div>
                  
//                   {/* Tabs Navigation */}
//                   <div className="border-b mb-4">
//                     <div className="flex overflow-x-auto">
//                       {['overview', 'parties', 'history', 'orders', 'defects'].map((tab) => (
//                         <button 
//                           key={tab}
//                           className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${
//                             activeTab === tab 
//                               ? 'text-blue-600 border-b-2 border-blue-600' 
//                               : 'text-gray-500 hover:text-gray-700'
//                           }`}
//                           onClick={() => setActiveTab(tab)}
//                         >
//                           {tab.charAt(0).toUpperCase() + tab.slice(1)}
//                         </button>
//                       ))}
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
//                             <h3 className="text-sm font-medium text-gray-500 mb-1">Case Number</h3>
//                             <p className="text-sm">{caseDetails.details.caseNumber}</p>
//                           </div>
//                           <div>
//                             <h3 className="text-sm font-medium text-gray-500 mb-1">Category</h3>
//                             <p className="text-sm">{caseDetails.details.category}</p>
//                           </div>
//                         </div>
                        
//                         {/* Status Information */}
//                         <div>
//                           <h3 className="font-medium mb-2">Status Information</h3>
//                           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-md">
//                             <div>
//                               <p className="text-sm text-gray-500">Current Status</p>
//                               <p className="text-sm">{caseDetails.status.status}</p>
//                             </div>
//                             <div>
//                               <p className="text-sm text-gray-500">Last Listed On</p>
//                               <p className="text-sm">{formatDate(caseDetails.status.lastListedOn)}</p>
//                             </div>
//                             {caseDetails.status.nextDate && (
//                               <div>
//                                 <p className="text-sm text-gray-500">Next Date</p>
//                                 <p className="text-sm">{formatDate(caseDetails.status.nextDate)}</p>
//                               </div>
//                             )}
//                           </div>
//                               </div>
//                                                     {/* Recent Hearing */}
//                         {caseDetails.history && caseDetails.history.length > 0 && (
//                           <div>
//                             <h3 className="font-medium mb-2">Recent Hearing</h3>
//                             <div className="bg-gray-50 p-4 rounded-md">
//                               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                                 <div>
//                                   <p className="text-sm text-gray-500">Date</p>
//                                   <p className="text-sm">{formatDate(caseDetails.history[0].date)}</p>
//                                 </div>
//                                 <div>
//                                   <p className="text-sm text-gray-500">Type</p>
//                                   <p className="text-sm">{caseDetails.history[0].type}</p>
//                                 </div>
//                                 <div>
//                                   <p className="text-sm text-gray-500">Stage</p>
//                                   <p className="text-sm">{caseDetails.history[0].stage}</p>
//                                 </div>
//                                 <div>
//                                   <p className="text-sm text-gray-500">Purpose</p>
//                                   <p className="text-sm">{caseDetails.history[0].purpose}</p>
//                                 </div>
//                                 <div className="col-span-2">
//                                   <p className="text-sm text-gray-500">Bench</p>
//                                   <p className="text-sm">{caseDetails.history[0].judge}</p>
//                                 </div>
//                                 <div className="col-span-2">
//                                   <p className="text-sm text-gray-500">Remarks</p>
//                                   <p className="text-sm font-medium">{caseDetails.history[0].remarks}</p>
//                                 </div>
//                               </div>
//                             </div>
//                           </div>
//                         )}
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
//                             <p className="bg-gray-50 p-4 rounded-md text-sm">{caseDetails.parties.petitionerAdvocates}</p>
//                           </div>
//                           <div>
//                             <h3 className="font-medium mb-2">Respondent Advocates</h3>
//                             <p className="bg-gray-50 p-4 rounded-md text-sm">{caseDetails.parties.respondentAdvocates}</p>
//                           </div>
//                         </div>
//                       </div>
//                     )}
                    
//                     {/* History Tab */}
//                     {activeTab === 'history' && (
//                       <div>
//                         <h3 className="font-medium mb-4">Case History</h3>
//                         <div className="overflow-x-auto">
//                           <table className="min-w-full border-collapse">
//                             <thead>
//                               <tr className="bg-gray-100">
//                                 <th className="border border-gray-200 p-2 text-left text-xs font-medium text-gray-500">Date</th>
//                                 <th className="border border-gray-200 p-2 text-left text-xs font-medium text-gray-500">Type</th>
//                                 <th className="border border-gray-200 p-2 text-left text-xs font-medium text-gray-500">Stage</th>
//                                 <th className="border border-gray-200 p-2 text-left text-xs font-medium text-gray-500">Purpose</th>
//                                 <th className="border border-gray-200 p-2 text-left text-xs font-medium text-gray-500">Judge</th>
//                                 <th className="border border-gray-200 p-2 text-left text-xs font-medium text-gray-500">Remarks</th>
//                               </tr>
//                             </thead>
//                             <tbody>
//                               {caseDetails.history.map((item, index) => (
//                                 <tr key={index} className="hover:bg-gray-50">
//                                   <td className="border border-gray-200 p-2 text-sm">{formatDate(item.date)}</td>
//                                   <td className="border border-gray-200 p-2 text-sm">{item.type}</td>
//                                   <td className="border border-gray-200 p-2 text-sm">{item.stage}</td>
//                                   <td className="border border-gray-200 p-2 text-sm">{item.purpose}</td>
//                                   <td className="border border-gray-200 p-2 text-sm">{item.judge}</td>
//                                   <td className="border border-gray-200 p-2 text-sm">{item.remarks}</td>
//                                 </tr>
//                               ))}
//                             </tbody>
//                           </table>
//                         </div>
//                       </div>
//                           )}
//                                           {/* Orders Tab */}
//                     {activeTab === 'orders' && (
//                       <div>
//                         <h3 className="font-medium mb-4">Orders</h3>
//                         {caseDetails.orders && caseDetails.orders.length > 0 ? (
//                           <div className="space-y-3">
//                             {caseDetails.orders.map((order, index) => (
//                               <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
//                                 <span className="text-sm font-medium">{formatDate(order.date)}</span>
//                                 <a 
//                                   href={order.url} 
//                                   target="_blank" 
//                                   rel="noopener noreferrer"
//                                   className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 text-sm"
//                                 >
//                                   <span>View Order</span>
//                                   <ExternalLink size={14} />
//                                 </a>
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
                    
//                     {/* Defects Tab */}
//                     {activeTab === 'defects' && (
//                       <div>
//                         <h3 className="font-medium mb-4">Defects</h3>
//                         {caseDetails.defects && caseDetails.defects.length > 0 ? (
//                           <div className="overflow-x-auto">
//                             <table className="min-w-full border-collapse">
//                               <thead>
//                                 <tr className="bg-gray-100">
//                                   <th className="border border-gray-200 p-2 text-left text-xs font-medium text-gray-500">S.No</th>
//                                   <th className="border border-gray-200 p-2 text-left text-xs font-medium text-gray-500">Defect</th>
//                                   <th className="border border-gray-200 p-2 text-left text-xs font-medium text-gray-500">Remarks</th>
//                                   <th className="border border-gray-200 p-2 text-left text-xs font-medium text-gray-500">Notification Date</th>
//                                   <th className="border border-gray-200 p-2 text-left text-xs font-medium text-gray-500">Removal Date</th>
//                                 </tr>
//                               </thead>
//                               <tbody>
//                                 {caseDetails.defects.map((defect, index) => (
//                                   <tr key={index} className="hover:bg-gray-50">
//                                     <td className="border border-gray-200 p-2 text-sm">{defect.serialNumber}</td>
//                                     <td className="border border-gray-200 p-2 text-sm">{defect.default}</td>
//                                     <td className="border border-gray-200 p-2 text-sm">{defect.remarks}</td>
//                                     <td className="border border-gray-200 p-2 text-sm">{formatDate(defect.notificationDate)}</td>
//                                     <td className="border border-gray-200 p-2 text-sm">{formatDate(defect.removalDate)}</td>
//                                   </tr>
//                                 ))}
//                               </tbody>
//                             </table>
//                           </div>
//                         ) : (
//                           <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 text-yellow-700">
//                             No defects found for this case.
//                           </div>
//                         )}
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               ) : null}
//             </div>
            
//             {/* Modal Footer */}
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

// export default PartySearchPage;




import React, { useState } from 'react';
import { Search, X, ExternalLink } from 'lucide-react';

// Error Message Component
const ErrorMessage = ({ message }) => (
  <div className="bg-red-50 border border-red-200 rounded-md p-4">
    <div className="flex">
      <div className="flex-shrink-0">
        <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
        </svg>
      </div>
      <div className="ml-3">
        <p className="text-sm text-red-700">{message}</p>
      </div>
    </div>
  </div>
);

// Loading Spinner Component
const LoadingSpinner = () => (
  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
);

// Status Badge Component
const StatusBadge = ({ status }) => {
  let bgColor = 'bg-yellow-100 text-yellow-800';
  if (status === 'COMPLETED' || status === 'DISPOSED') {
    bgColor = 'bg-green-100 text-green-800';
  }
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${bgColor}`}>
      {status}
    </span>
  );
};

const PartySearchPage = ({ court, partyNameInput, setPartyNameInput, handlePartySearch }) => {
  const [stage, setStage] = useState('PENDING');
  const [type, setType] = useState('ANY');
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const [searchResults, setSearchResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showCaseDetails, setShowCaseDetails] = useState(false);
  const [caseDetails, setCaseDetails] = useState(null);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);
  const [loadingDetailId, setLoadingDetailId] = useState(null);
  const [detailsError, setDetailsError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState(''); // State for search bar input

  // Generate years for dropdown (last 30 years)
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 30 }, (_, i) => (currentYear - i).toString());

  // Filter search results based on searchQuery
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
      const response = await fetch(`https://infrahive-ai-legal-research-gyfsavdfd0c9ehh5.centralindia-01.azurewebsites.net/legal-infrahive/supreme-court/search-party/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: partyNameInput,
          stage: stage,
          type: type,
          year: year
        }),
      });
      
      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }
      
      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`);
      }
      
      setSearchResults(data);
    } catch (err) {
      let errorMessage = 'An error occurred during search';
      
      if (err.message.includes('403')) {
        errorMessage = 'Access denied. Please try again later or contact support if the issue persists.';
      } else if (err.message.includes('Failed to retrieve data')) {
        errorMessage = 'Unable to fetch results. Please try again later.';
      }
      
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewDetails = async (diaryNumber, rowIndex) => {
    setIsLoadingDetails(true);
    setLoadingDetailId(rowIndex);
    setDetailsError(null);
    setActiveTab('overview');
    setCaseDetails(null);
    
    const year = extractYearFromDiaryNumber(diaryNumber);
    const diaryNumberOnly = diaryNumber.split('/')[0];
    
    try {
      const response = await fetch(`https://infrahive-ai-legal-research-gyfsavdfd0c9ehh5.centralindia-01.azurewebsites.net/legal-infrahive/supreme-court/case/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          diaryNumber: diaryNumberOnly,
          year: year
        }),
      });
      
      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }
      
      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`);
      }
      
      setCaseDetails(data);
      setShowCaseDetails(true);
    } catch (err) {
      let errorMessage = 'Failed to fetch case details';
      
      if (err.message.includes('403')) {
        errorMessage = 'Access denied. Please try again later or contact support if the issue persists.';
      } else if (err.message.includes('Failed to retrieve data')) {
        errorMessage = 'Unable to fetch case details. Please try again later.';
      }
      
      setDetailsError(errorMessage);
      setShowCaseDetails(true);
    } finally {
      setIsLoadingDetails(false);
      setLoadingDetailId(null);
    }
  };

  const closeDetailsPopup = () => {
    setShowCaseDetails(false);
    setCaseDetails(null);
    setDetailsError(null);
  };

  const extractYearFromDiaryNumber = (diaryNumber) => {
    const parts = diaryNumber.split('/');
    if (parts.length === 2) {
      return parts[1];
    }
    return new Date().getFullYear().toString();
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const formatCaseDetails = (caseNumber) => {
    const lines = caseNumber.split(/Registered on/);
    if (lines.length > 1) {
      return (
        <>
          {lines[0]}
          <br />
          <span className="text-xs">Registered on{lines[1]}</span>
        </>
      );
    }
    return caseNumber;
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Supreme Court Cases by Party Name</h2>
      <div className="bg-white p-6 rounded-md border border-gray-200 max-w-xl">
  {/* Search Form */}
  <form onSubmit={handleSubmit}>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
      <div className="col-span-2">
        <label htmlFor="party-input" className="block text-sm font-medium mb-1 text-gray-700">
          Party Name *
        </label>
        <input 
          type="text" 
          id="party-input" 
          value={partyNameInput}
          onChange={(e) => setPartyNameInput(e.target.value)}
          className="w-full border border-gray-200 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-blue-600"
          placeholder="Enter party name"
          required
        />
        <div className="text-sm text-gray-500 mt-1">Example: Vodafone</div>
      </div>
      
      {/* Stage Select */}
      <div>
        <label htmlFor="stage-select" className="block text-sm font-medium mb-1 text-gray-700">
          Stage
        </label>
        <select
          id="stage-select"
          value={stage}
          onChange={(e) => setStage(e.target.value)}
          className="w-full border border-gray-200 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-blue-600"
        >
          <option value="PENDING">PENDING</option>
          <option value="COMPLETED">COMPLETED</option>
        </select>
        <div className="text-sm text-gray-500 mt-1">Example: PENDING</div>
      </div>
      
      {/* Type Select */}
      <div>
        <label htmlFor="type-select" className="block text-sm font-medium mb-1 text-gray-700">
          Type
        </label>
        <select
          id="type-select"
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full border border-gray-200 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-blue-600"
        >
          <option value="ANY">ANY</option>
          <option value="option 1">Option 1</option>
          <option value="option 2">Option 2</option>
        </select>
        <div className="text-sm text-gray-500 mt-1">Example: ANY</div>
      </div>
      
      {/* Year Select */}
      <div>
        <label htmlFor="year-select" className="block text-sm font-medium mb-1 text-gray-700">
          Year
        </label>
        <select
          id="year-select"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="w-full border border-gray-200 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-blue-600"
        >
          {years.map((y) => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>
        <div className="text-sm text-gray-500 mt-1">Example: 2025</div>
      </div>
      
      {/* Search Button */}
      <div className="md:col-start-2 md:flex md:justify-end items-end">
        <button 
          type="submit" 
          className="w-full md:w-auto bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex items-center space-x-2">
              <LoadingSpinner />
              <span>Searching...</span>
            </div>
          ) : (
            <>
              <Search size={16} />
              <span>Search</span>
            </>
          )}
        </button>
      </div>
    </div>
  </form>
</div>
      
      {/* Loading and Error States */}
      {isLoading && (
        <div className="mt-6 flex items-center justify-center p-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      )}
      
      {error && <ErrorMessage message={error} />}
      
      {/* Results Section */}
      {!isLoading && searchResults && (
        <div className="mt-6">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-medium">Search Results</h3>
            {/* Search Bar */}
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
            <div className="overflow-x-auto">
              
                
                    {/* <div className="w-full bg-white rounded-lg shadow-sm overflow-hidden border-2 border-gray-500">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-500 bg-gray-300">
            <th className="px-6 py-4 text-sm font-medium text-black text-left">INDEX NO.</th>
            <th className="px-6 py-4 text-sm font-medium text-black text-left">DIARY NUMBER</th>
            <th className="px-6 py-4 text-sm font-medium text-black text-left">CASE NUMBER</th>
            <th className="px-6 py-4 text-sm font-medium text-black text-left">PETITIONER</th>
            <th className="px-6 py-4 text-sm font-medium text-black text-left">RESPONDENT</th>
            <th className="px-6 py-4 text-sm font-medium text-black text-left">STATUS</th>
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
                {index + 1}
              </td>
              <td className="px-6 py-4 text-sm text-gray-700">
                {result.diaryNumber}
              </td>
              <td className="px-6 py-4 text-sm text-gray-700">
                {result.caseNumber}
              </td>
              <td className="px-6 py-4 text-sm text-gray-700">
                {result.petitioner}
              </td>
              <td className="px-6 py-4 text-sm text-gray-700">
                {result.respondent}
              </td>
              <td className="px-6 py-4">
                <StatusBadge status={result.status} />
              </td>
              <td className="px-6 py-4">
                <button 
                  className="flex items-center justify-center w-32  space-x-2 px-5 py-2 text-sm text-blue-600 bg-blue-100 rounded-full hover:bg-blue-100 transition-colors"
                  onClick={() => handleViewDetails(result.diaryNumber, index)}
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
                      <span > Details</span>
                    </span>
                  )}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div> */}

    <div className="w-full bg-white rounded-xl shadow-lg overflow-hidden border-4 border-white">
  <table className="w-full border-collapse">
    <thead>
      <tr className="bg-gradient-to-r from-gray-300 to-gray-300 border-b-4 border-white">
        <th className="px-6 py-4 text-sm font-semibold text-black text-left">INDEX NO.</th>
        <th className="px-6 py-4 text-sm font-semibold text-black text-left">DIARY NUMBER</th>
        <th className="px-6 py-4 text-sm font-semibold text-black text-left">CASE NUMBER</th>
        <th className="px-6 py-4 text-sm font-semibold text-black text-left">PETITIONER</th>
        <th className="px-6 py-4 text-sm font-semibold text-black text-left">RESPONDENT</th>
        <th className="px-6 py-4 text-sm font-semibold text-black text-left">STATUS</th>
        <th className="px-6 py-4 text-sm font-semibold text-black text-left">ACTIONS</th>
      </tr>
    </thead>
    <tbody className="border-y-4 border-white">
      {filteredResults.map((result, index) => (
        <tr 
          key={index} 
          className={`transition-colors hover:bg-blue-50 ${index % 2 === 0 ? 'bg-white' : 'bg-blue-50'} border-b-4 border-white last:border-b-0`}
        >
          <td className="px-6 py-4 text-sm text-gray-800 font-medium">
            {index + 1}
          </td>
          <td className="px-6 py-4 text-sm text-gray-700">
            {result.diaryNumber}
          </td>
          <td className="px-6 py-4 text-sm text-gray-700">
            {result.caseNumber}
          </td>
          <td className="px-6 py-4 text-sm text-gray-700">
            {result.petitioner}
          </td>
          <td className="px-6 py-4 text-sm text-gray-700">
            {result.respondent}
          </td>
          <td className="px-6 py-4">
            <StatusBadge status={result.status} />
          </td>
          <td className="px-6 py-4">
            <button 
              className="flex items-center justify-center w-32 space-x-2 px-5 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
              onClick={() => handleViewDetails(result.diaryNumber, index)}
              disabled={loadingDetailId === index}
            >
              {loadingDetailId === index ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-white"></div>
                  <span>Loading...</span>
                </div>
              ) : (
                <span className="flex items-center space-x-2">
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
            </div>
          )}
        </div>
      )}
      
      {/* Case Details Modal */}
      {showCaseDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl max-h-screen overflow-y-auto">
            {/* Modal Header */}
            <div className="flex justify-between items-center border-b p-4 sticky top-0 bg-white z-10">
              <h3 className="text-lg font-semibold">Case Details</h3>
              <button 
                onClick={closeDetailsPopup}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>
            
            {/* Modal Content */}
            <div className="p-4">
              {isLoadingDetails ? (
                <div className="flex justify-center items-center py-20">
                  <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
                </div>
              ) : detailsError ? (
                <ErrorMessage message={detailsError} />
              ) : caseDetails ? (
                <div>
                  {/* Case Title Section */}
                  <div className="mb-6">
                    <h2 className="text-xl font-bold mb-2">{caseDetails.title}</h2>
                    <div className="flex flex-wrap gap-2 items-center">
                      <span className="text-gray-600 text-sm">CNR: {caseDetails.cnr}</span>
                      <span className="text-gray-600 text-sm mx-2">|</span>
                      <span className="text-gray-600 text-sm">Filed: {formatDate(caseDetails.details.filedOn)}</span>
                      <span className="text-gray-600 text-sm mx-2">|</span>
                      <StatusBadge status={caseDetails.status.stage} />
                    </div>
                  </div>
                  
                  {/* Tabs Navigation */}
                  <div className="border-b mb-4">
                    <div className="flex overflow-x-auto">
                      {['overview', 'parties', 'history', 'orders', 'defects'].map((tab) => (
                        <button 
                          key={tab}
                          className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${
                            activeTab === tab 
                              ? 'text-blue-600 border-b-2 border-blue-600' 
                              : 'text-gray-500 hover:text-gray-700'
                          }`}
                          onClick={() => setActiveTab(tab)}
                        >
                          {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Tab Content */}
                  <div className="mb-4">
                    {/* Overview Tab */}
                    {activeTab === 'overview' && (
                      <div className="space-y-6">
                        {/* Case Information */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h3 className="text-sm font-medium text-gray-500 mb-1">Case Number</h3>
                            <p className="text-sm">{caseDetails.details.caseNumber}</p>
                          </div>
                          <div>
                            <h3 className="text-sm font-medium text-gray-500 mb-1">Category</h3>
                            <p className="text-sm">{caseDetails.details.category}</p>
                          </div>
                        </div>
                        
                        {/* Status Information */}
                        <div>
                          <h3 className="font-medium mb-2">Status Information</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-md">
                            <div>
                              <p className="text-sm text-gray-500">Current Status</p>
                              <p className="text-sm">{caseDetails.status.status}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Last Listed On</p>
                              <p className="text-sm">{formatDate(caseDetails.status.lastListedOn)}</p>
                            </div>
                            {caseDetails.status.nextDate && (
                              <div>
                                <p className="text-sm text-gray-500">Next Date</p>
                                <p className="text-sm">{formatDate(caseDetails.status.nextDate)}</p>
                              </div>
                            )}
                          </div>
                        </div>
                        
                        {/* Recent Hearing */}
                        {caseDetails.history && caseDetails.history.length > 0 && (
                          <div>
                            <h3 className="font-medium mb-2">Recent Hearing</h3>
                            <div className="bg-gray-50 p-4 rounded-md">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <p className="text-sm text-gray-500">Date</p>
                                  <p className="text-sm">{formatDate(caseDetails.history[0].date)}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-gray-500">Type</p>
                                  <p className="text-sm">{caseDetails.history[0].type}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-gray-500">Stage</p>
                                  <p className="text-sm">{caseDetails.history[0].stage}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-gray-500">Purpose</p>
                                  <p className="text-sm">{caseDetails.history[0].purpose}</p>
                                </div>
                                <div className="col-span-2">
                                  <p className="text-sm text-gray-500">Bench</p>
                                  <p className="text-sm">{caseDetails.history[0].judge}</p>
                                </div>
                                <div className="col-span-2">
                                  <p className="text-sm text-gray-500">Remarks</p>
                                  <p className="text-sm font-medium">{caseDetails.history[0].remarks}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                    
                    {/* Parties Tab */}
                    {activeTab === 'parties' && (
                      <div className="space-y-6">
                        {/* Petitioners */}
                        <div>
                          <h3 className="font-medium mb-2">Petitioners</h3>
                          <ul className="bg-gray-50 p-4 rounded-md space-y-2">
                            {caseDetails.parties.petitioners.map((petitioner, index) => (
                              <li key={index} className="text-sm">{petitioner}</li>
                            ))}
                          </ul>
                        </div>
                        
                        {/* Respondents */}
                        <div>
                          <h3 className="font-medium mb-2">Respondents</h3>
                          <ul className="bg-gray-50 p-4 rounded-md space-y-2">
                            {caseDetails.parties.respondents.map((respondent, index) => (
                              <li key={index} className="text-sm">{respondent}</li>
                            ))}
                          </ul>
                        </div>
                        
                        {/* Advocates */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h3 className="font-medium mb-2">Petitioner Advocates</h3>
                            <p className="bg-gray-50 p-4 rounded-md text-sm">{caseDetails.parties.petitionerAdvocates}</p>
                          </div>
                          <div>
                            <h3 className="font-medium mb-2">Respondent Advocates</h3>
                            <p className="bg-gray-50 p-4 rounded-md text-sm">{caseDetails.parties.respondentAdvocates}</p>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {/* History Tab */}
                    {activeTab === 'history' && (
                      <div>
                        <h3 className="font-medium mb-4">Case History</h3>
                        <div className="overflow-x-auto">
                          <table className="min-w-full border-collapse">
                            <thead>
                              <tr className="bg-gray-100">
                                <th className="border border-black p-2 text-left text-xs font-medium text-black">Date</th>
                                <th className="border border-black p-2 text-left text-xs font-medium text-black">Type</th>
                                <th className="border border-black p-2 text-left text-xs font-medium text-black">Stage</th>
                                <th className="border border-black p-2 text-left text-xs font-medium text-black">Purpose</th>
                                <th className="border border-black p-2 text-left text-xs font-medium text-black">Judge</th>
                                <th className="border border-black p-2 text-left text-xs font-medium text-black">Remarks</th>
                              </tr>
                            </thead>
                            <tbody>
                              {caseDetails.history.map((item, index) => (
                                <tr key={index} className="hover:bg-blue-100 even:bg-[#FEFCE8] odd:bg-white">
                                  <td className="border border-black p-2 text-sm">{formatDate(item.date)}</td>
                                  <td className="border border-black p-2 text-sm">{item.type}</td>
                                  <td className="border border-black p-2 text-sm">{item.stage}</td>
                                  <td className="border border-black p-2 text-sm">{item.purpose}</td>
                                  <td className="border border-black p-2 text-sm">{item.judge}</td>
                                  <td className="border border-black p-2 text-sm">{item.remarks}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
                    
                    {/* Orders Tab */}
                    {activeTab === 'orders' && (
                      <div>
                        <h3 className="font-medium mb-4">Orders</h3>
                        {caseDetails.orders && caseDetails.orders.length > 0 ? (
                          <div className="space-y-3">
                            {caseDetails.orders.map((order, index) => (
                              <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                                <span className="text-sm font-medium">{formatDate(order.date)}</span>
                                <a 
                                  href={order.url} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 text-sm"
                                >
                                  <span>View Order</span>
                                  <ExternalLink size={14} />
                                </a>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 text-yellow-700">
                            No orders available for this case.
                          </div>
                        )}
                      </div>
                    )}
                    
                    {/* Defects Tab */}
                    {activeTab === 'defects' && (
                      <div>
                        <h3 className="font-medium mb-4">Defects</h3>
                        {caseDetails.defects && caseDetails.defects.length > 0 ? (
                          <div className="overflow-x-auto">
                            <table className="min-w-full border-collapse">
                              <thead>
                                <tr className="bg-gray-100">
                                  <th className="border border-black p-2 text-left text-xs font-medium text-black">S.No</th>
                                  <th className="border border-black p-2 text-left text-xs font-medium text-black">Defect</th>
                                  <th className="border border-black p-2 text-left text-xs font-medium text-black">Remarks</th>
                                  <th className="border border-black p-2 text-left text-xs font-medium text-black">Notification Date</th>
                                  <th className="border border-black p-2 text-left text-xs font-medium text-black">Removal Date</th>
                                </tr>
                              </thead>
                              <tbody>
                                {caseDetails.defects.map((defect, index) => (
                                  <tr key={index} className="hover:bg-blue-100 even:bg-[#FEFCE8] odd:bg-white">
                                    <td className="border border-black p-2 text-sm">{defect.serialNumber}</td>
                                    <td className="border border-black p-2 text-sm">{defect.default}</td>
                                    <td className="border border-black p-2 text-sm">{defect.remarks}</td>
                                    <td className="border border-black p-2 text-sm">{formatDate(defect.notificationDate)}</td>
                                    <td className="border border-black p-2 text-sm">{formatDate(defect.removalDate)}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        ) : (
                          <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 text-yellow-700">
                            No defects found for this case.
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ) : null}
            </div>
            
            {/* Modal Footer */}
            <div className="border-t p-4 flex justify-end">
              <button
                onClick={closeDetailsPopup}
                className="bg-gray-100 text-gray-600 hover:bg-gray-200 px-4 py-2 rounded-md transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PartySearchPage;