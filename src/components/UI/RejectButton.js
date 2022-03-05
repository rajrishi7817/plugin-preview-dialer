import React from 'react'
import { Icon } from '@twilio/flex-ui';

import Button from "./Button";

import "./RejectButton.css";

const RejectButton = (props) => {
    return <div className="reject-container"> <Button key="reject-task" type="button" category="reject" onClick={() => {

        console.log(`UniqueID ======> ${props.task.attributes.uniqueID}`);
        // const updateDBPayload = {
        //     uniqueId: props.task.attributes.info.uniqueID,
        //     dialStatus: `Snooze`,
        // }

        // async function postSnooze() {

        //     const responseDB = await fetch('https://flex-preview-dialer-9666-dev.twil.io/update-dialing-status', {
        //         method: 'POST',
        //         body: new URLSearchParams(updateDBPayload),
        //         headers: {
        //             'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        //             'Access-Control-Allow-Origin': '*'
        //         }
        //     });

        // }
        // postSnooze();

        props.flex.Actions.invokeAction("RejectTask", {
            sid: props.task.sid
        });
    }}>
        <div className="reject-button"><Icon className="reject-button_Icon" icon="Loading" key="reject" /> Snooze</div>
    </Button></div>
}

export default RejectButton;
