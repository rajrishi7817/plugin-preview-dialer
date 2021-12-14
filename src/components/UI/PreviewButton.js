import React from 'react'
import { Icon } from '@twilio/flex-ui';

import Button from "./Button";

import "./PreviewButton.css";

const PreviewButton = (props) => {
    return <div className="preview-container">
        <Button key="preview-task" type="button" category="preview" onClick={() => {
            console.log(`UniqueID ======> ${props.task.attributes.info.uniqueID}`);
        }}>
            <div className="reject-button">
                <Icon className="preview-button_Icon" icon="Eye" key="Eye" />Preview
            </div>
        </Button>
    </div>
}

export default PreviewButton;
