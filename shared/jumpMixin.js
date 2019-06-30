export default {
  methods: {
    jump() {
      return this.$route.path === '/' ? this.$router.go(0) : this.$router.replace('/')
    }
  }
}
