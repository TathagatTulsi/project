import React from 'react'

function Header() {
  const token = localStorage.getItem("token");
  
  const headers = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return headers;
}


export default Header