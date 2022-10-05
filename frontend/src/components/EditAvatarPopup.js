import PopupWithForm from "./PopupWithForm";
import {useRef, useEffect} from "react";

export default function EditAvatarPopup(props) {
  const inputRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar(
      inputRef.current.value,
      e
    )
  }

  useEffect(() => {
    if (!props.isOpen) {
      inputRef.current.value='';
    }
  }, [props.isOpen])

  return(
    <PopupWithForm
      title="Обновить аватар"
      type="avatar"
      buttonText="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      animationClass={props.animationClass}
    >
      <label className="form__field form__field_last">
        <input type="url"
               name="avatar-url"
               id="avatar-input"
               ref={inputRef}
               placeholder="Ссылка на картинку"
               required
               className="form__text-input form__text-input_type_photo-link"/>
        <span className="avatar-input-error form__input-error">Проверка</span>
      </label>
    </PopupWithForm>
  );
}