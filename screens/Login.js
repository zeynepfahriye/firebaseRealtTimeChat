import { Dimensions, StyleSheet, Text, TextInput, View, TouchableOpacity, } from 'react-native'
import React, { useState } from 'react'
import { firebase } from '@react-native-firebase/database';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const Login = ({ navigation }) => {
   // STATE
   const [email, setEmail] = useState('');
   const [emailValidError, setEmailValidError] = useState('');

   //handleFunction
   const handleValidEmail = (email) => {
      //Validation
      let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
      if (email.length === 0) {
         setEmailValidError('email address must be enter');
      } else if (reg.test(email) === false) {
         setEmailValidError('enter valid email address');
      } else if (reg.test(email) === true) {
         setEmailValidError('');
      }
   };
   const handleSubmit = () => {
      if (email && !emailValidError) {
         try {
            saveUserToDatabase(email)
            navigation.navigate('ChatScreen', { name: email });

         } catch (error) {
            console.log(error)
         }
      }
   };

   const saveUserToDatabase = (email) => {
      //auth modülünü kullanmadan veritabanına kayıt 
      const usersRef = firebase.database().ref('users');
      const newUserRef = usersRef.push();
      // Yeni kullanıcıyı veritabanına kaydetme
      newUserRef.set({
         email: email
      })
         .then(() => {
            console.log("Kullanıcı başarıyla kaydedildi!");
         })
         .catch((error) => {
            console.error("Kullanıcı kaydedilirken bir hata oluştu:", error);
         });
   };
   return (
      <View style={styles.container}>
         <TextInput
            style={styles.textInput}
            placeholder='Email'
            keyboardType='email-address'
            value={email}
            autoCorrect={false}
            autoCapitalize="none"
            onChangeText={value => {
               setEmail(value);
               handleValidEmail(value);
            }}
         />
         {emailValidError ? <Text style={styles.errorText}>{emailValidError}</Text> : null}
         <TouchableOpacity
            style={[styles.button, { backgroundColor: email ? 'orange' : 'grey' }]}
            onPress={handleSubmit} disabled={!email}>
            <Text style={[styles.buttonText, { color: email ? 'black' : 'white', }]}>Login</Text>
         </TouchableOpacity>
      </View>
   )
}

export default Login

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
   },
   textInput: {
      borderColor: 'black', borderWidth: 1,
      height: height / 20,
      width: width * 9 / 10,
      padding: width / 45,
      marginTop: width / 2
   },
   errorText: {
      color: 'red',
      fontSize: 12,
      padding: height / 60
   },
   button: {
      width: width / 2,
      height: height / 18,
      borderRadius: 8,
      marginTop: height / 16,
      alignItems: 'center',
      justifyContent: 'center'
   },
   buttonText: {
      fontSize: 16,
      fontWeight: 'bold'
   }
})