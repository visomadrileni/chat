import React from 'react';
import {Route,withRouter,Switch,Redirect} from 'react-router-dom';
import {TransitionGroup,CSSTransition} from 'react-transition-group';
import {getToken} from '../../utils/utilMethods';
import App from '../others/app/App';
import SignIn from './sign-in/SignIn';
import SignUp from './sign-up/SignUp';
import Chat from './entry-home/chat/Chat';

const RoutesContainer = ({location}) => {
	const Workaround = ({ action, children }) => (
		action === 'REPLACE' ? null : children
	);

    const CustomRoute = ({protectedRoute,component:Component,...rest}) => {
        return (<Route {...rest} render={props => {
                  const {history} = props;
                  const token = getToken();

                  if(!token && protectedRoute){
                      return (<Workaround action={history.action}> 
                                 <Redirect to={{pathname:'signin', state:{from: props.location }}} />
                              </Workaround>)
                  }

                  if(token && !protectedRoute){
                      return (<Workaround action={history.action}>
                                <Redirect to={{pathname:'/',state: {from: props.location }}} />
                             </Workaround>)
                  }

                return (<Component {...props} />)  
         }}/>)
    }

    return (
        <App>
            <TransitionGroup className="transition-group-container">
                <CSSTransition key={location.key} timeout={{enter:300,exit:200}} classNames="fade">
                     <section className="route-section">
                         <Switch location={location}>
                              <CustomRoute exact path="/" component={Chat} protectedRoute />
                              <CustomRoute exact path="/signin" component={SignIn} />
                              <CustomRoute exact path="/signup" component={SignUp} />
                         </Switch>
                     </section>
                </CSSTransition>
            </TransitionGroup>
        </App>
    )
};

export default withRouter(RoutesContainer);