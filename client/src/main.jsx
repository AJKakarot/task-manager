import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "#141414",
              color: "#f5f5f5",
              border: "1px solid #27272a"
            },
            success: {
              iconTheme: { primary: "#f97316", secondary: "#0f0f0f" }
            }
          }}
        />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
