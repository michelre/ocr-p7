import React from 'react';
import { useForm } from "react-hook-form";

const Form = ({isShowing,hideModal, submitAddRestaurant}) => {

  const { register, handleSubmit, formState: { errors } } = useForm();

  if (!isShowing) 
    return null


  return (

    <div className='modal-container'>
      <div className="modal">
      <button className="modal-button" onClick={hideModal}>×</button>
        <div className="form-card">
          <form onSubmit={handleSubmit(submitAddRestaurant)}>
            <div className='form-card__title'>Ajouter un restaurant</div>
            <div className="form-card__input">
              <input className='input_field'
                defaultValue="restaurant" {...register("restaurantNameForm")} 
                placeholder="Nom du restaurant"/>
            </div>
            <div className="form-card__input">
              <input className='input_field'
                {...register("restaurantAdressForm", { required: true })} />
            </div>
            {errors.restaurantRequired && <span>This field is required</span>}
            <div className="form-card__button">
              <input type="submit" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Form