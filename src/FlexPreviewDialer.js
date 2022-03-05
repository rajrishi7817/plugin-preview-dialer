import React from 'react';
import { FlexPlugin } from '@twilio/flex-plugin';
import CustomerComponent from "./components/CustomerComponent/CustomerComponent";
import CustomThemeOverrides from './CustomThemeOverrides';
import { Icon } from '@twilio/flex-ui';

import PreviewButton from './components/UI/PreviewButton'
import TaskCanvasComponent from './components/TaskCanvasComponent/TaskCanvasComponent'
import AgentComponent from "./components/AgentComponent/AgentComponent"

const PLUGIN_NAME = "FlexPreviewDialer";

export default class FlexPreviewDialer extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }

  init(flex, manager) {

    /* UI CHANGES */
    manager.updateConfig({
      colorTheme: {
        overrides: CustomThemeOverrides
      },
      componentProps: {
        AgentDesktopView: {
          showPanel2: true,
          Panel1: {
            splitterOrientation: 'horizontal'
          }
        },
        WorkerCanvas: {
          showSkill: true
        }
      }

    });

    flex.AgentDesktopView.Panel2.Content.replace(
      <AgentComponent
        key="agent-component" />, {
      sortOrder: -1
    });

    flex.MainHeader.defaultProps.logoUrl = `https://preview-dialer-1033.twil.io/racing-unicorn.svg`;
    flex.LoginView.defaultProps.logoUrl = "https://preview-dialer-1033.twil.io/racing-unicorn.svg";

    flex.AgentDesktopView.defaultProps.splitterOptions = {
      initialFirstPanelSize: '30%',
      minimumFirstPanelSize: '30%',
      minimumSecondPanelSize: '70%'
    }

    // flex.OutboundDialerPanel.Content.add(<PreviewDialer key="preview-dialpad" flex={flex} manager={manager} />)

    const PreviewDialerChannel = flex.DefaultTaskChannels.createCallTaskChannel(
      'Preview Dialer',
      task => task.taskChannelUniqueName === 'previewdialer'
    );


    PreviewDialerChannel.templates.TaskListItem.firstLine = task => task.attributes.name;
    PreviewDialerChannel.templates.TaskCanvasHeader.title = task => task.attributes.name;
    PreviewDialerChannel.templates.IncomingTaskCanvas.firstLine = task => task.attributes.name;
    PreviewDialerChannel.templates.IncomingTaskCanvas.secondLine = task => task.attributes.campaignName;

    PreviewDialerChannel.icons.active = <Icon icon="Directory" key="icon-active" />;
    PreviewDialerChannel.icons.list = <Icon icon="Directory" key="icon-list" />;
    PreviewDialerChannel.icons.main = <Icon icon="Directory" key="icon-main" />;

    PreviewDialerChannel.addedComponents = [
      {
        target: "TaskListButtons",
        component: <PreviewButton key="preview-component" flex={flex} />
      }
    ];

    PreviewDialerChannel.replacedComponents = [
      {
        target: "TaskCanvas",
        component: <TaskCanvasComponent key="task-canvas-component" flex={flex} />
      }
    ];

    PreviewDialerChannel.removedComponents = [
      {
        target: "TaskListButtons",
        key: "reject"
      },
      {
        target: "TaskListButtons",
        key: "accept"
      },
    ];

    flex.TaskChannels.register(PreviewDialerChannel);


    flex.Actions.addListener("afterAcceptTask", (payload, abortFunction) => {
      console.log(`Task Accepted =====>`);
      const { type, destination } = payload.task.attributes;

      if (type === "preview-dialer") {
        console.log(`Task Type =====> ${type}`);
        console.log(`Task Destination =====> ${destination}`);
        console.log(`Task Sid =====> ${payload.task.sid}`);
        flex.Actions.invokeAction("StartOutboundCall", {
          destination
        });
        flex.Actions.invokeAction("CompleteTask", { sid: payload.task.sid });
      }

    });

    flex.Actions.addListener("afterRejectTask", (payload, abortFunction) => {
      console.log(`Task Rejected =====> ${payload.task.taskSid}`);

      // const deleteTaskPayload = {
      //   taskSid: payload.task.taskSid
      // }

      // async function deleteTask() {

      //   const responseDB = await fetch('https://flex-preview-dialer-9666-dev.twil.io/deleteTask', {
      //     method: 'POST',
      //     body: new URLSearchParams(deleteTaskPayload),
      //     headers: {
      //       'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      //       'Access-Control-Allow-Origin': '*'
      //     }
      //   });

      // }
      // deleteTask();
    });


    manager.workerClient.on("reservationCreated", reservation => {
      console.log(`Accept Task Payload[Channel Name] =======> ${reservation.task.taskChannelUniqueName}`);
      if (reservation.task.taskChannelUniqueName === 'previewdialer') {

        console.log(`Accept Task Payload[Campaign Name] =======> ${reservation.task.attributes.campaignName}`);

        console.log(`Accept Task Payload[uniqueID] =======> ${reservation.task.attributes.uniqueID}`);
        console.log(`Accept Task Payload[Name] =======> ${reservation.task.attributes.name}`);
        console.log(`Accept Task Payload[Date Of Birth] =======> ${reservation.task.attributes.dob}`);
        console.log(`Accept Task Payload[Address] =======> ${reservation.task.attributes.addr}`);
        console.log(`Accept Task Payload[Address] =======> ${reservation.task.attributes.addr_City}`);
        console.log(`Accept Task Payload[State] =======> ${reservation.task.attributes.addr_State}`);
        console.log(`Accept Task Payload[ZipCode] =======> ${reservation.task.attributes.addr_ZipCode}`);
        console.log(`Accept Task Payload[Email] =======> ${reservation.task.attributes.email}`);

        const customerInfo = {
          uniqueID: reservation.task.attributes.uniqueID,
          name: reservation.task.attributes.name,
          dob: reservation.task.attributes.dob,
          addr: reservation.task.attributes.addr,
          addr_City: reservation.task.attributes.addr_City,
          addr_State: reservation.task.attributes.addr_State,
          addr_ZipCode: reservation.task.attributes.addr_ZipCode,
          email: reservation.task.attributes.email,
        }

        flex.AgentDesktopView.Panel2.Content.replace(
          <CustomerComponent customerInfo={customerInfo} key="customer-component" />, {
          sortOrder: -1
        });

      }

      reservation.on('completed', acceptedReservation => {
        console.log(`Task Completed ======>`);
        flex.AgentDesktopView.Panel2.Content.replace(
          <AgentComponent
            key="agent-component" />, {
          sortOrder: -1
        });
      });

      reservation.on('canceled', acceptedReservation => {
        console.log(`Task Canceled ======>`);
        flex.AgentDesktopView.Panel2.Content.replace(
          <AgentComponent
            key="agent-component" />, {
          sortOrder: -1
        });
      });


    });

  }

}
