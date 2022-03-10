import React from 'react';
import Rate from 'rc-rate';
import { averageCalculate } from '../utils/utils';
import 'rc-rate/assets/index.css';

const Rates = ({ ratings }) => {
const moyenne = averageCalculate(ratings);

    return (
        <>
            {/* <span>{ moyenne.toFixed(1) }</span> */}
            <Rate value={ moyenne }  allowHalf={ true }/* Rating Props */ />
        </>
    );
};

export default Rates;