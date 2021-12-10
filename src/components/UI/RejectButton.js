import React from 'react'
import { Icon } from '@twilio/flex-ui';

import Button from "./Button";

import "./RejectButton.css";

const RejectButton = (props) => {
    return <div className="reject-container"> <Button key="reject-task" type="button" category="reject" onClick={() => {
        props.flex.Actions.invokeAction("RejectTask", {
            sid: props.task.sid
        });
    }}>
        <div className="reject-button"><Icon className="reject-button_Icon" icon="Loading" key="Loading" /> Snooze</div>
    </Button></div>
}

export default RejectButton;
