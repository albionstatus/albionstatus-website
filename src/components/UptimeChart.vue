<script>
  import { Line, mixins } from 'vue-chartjs'
  import { colors } from '../../tailwind'

  export default {
    extends: Line,
    mixins: [mixins.reactiveData],
    data () {
      return {
        data: [],
      }
    },
    computed: {
      labels () {
        return this.data.map(d => this.$moment(d.created_at).format('MM-DD-YY HH:mm'))
      },
      uptimeData () {
        return this.data.map(d => d.current_status === 'online' ? 1 : 0)
      },
      uptimeDataColors () {
        return this.uptimeData.map(d => d ? colors.green : colors.red)
      }
    },
    watch: {
      data (n) {
      }
    },
    methods: {
      async fetchData () {
        let {data} = await this.$http.get(`?timestamp=${this.$moment().subtract(1, 'days').format()}`)
        this.data = data.reverse()
      },
      async rebuildChart () {
        await this.fetchData()
        if (this.$data._chart) {
          this.$data._chart.destroy()
        }
        this.renderChart({
          labels: this.labels,
          datasets: [
            {
              label: 'Uptime',
              backgroundColor: colors.green,
              data: this.uptimeData,
              color: this.uptimeDataColors,
            }
          ]
        }, {
          responsive: true, maintainAspectRatio: false,
          chartArea: {
            backgroundColor: 'rgba(251, 85, 85, 0.4)'
          }
        })
      }
    },
    async mounted () {
      this.rebuildChart()
      setInterval(this.rebuildChart, 30 * 1000)
    }
  }
</script>
