import { Tabs } from "antd";
import Subscription from "./Subscription";

const { TabPane } = Tabs;

export default function TabSubscription() {
  return (
    <div className="text-center">
      <h2 className="text-4xl font-bold">Your Subscription Plan </h2>
      {/* <p className="text-sm">Growth Your Bussiness (Save 2.5%)</p> */}
      <p className="text-sm">Growth Your Bussiness</p>
      <Tabs defaultActiveKey="1" centered>
        <TabPane
          tab={<span className="font-bold text-xl">Client</span>}
          key="1"
        >
          <Subscription type="client" />
        </TabPane>
        <TabPane
          tab={<span className="font-bold text-xl">Professional</span>}
          key="2"
        >
          <Subscription type="professional" />
        </TabPane>
      </Tabs>
    </div>
  );
}
