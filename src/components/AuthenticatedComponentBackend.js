import React from 'react';
import {connect} from 'react-redux';

import decode from 'jwt-decode';

export function requireAuthentication(Component) {

  class AuthenticatedComponentBackend extends React.Component {

    constructor(props){
      super(props);
      this.state = {
        authenticated:false,
      }
    }

    componentWillMount () {
      this.checkAuth(this.props.userToken);
    }

    componentWillReceiveProps (nextProps) {
      this.checkAuth(nextProps.userToken);
    }

    checkAuth (authToken) {
      try {
        const decoded = decode(authToken);
        if (!this.isLoggedIn(decoded)) {
          this.props.history.push('/login');
        } else {
          this.setState({
            authenticated:true,
          })
        }
      } catch(e) {
        this.props.history.push('/login');
      }
    }

    isLoggedIn(decodedAuthToken) {

      return !this.isTokenExpired(decodedAuthToken);
    }

    getTokenExpirationDate(decodedAuthToken) {
      if (!decodedAuthToken.exp) { return null; }

      const date = new Date(0);
      date.setUTCSeconds(decodedAuthToken.exp);

      return date;
    }

    isTokenExpired(decodedAuthToken) {
      const expirationDate = this.getTokenExpirationDate(decodedAuthToken);
      return expirationDate < new Date();
    }

    render () {
      return (
        <div>
          {this.state.authenticated === true
            ? <Component {...this.props}/>
            : null
          }
        </div>
      )

    }
  }

  const mapStateToProps = (state) => ({
    token: state.userToken,
  });

  return connect(mapStateToProps)(AuthenticatedComponentBackend);

}
