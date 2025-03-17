

// import React, { useState } from 'react';

// const AdvocateSearchPage = ({ court }) => {
//   const [name, setName] = useState(null); // Advocate name
//   const [stage, setStage] = useState(null); // Case stage
//   const [benchId, setBenchId] = useState(null); // Bench ID
//   const [results, setResults] = useState([]); // API response data
//   const [isLoading, setIsLoading] = useState(false); // Loading state

//   const courtNames = {
//     'supreme': 'Supreme Court',
//     'high': 'High Court',
//     'district': 'District Court',
//     'nclt': 'NCLT'
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true); // Start loading
//     try {
//       // const response = await fetch('/court-api/eciapi/17/high-court/search/advocate-name', {
//       const response = await fetch(`https://mocki.io/v1/07cb51f5-e032-4672-ab8c-f28bde712a68`, {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: 'ECIAPI-XXaRks8npWTVUXpFpYc6nGj88cwPMq25', // Replace with your token
//         },
//         // body: JSON.stringify({
//         //   name,
//         //   stage,
//         //   benchId,
//         // }),
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
//     setName(null);
//     setStage(null);
//     setBenchId(null);
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
//               value={name || ''}
//               onChange={(e) => setName(e.target.value || null)}
//               className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Enter advocate name"
//             />
//           </div>

//           <div>
//             <label htmlFor="stage" className="block text-sm font-medium text-gray-700 mb-1">
//               Case Stage
//             </label>
//             <select
//               id="stage"
//               value={stage || ''}
//               onChange={(e) => setStage(e.target.value || null)}
//               className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             >
//               <option value="">Select stage</option>
//               <option value="PENDING">Pending</option>
//               <option value="DISPOSED">Disposed</option>
//               <option value="BOTH">Both</option>
//             </select>
//           </div>

//           <div>
//             <label htmlFor="benchId" className="block text-sm font-medium text-gray-700 mb-1">
//               Bench ID
//             </label>
//             <input
//               type="text"
//               id="benchId"
//               value={benchId || ''}
//               onChange={(e) => setBenchId(e.target.value || null)}
//               className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Enter Bench ID"
//             />
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
//                     {new Date(result.decisionDate).toLocaleDateString()}
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

// export default AdvocateSearchPage;



// import React, { useState } from 'react';
// import { Search } from 'lucide-react';

// const AdvocateSearchPage = ({ court }) => {
//   const [name, setName] = useState(''); // Advocate name
//   const [stage, setStage] = useState(''); // Case stage
//   const [benchId, setBenchId] = useState(''); // Bench ID
//   const [results, setResults] = useState([]); // API response data
//   const [isLoading, setIsLoading] = useState(false); // Loading state
//   const [hasResponse, setHasResponse] = useState(false);
//   const [selectedCase, setSelectedCase] = useState(null);
//   const [showDetailsModal, setShowDetailsModal] = useState(false);

//   const courtNames = {
//     'supreme': 'Supreme Court',
//     'high': 'High Court',
//     'district': 'District Court',
//     'nclt': 'NCLT'
//   };

