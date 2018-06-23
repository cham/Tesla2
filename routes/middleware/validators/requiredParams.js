const idRegex = /[0-9a-f]{24}/
const base64Regex = /^data:image\/[a-z]+;base64,/
const bcryptRegex = /^\$2b\$.{56}$/
const jwtRegex = /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/

module.exports = (body, validationSchema) => {
  const failures = []
  Object.keys(validationSchema).forEach((key) => {
    if (!body.hasOwnProperty(key)) {
      failures.push(key)
      return
    }
    switch (validationSchema[key].type) {
      case 'Number':
        if (isNaN(body[key])) {
          failures.push(key)
        }
        break
      case 'String':
        if (!body[key].length || body[key].length > validationSchema[key].maxLength) {
          failures.push(key)
        }
        break
      case 'ID':
        if (!body[key].match(idRegex)) {
          failures.push(key)
        }
        break
      case 'Base64':
        if (!body[key].match(base64Regex)) {
          failures.push(key)
        }
        break
      case 'Date':
        if (isNaN(parseInt(body[key], 10)) || isNaN(new Date(parseInt(body[key], 10)).getTime())) {
          failures.push(key)
        }
        break
      case 'Bcrypt':
        if (!body[key].match(bcryptRegex)) {
          failures.push(key)
        }
        break
      case 'JWT':
        if (!body[key].match(jwtRegex)) {
          failures.push(key)
        }
        break
      default:
        failures.push(key)
        break
    }
  })
  if (!failures.length) {
    return
  }
  return `validation failed for ${failures.join(', ')} parameter(s)`
}
