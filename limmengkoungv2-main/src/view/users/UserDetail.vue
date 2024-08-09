<template>
    <ComDialogContent hideButtonOK :hideButtonClose="true" @onClose="onClose" :loading="loading" style="width: 500x;">
        <!-- <div class="flex flex-wrap gap-10 w-full mb-10">
            <div class="card flex justify-content-center border">
                <Image src="/src/assets/images/profile.png"  alt="Image" width="250" />
            </div>

            <div class="ml-5">
                <div>Code :{{ doc?.code }}</div>
                <div>Name :{{ doc?.name }}</div>
                <div>Gender :{{ doc?.gender }}</div>
                <div>Email :{{ doc?.email }}</div>
            </div>
            
        </div> -->
        <div class="m-5">
            <div class="flex justify-center gap-6 ">
                <div class="card">
                    <Image src="https://primefaces.org/cdn/primevue/images/galleria/galleria10.jpg" alt="Image" width="250px"
                     imageClass="rounded-md " />
                </div>
                <div class="card w-1/3">
                    <div class="bg-white rounded-lg px-6">
                        <div class="mb-4">
                            <label for="code" class="block text-sm font-bold text-gray-700 mb-2">User Code</label>
                            <InputText id="code" v-model="doc.code" class="w-full border-gray-300 rounded-md"
                                aria-describedby="code-help" disabled />
                        </div>
                        <div class="mb-4">
                            <label for="user_name" class="block text-sm font-bold text-gray-700 mb-2">User Name</label>
                            <InputText id="user_name" v-model="doc.name" class="w-full border-gray-300 rounded-md"
                                aria-describedby="username-help" disabled />
                        </div>
                        <div class="mb-4">
                            <label for="user_gender" class="block text-sm font-bold text-gray-700 mb-2">Gender</label>
                            <InputText id="gender" v-model="doc.gender" class="w-full border-gray-300 rounded-md"
                                aria-describedby="username-help" disabled />
                        </div>
                    </div>
                </div>
                <div class="card w-1/3">
                    <div class="bg-white rounded-lg px-6">
                        <div class="mb-4">
                            <label for="user_pwd" class="block text-sm font-bold text-gray-700 mb-2">Password</label>
                            <InputText id="user_pwd" v-model="doc.password" class="w-full border-gray-300 rounded-md"
                                aria-describedby="username-help" disabled />
                        </div>
                        <div class="mb-4">
                            <label for="user_email" class="block text-sm font-bold text-gray-700 mb-2">Email</label>
                            <InputText id="user_email" v-model="doc.email" class="w-full border-gray-300 rounded-md"
                                aria-describedby="username-help" disabled />
                        </div>
                    </div>
                </div>

            </div>

            <div class="card flex flex-wrap gap-10 border-t p-5 mt-2">
                <label for="permission" class="block text-base font-bold text-gray-700 mb-3">Permission</label>
                <Tree v-model:selectionKeys="selectedKey" :value="permission" selectionMode="checkbox" selectable="false"
                    class="w-full md:w-30rem">
                </Tree>
            </div>
            <div class="card w-1/2 p-5">
                <label for="note" class="block text-sm font-bold text-gray-700 mb-2">Note</label>
                <Textarea v-model="note" autoResize rows="5" cols="30" class="w-full" disabled />
            </div>
        </div>
        <template #footer-right>
            <div>
                <div>
                    <label class="italic ">Creation : </label>
                    <TimeAgo :date="doc?.creation" class="text-400 font-italic"/>
                </div>
                <div>
                    <label class="italic ">Created By : </label>
                    <span class="text-400 font-italic">Administrator</span>
                </div>
            </div>
        </template>
    </ComDialogContent>
</template>
<script setup>
import { ref, onMounted, inject } from 'vue';
import {useDialog} from 'primevue/usedialog';

const doc = ref({})
const dialog = useDialog()
const emit = defineEmits(['onCancel', 'onSave'])
const dialogRef = inject("dialogRef");
const note = ref('');
const onClose = () => {
    dialogRef.value.close();
}
const loading = ref(false)
onMounted(()=>{
    if (dialogRef.value){
        doc.value = dialogRef.value.data
    }
    
    
})
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
</script>