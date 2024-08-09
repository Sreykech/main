<template>
  <div>
    <Header />
    <div class="system-body flex flex-row">
      <div class="sidebar-wrap p-3 bg-[#f1f1f1]">
        <Sidebar />
      </div>
      <div class="grow max-w-full">
          <diV class="m-5 container mx-auto">
            <div class="flex gap-4 pt-6 pb-2 title_bar items-center px-2">
              <i class="pi pi-align-left font-bold"></i>
              <h1 v-if="!isEdit" class="font-bold">Add Company</h1>
              <h1 v-else class="font-bold">Edit Company</h1>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 w-full gap-3">
              <div class="card p-3">
                <Toast />
                <FileUpload name="demo" url="/api/upload" @upload="onTemplatedUpload($event)" :multiple="false"
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
                      <div class="flex flex-wrap p-0 sm:p-2 gap-5 img-container">
                        <div v-for="(file, index) of files" :key="file.name + file.type + file.size"
                          class="card m-0 px-6 flex flex-column border-1 surface-border align-items-center gap-3">
                          <div class="img-container">
                            <img role="presentation" :alt="file.name" :src="file.objectURL"
                              class="rounded-full img-fit" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </template>
                  <template #empty>
                    <div class="flex flex-col items-center">
                      <i class="pi pi-cloud-upload border-2 rounded-full p-5 text-8xl text-400 border-400" />
                      <p class="mt-4 mb-0">Drag and drop files to here to upload.</p>
                    </div>
                  </template>
                </FileUpload>
              </div>
              <div class="card">
                <!-- Form inputs section -->
                <div class="bg-white rounded-lg p-3">
                  <div class="mb-4">
                    <label for="code" class="block text-sm font-bold text-gray-700 mb-2">Company Code</label>
                    <InputText id="code" v-model="company.code" class="w-full border-gray-300 rounded-md" />
                  </div>
                  <div class="mb-4">
                    <label for="company_name" class="block text-sm font-bold text-gray-700 mb-2">Company Name</label>
                    <InputText id="company_name" v-model="company.name" class="w-full border-gray-300 rounded-md" />
                  </div>
                </div>
              </div>
              <div class="card">
                <!-- Form inputs section -->
                <div class="bg-white rounded-lg p-3">
                  <div class="mb-4">
                    <label for="company_name" class="block text-sm font-bold text-gray-700 mb-2">Phone</label>
                    <InputText id="company_name" v-model="company.phone" class="w-full border-gray-300 rounded-md" />
                  </div>
                  <div class="mb-4">
                    <label for="company_name" class="block text-sm font-bold text-gray-700 mb-2">Address</label>
                    <InputText id="company_name" v-model="company.address" class="w-full border-gray-300 rounded-md" />
                  </div>
                </div>
              </div>
              <div class="card p-3 col-span-1 md:col-span-3">
                <label for="note" class="block text-sm font-bold text-gray-700 mb-2">Note</label>
                <Textarea v-model="note" autoResize rows="4" class="w-full bg-gray-200 p-2 border-b-gray-300" />
              </div>
            </div>
            <div class="flex justify-end space-x-4 m-10">
              <Button label="Save" severity="success" @click="saveCompany" />
              <Button label="Cancel" severity="secondary" @click="cancelEdit" />
            </div>
          </diV>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue';
import { useToast } from 'primevue/usetoast';
import { usePrimeVue } from 'primevue/config';
import { useRouter, useRoute } from 'vue-router';

const $primevue = usePrimeVue();
const router = useRouter();
const route = useRoute();
const toast = useToast();
const totalSize = ref(0);
const totalSizePercent = ref(0);
const isEdit = ref(false);
const note = ref('');
const files = ref([]);
const companies = ref([
  { code: 'CP001', name: 'Company1', phone: '021324241', address: 'Siem Reap', creation: new Date() },
  { code: 'CP002', name: 'Company2', phone: '021324241', address: 'Siem Reap', creation: new Date() },
  { code: 'CP003', name: 'Company3', phone: '021324241', address: 'Siem Reap', creation: new Date() },
  { code: 'CP004', name: 'Company4', phone: '021324241', address: 'Siem Reap', creation: new Date() },
  { code: 'CP005', name: 'Company5', phone: '021324241', address: 'Siem Reap', creation: new Date() },
]);
const company = reactive({
  code: '',
  name: '',
  phone: '',
  address: '',
  creation: null,
});

const saveCompany = async () => {
  if (route.params.code) {
    // Editing existing user
    const index = companies.value.findIndex((u) => u.code === route.params.code);
    if (index !== -1) {
      companies.value[index] = { ...company };
      toast.add({ severity: 'success', summary: 'Success', detail: 'company updated successfully', life: 3000 });
    }
  } else {
    company.creation = new Date();
    companies.value.push({ ...company });
    toast.add({ severity: 'success', summary: 'Success', detail: 'company added successfully', life: 3000 });
  }
  await router.push('/company_list');
};
const cancelEdit = () => {
  router.push('/company_list');
};

onMounted(() => {
  if (route.params.code) {
    isEdit.value = true
    // Fetch existing user data (replace with actual API call if needed)
    const existingCompany = companies.value.find((u) => u.code === route.params.code);
    console.log(existingCompany)
    if (existingCompany) {
      // Load existing user data for editing
      company.code = existingCompany.code;
      company.name = existingCompany.name;
      company.phone = existingCompany.phone;
      company.address = existingCompany.address;
      company.creation = existingCompany.creation;
    } else {
      // Handle error: user not found
      toast.add({ severity: 'error', summary: 'Error', detail: 'Company not found', life: 3000 });
      router.push('/company_list'); // Redirect to users list page
    }
  }
});
const onRemoveTemplatingFile = (file, removeFileCallback, index) => {
  removeFileCallback(index);
  totalSize.value -= parseInt(formatSize(file.size));
  totalSizePercent.value = totalSize.value / 10;
};

const onClearTemplatingUpload = (clear) => {
  clear();
  totalSize.value = 0;
  totalSizePercent.value = 0;
};

const onSelectedFiles = (event) => {
  files.value = event.files;
  files.value.forEach((file) => {
    totalSize.value += parseInt(formatSize(file.size));
  });
};

const uploadEvent = (callback) => {
  totalSizePercent.value = totalSize.value / 10;
  callback();
};

const onTemplatedUpload = () => {
  toast.add({ severity: "info", summary: "Success", detail: "File Uploaded", life: 3000 });
};

const formatSize = (bytes) => {
  const k = 1024;
  const dm = 3;
  const sizes = $primevue.config.locale.fileSizeTypes;

  if (bytes === 0) {
    return `0 ${sizes[0]}`;
  }

  const i = Math.floor(Math.log(bytes) / Math.log(k));
  const formattedSize = parseFloat((bytes / Math.pow(k, i)).toFixed(dm));

  return `${formattedSize} ${sizes[i]}`;
};
</script>


<style scoped>
.img-container {
  width: 250px;
  height: 130px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.img-fit {
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
}
</style>