// components/Tile.js

import React from 'react';
import './Tile.css'; // Importing the CSS for styling

const Tile = ({ className, span, children }) => {
    // Combine the passed className with the default classes
    const tileClassNames = `tile ${span ? 'full-width' : ''} ${className || ''}`;
    return <div className={tileClassNames}>{children}</div>;
};

export default Tile;
