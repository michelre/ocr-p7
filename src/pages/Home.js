import React from "react";
import RestaurantsList from "../components/RestaurantsList";
import { useEffect, useState} from "react";
import Header from "../components/Header";
import GoogleMap from "../components/MapContainer";
import HeaderImage from '../assets/header-resto-finder-1920x1280.jpg';
import Finder from "../components/Finder";
import { averageCalculate } from "../utils/utils";

const Home = () => {
    const [restaurants, setRestaurants] = useState([]);
    const [filteredRestaurants, setFilteredRestaurants] = useState([]);
    
    
    useEffect(() => {
        fetch("/restaurants.json").then(res => res.json()).then(res => {
            setRestaurants(res);
            setFilteredRestaurants(res);
        })
    }, []);
    
    const onSubmitFilter = (min, max) => {
       const r = restaurants.filter((restaurant) => {
            const average = averageCalculate( restaurant.ratings );
            return average >= min && average <= max;
       })
       setFilteredRestaurants(r);
    }
    
    
    return (
        <>
            <main>
                <Header />
                <div className="hero__banner">
                    <img className="hero__banner__image" src={ HeaderImage } alt=""/>
                </div>
                <section className= "flex-center">
                    <Finder submitFilter={onSubmitFilter} />
                </section>
                <section className="flex-center">
                    <RestaurantsList restaurants={ filteredRestaurants } />
                    <GoogleMap restaurants={ filteredRestaurants } />
                </section>
            </main>
        </>
        )
    }
    
    export default Home;
    