//   // Mock results data for demonstration
//   const mockResults = [
//     {
//       cnr: "DLHC12345678",
//       caseNumber: "CS/101/2023",
//       title: "ABC Corp. vs XYZ Ltd.",
//       type: "Civil Suit",
//       decisionDate: "2023-11-15",
//       detailsData: {
//         cnr: "DLHC12345678",
//         filing: {
//           date: "2023-01-15T18:30:00.000Z",
//           number: "CS/101/2023"
//         },
//         registration: {
//           date: "2023-01-18T18:30:00.000Z",
//           number: "CS/101/2023"
//         },
//         status: {
//           firstHearingDate: "2023-01-20T18:30:00.000Z",
//           nextHearingDate: "1970-01-01T00:00:00.000Z",
//           decisionDate: "2023-11-15T18:30:00.000Z",
//           natureOfDisposal: "Decreed",
//           caseStage: "DISPOSED",
//           courtNumberAndJudge: "5001 - High Court of Delhi, High Court of Delhi"
//         },
//         parties: {
//           petitioners: [
//             "ABC CORP"
//           ],
//           respondents: [
//             "XYZ LTD"
//           ],
//           petitionerAdvocates: [
//             "ANIL SHARMA"
//           ],
//           respondentAdvocates: [
//             "PRIYA MEHTA"
//           ]
//         },
//         acts: [
//           {
//             act: "COMPANIES ACT",
//             section: "43/45"
//           }
//         ],
//         subMatters: [],
//         iaDetails: [],
//         categoryDetails: {
//           category: "COMMERCIAL",
//           subCategory: "BUSINESS DISPUTE",
//           subSubCategory: ""
//         },
//         documentDetails: [],
//         objections: [],
//         history: [],
//         orders: []
//       }
//     },
//     {
//       cnr: "DLHC87654321",
//       caseNumber: "WP/202/2023",
//       title: "John Doe vs State",
//       type: "Writ Petition",
//       decisionDate: "2023-10-30",
//       detailsData: {
//         cnr: "DLHC87654321",
//         filing: {
//           date: "2023-02-10T18:30:00.000Z",
//           number: "WP/202/2023"
//         },
//         registration: {
//           date: "2023-02-12T18:30:00.000Z",
//           number: "WP/202/2023"
//         },
//         status: {
//           firstHearingDate: "2023-02-15T18:30:00.000Z",
//           nextHearingDate: "1970-01-01T00:00:00.000Z",
//           decisionDate: "2023-10-30T18:30:00.000Z",
//           natureOfDisposal: "Allowed",
//           caseStage: "DISPOSED",
//           courtNumberAndJudge: "4002 - High Court of Delhi, High Court of Delhi"
//         },
//         parties: {
//           petitioners: [
//             "JOHN DOE"
//           ],
//           respondents: [
//             "THE STATE"
//           ],
//           petitionerAdvocates: [
//             "RAJIV KHOSLA"
//           ],
//           respondentAdvocates: [
//             "STATE COUNSEL"
//           ]
//         },
//         acts: [
//           {
//             act: "CONSTITUTION OF INDIA",
//             section: "Article 14/21"
//           }
//         ],
//         subMatters: [],
//         iaDetails: [],
//         categoryDetails: {
//           category: "CIVIL",
//           subCategory: "WRIT",
//           subSubCategory: "FUNDAMENTAL RIGHTS"
//         },
//         documentDetails: [],
//         objections: [],
//         history: [],
//         orders: []
//       }
//     },
//     {
//       cnr: "DLHC010003082023",
//       caseNumber: "BAIL APPLN./83/2023",
//       title: "ASHOK@RAKESH vs THE STATE (GOVT. OF NCT OF DELHI)",
//       type: "Bail Application",
//       decisionDate: "2023-01-31",
//       detailsData: {
//         cnr: "DLHC010003082023",
//         filing: {
//           date: "2023-01-06T18:30:00.000Z",
//           number: "BAIL APPLN./20541/2023"
//         },
//         registration: {
//           date: "2023-01-08T18:30:00.000Z",
//           number: "BAIL APPLN./83/2023"
//         },
//         status: {
//           firstHearingDate: "2023-01-09T18:30:00.000Z",
//           nextHearingDate: "2025-03-16T18:30:00.000Z",
//           decisionDate: "1970-01-01T00:00:00.000Z",
//           natureOfDisposal: null,
//           caseStage: "FRESH MATTERS & APPLICATIONS",
//           courtNumberAndJudge: "6113 - High Court of Delhi, High Court of Delhi"
//         },
//         parties: {
//           petitioners: [
//             "ASHOK@RAKESH"
//           ],
//           respondents: [
//             "THE STATE (GOVT. OF NCT OF DELHI)",
//             "ANR."
//           ],
//           petitionerAdvocates: [
//             "SUMIT SHARMA"
//           ],
//           respondentAdvocates: [
//             "GOVT ADVOCATE"
//           ]
//         },
//         acts: [
//           {
//             act: "INDIAN PENAL CODE",
//             section: "354D/596"
//           },
//           {
//             act: "POCSO",
//             section: "506"
//           }
//         ],
//         subMatters: [],
//         iaDetails: [],
//         categoryDetails: {
//           category: "CRIMINAL MATTERS",
//           subCategory: "BAIL MATTERS",
//           subSubCategory: "REGULAR BAIL"
//         },
//         documentDetails: [],
//         objections: [],
//         history: [],
//         orders: []
//       }
//     }
//   ];

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setHasResponse(false);
    
//     // Simulate API call with timeout
//     setTimeout(() => {
//       setResults(mockResults);
//       setIsLoading(false);
//       setHasResponse(true);
//     }, 1500);
//   };

//   const handleClear = () => {
//     setName('');
//     setStage('');
//     setBenchId('');
//     setResults([]);
//     setHasResponse(false);
//   };

//   const handleViewDetails = (caseData) => {
//     setSelectedCase(caseData.detailsData);
//     setShowDetailsModal(true);
//   };

//   const formatDate = (dateString) => {
//     if (!dateString || dateString === "1970-01-01T00:00:00.000Z") return "N/A";
//     return new Date(dateString).toLocaleDateString('en-IN', {
//       day: '2-digit',
//       month: '2-digit',
//       year: 'numeric'
//     });
//   };

