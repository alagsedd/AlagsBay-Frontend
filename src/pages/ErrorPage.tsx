import { useNavigate } from "react-router-dom";
import { FiArrowLeft, FiHome, FiSearch } from "react-icons/fi";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 space-y-6">
        <div className="text-8xl font-bold text-indigo-600">404</div>

        <h1 className="text-3xl font-bold text-gray-800">
          Oops! Page not found
        </h1>

        <p className="text-gray-600">
          The page you're looking for doesn't exist or has been moved. Here are
          some helpful links instead:
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-indigo-100 hover:bg-indigo-200 text-indigo-700 rounded-lg transition-colors"
          >
            <FiArrowLeft /> Go Back
          </button>

          <button
            onClick={() => navigate("/")}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
          >
            <FiHome /> Home
          </button>

          <button
            onClick={() => navigate("/search")}
            className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg transition-colors"
          >
            <FiSearch /> Search
          </button>
        </div>

        <div className="pt-6">
          <img
            src="https://illustrations.popsy.co/amber/page-not-found.svg"
            alt="404 illustration"
            className="w-64 mx-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
