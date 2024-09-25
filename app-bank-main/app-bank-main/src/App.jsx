import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import CheckFounds from "./components/CheckFounds";
import Transfer from "./components/Transfer";
import ViewAccounts from "./components/ViewAccounts";

function App() {
    return (
        
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/home" element={<Home/>}/>
                <Route path="/check-founds" element={<CheckFounds/>}/>
                <Route path="/transfer" element={<Transfer/>}/>
                <Route path="/view-accounts" element={<ViewAccounts/>}/>



            </Routes>
        </BrowserRouter>
    );
}

export default App;