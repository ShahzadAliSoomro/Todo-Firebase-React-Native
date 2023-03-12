
import React, { Fragment, useEffect, useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { Text } from 'react-native';
import auth from '@react-native-firebase/auth';
import LottieView from 'lottie-react-native';






const SignupScreen = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [useremail, setUseremail] = useState('');
    const [error, setError] = useState('');

    
    const [loader, setLoader] = useState(false)
    const handleSignupButton = () => {
        // userCreate();
        console.log("hi debug")
        setLoader(true)
        console.log(loader)
        setTimeout(() => {

            auth()
                .createUserWithEmailAndPassword(useremail, password)
                .then(() => {
                    navigation.navigate("LoginScreen")
                })
                .catch(error => {
                    if (error.code === 'auth/email-already-in-use') {
                        setError('That email address is already in use!')
                        console.log('That email address is already in use!');
                    }

                    if (error.code === 'auth/invalid-email') {
                        console.log('That email address is invalid!');
                    }

                    console.error(error);
                })
            setLoader(false)
        }, 1000);

    }

    return (
        <Fragment>
            <View style={styles.container}>

                {
                    loader && (<LottieView
                        style={{ width: 200, height: 200 }} loop autoPlay={true}
                        source={require('../screens/96684-loader.json')}
                    />)
                }
                {/* <Text style={styles.textt}>PLANTIFY</Text> */}
                <Text style={styles.blogin}>Sign up</Text>
                {/* <Text style={styles.para}>Masukan NISN dan password untuk
                    memulai belajar sekarang</Text> */}
                <TextInput
                    value={username}
                    style={{
                        width: 300,
                        height: 44,
                        padding: 12,
                        // borderWidth: 1,
                        borderColor: 'black',
                        marginBottom: 10,
                        backgroundColor: "#FFFFFF",
                        borderRadius: 4,
                        fontSize: 16,
                        // margin: 30,
                        paddingLeft: 15,
                        marginTop: 10,
                        top: -2
                    }}

                    placeholder="Full Name"
                    onChangeText={text => setUsername(text)}

                />


                {/* <Text style={styles.emlpsd2}>UserName/Email</Text>
                <Text style={styles.emlpsd}>Password</Text> */}


                <TextInput
                    value={useremail}
                    style={styles.input}
                    placeholder="E-mail"
                    onChangeText={text => setUseremail(text)}

                />
                {
                    error === 'That email address is already in use!' && (
                        <Text style={{ color: 'red' }}> {error}</Text>
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

                <TouchableOpacity style={styles.buton}

                    onPress={handleSignupButton}

                >
                    <Text style={styles.btext}>
                        Create Account
                    </Text>

                </TouchableOpacity>



            </View>
            <View style={{ top: -120, left: 70, }}>

                <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}>
                    <Text style={{ width: 400, height: 20, color: "#9EADED", left: 165, top: 20, fontSize: 15, fontWeight: 800, }}> Log in  </Text>

                </TouchableOpacity>

                <Text style={{ width: 400, height: 20, fontSize: 15, fontWeight: 600, }}> Already got an account?  </Text>


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
        // borderWidth: 1,
        // borderColor: 'black',
        marginBottom: 10,
        backgroundColor: "#FFFFFF",
        borderRadius: 4,
        fontSize: 16,
        margin: 10,
        paddingLeft: 15,
    },
    loock: {
        position: "absolute",
        left: 35,
        top: 283,

        backgroundColor: "#FCFCFC",
    },
    loock2: {
        position: "absolute",
        left: 10,
        top: 400,
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
        width: 129,
        height: 25,
        left: 95,
        color: "#002140",
        top: 80,
        fontSize: 25
    },
    blogin: {
        fontFamily: "Philosopher-Bold",
        // width: 90,
        height: 40,
        top: -40,
        left: -99,
        color: "#0D986A",
        // fontWeight: 700,
        fontSize: 28,
        fontWeight: 700,
        color: "#788EEC"

    },
    para: {
        position: 'absolute',
        width: 246,
        height: 42,
        left: 35,
        top: 180,
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
    },
    btext: {

        height: 20,
        color: "#FFFFFF",
        fontSize: 18,
        fontWeight: 700,
        lineHeight: 22,
        top: -8,
        paddingLeft: 63,
        fontFamily: "Philosopher-Regular",
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
        left: 30,
        top: 80,

    }
});

export default SignupScreen;
