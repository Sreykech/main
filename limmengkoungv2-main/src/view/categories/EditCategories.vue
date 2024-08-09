<template>
  <div>
    <Header />
    <div class="system-body flex flex-row ">
      <div class="sidebar-wrap p-3 bg-[#f1f1f1]">
        <Sidebar />
      </div>
      <div class="grow">
        <div class="container mx-auto relative px-4">
          <div class="flex gap-4 pt-6 title_bar items-center px-2">
            <i class="pi pi-align-left font-bold"></i>
            <h1 class="font-bold">Edit Category</h1>
          </div>

          <Toast />
          <div class="flex flex-wrap my-5">
            <div class="flex justify-center w-full sm:w-1/3">

              <div class="w-full">
                <FileUpload name="demo[]" url="/api/upload" @upload="onTemplatedUpload($event)" :multiple="true"
                  accept="image/*" :maxFileSize="1000000" @select="onSelectedFiles">
                  <template #header="{ chooseCallback, uploadCallback, clearCallback, files }">
                    <div class="flex flex-wrap justify-content-between align-items-center flex-1 gap-2">
                      <div class="flex gap-2">
                        <Button @click="chooseCallback()" icon="pi pi-images" rounded outlined></Button>
                        <Button @click="clearCallback()" icon="pi pi-times" rounded outlined severity="danger"
                          :disabled="!files || files.length === 0"></Button>
                      </div>
                    </div>
                  </template>
                  <template #content="{ files, uploadedFiles, removeUploadedFileCallback, removeFileCallback }">
                    <div v-if="files.length > 0">
                      <div class="flex flex-wrap p-0 sm:p-3 gap-5 img-container">
                        <div v-for="(file, index) of files" :key="file.name + file.type + file.size"
                          class="card m-0 px-6 flex flex-column border-1 surface-border align-items-center gap-3">
                          <div class="img-container">
                            <img role="presentation" :alt="file.name" :src="file.objectURL"
                              class="img-fit rounded-full" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </template>
                  <template #empty>
                    <div class="flex flex-col items-center ">
                      <i class="pi pi-cloud-upload border-2 rounded-full p-5" />
                      <p class="mt-4 mb-0">Drag and drop files to here to upload.</p>
                    </div>
                  </template>
                </FileUpload>
              </div>

            </div>

            <div class="container mx-auto pl-0 sm:pl-4  w-full sm:w-2/3 flex flex-wrap">
              <div class="flex flex-col w-full  mb-4 px-2">
                <label class="pr-2 md:pr-5">Category Name</label>
                <input type="text" class=" border border-gray-300 rounded h-[40px]" v-model="categoryName" />
              </div>
              <div class="flex flex-col w-full mb-4 px-2">
                <label class="pr-2 md:pr-5">Category Code</label>
                <input type="text" class=" border border-gray-300 rounded h-[40px]" v-model="categoryCode" />
              </div>
            </div>

            <div class="flex justify-end gap-4 w-full">
              <router-link to="/categories" rel="noopener">
                <Button label="Back" class="p-button-danger" />
              </router-link>
              <router-link to="/categories" rel="noopener">
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

// import { ref } from 'vue';
// import { useRouter } from 'vue-router';

export default {
  name: "NewCategories",
  components: {
  },

};
</script>

<style scoped></style>