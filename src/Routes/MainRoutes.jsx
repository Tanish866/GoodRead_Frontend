import Home from "Pages/Home";
import Signup from "Pages/Auth/Signup";
import NotFound from "Pages/NotFound";
import { Route, Routes } from "react-router-dom";
import Login from "Pages/Auth/Login";
import Dashboard from "Pages/Dashboard";

export default function MainRoutes(){
    return(
        <Routes>
            <Route path="/" element={<Home/>} ></Route>
            <Route path="/Dashboard" element={<Dashboard/>} ></Route>
            <Route path="/Signup" element={<Signup/>} ></Route>
            <Route path="/Login" element={<Login/>} ></Route>
            <Route path="*" element={<NotFound/>} ></Route>
        </Routes>
    ); 
}