//   const closeModal = () => {
//     setShowDetailsModal(false);
//     setSelectedCase(null);
//   };

//   // Modal component to display case details
//   const CaseDetailsModal = ({ isOpen, onClose, caseData }) => {
//     if (!isOpen || !caseData) return null;

//     return (
//       <div className="fixed inset-0 z-50 flex items-center justify-center">
//         <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
//         <div className="relative bg-white rounded-lg shadow-xl max-w-5xl w-full max-h-[90vh] overflow-y-auto">
//           {/* Header with title and close button */}
//           <div className="py-4 px-6 flex justify-between items-center border-b">
//             <h2 className="text-xl font-bold">{caseData.parties.petitioners.join(', ')} vs {caseData.parties.respondents.join(', ')}</h2>
//             <button
//               onClick={onClose}
//               className="text-gray-500 hover:text-gray-700 focus:outline-none"
//             >
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//               </svg>
//             </button>
//           </div>

//           {/* Information header */}
//           <div className="bg-blue-50 p-4">
//             <div className="mb-2">
//               <span className="font-semibold text-blue-800">CNR Number:</span> {caseData.cnr}
//             </div>
//             <div>
//               <span className="font-semibold text-blue-800">Category:</span> {
//                 caseData.categoryDetails && caseData.categoryDetails.category ? 
//                 `${caseData.categoryDetails.category} > ${caseData.categoryDetails.subCategory || ''} > ${caseData.categoryDetails.subSubCategory || ''}` : 
//                 "CRIMINAL MATTERS > BAIL MATTERS > REGULAR BAIL"
//               }
//             </div>
//           </div>

//           <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
//             {/* Case Details Card */}
//             <div className="border rounded-lg overflow-hidden">
//               <div className="bg-white p-4 flex items-center gap-2 border-b">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//                 </svg>
//                 <h3 className="font-semibold">Case Details</h3>
//               </div>
//               <div className="p-4 space-y-3">
//                 <div>
//                   <div className="text-sm font-medium">Filing Number:</div>
//                   <div>{caseData.filing.number}</div>
//                 </div>
//                 <div>
//                   <div className="text-sm font-medium">Filing Date:</div>
//                   <div>{formatDate(caseData.filing.date)}</div>
//                 </div>
//                 <div>
//                   <div className="text-sm font-medium">Registration Number:</div>
//                   <div>{caseData.registration.number}</div>
//                 </div>
//                 <div>
//                   <div className="text-sm font-medium">Registration Date:</div>
//                   <div>{formatDate(caseData.registration.date)}</div>
//                 </div>
//               </div>
//             </div>

//             {/* Status Card */}
//             <div className="border rounded-lg overflow-hidden">
//               <div className="bg-white p-4 flex items-center gap-2 border-b">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
//                 </svg>
//                 <h3 className="font-semibold">Status</h3>
//               </div>
//               <div className="p-4 space-y-3">
//                 <div>
//                   <div className="text-sm font-medium">Court:</div>
//                   <div>{caseData.status.courtNumberAndJudge}</div>
//                 </div>
//                 <div>
//                   <div className="text-sm font-medium">First Hearing Date:</div>
//                   <div>{formatDate(caseData.status.firstHearingDate)}</div>
//                 </div>
//                 <div>
//                   <div className="text-sm font-medium">Next Hearing Date:</div>
//                   <div>{formatDate(caseData.status.nextHearingDate) === 'N/A' ? '16 Mar 2025' : formatDate(caseData.status.nextHearingDate)}</div>
//                 </div>
//                 <div>
//                   <div className="text-sm font-medium">Decision Date:</div>
//                   <div>{formatDate(caseData.status.decisionDate) === 'N/A' ? 'N/A' : formatDate(caseData.status.decisionDate)}</div>
//                 </div>
//                 <div>
//                   <div className="text-sm font-medium">Case Stage:</div>
//                   <div>{caseData.status.caseStage}</div>
//                 </div>
//               </div>
//             </div>

//             {/* Petitioners Card */}
//             <div className="border rounded-lg overflow-hidden">
//               <div className="bg-white p-4 flex items-center gap-2 border-b">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//                 </svg>
//                 <h3 className="font-semibold">Petitioners</h3>
//               </div>
//               <div className="p-4">
//                 <ul className="mb-4">
//                   {caseData.parties.petitioners.map((name, index) => (
//                     <li key={`petitioner-${index}`} className="mb-1 flex items-start">
//                       <span className="text-gray-600 mr-2">•</span>
//                       {name}
//                     </li>
//                   ))}
//                 </ul>
                
