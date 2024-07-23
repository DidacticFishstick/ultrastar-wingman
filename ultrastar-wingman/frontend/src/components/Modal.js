// Modal.js
import './Modal.css';
import React, {forwardRef} from "react";
import {IoMdClose} from "react-icons/io";

const Modal = forwardRef(({
                              fullscreen,
                              onClose,
                              className,
                              children,
                              ...props
                          }, ref) => {
    const close = (e) => {
        if (e.target !== e.currentTarget) {
            e.stopPropagation();
            return;
        }
        if (onClose) {
            onClose();
        }
    };

    return (
        <div ref={ref} className={"modal-backdrop " + (fullscreen ? "fullscreen " : "") + className} onClick={close} {...props}>
            {fullscreen && (onClose !== undefined) &&
                <IoMdClose className={"close"}/>
            }
            <div className={"modal-content"} onClick={fullscreen ? close : () => { }}>
                {children}
            </div>
        </div>
    );
});

export default Modal;
