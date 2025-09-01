import { Route, Routes } from "react-router";
import App from "@/app";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/c/:id" element={<App />} />
    </Routes>
  );
}

export default AppRoutes;
