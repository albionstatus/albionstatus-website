export default {
  methods: {
    jump () {
      const indexPath = '/'
      this.$route.path === indexPath ? this.$router.go(0) : this.$router.replace(indexPath)
    }
  }
}
