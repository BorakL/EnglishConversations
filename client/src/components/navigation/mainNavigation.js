//MainNavigation se sastoji od dva elementa SideDrawer i MainHeader-a
//Unutar MainHeader-a stoje tri elementa: hamburger button, logo, navigacija,
//Unutar mainNavigation imamo mehanizam za otvaranje/zatvaranje sadiDrawer-a

import { useState } from "react";
import BackDrop from "../uiElements/backDrop";
import SideDrawer from "../uiElements/sideDrawer";
import { Link } from "react-router-dom";
import MainHeader from "./mainHeader";
import "./mainNavigation.scss"
import NavLinks from "./navLinks";

const MainNavigation = ()=>{
    const[drawerIsOpen,setDrawerIsOpen] = useState(false);
    const openDrawerHandler = ()=>{
        setDrawerIsOpen(true)
    }
    const closeDrawerHandler = ()=>{
        setDrawerIsOpen(false)
    }


    return(
        <>
            {drawerIsOpen && <BackDrop onClick={closeDrawerHandler}/>}
            <SideDrawer show={drawerIsOpen} onClick={closeDrawerHandler}>
                <nav className="main-navigation__drawer-nav">
                    <NavLinks drawerIsOpen/>
                </nav>
            </SideDrawer> 
            <MainHeader>
                <button 
                    className="main-navigation__menu-btn"
                    onClick={openDrawerHandler}
                >
                    <span/>
                    <span/>
                    <span/>
                </button>
                <h1 className="main-navigation_title"> <Link to="/"> YourLogo </Link> </h1> 
                {
                    !drawerIsOpen ?
                    <nav className="main-navigation__header-nav">
                        <NavLinks/>
                    </nav>
                    :
                    null
                }
            </MainHeader>   
        </>
    )
}

export default MainNavigation