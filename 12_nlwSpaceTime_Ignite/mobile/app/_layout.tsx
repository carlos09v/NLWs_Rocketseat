import { styled } from 'nativewind';
import { ImageBackground, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { getItemAsync } from 'expo-secure-store';

import blurBg from '../src/assets/bg-blur.png'
import Stripes from '../src/assets/stripes.svg'
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto'
import { BaiJamjuree_700Bold } from '@expo-google-fonts/bai-jamjuree'
import { SplashScreen, Stack } from 'expo-router';

// Estilizar o Componente Svg
const StyledStripes = styled(Stripes)

export default function Layout() {
    const [isUserAuthenticated, setIsUserAuthenticated] = useState<null | boolean>(null)

    useEffect(() => {
        getItemAsync('token').then(token => {
            setIsUserAuthenticated(!!token)
        })
    }, [])

    const [hasLoadedFonts] = useFonts({
        Roboto_400Regular,
        Roboto_700Bold,
        BaiJamjuree_700Bold
    })

    if (!hasLoadedFonts) return <SplashScreen />

    return (
        <ImageBackground
            source={blurBg}
            className='bg-gray-900 flex-1 relative'
            imageStyle={{ position: 'absolute', left: '-100%' }}
        >
            <StyledStripes className='absolute left-2' />
            <StatusBar style="light" translucent />

            <Stack
                screenOptions={{
                    headerShown: false,
                    contentStyle: { backgroundColor: 'transparent' },
                    animation: 'fade'
                }}
            >
                <Stack.Screen name='index' redirect={isUserAuthenticated} />
                <Stack.Screen name='memories' />
                <Stack.Screen name='new' />
            </Stack>
        </ImageBackground>
    );
}