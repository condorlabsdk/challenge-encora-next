import { ChatType } from '../types/chat'

export async function getChats(): Promise<ChatType[]> {
  const res = await fetch('/chats')
  if (!res.ok) throw new Error('Error al obtener los chats')
  const json = await res.json()
  return json.data
}

export async function addChat(name: string): Promise<ChatType> {
  // Por ahora simulado; en producción sería un POST
  return {
    id: Date.now().toString(),
    name,
    messages: [],
  }
}

export async function deleteChat(id: string): Promise<void> {
  // Simulación; en producción sería DELETE a /api/chats/[id]
  console.log(`Deleting chat with id ${id}`)
}