import './styles/main.css'
import { useEffect, useState } from 'react'
import { api } from './lib/axios'
import * as Dialog from '@radix-ui/react-dialog'

import logoImg from './assets/logo.svg'
import GameBanner from './components/GameBanner'
import CreateAdBanner from './components/CreateAdBanner'
import CreateAdModal from './components/CreateAdModal'

interface GameProps {
  id: string
  title: string
  bannerUrl: string
  _count: {
    ads: number
  }
}

function App() {
  const [games, setGames] = useState<GameProps[]>([])

  useEffect(() => {
    api.get('/games')
      .then(res => setGames(res.data))
  }, [])

  return (
    <div className='max-w-[1344px] mx-auto flex flex-col items-center my-20'>
      <img src={logoImg} alt="Logo" />

      <h1 className='text-6xl text-white font-black mt-20'>Seu <span className='text-transparent bg-clip-text bg-nlw-gradient'>duo</span> está aqui.</h1>

      <div className='grid grid-cols-6 gap-6 mt-16'>
        {games.map(game => (
          <GameBanner key={game.id} bannerUrl={game.bannerUrl} title={game.title} adsCounter={game._count.ads} />
        ))}

      </div>

      <Dialog.Root>
        <CreateAdBanner />

        <CreateAdModal data={games.map(game => {
          return {
            id: game.id,
            title: game.title
          }
        })} />
      </Dialog.Root>
    </div>
  )
}

export default App
