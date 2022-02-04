import React from 'react';
import { useState } from "react";

import SearchButtonIcon from '../assets/search-btn-tasty.svg';


const Finder = (props) => {

    const [min, setMin] = useState(0);
    const [max, setMax] = useState(5);

    const onChangeMin = (e) => {
        setMin(parseInt(e.target.value));
    }
    const onChangeMax = (e) => {
        setMax(parseInt(e.target.value));
    }

    const onSubmitFilter = (e) => {
        e.preventDefault();
        props.submitFilter(min, max);
    }

    return (
        <form onSubmit={onSubmitFilter} className="search-block__form">
            <div className="search-block__wrapper">
                <div className="search-block__left search-block__item">
                    <label htmlFor="">Filtrer par avis des clients :</label>
                </div>
                <div className="search-block__separator"></div>
                <div className="search-block__center">
                    <div className="search-block__item">
                        <select name="" id="" onChange={onChangeMin}>
                            <option value="0">0</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>
                    <div className="search-block__separator"></div>
                    <div className="search-block__item">
                        <select name="" id="" onChange={onChangeMax}>
                            <option value="0">0</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>
                </div>
                <div className="serach-block__right">
                    <button type="submit" className="search-block__btn">
                        <div className="search-block__btn--icon">
                            <img className="search-block__btn--image" src={ SearchButtonIcon } alt="" />
                        </div>
                    </button>
                </div>
            </div>
        </form>
    );
};

export default Finder;