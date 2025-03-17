


// import React, { useState } from 'react';
// import { X, ExternalLink, Search } from 'lucide-react';

// // Status Badge Component
// const StatusBadge = ({ status }) => {
//   let bgColor = 'bg-gray-100';
//   let textColor = 'text-gray-800';

//   if (status === 'PENDING' || status === 'Pending') {
//     bgColor = 'bg-yellow-100';
//     textColor = 'text-yellow-800';
//   } else if (status === 'DISPOSED' || status === 'Disposed') {
//     bgColor = 'bg-green-100';
//     textColor = 'text-green-800';
//   } else if (status === 'FOR DIRECTION') {
//     bgColor = 'bg-blue-100';
//     textColor = 'text-blue-800';
//   }

//   return (
//     <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${bgColor} ${textColor}`}>
//       {status}
//     </span>
//   );
// };
// const FilingNumberSearchPage = ({ court }) => {
//   const [filingNumberInput, setFilingNumberInput] = useState('');
//   const [filingYear, setFilingYear] = useState(new Date().getFullYear().toString());
//   const [benchId, setBenchId] = useState('');
//   const [results, setResults] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [hasResponse, setHasResponse] = useState(false);
//   const [yearDropdownOpen, setYearDropdownOpen] = useState(false);
//   const [caseDetails, setCaseDetails] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   const [loadingDetails, setLoadingDetails] = useState(false);
//   const [detailsError, setDetailsError] = useState(null);
//   const [activeTab, setActiveTab] = useState('overview');
//   const [searchResultsFilter, setSearchResultsFilter] = useState('');

//   // Generate years from 2010 to current year
//   const currentYear = new Date().getFullYear();
//   const years = Array.from({ length: currentYear - 2009 }, (_, i) => (currentYear - i).toString());

//   const courtNames = {
//     supreme: 'Supreme Court',
//     high: 'High Court',
//     district: 'District Court',
//     nclt: 'NCLT',
//   };
//   const courtName = courtNames[court] || 'Court';
//   const handleFilingNumberSearch = async (e) => {
//     e.preventDefault();
//     if (!filingNumberInput || !benchId) {
//       alert('Please fill in all required fields.');
//       return;
//     }
//     setIsLoading(true);
//     setHasResponse(false);
//     try {
//       const response = await fetch(
//         `https://infrahive-ai-legal-research-gyfsavdfd0c9ehh5.centralindia-01.azurewebsites.net/legal-infrahive/high-court/search/filing-number/`,
//         {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//             Authorization: 'ECIAPI-XXaRks8npWTVUXpFpYc6nGj88cwPMq25',
//           },
//           body: JSON.stringify({
//             filingNumber: filingNumberInput,
//             filingYear: filingYear,
//             benchId,
//           }),
//         }
//       );
//       const data = await response.json();
//       setResults(data);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     } finally {
//       setIsLoading(false);
//       setHasResponse(true);
//     }
//   };

//   const handleViewDetails = async (cnr) => {
//     setLoadingDetails(true);
//     setShowModal(true);
//     setDetailsError(null);
//     setActiveTab('overview'); // Reset to overview tab

//     try {
//       const response = await fetch(
//         'https://infrahive-ai-legal-research-gyfsavdfd0c9ehh5.centralindia-01.azurewebsites.net/legal-infrahive/high-court/case/',
//         {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//             Authorization: 'ECIAPI-XXaRks8npWTVUXpFpYc6nGj88cwPMq25',
//           },
//           body: JSON.stringify({ cnr }),
//         }
//       );

//       if (!response.ok) {
//         throw new Error(`Error fetching case details: ${response.status}`);
//       }

//       const caseData = await response.json();
//       setCaseDetails(caseData);
//     } catch (error) {
//       console.error('Error fetching case details:', error);
//       setDetailsError(error.message || 'Failed to load case details');
//     } finally {
//       setLoadingDetails(false);
//     }
//   };

//   const closeModal = () => {
//     setShowModal(false);
//     setCaseDetails(null);
//     setDetailsError(null);
//   };

//   const formatDate = (dateString) => {
//     if (!dateString || dateString === '1970-01-01T00:00:00.000Z' || isNaN(new Date(dateString))) {
//       return 'Not Available';
//     }
//     return new Date(dateString).toLocaleDateString('en-IN', {
//       day: '2-digit',
//       month: 'short',
//       year: 'numeric',
//     });
//   };

//   // Filter results based on search input
//   const filteredResults = results.filter(result => {
//     if (!searchResultsFilter) return true;
    
