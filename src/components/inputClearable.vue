/**
 * 弹窗搜索辅助清除
 */
<template>
  <Input v-model="value" :disabled='disabled' readonly :icon="icon" :placeholder="placeholder" @on-click.stop='onIcon' @on-focus='onInput'></Input>
</template>

<script>
  export default {
    name: 'inputClearable',
    props: {
      value: String,
      placeholder: String,
      disabled: {
        type: Boolean,
        default: false
      }
    },
    watch: {
      value (val) {
        if(this.disabled) {
          return;
        }
        if(val.length) {
          this.icon = 'close';
        } else {
          this.icon = 'ios-search';
        }
      }
    },
    data () {
      return {
        icon: 'ios-search',
      }
    },
    methods: {
      onIcon () {
        if(this.value.length) {
          this.$emit('on-clear');
        } else {
          this.$emit('on-open');
        }
      },
      onInput () {
        this.$emit('on-open');
      },
    }
  }
</script>
