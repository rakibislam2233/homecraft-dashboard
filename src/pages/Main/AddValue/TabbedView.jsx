import { Tabs } from "antd";
import AddValue from "./AddValue";

const { TabPane } = Tabs;

export default function TabbedView() {
  return (
    <>
      <Tabs defaultActiveKey="1">
        <TabPane
          tab={<span className="font-bold text-xl">Category</span>}
          key="1"
        >
          <AddValue type="Category" />
        </TabPane>
        <TabPane
          tab={<span className="font-bold text-xl">Profession</span>}
          key="2"
        >
          <AddValue type="Profession" />
        </TabPane>
        <TabPane
          tab={<span className="font-bold text-xl">Discipline</span>}
          key="3"
        >
          <AddValue type="Discipline" />
        </TabPane>
        <TabPane
          tab={<span className="font-bold text-xl">Specialty</span>}
          key="4"
        >
          <AddValue type="Specialty" />
        </TabPane>
        <TabPane
          tab={<span className="font-bold text-xl">License type</span>}
          key="5"
        >
          <AddValue type="License" />
        </TabPane>
      </Tabs>
    </>
  );
}
