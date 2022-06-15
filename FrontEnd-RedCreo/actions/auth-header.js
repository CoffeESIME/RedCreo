import { getCookie } from "./auth";
export default function authHeader(){
    const user = getCookie('token')
    if (user){
        return { 'x-access-token': user};
    }
    else{
        return {};
    }
}