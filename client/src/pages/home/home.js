import React from "react"; 
import "./home.scss";
import Button from "../../components/button/button";

const Home = ()=>{

    return (
    <div className="home-page">
        <header className="home-page-hero">
            <div className="home-page-hero-textBox">
                <h1 className="heading-primary">
                    <span className="main">Outdoors </span>
                    <span className="sub">is where life happens</span>
                </h1>
            </div>
        </header>
    </div>
    )
}

export default Home;