import "./App.css";
import { BrowserRouter as Router, Routes,Route,Navigate } from "react-router-dom";
import LoginView from "./views/LoginView";
import HomeView from "./views/HomeView";
import 'bootstrap/dist/css/bootstrap.min.css';
import LoadScreen from "./components/LoadScreen"
import { useEffect, useState } from "react";

function App() {

  const [loading, setLoading] = useState(true);
  const [auth, setAuth] = useState(false);

useEffect(() => {
  const loggedUser = localStorage.getItem("token")
  if (loggedUser){
    setAuth(true)
  }
  else {
    setAuth(false)
  }
  setLoading(false)

}, [])



console.log(auth)
  return (
    <Router>
      <Routes>
      <Route exact path="/" element={auth ? <HomeView setAuth={setAuth} /> :  (loading ? <LoadScreen/> :<Navigate to="/login"/>)} />
      <Route exact path="/login" element={auth ? (loading ? <LoadScreen/> :<Navigate to="/"/>) : <LoginView setAuth={setAuth} />} />
      </Routes>
    </Router>
  );
}

export default App;
