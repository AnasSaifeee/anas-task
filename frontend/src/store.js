import {configureStore} from '@reduxjs/toolkit'
import fetchphotos from './features/fetchphotos'
const store=configureStore({
    reducer:{
     fetchphotos
    }
})

export default store