<template>
  <div>
    <ChatForm />
    <ChatList />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ChatForm from "./ChatForm.vue";
import ChatList from "./ChatList.vue";

export default defineComponent({
  components: {
    ChatForm,
    ChatList,
  },
  setup() {
    return {};
  },
});
</script>

<style scoped></style>
