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
  const [newItemsCards, setNewItemsCards] = useState([]);

  async function getCards() {
    const fetchCards = await axios.get('https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections');
    let receiveCards = fetchCards.data;
    return receiveCards;
  }

  async function getNewItems (){
    const fetchNewItems = await axios.get('https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems')
    let receiveNewItems = fetchNewItems.data
    return receiveNewItems
  }

  useEffect(() => {
    async function fetchData() {
      const receiveCards = await getCards();
      const receiveNewItems = await getNewItems();
      setCards(receiveCards);
      setNewItemsCards(receiveNewItems);
    }
    fetchData();
  }, []);


  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<Home cards={cards} newItemsCards={newItemsCards} />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/author" element={<Author />} />
        <Route path="/item-details/:nftId" element={<ItemDetails />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
