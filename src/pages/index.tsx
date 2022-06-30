import { NextPage } from 'next';
import SiteWrapper from '../components/SiteWrapper';
import WidgetView from '../components/WidgetView';
import widgetConfig from '../widgets.config';

interface IProps {
  widgetData: IWidgetData[];
}

const Home: NextPage<IProps> = (props: IProps) => {
  return (
    <SiteWrapper>
      <div className='h-full'>
        <WidgetView widgetData={props.widgetData}></WidgetView>
      </div>
    </SiteWrapper>
  );
};

export default Home;

export async function getServerSideProps() {
  return {
    props: {
      widgetData: widgetConfig,
    },
  };
}
