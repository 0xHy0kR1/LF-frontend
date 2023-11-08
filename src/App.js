import './App.css';
import { 
  BrowserRouter, 
  Routes, 
  Route
} from "react-router-dom";
import FoundItems from './pages/FoundItems'
import Home from './pages/Home'
import ItemDetails from './pages/ItemDetails'
import LostItems from './pages/LostItems'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/lost" element={<LostItems />}></Route>
        <Route path="/found" element={<FoundItems />}></Route>
        <Route path="/item/:id" element={<ItemDetails />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
