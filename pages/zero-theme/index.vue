
<script>
// extends from BaseView.
import ZeroBaseView from '@/components/zero/views/BaseView'

export default {

    layout: 'zero',
    auth: false,
    name: 'ZeroHome',

    metaInfo: {
        title: 'Home'
    },

    extends: ZeroBaseView,

    //data: () => (
    //    { sections: [
    //          'hero'
    //        ]
    //    }
    //),

    props: {
        id: {
            type: String,
            default: 'home',
        }
    }
}
</script>
