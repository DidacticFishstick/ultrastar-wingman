import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {ApiClient} from "./api/src";
import BottomNav from './components/BottomNav';
import Home from './components/Home';
import Songs from './components/Songs';
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
                </Routes>
                <BottomNav/>
            </BrowserRouter>
        </div>
    );
}


export default App;

