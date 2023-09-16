import React, { useEffect } from "react";
import AuthContext from "../Store/auth-context";
import { useContext } from "react";
import styles from './PreviewProfile.module.css';
import profilePicture from "../images/profilePicutre.jpg";
import instagram from "../images/instagram .png";
import twitter from "../images/twitter .png";
import facebook from '../images/facebook.png';
function PreviewProfile(){
    const ctx=useContext(AuthContext);
    return(
        <div>
            <div className={styles.userprofile}>
  <img src={ctx.profile.picture? ctx.profile.picture :profilePicture} alt="Profile"/>
  <h2>{ctx.profile.firstname  + " " + ctx.profile.lastname}</h2>
  <p className={styles.description}>{ctx.profile.description}</p>
  <ul>
    <li><strong>Email</strong><br/>{ctx.profile.email}</li>
    <li><strong>Phone</strong> <br/>{ctx.profile.phone}</li>
    <li><strong>Website</strong> <br/>{ctx.profile.website && <a href={ctx.profile.website}>{ctx.profile.website}</a>}</li>
    { ctx.profile.resume && <li><strong>Resume </strong> <br/> <a href={ctx.profile.resume} target="_blank" className={styles.resume}>Download</a> </li>}

  </ul>
  <div className={styles.socials}>
    <span>
    <a href={"http://twitter.com/"+ctx.profile.twitter }><img src={twitter} alt="twitter logo"/></a>
    </span>
    <span>
    <a href={"http://facebook.com/"+ctx.profile.facebook}><img src={facebook} alt="facebook logo"/></a>
    </span>
    <span>
    <a href={"http://instagram.com/"+ctx.profile.instagram}><img src={instagram} alt="instagram logo"/></a>
    </span>
  </div>
</div>

        </div>
    )
};
export default PreviewProfile;