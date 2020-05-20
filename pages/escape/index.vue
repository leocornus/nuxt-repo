<template lang="pug">
v-container(grid-list-md)
  v-stepper( v-model="e1" )
    v-stepper-header
      v-stepper-step( :complete="e1 > 1" step="1" ) Step One
      v-divider
      v-stepper-step( :complete="e1 > 2" step="2" ) Step Two
      v-divider
      v-stepper-step( step="3" ) Step Three

    v-stepper-items
      v-stepper-content( step="1" )
        v-card( color="grey lighten-1" height="400px" ).mb-12
          h2 Step One
          p Solve the following puzzle and fill out the box to move forward.
          v-row( justify="center" )
            v-col(cols="4")
              v-row( justify="center")
                v-col(cols="2")
                  v-text-field(solo dense)
                v-col(cols="2")
                  v-text-field(solo dense)
                v-col(cols="2")
                  v-text-field(solo dense)
                v-col(cols="2")
                  v-text-field(solo dense)
                v-col(cols="2")
                  v-text-field(solo dense)
        v-btn( color="primary" @click="e1 = 2" ) Continue

      v-stepper-content( step="2" )
        v-card( color="grey lighten-1" height="400px" ).mb-12
          h3 Step Two
        v-btn( color="primary" @click="e1 = 3" ) Continue

      v-stepper-content( step="3" )
        v-card( color="grey lighten-1" height="400px" ).mb-12
          h3 Step Three
        v-btn( color="primary" @click="e1 = 1" ) Continue
</template>

<script>
export default {

    layout: 'vuetify',
    name: 'escape',
    auth: false,

    data() {

        return {
            "e1": 1
        };
    }
}
</script>
