import { UserTokenContext } from "../../contexts/UserTokenContext";
import { useContext } from "react";
import Slides from "../../components/commons/main_slider";
import Footer from "../../components/commons/footer";
import ListProducts from "../../components/products/products"

function Home() {
  const [token] = useContext(UserTokenContext);
  
  return (
    <>
      {token ? 
        <>
          <Slides />
          <ListProducts/>
          <Footer /> 
        </>: 
        <>
          <Slides />
          <ListProducts/>
          <Footer />
        </>
      }
    </>
  )
}

export default Home;
