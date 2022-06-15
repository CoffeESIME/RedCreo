import Layout from "../components/Layout/index.js";
import { SignUpForm } from "../components/SignupForm/index.js";
import Link from "next/link";

const Signup =()=>{
    return(
        <>
        <Layout>
            <SignUpForm></SignUpForm>
            <Link href='/'>Home</Link>
        </Layout>
        </>
    );
}
export default Signup;