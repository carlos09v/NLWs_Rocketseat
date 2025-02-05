import './App.css';
import Header from './components/Header';
import Section from './components/Section';
import ListItem from './components/ListItem';

// Estruturas de Dados
const gamesListData = [
  {
    url: "https://www.twitch.tv/directory/game/VALORANT",
    imageURL: "https://static-cdn.jtvnw.net/ttv-boxart/516575-188x250.jpg",
    alt: "Imagem Valorant"
  },
  {
    url: 'https://www.twitch.tv/directory/game/Just%20Chatting',
    imageURL: 'https://static-cdn.jtvnw.net/ttv-boxart/509658-188x250.jpg',
    alt: 'Imagem Just Chatting'
  },
  {
    url: 'https://www.twitch.tv/directory/game/Roblox',
    imageURL: 'https://static-cdn.jtvnw.net/ttv-boxart/23020_IGDB-188x250.jpg',
    alt: 'Imagem Roblox'
  }
]

const channelListData = [
  {
    url: 'https://www.twitch.tv/alanzoka',
    imageURL: 'https://static-cdn.jtvnw.net/jtv_user_pictures/15cec952-c1ba-4ff8-a79c-53c2fa5bd269-profile_image-150x150.png',
    alt: 'Imagem Alanzoka'
  },
  {
    url: 'https://www.twitch.tv/casimito',
    imageURL: 'https://static-cdn.jtvnw.net/jtv_user_pictures/32805a78-d927-48bd-8089-bf5efed53ea4-profile_image-150x150.png',
    alt: 'Imagem Casimito'
  },
  {
    url: 'https://www.twitch.tv/yoda',
    imageURL: 'https://static-cdn.jtvnw.net/jtv_user_pictures/a1489408-be7a-42b8-b823-962d1e0f0a6a-profile_image-150x150.png',
    alt: 'Imagem Yoda'
  },
  {
    url: 'https://www.twitch.tv/zerobadass',
    imageURL: 'https://static-cdn.jtvnw.net/jtv_user_pictures/da4d03df-73d9-42f4-8b84-cd986cb93014-profile_image-150x150.png',
    alt: 'Imagem ZeROBADASS'
  },
  {
    url: 'https://www.twitch.tv/c9judite',
    imageURL: 'https://static-cdn.jtvnw.net/jtv_user_pictures/f5e303a3-d09a-460f-8970-df60ce86ca0f-profile_image-150x150.png',
    alt: 'Imagem c9judite'
  }
]

const socialListData = [
  {
    url: 'https://github.com/carlos09v',
    imageURL: '/assets/github.svg',
    alt: 'GitHub Logo'
  },
  {
    url: 'https://www.instagram.com/carlos09v/',
    imageURL: '/assets/instagram.svg',
    alt: 'Instagram Logo'
  },
  {
    url: 'https://twitter.com/carlos09v1',
    imageURL: '/assets/twitter.svg',
    alt: 'Twitter Logo'
  }
]

function App() {
  // Retorna um JSX
  return (
    <div className="App">
      {/* Incluir header aqui */}
      <Header />

      {/* Incluir main aqui */}
      <main>
        {/* Incluir sections aqui */}
        <Section 
          title="Meus Jogos"
          subtitle="Os games que eu mais curto jogar !"
          className="games-list">

            {/* items da lista */}
            {
              gamesListData.map(item => {
                return (
                  <ListItem 
                    url={item.url}
                    imageURL={item.imageURL}
                    alt={item.alt} />
                )
              })
            }

        </Section>

        <Section 
          title="Canais e Streamers"
          subtitle="Lista de Canais e transmissões que não perco !"
          className="channel-list" >

            {/* items da lista */}
            {
              channelListData.map(item => {
                return (
                  <ListItem
                    url={item.url}
                    imageURL={item.imageURL}
                    alt={item.alt} />
                )
              })
            }

        </Section>

        <Section
          title='Minhas redes'
          subtitle='Se conecte comigo agora mesmo !'
          className='social-list' >

            {/* items da lista */}
            {
              socialListData.map(item => {
                return (
                  <ListItem
                    url={item.url}
                    imageURL={item.imageURL}
                    alt={item.alt} />
                )
              })
            }

        </Section>
      </main>


    </div>
  );
}

export default App;
