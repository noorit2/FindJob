import './App.css';
import {getDocs,collection,addDoc} from 'firebase/firestore';
import { useReducer,useEffect} from 'react';
import {db}from './config/fire';
const userinforef=collection(db,'userinfo');
let instate={companyid:"",
jobname:""
};
function reducer(state,action){
    switch(action.input){
        case "companyid":
            return {...state,[action.input]:action.value}
        case 'job':{
              return {...state,[action.input]:action.value};
        }
            
        default:{
           return {...state}
            }
    } 
};
export function Joblist() {
 const [state,dispatch]=useReducer(reducer,instate);
 const ref=collection(db,'Joblist');
 const submithandler= async (e)=>{
    e.preventDefault();
   
    await addDoc(ref,{state});

 }
 const onchangehandler=(e)=>{
    const action={
        input:e.target.name,
        value:e.target.value
    }
    dispatch(action);
    
 }

 return(
    <form action="post" onSubmit={submithandler}>
     <input type="text"name='companyid' onChange={onchangehandler}/>
     <input type="text"name='job' onChange={onchangehandler}/>
     <button type='submit'>submit</button>
    </form>
 );


}