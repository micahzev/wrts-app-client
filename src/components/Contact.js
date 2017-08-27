import React, { Component } from 'react';
import '../styles/contact.css';

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
      {show?
          <div className="contactOverlay">
            <div className="closeButton" onClick={this.hideMe.bind(this)}>
            </div>

              <div className="parentText">
                  <div className="contactTextUL">
                    WE

                    RUN
                  </div>
                  <div className="contactTextUR">
                    THE

                     SPACE
                  </div>

              </div>

             <div className="contactText">
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
              nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat
              volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
              ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequa
              t. Duis autem vel eum iriure dolor in hendrerit in vulputate velit
               esse molestie consequat, vel illum dolore eu feugiat nulla facilisi
               s at vero eros et accumsan et iusto odio dignissim qui blandit prae
               sent luptatum zzril delenit augue duis dolore te feugait nulla facil
               isi. Nam liber tempor cum soluta nobis eleifend option congue nihil
                imperdiet doming id quod mazim placerat facer possim assum.
             </div>
           </div>
          : null}

      </div>
    );
  }
}

export default Contact;
