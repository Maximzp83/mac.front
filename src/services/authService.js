// -------Middleware Exaple------
export const saveAuthData = store => next => action => {
  if (action.type === "SET_AUTH_TO_STORE") {
    
    if (action.payload) {
     
    }
  }

  return next(action)
}
