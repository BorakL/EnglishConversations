import React from "react"; 
import "./home.scss";
import Button from "../../components/button/button";

const Home = ()=>{

    return (
    <div className="home-page">
        <header className="home-page-hero">
            <div className="home-page-hero-textBox">
                <h1 className="heading-primary">
                    <span className="main">Welcome to EnglishConversation </span>
                </h1>
            </div>
        </header>
        <main className="home-page-description">
            <div className="home-page-description-textBox">
                <span className="heading-text">Start learning, practicing, and testing your English language skills through interactive conversations. Choose a topic and dive into the world of English conversation.</span>
                <Button lg to="/topics">Get Started</Button>
            </div>
            <div className="home-page-description-imgBox">
                <span className="img-1">
                    <img src="conversation-1.jpg" alt="conversation"/>
                </span>
                <span className="img-2">
                    <img src="conversation-2.jpg" alt="conversation"/>
                </span>
                <span className="img-3">
                    <img src="conversation-3.jpg" alt="conversation"/>
                </span>
            </div>
        </main>
    </div>
    )
}

export default Home;