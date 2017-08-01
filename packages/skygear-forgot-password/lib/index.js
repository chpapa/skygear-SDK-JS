import skygear from 'skygear-core';

/**
 * Send a forgot password email to the email address.
 *
 * @injectTo {AuthContainer} as forgotPassword
 * @param  {String} email - target email address
 * @return {Promise} promise
 *
 * @example
 * skygear.auth.forgotPassword(email).then(...);
 */
export function _forgotPassword(email) {
  return this.container.lambda('user:forgot-password', {
    email: email
  });
}

/**
 * Reset password with a code generated by the server. The code can be
 * retrieved by forgotPassword.
 *
 * @injectTo {AuthContainer} as resetPassword
 * @param  {String} userID - target user ID
 * @param  {String} code - code generated by server
 * @param  {Number} expireAt - utc timestamp
 * @param  {String} newPassword - new password of the user
 * @return {Promise} promise
 *
 * @example
 * skygear.auth.resetPassword(userID, code, expireAt, newPassword).then(...);
 */
export function _resetPassword(userID, code, expireAt, newPassword) {
  return this.container.lambda('user:reset-password', {
    user_id: userID,     /* eslint camelcase: 0 */
    code: code,          /* eslint camelcase: 0 */
    expire_at: expireAt, /* eslint camelcase: 0 */
    new_password: newPassword
  });
}

/**
 * @ignore
 */
export const forgotPassword = _forgotPassword.bind(skygear.auth);

/**
 * @ignore
 */
export const resetPassword = _resetPassword.bind(skygear.auth);

/**
 * @private
 */
export const injectToContainer = (container = skygear) => {
  const authContainerPrototype = container.auth.constructor.prototype;
  authContainerPrototype.forgotPassword = _forgotPassword;
  authContainerPrototype.resetPassword = _resetPassword;
};
