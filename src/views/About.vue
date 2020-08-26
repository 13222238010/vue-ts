<!--  -->
<template>
  <div>
   ` <portal to="destination">
      <el-button type="success">下一步</el-button>
    </portal>`
    <Child>
      <portal-target name="destination"> </portal-target>
      <template #header="{ users: scoped }">
        <h1>{{ scoped.name }}</h1>
        <span>Here might be a page title</span>
      </template>
      <template #footer>
        <span>Here might be a page footer</span>
      </template>
    </Child>
  </div>
</template>

<script>
import Child from './Child'

export default {
  data() {
    return {}
  },

  components: { Child },

  computed: {},

  // mounted () {

  // },

  methods: {},
}
</script>
<style lang="scss" scoped></style>
