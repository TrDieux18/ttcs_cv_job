import { get } from "../utils/request";

export const login = async (user) => {
   //   console.log(user);
   const res = await get(`users?email=${user.email}&password=${user.password}`);
   return res;
};
