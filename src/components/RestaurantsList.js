import React from 'react';
import Rates from './Rates';


const RestaurantsList = ({ restaurants }) => {
    return (
        <div className="restaurants-list">
            <ul className="restaurants-list__container">
                {restaurants.map((restaurant) => (
                    <li key={restaurant.restaurantName} className="restaurants-list__item card">
                        <div className="restaurants-list__name">{restaurant.restaurantName}</div>
                        <div className="restaurants-list__address">{restaurant.address}</div>
                        <div className="restaurants-list__ratings"><Rates ratings={restaurant.ratings} /></div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RestaurantsList;