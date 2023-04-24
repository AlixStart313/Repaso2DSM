import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Avatar, Button } from 'react-native-elements'
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getAuth, updateProfile } from 'firebase/auth'
import * as Imagepicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import Loading from '../../../../kernel/components/Loading';
import Profile from './Profile';
import { set } from 'lodash';
import { ButtonGroup, Icon, Image } from '@rneui/base';

export default function UserLogged({ user, navigation }) {

    console.log(user)

    const [images, setimages] = useState([
        require('../../../../assets/1.jpg'),
        require('../../../../assets/2.jpeg'),
        require('../../../../assets/3.jpeg')

    ]);

    const auth = getAuth();
    const [show, setShow] = useState(false)
    const [text, setText] = useState('Procesando...')

    const uploadImage = async (uri) => {
        setShow(true);
        const response = await fetch(uri);
        // console.log("res", response)

        const { _bodyBlob } = response;
        const storage = getStorage();
        const storageRef = ref(storage, `avatars/${user.uid}`)

        return uploadBytes(storageRef, _bodyBlob);
    }

    const changeAvatar = async () => {
        const resultPermission = await Permissions.askAsync(Permissions.CAMERA)


        if (resultPermission.permissions.camera.status !== "denied") {
            let result = await Imagepicker.launchImageLibraryAsync({
                mediaTypes: Imagepicker.MediaTypeOptions.Images,
                allowsEditing: true,
                quality: 1,
                // base64: true,  

            })

            if (!result.canceled) {
                uploadImage(result.assets[0].uri).then((response) => {

                    console.log("imagen actualizada")
                    uploadPhotoProfile()

                }).catch((err) => console.log("error", err))

            } else { console.err("NO IMAGE"); setShow(false) }
        }

    }

    const uploadPhotoProfile = () => {
        const storage = getStorage();
        console.log(storage);

        getDownloadURL(ref(storage, `avatars/${user.uid}`)).then((url) => {

            updateProfile(auth.currentUser, { photoURL: url }).then(
                () => setShow(false)
            ).catch((error) => {
                setShow(false); console.log("Fallo", error)
            })

        }).catch((e) => console.log("error", err))
    }

    const logOut = () => {
        setShow(true); setText("Cerrando sesión")
        const x = setInterval(function () {
            clearInterval(x)
            auth.signOut()
        }, 900)
    }


    return (
        <View style={styles.container}>
            {user && (
                <View style={styles.infoContainer}>

                    {user.photoURL ? (
                        <Avatar size={60} rounded source={{ uri: user.photoURL }} containerStyle={styles.avatar}>
                            <Avatar.Accessory size={22} onPress={changeAvatar} />
                        </Avatar>
                    ) : (
                        <Avatar size={"large"} rounded title={user.email.charAt(0).toUpperCase()} containerStyle={styles.avatar} >
                            <Avatar.Accessory size={22} onPress={changeAvatar} />
                        </Avatar>
                    )}



                    <View style={{ flexDirection: "row" }} >
                        <View style={{ width: 150, marginRight: 10 }}>
                            <Button title="Seguir" />

                        </View>

                        <Button

                            icon={
                                <Icon
                                    type="material-community"
                                    name="dots-vertical"
                                    size={22}
                                    color="#fff"
                                />
                            }

                        />

                    </View>


                </View>
            )
            }
            <View>
                <Text style={{ marginLeft: 20 }}>{user.displayName ? user.displayName : "Joel Alejandro Herrera  "}</Text>
                {/* <Text >{user.email}</Text> */}
            </View>

            <View style={{ marginHorizontal: 10, marginTop: 10 }}>

                <View  >
                    <View style={{
                        alignItems: "center",
                        flexDirection: "row",
                        paddingVertical: 10
                    }}>
                        <Icon type="material-community"
                            name='menu'
                            size={32}
                            style={{ marginLeft: 50, marginRight:90 }}

                        >
                        </Icon>


                        <Icon type="material-community"
                            name='dots-vertical-circle-outline'
                            size={32}
                            style={{ marginRight: 90 }}

                        >
                        </Icon>

                        <Icon type="material-community"
                            name='email-outline'
                            size={32}

                        >
                        </Icon>


                    </View>
                
                </View>

                <FlatList
                    data={images}
                    key={"2"}
                    numColumns={2}
                    renderItem={({ item }) => (
                        <Image
                            source={item}
                            style={{
                                width: 200,
                                height: 160,
                                borderWidth: 2,
                                borderColor: "gray",
                                resizeMode: "contain",
                            }}
                            keyExtractor={(item) => item.id}
                        />
                    )}
                />
            </View>

            <View style={{ flex: 1, alignItems: 'center' }}>
                <Button title={"Cerrar Sesión"} buttonStyle={styles.btn} onPress={logOut} />

            </View>
            <Loading show={show} text={text} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        minHeight: "100%",
        backfaceVisibility: "#FFF"
    },
    btn: {
        marginTop: 30,
        borderRadius: 0,
        backgroundColor: "#3897f0",
        paddingVertical: 10,
        width: 250
    },
    infoContainer: {
        alignItems: "center",
        flexDirection: "row",
        paddingVertical: 10,

    },
    avatar: {
        marginLeft: 30,
        marginRight: 20,
        backgroundColor: "purple"

    },

    displayName: {
        fontWeight: "bold",
        paddingBottom: 5
    }
})