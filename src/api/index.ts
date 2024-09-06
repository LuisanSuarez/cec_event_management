const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

export const getEvents = async () => {
  const response = await fetch(`${API_BASE_URL}/events/with_speakers`);
  if (!response.ok) {
    throw new Error("Failed to fetch events");
  }
  return response.json();
};

export const getSpeakers = async () => {
  const response = await fetch(`${API_BASE_URL}/speakers`);
  if (!response.ok) {
    throw new Error("Failed to fetch speakers");
  }
  return response.json();
};

export const addSpeakerToEvent = async (eventId: number, speakerId: number) => {
  const response = await fetch(`${API_BASE_URL}/event-speakers`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ eventId, speakerId }),
  });
  if (!response.ok) {
    throw new Error("Failed to add speaker to event");
  }
  return response.json();
};

// ... existing code ...

export const addSpeaker = async (speaker: Speaker): Promise<Speaker> => {
  const response = await fetch(`${API_BASE_URL}/speakers`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(speaker),
  });
  if (!response.ok) {
    throw new Error("Failed to add speaker");
  }
  return response.json();
};

export const updateSpeaker = async (speaker: Speaker): Promise<Speaker> => {
  const response = await fetch(
    `${API_BASE_URL}/speakers/${speaker.speakerId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(speaker),
    }
  );
  if (!response.ok) {
    throw new Error("Failed to update speaker");
  }
  return response.json();
};

// ... existing code ...

export const deleteSpeakerFromEvent = async (
  eventId: number,
  speakerId: number
) => {
  const response = await fetch(`${API_BASE_URL}/event-speakers`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ eventId, speakerId }),
  });
  if (!response.ok) {
    throw new Error("Failed to delete speaker from event");
  }
  return true;
};
