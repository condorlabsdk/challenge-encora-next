export type MessageType = {
  role: "user" | "encoraChat";
  content: string;
};

export type ChatType = {
  id: string;
  name: string;
  messages: MessageType[];
};

export type UserType = {
  name: string;
  work: string;
  email: string;
  telephone: string;
  location: string;
  image: string;
};