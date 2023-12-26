import React,{useReducer,useState,useEffect} from "react";
import Navbar from "../Components/Navbar";
import styles from './EditUserPofile.module.css';
import { useNavigate } from "react-router-dom";

const intilistate={
    firstname:"",
    firstnametouched:false,
    lastname:'',
    lastnametouched:false,
    image:'',
    phone:'',
    website:''
    }
    
    function reducer(state,action){
      console.log(state);
    let newstate={};
      switch(action.type){
        case 'touch':
          newstate={...state,[action.value]:true}
          break;
          case 'input':
            newstate={...state,[action.input]:action.value};
            break;
            default:}
      return (newstate);
    }
const EditUserProfile=()=>{
  const [img,setImg]=useState("./edit.png");
        const [state,dispatch]=useReducer(reducer,intilistate);
const [formIsValid,setFormIsValid]=useState(false);
const [error,setError]=useState();
const [showError,setShowError]=useState(false);
const navigate=useNavigate();
const inputsValid={
  firstname:state.firstname.trim() !=='',
  lastname:state.lastname.trim() !=='' ,
};
useEffect(()=>{
    if(inputsValid.firstname  && inputsValid.lastname ){
    setFormIsValid(true);}
    else{
    setFormIsValid(false);}
    console.log(formIsValid);
    },[inputsValid]);
   
const handelsubmit=(e)=>{
        e.preventDefault();
        navigate('/PersonalProfile');
    }
    
function onchange(e){
    const action={
      type:"input",
      input:e.target.name,
      value :e.target.value
    }
    dispatch(action);
  }
   const imageChangeHandler=(event)=>{
   
    let str = event.target.value;
let n = str.lastIndexOf("\\");
let result = str.substring(n + 1);
result="./"+result
console.log((result));
setImg(result);
  }

  const blurHandler=(e)=>{
    const action={
      type:"touch",
      value:e.target.name+"touched"
    }
    dispatch(action);
    }
    return(
    <>
   
      <Navbar></Navbar>
    <div  type='get' className={styles.container}>
  <form action="" className=' form' onSubmit={handelsubmit}>
<h3>Edit Profile</h3>
<div className={styles.img}>
<label htmlFor="image"><img src={img} alt="Profile Picture"/></label> <br/>
  <input type="file" id="image" name="image" hidden onChange={imageChangeHandler}></input>
  </div>
  <label htmlFor="resume">Resume</label> <br/>
  <input type="file" id="resume" name="resume"  ></input>
    <label className="text"> First Name<span className={styles.star} >*</span></label><br/>
   <input  type="text"   className={`${!inputsValid.firstname && state.firstnametouched && styles.invalid}`} name='firstname' required onChange={onchange} value={state.firstname} onBlur={blurHandler}/><br/>
   { !inputsValid.firstname && state.firstnametouched && <p className={styles.errorText}> First name must not be empty!</p>}
   <label className="text"> Last Name<span className={styles.star}>*</span></label><br/>
   <input type="text" required   className={`${!inputsValid.lastname && state.lastnametouched && styles.invalid}`}  name='lastname'onChange={onchange} value={state.lastname} onBlur={blurHandler}/> <br/>
   { !inputsValid.lastname && state.lastnametouched && <p className={styles.errorText}> Last name must not be empty!</p>}
   <label className="text"> Phone Number</label><br/>
   <input type="number"   name='phone'onChange={onchange} value={state.phone}/> <br/>
   <label className="text"> Website</label><br/>
   <input type="url"   name='website'onChange={onchange} value={state.website}/> <br/>
   <div className={styles.button}>
   <button type='submit' disabled={!formIsValid}>Confirm</button>
   </div>
  </form>
 
  </div>
  </>
  );
}
export default EditUserProfile;