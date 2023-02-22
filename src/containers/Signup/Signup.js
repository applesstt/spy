import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {reduxForm} from 'redux-form';
import * as authActions from 'redux/modules/auth';
import signupValidation from './signupValidation';
import {ErrorAlert} from 'components';

@connect(
  state => ({
    user: state.auth.user,
    signupError: state.auth.signupError
  }),
  authActions)

@reduxForm({
  form: 'signup',
  fields: ['username', 'password'],
  validate: signupValidation
})
export default class Signup extends Component {
  static propTypes = {
    user: PropTypes.object,
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    invalid: PropTypes.bool.isRequired,
    pristine: PropTypes.bool.isRequired,
    submitting: PropTypes.bool.isRequired,
    values: PropTypes.object.isRequired,
    signupError: PropTypes.string,
    signup: PropTypes.func
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const {username, password} = this.props.fields;
    if (username.value.trim() === '' || password.value === '') {
      return;
    }
    this.props.signup(username.value, password.value);
  }

  render() {
    const {user, fields: {username, password}, signupError, pristine, invalid, submitting} = this.props;
    const styles = require('./Signup.scss');
    return (
      <div className={styles.signupPage + ' container'}>
        <div className="row">
          <div className="col-md-4 col-md-offset-4">
          {!user &&
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <input type="text" ref="username"
                  placeholder="Enter a username"
                  {...username} value={username.value || ''}
                  required
                  className="form-control"/>
                {username.error && username.touched && <ErrorAlert error={username.error}/>}
              </div>
              <div className="form-group">
                <input type="password" ref="password"
                  {...password} value={password.value || ''}
                  required
                  className="form-control"/>
                {password.error && password.touched && <ErrorAlert error={password.error}/>}
              </div>
              <button className="btn btn-block btn-danger"
                disabled={pristine || invalid || submitting}
                onClick={this.handleSubmit}>注 册
              </button>
              {signupError && <ErrorAlert error={signupError}/>}
            </form>
          }
          {user &&
            <div>
              <p>Hi，{user.name}，你已经成功登录。</p>
            </div>
          }
          </div>
        </div>
      </div>
    );
  }
}