//     const searchLower = searchResultsFilter.toLowerCase();
//     return (
//       (result.cnr && result.cnr.toLowerCase().includes(searchLower)) ||
//       (result.title && result.title.toLowerCase().includes(searchLower)) ||
//       (result.caseNumber && result.caseNumber.toLowerCase().includes(searchLower)) ||
//       (result.type && result.type.toLowerCase().includes(searchLower))
//     );
//   });
//   return (
//     <>
//       <div className="bg-white rounded-lg shadow-sm p-6 w-[40vw]">
//         <div className="mb-6">
//           <h2 className="text-xl font-bold text-gray-800">Search {courtName} by Filing Number</h2>
//           <p className="text-gray-600 mt-2">Enter the filing number to search for case details.</p>
//         </div>

//         {/* <form onSubmit={handleFilingNumberSearch} className="space-y-6">
//           <div className="space-y-4">
//             <div>
//               <label htmlFor="filingNumber" className="block text-sm font-medium text-gray-700 mb-1">
//                 Filing Number
//               </label>
//               <input
//                 type="text"
//                 id="filingNumber"
//                 value={filingNumberInput}
//                 onChange={(e) => setFilingNumberInput(e.target.value)}
//                 className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="Enter filing number"
//                 required
//               />
//             </div>

//             <div>
//               <label htmlFor="filingYear" className="block text-sm font-medium text-gray-700 mb-1">
//                 Filing Year
//               </label>
//               <div className="relative">
//                 <button
//                   type="button"
//                   onClick={() => setYearDropdownOpen(!yearDropdownOpen)}
//                   className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-left flex justify-between items-center"
//                 >
//                   <span>{filingYear}</span>
//                   <svg className="w-5 h-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
//                     <path
//                       fillRule="evenodd"
//                       d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
//                       clipRule="evenodd"
//                     />
//                   </svg>
//                 </button>

//                 {yearDropdownOpen && (
//                   <div className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
//                     {years.map((year) => (
//                       <div
//                         key={year}
//                         className={`cursor-pointer select-none relative py-2 pl-3 pr-9 ${
//                           filingYear === year ? 'bg-gray-100 text-gray-900' : 'text-gray-900'
//                         }`}
//                         onClick={() => {
//                           setFilingYear(year);
//                           setYearDropdownOpen(false);
//                         }}
//                       >
//                         <div className="flex items-center">
//                           <span className="block truncate">{year}</span>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             </div>

//             <div>
//               <label htmlFor="benchId" className="block text-sm font-medium text-gray-700 mb-1">
//                 Bench ID
//               </label>
//               <input
//                 type="text"
//                 id="benchId"
//                 value={benchId}
//                 onChange={(e) => setBenchId(e.target.value)}
//                 className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="Enter bench ID"
//                 required
//               />
//             </div>
//           </div>

//           <div className="flex items-center space-x-4">
//             <button
//               type="submit"
//               className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center"
//               disabled={isLoading}
//             >
//               {isLoading ? (
//                 <>
//                   <svg
//                     className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                   >
//                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                     <path
//                       className="opacity-75"
//                       fill="currentColor"
//                       d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                     ></path>
//                   </svg>
//                   Searching...
//                 </>
//               ) : (
//                 'Search'
//               )}
//             </button>
//             <button
//               type="reset"
//               className="px-6 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
//               onClick={() => {
//                 setFilingNumberInput('');
//                 setFilingYear(new Date().getFullYear().toString());
//                 setBenchId('');
//                 setResults([]);
//                 setHasResponse(false);
//               }}
//             >
//               Clear
//             </button>
//           </div>
//         </form> */}

//         <form onSubmit={handleFilingNumberSearch} className="space-y-6">
//   <div className="space-y-4">
//     <div>
//       <label htmlFor="filingNumber" className="block text-sm font-medium text-gray-700 mb-1">
//         Filing Number
//       </label>
//       <input
//         type="text"
//         id="filingNumber"
//         value={filingNumberInput}
//         onChange={(e) => setFilingNumberInput(e.target.value)}
//         className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//         placeholder="Enter filing number"
//         required
//       />
//       <div className="text-sm text-gray-500 mt-1">Example: 102</div>
//     </div>

//     <div>
//       <label htmlFor="filingYear" className="block text-sm font-medium text-gray-700 mb-1">
//         Filing Year
//       </label>
//       <div className="relative">
//         <button
//           type="button"
//           onClick={() => setYearDropdownOpen(!yearDropdownOpen)}
//           className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-left flex justify-between items-center"
//         >
//           <span>{filingYear}</span>
//           <svg className="w-5 h-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
//             <path
//               fillRule="evenodd"
//               d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
//               clipRule="evenodd"
//             />
//           </svg>
//         </button>

