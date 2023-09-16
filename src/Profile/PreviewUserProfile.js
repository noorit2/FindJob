import React,{useState,useEffect} from "react";
import { getUserWithId } from "../config/fire";
import { useLocation,useNavigate } from "react-router-dom";
import profile from "../images/profilePicutre.jpg";
import instagram from "../images/instagram .png";
import twitter from "../images/twitter .png";
import facebook from '../images/facebook.png';
import Navbar from "../Components/Navbar";
import styles from "./PreviewProfile.module.css";
import Footer from "../Components/Footer/Footer";
import Loader from "../Components/UI/Loader/Loader";
const PreviewUserProfile=()=>{
    const[user,setUser]=useState();
    const location = useLocation();
    const [loading,setLoading]=useState(true);
    const queryParams = new URLSearchParams(location.search);
    const [showReport,setShowReport]=useState(false);
    const [userId, setUserId] = useState(queryParams.get('user'));
    const [profilePicture,setProfilePicture]=useState(profile);
    useEffect(()=>{
        try{
        getUserWithId(userId).then(
            (result)=>{setUser(result)
               
            if(result.profilepicture){
                if(result.profilepicture.length>0){
            setProfilePicture(result.profilepicture);
            setLoading(false);
            
                }
            }
            }
) }
    catch(error){}
},[])
if(loading){
    return(<><Navbar/><Loader/></>)
}
else{
return(
    <>
    <Navbar/>
    <main className={`${styles.mainContainer}`}>
    <div className={`${styles.userprofile} ${styles.preview}`}>
<img src={profilePicture} alt="Profile"/>
<h2>{user.firstname  + " " + user.lastname}</h2>
<p className={styles.description}>{user.description}</p>
<ul>
<li><strong>Email</strong><br/>{user.email}</li>
<li><strong>Phone</strong> <br/>{user.phone}</li>
<li><strong>Website</strong> <br/>{user.website && <a href={user.website}>{user.website}</a>}</li>
{ user.resume && <li><strong>Resume </strong> <br/> <a href={user.resume} target="_blank" className={styles.resume}>Download</a> </li>}

</ul>
<div className={styles.socials}>
<span>
<a href={"http://twitter.com/"+user.twitter }><img src={twitter} alt="twitter logo"/></a>
</span>
<span>
<a href={"http://facebook.com/"+user.facebook}><img src={facebook} alt="facebook logo"/></a>
</span>
<span>
<a href={"http://instagram.com/"+user.instagram}><img src={instagram} alt="instagram logo"/></a>
</span>
</div>
</div>

</main>
<Footer/>
</>
)}}
export default PreviewUserProfile;