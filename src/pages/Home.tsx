import Collections from "../components/Collections";
import ExploreMore from "../components/ExploreMore";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
// import SearchBar from "../components/Search";
import TodaysBestDeals from "../components/TodaysBestDeals";

const Home = () => {
  return (
    <>
      {/* <SearchBar /> */}
      <HeroSection />
      <Collections />
      <ExploreMore />
      <TodaysBestDeals />
      <Footer />
    </>
  );
};

export default Home;