//         {yearDropdownOpen && (
//           <div className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
//             {years.map((year) => (
//               <div
//                 key={year}
//                 className={`cursor-pointer select-none relative py-2 pl-3 pr-9 ${
//                   filingYear === year ? 'bg-gray-100 text-gray-900' : 'text-gray-900'
//                 }`}
//                 onClick={() => {
//                   setFilingYear(year);
//                   setYearDropdownOpen(false);
//                 }}
//               >
//                 <div className="flex items-center">
//                   <span className="block truncate">{year}</span>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//       <div className="text-sm text-gray-500 mt-1">Example: 2023</div>
//     </div>

//     <div>
//       <label htmlFor="benchId" className="block text-sm font-medium text-gray-700 mb-1">
//         Bench ID
//       </label>
//       <input
//         type="text"
//         id="benchId"
//         value={benchId}
//         onChange={(e) => setBenchId(e.target.value)}
//         className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//         placeholder="Enter bench ID"
//         required
//       />
//       <div className="text-sm text-gray-500 mt-1">Example: 0ba5ccaf</div>
//     </div>
//   </div>

//   <div className="flex items-center space-x-4">
//     <button
//       type="submit"
//       className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center"
//       disabled={isLoading}
//     >
//       {isLoading ? (
//         <>
//           <svg
//             className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 24 24"
//           >
//             <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//             <path
//               className="opacity-75"
//               fill="currentColor"
//               d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//             ></path>
//           </svg>
//           Searching...
//         </>
//       ) : (
//         'Search'
//       )}
//     </button>
//     <button
//       type="reset"
//       className="px-6 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
//       onClick={() => {
//         setFilingNumberInput('');
//         setFilingYear(new Date().getFullYear().toString());
//         setBenchId('');
//         setResults([]);
//         setHasResponse(false);
//       }}
//     >
//       Clear
//     </button>
//   </div>
// </form>
//       </div>
//     {/* Search Results Section */}
//       {hasResponse && results.length > 0 && (
//         <div className="mt-6">
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-xl font-semibold text-gray-800">Search Results</h2>
//             <div className="relative">
//               <input
//                 type="text"
//                 placeholder="Search in results..."
//                 value={searchResultsFilter}
//                 onChange={(e) => setSearchResultsFilter(e.target.value)}
//                 className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
//               />
//               <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
//                 <Search size={18} />
//               </div>
//             </div>
//           </div>

//           <div className="overflow-x-auto p-2 bg-white rounded-md">
//             <div className="shadow-md rounded-md overflow-hidden border-4 border-white outline outline-1 outline-gray-200">
//               <table className="w-full text-sm text-left text-gray-700">
//                 <thead className="text-xs text-gray-700 uppercase bg-gray-50">
//                   <tr>
//                     {/* <th className="px-6 py-3">COURT</th> */}
//                     <th className="px-6 py-3">CNR</th>
//                     <th className="px-6 py-3">CASE TITLE</th>
//                     <th className="px-6 py-3">CASE NUMBER</th>
//                     <th className="px-6 py-3">TYPE</th>
//                     <th className="px-6 py-3">DECISION DATE</th>
//                     <th className="px-6 py-3 text-center">ACTIONS</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {filteredResults.map((result, index) => (
//                     <tr key={index} className="bg-white hover:bg-gray-50">
                      
//                       <td className="px-6 py-4 font-mono text-xs">{result.cnr}</td>
//                       <td className="px-6 py-4 font-medium">{result.title}</td>
//                       <td className="px-6 py-4">{result.caseNumber}</td>
//                       <td className="px-6 py-4">
//                         <span className="text-xs font-medium text-blue-700">{result.type}</span>
//                       </td>
//                       <td className="px-6 py-4">{result.decisionDate || "Not Available"}</td>
//                       <td className="px-6 py-4 text-center">
//                         <button
//                           onClick={() => handleViewDetails(result.cnr)}
//                           className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white text-xs font-medium rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//                         >
//                           <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
//                           </svg>
//                           Details
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
                  
//                   {filteredResults.length === 0 && (
//                     <tr>
//                       <td colSpan="8" className="px-6 py-4 text-center text-gray-500">
//                         No results found
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       )}


//     </>
//   );
// };

// export default FilingNumberSearchPage;


import React, { useState } from 'react';
import { X, ExternalLink, Search, AlertTriangle } from 'lucide-react';

