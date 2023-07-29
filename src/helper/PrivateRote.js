import React from 'react';
import { Navigate } from 'react-router-dom';
import { getUserDataFromSessionStorage } from '../services/encode';

const PrivateRote = ({page, children}) => {
  const user = getUserDataFromSessionStorage();
  if (page === "LOGIN") {
    if (user ) {
      return <Navigate to={"/"} />
    }
  } else if (page === "ADMIN"){
    if (!user) {
      return <Navigate to={"/auth/login"} />
    }
  }
  return children
}

export default PrivateRote