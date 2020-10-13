export default function (ctx) {
  const { root } = ctx

  const { baseUrl } = root.$config
  const { path } = root.$route

  return baseUrl + path
}
