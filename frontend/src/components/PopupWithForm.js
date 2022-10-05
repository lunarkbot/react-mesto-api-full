export default function PopupWithForm(props) {
  return(
    <div
      className={`
          popup ${props.type}-popup 
          ${props.isOpen === true && 'popup_opened'}
          ${props.animationClass}
        `}
      onClick={props.onClose}
    >
      <div className={`popup__container popup__container_type_${props.type}`}>
        <h2 className={`popup__title popup__title_type_${props.type}`}>{props.title}</h2>
        <form className="form" name={props.type} onSubmit={props.onSubmit}>
          {props.children}
          <button type="submit"
                  className="form__submit-button">{props.buttonText}
          </button>
        </form>
        <button className="popup__close-button" type="button" onClick={props.onClose}></button>
      </div>
    </div>
  )
}