const INDEX_PATH = '/'

export const useJump = () => {
  const router = useRouter()
  const route = useRoute()
  const jump = () => {
    route.path === INDEX_PATH
      ? router.go(0)
      : router.push(INDEX_PATH)
  }
  return {
    jump
  }
}