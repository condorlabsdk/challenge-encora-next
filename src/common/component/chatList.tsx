'use client'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getChats, deleteChat } from '../services/chatService'
import { ChatType } from '../types/chat'

export default function ChatList({ onSelect }: { onSelect: (chat: ChatType) => void }) {
  const queryClient = useQueryClient()
  const { data: chats, isLoading } = useQuery({ queryKey: ['chats'], queryFn: getChats })

  const deleteMutation = useMutation({
    mutationFn: deleteChat,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['chats'] }),
  })

  if (isLoading) return <p>Cargando...</p>

  return (
    <ul>
      {chats?.map((chat) => (
        <li key={chat.id} className="flex justify-between">
          <span onClick={() => onSelect(chat)} className="cursor-pointer">
            {chat.name}
          </span>
          <button onClick={() => deleteMutation.mutate(chat.id)}>x</button>
        </li>
      ))}
    </ul>
  )
}
