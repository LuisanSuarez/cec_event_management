import React, { useEffect, useState } from "react";
import { addSpeaker, getSpeakers, updateSpeaker } from "../api";

const SpeakersList: React.FC = () => {
  const [speakers, setSpeakers] = useState<Speaker[]>([]);
  const [newSpeaker, setNewSpeaker] = useState<Partial<Speaker>>({});
  const [editingSpeaker, setEditingSpeaker] = useState<Speaker | null>(null);

  useEffect(() => {
    fetchSpeakers();
  }, []);

  const fetchSpeakers = async () => {
    try {
      const data = await getSpeakers();
      setSpeakers(data);
    } catch (error) {
      console.error("Error fetching speakers:", error);
    }
  };

  const handleAddSpeaker = async () => {
    try {
      await addSpeaker(newSpeaker as Speaker);
      setNewSpeaker({});
      fetchSpeakers();
    } catch (error) {
      console.error("Error adding speaker:", error);
    }
  };

  const handleUpdateSpeaker = async () => {
    if (editingSpeaker) {
      try {
        await updateSpeaker(editingSpeaker);
        setEditingSpeaker(null);
        fetchSpeakers();
      } catch (error) {
        console.error("Error updating speaker:", error);
      }
    }
  };

  const speakerFields = [
    { name: "speakerName", label: "Name", type: "text" },
    { name: "speakerDescription", label: "Description", type: "text" },
    { name: "speakerImage", label: "Image URL", type: "text" },
    { name: "contact", label: "Contact", type: "text" },
    { name: "country", label: "Country", type: "text" },
    { name: "linkedIn", label: "LinkedIn", type: "text" },
  ];

  const renderSpeakerFields = (
    speaker: Partial<Speaker>,
    onChange: (field: string, value: string) => void
  ) => (
    <>
      {speakerFields.map((field) => (
        <div key={field.name}>
          <label htmlFor={field.name}>{field.label}:</label>
          <input
            type={field.type}
            id={field.name}
            value={speaker[field.name as keyof Speaker] || ""}
            onChange={(e) => onChange(field.name, e.target.value)}
          />
        </div>
      ))}
    </>
  );

  const handleNewSpeakerChange = (field: string, value: string) => {
    setNewSpeaker((prev) => ({ ...prev, [field]: value }));
  };

  const handleEditingSpeakerChange = (field: string, value: string) => {
    setEditingSpeaker((prev) => (prev ? { ...prev, [field]: value } : null));
  };

  return (
    <div>
      <h2>Speakers List</h2>
      <div>
        <h3>Add New Speaker</h3>
        {renderSpeakerFields(newSpeaker, handleNewSpeakerChange)}
        <button onClick={handleAddSpeaker}>Add Speaker</button>
      </div>
      <ul>
        {speakers.map((speaker) => (
          <li key={speaker.speakerId}>
            {editingSpeaker?.speakerId === speaker.speakerId ? (
              <div>
                {renderSpeakerFields(
                  editingSpeaker,
                  handleEditingSpeakerChange
                )}
                <button onClick={handleUpdateSpeaker}>Save</button>
                <button onClick={() => setEditingSpeaker(null)}>Cancel</button>
              </div>
            ) : (
              <div>
                <span>{speaker.speakerName}</span>
                <button onClick={() => setEditingSpeaker(speaker)}>Edit</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SpeakersList;
