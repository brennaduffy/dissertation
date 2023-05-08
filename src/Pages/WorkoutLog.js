import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment/moment";
import { useEffect, useState } from "react";
import { arrayUnion, doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { db, storage } from "../Firebase/config";
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { getDownloadURL, listAll, ref } from "firebase/storage";
import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'

export default function WorkoutLog() {
    let currentUser = sessionStorage.getItem('UserID');
    const [workouts, setWorkouts] = useState();
    const [newWorkoutOpen, setNewWorkoutOpen] = useState(false);
    const [viewWorkout, setViewWorkout] = useState();
    const [videoUrl, setVideoURL] = useState();
    const localizer = momentLocalizer(moment);

    const [workoutStart, setWorkoutStart] = useState();
    const [workoutEnd, setWorkoutEnd] = useState();
    const [workoutType, setWorkoutType] = useState();
    const [workoutLevel, setWorkoutLevel] = useState();
    const [workoutComments, setWorkoutComments] = useState();

    function handleUpload() {
        uploadWorkout();
        setNewWorkoutOpen(false);
    }

    useEffect(() => {
            onSnapshot(doc(db, 'workoutLogs', currentUser), docSnapshot => {
                let data = docSnapshot.data();
                console.log(data);
                let tempWorkouts = [];
                data.workouts.forEach(workout => {
                    let tempWorkout = {};
                    tempWorkout.title = workout.title;
                    tempWorkout.start = workout.start.toDate();
                    tempWorkout.end = workout.end.toDate();
                    tempWorkout.workoutLevel = workout.workoutLevel;
                    tempWorkout.additionalComments = workout.additionalComments;
                    tempWorkouts.push(tempWorkout);
                })
                console.log(tempWorkouts);
                setWorkouts(tempWorkouts);
            })
    }, [])

    useEffect(() => {
        if (viewWorkout) {
            const listRef = ref(storage, 'workoutVideos/' + viewWorkout.title + '/' + viewWorkout.workoutLevel)
            listAll(listRef)
                .then((res) => {
                    getDownloadURL(res.items[0])
                        .then((url) => {
                            // `url` is the download URL for the video
                            setVideoURL(url);
                        })
                        .catch((error) => {
                            // Handle any errors
                        });
                }).catch((error) => {
                    // Uh-oh, an error occurred!
                });
        }
    }, [viewWorkout])

    function uploadWorkout() {
        if (workoutType, workoutLevel, workoutStart, workoutEnd) {
            let workout = { title: workoutType, workoutLevel: workoutLevel, start: workoutStart.toDate(), end: workoutEnd.toDate() };
            if (workoutComments) {
                workout.additionalComments = workoutComments
            }
            updateDoc(doc(db, 'workoutLogs', currentUser), {
                workouts: arrayUnion(workout)
            }).then(() => alert('Successfully uploaded workout!'))

        }
    }

    return <div>
        <Button onClick={() => setNewWorkoutOpen(true)}>Upload your workout!</Button>

        <Calendar
            localizer={localizer}
            events={workouts}
            startAccessor="start"
            endAccessor="end"
            onSelectEvent={(event) => setViewWorkout(event)}
            style={{ height: 500 }}
        />

        {/*View previous workout popup*/}
        <Dialog open={viewWorkout} onClose={() => setViewWorkout()} fullWidth minWidth = "800" maxWidth="800">
            <DialogTitle>View your {viewWorkout?.title} workout!</DialogTitle>
            <DialogContent>
                <p>Time: {moment(viewWorkout?.start).format('HH:mm')} - {moment(viewWorkout?.end).format('HH:mm')}</p>
                <p>{viewWorkout?.additionalComments}</p>
                {videoUrl ? <video width="750" height="500" controls >
                <source src={videoUrl} type="video/mp4" />
            </video> : 'Loading video'}
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setViewWorkout()}>Close</Button>
            </DialogActions>
        </Dialog>

        {/*Upload a new workout popup form*/}
        <Dialog open={newWorkoutOpen} onClose={() => setNewWorkoutOpen(false)}>
            <DialogTitle>Upload your workout!</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    To upload a new workout, please fill out the form below.
                </DialogContentText>
                <LocalizationProvider dateAdapter={AdapterMoment}>
                    <TimePicker label="Start of workout" value={workoutStart} onChange={(value) => setWorkoutStart(value)} />
                    <TimePicker label="End of workout" value={workoutEnd} onChange={(value) => setWorkoutEnd(value)} />

                </LocalizationProvider>
                <FormControl fullWidth>
                    <InputLabel id="workoutType">Workout type</InputLabel>
                    <Select
                        labelId="workoutType"
                        value={workoutType}
                        label="Workout type"
                        onChange={(e) => setWorkoutType(e.target.value)}
                    >
                        <MenuItem value={'Cardio'}>Cardio</MenuItem>
                        <MenuItem value={'Lower Body'}>Lower Body</MenuItem>

                    </Select>
                </FormControl>

                <FormControl fullWidth>
                    <InputLabel id="workoutLevel">Workout level</InputLabel>
                    <Select
                        labelId="workoutLevel"
                        value={workoutLevel}
                        label="Workout level"
                        onChange={(e) => setWorkoutLevel(e.target.value)}
                    >
                        <MenuItem value={'Beginner'}>Beginner</MenuItem>
                        <MenuItem value={'Intermediate'}>Intermediate</MenuItem>
                        <MenuItem value={'Advanced'}>Advanced</MenuItem>
                    </Select>
                </FormControl>

                <TextField label='Additional comments' value={workoutComments} onChange={(e) => setWorkoutComments(e.target.value)} style={{ display: 'block' }} multiline fullWidth />

            </DialogContent>
            <DialogActions>
                <Button fullWidth onClick={handleUpload}>Upload workout!</Button>
            </DialogActions>
        </Dialog>
    </div>
}