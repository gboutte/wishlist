import React from 'react';
import Wishlist from '../../Components/Wishlist';
import Installation from '../Installation';
import Loader from '../Loader';
import WishService from '../../Service/WishServices';


class Front extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      installed: false,
      loading: true
    };

  }


  componentDidMount() {
    var self = this;
    WishService.getAll()
      .then((wishes) => {
        // handle success
        self.setState({
          data: wishes,
          installed: true
        });

      })
      .catch((error) => {
        if (error.response.data.errors.includes('NEED_INSTALL')) {
          self.setState({ installed: false });
        }
      })
      .then(() => {
        self.setState({ loading: false });
      });

  }
  render() {
    var page;
    if (this.state.loading) {
      page = <Loader />;
    } else if (this.state.installed === false) {
      page = <Installation />;
    } else {
      page = <Wishlist />;
    }
    var style = {
      height: '100%'
    };
    return <div style={style}>
      {page}
    </div>;
  }
}

export default Front;
