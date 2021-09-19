import React from 'react';
import '../../Css/main.css';
import './style.css';
import Wish from '../Wish';
import WishService from '../../Service/WishServices';
import { Col, Row } from 'antd';


class Wishlist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      wishes: [],
      title: process.env.TITLE_NAME
    };

  }

  componentDidMount() {
    var self = this;

    WishService.getAll().then((wishes) => {
      self.setState({
        data: wishes
      });
      this.orderWishes();
    });

  }

  orderWishes() {
    let orderedWishes = [];

    this.state.data.forEach(wish => {
      let order;
      if (wish.order === null || typeof wish.order === 'undefined') {
        order = 1;
      } else {
        order = wish.order;
      }

      if (typeof orderedWishes[order] === 'undefined') {
        orderedWishes[order] = [];
      }
      orderedWishes[order].push(wish);
    });

    let filteredWishes = [];
    let counter = 1;
    orderedWishes.forEach((wishes) => {
      filteredWishes[counter] = wishes;
      counter++;
    });

    this.setState({
      wishes: filteredWishes
    });

  }
  render() {
    return <div>
      <h1>{this.state.title}&apos;s Wishlist</h1>
      <p>
        Vous trouverez ci-dessous des idées de cadeaux classés par ordre de préférence.
        <br />
        L&apos;ordre de préférence 1 correspond à ce que je désire plus que tout.
      </p>

      {this.state.wishes.map((wishes, i) => {
        return <div key={i}>
          <h2>Ordre de préférence {i}: </h2>
          <Row className="wishesContainer">
            {wishes.map((wish, i) => {
              return <Col className="gutter-wish" key={i} xs={24} sm={24} md={24} lg={12} xl={12} >
                <Wish
                  id={wish.id}
                  title={wish.title}
                  description={wish.description}
                  price={wish.price}
                  link={wish.link}
                  img={wish.img}
                  order={wish.order}
                  picture={wish.picture}
                />
              </Col>;
            })}
          </Row>
        </div>;
      })}

    </div>;
  }
}

export default Wishlist;
