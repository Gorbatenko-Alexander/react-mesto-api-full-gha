import logo from "../images/logo.svg";
import React from "react";
import {useNavigate} from "react-router-dom";

function Login(props) {
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
        <a className="header__text header__text_hover" href='/sign-up' onClick={(evt) => {evt.preventDefault(); navigate('/sign-up');}}>Регистрация</a>
      </header>
      <div className='auth-page auth-page_opened'>
        <div className="auth-page__container">
          <h2 className="auth-page__title">Вход</h2>
          <form action="#" name="registration" className="auth-page__fields" onSubmit={handleSubmit}>
            <label className="auth-page__input-container">
              <input value={email} type="email" id="profile-name" name="name" className="auth-page__field" placeholder="Email"
                     required onChange={handleEmailChange}/>
              <span className="auth-page__error-message"></span>
            </label>
            <label className="auth-page__input-container">
              <input value={password} type="password" id="profile-about" name="about" className="auth-page__field" placeholder="Пароль"
                     required onChange={handlePasswordChange}/>
              <span className="auth-page__error-message"></span>
            </label>
            <button type="submit" className='auth-page__submit-button'>Войти</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
