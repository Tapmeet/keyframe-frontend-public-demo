import * as React from 'react';
import { Container } from 'reactstrap';
import logo from './../Assets/images/header/logo.svg';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
const SiteHeader = (props) => {
  const [userToken, setUserToken] = React.useState('');
  const cookies = new Cookies();
  React.useEffect(() => {
    console.log(props)
    if (cookies.get('token')) {
      setUserToken(cookies.get('token'));
    }
  }, [userToken, cookies]);

  /**
    * Logout Function 
    * @desc Remove user data from cookies
    * @returns na
    */
   // eslint-disable-next-line
  function logOut() {
    cookies.get('token');
    cookies.remove('token');
    window.location.reload();
  }
  return (
    <header className={props.nav == "dark" ? "header dark-header" : "header" }>
      <Container>
        <div className="row justify-content-between align-items-center">
          <div className="logo-section"><Link to="/"><img src={logo} alt="Key Frame" /></Link></div>
          
          {// eslint-disable-next-line 
          props.hide != 'nav' ?
            <div className="login-section loggedin">
              <div>
              <Link to="/" >Create Video</Link>
                <Link to="/signup">Templates</Link>  
                <Link to="/pricing">Pricing</Link>
                <Link to="/support">Support</Link></div>
            </div>
            : null}
             <div className="signupsection ">
             <Link className="button-header" to="/signup">Signup</Link>  
             </div>
        </div>
        
      </Container>
    </header>
  );
};
export default SiteHeader