//                 <div className="mt-4">
//                   <div className="font-medium mb-2">Advocates:</div>
//                   <ul>
//                     {caseData.parties.petitionerAdvocates.length > 0 ? 
//                       caseData.parties.petitionerAdvocates.map((name, index) => (
//                         <li key={`pet-adv-${index}`} className="mb-1 flex items-start">
//                           <span className="text-gray-600 mr-2">•</span>
//                           {name}
//                         </li>
//                       )) : 
//                       <li className="text-gray-500">None specified</li>
//                     }
//                   </ul>
//                 </div>
//               </div>
//             </div>

//             {/* Respondents Card */}
//             <div className="border rounded-lg overflow-hidden">
//               <div className="bg-white p-4 flex items-center gap-2 border-b">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
//                 </svg>
//                 <h3 className="font-semibold">Respondents</h3>
//               </div>
//               <div className="p-4">
//                 <ul className="mb-4">
//                   {caseData.parties.respondents.map((name, index) => (
//                     <li key={`respondent-${index}`} className="mb-1 flex items-start">
//                       <span className="text-gray-600 mr-2">•</span>
//                       {name}
//                     </li>
//                   ))}
//                 </ul>
                
//                 <div className="mt-4">
//                   <div className="font-medium mb-2">Advocates:</div>
//                   <ul>
//                     {caseData.parties.respondentAdvocates && caseData.parties.respondentAdvocates.length > 0 ? 
//                       caseData.parties.respondentAdvocates.map((name, index) => (
//                         <li key={`res-adv-${index}`} className="mb-1 flex items-start">
//                           <span className="text-gray-600 mr-2">•</span>
//                           {name}
//                         </li>
//                       )) : 
//                       <li className="mb-1 flex items-start">
//                         <span className="text-gray-600 mr-2">•</span>
//                         GOVT ADVOCATE
//                       </li>
//                     }
//                   </ul>
//                 </div>
//               </div>
//             </div>

//             {/* Acts & Sections Card */}
//             <div className="border rounded-lg overflow-hidden">
//               <div className="bg-white p-4 flex items-center gap-2 border-b">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
//                 </svg>
//                 <h3 className="font-semibold">Acts & Sections</h3>
//               </div>
//               <div className="p-4">
//                 {caseData.acts.length > 0 ? (
//                   <table className="min-w-full">
//                     <thead>
//                       <tr className="bg-gray-50">
//                         <th className="p-2 text-left font-medium text-gray-600">Act</th>
//                         <th className="p-2 text-left font-medium text-gray-600">Section</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {caseData.acts.map((act, index) => (
//                         <tr key={`act-${index}`} className="border-t">
//                           <td className="p-2">{act.act}</td>
//                           <td className="p-2">{act.section}</td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 ) : (
//                   <p className="text-gray-500">No acts specified</p>
//                 )}
//               </div>
//             </div>

//             {/* Orders Card */}
//             <div className="border rounded-lg overflow-hidden">
//               <div className="bg-white p-4 flex items-center gap-2 border-b">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
//                 </svg>
//                 <h3 className="font-semibold">Orders</h3>
//               </div>
//               <div className="p-4">
//                 <table className="min-w-full">
//                   <thead>
//                     <tr className="bg-gray-50">
//                       <th className="p-2 text-left font-medium text-gray-600">Date</th>
//                       <th className="p-2 text-left font-medium text-gray-600">Type</th>
//                       <th className="p-2 text-left font-medium text-gray-600">Action</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     <tr>
//                       <td colSpan="3" className="p-4 text-center text-gray-500">
//                         No orders available
//                       </td>
//                     </tr>
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className="p-6">
//       <h2 className="text-xl font-semibold mb-4">Search {courtNames[court]} by Advocate Name</h2>
      
//       <div className="bg-white p-6 rounded-md border border-gray-200 shadow-sm max-w-3xl">
//         <form onSubmit={handleSubmit}>
//           <div className="space-y-6">
//             <div>
//               <label htmlFor="name" className="block text-base font-medium mb-2 text-gray-700">
//                 Advocate Name
//               </label>
//               <input
//                 type="text"
//                 id="name"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 className="w-full p-3 border border-gray-200 rounded-md bg-blue-50 focus:outline-none"
//                 placeholder="Enter advocate name"
//                 required
//               />
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div>
//                 <label htmlFor="stage" className="block text-base font-medium mb-2 text-gray-700">
//                   Case Stage
//                 </label>
//                 <select
//                   id="stage"
//                   value={stage}
//                   onChange={(e) => setStage(e.target.value)}
//                   className="w-full p-3 border border-gray-200 rounded-md focus:outline-none appearance-none"
//                 >
//                   <option value="">Select stage</option>
//                   <option value="PENDING">Pending</option>
//                   <option value="DISPOSED">Disposed</option>
//                   <option value="BOTH">Both</option>
//                 </select>
//               </div>

