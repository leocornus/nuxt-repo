<template lang="pug">
v-container
  v-row
    v-col(cols="6")
      v-text-field(
        v-model="requestUrl"
        label="Request URL"
      )
      v-select(
        v-model="requestMethod"
        label="Request Method"
        :items="requestMethods"
      )
      v-btn(
        color="success"
        justify-end
        @click="sendRequest"
      ) Send Request
      v-spacer
      v-span Payload / Parameters:
      // height will set the height of the editor.
      v-jsoneditor(
	    ref="requesteditor"
        v-model="jsonRequest"
        :options="options"
        height="400px"
      )
    v-col(cols="6")
      v-span Response:
      v-jsoneditor(
	    ref="responseeditor"
        v-model="jsonResponse"
        :options="options"
        height="576px"
      )
    //p {{ jsonResponse }}
</template>

<script>

import axios from 'axios';

import JSONEditor from '@/components/jsoneditor';

export default {
    
	name: 'DemoJSONEditor',
	auth: false,
	layout: 'vuetify',

	components: {
	    'v-jsoneditor': JSONEditor
	},

	data() {
	    return {

            // request properties.
		    jsonRequest: {'test': "test value"},
            // using json placeholder as default.
            requestUrl: "https://jsonplaceholder.typicode.com/todos",
            // request method:
            requestMethod: "GET",
            requestMethods: [
                "GET",
                "POST",
                "PUT"
            ],

		    jsonResponse: {'json': "Response"},

			options: {
			    mode: 'code'
			}
		};
	},

    methods: {
        /**
         */
        sendRequest() {

            let self = this;

            axios.request({
                url: self.requestUrl,
                method: self.requestMethod,
                params: self.jsonRequest
            }).then( res => {

                self.jsonResponse = res;
            }).catch( err => {

                self.jsonResponse = err;
            });
        }
    }
}
</script>
