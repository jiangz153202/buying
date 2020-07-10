const capiHostUrl = "https://capi.wm.dddingjiu.com";

const enumType = {
  ACCESS_TOKEN:'__access_token'
}

const prod = {
  authorizeApi : {
    host:`${capiHostUrl}`
  },
}
module.exports = {
  enumType,
  baseAPI:{
    ...prod
  }
}