import Layout from "../components/Layout/index.js";
import { SignUpForm } from "../components/SignupForm/index.js";
import Link from "next/link";

const Signup =()=>{
    return(
        <>
        <Layout>
            <SignUpForm></SignUpForm>
        </Layout>
        </>
    );
}
export default Signup;