import React from 'react';
import logo from "../images/logo.svg";
import {useNavigate} from "react-router-dom";

function Register(props) {
  const [password, setPassword] = React.useState('');
  const [email, setEmail] = React.useState('');
  const navigate = useNavigate();

  function handlePasswordChange(evt) {
    setPassword(evt.target.value)
  }

  function handleEmailChange(evt) {
    setEmail(evt.target.value)
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    props.handleSubmit(password, email);
  }

  // Исправил value в инпутах, поменял навигацию на useNavigate

  return (
    <div className='page'>
      <header className="header">
        <img src={logo} alt="Место" className="header__logo"/>
        <a className="header__text header__text_hover" href='/sign-in' onClick={(evt) => {evt.preventDefault(); navigate('/sign-in');}}>Войти</a>
      </header>
      <div className='auth-page auth-page_opened'>
        <div className="auth-page__container">
          <h2 className="auth-page__title">Регистрация</h2>
          <form action="#" name="registration" className="auth-page__fields" onSubmit={handleSubmit}>
            <label className="auth-page__input-container">
              <input value={email} type="email" id="profile-name" name="email" className="auth-page__field" placeholder="Email"
                     required onChange={handleEmailChange}/>
              <span className="auth-page__error-message"></span>
            </label>
            <label className="auth-page__input-container">
              <input value={password} type="password" id="profile-about" name="password" className="auth-page__field" placeholder="Пароль"
                     minLength="8" required onChange={handlePasswordChange}/>
              <span className="auth-page__error-message"></span>
            </label>
            <button type="submit" className='auth-page__submit-button'>Зарегистрироваться</button>
          </form>
          <p className='auth-page__text'>Уже зарегистрированы? <a href='/sign-in' className='auth-page__link' onClick={(evt) => {evt.preventDefault(); navigate('/sign-in');}}>Войти</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
