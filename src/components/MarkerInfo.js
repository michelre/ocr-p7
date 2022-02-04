import { StreetViewPanorama } from '@react-google-maps/api';
import Rates from './Rates';
import React, {useState} from 'react';


const MarkerInfo = (props) => {

    const [streetVisible, setStreetVisible] = useState (false);
    if (streetVisible) {
        return <>
                    <StreetViewPanorama
                    position={{lat: props.item.lat, lng: props.item.long}}
                    visible={true}
                    onVisibleChanged={() => setStreetVisible(false)}
                    />
                </>

    }
    return (
        <>
            <p style={ {color: "black"} }>{ props.item.restaurantName }</p>
            <p style={ {color: "black"} }>{ props.item.address }</p>
            <Rates ratings={props.item.ratings}/>
            <button onClick={() => {setStreetVisible(true)}}>
                voir street view
            </button>
            
        </>

        )
    }
    
    export default MarkerInfo