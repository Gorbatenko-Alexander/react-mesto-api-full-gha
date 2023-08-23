import React from 'react';
import Card from './Card';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

class Main extends React.Component {
  static contextType = CurrentUserContext;

  render() {
    return (
      <main className="main">
        <section className="profile">
          <button className="profile__avatar-edit" onClick={this.props.onEditAvatar}>
            <img alt="аватар" src={this.context.avatar} className="profile__avatar"/>
          </button>
          <div className="profile__info">
            <div className="profile__title">
              <h1 className="profile__name">{this.context.name}</h1>
              <button type="button" className="profile__edit-button" onClick={this.props.onEditProfile}></button>
            </div>
            <p className="profile__about">{this.context.about}</p>
          </div>
          <button type="button" className="profile__add-button" onClick={this.props.onAddPlace}></button>
        </section>
        <section aria-label="Места" className="places">
          {this.props.cards.map((card) => (
            <Card card={card} key={card._id}
                  onCardClick={this.props.onCardClick}
                  onCardLike={this.props.onCardLike}
                  onCardDelete={this.props.onCardDelete}
            />
          ))}
        </section>
      </main>
    );
  }
}

export default Main;
