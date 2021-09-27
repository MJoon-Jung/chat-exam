<template>
  <div>
    <RoomForm />
    <RoomList />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import RoomForm from "./RoomForm.vue";
import RoomList from "./RoomList.vue";

export default defineComponent({
  components: {
    RoomForm,
    RoomList,
  },
  setup() {
    return {};
  },
});
</script>

<style scoped></style>
