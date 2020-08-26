<!--  -->
<template>
  <div>
    <!-- <div>我的匿名插槽<slot>11111</slot></div> -->
    <div class="slotLeft">
      <slot>1111</slot>
    </div>
    <div>
      搞一波事情
      <slot name="header" v-bind:users="user"></slot>
    </div>
    <slot name="body"></slot>
    <slot name="footer"></slot>
  </div>
</template>

<script>
export default {
  name: 'Child',
  data() {
    return {
      user: {
        name: 'oralinge',
        age: 18,
      },
    }
  },

  components: {},

  computed: {},

  mounted() {
    console.log(this.$slots)
  },

  methods: {},
}
</script>
<style lang="scss" scoped></style>
