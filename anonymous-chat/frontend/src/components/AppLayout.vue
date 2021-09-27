<template>
  <div class="container">
    <Room />
    <Chat />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Room from "./Room.vue";
import Chat from "./Chat.vue";

export default defineComponent({
  components: {
    Room,
    Chat,
  },
});
</script>

<style>
.container {
  display: flex;
  justify-content: space-around;
}
</style>
