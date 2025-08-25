'use client'
import { ChatType } from '../types/chat'

export default function ChatWindow({ chat }: { chat: ChatType | null }) {
  if (!chat) return <p className="text-xl">Selecciona o crea un chat nuevo</p>

  return (
    <ul className="text-left">
      {chat.messages.map((m, i) => (
        <li key={i} className="mb-5">
          <strong>{m.role}:</strong> {m.content}
        </li>
      ))}
    </ul>
  )
}
