import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {asyncConnect} from 'redux-async-connect';
import {reduxForm} from 'redux-form';
import Dropzone from 'react-dropzone';
import uploadImageCallBack from '../../components/RichEditor/uploadImageCallBack';
import Pagination from 'react-bootstrap/lib/Pagination';
import * as spyActions from 'redux/modules/spy';

@asyncConnect([{
  deferred: true,
  promise: ({store: {dispatch}}) => {
    return dispatch(spyActions.list());
  }
}])

@connect(
  state => ({
    user: state.auth.user,
    spys: state.spy.spys,
    currentPage: state.spy.currentPage,
    total: state.spy.total,
    listError: state.spy.listError,
    createError: state.spy.createError
  }),
  {...spyActions})

@reduxForm({
  form: 'spy',
  fields: ['info']
})

export default class Spy extends Component {
  static propTypes = {
    user: PropTypes.object,
    spys: PropTypes.array,
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    invalid: PropTypes.bool.isRequired,
    pristine: PropTypes.bool.isRequired,
    submitting: PropTypes.bool.isRequired,
    values: PropTypes.object.isRequired,
    currentPage: PropTypes.number,
    total: PropTypes.number,
    listError: PropTypes.string,
    createError: PropTypes.string,
    list: PropTypes.func.isRequired,
    create: PropTypes.func.isRequired
  }

  state = {
    images: [],
    clickImages: {}
  };

  onDrop = (files) => {
    if (files.length > 0) {
      uploadImageCallBack(files[0]).then((result) => {
        const {data: {link}} = result;
        const images = this.state.images;
        images.push(link);
        this.setState({images});
      });
    }
  }

  handleImageClick = (image) => {
    return () => {
      const clickImages = this.state.clickImages;
      clickImages[image] = !clickImages[image];
      this.setState({clickImages});
    };
  }

  handleSelect = (event) => {
    const currentPage = event.target.text;
    this.setState({currentPage});
    this.props.list({currentPage});
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const info = this.props.fields.info.value;
    const images = this.state.images;
    if ((info && info.trim() !== '') || images.length) {
      this.props.create({info, images}).then(() => {
        this.props.list();
        this.setState({images: []});
        this.props.fields.info.onChange('');
      });
    }
  }

  render() {
    const {user, spys, fields: {info}, currentPage, total} = this.props;
    const images = this.state.images;
    const styles = require('./Spy.scss');
    return (
      <div className={styles.wrapSpy + ' container'}>
        <div className="row">
          <div className="col-md-6 col-md-offset-3">
            {user && <div>
              <form className={styles.createForm} onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <textarea className="form-control" {...info} />
                </div>
                <div className={styles.actions + ' clearfix'}>
                  <Dropzone className={styles.dropzone} onDrop={this.onDrop} multiple={false} accept="image/*">
                    <span className={styles.uploadImage}>
                      <i className="glyphicon glyphicon-picture"></i>图片
                    </span>
                  </Dropzone>
                  <button className="btn btn-sm btn-danger" onClick={this.handleSubmit}>发布情报</button>
                </div>
                {images && images.length > 0 &&
                <div className={styles.images}>
                  {images.map((image) =>
                  <div className={styles.image}>
                    <img src={image} />
                  </div>
                  )}
                </div>
                }
              </form>
            </div>}
            <div className={styles.spys}>
              {spys && spys.length > 0 && spys.map((spy) =>
              <div className={styles.spy} key={spy._id}>
                <div>{spy.info}</div>
                {spy.images && spy.images.length > 0 &&
                <div className={styles.images + ' clearfix'}>
                  {spy.images.map((image) =>
                    <div className={(this.state.clickImages[image] ? styles.big : '') + ' ' + styles.image}>
                      <img src={image} onClick={this.handleImageClick(image)}/>
                    </div>
                  )}
                </div>
                }
                <div className={styles.fromNow}>{spy.fromNow}</div>
              </div>
              )}
            </div>
            {spys && spys.length > 0 &&
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
    );
  }
}
