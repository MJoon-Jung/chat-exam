<template>
  <ul>
    <li v-for="chat in chats" v-bind:key="chat.id" class="chat-list">
      {{ chat.user }}: {{ chat.content }}
    </li>
  </ul>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  setup() {
    const store = useStore();
    const chats = computed(() => store.getters["getRoomChats"]);
    return { chats };
  },
});
</script>

<style>
.chat-list {
  list-style: none;
  cursor: pointer;
  color: blueviolet;
  background: beige;
  width: 300px;
  border: 1px solid black;
}
</style>
