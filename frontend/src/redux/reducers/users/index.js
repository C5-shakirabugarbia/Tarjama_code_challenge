import { createSlice } from "@reduxjs/toolkit";
const users = createSlice({
  name: "users",
  initialState: {
    isLoggedIn: JSON.parse(localStorage.getItem("status")) || false,
    users: [],
    posts: [],
    comments: [],
    albums: [],
  },
  reducers: {
    setLogOut: (state, action) => {
      state.isLoggedIn = false;
      localStorage.removeItem("status");
    },
    setLogin: (state, action) => {
      state.isLoggedIn = true;
      localStorage.setItem("status", state.isLoggedIn);
    },
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    setAlbums: (state, action) => {
      state.albums = action.payload;
    },
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
    deletepost: (state, action) => {
      state.posts = state.posts.filter((element, index) => {
        return element.id !== action.payload;
      });
    },
    addPost: (state, action) => {
      state.posts.unshift(action.payload);
    },
    updatePost: (state, action) => {
      state.posts = state.posts.map((post) => {
        if (post.id === action.payload.id) {
          return action.payload;
        }
        return post;
      });
    },

    setComments: (state, action) => {
      state.comments = action.payload;
    },
  },
});
export const {
  setComments,
  setPosts,
  setUsers,
  setAlbums,
  deletepost,
  addPost,
  updatePost,
  setLogin,
  setLogOut,
} = users.actions;
export default users.reducer;
