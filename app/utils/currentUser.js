/**
 * Redirect from root path if user not signed in
 * @param  {Object} nextState state of the router
 * @param  {Object} nextState state of the router
 * @return {Dispatch} Dispatch function
 */
 export function isCurrentUser(currentUser, user) {
   return (!currentUser.isEmpty && !user.isEmpty) && (currentUser.id === user.id);
 }
