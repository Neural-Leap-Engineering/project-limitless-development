import React, { useState, useContext, useEffect } from "react";
import "./App.css";
import { getMonth } from "./util";
import CalendarHeader from "./components/CalendarHeader";
import Sidebar from "./components/Sidebar";
import Month from "./components/Month";
import GlobalContext from "./context/GlobalContext";
import EventModal from "./components/EventModal";

function App() {
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  const { monthIndex, showEventModal } = useContext(GlobalContext);

  // Add dark mode state
  const [isDarkMode, setIsDarkMode] = useState(false);

  // State for sharing calendar
  const [sharedUsers, setSharedUsers] = useState([]);
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareEmail, setShareEmail] = useState("");
  const [sharePermission, setSharePermission] = useState("view");

  // Push Notification State
  const [isPushEnabled, setIsPushEnabled] = useState(false);

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);

  // Apply dark mode class
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Handle sharing calendar
  const handleShare = () => {
    if (shareEmail) {
      setSharedUsers([...sharedUsers, { email: shareEmail, permission: sharePermission }]);
      setShareEmail("");
      setSharePermission("view");
      setShowShareModal(false);
    }
  };

  // Push Notification Functions
  const initializePushNotifications = async () => {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      try {
        const registration = await navigator.serviceWorker.register('/service-worker.js');
        console.log('Service Worker registered');

        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
          const subscription = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: 'YOUR_PUBLIC_VAPID_KEY'
          });
          console.log('Push Notification subscription:', subscription);
          setIsPushEnabled(true);
        }
      } catch (error) {
        console.error('Error setting up push notifications:', error);
      }
    }
  };

  const sendPushNotification = async (title, body) => {
    if (isPushEnabled) {
      try {
        await fetch('/api/send-notification', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ title, body }),
        });
      } catch (error) {
        console.error('Error sending push notification:', error);
      }
    }
  };

  // Example usage: Send a notification for a new event
  const handleNewEvent = (event) => {
    // Your existing new event logic here
    // ...

    // Send a push notification
    sendPushNotification('New Event Added', `Event "${event.title}" has been added to your calendar.`);
  };

  // Example usage: Send a notification for an event reminder
  const handleEventReminder = (event) => {
    sendPushNotification('Event Reminder', `Don't forget: "${event.title}" is starting soon!`);
  };

  return (
    <React.Fragment>
      {showEventModal && <EventModal />}

      <div className={`h-screen flex flex-col ${isDarkMode ? "bg-gray-900 text-white" : "bg-white text-black"}`}>
        <CalendarHeader />
        
        {/* Dark Mode Toggle Button */}
        <button
          onClick={toggleDarkMode}
          className="absolute top-4 right-4 p-2 bg-gray-300 dark:bg-gray-700 rounded-full focus:outline-none"
        >
          {isDarkMode ? "🌙 Dark Mode" : "☀️ Light Mode"}
        </button>
        
        {/* Share Calendar Button */}
        <button
          onClick={() => setShowShareModal(true)}
          className="absolute top-4 right-40 p-2 bg-blue-500 text-white rounded-full focus:outline-none"
        >
          Share Calendar
        </button>

        {/* Push Notification Toggle Button */}
        <button
          onClick={initializePushNotifications}
          className="absolute top-4 right-80 p-2 bg-green-500 text-white rounded-full focus:outline-none"
        >
          {isPushEnabled ? "Disable Notifications" : "Enable Notifications"}
        </button>

        <div className="flex flex-1">
          <Sidebar />
          <Month month={currentMonth} />
        </div>

        {/* Share Modal */}
        {showShareModal && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <h2 className="text-xl mb-4">Share Calendar</h2>
              <label className="block mb-2">Email:</label>
              <input
                type="email"
                value={shareEmail}
                onChange={(e) => setShareEmail(e.target.value)}
                className="p-2 mb-4 border border-gray-300 rounded w-full"
              />
              <label className="block mb-2">Permission:</label>
              <select
                value={sharePermission}
                onChange={(e) => setSharePermission(e.target.value)}
                className="p-2 mb-4 border border-gray-300 rounded w-full"
              >
                <option value="view">View Only</option>
                <option value="edit">Edit</option>
              </select>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setShowShareModal(false)}
                  className="p-2 bg-gray-300 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={handleShare}
                  className="p-2 bg-blue-500 text-white rounded"
                >
                  Share
                </button>
              </div>
            </div>
          </div>
        )}

        {/* List of Shared Users */}
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2">Shared With:</h3>
          {sharedUsers.length > 0 ? (
            <ul>
              {sharedUsers.map((user, index) => (
                <li key={index} className="mb-2">
                  {user.email} - <span className="text-sm italic">{user.permission}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p>No users have access to this calendar.</p>
          )}
        </div>
      </div>
    </React.Fragment>
  );
}

export default App;
