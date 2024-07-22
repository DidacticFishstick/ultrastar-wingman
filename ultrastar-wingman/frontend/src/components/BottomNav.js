// BottomNav.js
import {NavLink} from 'react-router-dom';
import {FaHome, FaMusic, FaUser} from 'react-icons/fa';
import { BiSolidBarChartAlt2 } from "react-icons/bi";
import './BottomNav.css';

function BottomNav() {
    // Function to add 'active' class to the NavLink if it is currently active
    const getActiveClass = ({isActive}) => isActive ? 'active' : '';

    return (
        <div className="bottom-nav">
            <div>
                <NavLink to="/" end className={getActiveClass}>
                    <FaHome/>
                    <span>Home</span>
                </NavLink>
                <NavLink to="/songs" className={getActiveClass}>
                    <FaMusic/>
                    <span>Songs</span>
                </NavLink>
                <NavLink to="/scores" className={getActiveClass}>
                    <BiSolidBarChartAlt2/>
                    <span>Scores</span>
                </NavLink>
                <NavLink to="/users" className={getActiveClass}>
                    <FaUser/>
                    <span>User</span>
                </NavLink>
            </div>
        </div>
    );
}

export default BottomNav;
