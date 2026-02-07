import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateWish from "./pages/CreateWish";
import ViewWish from "./pages/ViewWish";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CreateWish />} />
        <Route path="/wish/:id" element={<ViewWish />} />
      </Routes>
    </BrowserRouter>
  );
}
