import {useContext} from "react";
import avatarDefault from '../images/avatar.png';
import Card from "./Card";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

export default function Main(props) {
  const currentUser = useContext(CurrentUserContext);
  return(
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-wrap">
          <img
            className="profile__avatar"
            ref={props.avatarRef}
            src={currentUser.avatar ? currentUser.avatar : avatarDefault}
            alt="Аватар"
            onClick={props.onEditAvatar} />
        </div>
        <div className="profile__info">
          <div className="profile__name-wrap">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button className="profile__edit-button" type="button" onClick={props.onEditProfile}></button>
          </div>
          <p className="profile__job">{currentUser.about}</p>
        </div>
        <button className="profile__add-button" type="button" onClick={props.onAddPlace}></button>
      </section>
      <section className="photo-grid" aria-label="Секция с фотографиями">
        <ul className="photo-grid__list">
          {props.cards.map(card => {
            return <Card
                      key={card._id}
                      card={card}
                      onCardLike={props.onCardLike}
                      onCardClick={props.onCardClick}
                      onCardDelete={props.onCardDelete}
            />
          })}
        </ul>
      </section>
    </main>
  )
}