import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    status: false,
}

export const reloadSlice = createSlice({
    name: 'reload',
    initialState,
    reducers: {
        load:(state,action)=>{
            state.status = true
        },
        stopLoad:(state)=>{
            state.status = false
        }
    },
})
export const { load, stopLoad } = reloadSlice.actions
export default reloadSlice.reducer