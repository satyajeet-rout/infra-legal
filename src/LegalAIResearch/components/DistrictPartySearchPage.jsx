

// import React, { useState } from 'react';
// import DistrictCaseDetailsModal from './DistrictCaseDetailsModal';

// const DistrictPartySearchPage = ({ court }) => {
//   // State for form inputs
//   const [name, setName] = useState('');
//   const [stage, setStage] = useState('');
//   const [year, setYear] = useState('');
//   const [complexId, setComplexId] = useState('');
  
//   // State for search results and loading state
//   const [searchResults, setSearchResults] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);
  
//   // State for table search/filtering
//   const [tableSearchQuery, setTableSearchQuery] = useState('');
//   const [filteredResults, setFilteredResults] = useState(null);
  
//   // State for case details modal
//   const [showCaseDetails, setShowCaseDetails] = useState(false);
//   const [selectedCnr, setSelectedCnr] = useState(null);
//   const [caseDetails, setCaseDetails] = useState(null);
//   const [detailsLoading, setDetailsLoading] = useState(false);
//   const [detailsError, setDetailsError] = useState(null);

//   // Generate year options from 1900 to current year
//   const currentYear = new Date().getFullYear();
//   const yearOptions = [];
//   for (let y = currentYear; y >= 1900; y--) {
//     yearOptions.push(y);
//   }

//   // Handle search form submission
//   const handleSearch = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setError(null);
//     setTableSearchQuery(''); // Reset table search when performing a new search
    
//     try {
//       const response = await fetch("https://infrahive-ai-legal-research-gyfsavdfd0c9ehh5.centralindia-01.azurewebsites.net/legal-infrahive/district-court/search/party/", {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: 'ECIAPI-XXaRks8npWTVUXpFpYc6nGj88cwPMq25', // Replace with your token
//         },
//         body: JSON.stringify({
//           name,
//           stage,
//           year,
//           complexId
//         }),
//       });
      
//       if (!response.ok) {
//         throw new Error(`Error: ${response.status}`);
//       }
      
//       const data = await response.json();
//       setSearchResults(data);
//       setFilteredResults(data); // Initialize filtered results with all results
//     } catch (err) {
//       setError(err.message);
//       console.error('Search error:', err);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Handle table search/filtering
//   const handleTableSearch = (e) => {
//     const query = e.target.value.toLowerCase();
//     setTableSearchQuery(query);
    
//     if (!query.trim()) {
//       setFilteredResults(searchResults);
//       return;
//     }
    
//     // Filter the results based on the search query
//     const filtered = searchResults.map(court => {
//       const filteredCases = court.cases.filter(caseItem => 
//         (caseItem.cnr && caseItem.cnr.toLowerCase().includes(query)) ||
//         (caseItem.title && caseItem.title.toLowerCase().includes(query)) ||
//         (caseItem.caseNumber && caseItem.caseNumber.toLowerCase().includes(query)) ||
//         (caseItem.type && caseItem.type.toLowerCase().includes(query)) ||
//         (caseItem.filing && 
//           (`${caseItem.filing.number}/${caseItem.filing.year}`).toLowerCase().includes(query))
//       );
      
//       return {
//         ...court,
//         cases: filteredCases
//       };
//     }).filter(court => court.cases.length > 0);
    
//     setFilteredResults(filtered);
//   };

//   // Handle view details button click
//   const handleViewDetails = async (cnr) => {
//     setDetailsLoading(true);
//     setDetailsError(null);
//     setSelectedCnr(cnr);
    
//     try {
//       const response = await fetch("https://infrahive-ai-legal-research-gyfsavdfd0c9ehh5.centralindia-01.azurewebsites.net/legal-infrahive/district-court/case/", {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: 'ECIAPI-XXaRks8npWTVUXpFpYc6nGj88cwPMq25', // Replace with your token
//         },
//         body: JSON.stringify({
//           cnr
//         }),
//       });
      
//       if (!response.ok) {
//         throw new Error(`Error: ${response.status}`);
//       }
      
//       const data = await response.json();
//       setCaseDetails(data);
//       setShowCaseDetails(true);
//     } catch (err) {
//       setDetailsError(err.message);
//       console.error('Details fetch error:', err);
//     } finally {
//       setDetailsLoading(false);
//     }
//   };

