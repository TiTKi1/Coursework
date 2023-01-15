import React, {useEffect} from 'react'
import Spinner from '../components/Spinner';
import './mainPage.css'
import ItemsList from '../components/ItemsList';
import { useAppDispatch, useAppSelector } from '../store/StoreHooks';
import { fetchItems, selectAll } from '../store/Slices/ItemSlice';
import { loadingStatuses } from '../Interfaces/IInputProps';
import store from '../store/store';
import { useGetAllItemsQuery } from '../api/apiSlice';

const MainPage = () => {
 const {data:items=[], isLoading, isError} = useGetAllItemsQuery(100);
  return (
    <div className='mainpage__wrapper'>
        {isLoading ? 
            <Spinner/>
            :
            <ItemsList items={items}/>
        }
    </div>
  )
}

export default MainPage