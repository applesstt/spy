import React, {Component, PropTypes} from 'react';
import {Editor} from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import uploadImageCallBack from './uploadImageCallBack';

export default class RichEditor extends Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired
  };

  componentWillMount = () => {
    this.setState({
      contentState: null
    });
  }

  onChange = (contentState) => {
    this.props.onChange(draftToHtml(contentState));
    this.setState(contentState);
  }

  render() {
    require('../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css');
    const styles = require('./RichEditor.scss');
    const contentState = this.state.contentState;
    const toolbar = {
      options: ['inline', 'colorPicker', 'textAlign', 'link',
        'emoji', 'image', 'embedded', 'history'],
      inline: {
        options: ['bold', 'italic', 'strikethrough'],
      },
      textAlign: {
        options: ['left', 'center', 'right']
      }
    };
    return (
      <Editor toolbar={toolbar} contentState={contentState}
        onChange={this.onChange}
        uploadCallback={uploadImageCallBack}
        wrapperClassName={styles['react-editor']} />
    );
  }
}
