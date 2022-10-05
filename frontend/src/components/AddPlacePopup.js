import PopupWithForm from "./PopupWithForm";
import {useState, useEffect} from "react";

export default function AddPlacePopup(props) {
  const [value, setValue] = useState({
    name: '',
    link: ''
  })

  function handleChange(e) {
    setValue({
      ...value,
      [e.target.name]: e.target.value
    })
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.onAddPlace(value, e)
  }

  useEffect(() => {
    if (!props.isOpen) {
        setValue({
          name: '',
          link: ''
        })
    }
  }, [props.isOpen])

  return(
    <PopupWithForm
      title="Новое место"
      type="card"
      buttonText="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      animationClass={props.animationClass}
    >
      <label className="form__field">
        <input type="text"
               name="name"
               id="photo-name-input"
               placeholder="Название"
               required
               minLength="2"
               maxLength="30"
               value={value.name}
               onChange={handleChange}
               className="form__text-input form__text-input_type_photo-name"/>
        <span className="photo-name-input-error form__input-error">Проверка</span>
      </label>
      <label className="form__field form__field_last">
        <input type="url"
               name="link"
               id="photo-link-input"
               placeholder="Ссылка на картинку"
               required
               value={value.link}
               onChange={handleChange}
               className="form__text-input form__text-input_type_photo-link"/>
        <span className="photo-link-input-error form__input-error">Проверка</span>
      </label>
    </PopupWithForm>
  );
}