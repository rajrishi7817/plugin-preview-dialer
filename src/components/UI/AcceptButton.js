import React from 'react'
import { Icon } from '@twilio/flex-ui';

import Button from "./Button";

import "./AcceptButton.css";

const AcceptButton = (props) => {
    return <div className="accept-container">
        <Button key="accept-task" type="button" category="accept" onClick={() => {

            console.log(`UniqueID ======> ${props.task.attributes.info.uniqueID}`);
            const updateDBPayload = {
                uniqueId: props.task.attributes.info.uniqueID,
                dialStatus: `Dialed`,
            }

            async function postSnooze() {

                const responseDB = await fetch('https://flex-preview-dialer-9666-dev.twil.io/update-dialing-status', {
                    method: 'POST',
                    body: new URLSearchParams(updateDBPayload),
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                        'Access-Control-Allow-Origin': '*'
                    }
                });

            }
            postSnooze();

            props.flex.Actions.invokeAction("AcceptTask", {
                sid: props.task.sid
            });
        }}>
            <div className="accept-button"><Icon className="accept-button_Icon" icon="IncomingCall" key="IncomingCall" /> Dial</div>
        </Button>
    </div >
}

export default AcceptButton;
