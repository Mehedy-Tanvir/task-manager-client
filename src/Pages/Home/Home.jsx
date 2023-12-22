import { Helmet } from "react-helmet-async";
import Banner from "./Banner/Banner";
import UserTypesSection from "./UserTypeSection/UserTypeSection";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Tasky | Home</title>
      </Helmet>
      <Banner></Banner>
      <UserTypesSection></UserTypesSection>
    </div>
  );
};

export default Home;
