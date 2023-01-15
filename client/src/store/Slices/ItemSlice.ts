import { createSlice, createEntityAdapter, PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { useHttp } from '../../hooks/http.hook';
import { IItem, loadingStatuses } from '../../Interfaces/IInputProps';

const adapter = createEntityAdapter<IItem>();
const initialState = adapter.getInitialState({
    loadingStatus: loadingStatuses.IDLE
});

export const fetchItems = createAsyncThunk(
    'items/fetchItems',
    async () => {
        const {request} = useHttp()
        const items: IItem[] = await request('http://localhost:3001/items')
        return items;
    }
)
const itemsSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addItem: (state, action: PayloadAction<IItem>)=> {
            adapter.addOne(state, action.payload);
        },
        removeItem: (state, action: PayloadAction<number>) =>{
            adapter.removeOne(state, action.payload);
        },
    },
    extraReducers: (builder)=>{
        builder.addCase(fetchItems.pending, (state, action)=>{
            state.loadingStatus = loadingStatuses.PENDING
        })
        .addCase(fetchItems.fulfilled, (state, action: PayloadAction<IItem[]>)=>{
            state.loadingStatus = loadingStatuses.IDLE
            adapter.setAll(state, action.payload)
        })
        .addCase(fetchItems.rejected, (state, action)=>{
            state.loadingStatus = loadingStatuses.ERROR
            console.log(action.error) 
        })
        .addDefaultCase(()=>{})
    }
})

export const {actions, reducer: itemsReducer} = itemsSlice;

export const {selectAll} = adapter.getSelectors()
// export const itemsSel = createSelector(
//     selectAll,
//     (todos)=>todos
// )