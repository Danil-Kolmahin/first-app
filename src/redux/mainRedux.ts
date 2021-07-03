import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { signReducer } from './signReducer'

const reducer = combineReducers({ signReducer })

export const store = configureStore({ reducer })

export type RootState = ReturnType<typeof store.getState>
