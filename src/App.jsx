import React, { useState } from 'react';
import './App.css'; // Ensure you have appropriate styles

// Example Event Data
const initialEvents = [
    { id: 1, title: "Meeting", start: new Date(2024, 10, 20, 10, 0), end: new Date(2024, 10, 20, 11, 0) },
    { id: 2, title: "Lunch", start: new Date(2024, 10, 20, 12, 0), end: new Date(2024, 10, 20, 13, 0) },
    { id: 3, title: "Work", start: new Date(2024, 10, 21, 9, 0), end: new Date(2024, 10, 21, 17, 0) },
];

const hours = Array.from({ length: 24 }, (_, i) => i); // Generates an array [0, 1, ..., 23]

// Main App Component
const App = () => {
    const [currentView, setCurrentView] = useState('week'); // day, week, month
    const [events, setEvents] = useState(initialEvents);
    const [selectedDate, setSelectedDate] = useState(new Date());

    // Function to handle event addition
    const handleAddEvent = (title, start, end) => {
        const newEvent = { id: events.length + 1, title, start, end };
        setEvents([...events, newEvent]);
    };

    // Function to render the week view with time slots
    const renderWeekView = () => {
        const startOfWeek = new Date(selectedDate);
        startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay()); // Set to Sunday
        const days = Array.from({ length: 7 }).map((_, index) => {
            const day = new Date(startOfWeek);
            day.setDate(startOfWeek.getDate() + index);
            return day;
        });

        return (
            <div className="calendar-grid">
                <div className="grid-header">
                    <div className="time-column-header"></div> {/* Empty top-left corner */}
                    {days.map((day, index) => (
                        <div key={index} className="day-header">
                            {day.toLocaleDateString('default', { weekday: 'short', day: 'numeric' })}
                        </div>
                    ))}
                </div>
                <div className="grid-body">
                    {hours.map(hour => (
                        <div key={hour} className="time-column">
                            <div className="time-label">{hour}:00</div>
                            {days.map((day, dayIndex) => (
                                <div key={dayIndex} className="time-slot" onClick={() => handleAddEventClick(day, hour)}>
                                    {events
                                        .filter(event => 
                                            event.start.getHours() === hour &&
                                            event.start.getDate() === day.getDate() &&
                                            event.start.getMonth() === day.getMonth()
                                        )
                                        .map(event => (
                                            <div key={event.id} className="event">
                                                {event.title}
                                            </div>
                                        ))}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    // Navigation functions to change selected date
    const handlePrevWeek = () => {
        const prevWeek = new Date(selectedDate);
        prevWeek.setDate(selectedDate.getDate() - 7);
        setSelectedDate(prevWeek);
    };

    const handleNextWeek = () => {
        const nextWeek = new Date(selectedDate);
        nextWeek.setDate(selectedDate.getDate() + 7);
        setSelectedDate(nextWeek);
    };

    // Simple form to add an event (for demonstration purposes)
    const handleAddEventClick = (day, hour) => {
        const title = prompt("Enter event title:");
        const start = new Date(day.getFullYear(), day.getMonth(), day.getDate(), hour, 0);
        const end = new Date(day.getFullYear(), day.getMonth(), day.getDate(), hour + 1, 0);
        handleAddEvent(title, start, end);
    };

    return (
        <div className="app">
            <header className="calendar-header">
                <button onClick={() => setCurrentView('day')}>Day</button>
                <button onClick={() => setCurrentView('week')}>Week</button>
                <button onClick={() => setCurrentView('month')}>Month</button>
                <button onClick={handlePrevWeek}>Previous Week</button>
                <button onClick={handleNextWeek}>Next Week</button>
            </header>
            <div className="calendar">
                {currentView === 'week' && renderWeekView()}
                {/* Additional views (day, month) would be implemented similarly */}
            </div>
        </div>
    );
};

export default App;
