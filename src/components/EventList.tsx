import React, { useEffect, useState } from "react";
import { addSpeakerToEvent, deleteSpeakerFromEvent, getSpeakers } from "../api";

const EventList: React.FC<EventListProps> = ({ events, onRefresh }) => {
  const [speakers, setSpeakers] = useState<Speaker[]>([]);
  const [selectedSpeaker, setSelectedSpeaker] = useState<number | null>(null);
  const [filterType, setFilterType] = useState<"name" | "date">("name");
  const [filterValue, setFilterValue] = useState("");

  useEffect(() => {
    const fetchSpeakers = async () => {
      try {
        const data = await getSpeakers();
        setSpeakers(data);
      } catch (error) {
        console.error("Error fetching speakers:", error);
      }
    };

    fetchSpeakers();
  }, []);

  const handleAddSpeaker = async (eventId: number) => {
    if (selectedSpeaker) {
      try {
        await addSpeakerToEvent(eventId, selectedSpeaker);
        onRefresh();
      } catch (error) {
        console.error("Error adding speaker:", error);
      }
    }
  };

  const handleDeleteSpeaker = async (eventId: number, speakerId: number) => {
    try {
      await deleteSpeakerFromEvent(eventId, speakerId);
      onRefresh();
    } catch (error) {
      console.error("Error deleting speaker:", error);
    }
  };

  const filteredEvents = events.filter((event) => {
    if (!filterValue) return true;
    if (filterType === "name") {
      return event.title?.toLowerCase().includes(filterValue.toLowerCase());
    } else {
      return false;
      // Assuming event has a date property. If not, you'll need to add it to the Event interface
      //   return event.date.includes(filterValue);
    }
  });

  return (
    <div>
      <div style={{ marginBottom: "20px" }}>
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value as "name" | "date")}
        >
          <option value="name">Filter by Name</option>
        </select>
        <input
          type={"text"}
          value={filterValue}
          onChange={(e) => setFilterValue(e.target.value)}
          placeholder={`Enter ${filterType}...`}
        />
      </div>
      {filteredEvents.map((event) => (
        <div
          key={event.eventId}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          <h2>{event.title}</h2>
          <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
            <p>Dia:</p>
            <p>{event.eventDay < 5 ? event.eventDay + 9 : event.eventDay}</p>
          </div>
          <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
            <p>Hora Inicio:</p>
            <p>{event.hourStart}</p>
          </div>
          <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
            <p>Hora Final:</p>
            <p>{event.hourEnd}</p>
          </div>
          <h3>Speakers:</h3>
          <ul>
            {event.eventSpeakers.map(({ speaker }) => (
              <li key={speaker.speakerId}>
                {speaker.speakerName}
                <button
                  onClick={() =>
                    handleDeleteSpeaker(event.eventId, speaker.speakerId)
                  }
                  style={{ marginLeft: "10px" }}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <div>
            <select
              onChange={(e) => setSelectedSpeaker(Number(e.target.value))}
              defaultValue=""
            >
              <option value="" disabled>
                Select a speaker to add
              </option>
              {speakers.map((speaker) => (
                <option key={speaker.speakerId} value={speaker.speakerId}>
                  {speaker.speakerName}
                </option>
              ))}
            </select>
            <button
              onClick={() => handleAddSpeaker(event.eventId)}
              disabled={!selectedSpeaker}
            >
              Add Speaker
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EventList;
