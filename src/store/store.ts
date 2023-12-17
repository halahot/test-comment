import { configureStore } from '@reduxjs/toolkit'
import { reducer } from './ducks'

const store = configureStore({
  reducer: reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  }),
})
export type RootState = ReturnType<typeof reducer>

export default store