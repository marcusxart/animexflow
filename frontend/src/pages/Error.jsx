import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

const errorConfig = {
  404: {
    title: "404",
    message: "The page you're looking for doesn't exist or has been moved.",
    buttonText: "Back home",
  },
  500: {
    title: "500",
    message: "Oops! Something went wrong on our end. Please try again later.",
    buttonText: "Go home",
  },
  401: {
    title: "401",
    message: "You're not authorized to view this page. Please log in.",
    buttonText: "Login",
  },
};

const ErrorPage = ({ type = 404 }) => {
  const navigate = useNavigate();
  const { title, message, buttonText } = errorConfig[type] || errorConfig[404];

  const handleAction = () => {
    if (type === 401) navigate("/login");
    else navigate("/home");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-6 relative overflow-hidden bg-[var(--color-body)] text-[var(--color-text)]">
      {/* Smooth blended background */}
      <div className="absolute inset-0 bg-[var(--color-body)]">
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-body-2)] via-[var(--color-body)] to-[var(--color-body-1)] opacity-90 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-[var(--color-body-3)] via-transparent to-[var(--color-body)] opacity-70 mix-blend-overlay"></div>
      </div>

      {/* Soft glow orbs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[var(--color-primary)] opacity-15 blur-3xl"></div>
      <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-[var(--color-secondary)] opacity-15 blur-3xl"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center">
        <h1 className="text-[7rem] md:text-[10rem] font-bold text-[var(--color-primary)] drop-shadow-[0_0_12px_rgba(17,140,213,0.3)] leading-none select-none">
          {title}
        </h1>

        <p className="text-lg md:text-xl mb-8 max-w-md text-[var(--color-text)] leading-relaxed">
          {message}
        </p>

        <Button
          onClick={handleAction}
          className="px-8 py-3 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-[var(--color-btn-text)] rounded-xl font-semibold tracking-wide transition-all duration-300 shadow-lg hover:shadow-[0_0_20px_rgba(17,140,213,0.4)]"
        >
          {buttonText}
        </Button>
      </div>
    </div>
  );
};

export default ErrorPage;
