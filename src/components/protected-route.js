import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const protectedRoute  = ({component: Component, currentUser, ...rest}) => {
  console.log('This is what you want to see ################ ',currentUser)
    return (
      <Route
        {...rest}
        render={ props  => {
            if(currentUser){
              console.log('Im showing anyways')
              return <Component {...props}/>
            } else {
              return <Redirect to={{pathname: '/', state: {from: props.location}}} />
            }
          }
        }
      />
    )
}
export default protectedRoute;