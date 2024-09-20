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
      setSharedUsers([
        ...sharedUsers,
        { email: shareEmail, permission: sharePermission },
      ]);
      setShareEmail("");
      setSharePermission("view");
      setShowShareModal(false);
    }
  };

  // Push Notification Functions
  const initializePushNotifications = async () => {
    if ("serviceWorker" in navigator && "PushManager" in window) {
      try {
        const registration = await navigator.serviceWorker.register(
          "/service-worker.js"
        );
        console.log("Service Worker registered");

        const permission = await Notification.requestPermission();
        if (permission === "granted") {
          const subscription = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: "YOUR_PUBLIC_VAPID_KEY",
          });
          console.log("Push Notification subscription:", subscription);
          setIsPushEnabled(true);
        }
      } catch (error) {
        console.error("Error setting up push notifications:", error);
      }
    }
  };

  const sendPushNotification = async (title, body) => {
    if (isPushEnabled) {
      try {
        await fetch("/api/notifications/push", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title, body }),
        });
      } catch (error) {
        console.error("Error sending push notification:", error);
      }
    }
  };

  // Example usage: Send a notification for a new event
  const handleNewEvent = (event) => {
    // Your existing new event logic here
    // ...

    // Send a push notification
    sendPushNotification(
      "New Event Added",
      `Event "${event.title}" has been added to your calendar.`
    );
  };

  // Example usage: Send a notification for an event reminder
  const handleEventReminder = (event) => {
    sendPushNotification(
      "Event Reminder",
      `Don't forget: "${event.title}" is starting soon!`
    );
  };

  // API Endpoints

  // Fetch events from Google Calendar
  const fetchEvents = async () => {
    try {
      const response = await fetch("/api/events");
      const events = await response.json();
      console.log("Fetched events:", events);
      // Handle the events data (e.g., update state)
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  // Export events to CSV/Excel
  const exportEvents = async () => {
    try {
      const response = await fetch("/api/events/export", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ format: "csv" }), // Change to "excel" if needed
      });
      const data = await response.blob();
      // Handle file download
      const url = window.URL.createObjectURL(new Blob([data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "events.csv"); // Change extension for Excel
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error("Error exporting events:", error);
    }
  };

  // Send email notifications
  const sendEmailNotification = async (subject, body) => {
    try {
      await fetch("/api/notifications/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ subject, body }),
      });
    } catch (error) {
      console.error("Error sending email notification:", error);
    }
  };

  // Sync events with external calendars (Outlook, iCal)
  const syncWithExternalCalendars = async () => {
    try {
      const response = await fetch("/api/events/sync", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      console.log("External calendar sync result:", result);
    } catch (error) {
      console.error("Error syncing with external calendars:", error);
    }
  };

  // Register for paid events
  const registerForEvent = async (eventId, paymentDetails) => {
    try {
      const response = await fetch(`/api/events/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ eventId, paymentDetails }),
      });
      const result = await response.json();
      console.log("Event registration result:", result);
    } catch (error) {
      console.error("Error registering for event:", error);
    }
  };

  return (
    <React.Fragment>
      {showEventModal && <EventModal />}

      <div
        className={`h-screen flex flex-col ${
          isDarkMode ? "bg-gray-900 text-white" : "bg-white text-black"
        }`}
      >
        <CalendarHeader />
        <div className="flex lg:flex-row md:gap-1 absolute lg:top-4 top-2 lg:end-2 end-0">
          {/* Share Calendar Button */}
          <button
            onClick={() => setShowShareModal(true)}
            className="inline-flex items-center text-center space-x-2 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-1 focus:ring-blue-700 font-medium rounded-full lg:text-sm text-xs lg:px-5 px-1 lg:py-2.5 py-1 me-2 mb-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 me-2"
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="m21 12l-7-7v4C7 10 4 15 3 20c2.5-3.5 6-5.1 11-5.1V19z"
              ></path>
            </svg>
            <span className="hidden sm:inline">Share Calendar</span>
          </button>

          {/* Push Notification Toggle Button */}
          <button
            onClick={initializePushNotifications}
            className="inline-flex items-center space-x-2 text-white bg-green-500 hover:bg-green-400 focus:outline-none focus:ring-1 font-medium rounded-full focus:ring-green-400 lg:text-sm text-xs lg:px-5 px-1 lg:py-2.5 py-1 me-2 mb-2 text-center"
          >
            {isPushEnabled ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                className="w-4 h-4 me-2"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M20.84 22.73L18.11 20H3v-1l2-2v-6c0-1.14.29-2.27.83-3.28L1.11 3l1.28-1.27l19.72 19.73zM19 15.8V11c0-3.1-2.03-5.83-5-6.71V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v.29c-.61.18-1.2.45-1.74.8zM12 23a2 2 0 0 0 2-2h-4a2 2 0 0 0 2 2"
                ></path>
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                className="w-4 h-4 me-2"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M21 19v1H3v-1l2-2v-6c0-3.1 2.03-5.83 5-6.71V4a2 2 0 0 1 2-2a2 2 0 0 1 2 2v.29c2.97.88 5 3.61 5 6.71v6zm-7 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2"
                ></path>
              </svg>
            )}
            <span className="hidden sm:inline">
              {isPushEnabled ? "Disable Notifications" : "Enable Notifications"}
            </span>
          </button>

          {/* Dark Mode Toggle Button */}
          <button
            onClick={toggleDarkMode}
            className="inline-flex items-center text-black bg-gray-300 hover:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-gray-300 font-medium rounded-full lg:text-sm text-xs lg:px-5 px-1 lg:py-2.5 py-1 me-2 mb-2 text-center"
          >
            {isDarkMode ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                className="w-4 h-4 me-2"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.39 5.39 0 0 1-4.4 2.26a5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1"
                ></path>
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                className="w-4 h-4 me-2"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5s5-2.24 5-5s-2.24-5-5-5M2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1m18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1M11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1m0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1M5.99 4.58a.996.996 0 0 0-1.41 0a.996.996 0 0 0 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41zm12.37 12.37a.996.996 0 0 0-1.41 0a.996.996 0 0 0 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0a.996.996 0 0 0 0-1.41zm1.06-10.96a.996.996 0 0 0 0-1.41a.996.996 0 0 0-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0zM7.05 18.36a.996.996 0 0 0 0-1.41a.996.996 0 0 0-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0z"
                ></path>
              </svg>
            )}
            <span className="hidden sm:inline">
              {isDarkMode ? "Dark Mode" : "Light Mode"}
            </span>
          </button>
        </div>

        <div className="flex flex-1">
          <Sidebar />
          <Month month={currentMonth} />
        </div>

        {/* Share Modal */}
        {showShareModal && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
              <h2 className="text-xl mb-4 text-black">Share Calendar</h2>
              <label className="block mb-2 text-black">Email:</label>
              <input
                type="email"
                value={shareEmail}
                onChange={(e) => setShareEmail(e.target.value)}
                className="p-2 mb-4 border border-gray-300 rounded w-full"
              />
              <label className="block mb-2 text-black">Permission:</label>
              <select
                value={sharePermission}
                onChange={(e) => setSharePermission(e.target.value)}
                className="p-2 mb-4 border border-gray-300 rounded w-full text-black"
              >
                <option value="view">View Only</option>
                <option value="edit">Edit</option>
              </select>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setShowShareModal(false)}
                  className="p-2 bg-gray-300 rounded text-black"
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
                  {user.email} -{" "}
                  <span className="text-sm italic">{user.permission}</span>
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
