import { auth,db } from "../config/fire";
import {collection,getDocs,query,where,and,or} from "firebase/firestore"
 export async function  jobs_list(){
    const JoblistReef=collection(db,'Joblist');
    const data=await getDocs(JoblistReef);
    const fillterdata1= data.docs.map((doc)=> ({...doc.data(),id:doc.id}
  
         ));
         return fillterdata1;
}
export async function getCompanyJobs(id){
   const JoblistReef=collection(db,'Joblist');
   const q=query(JoblistReef,where("uid","==",id)); 
   const joblist= await getDocs(q);
   const filteredjobs=joblist.docs.map((doc)=>{return{ ...doc.data(),"id":doc.id}});
  
   if(filteredjobs.length > 0){
   return filteredjobs;
   }
   else
   return "empty";
}

export async function getAppliedUsers(id){
  const JoblistReef=collection(db,'Joblist');
  const q=query(JoblistReef,where("uid","==",id)); 
  const joblist= await getDocs(q);
  let appliedUsers=[];
  await Promise.all(
 joblist.docs.map(async(doc)=>{
  const AppliedUserReef=collection(db,`Joblist/${doc.id}/appliedjobs`);
   const AppliedUsers= await getDocs(AppliedUserReef);
   appliedUsers.push(AppliedUsers.docs.map((doc2)=>{
     return{...doc2.data(),"jobId":doc.id,"jobName":doc.data().title
    };
   }));
  }));
 
return appliedUsers;
}