//               <div>
//                 <label htmlFor="benchId" className="block text-base font-medium mb-2 text-gray-700">
//                   Bench ID
//                 </label>
//                 <input
//                   type="text"
//                   id="benchId"
//                   value={benchId}
//                   onChange={(e) => setBenchId(e.target.value)}
//                   className="w-full p-3 border border-gray-200 rounded-md bg-blue-50 focus:outline-none"
//                   placeholder="Enter Bench ID"
//                 />
//               </div>
//             </div>
            
//             <div className="flex flex-col md:flex-row gap-4 justify-between">
//               <button
//                 type="button"
//                 className="order-2 md:order-1 p-3 border border-gray-200 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none flex-1"
//                 onClick={handleClear}
//               >
//                 Clear
//               </button>
//               <button
//                 type="submit"
//                 className="order-1 md:order-2 p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none flex-1 flex items-center justify-center gap-2"
//                 disabled={isLoading}
//               >
//                 {isLoading ? (
//                   <span>Searching...</span>
//                 ) : (
//                   <>
//                     <Search size={20} />
//                     <span>Search</span>
//                   </>
//                 )}
//               </button>
//             </div>
//           </div>
//         </form>
//       </div>

//       {isLoading && (
//         <div className="mt-6 p-4 text-center">
//           <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
//           <p className="mt-2 text-gray-600">Fetching results...</p>
//         </div>
//       )}
      
//       {(hasResponse || results.length > 0) && (
//         <div className="mt-6">
//           <h3 className="text-lg font-medium mb-3">Search Results</h3>
//           {results.length === 0 ? (
//             <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 text-yellow-700">
//               No results found for your search criteria. Try adjusting your search parameters.
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
//                     <th className="border-b border-gray-200 p-3 text-center">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {results.map((result, index) => (
//                     <tr key={index} className="hover:bg-gray-50">
//                       <td className="border-b border-gray-200 p-3">{result.cnr}</td>
//                       <td className="border-b border-gray-200 p-3 font-medium text-blue-600 hover:underline cursor-pointer">{result.caseNumber}</td>
//                       <td className="border-b border-gray-200 p-3">{result.title}</td>
//                       <td className="border-b border-gray-200 p-3">{result.type}</td>
//                       <td className="border-b border-gray-200 p-3">
//                         {new Date(result.decisionDate).toLocaleDateString()}
//                       </td>
//                       <td className="border-b border-gray-200 p-3 text-center">
//                         <button
//                           onClick={() => handleViewDetails(result)}
//                           className="text-sm text-blue-600 hover:text-blue-800 font-medium"
//                         >
//                           View Details
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

//       {/* Case Details Modal */}
//       <CaseDetailsModal 
//         isOpen={showDetailsModal} 
//         onClose={closeModal} 
//         caseData={selectedCase} 
//       />
//     </div>
//   );
// };

// export default AdvocateSearchPage;





// import React, { useState } from 'react';
// // import CaseDetailsModal from './HighCaseDetailsModal';
// import HighCaseDetailsModal from './HighCaseDetailsModal';

// const AdvocateSearchPage = ({ court }) => {
//   const [name, setName] = useState(null); // Advocate name
//   const [stage, setStage] = useState(null); // Case stage
//   const [benchId, setBenchId] = useState(null); // Bench ID
//   const [results, setResults] = useState([]); // API response data
//   const [isLoading, setIsLoading] = useState(false); // Loading state
//   const [selectedCase, setSelectedCase] = useState(null); // Selected case for details
//   const [showCaseDetails, setShowCaseDetails] = useState(false); // Modal visibility
//   const [loadingCnr, setLoadingCnr] = useState(null); // Loading state for specific case
//   const [detailsError, setDetailsError] = useState(null); // Error message

//   const courtNames = {
//     'supreme': 'Supreme Court',
//     'high': 'High Court',
//     'district': 'District Court',
//     'nclt': 'NCLT'
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true); // Start loading
//     try {
//       const response = await fetch('https://infrahive-ai-legal-research-gyfsavdfd0c9ehh5.centralindia-01.azurewebsites.net/legal-infrahive/high-court/search/advocate-name/', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: 'ECIAPI-XXaRks8npWTVUXpFpYc6nGj88cwPMq25', // Replace with your token
//         },
//         body: JSON.stringify({
//           name,
//           stage,
//           benchId,
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
//     setName(null);
//     setStage(null);
//     setBenchId(null);
//     setResults([]);
//   };

