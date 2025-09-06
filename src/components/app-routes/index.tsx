import { Navigate, Route, Routes } from "react-router";
import App from "@/app";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/c/:id" element={<App />} />
      <Route path="/c" element={<App />} />
      <Route path="*" element={<Navigate to="/c" />} />
    </Routes>
  );
}

export default AppRoutes;
