// components/Tile.js

import React from 'react';
import './Tile.css'; // Importing the CSS for styling

const Tile = ({ className, span, children, style }) => {
    // Combine the passed className with the default classes
    const tileClassNames = `tile ${span ? 'full-width' : ''} ${className || ''}`;
    return <div className={tileClassNames} style={style}>{children}</div>;
};

export default Tile;
