<!-- src/components/TitleBar.vue -->
<template>
    <nav class="navbar navbar-dark bg-white" style="margin-left: 180px;">
      <button @click="toggleSidebar" class="btn btn-outline-light" style="color: black;">
        ☰
      </button>
      <span class="navbar-brand mb-0 h1">My Vue App</span>
    </nav>
  </template>
  
  <script>
    export default {
      methods: {
        toggleSidebar() {
          this.$emit("toggleSidebar");
        },
      },
    };
  </script>
  
  <style scoped>
  /* Add any custom styles if necessary */
  </style>
  