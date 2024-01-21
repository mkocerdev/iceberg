export default ({ $axios, env }, inject) => {
  const api = $axios.create()

  api.setBaseURL(env.authApiBaseUrl)
  api.setHeader('Authorization', `Bearer ${env.airtableToken}`)

  // Inject to context as $api
  inject('api', api)
}
