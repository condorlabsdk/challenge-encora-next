export type MessageType = {
  role: "user" | "encoraChat";
  content: string;
};

export type ChatType = {
  id: string;
  name: string;
  messages: MessageType[];
};