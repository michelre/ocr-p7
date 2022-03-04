import React from "react";
import RestaurantsList from "../components/RestaurantsList";
import { useEffect, useState} from "react";
import Header from "../components/Header";
import GoogleMap from "../components/MapContainer";
import AddRestaurant from "../components/AddRestaurant";
import ShowRestaurantRating from "../components/ShowRestaurantRating";
import HeaderImage from '../assets/header-resto-finder-1920x1280.jpg';
import Finder from "../components/Finder";
import { averageCalculate } from "../utils/utils";
import Footer from "../components/Footer";

const Home = () => {
    const [restaurants, setRestaurants] = useState([]);
    const [filteredRestaurants, setFilteredRestaurants] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [restaurantRating, setRestaurantRating] = useState(null);
    
    
    useEffect(() => {
        fetch("/restaurants.json").then(res => res.json()).then(res => {
            setRestaurants(res);
            setFilteredRestaurants(res);
        })
    }, []);
    
    const onSubmitFilter = (min, max) => {
        console.log(restaurants)
        const r = restaurants.filter((restaurant) => {
            const average = averageCalculate( restaurant.ratings );
            return average >= min && average <= max;
        })
        setFilteredRestaurants(r);
    }

    const submitAddRating = (restaurantName, rating, comment) => {
        const r =   restaurants.map((restaurant) => {
            if(restaurantName === restaurant.restaurantName) {
                restaurant.ratings.push({
                    "stars": rating,
                    "comment": comment
                })
            } return restaurant
        })
        setRestaurants(r)
        onSubmitFilter(0, 5)
        setRestaurantRating(null)
        
    }

    const toggleShowModal = () => {
        setShowModal(!showModal)
    }

    const showModalRating = (restaurant) => {
        setRestaurantRating(restaurant);
    }

    const submitAddRestaurant = (restaurant) => {
        const newRestaurant = 
        {  
            "restaurantName": restaurant.restaurantNameForm,
            "address":restaurant.restaurantAdressForm,
            "lat":41.400495,
            "long":2.15285,
            "ratings":[]
        }
        restaurants.push(newRestaurant)
        setShowModal(false)
        setRestaurants(restaurants)
        onSubmitFilter(0, 5)
    }    
    
    return (
        <>
            <Header />
            <main>
                <div className="hero__banner pb-3">
                    <img className="hero__banner__image" src={ HeaderImage } alt=""/>
                </div>
                <section className= "flex-center">
                    <div className="pt-3">
                        <Finder 
                            submitFilter={onSubmitFilter} />
                    </div>
                </section>
                <section className="flex-center">
                    <div className="position-relative container pt-3 pb-3 ">
                        <GoogleMap 
                            restaurants={ filteredRestaurants } 
                            toggleShowModal={ toggleShowModal }/>
                        <AddRestaurant 
                            restaurants={ filteredRestaurants } 
                            isShowing={ showModal }
                            hideModal={ ()=> setShowModal(false)} 
                            submitAddRestaurant={ submitAddRestaurant }/>
                        <ShowRestaurantRating 
                            ratings={ restaurantRating ?restaurantRating.ratings: [] } 
                            isShowing={ restaurantRating }
                            hideModal={ ()=> setRestaurantRating(null)} 
                            submitAddRating={ submitAddRating }
                            restaurantName={ restaurantRating ? restaurantRating.restaurantName : "" }
                            />
                        <RestaurantsList 
                            restaurants={ filteredRestaurants }
                            showModalRating={ (restaurant)=> showModalRating(restaurant)} />
                    </div>
                </section>
            </main>
            <Footer />
        </>
        )
    }
    
    export default Home;
    