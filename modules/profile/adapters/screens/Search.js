import { View, Text, StyleSheet, FlatList } from 'react-native'
import React, { useState } from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Icon } from '@rneui/themed'
import { Image, Input } from '@rneui/base'

export default function search() {

  const [images, setimages] = useState([
    require('../../../../assets/1.jpg'),
    require('../../../../assets/2.jpeg'),
    require('../../../../assets/3.jpeg')

  ]);

  return (
    <KeyboardAwareScrollView>
      <View style={styles.viewForm}>
        <View style={styles.container}>
          <Input
            placeholder='Buscar'
            rightIcon={
              <Icon type='material-community' name='magnify' size={22} />
            }
            containerStyle={styles.input}
            onChange={(e) => changePayLoad(e, 'email')}
            autoCapitalize='none'
          />

<FlatList
        data={images}
        key={"2"}
        numColumns={2}
        renderItem={({ item }) => (
          <Image
            source={item}
            style={{
              width: 170,
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
      </View>

     
    </KeyboardAwareScrollView>
  )
}


const styles = StyleSheet.create({
  viewForm: {
    paddingHorizontal: 20,
    paddingTop: 30
  },
  container: {
    minHeight: "100%",
    backfaceVisibility: "#FFF"
  },
  btn: {
    marginTop: 30,
    borderRadius: 0,
    backgroundColor: "#c33",
    paddingVertical: 10,
    width: 200
  },
  infoContainer: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    paddingVertical: 30
  },
  avatar: {
    marginRight: 16,
    backgroundColor: "purple"

  },

  displayName: {
    fontWeight: "bold",
    paddingBottom: 5
  }
})