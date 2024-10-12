// components/Permission.js

import React from 'react';
import './Permission.css';
import {MdExpandMore} from "react-icons/md";
import {patchPermissions} from "../helpers"; // Importing the CSS for styling

const Permission = ({
                        permission,
                        setPermissions,
                        accessLevels,
                    }) => {

    const setAccessLevel = newAccessLevel => {
        patchPermissions({
            [permission.id]: {
                min_access_level: newAccessLevel
            }
        }, data => {
            setPermissions(prevState => ({
                ...prevState,
                permissions: {
                    ...prevState.permissions,
                    ...data.permissions
                }
            }));
        });
    }

    return <div className={"permission"}>
        <div>
            <label className={"title"}>{permission.title}</label>
            <label className={"id"}>{permission.id}</label>
        </div>
        <div className={"access-level"}>
            <select value={permission.min_access_level} onChange={e => setAccessLevel(e.target.value)}>
                {accessLevels.map((level, index) => (
                    <option key={index} value={level.value}>
                        {level.title}
                    </option>
                ))}
            </select>
            <div className={"expand"}>
                <MdExpandMore/>
            </div>
        </div>
        <label className={"description"}>{permission.description}</label>
    </div>;
};

export default Permission;
