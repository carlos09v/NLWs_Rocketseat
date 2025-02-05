import { ReactNode } from 'react';
import { ImageBackground } from 'react-native';
import { styles } from './styles';
import backgroundImg from '../../assets/background-galaxy.png'

export function Background({ children }: { children: ReactNode }) {
  return (
    <ImageBackground style={styles.container} source={backgroundImg} defaultSource={backgroundImg}>
      {children}
    </ImageBackground>
  );
}