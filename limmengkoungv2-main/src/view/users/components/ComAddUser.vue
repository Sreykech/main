<template>

    <div>
        <Header />
        <div class="system-body flex flex-row">
            <div class="sidebar-wrap p-3 bg-[#f1f1f1]">
                <Sidebar />
            </div>
            <div class="grow max-w-full">
              <div class="container mx-auto">
                <div class="flex gap-4 pt-6 title_bar items-center px-2">
                  <i class="pi pi-align-left font-bold"></i>
                  <h1 class="font-bold" v-if="!isEdit">Add User</h1>
                  <h1 class="text-2xl font-bold p-2">Edit User</h1>
                </div>
                <div class="">
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div class="card p-3">
                        <Toast />
                        <FileUpload name="demo[]" url="/api/upload" @upload="onTemplatedUpload($event)" :multiple="true"
                            accept="image/*" :maxFileSize="1000000" @select="onSelectedFiles">
                            <template #header="{ chooseCallback, uploadCallback, clearCallback, files }">
                                <div class="flex flex-wrap justify-content-between align-items-center flex-1 gap-2">
                                    <div class="flex gap-2">
                                        <Button @click="chooseCallback()" icon="pi pi-images" rounded outlined></Button>
                                        <Button @click="clearCallback()" icon="pi pi-times" rounded outlined
                                            severity="danger" :disabled="!files || files.length === 0"></Button>
                                    </div>
                                </div>
                            </template>
                            <template
                                #content="{ files, uploadedFiles, removeUploadedFileCallback, removeFileCallback }">
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
                    <div class="card">
                        <div class="bg-white rounded-lg px-3">
                            <div class="mb-4">
                            <label for="code" class="block text-sm font-bold text-gray-700 mb-2">User Code</label>
                            <InputText id="code" v-model="user.code" class="w-full border-gray-300 rounded-md"
                                aria-describedby="code-help" />
                        </div>
                        <div class="mb-4">
                            <label for="user_name" class="block text-sm font-bold text-gray-700 mb-2">User Name</label>
                            <InputText id="user_name" v-model="user.name" class="w-full border-gray-300 rounded-md"
                                aria-describedby="username-help" />
                        </div>
                        <div class="mb-4">
                            <label for="user_gender" class="block text-sm font-bold text-gray-700 mb-2">Gender</label>
                            <Dropdown id="gender" v-model="user.gender" :options="genderOptions" optionLabel="label" class="w-full border-gray-300 rounded-md"/>
                        </div>
                        </div>
                    </div>
                    <div class="card">
                        <div class="bg-white rounded-lg px-3">
                        <div class="mb-4">
                            <label for="user_pwd" class="block text-sm font-bold text-gray-700 mb-2">Password</label>
                            <InputText id="user_pwd" v-model="user.password" class="w-full border-gray-300 rounded-md"
                                aria-describedby="username-help" />
                        </div>
                        <div class="mb-4">
                            <label for="user_email" class="block text-sm font-bold text-gray-700 mb-2">Email</label>
                            <InputText id="user_email" v-model="user.email" class="w-full border-gray-300 rounded-md"
                             aria-describedby="username-help" />
                        </div>
                        </div>
                    </div>
                    <div class="card col-span-1 md:col-span-3 p-3">
                      <div class="border-t p-5">
                        <label for="permission" class="block text-base font-bold text-gray-700 mb-3">Permission</label>
                        <Tree v-model:selectionKeys="selectedKey" :value="permission" selectionMode="checkbox" class="w-full md:w-30rem"></Tree>
                      </div>
                    </div>
                    <div class="card col-span-1 md:col-span-3 p-3">
                      <label for="note" class="block text-sm font-bold text-gray-700 mb-2" >Note</label>
                      <Textarea v-model="note" autoResize rows="5" cols="30" class="w-full p-2 bg-gray-100"/>
                    </div>
                </div>
                

                <div class="flex justify-end space-x-4 m-10">
                    <Button label="Save" severity="success" @click="saveUser" />
                    <Button label="Cancel" severity="secondary"  @click="cancelEdit" />
                </div>
                </div>
              </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, inject,onMounted } from 'vue';
import { useToast } from "primevue/usetoast";
import { usePrimeVue } from 'primevue/config';
import { useRouter, useRoute } from 'vue-router';

const $primevue = usePrimeVue();
const router = useRouter();
const route = useRoute();
const toast = useToast();
const totalSize = ref(0);
const totalSizePercent = ref(0);

const selectedKey = ref({});
const note = ref('');
const files = ref([]);
const isEdit = ref(false)
const users = ref([
  { code: 'CP001', name: 'user1',gender:'M',password:'123456',email:'user1@gmail.com',creation:new Date() },
  { code: 'CP002', name: 'user1',gender:'M',password:'123456',email:'user1@gmail.com',creation:new Date() },
  { code: 'CP003', name: 'user1',gender:'M',password:'123456',email:'user1@gmail.com',creation:new Date() },
  { code: 'CP004', name: 'user1',gender:'M',password:'123456',email:'user1@gmail.com',creation:new Date() },
  { code: 'CP005', name: 'user1',gender:'M',password:'123456',email:'user1@gmail.com',creation:new Date() },
]);

