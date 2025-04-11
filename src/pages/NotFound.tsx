import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 text-primary">404</h1>
        <p className="text-xl text-gray-600 mb-8">Oops! Page not found you are looking for another website <br />
        please click to go back</p>
        <a href="/" className="bg-primary px-6 py-2 rounded-lg hover:text-white">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