// Status Badge Component
const StatusBadge = ({ status }) => {
  let bgColor = 'bg-gray-100';
  let textColor = 'text-gray-800';

  if (status === 'PENDING' || status === 'Pending') {
    bgColor = 'bg-yellow-100';
    textColor = 'text-yellow-800';
  } else if (status === 'DISPOSED' || status === 'Disposed') {
    bgColor = 'bg-green-100';
    textColor = 'text-green-800';
  } else if (status === 'FOR DIRECTION') {
    bgColor = 'bg-blue-100';
    textColor = 'text-blue-800';
  }

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${bgColor} ${textColor}`}>
      {status}
    </span>
  );
};

const FilingNumberSearchPage = ({ court }) => {
  const [filingNumberInput, setFilingNumberInput] = useState('');
  const [filingYear, setFilingYear] = useState(new Date().getFullYear().toString());
  const [benchId, setBenchId] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasResponse, setHasResponse] = useState(false);
  const [yearDropdownOpen, setYearDropdownOpen] = useState(false);
  const [caseDetails, setCaseDetails] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [detailsError, setDetailsError] = useState(null);
  const [searchError, setSearchError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [searchResultsFilter, setSearchResultsFilter] = useState('');

  // Generate years from 2010 to current year
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 2009 }, (_, i) => (currentYear - i).toString());

  const courtNames = {
    supreme: 'Supreme Court',
    high: 'High Court',
    district: 'District Court',
    nclt: 'NCLT',
  };
  const courtName = courtNames[court] || 'Court';

  const handleFilingNumberSearch = async (e) => {
    e.preventDefault();
    if (!filingNumberInput || !benchId) {
      alert('Please fill in all required fields.');
      return;
    }
    setIsLoading(true);
    setHasResponse(false);
    setSearchError(null);
    setResults([]);
    
    try {
      const response = await fetch(
        `https://infrahive-ai-legal-research-gyfsavdfd0c9ehh5.centralindia-01.azurewebsites.net/legal-infrahive/high-court/search/filing-number/`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'ECIAPI-XXaRks8npWTVUXpFpYc6nGj88cwPMq25',
          },
          body: JSON.stringify({
            filingNumber: filingNumberInput,
            filingYear: filingYear,
            benchId,
          }),
        }
      );
      
      const data = await response.json();
      
      if (!response.ok) {
        // Handle specific error responses
        if (response.status === 403) {
          throw new Error('Access denied. Your session may have expired or you don\'t have permission to access this resource.');
        } else if (data && data.error) {
          throw new Error(data.error);
        } else {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
      }
      
      // Check if the response contains an error field
      if (data && data.error) {
        throw new Error(data.error);
      }
      
      setResults(Array.isArray(data) ? data : []);
      setHasResponse(true);
    } catch (error) {
      console.error('Error fetching data:', error);
      setSearchError(error.message || 'An error occurred while fetching data.');
      setHasResponse(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetrySearch = () => {
    handleFilingNumberSearch(new Event('submit'));
  };

  const handleViewDetails = async (cnr) => {
    setLoadingDetails(true);
    setShowModal(true);
    setDetailsError(null);
    setActiveTab('overview'); // Reset to overview tab

    try {
      const response = await fetch(
        'https://infrahive-ai-legal-research-gyfsavdfd0c9ehh5.centralindia-01.azurewebsites.net/legal-infrahive/high-court/case/',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'ECIAPI-XXaRks8npWTVUXpFpYc6nGj88cwPMq25',
          },
          body: JSON.stringify({ cnr }),
        }
      );

      const data = await response.json();
      
      if (!response.ok) {
        // Handle specific error responses
        if (response.status === 403) {
          throw new Error('Access denied. Your session may have expired or you don\'t have permission to access this resource.');
        } else if (data && data.error) {
          throw new Error(data.error);
        } else {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
      }
      
      // Check if the response contains an error field
      if (data && data.error) {
        throw new Error(data.error);
      }

      setCaseDetails(data);
    } catch (error) {
      console.error('Error fetching case details:', error);
      setDetailsError(error.message || 'Failed to load case details');
    } finally {
      setLoadingDetails(false);
    }
  };

  const handleRetryDetails = () => {
    if (caseDetails && caseDetails.cnr) {
      handleViewDetails(caseDetails.cnr);
    } else if (showModal) {
      // If we don't have the CNR, close the modal
      closeModal();
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setCaseDetails(null);
    setDetailsError(null);
  };

  const formatDate = (dateString) => {
    if (!dateString || dateString === '1970-01-01T00:00:00.000Z' || isNaN(new Date(dateString))) {
      return 'Not Available';
    }
    try {
      return new Date(dateString).toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      });
    } catch (error) {
      return 'Not Available';
    }
  };

  // Filter results based on search input
  const filteredResults = results.filter(result => {
    if (!searchResultsFilter) return true;
    
    const searchLower = searchResultsFilter.toLowerCase();
    return (
      (result.cnr && result.cnr.toLowerCase().includes(searchLower)) ||
      (result.title && result.title.toLowerCase().includes(searchLower)) ||
      (result.caseNumber && result.caseNumber.toLowerCase().includes(searchLower)) ||
      (result.type && result.type.toLowerCase().includes(searchLower))
    );
  });
  return (
    <>
      <div className="bg-white rounded-lg shadow-sm p-6 w-[40vw]">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-800">Search {courtName} by Filing Number</h2>
          <p className="text-gray-600 mt-2">Enter the filing number to search for case details.</p>
        </div>

        <form onSubmit={handleFilingNumberSearch} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="filingNumber" className="block text-sm font-medium text-gray-700 mb-1">
                Filing Number
              </label>
              <input
                type="text"
                id="filingNumber"
                value={filingNumberInput}
                onChange={(e) => setFilingNumberInput(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter filing number"
                required
              />
              <div className="text-sm text-gray-500 mt-1">Example: 102</div>
            </div>

            <div>
              <label htmlFor="filingYear" className="block text-sm font-medium text-gray-700 mb-1">
                Filing Year
              </label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setYearDropdownOpen(!yearDropdownOpen)}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-left flex justify-between items-center"
                >
                  <span>{filingYear}</span>
                  <svg className="w-5 h-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>

                {yearDropdownOpen && (
                  <div className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                    {years.map((year) => (
                      <div
                        key={year}
                        className={`cursor-pointer select-none relative py-2 pl-3 pr-9 ${
                          filingYear === year ? 'bg-gray-100 text-gray-900' : 'text-gray-900'
                        }`}
                        onClick={() => {
                          setFilingYear(year);
                          setYearDropdownOpen(false);
                        }}
                      >
                        <div className="flex items-center">
                          <span className="block truncate">{year}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="text-sm text-gray-500 mt-1">Example: 2023</div>
            </div>

            <div>
              <label htmlFor="benchId" className="block text-sm font-medium text-gray-700 mb-1">
                Bench ID
              </label>
              <input
                type="text"
                id="benchId"
                value={benchId}
                onChange={(e) => setBenchId(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter bench ID"
                required
              />
              <div className="text-sm text-gray-500 mt-1">Example: 0ba5ccaf</div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Searching...
                </>
              ) : (
                'Search'
              )}
            </button>
            <button
              type="reset"
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              onClick={() => {
                setFilingNumberInput('');
                setFilingYear(new Date().getFullYear().toString());
                setBenchId('');
                setResults([]);
                setHasResponse(false);
                setSearchError(null);
              }}
            >
              Clear
            </button>
          </div>
        </form>
        
        {/* Search Error Message */}
        {searchError && (
          <div className="mt-4 bg-red-50 border border-red-200 rounded-md">
            <div className="p-4 flex items-start">
              <AlertTriangle className="h-5 w-5 mr-3 flex-shrink-0 text-red-600" />
              <div className="flex-1">
                <p className="text-sm font-medium text-red-800">{searchError}</p>
                {searchError.includes("403") && (
                  <p className="mt-1 text-sm text-red-600">This could be due to an expired session or authentication issue.</p>
                )}
                <div className="mt-3">
                  <button 
                    onClick={handleRetrySearch}
                    className="bg-red-100 text-red-800 px-3 py-1 rounded-md text-sm hover:bg-red-200 transition-colors"
                  >
                    Retry Search
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Search Results Section */}
      {hasResponse && (
        <div className="mt-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Search Results</h2>
            {results.length > 0 && (
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search in results..."
                  value={searchResultsFilter}
                  onChange={(e) => setSearchResultsFilter(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
                />
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <Search size={18} />
                </div>
              </div>
            )}
          </div>

          {results.length === 0 && !searchError ? (
            <div className="p-6 bg-yellow-50 border border-yellow-200 rounded-md text-yellow-700">
              No results found for the specified criteria. Please try different search parameters.
            </div>
          ) : results.length > 0 ? (
            <div className="overflow-x-auto p-2 bg-white rounded-md">
              <div className="shadow-md rounded-md overflow-hidden border-4 border-white outline outline-1 outline-gray-200">
                <table className="w-full text-sm text-left text-gray-700">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                      <th className="px-6 py-3">CNR</th>
                      <th className="px-6 py-3">CASE TITLE</th>
                      <th className="px-6 py-3">CASE NUMBER</th>
                      <th className="px-6 py-3">TYPE</th>
                      <th className="px-6 py-3">DECISION DATE</th>
                      <th className="px-6 py-3 text-center">ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredResults.map((result, index) => (
                      <tr key={index} className="bg-white hover:bg-gray-50">
                        <td className="px-6 py-4 font-mono text-xs">{result.cnr || 'N/A'}</td>
                        <td className="px-6 py-4 font-medium">{result.title || 'N/A'}</td>
                        <td className="px-6 py-4">{result.caseNumber || 'N/A'}</td>
                        <td className="px-6 py-4">
                          <span className="text-xs font-medium text-blue-700">{result.type || 'N/A'}</span>
                        </td>
                        <td className="px-6 py-4">{formatDate(result.decisionDate)}</td>
                        <td className="px-6 py-4 text-center">
                          <button
                            onClick={() => handleViewDetails(result.cnr)}
                            className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white text-xs font-medium rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                            </svg>
                            Details
                          </button>
                        </td>
                      </tr>
                    ))}
                    
                    {filteredResults.length === 0 && (
                      <tr>
                        <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                          No results found matching your filter criteria
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          ) : null}
        </div>
      )}

      {/* Case Details Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b p-4 sticky top-0 bg-white z-10">
              <h3 className="text-lg font-semibold">Case Details</h3>
              <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
                <X size={20} />
              </button>
            </div>
            
            <div className="p-4">
              {loadingDetails ? (
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
                          onClick={handleRetryDetails}
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
                  {/* Case Title & CNR */}
                  <div className="mb-6">
                    <h2 className="text-xl font-bold mb-2">
                      {caseDetails.title || caseDetails.caseNumber || "Case Details"}
                    </h2>
                    <div className="flex flex-wrap gap-2 items-center">
                      <span className="text-black text-sm font-medium">CNR: {caseDetails.cnr || 'N/A'}</span>
                      {caseDetails.filing && (
                        <>
                          <span className="text-black text-sm mx-2 font-medium">|</span>
                          <span className="text-black text-sm font-medium">
                            Filing Number: {caseDetails.filing.number || 'N/A'}/{caseDetails.filing.year || 'N/A'}
                          </span>
                        </>
                      )}
                      {caseDetails.status && (
                        <>
                          <span className="text-black text-sm mx-2 font-medium">|</span>
                          <StatusBadge status={caseDetails.status.stage || 'PENDING'} />
                        </>
                      )}
                    </div>
                  </div>
                  
                  {/* Add your tabs and content here based on the original code */}
                  {/* This should include all the case detail content from your existing component */}
                </div>
              ) : (
                <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 text-yellow-700">
                  No case details available.
                </div>
              )}
            </div>
            
            <div className="border-t p-4 flex justify-end">
              <button 
                onClick={closeModal} 
                className="bg-gray-100 text-gray-600 hover:bg-gray-200 px-4 py-2 rounded-md transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

            {hasResponse && results.length === 0 && (
        <div className="mt-6">
          {/* <h2 className="text-xl font-semibold text-gray-800 mb-4">Search Results</h2> */}
          <p className="text-gray-500">No results found for the given search criteria.</p>
        </div>
      )}
    {/* Case Details Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b p-4 sticky top-0 bg-white z-10">
              <h3 className="text-lg font-semibold">Case Details</h3>
              <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
                <X size={20} />
              </button>
            </div>
            <div className="p-4">
              {loadingDetails ? (
                <div className="flex justify-center items-center py-20">
                  <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
                </div>
              ) : detailsError ? (
                <div className="bg-red-50 border border-red-200 rounded-md p-4 text-red-700">{detailsError}</div>
              ) : caseDetails ? (
                <div>
                  <div className="mb-6">
                    <h2 className="text-xl font-bold mb-2">{`${caseDetails.filing?.number ?? 'N/A'} - ${caseDetails.parties?.petitioners?.[0] ?? 'N/A'} vs. ${caseDetails.parties?.respondents?.[0] ?? 'N/A'}`}</h2>
                    <div className="flex flex-wrap gap-2 items-center">
                      <span className="text-black text-sm font-medium">CNR: {caseDetails.cnr}</span>
                      <span className="text-black text-sm mx-2 font-medium">|</span>
                      <span className="text-black text-sm font-medium">Filed: {formatDate(caseDetails.filing?.date)}</span>
                      <span className="text-black text-sm mx-2 font-medium">|</span>
                      <StatusBadge status={caseDetails.status?.caseStage || 'PENDING'} />
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
                            { label: 'Filing Number', value: caseDetails.filing?.number ?? 'N/A' },
                            { label: 'Filing Date', value: formatDate(caseDetails.filing?.date) },
                            { label: 'Registration Number', value: caseDetails.registration?.number ?? 'N/A' },
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
                              { label: 'Case Stage', value: caseDetails.status?.caseStage || 'N/A' },
                              { label: 'First Hearing Date', value: formatDate(caseDetails.status?.firstHearingDate) },
                              { label: 'Next Hearing Date', value: formatDate(caseDetails.status?.nextHearingDate) },
                              { label: 'Decision Date', value: formatDate(caseDetails.status?.decisionDate) },
                              { label: 'Nature of Disposal', value: caseDetails.status?.natureOfDisposal },
                              { label: 'Court and Judge', value: caseDetails.status?.courtNumberAndJudge || 'N/A' },
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
                          <div className="bg-gray-50 p-4 rounded-md">
                            {caseDetails.parties?.petitioners?.length > 0 ? (
                              <ul className="list-disc list-inside space-y-1">
                                {caseDetails.parties.petitioners.map((petitioner, index) => (
                                  <li key={index} className="text-sm">{petitioner}</li>
                                ))}
                              </ul>
                            ) : (
                              <p className="text-sm text-gray-500">No petitioners found</p>
                            )}
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="font-medium mb-2">Respondents</h3>
                          <div className="bg-gray-50 p-4 rounded-md">
                            {caseDetails.parties?.respondents?.length > 0 ? (
                              <ul className="list-disc list-inside space-y-1">
                                {caseDetails.parties.respondents.map((respondent, index) => (
                                  <li key={index} className="text-sm">{respondent}</li>
                                ))}
                              </ul>
                            ) : (
                              <p className="text-sm text-gray-500">No respondents found</p>
                            )}
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="font-medium mb-2">Petitioner Advocates</h3>
                          <div className="bg-gray-50 p-4 rounded-md">
                            {caseDetails.parties?.petitionerAdvocates?.length > 0 ? (
                              <ul className="list-disc list-inside space-y-1">
                                {caseDetails.parties.petitionerAdvocates.map((advocate, index) => (
                                  <li key={index} className="text-sm">{advocate}</li>
                                ))}
                              </ul>
                            ) : (
                              <p className="text-sm text-gray-500">No petitioner advocates found</p>
                            )}
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="font-medium mb-2">Respondent Advocates</h3>
                          <div className="bg-gray-50 p-4 rounded-md">
                            {caseDetails.parties?.respondentAdvocates?.length > 0 ? (
                              <ul className="list-disc list-inside space-y-1">
                                {caseDetails.parties.respondentAdvocates.map((advocate, index) => (
                                  <li key={index} className="text-sm">{advocate}</li>
                                ))}
                              </ul>
                            ) : (
                              <p className="text-sm text-gray-500">No respondent advocates found</p>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {activeTab === 'history' && (
                      <div>
                        <h3 className="font-medium mb-2">Case History</h3>
                        <div className="bg-gray-50 p-4 rounded-md">
                          {caseDetails.history?.length > 0 ? (
                            <div className="space-y-4">
                              {caseDetails.history.map((item, index) => (
                                <div key={index} className="border-b pb-2 last:border-b-0 last:pb-0">
                                  <p className="text-sm"><span className="font-medium">Date:</span> {formatDate(item.date)}</p>
                                  <p className="text-sm"><span className="font-medium">Action:</span> {item.action}</p>
                                  {item.description && <p className="text-sm"><span className="font-medium">Description:</span> {item.description}</p>}
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="text-sm text-gray-500">No history records found</p>
                          )}
                        </div>
                      </div>
                    )}
                    
                    {activeTab === 'acts' && (
                      <div>
                        <h3 className="font-medium mb-2">Acts</h3>
                        <div className="bg-gray-50 p-4 rounded-md">
                          {caseDetails.acts?.length > 0 ? (
                            <ul className="list-disc list-inside space-y-1">
                              {caseDetails.acts.map((act, index) => (
                                <li key={index} className="text-sm">{act}</li>
                              ))}
                            </ul>
                          ) : (
                            <p className="text-sm text-gray-500">No acts found</p>
                          )}
                        </div>
                      </div>
                    )}
                    
                    {activeTab === 'subMatters' && (
                      <div>
                        <h3 className="font-medium mb-2">Sub Matters</h3>
                        <div className="bg-gray-50 p-4 rounded-md">
                          {caseDetails.subMatters?.length > 0 ? (
                            <ul className="list-disc list-inside space-y-1">
                              {caseDetails.subMatters.map((matter, index) => (
                                <li key={index} className="text-sm">{matter}</li>
                              ))}
                            </ul>
                          ) : (
                            <p className="text-sm text-gray-500">No sub matters found</p>
                          )}
                        </div>
                      </div>
                    )}
                    
                    {activeTab === 'ia' && (
                      <div>
                        <h3 className="font-medium mb-2">Interlocutory Applications</h3>
                        <div className="bg-gray-50 p-4 rounded-md">
                          {caseDetails.iaDetails?.length > 0 ? (
                            <div className="space-y-4">
                              {caseDetails.iaDetails.map((ia, index) => (
                                <div key={index} className="border-b pb-2 last:border-b-0 last:pb-0">
                                  <p className="text-sm"><span className="font-medium">IA Number:</span> {ia.number}</p>
                                  <p className="text-sm"><span className="font-medium">Date:</span> {formatDate(ia.date)}</p>
                                  <p className="text-sm"><span className="font-medium">Type:</span> {ia.type}</p>
                                  {ia.status && <p className="text-sm"><span className="font-medium">Status:</span> {ia.status}</p>}
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="text-sm text-gray-500">No interlocutory applications found</p>
                          )}
                        </div>
                      </div>
                    )}
                    
                    {activeTab === 'documents' && (
                      <div>
                        <h3 className="font-medium mb-2">Documents</h3>
                        <div className="bg-gray-50 p-4 rounded-md">
                          {caseDetails.documentDetails?.length > 0 ? (
                            <div className="space-y-4">
                              {caseDetails.documentDetails.map((doc, index) => (
                                <div key={index} className="border-b pb-2 last:border-b-0 last:pb-0">
                                  <p className="text-sm"><span className="font-medium">Document Type:</span> {doc.type}</p>
                                  <p className="text-sm"><span className="font-medium">Filed By:</span> {doc.filedBy}</p>
                                  <p className="text-sm"><span className="font-medium">Filing Date:</span> {formatDate(doc.filingDate)}</p>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="text-sm text-gray-500">No documents found</p>
                          )}
                        </div>
                      </div>
                    )}
                    
                    {activeTab === 'objections' && (
                      <div>
                        <h3 className="font-medium mb-2">Objections</h3>
                        <div className="bg-gray-50 p-4 rounded-md">
                          {caseDetails.objections?.length > 0 ? (
                            <div className="space-y-4">
                              {caseDetails.objections.map((obj, index) => (
                                <div key={index} className="border-b pb-2 last:border-b-0 last:pb-0">
                                  <p className="text-sm"><span className="font-medium">Date:</span> {formatDate(obj.date)}</p>
                                  <p className="text-sm"><span className="font-medium">Description:</span> {obj.description}</p>
                                  <p className="text-sm"><span className="font-medium">Status:</span> {obj.status}</p>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="text-sm text-gray-500">No objections found</p>
                          )}
                        </div>
                      </div>
                    )}
                    
                    {activeTab === 'orders' && (
                      <div>
                        <h3 className="font-medium mb-2">Orders</h3>
                        <div className="bg-gray-50 p-4 rounded-md">
                          {caseDetails.orders?.length > 0 ? (
                            <div className="space-y-4">
                              {caseDetails.orders.map((order, index) => (
                                <div key={index} className="border-b pb-2 last:border-b-0 last:pb-0">
                                  <div className="flex justify-between items-start">
                                    <div>
                                      <p className="text-sm"><span className="font-medium">Order #{order.number}</span></p>
                                      <p className="text-sm"><span className="font-medium">Date:</span> {formatDate(order.date)}</p>
                                    </div>
                                    <a 
                                      href={order.orderURL} 
                                      target="_blank" 
                                      rel="noopener noreferrer" 
                                      className="bg-blue-100 text-blue-700 px-3 py-1 rounded-md text-sm hover:bg-blue-200 transition-colors"
                                    >
                                      {order.name}
                                    </a>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="text-sm text-gray-500">No orders found</p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : null}
            </div>
            <div className="border-t p-4 flex justify-end">
              <button onClick={closeModal} className="bg-gray-100 text-gray-600 hover:bg-gray-200 px-4 py-2 rounded-md transition-colors">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FilingNumberSearchPage;

