import React, { useEffect, useState } from "react";

import { Col, Container, Row } from "reactstrap";
import Helmet from "../../components/Helmet/Helmet.js";

// import heroImg from "../assets/images/hero.png";
import "../../styles/hero-section.css";

// import { Link } from "react-router-dom";

// import Category from "../components/UI/category/Category.jsx";

import "../../styles/home.css";

// import featureImg01 from "../assets/images/service-01.png";
// import featureImg02 from "../assets/images/service-02.png";
// import featureImg03 from "../assets/images/service-03.png";

import products from "../../assets/fake-data/products.js";


import ProductCard from "../../components/UI/product-card/ProductCard.jsx";
import {
  getRestaurantDataFromSessionStorage,
} from "../../services/restaurants.js";
import { fetchCategoriesByRestaurant } from "../../store/categoriesSlide.js";
import { connect, useDispatch } from "react-redux";

const Home = ({ categories, restaurants, restaurantId }) => {
  console.log(categories);
  // const [categories, setCategories] = useState([]);
  const [allProducts, setAllProducts] = useState(products);

  const [hotPizza, setHotPizza] = useState([]);
  const restaurantData = getRestaurantDataFromSessionStorage();
  const dispatch = useDispatch();

  useEffect(() => {
    const filteredPizza = products.filter((item) => item.category === "Pizza");
    const slicePizza = filteredPizza.slice(0, 4);
    setHotPizza(slicePizza);
  }, []);

  useEffect(() => {
    console.log(restaurantData.id);
    dispatch(fetchCategoriesByRestaurant({ restaurantId: restaurantData.id }));
  }, [restaurantData.id]);

  return (
    <Helmet title="Home">
      <section>
        <Container>
          <Row>
            <Col lg="12" className="text-center">
              <h2>Popular Foods</h2>
            </Col>

            <Col lg="12">
              <div className="food__category d-flex align-items-center justify-content-center gap-4 text-danger">
                {categories &&
                  categories.map((item, index) => (
                    <button key={index}>{item.name}</button>
                  ))}
              </div>
            </Col>

            {allProducts.map((item) => (
              <Col lg="3" md="4" sm="6" xs="6" key={item.id} className="mt-5">
                <ProductCard item={item} />
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* <section className="why__choose-us">
        <Container>
          <Row>
            <Col lg="6" md="6">
              <img src={whyImg} alt="why-tasty-treat" className="w-100" />
            </Col>

            <Col lg="6" md="6">
              <div className="why__tasty-treat">
                <h2 className="tasty__treat-title mb-4">
                  Why <span>Tasty Treat?</span>
                </h2>
                <p className="tasty__treat-desc">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Dolorum, minus. Tempora reprehenderit a corporis velit,
                  laboriosam vitae ullam, repellat illo sequi odio esse iste
                  fugiat dolor, optio incidunt eligendi deleniti!
                </p>

                <ListGroup className="mt-4">
                  <ListGroupItem className="border-0 ps-0">
                    <p className=" choose__us-title d-flex align-items-center gap-2 ">
                      <i className="ri-checkbox-circle-line"></i> Fresh and tasty
                      foods
                    </p>
                    <p className="choose__us-desc">
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                      Quia, voluptatibus.
                    </p>
                  </ListGroupItem>

                  <ListGroupItem className="border-0 ps-0">
                    <p className="choose__us-title d-flex align-items-center gap-2 ">
                      <i className="ri-checkbox-circle-line"></i> Quality support
                    </p>
                    <p className="choose__us-desc">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Qui, earum.
                    </p>
                  </ListGroupItem>

                  <ListGroupItem className="border-0 ps-0">
                    <p className="choose__us-title d-flex align-items-center gap-2 ">
                      <i className="ri-checkbox-circle-line"></i>Order from any
                      location{" "}
                    </p>
                    <p className="choose__us-desc">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Qui, earum.
                    </p>
                  </ListGroupItem>
                </ListGroup>
              </div>
            </Col>
          </Row>
        </Container>
      </section> */}

      <section className="pt-0">
        <Container>
          <Row>
            <Col lg="12" className="text-center mb-5 ">
              <h2>Hot Pizza</h2>
            </Col>

            {hotPizza.map((item) => (
              <Col lg="3" md="4" sm="6" xs="6" key={item.id}>
                <ProductCard item={item} />
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* <section>
        <Container>
          <Row>
            <Col lg="6" md="6">
              <div className="testimonial ">
                <h5 className="testimonial__subtitle mb-4">Testimonial</h5>
                <h2 className="testimonial__title mb-4">
                  What our <span>customers</span> are saying
                </h2>
                <p className="testimonial__desc">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Distinctio quasi qui minus quos sit perspiciatis inventore
                  quis provident placeat fugiat!
                </p>

              </div>
            </Col>

            <Col lg="6" md="6">
              <img src={networkImg} alt="testimonial-img" className="w-100" />
            </Col>
          </Row>
        </Container>
      </section> */}
    </Helmet>
  );
};
function mapStateToProps(state) {
  console.log(state);
  return {
    categories: state.categories.categories,
    restaurants: state.restaurants.restaurants,
    restaurantId: state.restaurants.restaurantId,
  };
}

export default connect(mapStateToProps)(Home);
