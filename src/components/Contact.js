import React, { Component } from 'react';
import '../styles/contact.css';
import { CSSTransitionGroup } from 'react-transition-group';

class Contact extends Component {
  constructor(props) {
    super(props);
    this.hideMe.bind(this);
  }


  hideMe() {
    this.props.undoShow();
  }

  render() {

    const show = this.props.show;

    return (
      <div>
        <CSSTransitionGroup
          transitionName="contactsTransition"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}>
        {show?
          <div key={1} className="contactOverlay">
            <div className="closeButton" onClick={this.hideMe.bind(this)}>
            </div>

            <div className="parentText">
              <div className="contactTextUL">
                <div className="innerText">WE</div>
                <div className="innerText">THE</div>
              </div>
              <div className="contactTextUR">
              <div className="innerText">RUN</div>
              <div className="innerText">SPACE</div>
              </div>

            </div>

            <div className="contactText">
            <div className="contactTextBL">
              <div className="contactBox">
            We Run The Space est une association dédiée aux lieux indépendants, attachés à une liberté créative – alternative au modèle marchand et institutionnel. Cet outil innovant et fédérateur, nécessaire à la visibilité d’une énergie initiée par ces lieux, prendra la forme d’un site web, d’un agenda print (augmenté sur le web), et d’événements ponctuels.
              </div>
              <div className="contactBox">
            Réelle initiative adaptée à la typologie de ces lieux qui réinventent le format d’exposition, We Run The Space offre une autonomie à ces project-spaces dans leur communication en invitant les lieux eux mêmes, à diffuser leurs éléments de programmation, expositions ou événements, sur le site.
            </div>
            <div className="contactBox">
            Cette association flexible et adaptée veut créer et valoriser un réseau d’espaces indépendants en les rendant accessibles à un public d’amateurs comme de professionnels peu informés avant cela.
            </div>
            <div className="contactBox">
            We Run The Space concrétise un pas en avant significatif dans notre engagement permanent en faveur de l’effervescence de la scène contemporaine, faisant le lien entre communautés parisiennes et internationales.
            </div>

            </div>
            <div className="contactTextBR">
                          <div className="contactBox">
            Bénédicte Albessard (assistante de direction à la galerie Jean Brolly, gérant la « Vitrine », espace d’exposition dédié à la jeune scène contemporaine).
            </div>
            <div className="contactBox">
            Margaux Barthélemy (fondatrice de www.HashtagArt.fr, site sur lequel elle décrypte l&#39;art contemporain).
            </div>
            <div className="contactBox">
            Théophile Calot (membre fondateur de The Walk, site et agenda des lieux d&#39;art indépendant à Brussels et de Théophile’s Papers, maison d’édition et plate forme curatoriale dédiée aux jeunes artistes ).
            </div>
            <div className="contactBox">
            Timothée Chaillou (critique d’art et commissaire indépendant, co-fondateur du Prix Orisha pour l’art contemporain africain, ancien directeur du département art contemporain de Piasa (2014-2015), directeur artistique de l’espace d’exposition indépendant Appartement (2014-2016) et de la foire AKAA - Also Known As Africa (2015-2016).
            </div>
            <div className="contactBox">

            Contact:
            </div>
            <div className="contactBox">
            info (at) werunthespace.fr
            </div>
            <div className="contactBox">
            Bénédicte Albessard
            benedicte (at) werunthespace.fr
            </div>
            <div className="contactBox">
            Margaux Barthélemy
            margaux (at) werunthespace.fr
            </div>
            <div className="contactBox">
            Théophile Calot
            theophile (at) werunthespace.fr
            </div>
            <div className="contactBox">
            Timothée Chaillou
            timothee (at) werunthespace.fr
            </div>
            <div className="contactBox">
            Retrouvez nous sur :
            Facebook - Instragram
            </div>


            </div>
            </div>
          </div>
          : null}
          </CSSTransitionGroup>

      </div>
    );
  }
}

export default Contact;
