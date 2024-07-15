import { Link2, Plus } from "lucide-react"
import { Button } from "../../components/Button"
import { FormEvent, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { api } from "../../lib/axios"

interface Links {
  title: string
  url: string
}

export const ImportantLinks = () => {
  const { tripId } = useParams()
  const [links, setLinks] = useState<Links[]>([])


  async function createLink(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const { data } = await api.post(`/trips/${tripId}/links`, {

    })

  }

  useEffect(() => {
    api.get(`/trips/${tripId}/links`).then(response => setLinks(response.data.links))
  }, [tripId])

  return (
    <div className="space-y-6">
      <h2 className="font-semibold text-xl">Links importantes</h2>

      <div className="space-y-5">
        {links?.map((link, index) => (
          <div key={index} className="flex items-center justify-between gap-4">
            <div className="space-y-1.5">
              <span className="block font-medium text-zinc-100">{link.title}</span>
              <a href="#" className="block text-xs text-zinc-400 truncate hover:text-zinc-200">
                {link.url}
              </a>
            </div>

            <Link2 className="text-zinc-400 size-5 shrink-0" />
          </div>
        ))}

        <div className="flex items-center justify-between gap-4">
          <div className="space-y-1.5">
            <span className="block font-medium text-zinc-100">Reserva do AirBnB</span>
            <a href="#" className="block text-xs text-zinc-400 truncate hover:text-zinc-200">
              https://www.airbnb.com.br/rooms/10470001139028321098312093821903812038910
            </a>
          </div>

          <Link2 className="text-zinc-400 size-5 shrink-0" />
        </div>
      </div>

      <Button variant="secondary" size="full">
        <Plus className="size-5" />
        Cadastrar novo link
      </Button>
    </div>
  )
}