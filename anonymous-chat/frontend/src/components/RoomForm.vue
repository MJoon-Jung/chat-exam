<template>
  <div>
    <form @submit.prevent="createRoom">
      <input type="text" v-model="roomName" placeholder="채팅방" />
      <button type="submit">채팅방 생성</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  setup() {
    const store = useStore();
    const roomName = ref("");
    const createRoom = () => {
      store.dispatch("createRoom", { roomName: roomName.value });
      roomName.value = "";
    };

    return {
      roomName,
      createRoom,
    };
  },
});
</script>

<style scoped></style>
