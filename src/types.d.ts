interface Event {
  eventId: number;
  title: string;
  description?: string | null;
  eventDay: number;
  hourStart: string;
  hourEnd: string;
  locationId: number;
  createdAt: string;
  updatedAt?: string;
  eventSpeakers: { speaker: Speaker }[];
}

interface Speaker {
  speakerId: number;
  speakerName: string;
  speakerDescription?: string;
  speakerImage?: string | null;
  contact?: string | null;
  country?: string;
  linkedIn?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface EventListProps {
  events: Event[];
  onRefresh: () => void;
}
