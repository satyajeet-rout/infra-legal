import React, { useState } from 'react';
import DistrictCaseDetailsModal from './DistrictCaseDetailsModal';

const DistrictFilingNumberSearchPage = ({ court }) => {
  // State for form inputs
  const [filingNumber, setFilingNumber] = useState('');
  const [filingYear, setFilingYear] = useState('');
  const [districtId, setDistrictId] = useState('');
  
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
    
    try {
      const response = await fetch("https://infrahive-ai-legal-research-gyfsavdfd0c9ehh5.centralindia-01.azurewebsites.net/legal-infrahive/district-court/search/filing-number/", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'ECIAPI-XXaRks8npWTVUXpFpYc6nGj88cwPMq25', // Replace with your token
        },
        body: JSON.stringify({
          filingNumber,
          filingYear,
          districtId
        }),
      });
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Ensure data is always treated as an array
      const resultsArray = Array.isArray(data) ? data : [];
      setSearchResults(resultsArray);
      setFilteredResults(resultsArray); // Initialize filtered results with all results
    } catch (err) {
      setError(err.message);
      console.error('Search error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle table search/filtering
  const handleTableSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setTableSearchQuery(query);
    
    if (!query.trim() || !Array.isArray(searchResults)) {
      setFilteredResults(searchResults);
      return;
    }
    
    // Make sure searchResults is an array before filtering
    if (Array.isArray(searchResults)) {
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
    } else {
      setFilteredResults([]);
    }
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
          Authorization: 'ECIAPI-XXaRks8npWTVUXpFpYc6nGj88cwPMq25', // Replace with your token
        },
        body: JSON.stringify({
          cnr
        }),
      });
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      
      const data = await response.json();
      setCaseDetails(data);
      setShowCaseDetails(true);
    } catch (err) {
      setDetailsError(err.message);
      console.error('Details fetch error:', err);
    } finally {
      setDetailsLoading(false);
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
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className="space-y-4">
      {/* Search Form Card */}
      <div className="bg-white rounded-md shadow-sm w-[40vw]">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">
            Search {court.charAt(0).toUpperCase() + court.slice(1)} Court by Filing Number
          </h2>
          <p className="mt-1 text-xs text-gray-600">
            Enter the filing number and other details to find relevant cases
          </p>
        </div>
        
        <div className="p-4">
          <form onSubmit={handleSearch} className="space-y-3">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
    {/* Filing Number Input */}
    <div>
      <label htmlFor="filingNumber" className="block text-xs font-medium text-gray-700 mb-1">
        Filing Number *
      </label>
      <input
        id="filingNumber"
        type="text"
        value={filingNumber}
        onChange={(e) => setFilingNumber(e.target.value)}
        className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        placeholder="Enter filing number"
        required
      />
      <div className="text-xs text-gray-500 mt-1">Example: 944</div>
    </div>
    
    {/* Filing Year Dropdown */}
    <div>
      <label htmlFor="filingYear" className="block text-xs font-medium text-gray-700 mb-1">
        Filing Year
      </label>
      <select
        id="filingYear"
        value={filingYear}
        onChange={(e) => setFilingYear(e.target.value)}
        className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="">Select filing year</option>
        {yearOptions.map((y) => (
          <option key={y} value={y}>
            {y}
          </option>
        ))}
      </select>
      <div className="text-xs text-gray-500 mt-1">Example: 2024</div>
    </div>
    
    {/* District ID Input */}
    <div>
      <label htmlFor="districtId" className="block text-xs font-medium text-gray-700 mb-1">
        District ID
      </label>
      <input
        id="districtId"
        type="text"
        value={districtId}
        onChange={(e) => setDistrictId(e.target.value)}
        className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        placeholder="Enter district ID"
      />
      <div className="text-xs text-gray-500 mt-1">Example: 504f4699</div>
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
            <p className="text-xs text-red-600">{error}</p>
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
              <div className="overflow-x-auto rounded-lg shadow">
                <table className="min-w-full divide-y divide-gray-200 shadow-md shadow-slate-600">
                  <thead className="bg-gray-100">
                    <tr>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Court</th>
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
                    {filteredResults.flatMap((court, courtIndex) => 
                      court.cases.map((caseItem, caseIndex) => (
                        <tr 
                          key={`${courtIndex}-${caseIndex}`} 
                          className={`
                            ${(courtIndex + caseIndex) % 2 === 0 ? 'bg-white' : 'bg-gray-50'} 
                            hover:bg-blue-50 transition-colors duration-150
                          `}
                        >
                          <td className="px-4 py-3 text-sm text-gray-900">{court.name}</td>
                          <td className="px-4 py-3 text-sm text-gray-900">{caseItem.cnr || 'N/A'}</td>
                          <td className="px-4 py-3 text-sm text-gray-900">{caseItem.title || 'N/A'}</td>
                          <td className="px-4 py-3 text-sm text-gray-900">{caseItem.caseNumber || 'N/A'}</td>
                          <td className="px-4 py-3 text-sm text-gray-900">
                            {caseItem.filing ? `${caseItem.filing.number}/${caseItem.filing.year}` : 'N/A'}
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
                              {detailsLoading && selectedCnr === caseItem.cnr ? 'Loading...' : (
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
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}
            
            {/* Show clear filter button when filtered results are different from search results */}
            {tableSearchQuery && Array.isArray(filteredResults) && Array.isArray(searchResults) && 
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
      
      {/* Case Details Modal */}
      {showCaseDetails && (
        <DistrictCaseDetailsModal 
          caseDetails={caseDetails}
          isLoading={detailsLoading}
          error={detailsError}
          onClose={closeDetailsModal}
        />
      )}
    </div>
  );
};

export default DistrictFilingNumberSearchPage;