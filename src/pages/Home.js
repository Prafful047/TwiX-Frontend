import React from 'react';
import Sidebar from './Sidebar/Sidebar';
import auth from '../firebase.init';
import {Outlet} from 'react-router-dom';
import Widgets from './Widgets/Widjets';
import {signOut} from 'firebase/auth';
import { useAuthState} from 'react-firebase-hooks/auth';
// import useLoggedInUser from '../hooks/useLoggedInUser';
import {useTheme} from '../ThemeContext';



const Home = () => {

    const user = useAuthState(auth)
    const theme = useTheme();

    // console.log(user[0]?.email);
    

    const handleLogout = () => {
        signOut(auth);
    }

    return(
        <div className='app' style={{ backgroundColor: theme.backgroundColor, color: theme.color }}>
            <Sidebar handleLogout={handleLogout} user={user} />
            <Outlet />
            <Widgets userEmail={user[0]?.email} />
        </div>
    )
};

export default Home;