import React from 'react';
import success from '../images/success.svg'
import error from '../images/error.svg'

function InfoTooltip(props) {
  return (
    <div className={`popup ${props.isOpen ? 'popup_opened' : ''}`}>

      <div className="popup__container">
        <button type="button" className="popup__exit" onClick={props.onClose}></button>
        <img src={props.isRegFail ? error : success} alt={props.isRegFail ? "Ошибка" : "Успешная регистрация"}
             className="popup__status-img"/>
        <p className="popup__status-text">
          {props.isRegFail ? 'Что-то пошло не так! Попробуйте ещё раз.' : 'Вы успешно зарегистрировались!'}
        </p>
      </div>
    </div>
  );
}

export default InfoTooltip;
