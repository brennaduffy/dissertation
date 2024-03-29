import { Box, Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

//This page renders all our workout types as tiles and allows us to navigate to them
export default function Workouts() {
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
                <CardActionArea onClick={() => navigateTo('cardio')}>
                    <CardMedia
                        sx={{ height: 250 }}
                        image="/images/cardio.jpg"
                        title="Cardio workout"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Cardio
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>

            <Card sx={{ maxWidth: '50vw' }}>
                <CardActionArea onClick={() => navigateTo('lower-body')}>
                    <CardMedia
                        sx={{ height: 250 }}
                        image="/images/lowerbody.jpg"
                        title="Lower body workout"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Lower body
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>

            <Card sx={{ maxWidth: '50vw' }}>
                <CardActionArea onClick={() => navigateTo('upper-body')}>
                    <CardMedia
                        sx={{ height: 250 }}
                        image="/images/upperbody.jpg"
                        title="Upper body workout"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Upper body
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>

            <Card sx={{ maxWidth: '50vw' }}>
                <CardActionArea onClick={() => navigateTo('core')}>
                    <CardMedia
                        sx={{ height: 250 }}
                        image="/images/core.jpg"
                        title="Core workout"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Core
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Box>
    )
}