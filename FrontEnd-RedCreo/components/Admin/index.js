import { useEffect } from "react";
import Router from 'next/router';
import { isAuth } from "../../actions/auth";

const Admin = ({children})=>{
    useEffect(()=>{
        if(!isAuth()){
            Router.push('/signin');
        }
        else if(isAuth().level!== 1){
            Router.push('/signin');
        }
    }, [])

    return <>{children}</>
}

export default Admin;