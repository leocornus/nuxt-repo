<template lang="pug">
v-container( grid-list-xs )
  h1 Test Singleton Class
  v-btn(
    color="primary"
    @click="handleMethodOne"
  ) Method One
  h3 Method One Output: 
    v-span {{ methodOneOutput }}

  v-btn(
    color="primary"
    @click="handleMethodTwo"
  ) Method Two
  h3 Method Two Output: 
    v-span {{ methodTwoOutput }}
</template>

<script>
import Singleton from '@/libs/corejs/singleton';

export default {

    name: 'core-singleton',
    auth: false,
    layout: 'vuetify',

    data: function() {
        return {

            methodOneOutput: '',
            methodTwoOutput: ''
        }
    },

    methods: {

        handleMethodOne: function() {

            this.methodOneOutput = Singleton.methodOne();
        },

        handleMethodTwo: function() {

            this.methodTwoOutput = Singleton.methodTwo();
        },
    }
};
</script>
