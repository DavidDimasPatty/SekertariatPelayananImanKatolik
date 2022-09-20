
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Home from './components/home'
import Login from './components/login'
import KegiatanUmum from "./components/kegiatanUmum";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/kegiatanumum" element={<KegiatanUmum />} />
      </Routes>
    </Router>
  );
}

export default App;
