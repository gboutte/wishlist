import React from 'react';
import Wishlist  from '../Wishlist';
import Installation  from '../Installation';
import Loader  from '../Loader';
import axios from 'axios'


class Front extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
          installed:false,
          loading:true
        };

  }


  componentDidMount() {
    var self = this;
       axios.get(process.env.API_DOMAIN+'/api/public/wish')
       .then(function (response) {
         // handle success
         self.setState({
           data:response.data.data,
           installed:true
         })

       })
       .catch(function (error) {
        if(error.response.data.errors.includes('NEED_INSTALL')){
            self.setState({installed:false});
        }
       })
       .then(function () {
         self.setState({loading:false});
       });

  }
  render() {
    var page;
    if(this.state.loading){
      page = <Loader/>;
    }else if(this.state.installed == false){
      page = <Installation/>;
    }else{
      page = <Wishlist/>;
    }
    var style={
      height:"100%"
    }
    return <div style={style}>
          {page}
    </div>;
  }
}

export default Front;