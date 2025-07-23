import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';

import Layout from "./Pages/Layout/Layout";
import Home from "./Pages/Home/Home";
import Profile from "./Pages/Profile/Profile";
import Login from "./Pages/Login/Login";
import SignUp from "./Pages/SignUp/SignUp";
import JournalList from "./Pages/JournalList"; 
import PrivateRoute from "./Components/PrivateRoute";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route
                        index
                        element={
                            <PrivateRoute>
                                <Home />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="profile"
                        element={
                            <PrivateRoute>
                                <Profile />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="journals"
                        element={
                            <PrivateRoute>
                                <JournalList />
                            </PrivateRoute>
                        }
                    />
                </Route>

                <Route path="/login" element={<Login />} />
                <Route path="/sign-up" element={<SignUp />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
