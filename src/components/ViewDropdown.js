import React, { useState, useRef, useEffect } from 'react';

const ViewDropdown = ({ currentView, onViewChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const views = ['Day', 'Week', 'Month'];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-500 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 dark:bg-blue-600 dark:focus:ring-blue-800"
      >
        {currentView} View ▼
      </button>
      {isOpen && (
        <ul className="absolute z-10 mt-2 w-40 bg-white dark:bg-gray-800 rounded-md shadow-lg">
          {views.map((view) => (
            <li
              key={view}
              className="cursor-pointer px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={() => {
                onViewChange(view);
                setIsOpen(false);
              }}
            >
              {view}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ViewDropdown;
