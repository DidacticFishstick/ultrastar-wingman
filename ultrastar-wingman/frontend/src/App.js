import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {ApiClient} from "./api/src";
import BottomNav from './components/BottomNav';
import Home from './components/Home';
import Songs from './components/Songs';
import UsdbList from './components/UsdbList';
import Usdb from "./components/Usdb";
import Scores from "./components/Scores";
import './App.css';
import User from "./components/User";


const defaultClient = ApiClient.instance;
defaultClient.basePath = window.location.origin;

function App() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/songs" element={<Songs/>}/>
                    <Route path="/usdbList" element={<UsdbList/>}/>
                    <Route path="/usdb" element={<Usdb/>}/>
                    <Route path="/scores" element={<Scores/>}/>
                    <Route path="/user" element={<User/>}/>
                </Routes>
                <BottomNav/>
            </BrowserRouter>
        </div>
    );
}

export default App;
