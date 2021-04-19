import axios from 'axios';


export const createOrUpdateUser = async(authtoken) =>{
    return await axios.post(        
    //`${process.env.REACT_APP_APP}/create-or-update-user`,
    `${'http://localhost:8000/api'}/create-or-update-user`,
    {},  
    {
     headers:{
            authtoken,
     },
    }
  );
}


export const currentUser = async(authtoken) => {
    return await axios.post(        
    //`${process.env.REACT_APP_APP}/create-or-update-user`,
    `${'http://localhost:8000/api'}/current-user`,
    {},  
    {
     headers:{
            authtoken,
     },
    }
  );
}


export const currentAdmin = async(authtoken) => {
  return await axios.post(        
  //`${process.env.REACT_APP_APP}/create-or-update-user`,
  `${'http://localhost:8000/api'}/current-admin`,
  {},  
  {
   headers:{
          authtoken,
   },
  }
);
}