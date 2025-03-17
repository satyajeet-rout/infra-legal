

import React, { useState, useEffect } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { Home } from 'lucide-react';

// Custom NewsHub Sidebar component
const NewsHubSidebar = ({ menuOptions, activeSection, onSectionChange, onHomeClick }) => {
  return (
    <div className="w-60 h-full bg-amber-50 shadow-md">
      <div className="p-4 border-b flex items-center justify-between">
        <img
          src="https://www.infrahive.ai/_next/image?url=%2Fimages%2Flogo%2Flogo.png&w=640&q=75"
          className="w-32"
          alt="Logo"
        />
      </div>
      
      {/* Home button at top of sidebar */}
      <button
        onClick={onHomeClick}
        className="flex items-center w-full py-3 px-6 border-b hover:bg-amber-100"
      >
        <Home size={18} className="mr-2" />
        <span className="text-lg font-medium">Home</span>
      </button>
      
      <div className="py-4">
        {menuOptions.map((option) => (
          <button
            key={option.id}
            className={`w-full text-left py-3 px-6 text-lg font-medium transition-colors ${
              activeSection === option.id
                ? 'bg-amber-100 border-l-4 border-blue-900'
                : 'hover:bg-amber-100'
            }`}
            onClick={() => onSectionChange(option.id)}
          >
            {option.name}
          </button>
        ))}
      </div>
    </div>
  );
};

