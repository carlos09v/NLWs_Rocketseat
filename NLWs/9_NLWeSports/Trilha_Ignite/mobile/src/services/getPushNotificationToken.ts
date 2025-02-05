import * as Notifications from 'expo-notifications'

export const getPushNotificationToken = async () => {
    const { granted } = await Notifications.getPermissionsAsync()

    if(!granted) await Notifications.requestPermissionsAsync() // Permissão pro uso das notificações no celular

    if(granted) {
        const pushToken = await Notifications.getExpoPushTokenAsync()
        console.log('NOTIFICATION TOKEN =>', pushToken.data)

        return pushToken.data
    }
}