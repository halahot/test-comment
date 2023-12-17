import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Comment } from "../types";
import { RootState } from "../store";

type CommentState = {
  comments: Comment[];
}

const initialState: CommentState = {
  comments: []
}

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    addComment(state, {payload}: PayloadAction<Comment>) {
      state.comments.push(payload)
    },
    toggleComment(state, {payload}: PayloadAction<string>) {
      const findElement = state.comments.filter((comment: Comment) => comment.id === payload);
      if(findElement.length > 0) {
        findElement[0].isHidden = !findElement[0].isHidden;
      }
    },
    setRating(state, {payload}: PayloadAction<{id: string; rating: number}>) {
      const findElement = state.comments.filter((comment: Comment) => comment.id === payload.id);
      if(findElement.length > 0) {
        findElement[0].rating = payload.rating;
      }
    } 
  }
})

export const selectors = {
  selectAllComment: (state: RootState) => state.comment.comments
}


export const { reducer, actions } = commentsSlice;