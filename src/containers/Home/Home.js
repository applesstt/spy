import React, { Component } from 'react';
/* import { Link } from 'react-router'; */
import config from '../../config';

export default class Home extends Component {
  render() {
    const styles = require('../App/App.scss');
    // require the logo image both from client and server
    const logoImage = require('../App/moe180.png');
    return (
      <div className={styles.home}>
        <div className={styles.masthead + ' ' + styles.page}>
          <div className="container">
            <div className={styles.logo}>
              <p>
                <img src={logoImage}/>
              </p>
            </div>

            <h1>{config.app.description}</h1>

          </div>
        </div>
        <div className={styles['page-alternate']}>
          <div className="container">
            <div className="row">
              <div className="col-md-4">
                <div className={styles.info}>
                  <div className={styles.icon}>
                    <span className="glyphicon glyphicon-comment"></span>
                  </div>
                  <h2>情报</h2>
                  <p>获取最隐秘的城市情报</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className={styles.info}>
                  <div className={styles.icon}>
                    <span className="glyphicon glyphicon-heart"></span>
                  </div>
                  <h2>传播</h2>
                  <p>口口相传的秘密</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className={styles.info}>
                  <div className={styles.icon}>
                    <span className="glyphicon glyphicon-user"></span>
                  </div>
                  <h2>焦点</h2>
                  <p>成为生活圈子的关注焦点</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        <div className={styles.page}>
          <div className="container">
            <div className={styles.service}>
              <h2>成员须知</h2>
              <h3>我们立志打造最隐秘的情报社交圈，成员数量有限，一旦加入，请严格遵守我们的规矩。</h3>
              <p className={styles['service-info']}>
                <em>所有信息匿名发布，不得随意泄露自己的身份。</em>
                <em>禁止将信息转发到其它社交媒体。</em>
                <em>禁止发布无意义的灌水信息</em>
                <em>违反任意一条，封号处理。</em>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
