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
        <tr className={"settings"}>
            <td>
                <label className={"title"}>{permission.title}</label>
                <label className={"id"}>{permission.id}</label>
            </td>
            <td className={"access-level"}>
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
            </td>
        </tr>
        <tr className={"description"}>
            <td colSpan={2}>
                <label>{permission.description}</label>
            </td>
        </tr>
    </div>;
};

export default Permission;
