<template>
  <div>
    <form @submit.prevent="createRoom(content)">
      <input type="text" v-model="content" placeholder="채팅" />
      <button type="submit">전송</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, ref } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  setup() {
    const store = useStore();
    const content = ref("");
    const { proxy }: any = getCurrentInstance();
    const socket = proxy.$socket;
    const createRoom = () => {
      store.dispatch("createChat", { content: content.value });
      content.value = "";
    };
    socket.on("chat", (data: any) => {
      store.commit("createChat", data);
    });
    return {
      createRoom,
      content,
    };
  },
});
</script>

<style scoped></style>
