const initialState = {
   isLoggedIn: false,
   user: null
};

const loginReducer = (state = initialState, action) => {
   switch (action.type) {
      case "CHECK_LOGIN":
         return {
            ...state,
            isLoggedIn: action.payload.isLoggedIn,
            user: action.payload.user
         };
      default:
         return state;
   }
};

export default loginReducer;
