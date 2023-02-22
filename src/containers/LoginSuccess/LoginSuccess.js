import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import * as authActions from 'redux/modules/auth';

@connect(
    state => ({user: state.auth.user}),
    authActions)
export default
class LoginSuccess extends Component {
  static propTypes = {
    user: PropTypes.object,
    logout: PropTypes.func
  }

  render() {
    const {user, logout} = this.props;
    const styles = require('./LoginSuccess.scss');
    return (user &&
      <div className={styles.loginSuccessPage + ' container'}>
        <div className="row">
          <div className="col-md-4 col-md-offset-4">
            <h1>登录成功</h1>
            <div>
              <p>Hi，{user.name}，你已经成功登录这里，希望你一切顺利，同时建议在现实生活中保持低调，将提高你的生存几率。</p>
              <div>
                <button className="btn btn-block btn-danger" onClick={logout}>退出登录</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
