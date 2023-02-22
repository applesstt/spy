import React, {Component, PropTypes} from 'react';
import { Link } from 'react-router';
import {connect} from 'react-redux';
import * as articlesActions from 'redux/modules/articles';
import {load as loadArticles} from 'redux/modules/articles';
import {initializeWithKey} from 'redux-form';
import { asyncConnect } from 'redux-async-connect';
import Pagination from 'react-bootstrap/lib/Pagination';
import { push } from 'react-router-redux';

@asyncConnect([{
  deferred: true,
  promise: ({store: {dispatch}}) => {
    return dispatch(loadArticles());
  }
}])

@connect(
  state => ({
    user: state.auth.user,
    articles: state.articles.articles,
    error: state.articles.error,
    loading: state.articles.loading,
    currentPage: state.articles.currentPage,
    total: state.articles.total
  }),
  {...articlesActions, initializeWithKey, pushState: push})
export default class Articles extends Component {
  static propTypes = {
    user: PropTypes.object,
    articles: PropTypes.array,
    error: PropTypes.string,
    loading: PropTypes.bool,
    currentPage: PropTypes.number,
    total: PropTypes.number,
    initializeWithKey: PropTypes.func.isRequired,
    load: PropTypes.func.isRequired,
    pushState: PropTypes.func.isRequired
  };

  handleSelect = (event) => {
    const currentPage = event.target.text;
    this.setState({currentPage});
    this.props.load({currentPage});
  }

  render() {
    const {user, articles, error, currentPage, total} = this.props;
    const styles = require('./Articles.scss');
    return (
      <div className={styles.articles + ' container'}>
        <div className="row">
          <div className="col-md-8 col-md-offset-2">
            {error &&
            <div className="alert alert-danger" role="alert">
              <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
              {' '}
              {error}
            </div>}
            <div>
              <div className={styles.grids}>
                {articles && articles.length > 0 && user &&
                <div className={styles.grid}>
                  <div className="row">
                    <div className="col-md-6 col-md-offset-3">
                      <Link to="/createArticle" className="btn btn-block btn-danger">发布新文章</Link>
                    </div>
                  </div>
                </div>
                }
                {articles && articles.length > 0 && articles.map((article) =>
                  <div className={styles.grid} key={article._id}>
                    <div className={styles.title}>
                      <span className={styles.name + ' h3'}>{article.name}</span>
                      <span className={styles.user}>{article.fromNow}</span>
                    </div>
                    <div className="row">
                      <div className={styles.info + ' col-md-12'} dangerouslySetInnerHTML={{__html: article.info}} />
                    </div>
                  </div>)
                }
                {user && <div className={styles.grid}>
                  <div className="row">
                    <div className="col-md-6 col-md-offset-3">
                      <Link to="/createArticle" className="btn btn-block btn-danger">发布新文章</Link>
                    </div>
                  </div>
                </div>}
              </div>
              {articles && articles.length > 0 &&
              <div className="row">
                <div className={styles.page + ' col-md-12'}>
                  <Pagination
                    first last prev next boundaryLinks ellipsis
                    maxButtons={5}
                    activePage={currentPage || 1}
                    items={total}
                    onSelect={this.handleSelect} />
                </div>
              </div>
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}
