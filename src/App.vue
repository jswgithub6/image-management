<template>
  <div id="app">
    <router-view />
    <background />
  </div>
</template>

<script>
import Background from "@/components/Background";
export default {
  name: "App",
  components: {
    Background,
  },
};
</script>
