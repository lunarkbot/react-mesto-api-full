import React, {useState} from 'react';
import {NavLink, withRouter, Link} from 'react-router-dom';
import auth from '../utils/auth';
import InfoTooltip from './InfoTooltip';

function Register(props) {
  const [userData, setUserData] = useState({
    email: '',
    password: ''
  });

  const [tooltip, setTooltip] = useState({
    isOpen: false,
    isOk: false,
    isConfirm: false,
  })

  function handleClose() {
    setTooltip({
      ...tooltip,
      isOpen: false
    });

    if (tooltip.isOk) {
      props.history.push('/sign-in');
    }
  }

  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;

    setUserData({
      ...userData,
      [name]: value
    })
  }

  function handleSubmit(e) {
    e.preventDefault();
    auth.signUp(userData)
      .then(() => {
        setTooltip({
          ...tooltip,
          isOpen: true,
          isOk: true
        });
      })
      .catch(err => {
        console.log('%c' + err, 'color: #dd3333');
        setTooltip({
          ...tooltip,
          isOpen: true,
          isOk: false
        });
      })
  }

  return (
    <>
      <main className="content content_type_second">
        <h2 className={`popup__title popup__title_type_page`}>Регистрация</h2>
        <form className="form" name="register" onSubmit={handleSubmit}>
          <label className="form__field">
            <input type="text"
                   name="email"
                   id="email-input"
                   placeholder="Email"
                   required
                   minLength="2"
                   maxLength="40"
                   onChange={handleChange}
                   value={userData.email}
                   className="form__text-input form__text-input_type_name form__text-input_type_inverted"/>
          </label>
          <label className="form__field form__field_last">
            <input type="password"
                   name="password"
                   id="password-input"
                   placeholder="Пароль"
                   required
                   minLength="2"
                   maxLength="200"
                   onChange={handleChange}
                   value={userData.password}
                   className="form__text-input form__text-input_type_job form__text-input_type_inverted"/>
          </label>
          <button type="submit"
                  className="form__submit-button form__submit-button_type_inverted">Зарегистрироваться
          </button>
          <div className="form__link-wrap">Уже зарегистрированы? <NavLink to="/sign-in" className="form__link">Войти</NavLink></div>
        </form>
      </main>
      <InfoTooltip isOk={tooltip.isOk} isOpen={tooltip.isOpen} onClose={handleClose} />
    </>
  );
}

export default withRouter(Register);