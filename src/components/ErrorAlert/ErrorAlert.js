import React, {Component, PropTypes} from 'react';

export default class ErrorAlert extends Component {
  static propTypes = {
    error: PropTypes.string.isRequired
  };

  render() {
    const styles = require('./ErrorAlert.scss');
    return (
      <div className={styles.error + ' text-danger'}>
        <span className="glyphicon glyphicon-exclamation-sign"></span>{this.props.error}
      </div>
    );
  }
}
