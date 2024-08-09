<template>
  <Toolbar class="top-header">
    <template #start>
      <div class="card flex justify-center branding">
        <Image class="logo" src="/src/assets/images/logo.png" alt="Logo"/>
      </div>
      <div class="ml-4 font-semibold">
        <h1 class="text-2xl hidden md:block">Lim Mengkoung</h1>
      </div>
    </template>

    <template #end>
      <div class="card flex justify-center mr-5">
        <router-link :to="buttonUrl" rel="noopener">
          <Button class="px-5" :label="buttonText"/>
        </router-link>
      </div>
      <div class="mr-5">
        <OverlayBadge value="3" severity="danger" @click="toggle">
          <i class="pi pi-bell" style="font-size: 2rem" />
        </OverlayBadge>
        <OverlayPanel ref="op">
          <div class=" gap-2 w-40">
            <Listbox v-model="selectedNotification" :options="notifications" optionLabel="name" class="w-full" />
          </div>
        </OverlayPanel>
      </div>
      <div class="flex items-center gap-2">
        <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png"
                style="width: 50px; height: 50px"/>
        <h3 class="hidden md:block text-bold">Jonh Doe</h3>
      </div>
    </template>
  </Toolbar>
</template>
<script>

export default {
  name: "Header",
  computed: {
    buttonText() {
      return this.$route.path === '/pos' || this.$route.path === '/newpurchased' ? 'Dashboard' : 'POS';
    },
    buttonUrl() {
      return this.$route.path === '/pos' || this.$route.path === '/newpurchased' ? '/' : '/pos';
    },
  },
  methods: {
    toggle(event) {
      this.$refs.op.toggle(event);
    }
  },
  data() {
    return {
      selectedNotification: null,
      notifications: [
        { name: 'New Purchase'},
        { name: 'Product "iron" is out of stock.'},
        { name: 'Purchase payment is due'},
      ]
    };
  }

};
</script>
<style scoped></style>