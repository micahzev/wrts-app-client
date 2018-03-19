import React, { Component } from 'react';
import '../styles/contact.css';
import { CSSTransitionGroup } from 'react-transition-group';

import Mailto from 'react-mailto';

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
              <div className="logoText">
                <div className="logoTop" >
                  <span className="we">WE </span>  <span className="run"> RUN</span>
                </div>
                <div className="logoBottom">
                  <span className="the">THE </span>  <span className="space"> SPACE</span>
                </div>
              </div>

              <div className="contactText">
                <div className="customAboutText">
                  {this.props.text}
                </div>
                <div className="rightColumnContact">

                  <div className="rejoindreBox">
                    <Mailto email="info@werunthespace.com" className="Mailer">
                Rejoindre <br/>
                 We Run <br/>
                  The Space <br/>
                    </Mailto>
                  </div>

                  <div className="rejoindreBox">
                    <Mailto email="info@werunthespace.com" className="Mailer">
                Donner  à<br/>
                We Run <br/>
                The Space <br/>
                    </Mailto>
                  </div>

                  <div className="contactEmailBox">

            Contact:
                  </div>
                  <div className="contactEmail">
            info (at) werunthespace.com
                  </div>
                  <div className="contactEmail">
            Retrouvez nous sur :
                    <br/>
                    <a className="socialLink" href="https://www.facebook.com/werunthespace/">Facebook</a> - <a className="socialLink" href="https://www.instagram.com/werunthespace/">Instragram</a>
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
