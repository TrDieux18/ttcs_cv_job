export const checkLogin = (status, user = null) => {
   return {
      type: "CHECK_LOGIN",
      payload: {
         isLoggedIn: status,
         user: user
      }
   };
};
