import {BrowserRouter, Routes, Route} from 'react-router-dom';
import BottomNav from './components/BottomNav';
import Home from './components/Home';
import Songs from './components/Songs';
import './App.css';

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

