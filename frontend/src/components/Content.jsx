import React, {useEffect, useRef, useState} from 'react';
import Main from "./Main";
import api from '../utils/api';
import { CurrentUserContext } from "../contexts/CurrentUserContext";

import EditProfilePopup from './EditProfilePopup';
import AddPlacePopup from './AddPlacePopup';
import EditAvatarPopup from './EditAvatarPopup';
import ConfirmDeletion from './ConfirmDeletion';
import ImagePopup from './ImagePopup';

function Content(props) {
  const avatarRef = useRef();

  const [cards, setCards] = useState([]);

  const [cardToDelete, setCardToDelete] = useState(null);

  const [animationClass, setAnimationClass] = useState('');

  const [isOpen, setIsOpen] = useState({
    isEditProfilePopupOpen: false,
    isAddPlacePopupOpen: false,
    isEditAvatarPopupOpen: false,
    isConfirmationPopupOpen: false,
  })

  const [currentUser, setCurrentUser] = useState({
    name: 'Жак-Ив Кусто',
    about: 'Исследователь океана',
    avatar: false,
  });

  const [selectedCard, setSelectedCard] = useState({
    isOpen: false,
    link: null
  });


  function handleEditAvatarClick() {
    setIsOpen({
      ...isOpen,
      isEditAvatarPopupOpen: true
    });
  }

  function handleEditProfileClick() {
    setIsOpen({
      ...isOpen,
      isEditProfilePopupOpen: true
    });
  }

  function handleAddPlaceClick() {
    setIsOpen({
      ...isOpen,
      isAddPlacePopupOpen: true
    });
  }

  function handleCardClick(link, name) {
    setSelectedCard({
      isOpen: true,
      link: link,
      name: name,
    });
  }

  function closeAllPopups(e) {
    if (e.target.classList.contains('popup')
      || e.target.classList.contains('popup__close-button')
      || e.type === 'submit') {

      setIsOpen({
        isEditProfilePopupOpen: false,
        isAddPlacePopupOpen: false,
        isEditAvatarPopupOpen: false,
        isConfirmationPopupOpen: false,
      })

      setSelectedCard({
        link: null,
        name: null,
        isOpen: false,
      });
    }
  }

  function handleUpdateUser(user, form) {
    api.setUserData(user.name, user.about)
      .then(res => {
        setCurrentUser({
          ...currentUser,
          name: res.name,
          about: res.about
        })
        closeAllPopups(form)
      })
      .catch(err => console.log(err))
  }

  function handleUpdateAvatar(avatar, form) {
    api.setAvatar(avatar)
      .then((res) => {
        avatarRef.current.src = res.avatar;
        closeAllPopups(form);
      })
      .catch(err => console.log(err))
  }

  function handleCardLike(card) {

    const isLiked = card.likes.some(i => i === currentUser._id);
    api.updateLikes(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => {
          return c._id === card._id ? newCard : c;
        }));
      })
      .catch(err => console.log(err));
  }

  function handleConfirmation(card) {
    setIsOpen({
      ...isOpen,
      isConfirmationPopupOpen: true
    });
    setCardToDelete(card);
  }

  function handleCardDelete(form) {
    api.deleteCard(cardToDelete._id)
      .then((res) => {
        setCards((state) => state.filter((c) => {
          return c._id !== cardToDelete._id;
        }))
        setCardToDelete(null);
        closeAllPopups(form)
      })
      .catch(err => console.log(err));
  }

  function handleAddPlace(card, form) {
    api.addCard(card.name, card.link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups(form);
      })
      .catch(err => console.log(err));
  }

  useEffect(() => {
    api.getCards()
      .then(cards => setCards([...cards].reverse()))
      .catch(err => console.log(err));

    api.getUserData()
      .then(userInfo => {
        setCurrentUser({
          ...userInfo
        })
      })
      .catch(err => console.log(err));
  },[])

  useEffect(() => {
    setAnimationClass(' popup_animated');
  }, [currentUser])

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Main
        onEditAvatar={handleEditAvatarClick}
        onAddPlace={handleAddPlaceClick}
        onEditProfile={handleEditProfileClick}
        onCardClick={handleCardClick}
        selectedCard={selectedCard}
        avatarRef={avatarRef}
        cards={cards}
        onCardLike={handleCardLike}
        onCardDelete={handleConfirmation}
      />

      <EditProfilePopup
        isOpen={isOpen.isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
        animationClass={animationClass}
      ></EditProfilePopup>

      <AddPlacePopup
        isOpen={isOpen.isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlace}
        animationClass={animationClass}
      ></AddPlacePopup>

      <EditAvatarPopup
        isOpen={isOpen.isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
        animationClass={animationClass}
      ></EditAvatarPopup>

      <ConfirmDeletion
        isOpen={isOpen.isConfirmationPopupOpen}
        onClose={closeAllPopups}
        animationClass={animationClass}
        onConfirmClick={handleCardDelete}
      ></ConfirmDeletion>

      <ImagePopup onClose={closeAllPopups} card={selectedCard} animationClass={animationClass} />
    </CurrentUserContext.Provider>
  );
}

export default Content;