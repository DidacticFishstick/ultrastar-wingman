// FullScreenModal.js
import './FullScreenModal.css';
import React, { forwardRef } from "react";
import {IoMdClose} from "react-icons/io";

const FullScreenModal = forwardRef(({onClose, className, children, ...props}, ref) => {
    const close = (e) => {
        console.log("close", e);
        if (e.target !== e.currentTarget) {
            e.stopPropagation();
            return;
        }
        if (onClose) {
            onClose();
        }
    };

    return (
        <div ref={ref} className={"modal-backdrop " + className} onClick={close} {...props}>
            <IoMdClose className={"close"}/>
            <div className={"modal-content"} onClick={close}>
                {children}
            </div>
        </div>
    );
});

export default FullScreenModal;
