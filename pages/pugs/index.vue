<template lang="pug">
  h1.red Hello {{ name }}!
</template>

<script>
export default {
    data() {
        return {
            name: 'Pug World'
        }
    }
}
</script>

<style lang="sass">
.red
  color: red
</style>
