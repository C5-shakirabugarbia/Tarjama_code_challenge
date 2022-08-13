import { configureStore } from "@reduxjs/toolkit";
import users from "./reducers/users";
export default configureStore({
  reducer: {
    users: users,
  },
});
