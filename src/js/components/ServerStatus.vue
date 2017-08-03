<template>
    <div class="col-md-8 col-md-offset-2">
        <div>
            <span class="fa-stack fa-5x">
                <i class="fa fa-fw fa-circle fa-stack-2x"></i>
                <i class="fa fa-fw fa-thumbs-o-down text-danger fa-stack-1x"></i>
            </span>
        </div>
        <div>
            <span class="fa-stack fa-5x">
                <i class="fa fa-fw fa-circle fa-stack-2x"></i>
                <i class="fa fa-fw fa-thumbs-o-up text-success fa-stack-1x"></i>
            </span>
        </div>
        <div>
            <span class="fa-stack fa-5x">
                <i class="fa fa-fw fa-circle fa-stack-2x"></i>
                <i class="fa fa-fw fa-hand-lizard-o text-warning fa-stack-1x"></i>
            </span>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                status: null,
            };
        },
        methods: {}
    }
</script>