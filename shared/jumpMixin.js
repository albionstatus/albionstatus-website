export default {
  methods: {
    jump() {
      this.$route.path === '/' ? this.$router.go(0) : this.$router.replace('/')
    }
  }
}
