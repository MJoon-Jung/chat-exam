<template>
  <ul>
    <h2>채팅방</h2>
    <li
      @click="setWatchRoom(room.id)"
      v-for="room in rooms"
      v-bind:key="room.id"
      class="room-list"
    >
      {{ room.name }}
    </li>
  </ul>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  getCurrentInstance,
  onUpdated,
} from "vue";
import { useStore } from "vuex";

export default defineComponent({
  setup() {
    const { proxy }: any = getCurrentInstance();
    const socket = proxy.$socket;

    const store = useStore();
    store.dispatch("loadRooms");

    const rooms = computed(() => store.getters["getRooms"]);
    
    const setWatchRoom = (id: number) => {
      store.commit("setLiveWatch", id);
      const isRoomChats = computed(() => store.getters["isRoomChats"]);
      isRoomChats.value || store.dispatch("loadChats");
    };
    onUpdated(() => {
      const roomsInfo = store.getters["getRoomsId"];
      socket.emit("joinRoom", roomsInfo);
    });
    socket.on("joined", (data: any) => {
      console.log(data);
    });

    return { rooms, setWatchRoom };
  },
});
</script>

<style>
.room-list {
  list-style: none;
  color: green;
  background: yellow;
  cursor: pointer;
  border: 1px solid black;
  width: 200px;
}
</style>
