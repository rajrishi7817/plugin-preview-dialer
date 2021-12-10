import React from 'react';
import { FlexPlugin } from "flex-plugin";
import CustomerComponent from "./components/CustomerComponent/CustomerComponent";
import CustomThemeOverrides from './CustomThemeOverrides';
import { Icon } from '@twilio/flex-ui';
import AcceptButton from "./components/UI/AcceptButton";
import RejectButton from "./components/UI/RejectButton";
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

    flex.MainHeader.defaultProps.logoUrl = "https://carmine-catfish-1598.twil.io/assets/VA.png";
    flex.LoginView.defaultProps.logoUrl = "https://carmine-catfish-1598.twil.io/assets/VA.png";

    flex.AgentDesktopView.defaultProps.splitterOptions = {
      initialFirstPanelSize: '30%',
      minimumFirstPanelSize: '30%',
      minimumSecondPanelSize: '70%'
    }

    // flex.OutboundDialerPanel.Content.add(<PreviewDialer key="preview-dialpad" flex={flex} manager={manager} />)

    const PreviewDialerChannel = flex.DefaultTaskChannels.createChatTaskChannel(
      'Preview Dialer',
      task => task.taskChannelUniqueName === 'previewdialer'
    );


    PreviewDialerChannel.templates.TaskListItem.firstLine = task => task.attributes.info.name;
    PreviewDialerChannel.templates.TaskCanvasHeader.title = task => task.attributes.info.name;
    PreviewDialerChannel.templates.IncomingTaskCanvas.firstLine = task => task.attributes.info.name;
    PreviewDialerChannel.templates.IncomingTaskCanvas.secondLine = task => task.attributes.info.campaignName;

    PreviewDialerChannel.icons.active = <Icon icon="Directory" key="icon-active" />;
    PreviewDialerChannel.icons.list = <Icon icon="Directory" key="icon-list" />;
    PreviewDialerChannel.icons.main = <Icon icon="Directory" key="icon-main" />;

    PreviewDialerChannel.addedComponents = [
      {
        target: "TaskListButtons",
        component: <AcceptButton key="accept-component" flex={flex} />
      },
      {
        target: "TaskListButtons",
        component: <RejectButton key="reject-component" flex={flex} />
      },
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


    manager.workerClient.on("reservationCreated", reservation => {
      console.log(`Accept Task Payload[Channel Name] =======> ${reservation.task.taskChannelUniqueName}`);
      if (reservation.task.taskChannelUniqueName === 'previewdialer') {

        console.log(`Accept Task Payload[Campaign Name] =======> ${reservation.task.attributes.info.campaignName}`);

        console.log(`Accept Task Payload[Name] =======> ${reservation.task.attributes.info.name}`);
        console.log(`Accept Task Payload[Date Of Birth] =======> ${reservation.task.attributes.info.dob}`);
        console.log(`Accept Task Payload[Address] =======> ${reservation.task.attributes.info.addr}`);
        console.log(`Accept Task Payload[State] =======> ${reservation.task.attributes.info.addr_State}`);
        console.log(`Accept Task Payload[ZipCode] =======> ${reservation.task.attributes.info.addr_ZipCode}`);
        console.log(`Accept Task Payload[Email] =======> ${reservation.task.attributes.info.email}`);

        console.log(`Accept Task Payload[Client Name] =======> ${reservation.task.attributes.info.client_NM}`);
        console.log(`Accept Task Payload[FACS Client Name] =======> ${reservation.task.attributes.info.facs_client_NM}`);
        console.log(`Accept Task Payload[Guarantor Name] =======> ${reservation.task.attributes.info.guarantor_Name}`);
        console.log(`Accept Task Payload[Current Display] =======> ${reservation.task.attributes.info.curr_DISP}`);
        console.log(`Accept Task Payload[Hospital Code] =======> ${reservation.task.attributes.info.HOSP_SVC_CD}`);
        console.log(`Accept Task Payload[RTE Balance] =======> ${reservation.task.attributes.info.RTE_BAL}`);
        console.log(`Accept Task Payload[CBR Score] =======> ${reservation.task.attributes.info.CBR_SCORE}`);

        const customerInfo = {
          name: reservation.task.attributes.info.name,
          dob: reservation.task.attributes.info.dob,
          addr: reservation.task.attributes.info.addr,
          addr_State: reservation.task.attributes.info.addr_State,
          addr_ZipCode: reservation.task.attributes.info.addr_ZipCode,
          email: reservation.task.attributes.info.email,
          client_NM: reservation.task.attributes.info.client_NM,
          facs_client_NM: reservation.task.attributes.info.facs_client_NM,
          guarantor_Name: reservation.task.attributes.info.guarantor_Name,
          curr_DISP: reservation.task.attributes.info.curr_DISP,
          HOSP_SVC_CD: reservation.task.attributes.info.HOSP_SVC_CD,
          RTE_BAL: reservation.task.attributes.info.RTE_BAL,
          CBR_SCORE: reservation.task.attributes.info.CBR_SCORE
        }

        flex.AgentDesktopView.Panel2.Content.replace(
          <CustomerComponent customerInfo={customerInfo} key="customer-component" />, {
          sortOrder: -1
        });
      }

      reservation.on('completed', acceptedReservation => {
        flex.AgentDesktopView.Panel2.Content.replace(
          <AgentComponent
            key="agent-component" />, {
          sortOrder: -1
        });
      });


    });

  }

}
