import React from 'react';
import './style.css';
import gift from '../../img/gift.svg';
import Price from '../Price';
import axios from 'axios'

class Wish extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
          id:props.id,
          title:props.title,
          description:props.description,
          price:props.price,
          link:props.link,
          img:null
        };
  }
  componentDidMount() {
    var self = this;
       axios.get(process.env.API_DOMAIN+'/api/public/wish/'+self.state.id+'/image')
       .then(function (response) {
         // handle success
         self.setState({
           img:response.data.data.img
         })
         console.log(self.state.img)
       })
       .catch(function (error) {
         // handle error
         console.log(error);
       })
       .then(function () {
         // always executed
       });

  }
  getPrice(){
    if(this.state.price){
      return <Price price={this.state.price} />
    }else{
        return null;
    }
  }
  getLink(){
    if(this.state.link){
      return <a target='_blank' href={this.state.link}><img src={gift} />Acheter et offrir à Rudy</a>;
    }else{
      return null;
    }
  }

  render() {
    var price = this.getPrice();
    var link = this.getLink();
    if(this.state.img != null){
      var stylePicture = {
        backgroundImage:'url('+this.state.img+')'
      };
    }else{
      var stylePicture = {};
    }

    return <div className="wishContainer">
    <div className="wish">
      <div style={stylePicture} className="picture">
      </div>
      <div className="content">
        <h2>{this.state.title}</h2>
        <p>{this.state.description}</p>
        {price}
        {link}
      </div>
    </div>
    </div>
    ;
  }
}

export default Wish;
