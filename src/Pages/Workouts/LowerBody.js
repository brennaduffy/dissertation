import { Tab, Tabs, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../Firebase/config";
//This is the page for lower body workouts where we can tab between beginner intermediate and advanced workouts and there will be videos for each
export default function LowerBody() {
    const [value, setValue] = useState(0);
    const [beginnerVideo, setBeginnerVideo] = useState();
    const [intermediateVideo, setIntermediateVideo] = useState();
    const [advancedVideo, setAdvancedVideo] = useState();

    //This use effect runs on opening of the page and when the value of the tabs change as seen in the dependency array at the end '[value]'
    //Depending on the current tab it will get different videos and set the video to the related level
    useEffect(() => {
        switch (value) {
            case 0:
                getVideo('Beginner/test.mp4', setBeginnerVideo)
                break;

            case 1:
                getVideo('Intermediate/test.mp4', setIntermediateVideo)
                break;

            case 2:
                getVideo('Advanced/test.mp4', setAdvancedVideo)
                break;

            default:
                break;
        }
    }, [value])

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    function getVideo(path, setVideoURL) {
        //This function uses the firebase api to get the url of the video we are looking and sets the url to be used in the video component
        getDownloadURL(ref(storage, 'workoutVideos/LowerBody/' + path))
            .then((url) => {
                // `url` is the download URL for 'images/stars.jpg'
                setVideoURL(url);
            })
            .catch((error) => {
                // Handle any errors
            });
    }

    //This function is to return the content in each tab
    function TabPanel(props) {
        const { children, value, index, ...other } = props;

        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                {...other}
            >
                {value === index && (
                    <Box sx={{ p: 3 }}>
                        {children}
                    </Box>
                )}
            </div>
        );
    }

    TabPanel.propTypes = {
        children: PropTypes.node,
        index: PropTypes.number.isRequired,
        value: PropTypes.number.isRequired,
    };

    function a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    return (
        <div>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Beginner" {...a11yProps(0)} />
                    <Tab label="Intermediate" {...a11yProps(1)} />
                    <Tab label="Advanced" {...a11yProps(2)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <video width="750" height="500" controls >
                    <source src={beginnerVideo} type="video/mp4" />
                </video>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <video width="750" height="500" controls >
                    <source src={intermediateVideo} type="video/mp4" />
                </video>
            </TabPanel>
            <TabPanel value={value} index={2}>
                <video width="750" height="500" controls >
                    <source src={advancedVideo} type="video/mp4" />
                </video>
            </TabPanel>
        </div>
    )
}