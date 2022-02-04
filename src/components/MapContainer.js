import React from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { useState} from "react";
import MarkerInfo from './MarkerInfo';


const MapContainer = ({ restaurants }) => {

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

  const [ selected, setSelected ] = useState(null);
  
  const onSelect = restaurant => {
    // console.log(restaurant);
    setSelected(restaurant);
  };
  
  const mapContainerStyle = {        
    height: "50vh",
    width: "100%",
  };
    
  const defaultCenter = {
    lat: 41.4004237, lng: 2.1524499
  };
    
    return (
      <div className='map'>
        <LoadScript
          googleMapsApiKey={process.env.REACT_APP_GOOGLE_KEY}>
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              zoom={15}
              center={defaultCenter}
              >
              {
                restaurants.map(restaurant => {
                  return (
                    <Marker
                    key={restaurant.restaurantName} 
                    position={{ lat: restaurant.lat, lng: restaurant.long }}
                    onClick={() => onSelect(restaurant)}
                    />
                    )
                })
              }
              {
                selected && 
                (
                  <InfoWindow
                  position={{ lat: selected.lat, lng: selected.long }}
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