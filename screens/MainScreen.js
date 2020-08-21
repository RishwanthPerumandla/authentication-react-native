import React, { useEffect,useState } from 'react';
import {View,Text,StyleSheet,Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Avatar, Button } from 'react-native-paper';

export default function MainScreen({route,navigation}){
  const { userName } = route.params;
  const { FullName } = route.params;
  const { MailID } = route.params;
  const { password } = route.params;
  const { phoneNo } = route.params;
  const { Gender } = route.params;
  const { Age } = route.params;
  const { ProfilePicture } = route.params;
  const profile = "";


  return(
    <View style={styles.container}>
        <StatusBar style="auto" />
        <View style = {{justifyContent : "center",alignItems :"center"}}>
          {(ProfilePicture === null)? 
                ProfilePicture || <Image
                        style={styles.profilePic}
                        source={require('../assets/avatar.png')}
                  /> :
                  ProfilePicture && <Image
                        style={styles.profilePic}
                        source={{uri : ProfilePicture}}
                  /> }
        </View>
        <NamesView title = "Username : "  titletag = {userName} />
        <NamesView title = "Fullname : "  titletag = {FullName} />
        <NamesView title = "Password : "  titletag = {password} />
        <NamesView title = "Gender : "  titletag = {Gender} />
        <NamesView title = "E-Mail : "  titletag = {MailID} />
        <NamesView title = "Phone Number : "  titletag = {phoneNo} />
        <NamesView title = "Age : "  titletag = {Age} />
        <Button
            mode="outlined"
            onPress={() => {navigation.navigate("SplashScreen")}}
            color ={"#FFFFFF"}
            style={styles.nextButton}
            >
            LOGOUT
        </Button>
    </View>
      )
  }
    
  const NamesView = ({title,titletag}) => (
<View style={styles.row}>
    <View style={styles.inputWrap1}>
        <Text style={styles.textStyle1}>{title}</Text> 
    </View>
    <View style={styles.inputWrap}>
        <Text style={styles.textStyle}>{titletag}</Text>
    </View>
</View>
  )

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop : 3,
  },
  textStyle : {
    fontSize : 15,
    fontStyle:"normal",
  },
  textStyle1 : {
    fontSize : 15,
    fontStyle:"normal",
    marginHorizontal : 12,
  },
  avatar: {
    marginTop: 8,
    width: 100,
    height : 100,
},
  proButton : {
    backgroundColor : "#000000",
    margin : 8,
  },
  profilePic : {
    height : 200,
    width : 200,
    borderRadius : 100,
    borderColor : "#000000",
  },
  nextButton:{
    backgroundColor : "#000000",
    marginHorizontal : 8,
    marginVertical : 8 ,
  },
  namesViewStyle : {
    flex : 1,
    flexDirection : "row",
    margin : 12,
  },

  row: {
    flexDirection: "row",
    margin : 6,
  },
  inputWrap1: {
    flex: 1,
  },
  inputWrap: {
    flex: 1.4,
  },
});