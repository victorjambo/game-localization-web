import Header from "@/components/header";

const Home = () => {
  return (
    <div className="w-full">
      <Header />
      <span data-testid="welcome-home">Welcome to Game Localisation</span>
    </div>
  );
};

export default Home;
