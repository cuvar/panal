import { NextPage } from "next";
import SiteWrapper from "../components/SiteWrapper";
import WidgetView from "../components/WidgetView";
import loadDataForWidget from "../utils/widget/load";

const Home: NextPage = () => {
  return (
    <SiteWrapper>
      <div className="h-full">
        <WidgetView widgetData={loadDataForWidget()}></WidgetView>
      </div>
    </SiteWrapper>
  );
};

export default Home;
