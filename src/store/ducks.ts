import { combineReducers } from "@reduxjs/toolkit";
import * as comment from './comment'

/**
 * Здесь комбинируется все редьюсеры экшены и селекторы будущего приложения
 * 
 */

export const reducer = combineReducers({
    comment: comment.reducer
})

export const actions = {
    comment: comment.actions
}

export const selectors = {
    comment: comment.selectors
}