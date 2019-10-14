import React from "react";

const Splash = () => {
  return (
      <button id="github_button" onClick={()=>location.href='http://localhost:8080/oauth/github'}>Github Login</button>
  )
}

export default Splash