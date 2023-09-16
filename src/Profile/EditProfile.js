import React,{useReducer,useState,useEffect, useRef,useContext} from "react";
import styles from './EditProfile.module.css';
import { useNavigate } from "react-router-dom";
import {doc,setDoc,collection,query,where,getDocs} from 'firebase/firestore';
import {db,auth}from '../config/fire';
import { onAuthStateChanged } from "firebase/auth";
import AuthContext from "../Store/auth-context";
import Uploadfile from "./Uploadfile";
import { useCallback } from "react";
import UploadResumeFile from "./UploadResumeFile";
const intilistate={
  firstname:"",
  firstnametouched:false,
  lastname:"",
  lastnametouched:false,
  image:'',
  phone:'',
  website:'',
  twitter:'',
  instagram:'',
  facebook:'',
  description:'',
  picture:'',
  picturetouched:false,
  resume:'',
  resumetouched:false
  } 
    function reducer(state,action){
    let newstate={};
    
      switch(action.type){
        case 'touch':
          newstate={...state,[action.value]:true}
          break;
          case 'input':
            newstate={...state,[action.input]:action.value};
            break;
          case 'untouch':
            newstate={...state,[action.value]:false}
            break;
            default:
          newstate=state;    
          }
      return (newstate);
    }
const EditProfile=()=>{
  const imgInputRef=useRef();
  const resumeInputRef=useRef();
const [formIsValid,setFormIsValid]=useState(false);
const [fileValid,setFileValid]=useState({picture:true,resume:true});
const [uploading,setUploading ]=useState(false);
const[uploaded,setUploaded]=useState(true);
const didload=useRef(true);
const [loadingProfile,setLoadingProfile]=useState(true);
const ctx=useContext(AuthContext);
const [state,dispatch]=useReducer(reducer,intilistate);
const [img,setImg]=useState(ctx.profile.picture ? (ctx.profile.picture.length >0 ? ctx.profile.picture:'/edit.png' ):"./edit.png");
const inputsValid={
  firstname: state.firstname.trim() !=='',
  lastname:state.lastname.trim() !=='' ,
};
useEffect(()=>{

    if(inputsValid.firstname  && inputsValid.lastname ){
    setFormIsValid(true);}
    else{
    setFormIsValid(false);}
   
  
},[inputsValid]);
useEffect(()=>{
  function mapData(object,input){
    const action={
           type:"input",
           input:input,
           value :object
         }
        dispatch(action);
  }
 
  const objectMap = (obj, fn) =>
  Object.fromEntries(
    Object.entries(obj).map(
      ([k, v], i) => [k, fn(v, k, i)]
    )
  
  )
objectMap(ctx.profile,mapData)

if(img === './edit.png' && state.picture){
 
  setImg(state.picture);
}
if(ctx.profile.picture){
  if(ctx.profile.picture.length >0){
if(img !=ctx.profile.picture){
  setImg(ctx.profile.picture)
}}}
setLoadingProfile(false);
},[ctx.profile]);

const handelsubmit=(e)=>{
        e.preventDefault();
        const cityRef = doc(db, 'users', auth.currentUser.uid);
       setDoc(cityRef, { firstname: state.firstname,lastname:state.lastname,phone:state.phone,website:state.website,
        instagram:state.instagram,facebook:state.facebook,twitter:state.twitter,description:state.description
      }, { merge: true });
       const x={
        firstname:state.firstname,
        lastname:state.lastname,
        email:ctx.profile.email,
        id:ctx.profile.id,
        profileType:ctx.profile.profileType,
        resume:(state.resume ? state.resume:''),
        phone:(state.phone? state.phone:''),
        picture:(state.picture?state.picture:''),
        website:state.website,
        instagram:state.instagram,
        facebook:state.facebook,
        twitter:state.twitter,
        description:state.description
       };
    if(img !== './edit.png' && state.picturetouched){
      imgInputRef.current.formHandler(e.target[0].files[0]);
      setUploading(true);
      setUploaded(false);
   
    const action={
      type:"untouch",
      value:'picturetouched'
    };
    dispatch(action);
    }
    if(state.resumetouched){
     
      resumeInputRef.current.formHandler(e.target[3].files[0]);
   
    const action={
      type:"untouch",
      value:'resumetouched'
    };
    dispatch(action);
    }
    
       ctx.setProfile({...ctx.profile,x});
    }
    
function onchange(e){
    const action={
      type:"input",
      input:e.target.name,
      value :e.target.value
    }
    dispatch(action);
  }
  const resumeChangeHanlder=useCallback((event)=>{
   
    if(event.target.files[0]){
     
      const action={
        type:"touch",
        value:'resumetouched'
      };
      dispatch(action);
    }
  },[])
   const imageChangeHandler= useCallback((event)=>{
    let fileNameExt=event.target.files[0].name.slice((event.target.files[0].name.lastIndexOf(".") - 1 >>> 0) + 2);
   
    if(fileNameExt.trim() === "png" || fileNameExt.trim() === "jpg" || fileNameExt.trim() === "jpeg"){
      setImg(URL.createObjectURL(event.target.files[0]));
      setFileValid((prev)=>({...prev,picture:true}));
    }
   else{
   
    setFileValid((prev)=>({...prev,picture:false}));
   }
   const action={
    type:"touch",
    value:'picturetouched'
  };
  dispatch(action);
  },[]);

  const blurHandler=(e)=>{
    const action={
      type:"touch",
      value:e.target.name+"touched"
    }
    dispatch(action);
    }
 if(loadingProfile){
  return(<></>);
 }
 else{
    return(
    <>
   
    <div  type='get' className={styles.container}>
  <form action="" className=' form' onSubmit={handelsubmit}>
<div className={styles.img}>
  <label htmlFor="image"><img  src={img? img:''}alt="Profile"/></label> <br/>
  <Uploadfile ref={imgInputRef} id="image" name="image" hidden onChange={imageChangeHandler}  setUploaded={setUploaded} setUploading={setUploading} />
  {  !fileValid.picture &&state.picturetouched && <p className={styles.errorText}> Only upload images!</p>}
  </div>
  
    <label className="text"> First Name<span className={styles.star} >*</span></label><br/>
   <input  type="text"   className={`${!inputsValid.firstname && state.firstnametouched && styles.invalid}`} name='firstname' required onChange={onchange} value={state.firstname} onBlur={blurHandler}/><br/>
   { !inputsValid.firstname && state.firstnametouched && <p className={styles.errorText}> First name must not be empty!</p>}
   <label className="text"> Last Name<span className={styles.star}>*</span></label><br/>
   <input type="text" required   className={`${!inputsValid.lastname && state.lastnametouched && styles.invalid}`}  name='lastname'onChange={onchange} value={state.lastname} onBlur={blurHandler}/> <br/>
   { !inputsValid.lastname && state.lastnametouched && <p className={styles.errorText}> Last name must not be empty!</p>}
   <label htmlFor="resume">Resume</label> <br/>
   <UploadResumeFile  ref={resumeInputRef} id="resume" name="resume" value={state.resume} onChange={resumeChangeHanlder}/>
  {/* <input type="file" id="resume" name="resume"  ></input> */}
  <br/> <br/>
  <hr></hr>
  <label className="text" > Description</label><br/>
  <textarea type="text" name="description" onChange={onchange} value={state.description} maxLength={40} placeholder="maximum 40 characters"/> <br/>
   <label className="text" > Phone Number</label><br/>
   <input type="number"   name='phone'onChange={onchange} value={state.phone}/> <br/>
   <label className="text"> Website</label><br/>
   <input type="url"   name='website'onChange={onchange} value={state.website}/> <br/>
   <div className={styles.links}>
    <label htmlFor="twitter" > http://twitter.com/ </label>
    <input type="text" id="twitter" name="twitter" onChange={onchange} value={state.twitter} placeholder="@TwitterUsername"/>
   </div>
   <div  className={styles.links}>
    <label htmlFor="facebook" > http://facebook.com/ </label>
    <input type="text" id="facebook" name="facebook"  onChange={onchange} value={state.facebook} placeholder="FacebookUsername"/>
   </div>
   <div  className={styles.links}>
    <label htmlFor="instagram" > http://instagram.com/ </label>
    <input type="text" id="instagram" name="instagram"  onChange={onchange}  value={state.instagram} placeholder="InstagramUsername"/>
   </div>
   <div className={styles.button}>
   <button type='submit' disabled={!formIsValid || (uploading && !uploaded) }>Confirm</button>
   </div>
  </form>
 
  </div>
  </>
  );
}}
export default EditProfile;