import { Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { useState } from "react";

export default function MacroCalculator() {
    const [gender, setGender] = useState();
    const [age, setAge] = useState();
    const [weight, setWeight] = useState();
    const [height, setHeight] = useState();
    const [activityLevel, setActivityLevel] = useState();
    const [goal, setGoal] = useState();
    const [emptyFieldFlag, setEmptyFieldFlag] = useState(false);
    const [calories, setCalories] = useState();

    function calculateMacros() {
        if (!gender || !age || !weight || !height || !activityLevel || !goal) {
            setEmptyFieldFlag(true);
            alert('Please check empty fields!');
            return;
        } else {
            let tempCalories;
            switch (gender) {
                case 'Male':
                    tempCalories = (10 * weight) + (6.25 * height) - (5 * age) + 5
                    break;

                case 'Female':
                    tempCalories = (10 * weight) + (6.25 * height) - (5 * age) - 161
                    break;

                default:
                    break;
            }
            switch (activityLevel) {
                case 'Sedentary':
                    tempCalories = tempCalories * 1.2
                    break;

                case 'Lightly active':
                    tempCalories = tempCalories * 1.375
                    break;

                case 'Moderately active':
                    tempCalories = tempCalories * 1.55
                    break;

                case 'Very active':
                    tempCalories = tempCalories * 1.725
                    break;

                case 'Extra active':
                    tempCalories = tempCalories * 1.725
                    break;

                default:
                    break;
            }
            switch (goal) {
                case 'Weight loss':
                    tempCalories = tempCalories * 0.8;
                    break;

                case 'Muscle gain':
                    tempCalories = tempCalories * 1.2;
                    break;

                case 'Maintenance':
                    break;

                default:
                    break;
            }
            setCalories(tempCalories);
        }
    }

    return (
        <div style = {{display: 'flex', justifyContent: 'center', paddingLeft: '20%', paddingRight: '20%', flexDirection: 'column'}}>
            <Typography variant = 'h3' textAlign='center
            '>Calculate your Macros</Typography>
            <FormControl fullWidth disabled={emptyFieldFlag && !gender} style ={{paddingBottom: '10px'}}>
                <InputLabel id="gender">Gender</InputLabel>
                <Select
                    labelId="gender"
                    value={gender}
                    label="Gender"
                    onChange={(e) => setGender(e.target.value)}
                >
                    <MenuItem value={'Male'}>Male</MenuItem>
                    <MenuItem value={'Female'}>Female</MenuItem>
                </Select>
            </FormControl>

            <TextField label='Age' type='number' value={age} onChange={(e) => setAge(e.target.value)}  disabled={emptyFieldFlag && !age} fullWidth style ={{paddingBottom: '10px'}}/>
            <TextField label='Weight (kg)' type='number' value={weight} onChange={(e) => setWeight(e.target.value)}  disabled={emptyFieldFlag && !weight} fullWidth style ={{paddingBottom: '10px'}}/>
            <TextField label='Height (cm)' type='number' value={height} onChange={(e) => setHeight(e.target.value)}  disabled={emptyFieldFlag && !height} fullWidth style ={{paddingBottom: '10px'}}/>

            <FormControl fullWidth disabled={emptyFieldFlag && !activityLevel} style ={{paddingBottom: '10px'}}>
                <InputLabel id="activity">Activity level</InputLabel>
                <Select
                    labelId="activity"
                    value={activityLevel}
                    label="Activity level"
                    onChange={(e) => setActivityLevel(e.target.value)}
                >
                    <MenuItem value={'Sedentary'}>Sedentary (limited Exercise)</MenuItem>
                    <MenuItem value={'Lightly active'}>Lightly active (light exercise less than 3 days per week)</MenuItem>
                    <MenuItem value={'Moderately active'}>Moderately active (moderate exercise most days of the week)</MenuItem>
                    <MenuItem value={'Very active'}>Very active (hard exercise every day)</MenuItem>
                    <MenuItem value={'Extra active'}>Extra active (strenuous exercise two or more times per day)</MenuItem>
                </Select>
            </FormControl>

            <FormControl fullWidth disabled={emptyFieldFlag && !goal}>
                <InputLabel id="goal">Goal</InputLabel>
                <Select
                    labelId="goal"
                    value={goal}
                    label="Goal"
                    onChange={(e) => setGoal(e.target.value)}
                >
                    <MenuItem value={'Weight loss'}>Weight loss</MenuItem>
                    <MenuItem value={'Maintenance'}>Maintenance</MenuItem>
                    <MenuItem value={'Muscle gain'}>Muscle gain</MenuItem>
                </Select>
            </FormControl>

            <Button onClick={calculateMacros}>Calculate macros</Button>

            {calories && (<div style = {{textAlign: 'center'}}>
            <Typography variant='h5'>Your macronutrients are as follows:</Typography>
            <Typography>Calories per day should be: {calories}</Typography>
                <Typography>Carbs per day should be: {((calories * 0.4) / 4).toFixed(0)}g</Typography>
                <Typography>Protein per day should be: {((calories * 0.3) / 4).toFixed(0)}g</Typography>
                <Typography>Fats per day should be: {((calories * 0.3) / 9).toFixed(0)}g</Typography>
            </div>)}
        </div>
    )
}