export async function  filtered_jobs_list(filter={},filtertype,jobs=[]){
 if(filtertype==="location"){
   switch (filter.type){
      case "any":{
        
         if(filter.location==="Anywhere" && filter.salary==="any"){
           
               const JoblistReef=collection(db,'Joblist');
               const data=await getDocs(JoblistReef);
               const fillterdata1= data.docs.map((doc)=> 
               ({...doc.data(),id:doc.id}));
                  return fillterdata1;
               
            }
         
   const JoblistReef=collection(db,'Joblist');
   const q=query(JoblistReef,where("location","==" ,filter.location))
   const data=await getDocs(q);
   const fillterdata1= data.docs.map((doc)=> ({...doc.data(),id:doc.id}
        ));
       
        return fillterdata1;
   }
   case "FullTime":{
      if( filter.location==="AnyWhere"){
         const JoblistReef=collection(db,'Joblist');
         const q=query(JoblistReef,where("type","==" ,filter.type))
         const snapshot = await getDocs(q);
         const data = snapshot.docs.map((doc) => {
           return {
             ...doc.data(),
             id: doc.id
           }
         });
         return data;
      }
      const JoblistRef = collection(db, 'Joblist');
      const q = query(JoblistRef, and(where("type", "==", filter.type), where("location", "==", filter.location)));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => {
        return {
          ...doc.data(),
          id: doc.id
        }
      });
      return data;

   }
   case "PartTime":{
     
      if( filter.location==="Anywhere"){
        
         const JoblistReef=collection(db,'Joblist');
         const q=query(JoblistReef,where("type","==" ,filter.type))
         const snapshot = await getDocs(q);
         const data = snapshot.docs.map((doc) => {
           return {
             ...doc.data(),
             id: doc.id
           }
         });
        
         return data;
      }
      const JoblistRef = collection(db, 'Joblist');
      const q = query(JoblistRef, and(where("type", "==", filter.type), where("location", "==", filter.location)));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => {
        return {
          ...doc.data(),
          id: doc.id
        }
      });
      return data;

  
      }
}
 }
 if(filtertype==="jobtypes"){
  
switch (filter.location){
   case "Anywhere":{
     
      if(filter.type==="any"){
        
            const JoblistReef=collection(db,'Joblist');
            const data=await getDocs(JoblistReef);
            const fillterdata1= data.docs.map((doc)=> 
            ({...doc.data(),id:doc.id}));
               return fillterdata1;
            
         }
const JoblistReef=collection(db,'Joblist');
const q=query(JoblistReef,where("type","==",filter.type) )
const data=await getDocs(q);
const fillterdata1= data.docs.map((doc)=> ({...doc.data(),id:doc.id}

     ));
    
     return fillterdata1;
}
case "Remote":{
  
      if( filter.type==="any"){
         const JoblistReef=collection(db,'Joblist');
         const q=query(JoblistReef,where("location","==" ,filter.location))
         const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => {
        return {
          ...doc.data(),
          id: doc.id
        }
      });
     
      return data;
      }
      const JoblistRef = collection(db, 'Joblist');
      const q = query(JoblistRef, and(where("type", "==", filter.type), where("location", "==", filter.location)));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => {
        return {
          ...doc.data(),
          id: doc.id
        }
      });
      return data;
}

}
 }
 if(filtertype==="salary"){
 
  switch (filter.location){
    case "Anywhere":{
      if(filter.salary==="any"){
        const JoblistReef=collection(db,'Joblist');
        const data=await getDocs(JoblistReef);
        const fillterdata1= data.docs.map((doc)=> ({...doc.data(),id:doc.id}
             ));
            jobs=fillterdata1;
      }
      else{
        const JoblistRef = collection(db, 'Joblist');
       
        const q = query(
          JoblistRef, 
              where("salary2", ">", +filter.salary)
        );
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map((doc) => {
          return {
            ...doc.data(),
            id: doc.id
          }
        });
       jobs=data
       
      }
    }
    break;
    case "Remote":{
     
      if(filter.salary==="any"){
        const JoblistRef = collection(db, 'Joblist');
        const q = query(JoblistRef, where("location", "==", filter.location));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map((doc) => {
          return {
            ...doc.data(),
            id: doc.id
          }
        });
        jobs= data;
      }
      else{
        const JoblistRef = collection(db, 'Joblist');
       
        const q = query(
          JoblistRef,
             and( 
             where("location", "==", filter.location),
             where("salary2", ">", +filter.salary)
             )
        );
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map((doc) => {
          return {
            ...doc.data(),
            id: doc.id
          }
        });
       jobs=data
       
      }

    }}
    switch(filter.type){
     
      case"any":{
       
        if(filter.salary==="any"){
          const JoblistReef=collection(db,'Joblist');
          const snapshot=await getDocs(JoblistReef);
          const data= snapshot.docs.map(
            (doc)=>({...doc.data(),id:doc.id}
               ));
            
               const thirdArray = jobs.filter((elem) => {
                return data.some((ele) => {
                return elem.id === ele.id;
                  });
                });
                return thirdArray;
              
        }
        else{
          const JoblistRef = collection(db, 'Joblist');
         
          const q = query(
            JoblistRef, 
                where("salary2", ">", +filter.salary)
          );
          const snapshot = await getDocs(q);
          const data = snapshot.docs.map((doc) => {
            return {
              ...doc.data(),
              id: doc.id
            }
          });
          
          const thirdArray = jobs.filter((elem) => {
            return data.some((ele) => {
            return elem.id === ele.id;
              });
            });
            return thirdArray;
         
       
        }
      }
      case "FullTime":{
       
        if(filter.salary==="any"){
          const JoblistRef = collection(db, 'Joblist');
          const q = query(JoblistRef, where("type", "==", filter.type));
          const snapshot = await getDocs(q);
          const data = snapshot.docs.map((doc) => {
            return {
              ...doc.data(),
              id: doc.id
            }
          });
         
          const thirdArray = jobs.filter((elem) => {
            return data.some((ele) => {
            return elem.id === ele.id;
              });
            });
            return thirdArray;
       
        }
        else{
          const JoblistRef = collection(db, 'Joblist');
         
          const q = query(
            JoblistRef,
               and( 
               where("type", "==", filter.type),
               where("salary2", ">", +filter.salary)
               )
          );
          const snapshot = await getDocs(q);
          const data = snapshot.docs.map((doc) => {
            return {
              ...doc.data(),
              id: doc.id
            }
          });
         
         
          const thirdArray = jobs.filter((elem) => {
            return data.some((ele) => {
            return elem.id === ele.id;
              });
            });
            return thirdArray;
        }
      }
      case "PartTime":{
        if(filter.salary==="any"){
         
          const JoblistRef = collection(db, 'Joblist');
          const q = query(JoblistRef, where("type", "==", filter.type));
          const snapshot = await getDocs(q);
          const data = snapshot.docs.map((doc) => {
            return {
              ...doc.data(),
              id: doc.id
            }
          });
          const thirdArray = jobs.filter((elem) => {
            return data.some((ele) => {
            return elem.id === ele.id;
              });
            });
            return thirdArray;
       
        }
        else{
          const JoblistRef = collection(db, 'Joblist');
         
          const q = query(
            JoblistRef,
               and( 
               where("type", "==", filter.type),
               where("salary2", ">", +filter.salary)
               )
          );
          const snapshot = await getDocs(q);
          const data = snapshot.docs.map((doc) => {
            return {
              ...doc.data(),
              id: doc.id
            }
          });
         
         
          const thirdArray = jobs.filter((elem) => {
            return data.some((ele) => {
            return elem.id === ele.id;
              });
            });
            return thirdArray;
        }
      }
    }
}
}
