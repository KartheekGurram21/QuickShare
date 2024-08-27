import React from 'react';
import NavBar from '../Components/NavBar'
import HomeContent from '../Components/HomeContent';
import InputSearch from '../Components/InputSearch';
import '../Styles/Home.css';

function LandingPage() {
    return (
        <div className="Home">
            <NavBar />
            <InputSearch />
            <HomeContent />
        </div>
    );
}

export default LandingPage;
