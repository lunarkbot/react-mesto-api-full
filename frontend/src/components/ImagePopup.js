export default function ImagePopup(props) {
  return(
    <div className={`
              popup image-popup 
              ${props.card.isOpen && 'popup_opened'}
              ${props.animationClass}
            `} onClick={props.onClose}>
      <div className="popup__container popup__container_type_open-photo">
        <figure className="popup__figure">
          <img src={props.card.link}
               alt={props.card.name}
               className="popup__photo"/>
          <figcaption className="popup__caption">{props.card.name}</figcaption>
        </figure>
        <button className="popup__close-button" type="button" onClick={props.onClose}></button>
      </div>
    </div>
  );
}