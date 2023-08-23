import React from 'react';
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

  React.useEffect(() => {
    setName('');
    setLink('');
  }, [props.isOpen])

  function handleNameChange(evt) {
    setName(evt.target.value)
  }

  function handleLinkChange(evt) {
    setLink(evt.target.value)
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    props.onAddPlace({name, link})
  }

  return (
    <PopupWithForm title="Новое место" name="add-place" isOpen={props.isOpen} onClose={props.onClose}
                   buttonSubmitText='Создать' onSubmit={handleSubmit}>
      <label className="popup__input-container">
        <input type="text" id="place-name" name="name" className="popup__field" placeholder="Название" required
               minLength="2" maxLength="30" value={name} onChange={handleNameChange}/>
        <span className="place-name-error popup__error-message"></span>
      </label>
      <label className="popup__input-container">
        <input type="url" id="place-pic-link" name="link" className="popup__field" placeholder="Ссылка на картинку"
               required value={link} onChange={handleLinkChange}/>
        <span className="place-pic-link-error popup__error-message"></span>
      </label>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
