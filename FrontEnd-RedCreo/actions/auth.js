import fetch from 'isomorphic-fetch';
import { API } from '../config';
import cookie from 'js-cookie'
export const signup = (user)=>{
    return fetch(`${API}/users/new-user`, {
        method:'POST',
        headers:{
            Accept:'application/json',
            'Content-Type':'application/json'
        },
        body: JSON.stringify(user)
        
    })
    .then(response =>{
        return response.json();
    })
    .catch(error=>console.log(error))
}

export const signin = (user)=>{
    return fetch(`${API}/users/login`, {
        method:'POST',
        headers:{
            Accept:'application/json',
            'Content-Type':'application/json'
        },
        body: JSON.stringify(user)
        
    })
    .then(response =>{
        return response.json();
    })
    .catch(error=>console.log(error))
}

export const signout = (next)=>{
    removeCookie('token');
    removeLocalStorage('user')
    next();
    //return fetch(`${API}`)
}

//cookies
export const setCookie = (key, value)=>{
    if(typeof(window) !== 'undefined'){
        cookie.set(
            key, value,{
                expires: 1
            }
        );
    }
}

export const removeCookie = (key)=>{
    if(typeof(window) !== 'undefined'){
        cookie.remove(
            key,{
                expires: 1
            }
        );
    }
}

export const getCookie = (key)=>{
    if(typeof(window) !== 'undefined'){
       return cookie.get(
            key
        );
    }
}
//localstorage

export const setLocalStorage= (key, value )=>{
    if(typeof(window) !== 'undefined'){
        localStorage.setItem(key, JSON.stringify(value))
    }
}

export const removeLocalStorage= (key)=>{
    if(typeof(window) !== 'undefined'){
        localStorage.removeItem(key)
    }
}
//authmethod

export const authenticate = (data, next)=>{
    setCookie('token', data.token);
    setLocalStorage('user', data.user );
    //setLocalStorage('', data.user_name);
    next();
}

export const isAuth = () =>{
    if(typeof(window) !== 'undefined'){
        const cookieChecked = getCookie('token')
        if(cookieChecked){
            if(localStorage.getItem('user')){
                return JSON.parse(localStorage.getItem('user'))
            }else{
                return false;
            }
        }
    }
}