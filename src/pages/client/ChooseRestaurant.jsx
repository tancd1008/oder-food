import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import {
  getAllRestaurants,
  saveRestaurantDataToSessionStorage,
} from "../../services/restaurants";
import { Link } from "react-router-dom";

const ChooseRestaurant = () => {
  const [restaurants, setRestaurants] = useState([]);
  useEffect(() => {
    const fetchRestaurants = async () => {
      const restaurantList = await getAllRestaurants();
      setRestaurants(restaurantList);
    };
    fetchRestaurants();
  }, []);
  const handleChooseRestaurant = (restaurant) => () => {
    saveRestaurantDataToSessionStorage(restaurant);
  };
  return (
    <div className="container">
      <div className="row">
        {restaurants.map((restaurant, index) => (
          <Link
            to={`/${restaurant.nameRestaurant}`}
            className="col-lg-4"
            key={index}
            onClick={handleChooseRestaurant(restaurant)}
          >
            <div className="card card-margin">
              <div className="card-header no-border">
                <h5 className="card-title">{restaurant.nameRestaurant}</h5>
              </div>
              <div className="card-body pt-0">
                <div className="widget-49">
                  <div className="widget-49-title-wrapper">
                    <div className="widget-49-date-primary">
                      <span className="widget-49-date-day">Address: </span>
                      <span className="widget-49-date-month">
                        {restaurant.address}
                      </span>
                    </div>
                    <div className="widget-49-meeting-info">
                      <span className="widget-49-meeting-time">
                        {restaurant.time_start} to {restaurant.time_end}
                      </span>
                    </div>
                  </div>

                  <div className="widget-49-meeting-action">
                    <a href="/" className="btn btn-sm btn-flash-border-primary">
                      View All
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ChooseRestaurant;
