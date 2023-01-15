import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/dist/query/react'
import { IItem } from '../Interfaces/IInputProps'

export const itemApi = createApi({
    reducerPath: 'itemsApi',//уникальный ключ(имя) для этого API
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3001'
    }),

    tagTypes: ['Items'],
    endpoints: (build) => ({
        getAllItems: build.query<IItem[],number>({
            query: (arg)=>({
                url: '/items',
            }),
            providesTags: ['Items']
        }),
        createItem: build.mutation<IItem, IItem>({
            query:(item)=>({
                url:'/items',
                method:'POST',
                body:item,
                headers:{
                    'Content-type': 'application/json'
                }
            }),
            invalidatesTags: ['Items']
        }),
        deleteItem: build.mutation<IItem, IItem>({
            query:(item)=>({
                url:`/items/${item.id}`,
                method:'DELETE',
            }),
            invalidatesTags: ['Items']
        }),
    })
})
export const {useGetAllItemsQuery, useCreateItemMutation, useDeleteItemMutation} = itemApi