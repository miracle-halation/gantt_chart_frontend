// import Cookies from "universal-cookie"

// export default function({ $axios }) {
//   const cookies = new Cookies()
//   const headers = {
//     uid: cookies.get('id-u'),
//     access_token: cookies.get('tk-pass'),
//     client: cookies.get('cli-us')
//   }
//   const OPTIONS = {
//     path: '/',
//     maxAge: 60 * 60 * 24 * 7
//   }
//   $axios.onRequest(config => {
//     config.defaults.headers.client = headers.client
//     config.defaults.headers["access-token"] = headers.access_token
//     config.defaults.headers.uid = headers.uid
//     return config
//   })

//   $axios.onResponse(response => {
//     if (response.headers.client) {
//       cookies.set('id-u', response.headers['uid'], OPTIONS)
//       cookies.set('tk-pass', response.headers['access-token'], OPTIONS)
//       cookies.set('cli-us', response.headers['client'], OPTIONS)
//     }
//   })
// }

export default function({ $axios }) {
  $axios.onRequest(config => {
    config.headers.client = window.localStorage.getItem("client")
    config.headers["access-token"] = window.localStorage.getItem("access-token")
    config.headers.uid = window.localStorage.getItem("uid")
    config.headers["token-type"] = window.localStorage.getItem("token-type")
  })

  $axios.onResponse(response => {
    if (response.headers.client) {
      localStorage.setItem("access-token", response.headers["access-token"])
      localStorage.setItem("client", response.headers.client)
      localStorage.setItem("uid", response.headers.uid)
      localStorage.setItem("token-type", response.headers["token-type"])
    }
  })
}