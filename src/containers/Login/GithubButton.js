import "./GithubButton.css";

import React from 'react';

const GithubButton = ( {onClick} ) =>{
  const style = {
    github:{
      width: "80px",
      height: "80px",
      borderRadius: "50%",
      padding: 0,
      transition: "all .3s",
    },
    button: {
      padding: 0,
      border: "none",
      cursor: "pointer",
      backgroundColor: "white",
      transition: "all .3s",
    }
  }
  return(
    <div>
        <button onClick={() => {
          onClick();
        }} className="github" style={style.button}>
          <img className="github" style={style.github} src="./github.svg" alt={"img"}/>
          <h3>LOGIN</h3>
        </button>

    </div>
  );
}

export default GithubButton;
