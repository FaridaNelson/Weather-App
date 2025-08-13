import { createContext } from "react";

const CurrentUserContext = createContext({
  isLoggedIn: false,
  user: null,
});

export default CurrentUserContext;
