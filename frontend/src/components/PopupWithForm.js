import React from 'react';

class PopupWithForm extends React.Component {
  render() {
    return (
      <div id={this.props.name} className={`popup ${this.props.isOpen ? 'popup_opened' : ''}`}>
        <div className="popup__container">
          <button type="button" className="popup__exit" onClick={this.props.onClose}></button>
          <h2 className="popup__title">{this.props.title}</h2>
          <form action="#" name={this.props.name} className="popup__fields" onSubmit={this.props.onSubmit}>
            {this.props.children}
            <button type="submit" className={`popup__submit-button ${this.props.name === 'confirm' ? 'popup__submit-button_single' : ''}`}>
              {this.props.buttonSubmitText}
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default PopupWithForm;
