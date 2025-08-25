import {
  http, HttpResponse,
} from "msw";

export const handlers = [
  http.post('/chats', (req: any, res: any, ctx: any)=>{
    return res(ctx?.status(200), ctx?.json(req.body))
  }),

  http.get("/chats", ()=>{
    return HttpResponse.json({
      status: 200,
      data: [
        {
          "id": "conv-001",
          "name": "Python",
          "messages": [
            { "role": "user", "content": "Learn Python online" },
            { "role": "assistant", "content": "routemap de python para que seas un pro en 1 semana" }
          ]
        },
        {
          "id": "conv-002",
          "name": "React",
          "messages": [
            { "role": "user", "content": "¿Cuánto cuesta el tour de Nyhavn?" },
            { "role": "assistant", "content": "El precio es de 200 DKK por persona; niños gratis." }
          ]
        }
      ],
     })
  }),

  http.get(`/api/whoami`, () => {
    return HttpResponse.json({
      status: 200,
      data: {
        name: 'Jane Doe',
        email: 'JaneDoe@example.com',
        telephone: '1234567890',
        work: 'XYZ tech',
        location: 'New York',
        image: 'https://randomuser.me/api/portraits/women/79.jpg',

      },
    });
  }),
]