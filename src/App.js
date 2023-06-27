import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Contact from "./pages/Contact";
import Create from "./pages/Create";
import Update from "./pages/Update"

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Home />} />
                        <Route path="home" element={<Home />} />
                        <Route path="dashboard" element={<Dashboard />} />
                        <Route path="contact" element={<Contact />} />
                        <Route path="add" element={<Create />} />
                        <Route path="update" element={<Update />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
