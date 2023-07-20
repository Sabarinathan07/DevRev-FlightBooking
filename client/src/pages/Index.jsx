import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div
      className="h-screen w-screen bg-bg bg-cover bg-no-repeat flex items-center justify-center"
      style={{
        backgroundImage: "url('https://wallpaperaccess.com/full/254381.jpg')",
      }}
    >
      <Helmet>
        <title>Flight Booking</title>
      </Helmet>
      <div className="text-center">
        <h1 className="text-6xl font-bold text-white mb-4 animate-fade-in text-shadow-md">
          Explore the World of Flights
        </h1>
        <p className="text-lg text-light-blue font-semibold bg-white bg-opacity-30 backdrop-blur-md mb-8 p-2 rounded-lg">
          Discover your next adventure with our convenient flight booking service.
        </p>
        <Link to="/login">
          <button className="bg-blue-800 text-white p-2 px-6 rounded-lg transition duration-300 hover:bg-blue-900">
            Book Ticket
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Index;
