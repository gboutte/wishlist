import React from 'react';
import '../../Css/main.css';
import axios from 'axios'
import Wish from '../Wish';
import WishService from '../../Service/WishServices';


class Wishlist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
          data:[

          ],
          title:process.env.TITLE_NAME
        };

  }

  componentDidMount() {
    var self = this;

      WishService.getAll().then((wishes)=>{
        self.setState({
          data:wishes
        })
      })

  }
  render() {
    return <div>
      <h1>{this.state.title}'s Wishlist</h1>
      {this.state.data.map((wish,i)=>{
        return <Wish
          key={i}
          key={i}
          id={wish.id}
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
