import { StyleSheet, Text, View, ScrollView } from "react-native";
import { Input, Button, Image, Icon } from "@rneui/base";
import React, { useState } from "react";
import { isEmpty } from "lodash";
import Loading from "../../../../kernel/components/Loading";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"

export default function Login(props) {
  const { navigation,texto } = props
  console.log(texto)

  const [error, setError] = useState({ email: '', password: '' });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(true)
  const [show, setShow] = useState(false)
  //const [failSession, setFailSession] = useState(false)
  const auth = getAuth()
  const [text, setText] = useState(texto)



  const login = () => {
    setText("Iniciando sesión")
    if (!(isEmpty(email) || isEmpty(password))) {
      setShow(true)
      setError({ email: '', password: '' })
     
      signInWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
          setShow(false)
          navigation.navigate("profileStack")
        })
        .catch((error) => {
          setError({ email: '', password: 'Usuario o contraseña incorrectos' })
          setShow(false)
          const errorCode = error.code;
          const errorMessage = error.message;
        });
    } else {
      setError({ email: 'Campo obligatorio', password: 'Campo obligatorio' })
      setShow(false)
    }
  };
  return (
    <View style={styles.container}>
      <ScrollView style={styles.container1}>
        <Image
          source={{uri: "https://th.bing.com/th?id=OSK.e6dc210dad5d095f857e79b974c2e86c&w=148&h=148&c=7&o=6&dpr=1.3&pid=SANGAM"}}
          resizeMode="contain"
          style={styles.logotype}
        />
        <Input
          placeholder="Correo electrónico"
          keyboardType="email-address"
          containerStyle={styles.input}
          onChange={(event) => setEmail(event.nativeEvent.text)}
          errorMessage={error.email}
          autoCapitalize='none'
        />
        <Input
          placeholder="Contraseña"
          containerStyle={styles.input}
          onChange={(event) => setPassword(event.nativeEvent.text)}
          secureTextEntry={showPassword}
          rightIcon={
            <Icon type="material-community"
              name={showPassword ? 'eye-off-outline' : 'eye-outline'}
              color="#007bff"
              onPress={() => setShowPassword(!showPassword)}>
            </Icon>}
          errorMessage={error.password}
        />
        <Button
          title="Iniciar sesión"
          icon={
            <Icon
              type="material-community"
              name="login"
              size={22}
              color="#fff"
            />
          }
          buttonStyle={styles.btnSuccess}
          containerStyle={styles.btnContainer}
          onPress={login}
        />
        <Loading show={show} text={text} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    height: "100%",
  }, container1: {
    marginTop: 100,
    margin: 30
  },
  logotype: {
    width: "100%",
    height: 150,
    marginTop: 16,
    marginBottom: 25,
  },
  input: {
    width: '100%',
  },
  btnSuccess: {
    color: '#FFF',
    backgroundColor: '#3897f0'
  },
  btnContainer: {
    margin: 16
  },
  createAccount: {
    color: '#007bff', 
    textAlign: "center"
  },
});
