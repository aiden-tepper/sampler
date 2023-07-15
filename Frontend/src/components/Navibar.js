import { Outlet, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useContext } from 'react';
import { AuthContext } from '../auth/AuthContext';


const Navibar = () => {
    const nav = useNavigate();
    const { logout } = useContext(AuthContext);

    const openSoundboard = () => {
        nav("/soundboard")
    }
    const openLibrary = () => {
        nav("/library")
    }
    const logOut = () => {
        logout();
        nav("/login");
    }

    return <div>
        <h1>Digital Sampler</h1>
        <Button onClick={openSoundboard}>Soundboard</Button>
        <Button onClick={openLibrary}>Library</Button>
        <Button onClick={logOut}>Logout</Button>
        <Outlet />
    </div>
}

export default Navibar