import { Route, Routes } from 'react-router-dom';
import NavBar from '../Navigation/NavBar';
import UploadVideo from './Admin/UploadVideo';
import Home from './Home';
import UserProfile from './UserProfile';
import Workouts from './Workouts';
import LowerBody from './Workouts/LowerBody';
import MacroCalculator from './MacroCalculator';
import Cardio from './Workouts/Cardio';
import Core from './Workouts/Core';
import UpperBody from './Workouts/UpperBody';
import FrozenBerryYoghurt from './Recipes/FrozenBerryYoghurt';
import Recipes from './Recipes';
import StickySesame from './Recipes/StickySesame';
import VeganBurgers from './Recipes/VeganBurgers';
import BroccoliCheeseMuffins from './Recipes/BroccoliCheeseMuffins';

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
                <Route path = "/workouts/cardio" element = {<Cardio/>}/>
                <Route path = "/workouts/core" element = {<Core/>}/>
                <Route path = "/workouts/upper-body" element = {<UpperBody/>}/>

                <Route path="/recipes/*" element={<Recipes/>}/>
                <Route path = "/recipes/frozen-berry-yoghurt" element = {<FrozenBerryYoghurt/>}/>
                <Route path = "/recipes/sticky-sesame-chicken" element = {<StickySesame/>}/>
                <Route path = "/recipes/vegan-beetroot-burgers" element = {<VeganBurgers/>}/>
                <Route path = "/recipes/broccoli-cheese-muffins" element = {<BroccoliCheeseMuffins/>}/>

                <Route path = "/upload-video" element = {<UploadVideo/>}/>
                <Route path = "/macro-calculator" element = {<MacroCalculator/>}/>
            </Routes>
            </div>
        </div>
    )
}