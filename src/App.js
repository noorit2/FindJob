import React, { useState } from 'react';
import { createBrowserRouter,createRoutesFromElements,RouterProvider,Route, BrowserRouter } from 'react-router-dom';
import JobSearch from './Components/JobSearch/JobSearch';
import Navbar from './Components/Navbar';
import styles from "./App.module.css";
import AuthContext from './Store/auth-context';
import Register from './Components/Register/Register';
import { Rgisterver } from './Components/Register/Rgisterver';
import CompanyRegister from './Components/Register/CompanyRegister';
import Login from './Login/Login';
import { useEffect } from 'react';
import Profile from "./Profile/Profile";
import { useLocation } from 'react-router-dom';
import Pagination from './Components/JobSearch/Pagination';
import CompanyProfile from './Profile/CompanyProfile/CompanyProfile';
import CompanyPreviewProfile from './Profile/CompanyProfile/CompanyPreviewProfile';
import AppliedJobs from './Components/AppliedJobs/AppliedJobs';
import AppliedUsers from './Components/AppliedUsers/AppliedUsers';
import PreviewProfile from './Profile/PreviewProfile';
import PreviewUserProfile from './Profile/PreviewUserProfile';
import Reports from './Components/Reports/Reports';
function App() {
 
  const joblist=[
    {
      title:"Insurance Sales Agent1",
      key:"randomid",
      company:"Trio insurance",
      location:"location",
      fulltime:"false",
      parttime:"true",
      remote:"true",
      salary1:"1000",
      salary2:"1500",
      description:"Id Lorem voluptate adipisicing reprehenderit eu officia excepteur dolore cupidatat aliqua aliqua officia non anim. Deserunt irure ut voluptate aliquip non exercitation nisi minim id occaecat. Sit sint nulla eiusmod dolor ut nisi ipsum esse non ex cillum in incididunt sint. Ex enim dolore eiusmod cupidatat do id ea commodo excepteur cillum eiusmod ea occaecat magna. Nisi veniam amet non mollit magna ipsum eiusmod sint elit ipsum. Eiusmod dolore Lorem sunt cupidatat consectetur velit officia consectetur ullamco sint est laborum mollit eu."
    }
    ,
    {
      title:"Insurance Sales Agent2",
      key:"randomid2",
      company:"Trio insurance",
      location:"location",
      fulltime:"true",
      parttime:"true",
      remote:"false",
      salary1:"1000",
      salary2:"1500",
      description:"Id Lorem voluptate adipisicing reprehenderit eu officia excepteur dolore cupidatat aliqua aliqua officia non anim. Deserunt irure ut voluptate aliquip non exercitation nisi minim id occaecat. Sit sint nulla eiusmod dolor ut nisi ipsum esse non ex cillum in incididunt sint. Ex enim dolore eiusmod cupidatat do id ea commodo excepteur cillum eiusmod ea occaecat magna. Nisi veniam amet non mollit magna ipsum eiusmod sint elit ipsum. Eiusmod dolore Lorem sunt cupidatat consectetur velit officia consectetur ullamco sint est laborum mollit eu."

    },
    {
      title:"Insurance Sales Agent3",
      key:"randomid3",
      company:"Trio insurance",
      location:"location",
      fulltime:"true",
      parttime:"false",
      remote:"false",
      salary1:"1000",
      salary2:"1500",
      description:"Id Lorem voluptate adipisicing reprehenderit eu officia excepteur dolore cupidatat aliqua aliqua officia non anim. Deserunt irure ut voluptate aliquip non exercitation nisi minim id occaecat. Sit sint nulla eiusmod dolor ut nisi ipsum esse non ex cillum in incididunt sint. Ex enim dolore eiusmod cupidatat do id ea commodo excepteur cillum eiusmod ea occaecat magna. Nisi veniam amet non mollit magna ipsum eiusmod sint elit ipsum. Eiusmod dolore Lorem sunt cupidatat consectetur velit officia consectetur ullamco sint est laborum mollit eu."

    },
    {
      title:"Insurance Sales Agent4",
      key:"randomid4",
      company:"Trio insurance",
      location:"location",
      fulltime:"true",
      parttime:"false",
      remote:"false",
      salary1:"1000",
      salary2:"1500",
      description:"Id Lorem voluptate adipisicing reprehenderit eu officia excepteur dolore cupidatat aliqua aliqua officia non anim. Deserunt irure ut voluptate aliquip non exercitation nisi minim id occaecat. Sit sint nulla eiusmod dolor ut nisi ipsum esse non ex cillum in incididunt sint. Ex enim dolore eiusmod cupidatat do id ea commodo excepteur cillum eiusmod ea occaecat magna. Nisi veniam amet non mollit magna ipsum eiusmod sint elit ipsum. Eiusmod dolore Lorem sunt cupidatat consectetur velit officia consectetur ullamco sint est laborum mollit eu."

    },
    {
      title:"Insurance Sales Agent5",
      key:"randomid5",
      company:"Trio insurance",
      location:"location",
      fulltime:"true",
      parttime:"false",
      remote:"false",
      salary1:"1000",
      salary2:"1500",
      description:"Id Lorem voluptate adipisicing reprehenderit eu officia excepteur dolore cupidatat aliqua aliqua officia non anim. Deserunt irure ut voluptate aliquip non exercitation nisi minim id occaecat. Sit sint nulla eiusmod dolor ut nisi ipsum esse non ex cillum in incididunt sint. Ex enim dolore eiusmod cupidatat do id ea commodo excepteur cillum eiusmod ea occaecat magna. Nisi veniam amet non mollit magna ipsum eiusmod sint elit ipsum. Eiusmod dolore Lorem sunt cupidatat consectetur velit officia consectetur ullamco sint est laborum mollit eu."

    },
    {
      title:"Insurance Sales Agent6",
      key:"randomid6",
      company:"Trio insurance",
      location:"location",
      fulltime:"true",
      parttime:"false",
      remote:"false",
      salary1:"1000",
      salary2:"1500"
    },
    {
      title:"Insurance Sales Agent7.1",
      key:"randomid7.1",
      company:"Trio insurance",
      location:"location",
      fulltime:"true",
      parttime:"false",
      remote:"false",
      salary1:"1000",
      salary2:"1500"
    },
    {
      title:"Insurance Sales Agent7",
      key:"randomid7",
      company:"Trio insurance",
      location:"location",
      fulltime:"true",
      parttime:"false",
      remote:"false",
      salary1:"1000",
      salary2:"1500"
    },
    {
      title:"Insurance Sales Agent8",
      key:"randomid8",
      company:"Trio insurance",
      location:"location",
      fulltime:"true",
      parttime:"false",
      remote:"false",
      salary1:"1000",
      salary2:"1500"
    },
    {
      title:"Insurance Sales Agent9",
      key:"randomid9",
      company:"Trio insurance",
      location:"location",
      fulltime:"true",
      parttime:"false",
      remote:"false",
      salary1:"1000",
      salary2:"1500"
    },
    {
      title:"Insurance Sales Agent10",
      key:"randomid10",
      company:"Trio insurance",
      location:"location",
      fulltime:"true",
      parttime:"false",
      remote:"false",
      salary1:"1000",
      salary2:"1500"
    },
    {
      title:"Insurance Sales Agent11",
      key:"randomid11",
      company:"Trio insurance",
      location:"location",
      fulltime:"true",
      parttime:"false",
      remote:"false",
      salary1:"1000",
      salary2:"1500"
    },
    {
      title:"Insurance Sales Agent12",
      key:"randomid12",
      company:"Trio insurance",
      location:"location",
      fulltime:"true",
      parttime:"false",
      remote:"false",
      salary1:"1000",
      salary2:"1500"
    },
    {
      title:"Insurance Sales Agent13",
      key:"randomid13",
      company:"Trio insurance",
      location:"location",
      fulltime:"true",
      parttime:"false",
      remote:"false",
      salary1:"1000",
      salary2:"1500"
    }
  ];

  const routeDefinition=createRoutesFromElements(
    <Route>
      <Route path="/FindJob" element={<JobSearch joblist={joblist}/>} />
      <Route path='/Register' element={<Register></Register>} />
      <Route path='/RegisterVerification' element ={<Rgisterver/>}/>
      <Route path='/CompanyRegister' element ={<CompanyRegister/>}/>
      <Route path='/Profile' element ={<Profile/>}/>
      <Route path='/Login' element ={<Login/>}/>
      <Route path='/CompanyProfile' element ={<CompanyProfile/>}/>
      <Route path={`/CompanyPreviewProfile`} element ={<CompanyPreviewProfile/>}/>
      <Route path={`/AppliedJobs`} element ={<AppliedJobs/>}/>
      <Route path={`/AppliedUsers`} element ={<AppliedUsers/>}/>
      <Route path={`/PreviewUserProfile`} element ={<PreviewUserProfile/>}/>
      <Route path={`/Reports`} element ={<Reports/>}/>
    </Route>
  );
//   let defaul={
//     firstname:'defaull',
// lastname:'default',
// profileType:'personal',
// picture:'https://t4.ftcdn.net/jpg/03/46/93/61/360_F_346936114_RaxE6OQogebgAWTalE1myseY1Hbb5qPM.jpg',
// pdf:'',
// location:'Baghdad'
// };

  const router=createBrowserRouter(routeDefinition);
//   const [profile,setProfile]=useState({});
//   const [isLoggedIn,setIsLoggedIn]=useState(false);
// useEffect(
//   ()=>{
//
// if(isLoggedIn===true){
// localStorage.setItem('isLoggedIn','1');
// localStorage.setItem('profile',JSON.stringify(profile));
// }}
// ,[profile,isLoggedIn]);

// useEffect(()=>{
//   const storedData=localStorage.getItem('IsLoggedIn');
//   if(storedData === '1'){
//     setIsLoggedIn(true);
//     const storedProfile=localStorage.getItem('profile');
//     setProfile(JSON.parse(storedProfile));
//   }
// },[])

  return (

<RouterProvider router={router}>
  
</RouterProvider>


  );
}

export default App;