//   // Close case details modal
//   const closeDetailsModal = () => {
//     setShowCaseDetails(false);
//     setCaseDetails(null);
//     setSelectedCnr(null);
//     setDetailsError(null);
//   };

//   // Format date string to more readable format
//   const formatDate = (dateString) => {
//     if (!dateString || dateString.includes('1970-01-01')) return 'Not Available';
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-IN', {
//       day: '2-digit',
//       month: 'short',
//       year: 'numeric'
//     });
//   };

//   return (
//     <div className="space-y-4">
//       {/* Search Form Card */}
//       <div className="bg-white rounded-md shadow-sm w-[40vw]">
//         <div className="p-4 border-b border-gray-200">
//           <h2 className="text-lg font-semibold text-gray-800">
//             Search {court.charAt(0).toUpperCase() + court.slice(1)} Court by Party Name
//           </h2>
//           <p className="mt-1 text-xs text-gray-600">
//             Enter the party name and other details to find relevant cases
//           </p>
//         </div>
        
//         <div className="p-4">
//           <form onSubmit={handleSearch} className="space-y-3">
//   <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//     {/* Party Name Input */}
//     <div>
//       <label htmlFor="name" className="block text-xs font-medium text-gray-700 mb-1">
//         Party Name *
//       </label>
//       <input
//         id="name"
//         type="text"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//         className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//         placeholder="Enter party name"
//         required
//       />
//       <div className="text-xs text-gray-500 mt-1">Example: Gaurav</div>
//     </div>
    
//     {/* Case Stage Dropdown */}
//     <div>
//       <label htmlFor="stage" className="block text-xs font-medium text-gray-700 mb-1">
//         Case Stage
//       </label>
//       <select
//         id="stage"
//         value={stage}
//         onChange={(e) => setStage(e.target.value)}
//         className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//       >
//         <option value="">Select case stage</option>
//         <option value="BOTH">BOTH</option>
//         <option value="PENDING">PENDING</option>
//         <option value="DISPOSED">DISPOSED</option>
//       </select>
//       <div className="text-xs text-gray-500 mt-1">Example: BOTH</div>
//     </div>
    
//     {/* Year Dropdown */}
//     <div>
//       <label htmlFor="year" className="block text-xs font-medium text-gray-700 mb-1">
//         Year
//       </label>
//       <select
//         id="year"
//         value={year}
//         onChange={(e) => setYear(e.target.value)}
//         className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//       >
//         <option value="">Select year</option>
//         {yearOptions.map((y) => (
//           <option key={y} value={y}>
//             {y}
//           </option>
//         ))}
//       </select>
//       <div className="text-xs text-gray-500 mt-1">Example: 2024</div>
//     </div>
    
//     {/* Complex ID Input */}
//     <div>
//       <label htmlFor="complexId" className="block text-xs font-medium text-gray-700 mb-1">
//         Complex ID
//       </label>
//       <input
//         id="complexId"
//         type="text"
//         value={complexId}
//         onChange={(e) => setComplexId(e.target.value)}
//         className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//         placeholder="Enter complex ID"
//       />
//       <div className="text-xs text-gray-500 mt-1">Example: 5f5f010a</div>
//     </div>
//   </div>
  
//   <div className="flex justify-end">
//     <button
//       type="submit"
//       className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150"
//       disabled={isLoading}
//     >
//       {isLoading ? (
//         <span className="flex items-center">
//           <svg className="animate-spin -ml-1 mr-2 h-3 w-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//             <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//             <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//           </svg>
//           Searching...
//         </span>
//       ) : 'Search'}
//     </button>
//   </div>
// </form>
//         </div>
        
//         {/* Display error message if any */}
//         {error && (
//           <div className="p-3 mx-4 mb-4 bg-red-50 border border-red-200 rounded-md">
//             <p className="text-xs text-red-600">{error}</p>
//           </div>
//         )}
//       </div>
      
//       {/* Search Results Card */}
//       {searchResults && (
//         <div className="bg-white rounded-md shadow-sm">
//           <div className="p-4 border-b border-gray-200 flex justify-between items-center">
//             <h3 className="text-md font-medium text-gray-800">Search Results</h3>
            
