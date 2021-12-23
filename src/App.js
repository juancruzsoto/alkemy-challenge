import "./App.css";
import { BrowserRouter as Router, Routes,Route,Navigate } from "react-router-dom";
import LoginView from "./views/LoginView";
import HomeView from "./views/HomeView";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  const auth = false

  return (
    <Router>
      <Routes>
      <Route exact path="/" element={auth ? <HomeView /> : <Navigate to="/login"/>} />
      <Route exact path="/login" element={auth ? <Navigate to="/"/> : <LoginView />} />
      </Routes>
    </Router>
  );
}

export default App;
