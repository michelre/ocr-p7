import React from 'react';
import { useForm } from "react-hook-form";

const Form = ({isShowing,hideModal, submitAddRestaurant}) => {

  const { register, handleSubmit, formState: { errors } } = useForm();

  if (!isShowing) 
    return null


  return (

    <div className='modal-container'>
      <div className="add-modal">
      <button className="add-modal-button" onClick={hideModal}>×</button>
        <div className="add-form-card__">
          <form  className="add-form-card__wrapper" onSubmit={handleSubmit(submitAddRestaurant)}>
            <div className='add-form-card__title'>Ajouter un restaurant</div>
            <div className="add-form-card__input">
              <input className='input_field'
                defaultValue="Nom du restaurant..." {...register("restaurantNameForm")} 
                placeholder="Nom du restaurant"/>
            </div>
            <div className="add-form-card__input">
              <input className='input_field'
                defaultValue="Adresse du restaurant..." {...register("restaurantAdressForm", { required: true })}
                placeholder="Adresse du restaurant..." />
            </div>
            {errors.restaurantRequired && <span>This field is required</span>}
            <div className="add-form-card__button">
              <input type="submit" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Form