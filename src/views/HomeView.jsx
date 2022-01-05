import React from "react";
import Home from "../components/Home";
import NavBar from "../components/NavBar";

function HomeView(props) {
  return (
    <div class="container">
      <div class="header">
        <NavBar  {...props}/>
      </div>
      <div class="content">
        <Home {...props}/>
      </div>
    </div>
  );
}

export default HomeView;
