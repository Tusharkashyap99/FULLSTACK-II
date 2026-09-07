import { useState, useEffect, useMemo, useCallback } from "react";
import CalendarComponent from "./CalendarComponent";
import "./App.css";

function App() {
  const platformColors = {
    Instagram: "#E1306C",
    YouTube: "#FF0000",
    LinkedIn: "#0077B5",
    Twitter: "#1DA1F2",
    Facebook: "#1877F2",
  };

  const defaultEvents = [
    {
      id: "1",
      title: "Instagram Post 📸",
      date: "2026-09-10",
      backgroundColor: "#E1306C",
      borderColor: "#E1306C",
    },
    {
      id: "2",
      title: "YouTube Video ▶️",
      date: "2026-09-12",
      backgroundColor: "#FF0000",
      borderColor: "#FF0000",
    },
    {
      id: "3",
      title: "LinkedIn Post 💼",
      date: "2026-09-15",
      backgroundColor: "#0077B5",
      borderColor: "#0077B5",
    },
  ];

  // Load events from LocalStorage
  const [events, setEvents] = useState(() => {
    const savedEvents = localStorage.getItem("socialMediaPosts");

    return savedEvents ? JSON.parse(savedEvents) : defaultEvents;
  });

  // Save events to LocalStorage
  useEffect(() => {
    localStorage.setItem(
      "socialMediaPosts",
      JSON.stringify(events)
    );
  }, [events]);

  // Form states
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [platform, setPlatform] = useState("Instagram");
  const [date, setDate] = useState("");

  // Selected event states
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [editMode, setEditMode] = useState(false);

  // 🧠 useMemo: cache processed calendar events
  const calendarEvents = useMemo(() => {
    console.log("Processing calendar events...");

    return events.map((event) => ({
      ...event,
    }));
  }, [events]);

  // ⚡ useCallback: stable function reference
  const handleEventClick = useCallback(
    (clickInfo) => {
      const event = events.find(
        (item) => item.id === clickInfo.event.id
      );

      setSelectedEvent(event);
      setEditMode(false);
    },
    [events]
  );

  // Add new post
  const handleAddPost = (e) => {
    e.preventDefault();

    if (!title || !date) {
      alert("Please enter a title and select a date!");
      return;
    }

    const newEvent = {
      id: Date.now().toString(),
      title: `${platform}: ${title}`,
      date,
      backgroundColor: platformColors[platform],
      borderColor: platformColors[platform],
    };

    setEvents((previousEvents) => [
      ...previousEvents,
      newEvent,
    ]);

    setTitle("");
    setPlatform("Instagram");
    setDate("");
    setShowForm(false);
  };

  // Delete post
  const handleDelete = () => {
    if (!selectedEvent) return;

    setEvents((previousEvents) =>
      previousEvents.filter(
        (event) => event.id !== selectedEvent.id
      )
    );

    setSelectedEvent(null);
  };

  // Edit post
  const handleEdit = () => {
    const parts = selectedEvent.title.split(":");
    const platformName = parts[0];

    const postTitle =
      parts.length > 1
        ? parts.slice(1).join(":").trim()
        : selectedEvent.title;

    setTitle(postTitle);

    setPlatform(
      platformColors[platformName]
        ? platformName
        : "Instagram"
    );

    setDate(selectedEvent.date);
    setEditMode(true);
  };

  // Save edited post
  const handleSaveEdit = (e) => {
    e.preventDefault();

    if (!title || !date) {
      alert("Please enter all details!");
      return;
    }

    setEvents((previousEvents) =>
      previousEvents.map((event) =>
        event.id === selectedEvent.id
          ? {
              ...event,
              title: `${platform}: ${title}`,
              date,
              backgroundColor: platformColors[platform],
              borderColor: platformColors[platform],
            }
          : event
      )
    );

    setSelectedEvent(null);
    setEditMode(false);

    setTitle("");
    setPlatform("Instagram");
    setDate("");
  };

  return (
    <div className="app">

      {/* Header */}
      <div className="header">
        <div>
          <h1>24bai70731_exp1.4</h1>
          <p>Optimized React Calendar Application</p>
        </div>

        <button
          className="add-button"
          onClick={() => setShowForm(true)}
        >
          ➕ Add New Post
        </button>
      </div>

      {/* Add Post Modal */}
      {showForm && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>➕ Schedule New Post</h2>

            <form onSubmit={handleAddPost}>
              <label>Post Title</label>

              <input
                type="text"
                placeholder="Enter post title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              <label>Platform</label>

              <select
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
              >
                <option>Instagram</option>
                <option>YouTube</option>
                <option>LinkedIn</option>
                <option>Twitter</option>
                <option>Facebook</option>
              </select>

              <label>Date</label>

              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />

              <div className="button-group">
                <button type="submit" className="save-button">
                  💾 Save Post
                </button>

                <button
                  type="button"
                  className="cancel-button"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Post Details */}
      {selectedEvent && !editMode && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>📌 Post Details</h2>

            <p>
              <strong>Post:</strong> {selectedEvent.title}
            </p>

            <p>
              <strong>Date:</strong> {selectedEvent.date}
            </p>

            <div className="button-group">
              <button
                className="save-button"
                onClick={handleEdit}
              >
                ✏️ Edit
              </button>

              <button
                className="delete-button"
                onClick={handleDelete}
              >
                🗑️ Delete
              </button>

              <button
                className="cancel-button"
                onClick={() => setSelectedEvent(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Post Modal */}
      {selectedEvent && editMode && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>✏️ Edit Post</h2>

            <form onSubmit={handleSaveEdit}>
              <label>Post Title</label>

              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              <label>Platform</label>

              <select
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
              >
                <option>Instagram</option>
                <option>YouTube</option>
                <option>LinkedIn</option>
                <option>Twitter</option>
                <option>Facebook</option>
              </select>

              <label>Date</label>

              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />

              <div className="button-group">
                <button type="submit" className="save-button">
                  💾 Save Changes
                </button>

                <button
                  type="button"
                  className="cancel-button"
                  onClick={() => {
                    setSelectedEvent(null);
                    setEditMode(false);
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ⚡ Optimized Calendar */}
      <CalendarComponent
        events={calendarEvents}
        onEventClick={handleEventClick}
      />

    </div>
  );
}

export default App;