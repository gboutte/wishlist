import React from 'react';
import './style.css';
import gift from '../../img/gift.svg';

class Wish extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
          title:props.title,
          description:props.description,
          price:props.price,
          link:props.link,
        };
  }

  getPrice(){
    if(this.state.price){
      return <span className="price">{this.state.price} €</span>
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
    return <div className="wishContainer">
    <div className="wish">
      <div className="picture">
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