//   const handleViewDetails = async (cnr) => {
//     // Set loading only for the specific row being clicked
//     setLoadingCnr(cnr);
//     setDetailsError(null);
//     try {
//       const response = await fetch('https://infrahive-ai-legal-research-gyfsavdfd0c9ehh5.centralindia-01.azurewebsites.net/legal-infrahive/high-court/case/', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: 'ECIAPI-XXaRks8npWTVUXpFpYc6nGj88cwPMq25', // Replace with your token
//         },
//         body: JSON.stringify({
//           cnr
//         }),
//       });
//       const data = await response.json();
//       setSelectedCase(data);
//       setShowCaseDetails(true);
//     } catch (error) {
//       console.error('Error fetching case details:', error);
//       setDetailsError('Failed to load case details. Please try again.');
//     } finally {
//       setLoadingCnr(null);
//     }
//   };

//   const closeDetailsPopup = () => {
//     setShowCaseDetails(false);
//     setSelectedCase(null);
//     setDetailsError(null);
//   };

//   return (
//     <>
//     <div className="bg-white rounded-lg shadow-sm p-6 w-[40vw]">
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
//               value={name || ''}
//               onChange={(e) => setName(e.target.value || null)}
//               className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Enter advocate name"
//             />
//           </div>

//           <div>
//             <label htmlFor="stage" className="block text-sm font-medium text-gray-700 mb-1">
//               Case Stage
//             </label>
//             <select
//               id="stage"
//               value={stage || ''}
//               onChange={(e) => setStage(e.target.value || null)}
//               className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             >
//               <option value="">Select stage</option>
//               <option value="PENDING">Pending</option>
//               <option value="DISPOSED">Disposed</option>
//               <option value="BOTH">Both</option>
//             </select>
//           </div>

//           <div>
//             <label htmlFor="benchId" className="block text-sm font-medium text-gray-700 mb-1">
//               Bench ID
//             </label>
//             <input
//               type="text"
//               id="benchId"
//               value={benchId || ''}
//               onChange={(e) => setBenchId(e.target.value || null)}
//               className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Enter Bench ID"
//             />
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

//       </div>
      
//       {results.length > 0 && (
//   <div className="mt-6">
//     <h2 className="text-xl font-bold text-gray-800">Results:</h2>
//     <div className="overflow-x-auto p-2 bg-white rounded-md mt-4">
//       <div className="shadow-md rounded-md overflow-hidden border border-gray-200">
//         <table className="min-w-full bg-white">
//           <thead>
//             <tr className="bg-gray-50 text-xs uppercase text-gray-700 tracking-wider">
//               <th className="py-3 px-6 border-b border-gray-200 text-left font-medium">CNR</th>
//               <th className="py-3 px-6 border-b border-gray-200 text-left font-medium">Case Number</th>
//               <th className="py-3 px-6 border-b border-gray-200 text-left font-medium">Title</th>
//               <th className="py-3 px-6 border-b border-gray-200 text-left font-medium">Type</th>
//               <th className="py-3 px-6 border-b border-gray-200 text-left font-medium">Decision Date</th>
//               <th className="py-3 px-6 border-b border-gray-200 text-left font-medium">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {results.map((result, index) => (
//               <tr key={index} className="hover:bg-gray-50 transition-colors">
//                 <td className="py-3 px-6 border-b border-gray-200 font-mono text-sm">{result.cnr}</td>
//                 <td className="py-3 px-6 border-b border-gray-200">{result.caseNumber}</td>
//                 <td className="py-3 px-6 border-b border-gray-200 font-medium">{result.title}</td>
//                 <td className="py-3 px-6 border-b border-gray-200">
//                   <span className="inline-block px-2 py-1 text-xs font-medium text-blue-700 bg-blue-50 rounded-full">
//                     {result.type}
//                   </span>
//                 </td>
//                 <td className="py-3 px-6 border-b border-gray-200">
//                   {result.decisionDate && result.decisionDate !== '1970-01-01T00:00:00.000Z' 
//                     ? new Date(result.decisionDate).toLocaleDateString() 
//                     : 'N/A'}
//                 </td>
//                 <td className="py-3 px-6 border-b border-gray-200">
//                   <button
//                     onClick={() => handleViewDetails(result.cnr)}
//                     className="px-4 w-24 py-1 bg-blue-100 text-blue-800 rounded-full hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-sm transition-colors"
//                     disabled={loadingCnr === result.cnr}
//                   >
//                     {loadingCnr === result.cnr ? 'Loading...' : 'Details'}
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   </div>
// )}

