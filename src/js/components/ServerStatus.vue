<template>
    <div class="col-md-8 col-md-offset-2 text-center">
            <span id="server-status">
                <i id="server-status-background"></i>
                <transition name="fade" mode="out-in">
                    <i :class="statusClasses +' '+ statusIconClasses"
                       id="server-status-icon"
                       :key="statusClasses"></i>
                </transition>
            </span>
        <p class="text-muted h1">The servers are
            <transition name="fade" mode="out-in">
                <span :key="statusClasses" class="text-underline"
                      :class="statusClasses">
                    {{status}}
                </span>
            </transition>
        </p>
        <transition name="fade" mode="out-in">
            <p class="text-muted h4" :key="message"
               v-if="showReason">Message: {{message}}</p>
        </transition>
        <transition name="fade" mode="out-in">
            <p class="text-muted"
               v-if="lastChecked !== null">
                Last checked: {{ lastChecked | moment("HH:mm:ss") }}</p>
        </transition>
    </div>
</template>

<script>
    import moment from "moment-timezone"

    export default {
        data() {
            return {
                status: "???",
                lastChecked: null,
                message: "",
            };
        },
        computed: {
            statusIconClasses() {
                if (this.status === "online") {
                    return 'fa-check';
                } else if (this.status === "offline") {
                    return 'fa-times';
                }
                return 'fa-question';
            },
            statusClasses() {
                if (this.status === "online") {
                    return 'text-success';
                } else if (this.status === "offline") {
                    return 'text-danger';
                }
                return 'text-warning';
            },
            showReason() {
                return this.status !== "online" && this.status !== "???"
            }
        },
        methods: {
            getStatus() {
                this.axios.get("https://api.albionstatus.com/current/")
                    .then(({data}) => this.setStatus(data))
                    .catch((err) => console.log(err));
            },
            setStatus(data) {
                if (typeof data === "undefined" || data.length === 0) {
                    return
                }
                let newestData = data[0];
                this.status = newestData.current_status;
                this.lastChecked = moment(newestData.created_at);
                this.message = newestData.message;
            }
        },

        mounted() {
            this.getStatus();
            setInterval(() => this.getStatus(), 30 * 1000);
        }
    }
</script>