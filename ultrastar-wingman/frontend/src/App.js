import {BrowserRouter, Routes, Route, useLocation} from 'react-router-dom';
import {ApiClient} from "./api/src";
import BottomNav from './components/BottomNav';
import Home from './components/Home';
import Songs from './components/Songs';
import UsdbList from './components/UsdbList';
import Usdb from "./components/Usdb";
import Scores from "./components/Scores";
import './App.css';
import User from "./components/User";
import HostUI from "./components/HostUI";
import SpotifyCallback from "./components/SpotifyCallback";
import Spotify from "./components/Spotify";

const defaultClient = ApiClient.instance;
defaultClient.basePath = window.location.origin;

function Layout() {
    const location = useLocation();
    const hideBottomNavRoutes = ["/host_ui"];

    return (
        <>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/songs" element={<Songs/>}/>
                <Route path="/usdbList" element={<UsdbList/>}/>
                <Route path="/usdb" element={<Usdb/>}/>
                <Route path="/scores" element={<Scores/>}/>
                <Route path="/user" element={<User/>}/>
                <Route path="/host_ui" element={<HostUI/>}/>
                <Route path="/spotify" element={<Spotify/>}/>
                <Route path="/spotify/callback" element={<SpotifyCallback/>}/>
            </Routes>
            {!hideBottomNavRoutes.includes(location.pathname) && <BottomNav />}
        </>
    );
}

function App() {
    return (
        <BrowserRouter>
            <Layout />
        </BrowserRouter>
    );
}

export default App;