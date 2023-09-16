import { useState,useContext } from "react";
import { ref, getDownloadURL, uploadBytesResumable,listAll,deleteObject } from "firebase/storage";
import { auth,storage } from "../config/fire";
import { useRef } from "react";
import {doc,setDoc,collection,query,where,getDocs} from 'firebase/firestore';
import {db}from '../config/fire';
import { onAuthStateChanged } from "firebase/auth";
import React,{ forwardRef,useImperativeHandle } from "react";
import AuthContext from "../Store/auth-context";
 const Uploadfile=forwardRef((probs,refr) => {
  useImperativeHandle(refr, () => ({
    formHandler
  }));
  const nameref2=useRef([]);
  const [pdf,setpdf]=useState(false);
  const [urlref,setUrlRef]=useState("");
  const nameref=useRef("");
  const alreadyhaspicture=useRef(false); 
  const ctx=useContext(AuthContext);
function formHandler(file){
 
  uploadFiles(file);
}
   onAuthStateChanged(auth, async (data)=>{
     if (auth.currentUser===null) return;
     if( urlref.length>0) return;
const listRef =ref(storage,`folder/${auth.currentUser.uid}/picture`);
 // Find all the prefixes and items.
 listAll(listRef)
   .then((res) => {
     res.prefixes.forEach((folderRef) => {
     });
     res.items.forEach((itemRef) => {
       if(nameref2.current.length===0)
       nameref2.current.push(itemRef.name);
       // All the items under listRef.
       getDownloadURL(itemRef).then((url)=>{
         setUrlRef(url);
        
         if(urlref.length>1)
         alreadyhaspicture.current=true;
        //  let profile={
        //   ...ctx.profile,picture:url
        //  };
     
        //  ctx.setProfile(profile);
       })
     });
   }).catch((error) => {
   
   });
})

const uploadFiles = (file) => {
  //
  if (!file) return;
  nameref2.current.push(file.name);
  const sotrageRef = ref(storage,`folder/${auth.currentUser.uid}/picture/${file.name}`);
  const uploadTask = uploadBytesResumable(sotrageRef, file);

  uploadTask.on(
    "state_changed",
    (snapshot) => {
    },
    (error) =>
    () => { 
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      setUrlRef(downloadURL);
      const userRef = doc(db, 'users',auth.currentUser.uid);
      setDoc(userRef, {profilepicture:downloadURL
     }, { merge: true });
     
      probs.setUploading(false);
      probs.setUploaded(true);
      let profile={
        ...ctx.profile,picture:downloadURL
      };
      ctx.setProfile(profile);
      });
      if(nameref2.current.length>1){
       var remove=nameref2.current.shift();
      alreadyhaspicture.current=true;
      }
      if(alreadyhaspicture.current===false) return;
      const deleteRef = ref(storage,`folder/${auth.currentUser.uid}/picture/${remove}`);
      
    // Delete the file
    deleteObject(deleteRef).then(() => {
     
    }).catch((error) => {
    // Uh-oh, an error occurred!
    });
    }
  );
};  return (
        <input type="file" className={probs.className} id={probs.id} name={probs.name} onChange={probs.onChange}  hidden/>

  );
});
export default React.memo(Uploadfile,()=>true);



