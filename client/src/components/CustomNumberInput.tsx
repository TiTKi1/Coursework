import React,{FC, useState} from 'react';
import { IInputProps } from '../Interfaces/IInputProps';
import './customNumberInput.css'

const CustomNumberInput:FC<IInputProps> = (props) => {
  const {value, setNumber, id, name, type} = props;
  const handleClick = (arg: number) => {
    if(value <= 0 && arg <=0){
      return;
    }
    setNumber(value=>value+arg)
  }

  return (
    <div className='number__containter'>
        <button type="button" id='decrement' onClick={()=>handleClick(-1)}>-</button>
        <input id={id} name={name} type={type} value={value} readOnly/>
        <button type="button" id='increment' onClick={()=>handleClick(1)}>+</button>
        <label htmlFor="">{props.label}</label>
    </div>
  )
}

export default CustomNumberInput