
<script>
// extends from BaseView.
import ZeroBaseView from '@/components/zero/views/BaseView'

// mixins.
import LoadSections from '@/libs/zero/load-sections'

export default {

    layout: 'zero',
    auth: false,
    name: 'ZeroHome',

    metaInfo: {
        title: 'Home'
    },

    extends: ZeroBaseView,

    mixins: [
        LoadSections([
            'hero'
        ]),
    ],
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
