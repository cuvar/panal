import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

interface IProps {
  children: React.ReactNode;
}
function SiteWrapper(props: any) {
  const title: string = 'panal';
  const website: string = 'cuvar.dev';

  return (
    <div className='w-screen min-h-screen flex flex-col items-center bg-pdarkgreen text-pwhite'>
      <Navbar title={title}></Navbar>
      <div className='my-8 sm:my-16 lg:my-16 mx-4 sm:mx-24 md:mx-10 lg:mx-20 xl:mx-36 flex flex-col flex-auto'>{props.children}</div>
      <Footer title={website}></Footer>
    </div>
  );
}

export default SiteWrapper;
