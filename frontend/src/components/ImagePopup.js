import React from 'react';

class ImagePopup extends React.Component {
  render() {
    return (
      <div id="pic-zoom" className={`popup popup_darker ${this.props.card._id ? 'popup_opened' : ''}`}>
        <div className="popup__pic-container">
          <button type="button" className="popup__exit" onClick={this.props.onClose}></button>
          <img src={this.props.card.link} alt={this.props.card.name} className="popup__picture"/>
          <p className="popup__label">{this.props.card.name}</p>
        </div>
      </div>
    );
  }
}

export default ImagePopup;
