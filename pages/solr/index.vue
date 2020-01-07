<template lang="pug">
v-container( grid-list-xs )

  // the search row, with text field and buttons.
  v-card( class="d-flex flex-row" flat tile )
    // need use dense to align the size with buttons.
    v-text-field( 
      dense
      id='input-number'
      autocomplete="off"
      v-model='query' 
      label="Type your query here"
    )
    // search button
    v-btn( 
      color="warning" 
      dark icon
      class="pa-2"
    )
      v-icon mdi-magnify
      | search
    // setting button
    v-btn(
      color="success darken-1"
      dark icon
      class="pa-2"
      @click.stop="settingsDialog = true"
    )
      v-icon mdi-settings
      | settings

  v-dialog( v-model="settingsDialog" max-width="680px" persistent )
    card-settings(
      :cancelSettings="settingsCancel",
      :saveSettings="settingsSave"
    )

  // search result list with facet filters on the left side.
  v-layout( row wrap )
     // the search result list.
</template>

<script>
// import other vue component
import SettingsCard from '@/pages/solr/card-settings.vue';

export default {
    components: {
        'card-settings': SettingsCard
    },

    layout: 'vuetify',

    name: 'solr-search',

    data () {

        return {

            query: '*:*',
            // the switch to show or hide the settings dialog.
            settingsDialog: false,
        };
    },

    computed: {

    },

    methods: {

        /**
         */
        settingsCancel: function() {

            this.settingsDialog = false;
        },

        /**
         */
        settingsSave: function() {

            this.settingsDialog = false;
        }
    }
}
</script>
