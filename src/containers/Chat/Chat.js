import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';
import { push } from 'react-router-redux';
import * as authActions from 'redux/modules/auth';

@connect(
  state => ({
    user: state.auth.user,
    nickname: state.auth.nickname
  }),
  {...authActions, pushState: push}
)
export default class Chat extends Component {

  static propTypes = {
    user: PropTypes.object,
    nickname: PropTypes.string,
    pushState: PropTypes.func.isRequired,
    setNickname: PropTypes.func
  };

  state = {
    message: '',
    messages: []
  };

  componentDidMount() {
    if (socket) {
      socket.on('msg', this.onMessageReceived);
      setTimeout(() => {
        socket.emit('history', {city: this.props.user.city});
      }, 100);
    }
  }

  componentWillUnmount() {
    if (socket) {
      socket.removeListener('msg', this.onMessageReceived);
    }
  }

  onMessageReceived = (data) => {
    const messages = this.state.messages;
    messages.unshift(data);
    this.setState({messages});
  }

  setNickname = (event) => {
    event.preventDefault();
    const nickname = this.refs.nickname.value.trim();
    if (nickname !== '') {
      this.props.setNickname(nickname);
    }
  }

  cancel = () => {
    this.props.pushState('/');
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const msg = this.state.message;
    if (!msg || msg.trim() === '') return;

    const nickname = this.props.nickname;

    this.setState({message: ''});

    socket.emit('msg', {
      text: msg,
      nickname: nickname,
      user: this.props.user
    });
  }

  render() {
    const style = require('./Chat.scss');
    const {user, nickname} = this.props;

    return (
      <div className={style.chat + ' container'}>
        {user &&
        <div className="row">
          <div className="col-md-6 col-md-offset-3">
            <div className={style.blackboard} ref="blackboard">
              <form className="row form" onSubmit={this.handleSubmit}>
                <div className="col-md-8">
                  <div className="form-group">
                    <input type="text" ref="message"
                      className="form-control"
                      placeholder="这里输入..."
                      value={this.state.message}
                      onChange={(event) => {
                        this.setState({message: event.target.value});
                      }
                    }/>
                  </div>
                </div>
                <div className="col-md-4">
                  <button className="btn btn-block btn-danger" onClick={this.handleSubmit}>发 送</button>
                </div>
              </form>
              <div className={style.messages}>
              {this.state.messages.map((msg) => {
                return ([
                  <div className={style.message}>
                    <div className={style.text}><span>{msg.nickname ? msg.nickname + ':' : ''}</span>{msg.text}</div>
                  </div>
                ]);
              })}
              </div>
            </div>
          </div>
        </div>
        }
        <Modal show={!nickname} onHide={this.cancel}>
          <Modal.Header closeButton>
            <Modal.Title>请在进入安全屋前设置昵称</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={this.setNickname}>
              <div className="form-group">
                <input type="text" className="form-control"
                  placeholder="在此输入昵称" ref="nickname" />
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button bsStyle="primary" onClick={this.setNickname}>确定</Button>
            <Button onClick={this.cancel}>取消</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
