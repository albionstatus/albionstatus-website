<template>
    <div>
        <modal v-model="show" effect="fade">
            <!-- custom header -->
            <div slot="modal-header" class="modal-header">
                <h3 class="modal-title">
                    Imprint
                </h3>
            </div>
            <b>Information in accordance with section 5 TMG:</b>
            <br/>
            <br/>
            Developmint GbR<br/>
            Corotweg 15<br/>
            04289 Leipzig<br/>
            <h3>Represented by</h3>
            Alexander Lichter
            <br/>
            Max Langer
            <br/><br/>
            Personally liable partner
            <br/><br/>
            Alexander Lichter
            <br/>
            Max Langer
            <br/>
            <h3>Contact</h3>
            E-Mail: <a
                href="mailto:hello@albionstatus.com">hello@albionstatus.com</a>
            <br/>
            Website: <a href="http://www.developmint.de/" target="_blank">http://www.developmint.de/</a>
            <br/>
            <h3>VAT number</h3>
            VAT identification number in accordance with section 27 a of the German VAT act
            <br/>
            DE301268038
            <br/>
            <h3>
                Person responsible for content in accordance with 55 Abs. 2 RStV
            </h3>
            Alexander Lichter<br/>
            <h3>Indication of source for images and graphics</h3>
            Patterns by Hero Patterns, Steve Schoger<br>
            <h3>Disclaimer</h3>
            Accountability for content
            <br/>
            The contents of our pages have been created with the utmost care. However, we cannot guarantee the contents' accuracy,
            completeness or topicality. According to statutory provisions, we are furthermore responsible for our own content on
            these web pages. In this context, please note that we are accordingly not obliged to monitor merely the transmitted or
            saved information of third parties, or investigate circumstances pointing to illegal activity. Our obligations to
            remove or block the use of information under generally applicable laws remain unaffected by this as per &sect;&sect;
            8 to 10 of the Telemedia Act (TMG).
            <br/>
            <br/>
            Accountability for links
            <br/>
            Responsibility for the content of external links (to web pages of third parties) lies solely with the operators of
            the linked pages. No violations were evident to us at the time of linking. Should any legal infringement become known
            to us, we will remove the respective link immediately.
            <br/>
            <br/>
            Copyright
            <br/>
            Our web pages and their contents are subject to German copyright law. Unless expressly permitted by law
            (&sect; 44a et seq. of the copyright law), every form of utilizing, reproducing or processing works subject to
            copyright protection on our web pages requires the prior consent of the respective owner of the rights. Individual
            reproductions of a work are allowed only for private use, so must not serve either directly or indirectly for earnings.
            Unauthorized utilization of copyrighted works is punishable (&sect; 106 of the copyright law).
            <!-- custom buttons -->
            <div slot="modal-footer" class="modal-footer">
                <button type="button" class="btn btn-primary"
                        @click="show = false">
                    Enough of this legal stuff!
                </button>
            </div>
        </modal>
        <span @click="show=true"><slot></slot></span>
    </div>
</template>
<script>
    import {modal} from "vue-strap";

    export default {
        components: {
            modal,
        },
        data() {
            return {
                show: false,
            }
        },
    }
</script>