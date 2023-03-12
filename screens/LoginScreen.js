
import React, { Fragment, useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Text } from 'react-native';
import auth from '@react-native-firebase/auth';



const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
 
  const handleloginButton = () => {
    
    auth()
        .signInWithEmailAndPassword(email, password)
        .then((value) => {
          console.log("login successful", value)
            navigation.navigate("TodoApp")
        })
        .catch(error => {
            if (error.code === 'auth/email-already-in-use') {
              setError('There is no user record please first create the account.');
                console.log('That email address is already in use!');
            }

            if (error.code === 'auth/invalid-email') {
              setError('There is no user record please first create the account.');
                console.log('That email address is invalid!');
            }
            setError(error.message);
            console.error(error);
        })
}



  return (
    <Fragment>
      <View style={styles.container}>
        <Text style={styles.blogin}>Log in</Text>
        <TextInput
          value={email}
          style={styles.input}
          placeholder="E-mail"
          onChangeText={text => setEmail(text)}
          
        />
         {
                    error  && (
                        <Text style={{ color: 'red', padding:10, margin: 10, paddingBottom: 50, }}> {error}</Text>
                    )
                }

       
        <View style={{ backgroundColor: "blue" }} />
        <TextInput
          value={password}
          style={styles.input}
          placeholder="Password"
          
          onChangeText={text => setPassword(text)}
          secureTextEntry={true}
        />
    
        <TouchableOpacity style={styles.buton} onPress={handleloginButton}
          
          // navigation.navigate("TodoApp")
        
          >
          <Text style={styles.btext}>
            Login in
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{ top: -200, left: 70,   }}>
            
            <TouchableOpacity onPress={() => navigation.navigate("SignupScreen")}>
            <Text style={{ width: 400, height:20, color: "#9EADED", left: 165, top: 20, fontSize: 15, fontWeight: 700, }}>Sign up  </Text>
            
            </TouchableOpacity>
   
            <Text style={{ width: 400, height:20, fontSize: 15, fontWeight: 600, }}> Don't have an account? </Text>
            
            
         </View>
    </Fragment>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#F2F2F2",
  },
  input: {
    width: 300,
    height: 44,
    padding: 12,
    marginBottom: 13,
    backgroundColor: "#FFFFFF",
    borderRadius: 4,
    fontSize: 16,
    margin: 10,
    paddingLeft: 15,
    top: -50
  },
  loock: {
    position: "absolute",
    left: 35,
    top: 280,
    backgroundColor: "#FCFCFC",
  },
  loock2: {
    position: "absolute",
    left: 10,
    top: 370,
    backgroundColor: "#FCFCFC",
  },
  emlpsd: {
    width: 130,
    height: 19,
    fontWeight: 500,
    fontSize: 16,
    lineHeight: 19,
    top: 110,
    left: -85,
    color: "#bebeb6",
  },
  emlpsd2: {
    width: 130,
    height: 19,
    fontWeight: 500,
    fontSize: 16,
    lineHeight: 19,
    top: 45,
    left: -85,
    color: "#bebeb6",
  },
  text: {
    fontSize: 16,
    lineHeight: 19.36,
  },
  textt: {
    position: 'absolute',
    fontFamily: "Philosopher-Bold",
    width: 124,
    height: 20,
    left: 90,
    color: "#002140",
    top: 90,
    // fontWeight: 700,
    fontSize: 20,
  },
  blogin: {
    // width: 90,
    height: 50,
    fontFamily: "Philosopher-Bold",
    top: -100,
    left: -105,
    color: "#0D986A",
    // fontWeight: 700,
    fontSize: 35,
    fontWeight: 700,
    color: "#788EEC"
  },
  para: {
    position: 'absolute',
    width: 246,
    height: 42,
    left: 30,
    top: 190,
    fontWeight: 400,
    fontSize: 14,
    lineHeight: 21,
    color: "#0D986A",
  },
  buton: {
    width: 300,
    height: 48,
    top: 40,
    backgroundColor: "#788EEC",
    borderRadius: 20,
    padding: 20,
    top: -20,
  },
  btext: {
    height: 20,
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: 700,
    lineHeight: 22,
    top: -8,
    paddingLeft: 95,
  },
  toop: {
    position: 'absolute',
    width: 40,
    height: 40,
    left: 24,
    top: 20,
    color: "#004A61",
  },
  toop2: {
    top: 8,
    left: 4,
    color: "#004A61",
  },
  click2: {
    position: 'absolute',
    width: 60,
    height: 40,
    left: 20,
    top: 85,
  }
});

export default LoginScreen;
