export function validateEmail(email) {
  var emailRegex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-|])+\.)+([a-zA-Z0-9]{2,4})+$/
  return emailRegex.test(email)
}
