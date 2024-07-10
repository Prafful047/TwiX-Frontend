import {BrowserRouter, Route, Routes} from 'react-router-dom';
import { useEffect, useState } from 'react';
import Home from './pages/Home';
import Login from './pages/Login/Login';
import SignUp from './pages/Login/Signup';
import './App.css';
import ProtectedRoute from './pages/ProtectedRoute';
import PageLoading from './pages/PageLoading';
// import Notifications from '@mui/icons-material/Notifications';
import Feed from './pages/Feed/Feed';
import Explore from './pages/Explore/Explore';
import Notifications from './pages/Notifications/Notifications';
import Messages from './pages/Messages/Messages';
import Bookmarks from './pages/Bookmarks/Bookmarks';
import Lists from './pages/Lists/Lists';
import Profile from './pages/Profile/Profile';
import More from './pages/More/More';
import SuccessPage from './pages/Sidebar/Premium/SuccessPage';
import CancelPage from './pages/Sidebar/Premium/Cancelpage';
import LoginHistory from './pages/LoginHistory/LoginHistory';
import { useAuthState} from 'react-firebase-hooks/auth';
import auth from './firebase.init';
import AccessRestricted from './pages/AccessRestricted/AccessRestricted';
import axios from 'axios';




function App() {

  const user = useAuthState(auth);

  const [accessAllowed, setAccessAllowed] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAccess = async () => {
      try {
        const response = await axios.get('https://twix-backend.onrender.com/check-access');
        setAccessAllowed(response.data.accessAllowed);
      } catch (error) {
        console.error('Error checking access:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAccess();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  
  return (
    <div className="App">
      { accessAllowed ?
      <BrowserRouter>
            <Routes>
                <Route path='/' element={<ProtectedRoute><Home /></ProtectedRoute>}>
                  <Route index element={<Feed />} />
                </Route>
                <Route path='/home' element={<ProtectedRoute><Home /></ProtectedRoute>}>
                  <Route path='feed' element={<Feed />} />
                  <Route path='explore' element={<Explore />} />
                  <Route path='notifications' element={<Notifications />} />
                  <Route path='messages' element={<Messages />} />
                  <Route path='bookmarks' element={<Bookmarks />} />
                  <Route path='lists' element={<Lists />} />
                  <Route path='profile' element={<Profile />} />
                  <Route path='more' element={<More />} />

                </Route>
                <Route path='/success' element={<SuccessPage />} />
                <Route path='/cancel' element={<CancelPage />} />
                <Route path='/login' element={<Login/>} />
                <Route path='/signup' element={<SignUp/>} />
                <Route path='/page-loading' element={<PageLoading/>} />
                <Route path="/home/login-history" element={<LoginHistory user={user} />} />
                
                

            </Routes>
      </BrowserRouter>
      :  <AccessRestricted />


      // <BrowserRouter>

      //   <Routes>
      //     <Route path="/restricted-access" component={<AccessRestricted />} />
      //   </Routes>


      
      // </>
}
    </div>
  );
}

export default App;
