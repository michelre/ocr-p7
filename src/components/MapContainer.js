import React, {useState} from 'react';
import {GoogleMap, LoadScript, Marker, InfoWindow} from '@react-google-maps/api';
import MarkerInfo from './MarkerInfo';


const MapContainer = ({restaurants, toggleShowModal, onLoad, defaultCenter}) => {

    // const locations = [
    //   {
    //     name: "Botafumeiro",
    //     address:"Carrer Gran de Gràcia, 81, 08012 Barcelona, Spain",
    //     location: {
    //       lat: 41.4004237,
    //       lng: 2.1524499
    //     },
    //   },
    //   {
    //     name: "Restaurant Cibulet",
    //     address:"Carrer de Francisco Giner, 54, 08012 Barcelona, Spain",
    //     location: {
    //       lat: 41.3998455,
    //       lng: 2.3998455
    //     },
    //   }
    // ];

    const [selected, setSelected] = useState(null);

    const onSelect = restaurant => {
        // console.log(restaurant);
        setSelected(restaurant);
    };

    const mapContainerStyle = {
        height: "50vh",
        width: "100%",
    };

    return (
        <div className='map flex-center pb-3'>
            <LoadScript
                libraries={['places']}
                googleMapsApiKey={process.env.REACT_APP_GOOGLE_KEY}>
                <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    zoom={15}
                    center={defaultCenter}
                    onClick={toggleShowModal}
                    onLoad={onLoad}
                >
                    {
                        restaurants.map(restaurant => {
                            return (
                                <Marker
                                    key={restaurant.id}
                                    position={{lat: restaurant.lat, lng: restaurant.long}}
                                    onClick={() => onSelect(restaurant)}
                                />
                            )
                        })
                    }
                    {
                        selected &&
                        (
                            <InfoWindow
                                position={{lat: selected.lat, lng: selected.long}}
                                clickable={true}
                                onCloseClick={() => setSelected(null)}
                            >
                                <MarkerInfo
                                    item={selected}
                                ></MarkerInfo>
                            </InfoWindow>
                        )
                    }
                </GoogleMap>
            </LoadScript>
        </div>

    )
}

export default MapContainer;
