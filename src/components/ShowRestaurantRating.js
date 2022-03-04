import React from 'react';
import { useState } from 'react';
import Rate from 'rc-rate';

const Form = ({isShowing,hideModal, ratings, submitAddRating, restaurantName}) => {

    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')
    
    if (!isShowing) 
    return null
    
    
    return (
        
        <div className='modal-comment__'>
            <div className="modal-comment__container">
                <button className="modal-comment__button" onClick={hideModal}>×</button>
                <div className="modal-comment__header">
                    <div className="modal-content__title">commentaire : </div>
                    <ul className="modal-comment__header-text">
                        {ratings.map((rating) => 
                        <li>
                            {rating.comment}
                            <Rate value={ rating.stars }  allowHalf={ true }/* Rating Props */ />
                        </li> 
                        )}
                    </ul>
                </div>
                <div className="modal-comment__form-container">
                    <div className="modal-comment__form-title">
                        Donner votre avis :
                    </div>
                    <form className='modal-comment__form' onSubmit={() => submitAddRating(restaurantName, rating, comment)}>
                        <input onChange={(event) => setRating(parseInt(event.target.value))} type="number" min={0} max={5} />
                        <textarea onChange={(event) => setComment(event.target.value)} name="description" id="" cols="30" rows="10"></textarea>
                        <button type='submit'>Ajouter un commentaire</button>
                    </form>
                </div>
            </div>
        </div>
        );
    }
    
    export default Form