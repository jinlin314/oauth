import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import {signupUser} from '../redux/login';

/* -----------------    COMPONENT     ------------------ */

class Signup extends React.Component {

    constructor(props) {
        super(props);
        this.onSignupSubmit = this.onSignupSubmit.bind(this);
    }

    render() {
        const { message } = this.props;
        return (
            <div className="signin-container">
              <div className="buffer local">
                <form onSubmit={this.onSignupSubmit}>
                  <div className="form-group">
                    <label>email</label>
                    <input
                        name="email"
                        type="email"
                        className="form-control"
                        required
                    />
                  </div>
                  <div className="form-group">
                    <label>password</label>
                    <input
                        name="password"
                        type="password"
                        className="form-control"
                        required
                    />
                  </div>
                  <button type="submit" className="btn btn-block btn-primary">{message}</button>
                </form>
              </div>
              <div className="or buffer">
                <div className="back-line">
                  <span>OR</span>
                </div>
              </div>
              <div className="buffer oauth">
                <p>
                  <a
                      target="_self"
                      href="/auth/google"
                      className="btn btn-social btn-google">
                    <i className="fa fa-google" />
                    <span>{message} with Google</span>
                  </a>
                </p>
              </div>
            </div>
        );
    }

    onSignupSubmit(event) {
        const { message } = this.props;
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;
    console.log(">>>", email, password);

        this.props.signupUser(email, password);
        console.log('component/Signup.js', this.props);
    }
}

/* -----------------    CONTAINER     ------------------ */

const mapState = null ; //Object.assign({}, state)
const mapDispatch = {signupUser};

export default connect(mapState, mapDispatch)(Signup);
