
import {BrowserRouter , Routes , Route} from "react-router-dom";
import Home from "./pages/Home/index.js";
import Login from "./pages/Login/index.js";
import Register from "./pages/Register/index.js";

function App() {
  return (
   <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login/" element={<Login />} />
      <Route path="/register/" element={<Register />} />
    </Routes>
   </BrowserRouter>
  );
}

export default App;
