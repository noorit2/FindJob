import React from "react";
import styles from './Profile.module.css';
import profile from "../images/profilePicutre.jpg";
import Navbar from "../Components/Navbar";
import EditProfile from "./EditProfile";
import { useState,useContext } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../config/fire";
import PreviewProfile from "./PreviewProfile";
import AuthContext from "../Store/auth-context";
import Prefrences from "./Prefrences";
import Footer from "../Components/Footer/Footer";
const Profile=()=>{
   
    const ctx=useContext(AuthContext);
const [rightContainer,setRightContainer]=useState(<PreviewProfile />)
const [header,setHeader]=useState({title:'Preview Profile',desc:'View public profile.'})
const navigate=useNavigate();

const clickHandler=(probs)=>{
    switch(probs){
        case 'preview-profile':
            setRightContainer(<PreviewProfile />)
            setHeader({title:'Preview Profile',desc:'View public profile.'})
            break;
        case 'edit-profile':
            setRightContainer(<EditProfile />)
            setHeader({title:'Edit Profile',desc:'Edit your profile info.'})
            break;
    }
}
const searchHandler=(searchValue)=>{
    navigate(`/?value=${searchValue}`);
   }
    return(
        <>
        <Navbar searchHandler={searchHandler}></Navbar>
        <main className={styles.mainCoontainer}>
            <div className={styles.secondaryContainer}>
                <aside className={styles.sideContainer}>
                    <div>
                    <img src={ctx.profile.picture? ctx.profile.picture:profile}></img>
                    <h3>{ctx.profile.firstname + ' ' + ctx.profile.lastname}</h3>
                    </div>
                    <ul>
                        <li onClick={()=>clickHandler('edit-profile')} className={`${header.title==='Edit Profile' ? styles.activeLink :''}`}>Edit Profile</li>
                        <li onClick={()=>clickHandler('preview-profile')} className={`${header.title==='Preview Profile' ? styles.activeLink :''}`}>Preview Profile</li>
                    </ul>
                </aside>
                <div className={styles.rightContainer}>
                    <div className={styles.header}>
                        <h3>{header.title}</h3>
                        <p>{header.desc}</p>
                    </div>
                    <div className={styles.body}>
                     {rightContainer}
                    </div>
                </div>
            </div>
        </main>
        <Footer/>
        </>
    );
}
export default Profile;