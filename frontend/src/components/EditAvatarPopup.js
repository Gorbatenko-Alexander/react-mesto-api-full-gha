import React from 'react';
import PopupWithForm from "./PopupWithForm";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function EditAvatarPopup(props) {
  const avatarLinkRef = React.useRef();
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    avatarLinkRef.current.value = currentUser.avatar;
  }, [currentUser, props.isOpen])

  function handleSubmit(evt) {
    evt.preventDefault();

    props.onUpdateAvatar({
      avatar: avatarLinkRef.current.value,
    });
  }

  return (
    <PopupWithForm title="Обновить аватар" name="change-avatar" isOpen={props.isOpen} onClose={props.onClose} buttonSubmitText='Сохранить' onSubmit={handleSubmit}>
      <label className="popup__input-container">
        <input ref={avatarLinkRef} type="url" id="avatar-link" name="avatar" className="popup__field" placeholder="Ссылка на картинку" required/>
        <span className="avatar-link-error popup__error-message"></span>
      </label>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
