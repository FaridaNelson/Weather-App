import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import {
  getItemList,
  addItem,
  deleteItem,
  register,
  login,
  getUserInfo,
  updateProfile,
  addCardLike,
  removeCardLike,
} from "../../utils/api.js";
import "./App.css";
import { coordinates, APIkey } from "../../utils/constants.js";
import Header from "../Header/Header";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import Main from "../Main/Main";
import Footer from "../Footer/Footer.jsx";
import ItemModal from "../ItemModal/ItemModal.jsx";
import { getWeather, filterWeatherData } from "../../utils/weatherApi.js";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext.jsx";
import Profile from "../Profile/Profile.jsx";
import AddItemModal from "../AddItemModal/AddItemModal.jsx";
import ConfirmDeleteModal from "../ConfirmDeleteModal/ConfirmDeleteModal.jsx";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import { signUp, signIn, validateToken } from "../../utils/auth.js";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute.jsx";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";

function App() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
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
  const [isEditProfileModalOpen, setEditProfileModalOpen] = useState(false);
  const [isConfirmDeleteModalOpen, setConfirmDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const navigate = useNavigate();

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const closeAllModals = () => {
    setActiveModal("");
  };

  const handleOpenEditProfile = () => setEditProfileModalOpen(true);
  const handleCloseEditProfile = () => setEditProfileModalOpen(false);

  const handleAddItemModalSubmit = async ({ name, link, weatherCondition }) => {
    try {
      setIsLoading(true);

      // Must have a token for POST /items
      const token = localStorage.getItem("jwt");
      if (!token) {
        console.warn("No JWT found — redirecting to login");
        setActiveModal("login"); // or onOpenLogin()
        return;
      }

      const created = await addItem({
        name,
        imageUrl: link,
        weather: weatherCondition,
      });

      // Some APIs wrap the item in { data: ... }
      const newItem = created?.data ?? created;
      const normalizedItem = { ...newItem, _id: newItem._id ?? newItem.id };

      setClothingItems((prev) =>
        Array.isArray(prev) ? [normalizedItem, ...prev] : [normalizedItem]
      );

      // Close only on success
      closeAllModals();
    } catch (err) {
      console.error("Error adding item:", err);
      // Optional: if it’s a 401, prompt login
      if (String(err).includes("401")) setActiveModal("login");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCardDelete = async (id) => {
    try {
      setIsLoading(true);
      await deleteItem(id);

      setClothingItems((prevItems) =>
        Array.isArray(prevItems)
          ? prevItems.filter((item) => (item._id ?? item.id) !== id)
          : []
      );
      setItemToDelete(null);
      setConfirmDeleteModalOpen(false);
      setActiveModal("");
    } catch (err) {
      console.error("Error deleting item:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCardLike = async (item) => {
    try {
      const token = localStorage.getItem("jwt");
      if (!token || !currentUser?._id) {
        // not logged in — optionally open login
        setActiveModal("login");
        return;
      }

      const id = item._id;
      const likes = Array.isArray(item.likes) ? item.likes : [];
      const isLiked = likes.includes(currentUser._id);

      const updated = isLiked
        ? await removeCardLike(id)
        : await addCardLike(id);

      const updatedCard = updated?.data ?? updated;

      setClothingItems((cards) =>
        Array.isArray(cards)
          ? cards.map((c) => (c._id === id ? updatedCard : c))
          : []
      );
    } catch (err) {
      console.error("Like/unlike failed:", err);
    }
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
        setClothingItems(Array.isArray(items) ? items : items?.data ?? []);
      })
      .catch(console.error);
  }, []);

  //Check the token on initial app load
  useEffect(() => {
    const token = localStorage.getItem("jwt");

    if (!token) return;

    validateToken(token)
      .then((userData) => {
        setCurrentUser(userData?.data ?? userData);
        setIsLoggedIn(true);
      })
      .catch((error) => {
        console.error("Token validation failed:", error);
        localStorage.removeItem("jwt");
        setCurrentUser(null);
        setIsLoggedIn(false);
      });
  }, []);

  const handleToggleSwitchChange = () => {
    currentTemperatureUnit === "F"
      ? setCurrentTemperatureUnit("C")
      : setCurrentTemperatureUnit("F");
  };

  //Handle register
  async function handleRegister(formData) {
    try {
      setIsLoading(true);

      await register(formData);

      await handleLogin({ email: formData.email, password: formData.password });
    } catch (error) {
      console.error("Registrations failer", error);
    } finally {
      setIsLoading(false);
    }
  }

  //Handle login
  async function handleLogin({ email, password }) {
    try {
      setIsLoading(true);
      const payload = await login({ email, password });

      const token = payload?.token ?? payload?.data?.token;
      if (!token) throw new Error("No token in login response");

      localStorage.setItem("jwt", token); // Store the token

      const me = await getUserInfo(token);

      setCurrentUser(me.data || me);
      setIsLoggedIn(true);
      setActiveModal("");
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setIsLoading(false);
    }
  }

  // Profile editing
  async function handleEditProfileSubmit({ name, avatar }) {
    try {
      setIsLoading(true);
      const updated = await updateProfile({ name, avatar });
      const updatedUser = updated?.data ?? updated;
      setCurrentUser(updatedUser);
      setEditProfileModalOpen(false);
    } catch (err) {
      console.error("Error updating profile:", err);
    } finally {
      setIsLoading(false);
    }
  }

  // Logout
  function handleLogout() {
    localStorage.removeItem("jwt");
    setCurrentUser(null);
    setIsLoggedIn(false);
    navigate("/");
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTemperatureUnit, handleToggleSwitchChange }}
        >
          <div className="page-content">
            <Header
              onOpenLogin={() => setActiveModal("login")}
              onOpenRegister={() => setActiveModal("register")}
              handleAddClick={() => setActiveModal("add-garment")}
              weatherData={weatherData}
              user={currentUser}
              isLoggedIn={isLoggedIn}
              onProfileClick={() => navigate("/profile")}
            />
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
                      onCardLike={handleCardLike}
                    />
                  ) : (
                    <div>Loading...</div>
                  )
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Profile
                      cards={clothingItems}
                      onCardClick={handleCardClick}
                      handleCardDelete={handleCardDelete}
                      handleAddClick={() => setActiveModal("add-garment")}
                      onOpenEditProfile={handleOpenEditProfile}
                      onLogout={handleLogout}
                      onCardLike={handleCardLike}
                    />
                  </ProtectedRoute>
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
            isOpen={isConfirmDeleteModalOpen}
            onClose={() => {
              setConfirmDeleteModalOpen(false);
              setItemToDelete(null);
            }}
            buttonText={isLoading ? "Deleting..." : "Delete"}
            onConfirm={() => {
              itemToDelete?._id && handleCardDelete(itemToDelete._id);
              setConfirmDeleteModalOpen(false);
              setSelectedCard(null);
            }}
          />
          {activeModal === "register" && (
            <RegisterModal
              isOpen={activeModal === "register"}
              onClose={closeAllModals}
              onRegister={handleRegister}
              onOpenLogin={() => setActiveModal("login")}
            />
          )}
          {activeModal === "login" && (
            <LoginModal
              isOpen={activeModal === "login"}
              onClose={closeAllModals}
              onLogin={handleLogin}
              onOpenRegister={() => setActiveModal("register")}
            />
          )}
          <EditProfileModal
            isOpen={isEditProfileModalOpen}
            onClose={handleCloseEditProfile}
            onSubmit={handleEditProfileSubmit}
            isLoading={isLoading}
          />
        </CurrentTemperatureUnitContext.Provider>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
