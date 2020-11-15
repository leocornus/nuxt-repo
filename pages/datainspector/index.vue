<template lang="pug">
v-container
  v-row
    v-col(cols="6")
      v-jsoneditor(
	    ref="requesteditor"
        v-model="jsonRequest"
        :options="options"
      )
    v-col(cols="6")
      v-jsoneditor(
	    ref="responseeditor"
        v-model="jsonResponse"
        :options="options"
      )
    p {{ jsonResponse }}
</template>

<script>

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

		    jsonRequest: {'test': "test value"},
		    jsonResponse: {'json': "Response"},

			options: {
			    mode: 'code'
			}
		};
	}
}
</script>
