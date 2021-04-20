import axios from 'axios';


export const createOrUpdateUser = async (authtoken) => {
  return await axios.post(
    //`${process.env.REACT_APP_APP}/create-or-update-user`,
    `${'https://boiling-refuge-53142.herokuapp.com/api'}/create-or-update-user`,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
}


export const currentUser = async (authtoken) => {
  return await axios.post(
    //`${process.env.REACT_APP_APP}/create-or-update-user`,
    `${'https://boiling-refuge-53142.herokuapp.com/api'}/current-user`,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
}


export const currentAdmin = async (authtoken) => {
  return await axios.post(
    //`${process.env.REACT_APP_APP}/create-or-update-user`,
    `${'https://boiling-refuge-53142.herokuapp.com/api'}/current-admin`,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
}