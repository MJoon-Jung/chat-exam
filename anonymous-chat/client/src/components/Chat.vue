<template>
  <div>
    <ChatForm />
    <ChatList v-if="liveWatch"/>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "vuex";
import ChatForm from "./ChatForm.vue";
import ChatList from "./ChatList.vue";

export default defineComponent({
  components: {
    ChatForm,
    ChatList,
  },
  setup() {
    const store = useStore();
    const liveWatch = computed(() => store.getters["getLiveWatch"]);
    return { liveWatch };
  },
});
</script>

<style scoped></style>
