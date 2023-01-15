import React, {FC} from 'react'
import { IItem } from '../Interfaces/IInputProps'
import './item.css'
interface IItemProps{
    item: IItem;
    number: number
}
const Item:FC<IItemProps> = ({item, number}) => {
  return (
    <div className='item'>
        <div className='item__number'>{number}.</div>
        <div className='item__image'>
            <img src={item.fileInfo.filePath} alt="" width="250" height="150"/>
        </div>
        <div className='item__info'>
            <span>Item info: </span>
            <span>Item name: {item.name}</span>
            <span>Item quantity: {item.quantity}</span>
            <span>Item place: {item.place}</span>
        </div>
    </div>
  )
}

export default Item