import React from "react"; 
import "./home.scss";
import Button from "../../components/button/button";

const Home = ()=>{

    return (
    <div className="homePage">
        <header className="header">
            <div className="logoBox">
                <img src="logo.png" alt="Logo" className="logo"/>
            </div>
            <div className="textBox">
                <h1 className="headingPrimary">
                    <span className="main">Outdoors </span>
                    <span className="sub">is where life happens</span>
                </h1>
                <Button
                    wrong
                >
                    Dugme
                </Button>
            </div>
        </header>
    </div>
    )
}

export default Home;