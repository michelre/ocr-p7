import React from "react";
import RestaurantsList from "../components/RestaurantsList";
import {useEffect, useState, useContext} from "react";
import Header from "../components/Header";
import GoogleMap from "../components/MapContainer";
import AddRestaurant from "../components/AddRestaurant";
import ShowRestaurantRating from "../components/ShowRestaurantRating";
import HeaderImage from '../assets/header-resto-finder-1920x1280.jpg';
import Finder from "../components/Finder";
import {averageCalculate} from "../utils/utils";
import Footer from "../components/Footer";
import context from "../context";
import { uuid } from 'uuidv4';

let service = null
let defaultCenterValue = {lat: 41.4004237, lng: 2.1524499};

const Home = () => {
    const [restaurants, setRestaurants] = useState([]);
    const [filteredRestaurants, setFilteredRestaurants] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [restaurantRating, setRestaurantRating] = useState(null);
    const {useApi, setUseApi} = useContext(context);
    const [defaultCenter, setDefaultCenter] = useState(defaultCenterValue);


    useEffect(() => {
        initFromFile()
    }, []);

    useEffect(() => {
        if (!useApi) {
            initFromFile()
            setDefaultCenter(defaultCenterValue);
            return;
        }

        if (useApi) {
            navigator.geolocation.getCurrentPosition(({coords}) => {
                setDefaultCenter({lat: coords.latitude, lng: coords.longitude});
                initFromService(coords);
            })
        }
    }, [useApi])

    const getRestaurantRatings = (id) => {
        return new Promise((resolve) => {
            service.getDetails({placeId: id, fields: ['review']}, resolve)
        });
    }

    const getRestaurants = (coords) => {
        return new Promise((resolve) => {
            service.nearbySearch({
                location: new window.google.maps.LatLng(coords.latitude, coords.longitude),
                radius: '5000',
                type: ['restaurant']
            }, resolve)
        });
    }

    const initFromService = async (coords) => {
        const res = await getRestaurants(coords);
        const apiRestaurants = await Promise.all(res.map(async (r) => {
            const ratings = await getRestaurantRatings(r.place_id);
            let reviews = ratings && ratings.reviews ? ratings.reviews : []
            return {
                "id": r.place_id,
                "restaurantName": r.name,
                "address": r.vicinity,
                "lat": r.geometry.location.lat(),
                "long": r.geometry.location.lng(),
                "ratings": reviews.map(r => ({stars: r.rating, comment: r.text})),
            };
        }));
        setRestaurants(apiRestaurants);
        setFilteredRestaurants(apiRestaurants);
    }

    const initFromFile = () => {
        fetch("/restaurants.json").then(res => res.json()).then(res => {
            const r = res.map(r => ({...r, id: uuid()}));
            setRestaurants(r);
            setFilteredRestaurants(r);
        })
    }

    const onSubmitFilter = (min, max) => {
        const r = restaurants.filter((restaurant) => {
            const average = averageCalculate(restaurant.ratings);
            return average >= min && average <= max;
        })
        setFilteredRestaurants(r);
    }

    const submitAddRating = (restaurantName, rating, comment) => {
        const r = restaurants.map((restaurant) => {
            if (restaurantName === restaurant.restaurantName) {
                restaurant.ratings.push({
                    "stars": rating,
                    "comment": comment
                })
            }
            return restaurant
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
                "id": uuid(),
                "restaurantName": restaurant.restaurantNameForm,
                "address": restaurant.restaurantAdressForm,
                "lat": 41.400495,
                "long": 2.15285,
                "ratings": []
            }
        restaurants.push(newRestaurant)
        setShowModal(false)
        setRestaurants(restaurants)
        onSubmitFilter(0, 5)
    }

    const onLoad = (mapInstance) => {
        service = new window.google.maps.places.PlacesService(mapInstance);
    }

    return (
        <>
            <Header/>
            <main>
                <div className="hero__banner pb-3">
                    <img className="hero__banner__image" src={HeaderImage} alt=""/>
                </div>
                <section className="flex-center">
                    <div className="pt-3">
                        <Finder
                            submitFilter={onSubmitFilter}/>
                    </div>
                </section>
                <section className="flex-center">
                    <div className="position-relative container pt-3 pb-3 ">
                        <div>
                            Utiliser l'API Place:
                            <input
                                type="checkbox"
                                checked={useApi}
                                onChange={() => setUseApi(!useApi)}
                            />
                        </div>
                        <GoogleMap
                            restaurants={filteredRestaurants}
                            toggleShowModal={toggleShowModal}
                            onLoad={onLoad}
                            defaultCenter={defaultCenter}
                        />
                        <AddRestaurant
                            restaurants={filteredRestaurants}
                            isShowing={showModal}
                            hideModal={() => setShowModal(false)}
                            submitAddRestaurant={submitAddRestaurant}/>
                        <ShowRestaurantRating
                            ratings={restaurantRating ? restaurantRating.ratings : []}
                            isShowing={restaurantRating}
                            hideModal={() => setRestaurantRating(null)}
                            submitAddRating={submitAddRating}
                            restaurantName={restaurantRating ? restaurantRating.restaurantName : ""}
                        />
                        <RestaurantsList
                            restaurants={filteredRestaurants}
                            showModalRating={(restaurant) => showModalRating(restaurant)}/>
                    </div>
                </section>
            </main>
            <Footer/>
        </>
    )
}

export default Home;
