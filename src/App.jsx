import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/Home/HomePage";
import Navbar from "./components/Navbar/Navbar";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import InventoryForm from "./pages/InventoryForm/InventoryForm";
import InventoryList from "./pages/InventoryList/InventoryList";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/inventoryform" element={<InventoryForm />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/inventoryList" element={<InventoryList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
