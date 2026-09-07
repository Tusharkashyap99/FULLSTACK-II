import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

const CalendarComponent = React.memo(function CalendarComponent({
  events,
  onEventClick,
}) {
  console.log("Calendar Component Rendered");

  return (
    <div className="calendar-container">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        initialDate="2026-09-01"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth",
        }}
        events={events}
        eventClick={onEventClick}
        height="auto"
      />
    </div>
  );
});

export default CalendarComponent;