import React from 'react';
import {CurrentUserContext} from "../contexts/CurrentUserContext";

class Card extends React.Component {
  static contextType = CurrentUserContext;

  handleClick() {
    this.props.onCardClick(this.props.card);
  }

  handleLikeClick() {
    this.props.onCardLike(this.props.card);
  }

  handleDeleteClick() {
    this.props.onCardDelete(this.props.card);
  }

  render() {
    return (
      <div className="places__place-card">
        <img alt={this.props.card.name} src={this.props.card.link} className="places__place-pic"
             onClick={this.handleClick.bind(this)}/>
        <h2 className="places__place-title">{this.props.card.name}</h2>
        <div className="places__place-like-container">
          <button type="button"
                  className={`places__place-like ${this.props.card.likes.some(like => like === this.context._id) && 'places__place-like_active'}`}
                  onClick={() => {this.handleLikeClick()}}></button>
          <p className="places__place-like-number">{this.props.card.likes.length}</p>
        </div>
        <button type="button"
                className={`places__place-remove ${!(this.props.card.owner === this.context._id) && 'places__place-remove_disabled'}`}
                onClick={() => {this.handleDeleteClick()}}
        ></button>
      </div>
    )
  }
}

export default Card;
