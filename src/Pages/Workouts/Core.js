import { Tab, Tabs } from "@mui/material"
import { Box } from "@mui/system"
import { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { getDownloadURL, listAll, ref } from "firebase/storage";
import { storage } from "../../Firebase/config";
//This is the page for core workouts where we can tab between beginner intermediate and advanced workouts and there will be videos for each
export default function Core() {
    const [value, setValue] = useState(0);
    const [beginnerVideo, setBeginnerVideo] = useState();
    const [intermediateVideo, setIntermediateVideo] = useState();
    const [advancedVideo, setAdvancedVideo] = useState();

    //This use effect runs on opening of the page and when the value of the tabs change as seen in the dependency array at the end '[value]'
    //Depending on the current tab it will get different videos and set the video to the related level
    useEffect(() => {
        switch (value) {
            case 0:
                getVideo('Beginner', setBeginnerVideo)
                break;

            case 1:
                getVideo('Intermediate', setIntermediateVideo)
                break;

            case 2:
                getVideo('Advanced', setAdvancedVideo)
                break;

            default:
                break;
        }
    }, [value])

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    function getVideo(level,setVideoURL) {
        //This function uses the firebase api to get the url of the video we are looking and sets the url to be used in the video component
        const listRef = ref(storage, 'workoutVideos/Core/' + level)
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
                {beginnerVideo ? <video width="750" height="500" controls >
                    <source src={beginnerVideo} type="video/mp4" />
                </video> : 'No video uploaded yet'}
            </TabPanel>
            <TabPanel value={value} index={1}>
                {intermediateVideo ? <video width="750" height="500" controls >
                    <source src={intermediateVideo} type="video/mp4" />
                </video> : 'No video uploaded yet'}
            </TabPanel>
            <TabPanel value={value} index={2}>
                {advancedVideo ? <video width="750" height="500" controls >
                    <source src={advancedVideo} type="video/mp4" />
                </video> : 'No video uploaded yet'}
            </TabPanel>
        </div>
    )
}