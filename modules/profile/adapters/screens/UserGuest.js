import { StyleSheet, Text, View, ScrollView } from 'react-native'
import { Image, Button } from '@rneui/base'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

export default function UserGuest() {
    const navigation = useNavigation()
    return (
        <View style={styles.container}>
            <ScrollView
                style={styles.mx}
                centerContent={true}>
                <Image
                    source={{uri: "https://gifimage.net/wp-content/uploads/2017/11/gif-interrogacion-4.gif"}}
                    resizeMode='contain'
                    style={styles.img} />
                <Text style={styles.title}>Aún no cuentas con sesión</Text>
                <Text style={styles.description}>
                    Te recomiendo iniciar sesión para disfrutar de la red social
                </Text>
                <View style={styles.viewBtnContainer}>
                    <Button
                        title='Comencemos'
                        icon={{
                            name: 'login-variant',
                            type: 'material-community',
                            size: 15,
                            color: 'white'
                        }}
                        buttonStyle={styles.btn}
                        containerStyle={styles.btnContainer}
                        onPress={() => navigation.navigate('profile')}
                    />
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        height: '100%',
        flex:1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    mx: {
        marginLeft: 32,
        marginRight: 32
    },
    img: {
        
        marginTop: 150,
        width: '100%',
        height: 150
    },
    title: {
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center',
        fontFamily: 'monospace',
        margin: 10
    },
    description: {
        textAlign: 'center',
        marginBottom: 10
    },
    viewBtnContainer: {
        marginTop:40, 
        flex: 1,
        alignItems: 'center'
    },
    btn: {
        backgroundColor: '#3897f0',
        color: '#fff'
    },
    btnContainer: {
        width: '70%'
    },
})