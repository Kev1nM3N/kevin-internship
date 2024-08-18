import Home from "./pages/Home";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Explore from "./pages/Explore";
import Author from "./pages/Author";
import ItemDetails from "./pages/ItemDetails";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import { useState, useEffect } from "react";
//https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections

function App() {
  const [cards, setCards] = useState([]);

  async function getCards() {
    const fetchCards = await axios.get('https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections');
    let receiveCards = fetchCards.data;
    return receiveCards;
  }

  useEffect(() => {
    async function fetchData() {
      const receiveCards = await getCards();
      setCards(receiveCards);
    }
    fetchData();
  }, []);


  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<Home cards={cards} />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/author" element={<Author />} />
        <Route path="/item-details" element={<ItemDetails />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
