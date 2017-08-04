<template>
    <footer class="footer navbar navbar-fixed-bottom">
        <div class="row">
            <div id="footer-info">
                Powered by <a href="https://developmint.de" target="_blank"
                              id="developmint-link"> Developmint</a>
                &copy;
                2016-{{(new Date()).getFullYear().toString().substr(-2)}} -
                All rights reserved.<br>
                AlbionOnline is a trademark of Sandbox Interactive GmbH.
            </div>
        </div>
    </footer>
</template>
<script>
    import moment from "moment-timezone"

    export default {
        data() {
            return {};
        },
    }
</script>