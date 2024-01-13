<template>
  <div class="chat-container h-[68.5svh] overflow-y-scroll flex flex-col-reverse p-4 space-y-4 space-y-reverse scrollbar-thin scrollbar-thumb-primary scrollbar-track-gray-600">
    <slot></slot>
  </div>
</template>

<script>
export default {
  mounted() {
    this.scrollToBottom();
  },
  methods: {
    scrollToBottom() {
      const container = this.$el;
      container.scrollTop = container.scrollHeight;
    },
  },
};
</script>

<style scoped>
.chat-container {
  /* Custom styles if needed */
}
</style>
