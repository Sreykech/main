<template>
  <li class="lmk_navigation menu-item">
    <router-link :to="link" class="nav-link text-black py-3 w-full px-4 inline-block" active-class="active">
      <font-awesome-icon :icon="icon" class="icon mr-2" />
      {{ linkText }}
    </router-link>
  </li>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

export default {
  name: "menuItem",
  components: {
    FontAwesomeIcon
  },
  props: {
    link: String,
    icon: Object,
    linkText: String,
    depth: Number

  }
};
</script>

<style scoped></style>