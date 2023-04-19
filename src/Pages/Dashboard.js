import { Route, Routes } from 'react-router-dom';
import NavBar from '../Navigation/NavBar';
import UploadVideo from './Admin/UploadVideo';
import Home from './Home';
import UserProfile from './UserProfile';
import Workouts from './Workouts';
import LowerBody from './Workouts/LowerBody';

//This is the main page we reach upon login
//Routes is where we define the route a user can navigate to using react-router-dom, so everything will render below the navbar making it a single page application
export default function Dashboard() {
    return (
        <div>
            <NavBar/>
            <div style = {{marginTop: '10px'}}>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/profile" element={<UserProfile/>}/>
                <Route path="/workouts/*" element={<Workouts/>}/>
                <Route path = "/workouts/lower-body" element = {<LowerBody/>}/>
                <Route path = "/upload-video" element = {<UploadVideo/>}/>
            </Routes>
            </div>
        </div>
    )
}