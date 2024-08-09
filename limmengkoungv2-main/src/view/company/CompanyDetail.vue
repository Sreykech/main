<template>
    <ComDialogContent hideButtonOK :hideButtonClose="true" @onClose="onClose" :loading="loading">
        <div class="m-5">
            <div class="flex justify-center gap-6 ">
                <div class="card w-1/3">
                    <Image src="https://primefaces.org/cdn/primevue/images/galleria/galleria10.jpg" alt="Image"
                        width="250" imageClass="rounded-md " />
                </div>
                <div class="card w-1/3">
                    <!-- Form inputs section -->
                    <div class="bg-white rounded-lg p-6">
                        <div class="mb-4">
                            <label for="code" class="block text-sm font-bold text-gray-700 mb-2">Company Code</label>
                            <InputText id="code" v-model="doc.code" class="w-full border-gray-300 rounded-md" />
                        </div>
                        <div class="mb-4">
                            <label for="company_name" class="block text-sm font-bold text-gray-700 mb-2">Company
                                Name</label>
                            <InputText id="company_name" v-model="doc.name"
                                class="w-full border-gray-300 rounded-md" />
                        </div>
                    </div>
                </div>
                <div class="card w-1/3">
                    <!-- Form inputs section -->
                    <div class="bg-white rounded-lg p-6">
                        <div class="mb-4">
                            <label for="company_name" class="block text-sm font-bold text-gray-700 mb-2">Phone</label>
                            <InputText id="company_name" v-model="doc.phone"
                                class="w-full border-gray-300 rounded-md" />
                        </div>
                        <div class="mb-4">
                            <label for="company_name" class="block text-sm font-bold text-gray-700 mb-2">Address</label>
                            <InputText id="company_name" v-model="doc.address"
                                class="w-full border-gray-300 rounded-md" />
                        </div>
                    </div>
                </div>
        </div>
        <div class="card w-1/2 p-5">
            <label for="note" class="block text-sm font-bold text-gray-700 mb-2">Note</label>
            <Textarea v-model="note" autoResize rows="5" cols="30" class="w-full" />
        </div>
        </div>
        
        <template #footer-right>
            <div>
                <div>
                    <label class="italic ">Creation : </label>
                    <TimeAgo :date="doc?.creation" class="text-400 font-italic" />
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
import { useDialog } from 'primevue/usedialog';

const doc = ref({})
const dialog = useDialog()
const emit = defineEmits(['onCancel', 'onSave'])
const dialogRef = inject("dialogRef");
const note = ref('');
const onClose = () => {
    dialogRef.value.close();
}
const loading = ref(false)
onMounted(() => {
    if (dialogRef.value){
        doc.value = dialogRef.value.data
    }
})

</script>