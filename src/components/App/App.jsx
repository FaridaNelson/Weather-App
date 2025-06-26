import { useState } from "react";
import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { getItemList, addItem, deleteItem } from "../../utils/api.js";
import "./App.css";
import { coordinates, APIkey } from "../../utils/constants.js";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer.jsx";
import ItemModal from "../ItemModal/ItemModal.jsx";
import { getWeather, filterWeatherData } from "../../utils/weatherApi.js";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext.jsx";
import Profile from "../Profile/Profile.jsx";
import AddItemModal from "../AddItemModal/AddItemModal.jsx";
import ConfirmDeleteModal from "../ConfirmDeleteModal/ConfirmDeleteModal.jsx";
import React from "react";

function App() {
  const [isLoading, setIsLoading] = React.useState(false);

  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
    condition: "",
    isDay: false,
  });
  const [clothingItems, setClothingItems] = useState([]);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [confirmDeleteModalOpen, setConfirmDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };
  const handleAddClick = () => {
    console.log("Add item button clicked!");
    setActiveModal("add-garment");
  };

  const closeAllModals = () => {
    setActiveModal("");
  };

  const handleAddItemModalSubmit = ({ name, link, weatherCondition }) => {
    setIsLoading(true);
    addItem({ name, imageUrl: link, weather: weatherCondition })
      .then((newItem) => {
        const normalizedItem = { ...newItem, _id: newItem._id || newItem.id };
        setClothingItems((prevItems) => [normalizedItem, ...prevItems]);
        closeAllModals();
      })
      .catch((err) => {
        console.error("Error adding item:", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleCardDelete = (id) => {
    setIsLoading(true);
    deleteItem(id)
      .then(() => {
        setClothingItems((prevItems) =>
          prevItems.filter((item) => item._id !== id)
        );
        closeAllModals();
      })
      .catch((err) => console.error("Error deleting item:", err))
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (!activeModal) return; // stop the effect not to add the listener if there is no active modal

    const handleEscClose = (e) => {
      // define the function inside useEffect not to lose the reference on rerendering
      if (e.key === "Escape") {
        closeAllModals();
      }
    };

    document.addEventListener("keydown", handleEscClose);

    return () => {
      // don't forget to add a clean up function for removing the listener
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [activeModal]); // watch activeModal here

  useEffect(() => {
    if (coordinates.latitude && coordinates.longitude) {
      getWeather(coordinates, APIkey)
        .then((data) => {
          const filteredData = filterWeatherData(data);
          setWeatherData(filteredData);
        })
        .catch(console.error);
    }
  }, []);

  useEffect(() => {
    getItemList()
      .then((items) => {
        setClothingItems(items);
      })
      .catch(console.error);
  }, []);

  const handleToggleSwitchChange = () => {
    currentTemperatureUnit === "F"
      ? setCurrentTemperatureUnit("C")
      : setCurrentTemperatureUnit("F");
  };

  return (
    <div className="page">
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="page-content">
          <Header handleAddClick={handleAddClick} weatherData={weatherData} />
          <Routes>
            <Route
              path="/"
              element={
                weatherData.temp?.F !== 999 ? (
                  <Main
                    weatherData={weatherData}
                    clothingItems={clothingItems}
                    handleCardDelete={handleCardDelete}
                    onCardClick={handleCardClick}
                  />
                ) : (
                  <div>Loading...</div>
                )
              }
            />
            <Route
              path="/profile"
              element={
                <Profile
                  cards={clothingItems}
                  onCardClick={handleCardClick}
                  handleCardDelete={handleCardDelete}
                  handleAddClick={() => setActiveModal("add-garment")}
                />
              }
            />
          </Routes>
          <Footer />
        </div>
        <AddItemModal
          isOpen={activeModal === "add-garment"}
          onClose={closeAllModals}
          onAddItemModalSubmit={handleAddItemModalSubmit}
          buttonText={isLoading ? "Saving..." : "Add garment"}
        />
        <ItemModal
          activeModal={activeModal}
          card={selectedCard}
          onClose={closeAllModals}
          setConfirmDeleteModalOpen={setConfirmDeleteModalOpen}
          setItemToDelete={setItemToDelete}
        />
        <ConfirmDeleteModal
          isOpen={confirmDeleteModalOpen}
          onClose={() => setConfirmDeleteModalOpen(false)}
          buttonText={isLoading ? "Deleting..." : "Delete"}
          onConfirm={() => {
            handleCardDelete(itemToDelete._id);
            setConfirmDeleteModalOpen(false);
            setSelectedCard(null);
          }}
        />
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
