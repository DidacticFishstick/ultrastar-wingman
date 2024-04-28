import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {ApiClient} from "./api/src";
import BottomNav from './components/BottomNav';
import Home from './components/Home';
import Songs from './components/Songs';
import UsdbList from './components/UsdbList';
import Usdb from "./components/Usdb";
import Players from "./components/Players";
import Scores from "./components/Scores";
import './App.css';


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
                    <Route path="/players" element={<Players/>}/>
                    <Route path="/scores" element={<Scores/>}/>
                </Routes>
                <BottomNav/>
            </BrowserRouter>
        </div>
    );
}


export default App;

