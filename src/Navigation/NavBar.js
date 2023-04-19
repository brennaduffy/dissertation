import { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';
import { FitnessCenter, Person } from '@mui/icons-material';
import { signOut } from 'firebase/auth';
import { auth, db, storage } from '../Firebase/config';
import { getDownloadURL, ref } from 'firebase/storage';
import { doc, getDoc } from 'firebase/firestore';

const pages = ['workouts', 'upload video'];
const settings = ['Profile', 'Logout'];

//This is our navigation bar which is available on every page except for login and register and allows us to move between pages, see our profile picture and logout
export default function NavBar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [profilePic, setProfilePic] = useState();

  const navigate = useNavigate();

  //This use effect is ran when the navbar is first rendered and get the users profile picture from storage
  useEffect(() => {
    let currentUser = sessionStorage.getItem('UserID');
    if (currentUser) {
      getDoc(doc(db, 'users', currentUser)).then((docSnapshot) => {
        let profilePicPath = 'profilePics/' + currentUser + '/' + docSnapshot.data().profilePic;
        getDownloadURL(ref(storage, profilePicPath))
          .then((url) => {
            setProfilePic(url);
          })
          .catch((error) => {
            console.log('Cannot get profile picture');
          });
      })
    }
  }, [])

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  //This function is ran when navigating using the navbar
  function handleCloseNavMenu(page) {
    if(page !== 'upload video') {
      navigate(page);
    } else {
      navigate('upload-video')
    }
    setAnchorElNav(null);
  };
  //this function is ran when using the user menu e.g. profile and logout
  const handleCloseUserMenu = (setting) => {
    if (setting === 'Profile') {
      navigate('/home/profile');
    } else if (setting === 'Logout') {
      logOut();
    }
    setAnchorElUser(null);
  };

  function logOut() {
    signOut(auth).then(() => {
      //This clears our session storage of any logged in user so they cannot gain access to the web app
      sessionStorage.clear();
      navigate('/');
      alert('Successfully logged out!');
    });
  }

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <FitnessCenter sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, cursor: 'pointer' }} onClick={() => navigate('/home')} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            onClick={() => navigate('/home')}
            sx={{
              mr: 2,
              cursor: 'pointer',
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            FLEX FITNESS
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={() => handleCloseNavMenu(page)}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <FitnessCenter sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            FLEX FITNESS
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => handleCloseNavMenu(page)}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Profile Picture" src={profilePic} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={() => handleCloseUserMenu(setting)}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
