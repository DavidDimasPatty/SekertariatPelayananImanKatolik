
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Home from './components/home'
import Login from './components/login'
import KegiatanUmum from "./components/kegiatanUmum";
import EditKegiatan from "./components/editKegiatan";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/kegiatanumum" element={<KegiatanUmum />} />
        <Route exact path="/editkegiatan/:id" element={<EditKegiatan/>} />
      </Routes>
    </Router>
  );
}

export default App;
