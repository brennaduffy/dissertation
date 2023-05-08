import { Box, Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom";

//This is the first page loaded within our dashboard and will just be clickable tiles that bring us to other routes
//All frontend compoinents are made using material ui package
export default function Home() {
    //useNavigate allows us to navigate to a section within the app similar to a href
    const navigate = useNavigate();
    function navigateTo(page) {
        navigate(page);
    }

    return (
        <Box
            sx={{
                display: 'grid',
                columnGap: 3,
                rowGap: 1,
                gridTemplateColumns: 'repeat(2, 1fr)',
                width: '100vw',
            }}
        >
            <Card sx={{ maxWidth: '50vw' }}>
                <CardActionArea onClick={() => navigateTo('workouts')}>
                    <CardMedia
                        sx={{ height: 250 }}
                        image="/images/cardio.jpg"
                        title="Workouts"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Workouts
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>

            <Card sx={{ maxWidth: '50vw' }}>
                <CardActionArea onClick={() => navigateTo('recipes')}>
                    <CardMedia
                        sx={{ height: 250 }}
                        image="/images/recipes.jpg"
                        title="Recipes"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Recipes
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>

        </Box>
    )
}