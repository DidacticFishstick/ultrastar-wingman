import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {ApiClient, PlayersApi} from "./api/src";
import BottomNav from './components/BottomNav';
import Home from './components/Home';
import Songs from './components/Songs';
import './App.css';


const defaultClient = ApiClient.instance;
defaultClient.basePath = "http://localhost:8080";

function App() {

    const playersApi = new PlayersApi();
    playersApi.apiPlayersApiPlayersGet((error, data, response) => {
        console.log(error);
        console.log(data);
        console.log(response);
    });

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

