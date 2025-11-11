import { BrowserRouter as Router,Route,Routes} from "react-router-dom";
import { Home } from "./Pages/Home";
import {About} from "./Pages/About";
import { Login } from "./Pages/Login";


function App() {

  return (
   <Router>
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/about" element={<About />}></Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>  
    </Router>
  );
}

export default App;