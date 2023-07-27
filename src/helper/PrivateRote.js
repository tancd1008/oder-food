import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRote = ({page, children}) => {
  const user = JSON.parse(sessionStorage.getItem('user'));
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