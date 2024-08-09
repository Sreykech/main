<template>
  <div>
    <Header />
    <div class="system-body flex flex-row ">
      <div class="sidebar-wrap p-3 bg-[#f1f1f1]">
        <Sidebar />
      </div>
      <div class="grow">
        <div class="container mx-auto relative px-4">

          <div class="flex gap-4 pt-6 pb-2 title_bar items-center px-2">
            <i class="pi pi-align-left font-bold"></i>
            <h1 class="font-bold">Edit Customer</h1>
          </div>

          <div class=" mx-auto p-4 w-full md:w-5/6">
            <div class="container mx-auto pl-0 sm:pl-4  w-full sm:w-2/3 flex flex-wrap">
              <div class="flex flex-col w-full sm:w-1/2 mb-4 px-2">
                  <label class="">Customer Code:</label>
                  <input type="text" class="w-full border border-gray-300 rounded px-2 py-1" v-model="customerCode" />
              </div>
              <div class="flex flex-col w-full sm:w-1/2 mb-4 px-2">
                  <label class="">Customer Name:</label>
                  <input type="text" class="w-full border border-gray-300 rounded px-2 py-1" v-model="customerName" />
              </div>
              <div class="flex flex-col w-full sm:w-1/2 mb-4 px-2">
                  <label class="">Phone:</label>
                  <input type="text" class="w-full border border-gray-300 rounded px-2 py-1" v-model="phone" />
              </div>
              <div class="flex flex-col w-full sm:w-1/2 mb-4 px-2">
                  <label class="">Address:</label>
                  <input type="text" class="w-full border border-gray-300 rounded px-2 py-1" v-model="address" />
              </div>
              <div class="flex flex-col w-full mb-4 px-2">
                <label class="">Address:</label>
                <Textarea v-model="value" autoResize rows="5" class="grow border bg-slate-200 rounded-md px-2 py-1" />
              </div>
              
              <div class="flex justify-end grow gap-4 mt-4">
                <router-link to="/customers" rel="noopener">
                  <Button label="Back" class="p-button-danger" />
                </router-link>
                <router-link to="/customers" rel="noopener">
                  <Button label="Save" class="p-button-success" />
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  name: "NewCustomers",
  components: {
  },
  setup() {
  const router = useRouter();
  // Sample data - replace this with your actual data fetching logic
  const NewPurchased = ref([  ]);

  return { NewPurchased };
},

};
</script>
