module.exports.x = function(a, b) {
  // checks if the difference of two values is in a range of 3
  if(a.x-b.x > 3) {
    // a is right of b
    return true
  } else if(b.x-a.x > 3) {
    // a is left of b
    return true
  } else {
    // a is too close to b
    return false
  }
}
module.exports.y = function(a, b) {
  // checks if the difference of two values is in a range of 3 on the Y axis
  if(a.y-b.y > 3) {
    // a is above b
    return true
  } else if(b.y-a.y > 3) {
    // a is below b
    return true
  } else {
    // a is too close to b
    return false
  }
}
