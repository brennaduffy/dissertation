import { Button, FormControl, Input, InputLabel, MenuItem, Select } from "@mui/material";
import { doc, getDoc } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db, storage } from "../../Firebase/config";

export default function UploadVideo() {
    const [workout, setWorkout] = useState('');
    const [workoutLevel, setWorkoutLevel] = useState('');
    const [file, setFile] = useState();
    const navigate = useNavigate();

    //This useEffect is ran upon this screen being opened and if the user is not an admin then navigates to home as only admins can access this page
    useEffect(() => {
        let currentUser = sessionStorage.getItem('UserID');
        if (currentUser) {
            getDoc(doc(db, 'users', currentUser)).then((docSnapshot) => {
                if (!docSnapshot.data().admin) {
                    alert('You do not have access to this page');
                    navigate('/home');
                }
            })
        }
    })

    function uploadFile() {
        if (file && workout && workoutLevel) {
            const filePath = 'workoutVideos/' + workout + '/' + workoutLevel + '/' + file.name;
            //This is initalising a reference to our storage bucket using the file path created from the details we added
            const storageRef = ref(storage, filePath);
            //The uploadBytes function from the firebase api allows us to upload a file to the path we have defined above
            uploadBytes(storageRef, file).then(() => {
                alert('Successfully uploaded workout video!');
                setFile();
                setWorkout('');
                setWorkoutLevel('');
            })
        } else alert('Please fill in all fields and select a video to be uploaded');
    }

    return (<div style={{ marginLeft: '20%', marginRight: '20%' }}>
        <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Workout type</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={workout}
                label="Workout type"
                onChange={(e) => setWorkout(e.target.value)}
            >
                <MenuItem value={'Cardio'}>Cardio</MenuItem>
                <MenuItem value={'LowerBody'}>Lower Body</MenuItem>
                <MenuItem value={'UpperBody'}>Upper body</MenuItem>
                <MenuItem value={'Core'}>Back</MenuItem>
            </Select>
        </FormControl>

        <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Workout level</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={workoutLevel}
                label="Workout type"
                onChange={(e) => setWorkoutLevel(e.target.value)}
            >
                <MenuItem value={'Beginner'}>Beginner</MenuItem>
                <MenuItem value={'Intermediate'}>Intermediate</MenuItem>
                <MenuItem value={'Advanced'}>Advanced</MenuItem>
            </Select>
        </FormControl>

        <Input type="file" accept = 'video/mp4,video/x-m4v,video/*' fullWidth onChange={(e) => { setFile(e.target.files[0]) }}>Upload file</Input>
        <Button fullWidth onClick={uploadFile}>Upload</Button>
    </div>)
}