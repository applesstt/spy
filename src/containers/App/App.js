import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { IndexLink, Link } from 'react-router';
import { LinkContainer, IndexLinkContainer } from 'react-router-bootstrap';
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import Helmet from 'react-helmet';
import { isLoaded as isInfoLoaded, load as loadInfo } from 'redux/modules/info';
import { isLoaded as isAuthLoaded, load as loadAuth, logout } from 'redux/modules/auth';
/* import { InfoBar } from 'components'; */
import { push } from 'react-router-redux';
import config from '../../config';
import { asyncConnect } from 'redux-async-connect';

@asyncConnect([{
  promise: ({store: {dispatch, getState}}) => {
    const promises = [];

    if (!isInfoLoaded(getState())) {
      promises.push(dispatch(loadInfo()));
    }
    if (!isAuthLoaded(getState())) {
      promises.push(dispatch(loadAuth()));
    }

    return Promise.all(promises);
  }
}])
@connect(
  state => ({user: state.auth.user}),
  {logout, pushState: push})
export default class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    user: PropTypes.object,
    logout: PropTypes.func.isRequired,
    pushState: PropTypes.func.isRequired
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  componentWillReceiveProps(nextProps) {
    if (!this.props.user && nextProps.user) {
      // login
      this.props.pushState('/spy');
    } else if (this.props.user && !nextProps.user) {
      // logout
      this.props.pushState('/');
    }
  }

  handleLogout = (event) => {
    event.preventDefault();
    this.props.logout();
  };

  render() {
    const {user} = this.props;
    const styles = require('./App.scss');

    return (
      <div className={styles.app}>
        <Helmet {...config.app.head}/>
        <Navbar fixedTop>
          <Navbar.Header>
            <Navbar.Brand>
              <IndexLink to="/">
                <div className={styles.brand}/>
                <span className={styles['brand-title']}>{config.app.title}</span>
              </IndexLink>
            </Navbar.Brand>
            {/* <Navbar.Toggle/> */}
          </Navbar.Header>

          <Navbar.Collapse eventKey={0}>
            <Nav navbar pullRight>
              <IndexLinkContainer to="/">
                <NavItem eventKey={1}>首页</NavItem>
              </IndexLinkContainer>
              <LinkContainer to="/spy" exact>
                <NavItem eventKey={2}>情报</NavItem>
              </LinkContainer>
              <LinkContainer to="/articles" exact>
                <NavItem eventKey={3}>文章</NavItem>
              </LinkContainer>
              {user && <LinkContainer to="/chat" exact>
                <NavItem eventKey={4}>安全屋</NavItem>
              </LinkContainer>}
              {!user &&
              <LinkContainer to="/login">
                <NavItem eventKey={5}>登录</NavItem>
              </LinkContainer>}
              {user && user.isAdmin &&
              <li>
                <a target="_blank" href="http://localhost:3002">管理员平台</a>
              </li>}
              {user &&
              <LinkContainer to="/logout">
                <NavItem eventKey={5} className="logout-link" onClick={this.handleLogout}>
                  退出
                </NavItem>
              </LinkContainer>}
            </Nav>
            {/* !user &&
            <Link to="/signup" className={styles.signup}>新用户注册</Link> */}
            {user &&
            <div className={styles.loggedInMessage}>{user.name}</div>}
          </Navbar.Collapse>
        </Navbar>

        <div className={styles.appContent}>
          {this.props.children}
        </div>
        {/* <InfoBar/> */}

        <footer className={styles.webFooter}>
          <p className="credits">©2016 MOE, BY <em>见微知萌</em></p>
        </footer>
        <footer className={styles.mobileFooter}>
          {user && <div className="row">
            <div className="col-sm-3">
              <Link activeClassName="active" to="/spy"><i className="fa fa-user-secret"></i>情报</Link>
            </div>
            <div className="col-sm-3">
              <Link activeClassName="active" to="/articles"><i className="fa fa-file-text"></i>文章</Link>
            </div>
            <div className="col-sm-3">
              <Link activeClassName="active" to="/chat"><i className="fa fa-comment"></i>安全屋</Link>
            </div>
            <div className="col-sm-3">
              <Link activeClassName="active" to="/logout"
                onClick={this.handleLogout}><i className="fa fa-sign-out"></i>退出</Link>
            </div>
          </div>}
          {!user && <div className="row">
            <div className="col-sm-3">
              <Link activeClassName="active" to="/spy"><i className="fa fa-user-secret"></i>情报</Link>
            </div>
            <div className="col-sm-3">
              <Link activeClassName="active" to="/articles"><i className="fa fa-file-text"></i>文章</Link>
            </div>
            <div className="col-sm-3">
              <Link activeClassName="active" to="/login"><i className="fa fa-sign-in"></i>登录</Link>
            </div>
            <div className="col-sm-3">
              <Link activeClassName="active" to="/signup"><i className="fa fa-space-shuttle"></i>注册</Link>
            </div>
          </div>}
        </footer>
      </div>
    );
  }
}