const user = reactive({
  code: '',
  name: '',
  gender: '',
  password: '',
  email: '',
  creation: null,
});
const genderOptions = [
  { label: 'Male', value: 'M' },
  { label: 'Female', value: 'F' },
];
const permission = ref([
  {
    key: 1,
    label: 'Sale',
    children: [
      {key: 11,label: 'Order',children: []},
      {key: 12,label: 'Edit Bill',children: []},
      {key: 13,label: 'Delete Bill',children: []},
      {key: 13,label: 'Cancal Bill',children: []},
    ]
  },
  {
    key: 2,
    label: 'Product',
    children: [
      {key: 21,label: 'Create Product',children: []},
      {key: 22,label: 'Edit Product',children: []},
      {key: 23,label: 'Delete Product',children: []},
      {key: 24,label: 'View Cost Price',children: []},
      {key: 25,label: 'Allow Discount',children: []},
      {key: 26,label: 'Edit Quantity',children: []},
    ]
  },
  {
    key: 3,
    label: 'Customer',
    children: [
      {key: 31,label: 'Create Product',children: []},
      {key: 32,label: 'Edit Product',children: []},
      {key: 33,label: 'Delete Product',children: []},
      {key: 34,label: 'View Cost Price',children: []},
      {key: 35,label: 'Allow Discount',children: []},
      {key: 36,label: 'Edit Quantity',children: []},
    ]
  },
  {
    key: 4,
    label: 'Purchase',
    children: [
      {key: 41,label: 'Create Product',children: []},
      {key: 42,label: 'Edit Product',children: []},
      {key: 43,label: 'Delete Product',children: []},
      {key: 44,label: 'View Cost Price',children: []},
      {key: 45,label: 'Allow Discount',children: []},
      {key: 46,label: 'Edit Quantity',children: []},
    ]
  },
  {
    key: 5,
    label: 'Report',
    children: [
      {key: 51,label: 'Create Product',children: []},
      {key: 52,label: 'Edit Product',children: []},
      {key: 53,label: 'Delete Product',children: []},
      {key: 54,label: 'View Cost Price',children: []},
      {key: 55,label: 'Allow Discount',children: []},
      {key: 56,label: 'Edit Quantity',children: []},
    ]
  },
  {
    key: 6,
    label: 'Expense',
    children: [
      {key: 61,label: 'Create Product',children: []},
      {key: 62,label: 'Edit Product',children: []},
      {key: 63,label: 'Delete Product',children: []},
      {key: 64,label: 'View Cost Price',children: []},
      {key: 65,label: 'Allow Discount',children: []},
      {key: 66,label: 'Edit Quantity',children: []},
    ]
  },
])
const onSelectionChange = (selection) => {
  selectedKey.value = selection;
};
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


const saveUser =  () => {
    if (route.params.code) {
    // Editing existing user
        const index = users.value.findIndex((u) => u.code === route.params.code);
        
        if (index !== -1) {
        users.value[index] = { ...user };
        toast.add({ severity: 'success', summary: 'Success', detail: 'User updated successfully', life: 3000 });
        }
    } else {
        user.creation = new Date();
        users.value.push({ ...user });
        toast.add({ severity: 'success', summary: 'Success', detail: 'User added successfully', life: 3000 });
    }
  router.push('/users');
};
const cancelEdit = () => {
  router.push('/users'); // Redirect to users list page
};
onMounted(() => {
    
    if (route.params.code) {
        isEdit.value = true
    // Fetch existing user data (replace with actual API call if needed)
    const existingUser = users.value.find((u) => u.code === route.params.code);
    console.log(existingUser)
    if (existingUser) {
      // Load existing user data for editing
      user.code = existingUser.code;
      user.name = existingUser.name;
      user.gender = existingUser.gender;
      user.password = existingUser.password;
      user.email = existingUser.email;
      user.creation = existingUser.creation;
    } else {
      // Handle error: user not found
      toast.add({ severity: 'error', summary: 'Error', detail: 'User not found', life: 3000 });
      router.push('/users'); // Redirect to users list page
    }
  }
});

</script>

<style scoped>
.image-uploader {
    display: flex;
    flex-direction: column;
    align-items: left;
}

.image-frame {
    margin-top: 20px;
    width: 300px;
    height: 300px;
    border: 2px solid #ccc;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
}

.image-frame img {
    max-width: 100%;
    max-height: 100%;
    object-fit: cover;
}

.button-wrapper {
    margin-left: auto;
    margin-right: 30px;
}
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

