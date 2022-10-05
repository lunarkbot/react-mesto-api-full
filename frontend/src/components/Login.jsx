import React, {useEffect, useState} from 'react';
import auth from '../utils/auth';
import {withRouter} from 'react-router-dom';
import InfoTooltip from './InfoTooltip';

function Login(props) {

  const [userData, setUserData] = useState({
    email: '',
    password: ''
  });

  const [isOpen, setIsOpen] = useState(false);

  function handleClose() {
    setIsOpen(false);
  }

  function handleSubmit(e) {
    e.preventDefault();

    auth.signIn(userData)
      .then(data => {
        if (data.token) {
          localStorage.setItem('token', data.token);
          props.onLogin(userData.email);
          props.history.push('/');
        }
      })
      .catch(err => {
        setIsOpen(true);
        console.log('%c' + err, 'color: #dd3333');
      })
  }

  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;

    setUserData({
      ...userData,
      [name]: value
    })
  }

  return (
    <>
      <main className="content content_type_second">
        <h2 className={`popup__title popup__title_type_page`}>Вход</h2>
        <form className="form" name="login" onSubmit={handleSubmit}>
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
                  className="form__submit-button form__submit-button_type_inverted">Войти
          </button>
        </form>
      </main>
      <InfoTooltip isOk={false} isOpen={isOpen} onClose={handleClose} />
    </>
  );
}

export default withRouter(Login);