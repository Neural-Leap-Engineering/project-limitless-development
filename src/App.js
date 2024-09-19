import React, { useState, useContext, useEffect } from "react";
import { gapi } from "gapi-script";
import "./App.css";
import { getMonth } from "./util";
import CalendarHeader from "./components/CalendarHeader";
import Sidebar from "./components/Sidebar";
import Month from "./components/Month";
import GlobalContext from "./context/GlobalContext";
import EventModal from "./components/EventModal";

function App() {
  const CLIENT_ID = '6474917747-o25d6rr9rikfcps10p3sip2vsrlp26ia.apps.googleusercontent.com';
  const API_KEY = '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';
  const DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'];
  const SCOPES = 'https://www.googleapis.com/auth/calendar.events.readonly'; 

  const [currentMonth, setCurrentMonth] = useState(getMonth());
  const { monthIndex, showEventModal } = useContext(GlobalContext);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    function start() {
      gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES,
      }).then(() => {
        listUpcomingEvents();
      });
    }
    gapi.load('client:auth2', start);
  }, []);

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);

  const handleAuthClick = () => {
    gapi.auth2.getAuthInstance().signIn().then(() => {
      listUpcomingEvents();
    });
  };

  const handleSignOutClick = () => {
    gapi.auth2.getAuthInstance().signOut();
    setEvents([]);
  };

  const listUpcomingEvents = () => {
    gapi.client.calendar.events.list({
      calendarId: 'primary',
      timeMin: new Date().toISOString(),
      showDeleted: false,
      singleEvents: true,
      maxResults: 10,
      orderBy: 'startTime',
    }).then(response => {
      const events = response.result.items;
      setEvents(events);
    });
  };

  return (
    <React.Fragment>
      {showEventModal && <EventModal />}
      <div className="h-screen flex flex-col">
        <CalendarHeader />

        <button onClick={handleAuthClick} className="p-2 bg-blue-500 text-white rounded">Sign In</button>
        <button onClick={handleSignOutClick} className="p-2 bg-red-500 text-white rounded">Sign Out</button>

        <div className="flex flex-1">
          <Sidebar />
          <Month month={currentMonth} events={events} />
        </div>
      </div>
    </React.Fragment>
  );
}

export default App;
