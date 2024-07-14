import { Toaster } from "react-hot-toast";

export default function ToasterProvider() {
  return (
    <Toaster
      position="top-center"
      reverseOrder={true}
      toastOptions={{
        success: { duration: 3000 },
        error: { duration: 5000 },
        style: {
          backgroundColor: "var(--third-background)",
          color: "var(--main-text)",
          fontSize: "14px",
        },
      }}
    />
  );
}
