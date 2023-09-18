// Atalho: rnbc
import { SafeAreaView } from 'react-native-safe-area-context';
import { Background } from '../../components/Background';
import { useRoute, useNavigation } from '@react-navigation/native'
import { View, TouchableOpacity, Image, FlatList, Text } from 'react-native';
import { Entypo } from '@expo/vector-icons'
import { Heading } from '../../components/Heading';

import { styles } from './styles';
import { GameParams } from '../../@types/navigation';
import { THEME } from '../../theme';
import logoImg from '../../assets/logo-nlw-esports.png'
import { useEffect, useState } from 'react';
import { api } from '../../lib/axios';
import { DuoCard, DuoCardProps } from '../../components/DuoCard';
import { DuoMatch } from '../../components/DuoMatch';


export function Game() {
    const route = useRoute()
    const navigation = useNavigation()
    const game = route.params as GameParams
    const [duos, setDuos] = useState<DuoCardProps[]>([])
    const [discordDuoSelected, setDiscordDuoSelected] = useState('')


    useEffect(() => {
        api.get(`/games/${game.id}/ads`)
            .then(res => setDuos(res.data))
    }, [])

    const getDiscordUser = async (adsId: string) => {
        const { data } = await api.get(`/ads/${adsId}/discord`)
        setDiscordDuoSelected(data.discord)
    }

    return (
        <Background>
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={navigation.goBack}>
                        <Entypo
                            name='chevron-thin-left'
                            color={THEME.COLORS.CAPTION_300} size={20}
                        />
                    </TouchableOpacity>

                    <Image source={logoImg} style={styles.logo} />

                    <View style={styles.right} />
                </View>

                <Image source={{ uri: game.bannerUrl }} style={styles.cover} resizeMode='cover' />

                <Heading title={game.title} subtitle='Conecte-se e comce a jogar!' />

                <FlatList 
                    data={duos}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <DuoCard data={item} onConnect={() => getDiscordUser(item.id)} />
                    )}
                    horizontal
                    contentContainerStyle={[duos.length > 0 ? styles.contentList : styles.emptyListContent ]}
                    style={styles.containerList}
                    showsHorizontalScrollIndicator={false}
                    ListEmptyComponent={() => (
                        <Text style={styles.emptyListText}>Não há anúncios publicados ainda.</Text>
                    )}
                />

                <DuoMatch
                    visible={discordDuoSelected.length > 0}
                    discord={discordDuoSelected}
                    onClose={() => setDiscordDuoSelected('')}
                />
            </SafeAreaView>
        </Background>
    );
}