import css from './ElementFileUploader.styl';

import CN from 'classnames';

import React, { Component, PropTypes } from 'react';

import Dropzone from 'react-dropzone';
import Loader from 'react-loader';
import { connect } from 'react-redux';

export class ElementFileUploader extends Component {
  static propTypes = {
    onDrop: PropTypes.func,
    children: PropTypes.object,
    fileLoader: PropTypes.bool
  };

  static defaultProps = {
    onDrop: () => {},
    children: {},
    fileLoader: true
  };

  render() {
    const { onDrop, children, fileLoader } = this.props;

    return (
      <div className={CN(css.fileUploader)}>
        <Dropzone onDrop={onDrop}>
          {children}
        </Dropzone>
        <Loader loaded={fileLoader} />
      </div>

    );
  }
}

/**
 * Mapping application state to properties
 * @param  {Object} state Application state
 * @return {Object} Mapped properties
 */
function mapStateToProps(state) {
  return { fileLoader: state.loaders.file };
}

export default connect(mapStateToProps)(ElementFileUploader);
