<template lang="pug">
v-container( grid-list-xs )
  h2 Add Accomplishment
  v-form(v-model="formValid")
    v-row(align="end")
      v-col(cols="12")
        v-text-field(
          label="Accomplishment Description"
          v-model="accomplishment"
          required
          :rules="[v => !!v || 'Description is required']"
        )
    v-row
      v-col(cols="3")
        v-menu(
          ref="menu"
          v-model="menu"
          :close-on-content-click="false"
          :return-value.sync="day"
          transition="scale-transition"
          offset-y
          min-width="290px"
        )
          template( v-slot:activator="{ on }" )
            v-text-field(
              v-model="day"
              label="Pick the date"
              prepend-icon="mdi-calendar-range"
              readonly
              v-on="on"
            )
          // the model should be in ISO format.
          v-date-picker(
            v-model="day"
            scrollable
            color="green lighten-1"
            @click:date="$refs.menu.save(day)"
          )
      v-col(cols="3")
        v-menu(
          ref="menut"
          v-model="menut"
          :close-on-content-click="false"
          :return-value.sync="time"
          transition="scale-transition"
          offset-y
          min-width="290px"
        )
          template( v-slot:activator="{ on }" )
            v-text-field(
              v-model="time"
              label="Pick the time"
              prepend-icon="mdi-calendar-clock"
              readonly
              v-on="on"
            )
          // the model should be in ISO format.
          v-time-picker(
            v-model="time"
            scrollable
            color="green lighten-1"
            @click:minute="$refs.menut.save(time)"
          )
      v-col(cols="3")
        v-text-field(
          label="Credit earned"
          v-model="credit"
          required
          :rules="creditRules"
        )
      v-col(cols="3")
        v-btn(
          :disabled="!formValid"  
          color="primary"
          @click="addAccomplishment"
        ) Add

  h2 Accomplishments
  v-data-table(
    :headers="headers"
    :items="jobs"
    :item-per-page="perPage"
  )
    template(v-slot:item.credit="{item}")
      div(class="credit") {{ item.credit}}
</template>

<script>

export default {

    auth: false,
    layout: 'vuetify',

    data() {

         return {

             menu: '',
             // conver to ISO format: YYYY-MM-DD,
             // v-date-picker is prefer ISO format.
             day: (new Date()).toISOString().split('T')[0],

             menut: "",
             //time: (new Date()).toISOString().split('T')[1],
             time: "12:00",

             formValid: true,
             accomplishment: '',
             credit: 1,
             creditRules: [
                 v => !!v || 'Credit is required!',
                 v => /^-?[0-9]*(\.\d+)?$/.test(v) || 'Credit should be integer or decimal'
             ],

             headers: [
                 // text will be the lable and 
                 //value will be the property name of the object.
                 { text: "Day", value: "day" },
                 { text: "Accomplishment", value: "accomplishment" },
                 { text: "Credit", value: "credit" }
             ],
             jobs: [
                 //{accomplishment: '',
                 // credit: 1
                 //}
             ],
             perPage: 15
         };
    },

    methods: {

        addAccomplishment() {

            this.jobs.push({
                day: this.day,
                accomplishment: this.accomplishment,
                credit: this.credit
            });

            // reset all fields.
            this.accomplishment = "";
            this.credit = "";
        }
    }
}

</script>

<style lang="sass">
.credit
  background-color: red
  color: white
</style>
