<template>
    <div>
        <modal v-model="show" effect="fade">
            <!-- custom header -->
            <div slot="modal-header" class="modal-header">
                <h2 class="modal-title">
                    FAQ
                </h2>
            </div>

            <div v-for="topic in content">
                <h4>{{topic.question}}</h4>
                <p v-html="topic.answer"></p>
            </div>

            <!-- custom buttons -->
            <div slot="modal-footer" class="modal-footer">
                <button type="button" class="btn btn-success"
                        @click="show = false">
                    Okay, I got it guys!
                </button>
            </div>
        </modal>
        <span @click="show=true"><slot></slot></span>
    </div>
</template>
<script>
    import {modal} from "vue-strap";
    import faq from "../faq";

    export default {
        components: {
            modal,
        },
        data() {
            return {
                show: false,
                content: faq,
            }
        },
    }
</script>