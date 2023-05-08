import { Box, Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

//This page renders all our recipes as tiles and allows us to navigate to them
export default function Recipes() {
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
                <CardActionArea onClick={() => navigateTo('frozen-berry-yoghurt')}>
                    <CardMedia
                        sx={{ height: 250 }}
                        image="/images/Frozen-berry-yoghurt-thumbnail.jpg"
                        title="Frozen Berry Yoghurt Cups"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Frozen Berry Yoghurt Cups
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>

            <Card sx={{ maxWidth: '50vw' }}>
                <CardActionArea onClick={() => navigateTo('sticky-sesame-chicken')}>
                    <CardMedia
                        sx={{ height: 250 }}
                        image="/images/Sticky-sesame-chicken-thumbnail.jpg"
                        title="Sticky Sesame Chicken"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Sticky Sesame Chicken
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>

            <Card sx={{ maxWidth: '50vw' }}>
                <CardActionArea onClick={() => navigateTo('vegan-beetroot-burgers')}>
                    <CardMedia
                        sx={{ height: 250 }}
                        image="/images/Vegan-beetroot-burgers-thumbnail.jpg"
                        title="Vegan Beetroot Burgers"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                        Vegan Beetroot Burgers
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>

            <Card sx={{ maxWidth: '50vw' }}>
                <CardActionArea onClick={() => navigateTo('broccoli-cheese-muffins')}>
                    <CardMedia
                        sx={{ height: 250 }}
                        image="/images/Broccoli-cheese-muffins-thumbnail.jpg"
                        title="Broccoli Cheese Muffins"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                        Broccoli Cheese Muffins
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>

        </Box>
    )
}