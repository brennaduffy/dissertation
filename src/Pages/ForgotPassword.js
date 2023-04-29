import { Button, TextField, Typography } from "@mui/material";
import { sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";
import { auth } from "../Firebase/config";
import { useNavigate } from "react-router-dom";

export default function Register() {
    //setting states for each variable used in this page
    const [email, setEmail] = useState('');

    //initialising useNavigate 
    const navigate = useNavigate();

    function resetPassword() {
        //This function uses the firebase api to reset a users password based on the email they provide
        sendPasswordResetEmail(auth, email)
            .then(() => {
                alert('If you have provided a correct E-Mail address you will be sent a password reset link. This may go in to your junk mail so please check there if you cannot find it.')
                navigate('/home')
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert('Error resetting password');
                console.log(errorCode)
                console.log(errorMessage);
            });
    }

    return (<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <div style={{ borderColor: 'black', boxShadow: '6px 9px 28px -4px', padding: ' 20px', borderRadius: '5px' }}>
            <TextField label='Email' value={email} onChange={(e) => setEmail(e.target.value)} style={{ display: 'block' }} />
            <Button onClick={resetPassword} style={{ width: '100%' }}>Reset password</Button>
            <Typography onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>Back</Typography>
        </div>
    </div>)
}