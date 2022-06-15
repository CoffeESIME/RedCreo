import { NavBar } from "../NavBar";
import "react-datepicker/dist/react-datepicker.css";

const Layout = ({children}) => {
  return (
    <>
      <NavBar/>
      {children}
    </>
  );
};


export default Layout;