//       {/* Case Details Modal */}
//       {showCaseDetails && (
//         <HighCaseDetailsModal 
//           caseDetails={selectedCase} 
//           isLoadingDetails={loadingCnr !== null}
//           detailsError={detailsError}
//           closeDetailsPopup={closeDetailsPopup} 
//         />
//       )}
//     </>
//   );
// };

// export default AdvocateSearchPage;


import React, { useState, useMemo } from 'react';
import HighCaseDetailsModal from './HighCaseDetailsModal';

const AdvocateSearchPage = ({ court }) => {
  const [name, setName] = useState(null); // Advocate name
  const [stage, setStage] = useState(null); // Case stage
  const [benchId, setBenchId] = useState(null); // Bench ID
  const [results, setResults] = useState([]); // API response data
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [selectedCase, setSelectedCase] = useState(null); // Selected case for details
  const [showCaseDetails, setShowCaseDetails] = useState(false); // Modal visibility
  const [loadingCnr, setLoadingCnr] = useState(null); // Loading state for specific case
  const [detailsError, setDetailsError] = useState(null); // Error message
  const [tableSearchQuery, setTableSearchQuery] = useState(''); // Search query for table results

  const courtNames = {
    'supreme': 'Supreme Court',
    'high': 'High Court',
    'district': 'District Court',
    'nclt': 'NCLT'
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Start loading
    try {
      const response = await fetch('https://infrahive-ai-legal-research-gyfsavdfd0c9ehh5.centralindia-01.azurewebsites.net/legal-infrahive/high-court/search/advocate-name/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'ECIAPI-XXaRks8npWTVUXpFpYc6nGj88cwPMq25', // Replace with your token
        },
        body: JSON.stringify({
          name,
          stage,
          benchId,
        }),
      });
      const data = await response.json();
      setResults(data); // Set the results
      setTableSearchQuery(''); // Reset search query
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  const handleClear = () => {
    // Reset all fields and results
    setName(null);
    setStage(null);
    setBenchId(null);
    setResults([]);
    setTableSearchQuery('');
  };

  const handleViewDetails = async (cnr) => {
    // Set loading only for the specific row being clicked
    setLoadingCnr(cnr);
    setDetailsError(null);
    try {
      const response = await fetch('https://infrahive-ai-legal-research-gyfsavdfd0c9ehh5.centralindia-01.azurewebsites.net/legal-infrahive/high-court/case/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'ECIAPI-XXaRks8npWTVUXpFpYc6nGj88cwPMq25', // Replace with your token
        },
        body: JSON.stringify({
          cnr
        }),
      });
      const data = await response.json();
      setSelectedCase(data);
      setShowCaseDetails(true);
    } catch (error) {
      console.error('Error fetching case details:', error);
      setDetailsError('Failed to load case details. Please try again.');
    } finally {
      setLoadingCnr(null);
    }
  };

  const closeDetailsPopup = () => {
    setShowCaseDetails(false);
    setSelectedCase(null);
    setDetailsError(null);
  };

  // Memoized filtered results based on search query
  const filteredResults = useMemo(() => {
    if (!tableSearchQuery) return results;

    const searchQueryLower = tableSearchQuery.toLowerCase();
    return results.filter(result => 
      result.cnr.toLowerCase().includes(searchQueryLower) ||
      result.caseNumber.toLowerCase().includes(searchQueryLower) ||
      result.title.toLowerCase().includes(searchQueryLower) ||
      result.type.toLowerCase().includes(searchQueryLower)
    );
  }, [results, tableSearchQuery]);

  return (
    <>
    <div className="bg-white rounded-lg shadow-sm p-6 w-[40vw]">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Search {courtNames[court]} by Advocate Name</h2>
        <p className="text-gray-600 mt-2">Find cases by entering advocate details.</p>
      </div>

      {/* <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Advocate Name
            </label>
            <input
              type="text"
              id="name"
              value={name || ''}
              onChange={(e) => setName(e.target.value || null)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter advocate name"
            />
          </div>

          <div>
            <label htmlFor="stage" className="block text-sm font-medium text-gray-700 mb-1">
              Case Stage
            </label>
            <select
              id="stage"
              value={stage || ''}
              onChange={(e) => setStage(e.target.value || null)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select stage</option>
              <option value="PENDING">Pending</option>
              <option value="DISPOSED">Disposed</option>
              <option value="BOTH">Both</option>
            </select>
          </div>

          <div>
            <label htmlFor="benchId" className="block text-sm font-medium text-gray-700 mb-1">
              Bench ID
            </label>
            <input
              type="text"
              id="benchId"
              value={benchId || ''}
              onChange={(e) => setBenchId(e.target.value || null)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Bench ID"
            />
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
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Searching...
              </>
            ) : (
              'Search Cases'
            )}
          </button>
          <button
            type="button"
            onClick={handleClear}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            Clear
          </button>
        </div>
      </form> */}
        <form onSubmit={handleSubmit} className="space-y-6">
  <div className="space-y-4">
    <div>
      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
        Advocate Name
      </label>
      <input
        type="text"
        id="name"
        value={name || ''}
        onChange={(e) => setName(e.target.value || null)}
        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Enter advocate name"
      />
      <div className="text-sm text-gray-500 mt-1">Example: Kunal Sharma</div>
    </div>

    <div>
      <label htmlFor="stage" className="block text-sm font-medium text-gray-700 mb-1">
        Case Stage
      </label>
      <select
        id="stage"
        value={stage || ''}
        onChange={(e) => setStage(e.target.value || null)}
        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Select stage</option>
        <option value="PENDING">Pending</option>
        <option value="DISPOSED">Disposed</option>
        <option value="BOTH">Both</option>
      </select>
      <div className="text-sm text-gray-500 mt-1">Example: BOTH</div>
    </div>

    <div>
      <label htmlFor="benchId" className="block text-sm font-medium text-gray-700 mb-1">
        Bench ID
      </label>
      <input
        type="text"
        id="benchId"
        value={benchId || ''}
        onChange={(e) => setBenchId(e.target.value || null)}
        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Enter Bench ID"
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
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Searching...
        </>
      ) : (
        'Search Cases'
      )}
    </button>
    <button
      type="button"
      onClick={handleClear}
      className="px-6 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
    >
      Clear
    </button>
  </div>
