import React,{FC} from 'react'
import { IItem } from '../Interfaces/IInputProps'
import Item from './Item'
import './itemsList.css'
interface IListProps{
    items: IItem[]
}
const ItemsList:FC<IListProps> = ({items}) => {
  return (
    <div className='items__wrapper'>
        <div className='items__container'>
            <div className='items__title'>
                <span>List</span>
            </div>
            <div className='items__list'>
                {items.map((item, i)=>{
                    return (
                        <Item key={i} number={i+1} item={item}/>
                    )
                })}
            </div>
        </div>
    </div>
  )
}

export default ItemsList