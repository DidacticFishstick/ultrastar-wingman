// components/Permissions.js

import React from 'react';
import './Permissions.css';
import Permission from "./Permission";

const Permissions = ({
                         permissions,
                         setPermissions,
                         accessLevels
                     }) => {

    // Convert the object to an array of values
    const sortedPermissions = Object.values(permissions.permissions);

    // Sort the array by the "id" property
    sortedPermissions.sort((a, b) => a.id.localeCompare(b.id));

    return <div className={"permissions"}>
        <h1>Permission Settings</h1>
        <p>Change which access level is required for various things. These access levels can be assigned to registered players. Everybody else gets the access level <i>unregistered</i>.</p>
        <table>
            <tbody>
            {sortedPermissions.map(permission => (
                <Permission
                    permission={permission}
                    setPermissions={setPermissions}
                    accessLevels={accessLevels}
                />
            ))}
            </tbody>
        </table>
    </div>;
};

export default Permissions;
