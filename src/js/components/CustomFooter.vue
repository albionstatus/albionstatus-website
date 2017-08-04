<template>
    <footer class="footer navbar">
        <div class="container-fluid">
            <div class="row-valign">
                <div class="col-md-4 text-left">
                    <faq-modal>
                <span class="text-clickable flex-valign">
                    <i class="fa fa-fw fa-info"></i> FAQ
                </span>
                    </faq-modal>
                </div>
                <div id="footer-info">
                    Powered by <a href="https://developmint.de" target="_blank"
                                  id="developmint-link"> Developmint</a>
                    &copy;
                    2016-{{(new Date()).getFullYear().toString().substr(-2)}} -
                    All rights reserved.<br>
                    Albion Online is a trademark of Sandbox Interactive GmbH.
                </div>
                <div class="col-md-4 text-right">
                    <imprint-modal>
                <span class="text-clickable flex-valign">
                    Imprint <i class="fa fa-fw fa-legal"></i>
                </span>
                    </imprint-modal>
                </div>
            </div>
        </div>
    </footer>
</template>
<script>
    import ImprintModal from "./ImprintModal.vue"
    import FaqModal from "./FaqModal.vue"

    export default {
        components: {
            ImprintModal,
            FaqModal,
        },
    }
</script>