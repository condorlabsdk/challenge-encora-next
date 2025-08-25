'use client'
import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addChat } from '../services/chatService'
import { ChatType } from '../types/chat'

export default function SearchInput({
  activeChat,
  onUpdateChat,
}: {
  activeChat: ChatType | null
  onUpdateChat: (chat: ChatType) => void
}) {
  const [input, setInput] = useState('')
  const queryClient = useQueryClient()

  const addMutation = useMutation({
    mutationFn: addChat,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['chats'] }),
  })

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter' || !input.trim()) return

    if (activeChat) {
      const updatedChat = {
        ...activeChat,
        messages: [
          ...activeChat.messages,
          { role: 'user', content: input },
          { role: 'encoraChat', content: 'Simulated response.' },
        ],
      }
      onUpdateChat(updatedChat)
    } else {
      addMutation.mutate(input)
    }
    setInput('')
  }

  return (
    <input
      type="text"
      value={input}
      onChange={(e) => setInput(e.target.value)}
      onKeyDown={handleKey}
      className="border p-2 rounded w-full"
      placeholder="Escribe tu mensaje..."
    />
  )
}
