<template lang="pug">
v-container
  v-jsoneditor(
    v-model="json"
	:options="options"
  )
  p {{ json }}
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
		    json: {'test': "test value"},
			options: {
			    mode: 'code'
			}
		};
	}
}
</script>
