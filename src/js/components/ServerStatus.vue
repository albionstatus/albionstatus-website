<template>
    <div class="col-md-8 col-md-offset-2">
            <span id="server-status">
                <i id="server-status-background"></i>
                <transition name="fade" mode="out-in">
                    <i :class="statusClasses" id="server-status-icon"
                       :key="statusClasses"></i>
                </transition>

            </span>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                status: null,
            };
        },
        computed: {
            statusClasses() {
                if (this.status === "online") {
                    return 'fa-thumbs-o-up text-success';
                } else if (this.status === "offline") {
                    return 'fa-thumbs-o-down text-danger';
                }
                return 'fa-hand-lizard-o text-warning';
            }
        },
        methods: {},
    }
</script>