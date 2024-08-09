<template>
  <div>
    <Header />
    <div class="system-body flex flex-row ">
      <div class="sidebar-wrap p-3 bg-[#f1f1f1]">
        <Sidebar />
      </div>
      <div class="grow">
        <div class="containercmx-auto">
          <h1 class="text-2xl font-bold">Edit Products</h1>
          <div class="flex justify-center w-full">
            <div class="card ">
              <Toast />
              <FileUpload name="demo[]" url="/api/upload" @upload="onTemplatedUpload($event)" :multiple="true"
                accept="image/*" :maxFileSize="1000000" @select="onSelectedFiles">
                <template #header="{ chooseCallback, uploadCallback, clearCallback, files }">
                  <div class="flex flex-wrap justify-content-between align-items-center flex-1 gap-2">
                    <div class="flex gap-2">
                      <Button @click="chooseCallback()" icon="pi pi-images" rounded outlined>
                      </Button>
                      <Button @click="clearCallback()" icon="pi pi-times" rounded outlined severity="danger"
                        :disabled="!files || files.length === 0"></Button>
                    </div>
                  </div>
                </template>
                <template #content="{
                  files,
                  uploadedFiles,
                  removeUploadedFileCallback,
                  removeFileCallback,
                }">
                  <div v-if="files.length > 0">
                    <div class="flex flex-wrap p-0 sm:p-5 gap-5">
                      <div v-for="(file, index) of files" :key="file.name + file.type + file.size"
                        class="card m-0 px-6 flex flex-column border-1 surface-border align-items-center gap-3">
                        <div>
                          <img role="presentation" :alt="file.name" :src="file.objectURL" width="100" height="50" />
                        </div>
                      </div>
                    </div>
                  </div>
                </template>
                <template #empty>
                  <div class="flex align-items-center justify-content-center flex-column">
                    <i class="pi pi-cloud-upload border-2 border-circle p-5 text-8xl text-400 border-400" />
                    <p class="mt-4 mb-0">Drag and drop files to here to upload.</p>
                  </div>
                </template>
              </FileUpload>
            </div>
          </div>
          <div class="container mx-auto p-4 w-full md:w-5/6">
            <div class="flex flex-wrap flex-col md:flex-row">
              <div class="flex w-1/2 items-center mb-4">
                  <label class="mb-2 w-full md:w-1/3 text-end pr-2 md:pr-5">Product Name:</label>
                  <input type="text" class="grow w-1/2 border border-gray-300 rounded px-2 py-1" v-model="productName" />
              </div>
              <div class="flex w-1/2 items-center mb-4">
                  <label class="mb-2 w-full md:w-1/3 text-end pr-2 md:pr-5">Category:</label>
                  <Select v-model="filter_categories" :options="categories" showClear optionLabel="name"
                placeholder="Categories" class="grow w-1/2 border border-gray-300 rounded px-2 py-1" />
              </div>
              <div class="flex w-1/2 items-center mb-4">
                  <label class="mb-2 w-full md:w-1/3 text-end pr-2 md:pr-5">Product Code:</label>
                  <input type="text" class="grow w-1/2 border border-gray-300 rounded px-2 py-1" v-model="productName" />
              </div>
              <div class="flex w-1/2 items-center mb-4">
                  <label class="mb-2 w-full md:w-1/3 text-end pr-2 md:pr-5">Inventery:</label>
                  <input type="text" class="grow w-1/2 border border-gray-300 rounded px-2 py-1" v-model="productName" />
              </div>
              <div class="flex w-1/2 items-center mb-4">
                  <label class="mb-2 w-full md:w-1/3 text-end pr-2 md:pr-5">Company:</label>
                  <Select v-model="filter_company" :options="company" showClear optionLabel="name"
                placeholder="Company" class="grow w-1/2 border border-gray-300 rounded px-2 py-1" />
              </div>
              <div class="flex w-1/2 items-center mb-4">
                  <label class="mb-2 w-full md:w-1/3 text-end pr-2 md:pr-5">wholeSalePrice:</label>
                  <input type="text" class="grow w-1/2 border border-gray-300 rounded px-2 py-1" v-model="productName" />
              </div>
              <div class="flex w-1/2 items-center mb-4">
                  <label class="mb-2 w-full md:w-1/3 text-end pr-2 md:pr-5">Cost:</label>
                  <input type="text" class="grow w-1/2 border border-gray-300 rounded px-2 py-1" v-model="productName" />
              </div>
              <div class="flex w-1/2 items-center mb-4">
                  <label class="mb-2 w-full md:w-1/3 text-end pr-2 md:pr-5">Unit Price:</label>
                  <input type="text" class="grow w-1/2 border border-gray-300 rounded px-2 py-1" v-model="productName" />
              </div>
            </div>
            <div class="flex justify-end gap-4 mt-4">
              <router-link to="/products" rel="noopener">
                <Button label="Back" class="p-button-danger" />
              </router-link>
              <router-link to="/products" rel="noopener">
                <Button label="Save" class="p-button-success" />
              </router-link>
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
  name: "EditProducts",
  components: {
  },
  data() {
    return {
      filter_categories: null,
      filter_company: null,
      filters: {},

      categories: [
        { name: 'LIM', code: 'LIM' },
        { name: 'ABC', code: 'ABC' },
        { name: 'Store', code: 'Store' },
      ],
      company: [
        { name: 'Paid', code: 'PAI' },
        { name: 'Due', code: 'DUE' },
        { name: 'Partial', code: 'PAR' },
        { name: 'Overdue', code: 'OVE' },
      ],
      
    };
  },
};
</script>

<style scoped>

</style>