import React from 'react';
import './style.css';

class Price extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      price: props.price,
    };
  }
  componentDidMount() {

  }

  format(nStr) {
    nStr += '';
    var x = nStr.split('.');
    var x1 = x[0];
    var x2 = x.length > 1 ?
      (x[1].length === 1 ?
        '.' + x[1] + '0'
        : ('.' + x[1]))

      : '.00';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
      x1 = x1.replace(rgx, '$1' + ' ' + '$2');
    }
    return x1 + x2;
  }
  render() {
    return <div className="price">
      {this.format(this.state.price)} €
    </div>;
  }
}

export default Price;
