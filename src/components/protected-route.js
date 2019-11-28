import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const protectedRoute  = ({component: Component, currentUser, ...rest}) => {
  console.log('This is what your are looking for')
  console.log({component: Component, currentUser, ...rest})
    return (
      <Route
        {...rest}
        render={ props  => {
            if(currentUser){
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