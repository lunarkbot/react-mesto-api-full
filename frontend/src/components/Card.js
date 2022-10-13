import {useContext} from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

export default function Card( { onCardClick, onCardLike, onCardDelete, card } ) {
  const currentUser = useContext(CurrentUserContext);

  function handleClick() {
    onCardClick(card.link, card.name)
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  const isOwn = card.owner === currentUser._id;

  const isLiked = card.likes.some(i => i === currentUser._id);

  return(
    <li className="photo-grid__item">
      <div className="photo-grid__photo-wrap">
        <img src={card.link}
             className="photo-grid__photo"
             alt={card.name}
             onClick={handleClick}
        />
        {isOwn && <button
                    type="button"
                    className="photo-grid__trash-button"
                    onClick={handleDeleteClick}></button>}
      </div>
      <div className="photo-grid__caption">
        <h2 className="photo-grid__title">{card.name}</h2>
        <div className="likes-counter">
          <button
            className={
            `likes-counter__button ${isLiked && 'likes-counter__button_checked'}`
            }
            type="button"
            onClick={handleLikeClick}
          ></button>
          <span className="likes-counter__result">{card.likes.length}</span>
        </div>
      </div>
    </li>
  );
}