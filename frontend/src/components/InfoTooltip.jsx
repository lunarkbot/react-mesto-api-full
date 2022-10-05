import React from 'react';
import imageOk from '../images/ok.svg';
import imageErr from '../images/err.svg';

function InfoTooltip({ onClose, isOpen, isOk }) {
  return (
    <div className={`
              popup image-popup popup_animated 
              ${isOpen && 'popup_opened'}
            `} onClick={onClose}>
      <div className="popup__container popup__container_type_info">
        <img src={isOk ? imageOk : imageErr} alt={isOk ? 'Успешно' : 'Ошибка'} />
        <p className='popup__title_type_tooltip'>
          {isOk
          ? 'Вы успешно зарегистрировались!'
          : 'Что-то пошло не так! Попробуйте еще раз.'}
        </p>
        <button className="popup__close-button" type="button" onClick={onClose}></button>
      </div>
    </div>
  );
}

export default InfoTooltip;