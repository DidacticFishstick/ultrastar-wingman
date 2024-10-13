// components/HostUI.js

import React, {useRef, useState} from 'react';
import QRCode from "react-qr-code";
import './HostUI.css';
import {useUltrastarWingmanState} from "../helpers";

const HostUI = () => {
    const [ultrastarWingmanState, setUltrastarWingmanState] = useUltrastarWingmanState();

    return <div className={"hostui-page"}>
        <div className={"header"}>
            <span className={"logo"}></span>
            <label>Ultrastar Wingman</label>
        </div>
        <div className={"qr"}>
            {ultrastarWingmanState.client_url &&
                <QRCode
                    size={256}
                    value={ultrastarWingmanState.client_url}
                    viewBox={`0 0 256 256`}
                />
            }
        </div>
    </div>;
};

export default HostUI;
