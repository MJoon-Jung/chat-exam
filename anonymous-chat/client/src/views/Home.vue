<template>
  <div class="home">
    <AppLayout />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import AppLayout from "@/components/AppLayout.vue"; // @ is an alias to /src

@Options({
  components: {
    AppLayout,
  },
})
export default class Home extends Vue {}
</script>
