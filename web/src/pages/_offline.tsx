import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import SiteWrapper from "~/components/structure/SiteWrapper";
import Login from "~/sites/Landing";

const Home: NextPage = () => {
  const { data } = useSession();
  if (!data?.user) {
    return <Login />;
  }

  return (
    <SiteWrapper>
      <div>
        <h1>Unfortunately, you&apos;re oufline :(</h1>
      </div>
    </SiteWrapper>
  );
};

export default Home;
