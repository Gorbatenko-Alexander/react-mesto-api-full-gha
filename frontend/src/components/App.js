import React from 'react';
import {Route, Routes, useNavigate} from "react-router-dom"

import {CurrentUserContext} from '../contexts/CurrentUserContext';
import {api} from "../utils/Api";
import {auth} from "../utils/Auth"

import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import AddPlacePopup from "./AddPlacePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import Register from "./Register"
import Login from "./Login"
import InfoTooltip from "./InfoTooltip";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [isRegError, setIsRegError] = React.useState(false);
  const [headerEmail, setHeaderEmail] = React.useState('');

  const navigate = useNavigate();

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleUpdateUser(userInfo) {
    api.changeUserInfo(userInfo)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error)
      });
  }

  function handleUpdateAvatar(userInfo) {
    api.changeUserAvatar(userInfo)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error)
      });
  }

  function handleAddPlaceSubmit(placeInfo) {
    api.addCard(placeInfo)
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error)
      });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(like => like === currentUser._id);

    api.changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((error) => {
        console.log(error)
      });
  }

  function handleCardDelete(card) {
    const isOwn = card.owner === currentUser._id;

    isOwn && api.deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter(c => c._id !== card._id));
      })
      .catch((error) => {
        console.log(error)
      });
  }

  function handleRegisterSubmit(password, email) {
    auth.register(password, email)
      .then((res) => {
        setIsRegError(false); // Значения передавались как строки, исправил
        navigate("/sign-in");
      })
      .catch((error) => {
        setIsRegError(true); // Значения передавались как строки, исправил
        console.log(error);
      })
      .finally(() => {
        setIsInfoTooltipOpen(true);
      });
  }

  function handleLoginSubmit(password, email) {
    auth.authorise(password, email)
      .then((res) => {
        localStorage.setItem('jwt', res.token);
        checkToken();
      })
      .catch((error) => {
        setIsRegError(true);
        setIsInfoTooltipOpen(true);
        console.log(error);
      });
  }

  function handleLogout() {
    localStorage.setItem('jwt', '');
  }

  function checkToken() {
    const jwt = localStorage.getItem('jwt');
    jwt && auth.checkToken(jwt)
      .then((res) => {
        api.headers.Authorization = 'Bearer ' + jwt;
        setHeaderEmail(res.email);
      })
      .then(() => {
        return api.getInitialCards()
          .then((res) => {
            setCards(res.toReversed());
          })
      })
      .then(() => {
        return api.getUserInfo()
          .then((res) => {
            setCurrentUser(res);
            setIsLoggedIn(true);
            navigate('/');
          })
      })
      .catch((error) => {
        setIsRegError(true);
        setIsInfoTooltipOpen(true);
        console.log(error);
      });
  }

  React.useEffect(() => {
    checkToken();
  }, []);

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({});
    setIsInfoTooltipOpen(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <div className="page">
          <Routes>
            <Route path='/' element={<ProtectedRoute element={() => {return (
              <>
                <Header email={headerEmail} onLogout={handleLogout}/>
                <Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick}
                      onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick} cards={cards}
                      onCardLike={handleCardLike} onCardDelete={handleCardDelete}/>
                <Footer/>
              </>
            )}} isLoggedIn={isLoggedIn}/>}/>
            <Route path='/sign-up' element={<Register handleSubmit={handleRegisterSubmit}/>}/>
            <Route path='/sign-in' element={<Login handleSubmit={handleLoginSubmit}/>}/>
          </Routes>
          <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}
                            onUpdateUser={handleUpdateUser}/>
          <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit}/>
          <ImagePopup card={selectedCard} onClose={closeAllPopups}/>
          <PopupWithForm title="Вы уверены?" name="confirm" onClose={closeAllPopups} buttonSubmitText='Да'/>
          <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}
                           onUpdateAvatar={handleUpdateAvatar}/>
          <InfoTooltip isRegFail={isRegError} isOpen={isInfoTooltipOpen} onClose={closeAllPopups}/>
        </div>
      </div>
    </CurrentUserContext.Provider>
  )
}

export default App;
