import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {asyncConnect} from 'redux-async-connect';
import {reduxForm} from 'redux-form';
import {initializeWithKey} from 'redux-form';
import * as articleActions from 'redux/modules/articles';
import {loadArticle} from 'redux/modules/articles';

@asyncConnect([{
  deferred: true,
  promise: ({params, store: {dispatch}}) => {
    return dispatch(loadArticle(params.id));
  }
}])

@connect(
  state => ({
    article: state.articles.article
  }),
  {...articleActions, initializeWithKey}
)
@reduxForm({
  form: 'article',
  fields: ['_id', 'name']
})
export default class UpdateArticle extends Component {
  static propTypes = {
    article: PropTypes.object,
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    invalid: PropTypes.bool.isRequired,
    save: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    values: PropTypes.object.isRequired,
    params: PropTypes.object
  };

  render() {
    const { article, handleSubmit, invalid,
      save, submitting, values } = this.props;
    return (
      <div>
      {article && <table>
        <tbody>
          <tr>
            <td>{article.name}</td>
            <td>
              <input type="text" className="form-control" />
            </td>
            <td>
              <button className="btn btn-success"
                      onClick={handleSubmit(() => save(values)
                        .then(result => {
                          if (result && typeof result.error === 'object') {
                            return Promise.reject(result.error);
                          }
                        })
                      )}
                      disabled={invalid || submitting}>
                <i className={'fa ' + (submitting ? 'fa-cog fa-spin' : 'fa-cloud')}/> Save
              </button>
            </td>
          </tr>
        </tbody>
      </table>}
      </div>
    );
  }
}