// FilterBar component
const FilterBar = ({ dateOptions, selectedDate, onDateChange, searchQuery, onSearchChange }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  // Selected date label
  const selectedDateLabel = dateOptions.find(option => option.value === selectedDate)?.label || 'Last 15 days';

  return (
    <div className="flex justify-between items-center mb-4">
      <div className="relative">
        <button
          className="flex items-center justify-between min-w-40 px-4 py-2 bg-white rounded shadow-sm"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <span>{selectedDateLabel}</span>
          <span className="ml-2 text-xs">▼</span>
        </button>
        
        {isDropdownOpen && (
          <div className="absolute mt-1 w-40 bg-white rounded shadow-md z-10">
            {dateOptions.map((option) => (
              <div
                key={option.value}
                className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                  selectedDate === option.value ? 'bg-gray-100 font-medium' : ''
                }`}
                onClick={() => {
                  onDateChange(option.value);
                  setIsDropdownOpen(false);
                }}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="relative flex-1 ml-4">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <span className="text-gray-500">🔍</span>
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-3 py-2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Search notifications..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
    </div>
  );
};

// NotificationItem component
const NotificationItem = ({ notification, category }) => {
  const { title, date, notification_link, pdf_link } = notification;
  
  const getCategoryColor = (cat) => {
    const colors = {
      'RBI': 'bg-blue-900',
      'FEMA': 'bg-blue-800',
      'NPCI': 'bg-blue-700',
      'SEBI': 'bg-blue-600'
    };
    
    return colors[cat] || 'bg-gray-500';
  };
  
  return (
    <div className="p-4 bg-gray-50 rounded-lg border-l-4 border-blue-600 mb-4">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      
      <div className="flex flex-wrap gap-3 mb-3">
        {notification_link && (
          <a 
            href={notification_link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 underline"
          >
            View Notification
          </a>
        )}
        {pdf_link && (
          <a 
            href={pdf_link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 underline"
          >
            View PDF
          </a>
        )}
      </div>
      
      <div className="flex justify-between items-center">
        <span className="text-gray-500 text-sm">{date}</span>
        <span className={`${getCategoryColor(category)} text-white text-xs px-2 py-1 rounded`}>
          {category}
        </span>
      </div>
    </div>
  );
};

// Shimmer Loading component
const ShimmerLoading = () => {
  return (
    <div className="animate-pulse">
      {[1, 2, 3].map((item) => (
        <div key={item} className="p-4 bg-gray-50 rounded-lg border-l-4 border-gray-200 mb-4">
          <div className="h-5 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
          <div className="flex justify-between">
            <div className="h-3 bg-gray-200 rounded w-20"></div>
            <div className="h-5 bg-gray-200 rounded w-16"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

// NotificationList component
const NotificationList = ({ notifications, title, isLoading, category }) => {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h2 className="text-xl font-semibold mb-4 pb-2 border-b">{title} Notifications</h2>
      
      {isLoading ? (
        <div>
          <div className="flex justify-center items-center mb-6">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-700 mr-3"></div>
            <span className="text-lg font-medium text-blue-700">Fetching Notifications...</span>
          </div>
          <ShimmerLoading />
        </div>
      ) : notifications.length === 0 ? (
        <p className="text-gray-500">No notifications available.</p>
      ) : (
        <div>
          {notifications.map((notification, index) => (
            <NotificationItem 
              key={index} 
              notification={notification} 
              category={category}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// Main News component
const News = () => {
  const { isNewsHubActive } = useOutletContext() || { isNewsHubActive: false };
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('RBI');
  const [dateFilter, setDateFilter] = useState('15');
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Sidebar menu options - updated as per requirement
  const menuOptions = [
    { id: 'RBI', name: 'RBI' },
    { id: 'FEMA', name: 'FEMA' },
    { id: 'NPCI', name: 'NPCI' },
    { id: 'SEBI', name: 'SEBI' }
  ];

  // Date filter options
  const dateOptions = [
    { value: '7', label: 'Last 7 days' },
    { value: '15', label: 'Last 15 days' },
    { value: '30', label: 'Last 30 days' },
    { value: '90', label: 'Last 90 days' },
    { value: 'all', label: 'All time' }
  ];

  // Fetch notifications based on selected section
  const fetchNotifications = async (notificationType) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://infrahive-ai-legal-research-gyfsavdfd0c9ehh5.centralindia-01.azurewebsites.net/legal-infrahive/notification/",
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            notification_type: notificationType
          }),
        }
      );
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      
      const data = await response.json();
      setNotifications(data);
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
      setNotifications([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle section change
  const handleSectionChange = (sectionId) => {
    setActiveSection(sectionId);
    fetchNotifications(sectionId);
  };

  // Handle date filter change
  const handleDateFilterChange = (value) => {
    setDateFilter(value);
    
    // Apply client-side date filtering
    const filterNotifications = () => {
      if (value === 'all') return;
      
      const today = new Date();
      const cutoffDate = new Date();
      cutoffDate.setDate(today.getDate() - parseInt(value, 10));
      
      // This filtering assumes date is in format "MMM DD, YYYY"
      setNotifications(prev => 
        prev.filter(notification => {
          const notificationDate = new Date(notification.date);
          return notificationDate >= cutoffDate;
        })
      );
    };
    
    // Only filter if we have notifications already
    if (notifications.length > 0 && !isLoading) {
      filterNotifications();
    } else {
      // Otherwise fetch new data
      fetchNotifications(activeSection);
    }
  };

  // Handle search input change
  const handleSearchChange = (value) => {
    setSearchQuery(value);
  };

  // Handle Home button click
  const handleHomeClick = () => {
    navigate('/dashboard'); // Redirects to dashboard
  };

  // Initial fetch when component mounts
  useEffect(() => {
    fetchNotifications(activeSection);
  }, []);

  // Filter notifications based on search query (client-side filtering)
  const filteredNotifications = searchQuery
    ? notifications.filter(
        notification =>
          notification.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : notifications;

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Only render the NewsHub sidebar in full-screen mode */}
      {isNewsHubActive && (
        <NewsHubSidebar 
          menuOptions={menuOptions} 
          activeSection={activeSection} 
          onSectionChange={handleSectionChange}
          onHomeClick={handleHomeClick}
        />
      )}
      
      <div className="flex-1 overflow-y-auto p-4">
        <FilterBar 
          dateOptions={dateOptions} 
          selectedDate={dateFilter} 
          onDateChange={handleDateFilterChange}
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
        />
        
        <NotificationList 
          notifications={filteredNotifications} 
          title={menuOptions.find(option => option.id === activeSection)?.name || ''} 
          isLoading={isLoading}
          category={activeSection}
        />
      </div>
    </div>
  );
};

export default News;