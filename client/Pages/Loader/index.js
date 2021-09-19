import React from 'react';
import loading from '../../img/loading.svg';

class Loader extends React.Component {

  render() {
    var style = {
      display: 'flex',
      justifyContent: 'center',
      alignContent: 'center',
      height: '100%'
    };

    return <div style={style}>
      <img src={loading} />
    </div>;
  }
}

export default Loader;
