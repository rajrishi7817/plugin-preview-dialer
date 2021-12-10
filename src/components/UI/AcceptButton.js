import React from 'react'
import { Icon } from '@twilio/flex-ui';

import Button from "./Button";

import "./AcceptButton.css";

const AcceptButton = (props) => {
    return <div className="accept-container">
        <Button key="accept-task" type="button" category="accept" onClick={() => {
            props.flex.Actions.invokeAction("AcceptTask", {
                sid: props.task.sid
            });
        }}>
            <div className="accept-button"><Icon className="accept-button_Icon" icon="IncomingCall" key="IncomingCall" /> Dial</div>
        </Button>
    </div >
}

export default AcceptButton;
