import { Box, Button, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { auth } from '../Firebase/config';
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";

//The login page we reach if not currently logged in with a link to register if no account
export default function Login() {
    //Initialising our states for email and password
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    //Use navigate to gain access to the app once logged in
    const navigate = useNavigate();

    function signIn() {
        //Sign in function using the firebase api
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                //Setting the user id in our session storage to tell us if a user is logged in or not
                sessionStorage.setItem('UserID', userCredential.user.uid);
                //Navigate to the homepage upon login
                navigate('/home');
                alert('Succesfully logged in!');
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode);
                console.log(errorMessage);
            });
    }
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
            <div style={{ borderColor: 'black', boxShadow: '6px 9px 28px -4px', padding: ' 20px', borderRadius: '5px' }}>
                <TextField label='Email' value={email} onChange={(e) => setEmail(e.target.value)} style={{ display: 'block' }} />
                <TextField label='Password' value={password} type='password' onChange={(e) => setPassword(e.target.value)} style={{ display: 'block' }} />
                <Button onClick={signIn} style={{ display: 'block', width: '100%', paddingTop: '10px' }}>Login</Button>
                <Typography onClick = {() => navigate('register')} style = {{cursor: 'pointer'}}>Not registered? Sign up here</Typography>
            </div>
        </div>
    )
}