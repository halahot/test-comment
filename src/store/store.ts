import { configureStore } from '@reduxjs/toolkit'
import { reducer } from './ducks'

const store = configureStore({
  reducer: reducer,
})
export type RootState = ReturnType<typeof reducer>

export default store