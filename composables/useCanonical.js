import useCurrentUrl from '@/composables/useCurrentUrl'

export function useCanonical (ctx) {
  const baseUrl = useCurrentUrl(ctx)
  const urlWithSlash = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`
  return { rel: 'canonical', href: urlWithSlash }
}
