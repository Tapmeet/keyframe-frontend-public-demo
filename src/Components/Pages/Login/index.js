import React from 'react';
import Login from './Login';
import Header from "./../../Header";
import Footer from "./../../Footer";
import jwt_decode from "jwt-decode";
import Cookies from "universal-cookie";
import { useHistory } from 'react-router-dom';
const LoginPage = () => {
  const history = useHistory();
  const cookies = new Cookies();
  const tokens = localStorage.getItem('token');
  React.useEffect(() => {
    if (tokens != null) {
      history.push('/home');
    }
  }, []);
  return (<div><Login /></div>)
}
export default LoginPage