import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../Routes/Home";
import Login from "../Routes/Login";
import Signup from "../Routes/Signup";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
