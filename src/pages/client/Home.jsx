import React, { useEffect, useState } from "react";

import { Col, Container, Row } from "reactstrap";
import Helmet from "../../components/Helmet/Helmet.js";

// import heroImg from "../assets/images/hero.png";
import "../../styles/hero-section.css";

// import { Link } from "react-router-dom";

// import Category from "../components/UI/category/Category.jsx";

import "../../styles/home.css";

import ProductCard from "../../components/UI/product-card/ProductCard.jsx";
import { getRestaurantDataFromSessionStorage } from "../../services/restaurants.js";
import { fetchCategoriesByRestaurant } from "../../store/categoriesSlide.js";
import { connect, useDispatch } from "react-redux";
import { fetchFoodByRestaurant } from "../../store/foodsSlice.js";

const Home = ({ categories, foods }) => {
  const [filteredFoods, setFilteredFoods] = useState([]);
  const restaurantData = getRestaurantDataFromSessionStorage();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategoriesByRestaurant({ restaurantId: restaurantData.id }));
    dispatch(fetchFoodByRestaurant({ restaurantId: restaurantData.id }));
  }, [dispatch, restaurantData.id]);
  useEffect(() => {
    setFilteredFoods(foods);
  }, [foods]);
  const handleFilterByCategory = (categoryId) => {
    if (foods) {
      if (categoryId === null) {
        setFilteredFoods(foods);
      } else {
        const filteredByCategory = foods.filter(
          (item) => item.categoryId && item.categoryId.includes(categoryId),
        );
        setFilteredFoods(filteredByCategory);
      }
    }
  };

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
                    <button
                      key={index}
                      onClick={() => handleFilterByCategory(item.id)}
                    >
                      {item.name}
                    </button>
                  ))}
              </div>
            </Col>

            {filteredFoods &&
              filteredFoods.map((item) => (
                <Col lg="3" md="4" sm="6" xs="6" key={item.id} className="mt-5">
                  <ProductCard item={item} />
                </Col>
              ))}
          </Row>
        </Container>
      </section>

      {/* <section className="pt-0">
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
      </section> */}
    </Helmet>
  );
};
function mapStateToProps(state) {
  return {
    categories: state.categories.categories,
    foods: state.foods.foods,
  };
}

export default connect(mapStateToProps)(Home);
