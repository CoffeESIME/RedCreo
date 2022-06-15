import Layout from "../components/Layout/index.js";
import Link from "next/link";
import { SignInForm } from "../components/SignInForm/index.js";
const Signin =()=>{
    return(
        <>
        <Layout>
            <SignInForm/>
            <Link href='/'>Home</Link>
        </Layout>
        </>
    );
}
export default Signin;