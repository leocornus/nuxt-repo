<template lang="pug">
v-container(grid-list-md)
  v-row
    v-col( col="4" )
      v-card
        v-card-title Source object
        v-card-text
          pre.display-1.text--primary {{ JSON.stringify(source, null, 2) }}
    v-col( col="4" )
      v-card
        v-card-title Target object
        v-card-text
          pre.display-1.text--primary {{ JSON.stringify(target, null, 2) }}
    v-col( col="4" )
      v-card
        v-card-title Object.asign( target, source )
        v-card-text
          pre.display-1.text--primary {{ Object.assign( Object.assign({}, target), source) }}
</template>

<script>
export default {

    layout: 'vuetify',
    name: 'clocks',
    auth: false,

    data() {

        return {

            source: {
                a: 1,
                b: 2,
                c: {
                    ca: 2,
                    cb: 3
                }
            },

            target: {
                c: {
                    ca: 12,
                    cc: 23
                },
                a: 4
            }
        }
    },
}
</script>
