


import React, { useState } from 'react';
import { Search } from 'lucide-react';

const KnowledgeData = () => {
  const [keyword, setKeyword] = useState('');
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('indakanoon');

  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (!keyword.trim() || !query.trim()) {
      setError("Please enter both keyword and query");
      return;
    }
    
    setIsLoading(true);
    setError(null);
    setSearchResults(null);
    
    try {
      const requestBody = {
        keyword: keyword,
        query: query
      };
      
      const response = await fetch("https://infrahive-ai-legal-research-gyfsavdfd0c9ehh5.centralindia-01.azurewebsites.net/legal-infrahive/indiakanoon/", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'ECIAPI-XXaRks8npWTVUXpFpYc6nGj88cwPMq25', // Your token here
        },
        body: JSON.stringify(requestBody),
      });
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      
      const data = await response.json();
      setSearchResults(data);
    } catch (err) {
      setError(err.message);
      console.error('Search error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to format the text content with proper styling and partitions
  const formatContent = (text, sourceType = 'indakanoon') => {
    if (!text) return <p className="text-gray-600">No results found for your query. Please try a different search term.</p>;

    // Parse and format the text
    const parsedContent = [];
    const lines = text.split('\n');
    let caseGroup = [];
    let caseIndex = 0;
    
    const addCaseGroup = () => {
      if (caseGroup.length > 0) {
        parsedContent.push(
          <div key={`case-group-${caseIndex}`} className="mb-6 bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
            <div className="p-4">
              {caseGroup}
            </div>
            {/* Add a clear visual partition after each case */}
            <div className="h-2 bg-blue-50"></div>
          </div>
        );
        caseGroup = [];
        caseIndex++;
      }
    };
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      
      // Skip empty lines
      if (!line.trim()) continue;
      
      // If we find a new numbered case or we're at the first line, start a new case group
      if (/^\d+\./.test(line) || /^\*/.test(line) || i === 0) {
        // Add the previous case group to parsedContent if it exists
        if (caseGroup.length > 0) {
          addCaseGroup();
        }
      }
      
      // Match for link reference lines
      const linkMatch = line.match(/\[Link to reference doc\]\((https?:\/\/[^\s]+)\)/);
      
      if (linkMatch) {
        const url = linkMatch[1];
        // Create a special highlighted link element
        caseGroup.push(
          <div key={`link-${i}`} className="bg-blue-50 border border-blue-200 rounded-lg p-3 my-3 flex justify-between items-center shadow-sm hover:shadow-md transition-shadow duration-200">
            <span className="text-blue-600 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
              </svg>
              Case Reference Available
            </span>
            <a 
              href={url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-150 font-medium text-sm"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              View Case
            </a>
          </div>
        );
        continue;
      }
      
      // Process text with double asterisks to be bold
      let processedLine = line;
      
      // Find all double-asterisk patterns and make them bold
      processedLine = processedLine.replace(/\*\*(.*?)\*\*/g, (match, p1) => {
        return `<strong>${p1}</strong>`;
      });
      
      // Handle bullet points (both asterisk format and numbered format)
      if (processedLine.trim().startsWith('*')) {
        processedLine = '• ' + processedLine.trim().substring(1).trim();
      }
      
      // Apply different styling based on content type
      let className = "py-2";
      
      // Case titles (lines starting with numbers or bullet points that have case names)
      if (/^\d+\./.test(processedLine) || 
          (processedLine.trim().startsWith('•') && processedLine.includes('**'))) {
        className += " text-lg font-semibold text-blue-800 border-b border-gray-200 pb-2 mt-2";
      } else {
        className += " text-gray-800 pl-0";
      }
      
      // Add the formatted line to the current case group
      caseGroup.push(
        <p 
          key={`line-${i}`} 
          className={className} 
          dangerouslySetInnerHTML={{ __html: processedLine }} 
        />
      );
    }
    
    // Add the last case group
    addCaseGroup();
    
    return <div className="space-y-4">{parsedContent}</div>;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-2">
            <span className="text-2xl text-blue-600 font-medium">Infrahive Legal Search</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Legal Research Assistant</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find relevant legal judgments, statutes, and precedents with our advanced legal search capabilities
          </p>
        </div>
        
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <form onSubmit={handleSearch} className="p-6">
            <div className="flex flex-col gap-4">
              {/* Query input field (in top row) */}
              <div className="w-full">
                <label htmlFor="query" className="block text-sm font-medium text-gray-700 mb-1">
                  Legal Query
                </label>
                <input
                  id="query"
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Enter your legal query"
                  className="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                />
              </div>
              
              {/* Second row with keyword input and search button */}
              <div className="flex flex-row gap-4">
                <div className="flex-grow">
                  <label htmlFor="keyword" className="block text-sm font-medium text-gray-700 mb-1">
                    Keyword
                  </label>
                  <input
                    id="keyword"
                    type="text"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    placeholder="Enter keyword (e.g., Supreme Court of India)"
                    className="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                  />
                </div>
                
                <div className="flex items-end">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-150"
                  >
                    {isLoading ? (
                      <div className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Searching...
                      </div>
                    ) : (
                      <>
                        <Search className="mr-2 h-5 w-5" />
                        Search
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
            
            <div className="mt-2 text-sm text-gray-500">
              Example: Keyword "Supreme Court of India", Query "Supreme Court of India what are the major judgements on merger and disputes."
            </div>
          </form>
        </div>
        
        {error && (
          <div className="mb-8 p-4 bg-red-50 rounded-md border border-red-200">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">
                  {error}
                </p>
              </div>
            </div>
          </div>
        )}
        
        {isLoading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Searching for legal information...</p>
          </div>
        )}
        
        {searchResults && (
          <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-900">Search Results</h2>
              </div>
              
              {/* Tabs for switching between IndiaKanoon and Perplexity results */}
              <div className="border-b border-gray-200 mb-6">
                <div className="flex -mb-px">
                  <button
                    onClick={() => setActiveTab('indakanoon')}
                    className={`px-4 py-2 font-medium text-sm ${
                      activeTab === 'indakanoon'
                        ? 'border-b-2 border-blue-600 text-blue-600'
                        : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    IndiaKanoon
                  </button>
                  <button
                    onClick={() => setActiveTab('perplexity')}
                    className={`px-4 py-2 font-medium text-sm ${
                      activeTab === 'perplexity'
                        ? 'border-b-2 border-blue-600 text-blue-600'
                        : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    Web Search
                  </button>
                </div>
              </div>
              
              <div className="prose max-w-none">
                {searchResults && (
                  <>
                    {activeTab === 'indakanoon' && formatContent(searchResults.indakanoon, 'indakanoon')}
                    {activeTab === 'perplexity' && formatContent(searchResults.perplexity, 'perplexity')}
                  </>
                )}
              </div>
              
              <div className="mt-8 border-t border-gray-200 pt-6">
                <p className="text-sm text-gray-500 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Results based on legal precedents and case law from Indian courts and legal databases.
                </p>
              </div>
            </div>
          </div>
        )}
        
        {!isLoading && !searchResults && !error && (
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6">
              <div className="text-center py-8">
                <div className="mx-auto w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <Search className="h-12 w-12 text-blue-600" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Start Your Legal Research</h3>
                <p className="text-gray-600 max-w-md mx-auto">
                  Enter a keyword and query about legal topics to get AI-powered insights from legal databases.
                </p>
              </div>
              
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-md">
                  <h4 className="font-medium text-gray-900 mb-2">Example Keywords</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>"Supreme Court of India"</li>
                    <li>"High Court"</li>
                  </ul>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-md">
                  <h4 className="font-medium text-gray-900 mb-2">Example Queries</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>"Major judgments on merger and disputes"</li>
                    <li>"Recent cases on privacy law"</li>
                    <li>"Landmark decisions on environmental protection"</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default KnowledgeData;