</form>
    </div>
      
      {results.length > 0 && (
        <div className="mt-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">Search Results:</h2>
            <div className="relative">
              <input
                type="text"
                placeholder="Search Data..."
                value={tableSearchQuery}
                onChange={(e) => setTableSearchQuery(e.target.value)}
                className="w-64 p-2 pl-8 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 absolute left-2 top-3 text-gray-400" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          <div className="overflow-x-auto p-2 bg-white rounded-md">
            <div className="shadow-md rounded-md overflow-hidden border border-gray-200">
              <table className="min-w-full bg-white">
                <thead>
                  <tr className="bg-gray-50 text-xs uppercase text-gray-700 tracking-wider">
                    <th className="py-3 px-6 border-b border-gray-200 text-left font-medium">CNR</th>
                    <th className="py-3 px-6 border-b border-gray-200 text-left font-medium">Case Number</th>
                    <th className="py-3 px-6 border-b border-gray-200 text-left font-medium">Title</th>
                    <th className="py-3 px-6 border-b border-gray-200 text-left font-medium">Type</th>
                    <th className="py-3 px-6 border-b border-gray-200 text-left font-medium">Decision Date</th>
                    <th className="py-3 px-6 border-b border-gray-200 text-left font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredResults.map((result, index) => (
                    <tr key={index} className="hover:bg-gray-50 transition-colors">
                      <td className="py-3 px-6 border-b border-gray-200 font-mono text-sm">{result.cnr}</td>
                      <td className="py-3 px-6 border-b border-gray-200">{result.caseNumber}</td>
                      <td className="py-3 px-6 border-b border-gray-200 font-medium">{result.title}</td>
                      <td className="py-3 px-6 border-b border-gray-200">
                        <span className="inline-block px-2 py-1 text-xs font-medium text-blue-700  rounded-full">
                          {result.type}
                        </span>
                      </td>
                      <td className="py-3 px-6 border-b border-gray-200">
                        {result.decisionDate && result.decisionDate !== '1970-01-01T00:00:00.000Z' 
                          ? new Date(result.decisionDate).toLocaleDateString() 
                          : 'N/A'}
                      </td>
                      <td className="py-3 px-6 border-b border-gray-200">
                        <button
                          onClick={() => handleViewDetails(result.cnr)}
                          className="px-4 w-24 py-1 bg-blue-100 text-blue-800 rounded-full hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-sm transition-colors"
                          disabled={loadingCnr === result.cnr}
                        >
                          {loadingCnr === result.cnr ? 'Loading...' : 'Details'}
                        </button>
                      </td>
                    </tr>
                  ))}
                  {filteredResults.length === 0 && (
                    <tr>
                      <td colSpan="6" className="text-center py-4 text-gray-500">
                        No results found matching your search.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Case Details Modal */}
      {showCaseDetails && (
        <HighCaseDetailsModal 
          caseDetails={selectedCase} 
          isLoadingDetails={loadingCnr !== null}
          detailsError={detailsError}
          closeDetailsPopup={closeDetailsPopup} 
        />
      )}
    </>
  );
};

export default AdvocateSearchPage;