import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import {reduxForm} from 'redux-form';
import {push} from 'react-router-redux';
import * as articleActions from 'redux/modules/articles';
import {RichEditor, ErrorAlert} from 'components';
import articleValidation from './articleValidation';

@connect(
  state => ({
    createError: state.articles.createError
  }),
  {...articleActions, pushState: push}
)

@reduxForm({
  form: 'createArticle',
  fields: ['name', 'info'],
  validate: articleValidation
})
export default class CreateArticle extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    touch: PropTypes.func.isRequired,
    invalid: PropTypes.bool.isRequired,
    pristine: PropTypes.bool.isRequired,
    submitting: PropTypes.bool.isRequired,
    values: PropTypes.object.isRequired,
    createError: PropTypes.string,
    createArticle: PropTypes.func.isRequired,
    pushState: PropTypes.func.isRequired
  };

  onEditorChange = (richHtml) => {
    this.props.fields.info.onChange(richHtml);
    this.props.touch('info');
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.createArticle(this.props.values).then(() => {
      this.props.pushState('/articles');
    });
  }

  render() {
    const { fields: { name, info }, createError, pristine, invalid, submitting } = this.props;
    const styles = require('./Articles.scss');
    return (
      <div
        className={styles.articles + ' container'}>
        <Helmet title="发布新文章"/>
        <div className="row">
          <div className="col-md-8 col-md-offset-2">
            <form className={styles.create} onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label className={styles.items}>
                  <span>标题</span>
                  <input type="text" className="form-control"
                    {...name} value={name.value || ''}/>
                  {name.error && name.touched && <ErrorAlert error={name.error}/>}
                </label>
              </div>
              <div className="form-group">
                <label className={styles.info + ' ' + styles.items}>
                  <span>详情</span>
                  <textarea rows="8" ref="info" className="form-control"
                    {...info} value={info.value || ''}/>
                </label>
                <RichEditor onChange={this.onEditorChange} />
                {info.error && info.touched && <ErrorAlert error={info.error}/>}
              </div>
              <button className="btn btn-block btn-danger"
                disabled={pristine || invalid || submitting}
                onClick={this.handleSubmit}>发布文章</button>
              {createError && <ErrorAlert error={createError}/>}
            </form>
          </div>
        </div>
      </div>
    );
  }
}
