import React from 'react';
import PopupWithForm from "./PopupWithForm";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen])

  function handleNameChange(evt) {
    setName(evt.target.value)
  }

  function handleDescriptionChange(evt) {
    setDescription(evt.target.value)
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm title="Редактировать профиль" name="edit-profile" isOpen={props.isOpen} onClose={props.onClose}
                   onSubmit={handleSubmit} buttonSubmitText='Сохранить'>
      <label className="popup__input-container">
        <input type="text" id="profile-name" name="name" className="popup__field" placeholder="Имя" required
               minLength="2" maxLength="30" value={name || ''} onChange={handleNameChange}/>
        <span className="profile-name-error popup__error-message"></span>
      </label>
      <label className="popup__input-container">
        <input type="text" id="profile-about" name="about" className="popup__field" placeholder="О себе" required
               minLength="2" maxLength="30" value={description || ''} onChange={handleDescriptionChange} />
        <span className="profile-about-error popup__error-message"></span>
      </label>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
