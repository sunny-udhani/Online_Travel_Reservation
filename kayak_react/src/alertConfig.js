import alert_icon from "./img/alert-icon-red-11.png";
import info_icon from "./img/info-icon.png";
import React from 'react';

export var alertOptions = {
    offset: 14,
    position: 'bottom left',
    theme: 'dark',
    time: 5000,
    transition: 'scale'
};


//send reference of component , message to be shown and type of message
export var showAlert = (msg, type, self) => {

    self.msg.show(msg, {
        time: 2000,
        type: type,
        icon: (type === "error") ? <img style={{height: "32px", width: "40px"}} src={alert_icon}/> :
            <img style={{height: "32px", width: "32px"}} src={info_icon}/>
    })
};
