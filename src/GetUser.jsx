import {getDocs,collection} from 'firebase/firestore';
import {db}from './config/fire';

const userinforef=collection(db,'users');

    

export async function GetUser( ) {
 const usersref=collection(db,'users');
const data=await getDocs(usersref);
const fillterdata1= data.docs.map((doc)=> ({...doc.data(),id:doc.id
   
}

));
const fillterdata2=fillterdata1.filter((user)=>user.uid=="sUIo9ucfsNcrQL37n8Wz9sz772a2");
const profile=fillterdata2[0];

 return(profile);
}

