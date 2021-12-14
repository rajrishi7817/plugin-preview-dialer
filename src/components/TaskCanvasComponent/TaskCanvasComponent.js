import React from 'react'
import AcceptButton from '../UI/AcceptButton';
import RejectButton from "../UI/RejectButton";

import "./TaskCanvasComponent.css";

const TaskCanvasComponent = (props) => {
    return <div className="task-canvas-component">
        <AcceptButton key="accept-component" task={props.task} flex={props.flex} />
        <RejectButton key="reject-component" task={props.task} flex={props.flex} />
    </div>
}

export default TaskCanvasComponent;