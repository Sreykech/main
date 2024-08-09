<template>
  <Header />
  <div class="system-body flex flex-row ">
    <div class="sidebar-wrap p-3 bg-[#f1f1f1]">
      <Sidebar />
    </div>
    <div class="grow max-w-full">
      <div class="container mx-auto">
        <Toast ref="toast" />

        <div class="flex gap-4 pt-6 pb-2 title_bar items-center px-2">
          <a @click="toggleSidebar">
            <i class="pi pi-align-left font-bold" ></i>
          </a>
          <h1 class="font-bold">Settings</h1>
        </div>

        <div class="md:flex"> 
          <div class="md:shrink-0">
            <div class="card m-4 md:m-10">
            
              <FileUpload name="demo[]" url="/api/upload" @upload="onAdvancedUpload($event)" :multiple="true" accept="image/*" :maxFileSize="1000000">
                <template #empty>
                  <p>Drag and drop files to here to upload.</p>
                  <img src="../../assets/images/dfp.png" alt="logo" class="w-[120px] h-[110px] mt-2 mx-auto" />
                </template>
              </FileUpload>
            </div>     
          </div>
          <div class="mx-auto w-full md:w-2/3">
            <div class="space-y-4">
              <div class="flex flex-col md:flex-row items-center p-2 md:p-5 w-full">
                <span class="w-full md:w-32 mb-2 md:mb-0">English Name:</span>
                <input type="text" class="border border-gray-300 rounded px-2 py-1 w-full" v-model="value" />
              </div>
              <div class="flex flex-col md:flex-row items-center p-2 md:p-5 w-full">
                <span class="w-full md:w-32 mb-2 md:mb-0">Khmer Name:</span>
                <input type="text" class="border border-gray-300 rounded px-2 py-1 w-full" v-model="value" />
              </div>
              <div class="flex flex-col md:flex-row items-center p-2 md:p-5 w-full">
                <span class="w-full md:w-32 mb-2 md:mb-0">Phone:</span>
                <input type="text" class="border border-gray-300 rounded px-2 py-1 w-full" v-model="value" />
              </div>
              <div class="flex flex-col md:flex-row items-center p-2 md:p-5 w-full">
                <span class="w-full md:w-32 mb-2 md:mb-0">E-mail:</span>
                <input type="text" class="border border-gray-300 rounded px-2 py-1 w-full" v-model="value" />
              </div>
              <div class="flex flex-col md:flex-row items-center p-2 md:p-5 w-full">
                <span class="w-full md:w-32 mb-2 md:mb-0">Address:</span>
                <input type="text" class="border border-gray-300 rounded px-2 py-1 w-full" v-model="value" />
              </div>
            </div>
          </div>
        </div>
        <div class="flex flex-wrap space-y-4 mt-10 m-auto">
          <div class="w-full md:w-1/3 flex flex-col md:flex-row items-center p-2 md:p-5">
            <span class=" mb-2 md:mb-0 mx-2 ">Main Currency:</span>
            <input type="text" class="border border-gray-300 rounded px-2 py-1" v-model="value" />
          </div>
          <div class="w-full md:w-1/3 flex flex-col md:flex-row items-center p-2 md:p-5 ">
            <span class=" mb-2 md:mb-0 mx-2">Exchange Rate:</span>
            <input type="text" class="border border-gray-300 rounded px-2 py-1 " v-model="value" />
          </div>
          <div class="w-full md:w-1/3 flex flex-col md:flex-row items-center p-2 md:p-5 ">
            <span class=" mb-2 md:mb-0 mx-2">Tax:</span>
            <input type="text" class="border border-gray-300 rounded px-2 py-1 " v-model="value" />
          </div>
          <div class=" w-full md:w-1/3 flex flex-col md:flex-row items-center p-2 md:p-5 ">
            <span class=" mb-2 md:mb-0 mx-2">Second Currency:</span>
            <input type="text" class="border border-gray-300 rounded px-2 py-1 " v-model="value" />
          </div>
          <div class="w-full md:w-1/3 flex flex-col md:flex-row items-center p-2 md:p-5 ">
            <span class="mb-2 md:mb-0 mx-2">Exchange Rate:</span>
            <input type="text" class="border border-gray-300 rounded px-2 py-1 " v-model="value" />
          </div>
          <div class="w-full md:w-1/3 flex flex-col md:flex-row items-center p-2 md:p-5 ">
            <Button class="md:w-[100px] mx-auto" label="Submit" @click="Submit" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
export default {
  name: "Purchase",
  components: {},
  setup() {
    const router = useRouter();
    const value = ref('');
    
    return {
      router,
      value,
    
    };
  },
  methods: {
    onAdvancedUpload() {
      this.toast.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded', life: 3000 });
    },
    Submit() {
      // Handle form submission
    }
  }
};
</script>

<style scoped>
.relative {
  position: relative;
}
.absolute {
  position: absolute;
}
</style>
