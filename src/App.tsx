import React, { useEffect, useState } from "react";
import { getEvents } from "./api";
import EventList from "./components/EventList";
import SpeakersList from "./components/SpeakersList";

const App: React.FC = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<"events" | "speakers">("events");

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const data = await getEvents();
      setEvents(data);
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div>
      <h1>Event Management</h1>
      <div>
        <button onClick={() => setActiveTab("events")}>Events</button>
        <button onClick={() => setActiveTab("speakers")}>Speakers</button>
      </div>
      {activeTab === "events" ? (
        loading ? (
          <p>Loading events...</p>
        ) : (
          <EventList events={events} onRefresh={fetchEvents} />
        )
      ) : (
        <SpeakersList />
      )}
    </div>
  );
};

export default App;
