import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Header from "./Header";
import Footer from "./Footer";
import About from "./About";
import Shop from "./Shop";
import Login from "./Login";
import Cards from "./Cards";
import Contact from "./Contact";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/card" element={<Cards />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
