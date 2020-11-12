import React from 'react';
import '../../Css/main.css';
import axios from 'axios'
import Wish from '../Wish';


class Wishlist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
          data:[

          ]
        };

  }

  componentDidMount() {
    var self = this;
       axios.get(process.env.API_DOMAIN+'/api/public/wish')
       .then(function (response) {
         // handle success
         self.setState({
           data:response.data.data
         })
       })
       .catch(function (error) {
         // handle error
         console.log(error);
       })
       .then(function () {
         // always executed
       });

  }
  render() {
    return <div>
      <h1>Rudy's Wishlist</h1>
      {this.state.data.map((wish,i)=>{
        return <Wish
          key={i}
          title={wish.title}
          description={wish.description}
          price={wish.price}
          link={wish.link}
          img={wish.img}
           />
      })}
    </div>;
  }
}

export default Wishlist;
