import { Button, TextField } from "@mui/material";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../Firebase/config";

export default function UserProfile() {
    const [userDetails, setUserDetails] = useState();
    const [currentUser, setCurrentUser] = useState();
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [isData, setIsData] = useState();

    //This use effect runs when we land on the page and gets our userID from sessio storage and then uses that to get the user details we want to edit
    useEffect(() => {
        let currentUser = sessionStorage.getItem('UserID');
        if (currentUser) {
            setCurrentUser(currentUser);
            getDoc(doc(db, 'users', currentUser)).then((docSnapshot) => {
                let userDetails = docSnapshot.data();
                setFirstName(userDetails.firstName);
                setLastName(userDetails.lastName);
            }).then(() => setIsData(true))
        }
    }, [])

    //This function allows us to update the users details if there is a firstname and lastname with a length > 0
    function updateUserDetails() {
        if(firstName.length > 0 && lastName.length > 0) {
            //updateDoc function uses the firebase api to update the users details in firestore database
            updateDoc(doc(db, 'users', currentUser), {
                firstName: firstName,
                lastName: lastName
            }).then(() => alert('Successfully updated user!'))
        } else {
            alert('Please make sure First and Last Name are filled in');
        }
    }

    //This only renders if there is data retrieved from firebase
    return (<div>
        {isData && (<div>
            <TextField label="First name" value={firstName} onChange={(e) => {
                setFirstName(e.target.value);
            }} />
            <TextField label="Last name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
            <Button onClick = {updateUserDetails}>Update details</Button>
        </div>)}
    </div>)
}