//             {/* Table search input */}
//             <div className="relative w-64">
//               <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
//                 <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
//                   <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
//                 </svg>
//               </div>
//               <input
//                 type="text"
//                 className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
//                 placeholder="Search in results..."
//                 value={tableSearchQuery}
//                 onChange={handleTableSearch}
//               />
//             </div>
//           </div>
          
//           <div className="p-4">
//             {filteredResults && filteredResults.length === 0 ? (
//               <div className="p-3 bg-gray-50 rounded-md border border-gray-200">
//                 <p className="text-sm text-gray-600">
//                   {searchResults.length === 0 
//                     ? "No records found matching your search criteria." 
//                     : "No records match your filter criteria."}
//                 </p>
//               </div>
//             ) : (
//               filteredResults && filteredResults.map((court, courtIndex) => (
//                 <div key={courtIndex} className="mb-4">
//                   <h4 className="text-sm font-medium text-gray-700 mb-2">{court.name}</h4>
                  
//                   <div className="overflow-x-auto rounded-lg shadow">
//                     <table className="min-w-full divide-y divide-gray-200 shadow-md shadow-slate-600">
//                       <thead className="bg-gray-100">
//                         <tr>
//                           <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CNR</th>
//                           <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Case Title</th>
//                           <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Case Number</th>
//                           <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Filing No/Year</th>
//                           <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
//                           <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Decision Date</th>
//                           <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//                         </tr>
//                       </thead>
//                       <tbody className="bg-white divide-y divide-gray-200">
//                         {court.cases.map((caseItem, caseIndex) => (
//                           <tr 
//                             key={caseIndex} 
//                             className={`
//                               ${caseIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'} 
//                               hover:bg-blue-50 transition-colors duration-150
//                             `}
//                           >
//                             <td className="px-4 py-3 text-sm text-gray-900">{caseItem.cnr || 'N/A'}</td>
//                             <td className="px-4 py-3 text-sm text-gray-900">{caseItem.title || 'N/A'}</td>
//                             <td className="px-4 py-3 text-sm text-gray-900">{caseItem.caseNumber || 'N/A'}</td>
//                             <td className="px-4 py-3 text-sm text-gray-900">
//                               {caseItem.filing ? `${caseItem.filing.number}/${caseItem.filing.year}` : 'N/A'}
//                             </td>
//                             <td className="px-4 py-3 text-sm">
//                               <span className="px-2 inline-flex text-xs leading-5 font-semibold  text-blue-800">
//                                 {caseItem.type || 'N/A'}
//                               </span>
//                             </td>
//                             <td className="px-4 py-3 text-sm text-gray-900">
//                               {formatDate(caseItem.dateOfDecision)}
//                             </td>
//                             <td className="px-4 py-3 text-sm text-gray-900">
//                               <button
//                                 onClick={() => handleViewDetails(caseItem.cnr)}
//                                 disabled={detailsLoading && selectedCnr === caseItem.cnr}
//                                 className="flex items-center px-2 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150"
//                               >
//                                 {detailsLoading && selectedCnr === caseItem.cnr ? 'Loading...' : (
//                                   <>
//                                     <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                                     </svg>
//                                     Details
//                                   </>
//                                 )}
//                               </button>
//                             </td>
//                           </tr>
//                         ))}
//                       </tbody>
//                     </table>
//                   </div>
//                 </div>
//               ))
//             )}
            
//             {/* Show clear filter button when filtered results are different from search results */}
//             {tableSearchQuery && filteredResults && searchResults && 
//              filteredResults.length !== searchResults.length && (
//               <div className="mt-4 flex justify-center">
//                 <button
//                   onClick={() => {
//                     setTableSearchQuery('');
//                     setFilteredResults(searchResults);
//                   }}
//                   className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
//                 >
//                   <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                   </svg>
//                   Clear search filter
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       )}
      
//       {/* Case Details Modal */}
//       {showCaseDetails && (
//         <DistrictCaseDetailsModal 
//           caseDetails={caseDetails}
//           isLoading={detailsLoading}
//           error={detailsError}
//           onClose={closeDetailsModal}
//         />
//       )}
//     </div>
//   );
// };

// export default DistrictPartySearchPage;




