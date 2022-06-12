import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
// We will create these two pages in a moment
//Authendication
import LoginPage from './loginpage'
import RegistrationPage from './RegistrationPage'
import ForgotPassword from './forgotpassword'
import OTP from './otp'
import LockScreen from './lockscreen'
import ApplyJobs from './ApplyJob';

//Main App
import DefaultLayout from './Sidebar/DefaultLayout';
import Settinglayout from './Sidebar/Settinglayout';
import Tasklayout from './Sidebar/tasklayout';
import Emaillayout from './Sidebar/emaillayout';
import chatlayout from './Sidebar/chatlayout';

import uicomponents from '../MainPage/UIinterface/components';
//Error Page
import Error404 from '../MainPage/Pages/ErrorPage/error404';
import Error500 from '../MainPage/Pages/ErrorPage/error500';

import { Provider } from 'react-redux'
import { store } from '../redux/store'

import {isUserLoggedIn} from '../utils'

// import 'Assets/css/font-awesome.min.css';


// window.jQuery = $;
// window.$ = $;
// import UserPage from './pages/UserPage'
/**
 * Initial Path To Check Whether User Is Logged In Or Not
 */
// const InitialPath = ({ component: Component, ...rest, authUser }) =>
//    <Route
//       {...rest}
//       render={props =>
//          authUser
//             ? <Component {...props} />
//             : <Redirect
//                to={{
//                   pathname: '/login',
//                   state: { from: props.location }
//                }}
//             />}
//    />;

export default class App extends Component {
    componentDidMount(){
        if (location.pathname.includes("login") || location.pathname.includes("register") || location.pathname.includes("forgotpassword")
        || location.pathname.includes("otp")|| location.pathname.includes("lockscreen") ) {
            // $('body').addClass('account-page');
        }else if (location.pathname.includes("error-404") || location.pathname.includes("error-500") ) {
            $('body').addClass('error-page');
        }
    }
       render(){
            const { location, match, user } = this.props;
            console.log('=======')
            console.log(isUserLoggedIn());
            if (location.pathname === '/') {
            if (isUserLoggedIn() === null) {
                return (<Redirect to={'/login'} />);
            } else {
                return (<Redirect to={'/app/main/dashboard'} />);
            }
            }
            // if (location.pathname === '/') {                 
            //        return (<Redirect to={'/app/main/dashboard'} />);                
            //  }
            return (
                <Provider store={store}>
                <Switch>
                    {/* <InitialPath
                        path={`${match.url}app`}
                        // authUser={user}
                        component={DefaultLayout}
                    /> */}
                    {/* <Redirect exact from={`${match.url}/`} to={`${match.url}/login`} /> */}
                    <Route path="/login" component={LoginPage} />
                    <Route path="/forgotpassword" component={ForgotPassword} />
                    <Route path="/register" component={RegistrationPage} />
                    <Route path="/otp" component={OTP} />
                    <Route path="/lockscreen" component={LockScreen} />
                    <Route path="/applyjob" component={ApplyJobs} />

                    <Route path="/app" component={DefaultLayout} />
                    <Route path="/settings" component={Settinglayout} />
                    <Route path="/tasks" component={Tasklayout} />
                    <Route path="/email" component={Emaillayout} />
                    <Route path="/conversation" component={chatlayout} />
                    
                    <Route path="/ui-components" component={uicomponents} />
                    <Route path="/error-404" component={Error404} />
                    <Route path="/error-500" component={Error500} />
                </Switch>
            </Provider>
            )
        }
         
}
