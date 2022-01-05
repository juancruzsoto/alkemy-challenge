import React from 'react';
import Login from "../components/Login";

function LoginView(props) {
    return (
      <div>
        <Login {...props} />
      </div>
    );
  }
  
  export default LoginView;