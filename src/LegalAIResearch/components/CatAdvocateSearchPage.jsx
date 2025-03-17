

// import React, { useState } from 'react';

// const CatAdvocateSearchPage = ({ court }) => {
//   const [name, setName] = useState(''); // Advocate name - empty string instead of null
//   const [benchId, setBenchId] = useState(''); // Bench ID - empty string
//   const [type, setType] = useState(''); // Party type - added this field
//   const [results, setResults] = useState([]); // API response data
//   const [isLoading, setIsLoading] = useState(false); // Loading state

//   const courtNames = {
//     'supreme': 'Supreme Court',
//     'high': 'High Court',
//     'district': 'District Court',
//     'nclt': 'NCLT',
//     'cat': 'Central Administrative Tribunal',
//     'consumer': 'Consumer Forum'
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true); // Start loading
//     try {
//       const response = await fetch('/court-api/eciapi/17/high-court/search/advocate-name', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: 'ECIAPI-XXaRks8npWTVUXpFpYc6nGj88cwPMq25', // Replace with your token
//         },
//         body: JSON.stringify({
//           name,
//           benchId,
//           type
//         }),
//       });
//       const data = await response.json();
//       setResults(data); // Set the results
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     } finally {
//       setIsLoading(false); // Stop loading
//     }
//   };

//   const handleClear = () => {
//     // Reset all fields and results
//     setName('');
//     setBenchId('');
//     setType('');
//     setResults([]);
//   };

//   return (
//     <div className="bg-white rounded-lg shadow-sm p-6">
//       <div className="mb-6">
//         <h2 className="text-2xl font-bold text-gray-800">Search {courtNames[court]} by Advocate Name</h2>
//         <p className="text-gray-600 mt-2">Find cases by entering advocate details.</p>
//       </div>

//       <form onSubmit={handleSubmit} className="space-y-6">
//         <div className="space-y-4">
//           <div>
//             <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
//               Advocate Name
//             </label>
//             <input
//               type="text"
//               id="name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Enter advocate name"
//             />
//           </div>

//           <div>
//             <label htmlFor="benchId" className="block text-sm font-medium text-gray-700 mb-1">
//               Bench ID
//             </label>
//             <input
//               type="text"
//               id="benchId"
//               value={benchId}
//               onChange={(e) => setBenchId(e.target.value)}
//               className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Enter Bench ID"
//             />
//           </div>

//           <div>
//             <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
//               Party Type
//             </label>
//             <select
//               id="type"
//               value={type}
//               onChange={(e) => setType(e.target.value)}
//               className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             >
//               <option value="">Select party type</option>
//               <option value="PETITIONER">Petitioner</option>
//               <option value="RESPONDENT">Respondent</option>
//               <option value="APPELLANT">Appellant</option>
//               <option value="DEFENDANT">Defendant</option>
//               <option value="COMPLAINANT">Complainant</option>
//               <option value="ACCUSED">Accused</option>
//             </select>
//           </div>


//         </div>

//         <div className="flex items-center space-x-4">
//           <button
//             type="submit"
//             className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center"
//             disabled={isLoading}
//           >
//             {isLoading ? (
//               <>
//                 <svg
//                   className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                 >
//                   <circle
//                     className="opacity-25"
//                     cx="12"
//                     cy="12"
//                     r="10"
//                     stroke="currentColor"
//                     strokeWidth="4"
//                   ></circle>
//                   <path
//                     className="opacity-75"
//                     fill="currentColor"
//                     d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                   ></path>
//                 </svg>
//                 Searching...
//               </>
//             ) : (
//               'Search Cases'
//             )}
//           </button>
//           <button
//             type="button"
//             onClick={handleClear}
//             className="px-6 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
//           >
//             Clear
//           </button>
//         </div>
//       </form>

//       {/* Results Section */}
//       {results.length > 0 && (
//         <div className="mt-6">
//           <h2 className="text-xl font-bold text-gray-800">Results:</h2>
//           <table className="min-w-full bg-white border border-gray-300 mt-4">
//             <thead>
//               <tr className="bg-gray-100">
//                 <th className="py-3 px-4 border-b text-left">CNR</th>
//                 <th className="py-3 px-4 border-b text-left">Case Number</th>
//                 <th className="py-3 px-4 border-b text-left">Title</th>
//                 <th className="py-3 px-4 border-b text-left">Type</th>
//                 <th className="py-3 px-4 border-b text-left">Decision Date</th>
//               </tr>
//             </thead>
//             <tbody>
//               {results.map((result, index) => (
//                 <tr key={index} className="hover:bg-gray-50">
//                   <td className="py-3 px-4 border-b">{result.cnr}</td>
//                   <td className="py-3 px-4 border-b">{result.caseNumber}</td>
//                   <td className="py-3 px-4 border-b">{result.title}</td>
//                   <td className="py-3 px-4 border-b">{result.type}</td>
//                   <td className="py-3 px-4 border-b">
//                     {result.decisionDate ? new Date(result.decisionDate).toLocaleDateString() : '-'}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CatAdvocateSearchPage;



// import React, { useState } from 'react';

// const CatAdvocateSearchPage = ({ court = 'cat' }) => {
//   const [name, setName] = useState(''); 
//   const [benchId, setBenchId] = useState(''); 
//   const [type, setType] = useState(''); 
//   const [results, setResults] = useState([]); 
//   const [isLoading, setIsLoading] = useState(false);
//   const [isSearched, setIsSearched] = useState(false);

//   const courtNames = {
//     'supreme': 'Supreme Court',
//     'high': 'High Court',
//     'district': 'District Court',
//     'nclt': 'NCLT',
//     'cat': 'Central Administrative Tribunal',
//     'consumer': 'Consumer Forum'
//   };

//   // Mock data for the search results
//   const mockApiResponse = [
//     {
//         "#": "1",
//         "advocateName": "PRIYADARSHI MANISH",
//         "diaryNumber": "7973/2014",
//         "caseNumber": "T.A./7/2014",
//         "applicantName": "RAJIV KUMAR SRIVASTAVA",
//         "defendantName": "M/O FINANCE"
//     },
//     {
//         "#": "2",
//         "advocateName": "PRIYADARSHI MANISH",
//         "diaryNumber": "1563/2014",
//         "caseNumber": "O.A./550/2014",
//         "applicantName": "SIDDHARTH KUMAR",
//         "defendantName": "DELHI METRO RAIL CORPORATION, GOVT. OF NCTD"
//     }
//   ];

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
    
//     // Simulate API call with a timeout
//     setTimeout(() => {
//       // Filter the mock data based on the search criteria
//       let filteredResults = [...mockApiResponse];
      
//       if (name) {
//         filteredResults = filteredResults.filter(result => 
//           result.advocateName.toLowerCase().includes(name.toLowerCase()));
//       }
      
//       // You could add more filtering based on benchId or type if needed
      
//       setResults(filteredResults);
//       setIsLoading(false);
//       setIsSearched(true);
//     }, 1000);
//   };

//   const handleClear = () => {
//     setName('');
//     setBenchId('');
//     setType('');
//     setResults([]);
//     setIsSearched(false);
//   };

//   return (
//     <div className="bg-white rounded-lg shadow-sm p-6">
//       <div className="mb-6">
//         <h2 className="text-2xl font-bold text-gray-800">Search {courtNames[court]} by Advocate Name</h2>
//         <p className="text-gray-600 mt-2">Find cases by entering advocate details.</p>
//       </div>

//       <form onSubmit={handleSubmit} className="space-y-6">
//         <div className="space-y-4">
//           <div>
//             <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
//               Advocate Name
//             </label>
//             <input
//               type="text"
//               id="name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Enter advocate name (e.g., PRIYADARSHI MANISH)"
//             />
//           </div>

//           <div>
//             <label htmlFor="benchId" className="block text-sm font-medium text-gray-700 mb-1">
//               Bench ID
//             </label>
//             <input
//               type="text"
//               id="benchId"
//               value={benchId}
//               onChange={(e) => setBenchId(e.target.value)}
//               className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Enter Bench ID"
//             />
//           </div>

//           <div>
//             <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
//               Party Type
//             </label>
//             <select
//               id="type"
//               value={type}
//               onChange={(e) => setType(e.target.value)}
//               className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             >
//               <option value="">Select party type</option>
//               <option value="PETITIONER">Petitioner</option>
//               <option value="RESPONDENT">Respondent</option>
//               <option value="APPELLANT">Appellant</option>
//               <option value="DEFENDANT">Defendant</option>
//               <option value="COMPLAINANT">Complainant</option>
//               <option value="ACCUSED">Accused</option>
//             </select>
//           </div>
//         </div>

//         <div className="flex items-center space-x-4">
//           <button
//             type="submit"
//             className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center"
//             disabled={isLoading}
//           >
//             {isLoading ? (
//               <>
//                 <svg
//                   className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                 >
//                   <circle
//                     className="opacity-25"
//                     cx="12"
//                     cy="12"
//                     r="10"
//                     stroke="currentColor"
//                     strokeWidth="4"
//                   ></circle>
//                   <path
//                     className="opacity-75"
//                     fill="currentColor"
//                     d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                   ></path>
//                 </svg>
//                 Searching...
//               </>
//             ) : (
//               'Search Cases'
//             )}
//           </button>
//           <button
//             type="button"
//             onClick={handleClear}
//             className="px-6 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
//           >
//             Clear
//           </button>
//         </div>
//       </form>

//       {/* Results Section */}
//       {isSearched && (
//         <div className="mt-6">
//           <h2 className="text-xl font-bold text-gray-800">
//             Results: {results.length > 0 ? `${results.length} cases found` : 'No cases found'}
//           </h2>
          
//           {results.length > 0 ? (
//             <div className="overflow-x-auto mt-4">
//               <table className="min-w-full bg-white border border-gray-300">
//                 <thead>
//                   <tr className="bg-gray-100">
//                     <th className="py-3 px-4 border-b text-left">#</th>
//                     <th className="py-3 px-4 border-b text-left">Advocate Name</th>
//                     <th className="py-3 px-4 border-b text-left">Diary Number</th>
//                     <th className="py-3 px-4 border-b text-left">Case Number</th>
//                     <th className="py-3 px-4 border-b text-left">Applicant</th>
//                     <th className="py-3 px-4 border-b text-left">Defendant</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {results.map((result, index) => (
//                     <tr key={index} className="hover:bg-gray-50">
//                       <td className="py-3 px-4 border-b">{result["#"]}</td>
//                       <td className="py-3 px-4 border-b">{result.advocateName}</td>
//                       <td className="py-3 px-4 border-b">{result.diaryNumber}</td>
//                       <td className="py-3 px-4 border-b font-medium text-blue-600 hover:underline cursor-pointer">{result.caseNumber}</td>
//                       <td className="py-3 px-4 border-b">{result.applicantName}</td>
//                       <td className="py-3 px-4 border-b">{result.defendantName}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           ) : (
//             <div className="bg-gray-50 p-6 text-center rounded-lg mt-4">
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 2a10 10 0 110 20 10 10 0 010-20z" />
//               </svg>
//               <p className="text-gray-600">No cases found matching your search criteria.</p>
//               <p className="text-gray-500 mt-2 text-sm">Try adjusting your search parameters or try a different advocate name.</p>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default CatAdvocateSearchPage



// import React, { useState } from 'react';

// const CatAdvocateSearchPage = ({ court }) => {
//   // State for form inputs
//   const [name, setName] = useState('');
//   const [type, setType] = useState('');
//   const [benchId, setBenchId] = useState('');
  
//   // State for search results and loading state
//   const [searchResults, setSearchResults] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);
  
//   // State for table search/filtering
//   const [tableSearchQuery, setTableSearchQuery] = useState('');
//   const [filteredResults, setFilteredResults] = useState(null);

//   // Handle search form submission
//   const handleSearch = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setError(null);
//     setTableSearchQuery(''); // Reset table search when performing a new search
    
//     try {
//       const response = await fetch("https://infrahive-ai-legal-research-gyfsavdfd0c9ehh5.centralindia-01.azurewebsites.net/legal-infrahive/central-administrative-tribunal/search-advocate-name/", {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: 'ECIAPI-XXaRks8npWTVUXpFpYc6nGj88cwPMq25', // Replace with your token
//         },
//         body: JSON.stringify({
//           name,
//           type,
//           benchId
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
//     const filtered = searchResults.filter(caseItem => 
//       (caseItem.diaryNumber && caseItem.diaryNumber.toLowerCase().includes(query)) ||
//       (caseItem.caseNumber && caseItem.caseNumber.toLowerCase().includes(query)) ||
//       (caseItem.applicantName && caseItem.applicantName.toLowerCase().includes(query)) ||
//       (caseItem.defendantName && caseItem.defendantName.toLowerCase().includes(query))
//     );
    
//     setFilteredResults(filtered);
//   };

//   // Clear form
//   const handleClear = () => {
//     setName('');
//     setType('');
//     setBenchId('');
//     setSearchResults(null);
//     setFilteredResults(null);
//     setTableSearchQuery('');
//   };

//   return (
//     <div className="space-y-4">
//       {/* Search Form Card */}
//       <div className="bg-white rounded-md shadow-sm w-[40vw]">
//         <div className="p-4 border-b border-gray-200">
//           <h2 className="text-lg font-semibold text-gray-800">
//             Search CAT Court by Advocate Name
//           </h2>
//           <p className="mt-1 text-xs text-gray-600">
//             Enter the advocate name and other details to find relevant cases
//           </p>
//         </div>
        
//         <div className="p-4">
//           <form onSubmit={handleSearch} className="space-y-3">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//               {/* Advocate Name Input */}
//               <div>
//                 <label htmlFor="name" className="block text-xs font-medium text-gray-700 mb-1">
//                   Advocate Name *
//                 </label>
//                 <input
//                   id="name"
//                   type="text"
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                   className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                   placeholder="Enter advocate name"
//                   required
//                 />
//                 <p className="text-xs text-gray-500 mt-1">
//                   Example: Manish
//                 </p>
//               </div>
              
//               {/* Case Type Dropdown */}
//               <div>
//                 <label htmlFor="type" className="block text-xs font-medium text-gray-700 mb-1">
//                   Case Type
//                 </label>
//                 <select
//                   id="type"
//                   value={type}
//                   onChange={(e) => setType(e.target.value)}
//                   className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                 >
//                   <option value="">Select case type</option>
//                   <option value="PETITIONER">PETITIONER</option>
//                   <option value="RESPONDENT">RESPONDENT</option>
//                   <option value="BOTH">BOTH</option>
//                 </select>
//                 <p className="text-xs text-gray-500 mt-1">
//                   Example: PETITIONER
//                 </p>
//               </div>
              
//               {/* Bench ID Input */}
//               <div>
//                 <label htmlFor="benchId" className="block text-xs font-medium text-gray-700 mb-1">
//                   Bench ID
//                 </label>
//                 <input
//                   id="benchId"
//                   type="text"
//                   value={benchId}
//                   onChange={(e) => setBenchId(e.target.value)}
//                   className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                   placeholder="Enter bench ID"
//                 />
//                 <p className="text-xs text-gray-500 mt-1">
//                   Example: ad573668
//                 </p>
//               </div>
//             </div>
            
//             <div className="flex justify-end space-x-3">
//               <button
//                 type="button"
//                 onClick={handleClear}
//                 className="px-3 py-1 text-sm border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
//               >
//                 Clear
//               </button>
//               <button
//                 type="submit"
//                 className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150"
//                 disabled={isLoading}
//               >
//                 {isLoading ? (
//                   <span className="flex items-center">
//                     <svg className="animate-spin -ml-1 mr-2 h-3 w-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                     </svg>
//                     Searching...
//                   </span>
//                 ) : 'Search'}
//               </button>
//             </div>
//           </form>
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
//               filteredResults && (
//                 <div className="overflow-x-auto rounded-lg shadow">
//                   <table className="min-w-full divide-y divide-gray-200 shadow-md shadow-slate-600">
//                     <thead className="bg-gray-100">
//                       <tr>
//                         <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
//                         <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Diary Number</th>
//                         <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Case Number</th>
//                         <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applicant Name</th>
//                         <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Defendant Name</th>
//                       </tr>
//                     </thead>
//                     <tbody className="bg-white divide-y divide-gray-200">
//                       {filteredResults.map((caseItem, index) => (
//                         <tr 
//                           key={index} 
//                           className={`
//                             ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} 
//                             hover:bg-blue-50 transition-colors duration-150
//                           `}
//                         >
//                           <td className="px-4 py-3 text-sm text-gray-900">{caseItem['#']}</td>
//                           <td className="px-4 py-3 text-sm text-gray-900">{caseItem.diaryNumber}</td>
//                           <td className="px-4 py-3 text-sm text-gray-900">{caseItem.caseNumber}</td>
//                           <td className="px-4 py-3 text-sm text-gray-900">{caseItem.applicantName}</td>
//                           <td className="px-4 py-3 text-sm text-gray-900">{caseItem.defendantName}</td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               )
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
//     </div>
//   );
// };

// export default CatAdvocateSearchPage;





import React, { useState } from 'react';
import { AlertTriangle, Search } from 'lucide-react';

const CatAdvocateSearchPage = ({ court }) => {
  // State for form inputs
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [benchId, setBenchId] = useState('');
  
  // State for search results and loading state
  const [searchResults, setSearchResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // State for table search/filtering
  const [tableSearchQuery, setTableSearchQuery] = useState('');
  const [filteredResults, setFilteredResults] = useState(null);

  // Handle search form submission
  const handleSearch = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setTableSearchQuery(''); // Reset table search when performing a new search
    setSearchResults(null); // Clear previous results
    setFilteredResults(null);
    
    try {
      const response = await fetch("https://infrahive-ai-legal-research-gyfsavdfd0c9ehh5.centralindia-01.azurewebsites.net/legal-infrahive/central-administrative-tribunal/search-advocate-name/", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'ECIAPI-XXaRks8npWTVUXpFpYc6nGj88cwPMq25',
        },
        body: JSON.stringify({
          name,
          type,
          benchId
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
    const filtered = searchResults.filter(caseItem => 
      (caseItem.diaryNumber && caseItem.diaryNumber.toLowerCase().includes(query)) ||
      (caseItem.caseNumber && caseItem.caseNumber.toLowerCase().includes(query)) ||
      (caseItem.applicantName && caseItem.applicantName.toLowerCase().includes(query)) ||
      (caseItem.defendantName && caseItem.defendantName.toLowerCase().includes(query))
    );
    
    setFilteredResults(filtered);
  };

  // Clear form
  const handleClear = () => {
    setName('');
    setType('');
    setBenchId('');
    setSearchResults(null);
    setFilteredResults(null);
    setTableSearchQuery('');
    setError(null); // Also clear any errors
  };

  return (
    <div className="space-y-4">
      {/* Search Form Card */}
      <div className="bg-white rounded-md shadow-sm w-[40vw]">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">
            Search CAT Court by Advocate Name
          </h2>
          <p className="mt-1 text-xs text-gray-600">
            Enter the advocate name and other details to find relevant cases
          </p>
        </div>
        
        <div className="p-4">
          <form onSubmit={handleSearch} className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {/* Advocate Name Input */}
              <div>
                <label htmlFor="name" className="block text-xs font-medium text-gray-700 mb-1">
                  Advocate Name *
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter advocate name"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  Example: Manish
                </p>
              </div>
              
              {/* Case Type Dropdown */}
              <div>
                <label htmlFor="type" className="block text-xs font-medium text-gray-700 mb-1">
                  Case Type
                </label>
                <select
                  id="type"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select case type</option>
                  <option value="PETITIONER">PETITIONER</option>
                  <option value="RESPONDENT">RESPONDENT</option>
                  <option value="BOTH">BOTH</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">
                  Example: PETITIONER
                </p>
              </div>
              
              {/* Bench ID Input */}
              <div>
                <label htmlFor="benchId" className="block text-xs font-medium text-gray-700 mb-1">
                  Bench ID
                </label>
                <input
                  id="benchId"
                  type="text"
                  value={benchId}
                  onChange={(e) => setBenchId(e.target.value)}
                  className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter bench ID"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Example: ad573668
                </p>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={handleClear}
                className="px-3 py-1 text-sm border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                Clear
              </button>
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
        
        {/* Display enhanced error message if any */}
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
                <Search className="w-4 h-4 text-gray-500" />
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
              <div className="overflow-x-auto rounded-lg shadow">
                <table className="min-w-full divide-y divide-gray-200 shadow-md shadow-slate-600">
                  <thead className="bg-gray-100">
                    <tr>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Diary Number</th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Case Number</th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applicant Name</th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Defendant Name</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredResults.map((caseItem, index) => (
                      <tr 
                        key={index} 
                        className={`
                          ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} 
                          hover:bg-blue-50 transition-colors duration-150
                        `}
                      >
                        <td className="px-4 py-3 text-sm text-gray-900">{caseItem['#'] || index + 1}</td>
                        <td className="px-4 py-3 text-sm text-gray-900">{caseItem.diaryNumber || 'N/A'}</td>
                        <td className="px-4 py-3 text-sm text-gray-900">{caseItem.caseNumber || 'N/A'}</td>
                        <td className="px-4 py-3 text-sm text-gray-900">{caseItem.applicantName || 'N/A'}</td>
                        <td className="px-4 py-3 text-sm text-gray-900">{caseItem.defendantName || 'N/A'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
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
    </div>
  );
};

export default CatAdvocateSearchPage;