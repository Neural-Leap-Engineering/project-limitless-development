import dayjs from "dayjs";
import React, { useContext, useState, useEffect } from "react";
import GlobalContext from "../context/GlobalContext";

export default function Day({ day, rowIdx, events }) {
  const [dayEvents, setDayEvents] = useState([]);
  const { setDaySelected, setShowEventModal, setSelectedEvent } = useContext(GlobalContext);

  useEffect(() => {
    const filteredEvents = events.filter(
      (evt) => dayjs(evt.start.dateTime || evt.start.date).format("DD-MM-YY") === day.format("DD-MM-YY")
    );
    setDayEvents(filteredEvents);
  }, [events, day]);

  function getCurrentDayClass() {
    return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")
      ? "bg-blue-600 text-white rounded-full w-7"
      : "";
  }

  return (
    <div className="border border-gray-200 flex flex-col">
      <header className="flex flex-col items-center">
        {rowIdx === 0 && <p className="text-sm mt-1">{day.format("ddd").toUpperCase()}</p>}
        <p className={`text-sm p-1 my-1 text-center ${getCurrentDayClass()}`}>
          {day.format("DD")}
        </p>
      </header>
      <div
        className="flex-1 cursor-pointer"
        onClick={() => {
          setDaySelected(day);
          setShowEventModal(true);
        }}
      >
        {dayEvents.map((evt, idx) => (
          <div
            key={idx}
            onClick={() => setSelectedEvent(evt)}
            className="bg-blue-200 p-1 mr-3 text-gray-600 text-sm rounded mb-1 truncate"
          >
            {evt.summary}
          </div>
        ))}
      </div>
    </div>
  );
}
