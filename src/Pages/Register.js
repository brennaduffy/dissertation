import { Button, TextField, Typography } from "@mui/material";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import {auth, db} from "../Firebase/config";
import { doc, setDoc} from 'firebase/firestore';
import { useNavigate } from "react-router-dom";

export default function Register() {
    //setting states for each variable used in this page
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    //initialising useNavigate 
    const navigate = useNavigate();

    function registerUser() {
        //This function creates authentication for us in firebase using the details provided and then logs us in and directs us to the homepage
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                //As this function is asynchronous and returns a promise we need to use.then to add the users details to firebase with the id the authentication has created
                const user = userCredential.user;
                //sets the user id in session storage for use across the app
                sessionStorage.setItem('UserID', user.uid);
                alert('Successfully created user');
                setDoc(doc(db, 'users', user.uid), {
                    firstName: firstName,
                    lastName: lastName
                }).then(() => {
                    navigate('/home');
                })
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert('Error creating user');
                console.log(errorCode)
                console.log(errorMessage);
            });
    }

    return (<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <div style={{ borderColor: 'black', boxShadow: '6px 9px 28px -4px', padding: ' 20px', borderRadius: '5px' }}>
        <TextField label='First Name' value={firstName} onChange={(e) => setFirstName(e.target.value)} style={{ display: 'block' }}/>
        <TextField label='Last Name' value={lastName} onChange={(e) => setLastName(e.target.value)} style={{ display: 'block' }}/>
        <TextField label='Email' value={email} onChange={(e) => setEmail(e.target.value)} style={{ display: 'block' }}/>
        <TextField label='Password' type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ display: 'block' }}/>
        <Button onClick={registerUser} style = {{width: '100%'}}>Register</Button>
        <Typography onClick = {() => navigate('/')} style = {{cursor: 'pointer'}}>Already have an account? Login here</Typography>
        </div>
    </div>)
}