import { PiWarningOctagonBold } from "react-icons/pi";

function ErrorMessage({ children }: { children: React.ReactNode }) {
  return (
    <div
      role="alert"
      aria-live="assertive"
      className="max-sm:text-sm text-base md:text-lg flex-items-center text-error font-bold my-2 gap-2 border-s "
    >
      <PiWarningOctagonBold className="text-2xl" /> {children}
    </div>
  );
}

export default ErrorMessage;