import React, { useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import DistrictCaseDetailsModal from './DistrictCaseDetailsModal';

const DistrictPartySearchPage = ({ court }) => {
  // State for form inputs
  const [name, setName] = useState('');
  const [stage, setStage] = useState('');
  const [year, setYear] = useState('');
  const [complexId, setComplexId] = useState('');
  
  // State for search results and loading state
  const [searchResults, setSearchResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // State for table search/filtering
  const [tableSearchQuery, setTableSearchQuery] = useState('');
  const [filteredResults, setFilteredResults] = useState(null);
  
  // State for case details modal
  const [showCaseDetails, setShowCaseDetails] = useState(false);
  const [selectedCnr, setSelectedCnr] = useState(null);
  const [caseDetails, setCaseDetails] = useState(null);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [detailsError, setDetailsError] = useState(null);

  // Generate year options from 1900 to current year
  const currentYear = new Date().getFullYear();
  const yearOptions = [];
  for (let y = currentYear; y >= 1900; y--) {
    yearOptions.push(y);
  }

  // Handle search form submission
  const handleSearch = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setTableSearchQuery(''); // Reset table search when performing a new search
    setSearchResults(null); // Clear previous results
    setFilteredResults(null);
    
    try {
      const response = await fetch("https://infrahive-ai-legal-research-gyfsavdfd0c9ehh5.centralindia-01.azurewebsites.net/legal-infrahive/district-court/search/party/", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'ECIAPI-XXaRks8npWTVUXpFpYc6nGj88cwPMq25',
        },
        body: JSON.stringify({
          name,
          stage,
          year,
          complexId
        }),
      });
      
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
      
      // Ensure data is always treated as an array
      const resultsArray = Array.isArray(data) ? data : [];
      setSearchResults(resultsArray);
      setFilteredResults(resultsArray); // Initialize filtered results with all results
    } catch (err) {
      setError(err.message || 'An error occurred during search');
      console.error('Search error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle retry for search
  const handleRetrySearch = () => {
    handleSearch(new Event('submit'));
  };

  // Handle table search/filtering
  const handleTableSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setTableSearchQuery(query);
    
    if (!query.trim() || !Array.isArray(searchResults)) {
      setFilteredResults(searchResults);
      return;
    }
    
    // Filter the results based on the search query
    const filtered = searchResults.map(court => {
      const filteredCases = court.cases.filter(caseItem => 
        (caseItem.cnr && caseItem.cnr.toLowerCase().includes(query)) ||
        (caseItem.title && caseItem.title.toLowerCase().includes(query)) ||
        (caseItem.caseNumber && caseItem.caseNumber.toLowerCase().includes(query)) ||
        (caseItem.type && caseItem.type.toLowerCase().includes(query)) ||
        (caseItem.filing && 
          (`${caseItem.filing.number}/${caseItem.filing.year}`).toLowerCase().includes(query))
      );
      
      return {
        ...court,
        cases: filteredCases
      };
    }).filter(court => court.cases.length > 0);
    
    setFilteredResults(filtered);
  };

  // Handle view details button click
  const handleViewDetails = async (cnr) => {
    setDetailsLoading(true);
    setDetailsError(null);
    setSelectedCnr(cnr);
    
    try {
      const response = await fetch("https://infrahive-ai-legal-research-gyfsavdfd0c9ehh5.centralindia-01.azurewebsites.net/legal-infrahive/district-court/case/", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'ECIAPI-XXaRks8npWTVUXpFpYc6nGj88cwPMq25',
        },
        body: JSON.stringify({
          cnr
        }),
      });
      
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
      setShowCaseDetails(true);
    } catch (err) {
      setDetailsError(err.message || 'Failed to fetch case details');
      console.error('Details fetch error:', err);
    } finally {
      setDetailsLoading(false);
    }
  };

  // Handle retry for case details
  const handleRetryDetails = () => {
    if (selectedCnr) {
      handleViewDetails(selectedCnr);
    }
  };

  // Close case details modal
  const closeDetailsModal = () => {
    setShowCaseDetails(false);
    setCaseDetails(null);
    setSelectedCnr(null);
    setDetailsError(null);
  };

  // Format date string to more readable format
  const formatDate = (dateString) => {
    if (!dateString || dateString.includes('1970-01-01')) return 'Not Available';
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return 'Not Available';
      return date.toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      });
    } catch (err) {
      return 'Not Available';
    }
  };

  return (
    <div className="space-y-4">
      {/* Search Form Card */}
      <div className="bg-white rounded-md shadow-sm w-[40vw]">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">
            Search {court.charAt(0).toUpperCase() + court.slice(1)} Court by Party Name
          </h2>
          <p className="mt-1 text-xs text-gray-600">
            Enter the party name and other details to find relevant cases
          </p>
        </div>
        
        <div className="p-4">
          <form onSubmit={handleSearch} className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {/* Party Name Input */}
              <div>
                <label htmlFor="name" className="block text-xs font-medium text-gray-700 mb-1">
                  Party Name *
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter party name"
                  required
                />
                <div className="text-xs text-gray-500 mt-1">Example: Gaurav</div>
              </div>
              
              {/* Case Stage Dropdown */}
              <div>
                <label htmlFor="stage" className="block text-xs font-medium text-gray-700 mb-1">
                  Case Stage
                </label>
                <select
                  id="stage"
                  value={stage}
                  onChange={(e) => setStage(e.target.value)}
                  className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select case stage</option>
                  <option value="BOTH">BOTH</option>
                  <option value="PENDING">PENDING</option>
                  <option value="DISPOSED">DISPOSED</option>
                </select>
                <div className="text-xs text-gray-500 mt-1">Example: BOTH</div>
              </div>
              
              {/* Year Dropdown */}
              <div>
                <label htmlFor="year" className="block text-xs font-medium text-gray-700 mb-1">
                  Year
                </label>
                <select
                  id="year"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select year</option>
                  {yearOptions.map((y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))}
                </select>
                <div className="text-xs text-gray-500 mt-1">Example: 2024</div>
              </div>
              
              {/* Complex ID Input */}
              <div>
                <label htmlFor="complexId" className="block text-xs font-medium text-gray-700 mb-1">
                  Complex ID
                </label>
                <input
                  id="complexId"
                  type="text"
                  value={complexId}
                  onChange={(e) => setComplexId(e.target.value)}
                  className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter complex ID"
                />
                <div className="text-xs text-gray-500 mt-1">Example: 5f5f010a</div>
              </div>
            </div>
            
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-3 w-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Searching...
                  </span>
                ) : 'Search'}
              </button>
            </div>
          </form>
        </div>
        
        {/* Display error message if any */}
        {error && (
          <div className="p-3 mx-4 mb-4 bg-red-50 border border-red-200 rounded-md">
            <div className="flex items-start">
              <AlertTriangle className="h-4 w-4 mr-2 flex-shrink-0 text-red-600" />
              <div className="flex-1">
                <p className="text-xs text-red-600 font-medium">{error}</p>
                {error.includes("403") && (
                  <p className="mt-1 text-xs text-red-500">This could be due to an expired session or authentication issue.</p>
                )}
                <div className="mt-2">
                  <button 
                    onClick={handleRetrySearch}
                    className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs hover:bg-red-200 transition-colors"
                  >
                    Retry Request
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Search Results Card */}
      {searchResults && (
        <div className="bg-white rounded-md shadow-sm">
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-md font-medium text-gray-800">Search Results</h3>
            
            {/* Table search input */}
            <div className="relative w-64">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
              </div>
              <input
                type="text"
                className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search in results..."
                value={tableSearchQuery}
                onChange={handleTableSearch}
              />
            </div>
          </div>
          
          <div className="p-4">
            {!filteredResults || filteredResults.length === 0 ? (
              <div className="p-3 bg-gray-50 rounded-md border border-gray-200">
                <p className="text-sm text-gray-600">
                  {!searchResults || searchResults.length === 0 
                    ? "No records found matching your search criteria." 
                    : "No records match your filter criteria."}
                </p>
              </div>
            ) : (
              filteredResults.map((court, courtIndex) => (
                <div key={courtIndex} className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">{court.name || 'Court'}</h4>
                  
                  <div className="overflow-x-auto rounded-lg shadow">
                    <table className="min-w-full divide-y divide-gray-200 shadow-md shadow-slate-600">
                      <thead className="bg-gray-100">
                        <tr>
                          <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CNR</th>
                          <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Case Title</th>
                          <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Case Number</th>
                          <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Filing No/Year</th>
                          <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                          <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Decision Date</th>
                          <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {court.cases && court.cases.map((caseItem, caseIndex) => (
                          <tr 
                            key={caseIndex} 
                            className={`
                              ${caseIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'} 
                              hover:bg-blue-50 transition-colors duration-150
                            `}
                          >
                            <td className="px-4 py-3 text-sm text-gray-900">{caseItem.cnr || 'N/A'}</td>
                            <td className="px-4 py-3 text-sm text-gray-900">{caseItem.title || 'N/A'}</td>
                            <td className="px-4 py-3 text-sm text-gray-900">{caseItem.caseNumber || 'N/A'}</td>
                            <td className="px-4 py-3 text-sm text-gray-900">
                              {caseItem.filing ? `${caseItem.filing.number || ''}/${caseItem.filing.year || ''}` : 'N/A'}
                            </td>
                            <td className="px-4 py-3 text-sm">
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold text-blue-800">
                                {caseItem.type || 'N/A'}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-900">
                              {formatDate(caseItem.dateOfDecision)}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-900">
                              <button
                                onClick={() => handleViewDetails(caseItem.cnr)}
                                disabled={detailsLoading && selectedCnr === caseItem.cnr}
                                className="flex items-center px-2 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150"
                              >
                                {detailsLoading && selectedCnr === caseItem.cnr ? (
                                  <span className="flex items-center space-x-1">
                                    <svg className="animate-spin h-3 w-3 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Loading...
                                  </span>
                                ) : (
                                  <>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    Details
                                  </>
                                )}
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))
            )}
            
            {/* Show clear filter button when filtered results are different from search results */}
            {tableSearchQuery && filteredResults && searchResults && 
             filteredResults.length !== searchResults.length && (
              <div className="mt-4 flex justify-center">
                <button
                  onClick={() => {
                    setTableSearchQuery('');
                    setFilteredResults(searchResults);
                  }}
                  className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
                >
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Clear search filter
                </button>
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* Enhanced Case Details Modal with Error Handling */}
      {showCaseDetails && (
        <EnhancedDistrictCaseDetailsModal 
          caseDetails={caseDetails}
          isLoading={detailsLoading}
          error={detailsError}
          onClose={closeDetailsModal}
          onRetry={handleRetryDetails}
        />
      )}
    </div>
  );
};

// Enhanced version of DistrictCaseDetailsModal with better error handling
const EnhancedDistrictCaseDetailsModal = ({ caseDetails, isLoading, error, onClose, onRetry }) => {
  // This is a wrapper that adds error handling to your existing DistrictCaseDetailsModal
  // If there's an error, show an enhanced error message with retry option
  
  if (error) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center border-b p-4 sticky top-0 bg-white z-10">
            <h3 className="text-lg font-semibold">Case Details</h3>
            <button 
              onClick={onClose} 
              className="text-gray-500 hover:text-gray-700"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="p-4">
            <div className="bg-red-50 border border-red-200 rounded-md p-4">
              <div className="flex items-start">
                <AlertTriangle className="h-5 w-5 mr-3 flex-shrink-0 text-red-600" />
                <div className="flex-1 text-red-700">
                  <p className="font-medium">{error}</p>
                  {error.includes("403") && (
                    <p className="mt-1 text-sm">This could be due to an expired session or authentication issue.</p>
                  )}
                  <div className="mt-3">
                    <button 
                      onClick={onRetry}
                      className="bg-red-100 text-red-800 px-3 py-1 rounded-md text-sm hover:bg-red-200 transition-colors"
                    >
                      Retry
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t p-4 flex justify-end">
            <button 
              onClick={onClose} 
              className="bg-gray-100 text-gray-600 hover:bg-gray-200 px-4 py-2 rounded-md transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  // If no error, use the existing DistrictCaseDetailsModal component
  return (
    <DistrictCaseDetailsModal 
      caseDetails={caseDetails}
      isLoading={isLoading}
      error={error}
      onClose={onClose}
    />
  );
};

export default DistrictPartySearchPage;