// Atalho: rnbc
import { useEffect, useState } from 'react';
import { Image, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'

import logoImg from '../../assets/logo-nlw-esports.png'
import { Background } from '../../components/Background';
import { GameCard, GameCardProps } from '../../components/GameCard';
import { Heading } from '../../components/Heading';
import { api } from '../../lib/axios';

import { styles } from './styles';

export function Home() {
  const [games, setGames] = useState<GameCardProps[]>([])
  const navigation = useNavigation()

  useEffect(() => {
    api.get('/games')
      .then(res => setGames(res.data))
  }, [])


  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <Image source={logoImg} style={styles.logo} />

        <Heading title='Encontre seu duo!' subtitle='Selecione o game que deseja jogar...' />
        <FlatList data={games} keyExtractor={item => item.id} renderItem={({ item }) => (
          <GameCard data={item} onPress={() => navigation.navigate('game', { id: item.id, title: item.title, bannerUrl: item.bannerUrl })} />
        )} horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.contentList} />
      </SafeAreaView>
    </Background>
  );
}