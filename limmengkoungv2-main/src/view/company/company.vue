<template>
  <div>
    <Header />
    <div class="system-body flex flex-row">
      <div class="sidebar-wrap p-3 bg-[#f1f1f1]">
        <Sidebar />
      </div>
      <div class="grow max-w-full">
        <div class="container mx-auto">
          <div class="flex gap-4 pt-6 pb-2 title_bar items-center px-2">
            <i class="pi pi-align-left font-bold"></i>
            <h1 class="font-bold">Company</h1>
          </div>

          <DataTable 
          v-model:selection="selectedCompany" 
          v-model:filters="filters" 
          :value="companies"
          tableStyle="min-width: 50rem; max-width: 100%; overflow: scroll;"
          paginator 
          :rows="5" 
          :rowsPerPageOptions="[5, 10, 20, 50]" dataKey="id">

            <template #header class="mx-0 ">
              <div class="flex justify-between flex-col md:flex-row">
                <IconField iconPosition="left">
                  <InputIcon>
                    <i class="pi pi-search" />
                  </InputIcon>
                  <InputText class="w-full" v-model="filters['global'].value" placeholder="Keyword Search" />
                </IconField>

                <div class="tb-action-buttons space-x-4 grid grid-cols-2 md:flex gap-2 mt-2 md:mt-0">
                  <Button icon="pi pi-trash" label="Delete" severity="danger" raised @click="confirmDeleteSelected"/>

                  <router-link to="/add_company">
                    <Button icon="pi pi-plus" class="p-button-success w-full" label="Add Product" raised />
                  </router-link>
                </div>
              </div>

            </template>

            <Column selectionMode="multiple" headerStyle="width: 3rem;background-color:#7BE0B6 "></Column>
            <Column v-for="col of columns" :key="col.field" :field="col.field" :header="col.header" headerStyle="background-color:#7BE0B6 "></Column>
            <Column header="Action" headerStyle="background-color:#7BE0B6 ">
              <template #body="slotProps">
                <Button icon="pi pi-pen-to-square" @click="onEdit(slotProps.data.code)" />
                <Button icon="pi pi-trash" @click="onDelete(slotProps.data.code)" />
                <Button icon="pi pi-eye" @click="onViewDetail(slotProps.data)" />
              </template>
            </Column>
          </DataTable>
          <DynamicDialog />
          <ConfirmDialog group="templating">
            <template #message="slotProps">
                <div class="flex flex-column align-items-center w-full gap-3 border-bottom-1 surface-border">
                    <i :class="slotProps.message.icon" class="text-6xl text-primary-500"></i>
                    <p>{{ slotProps.message.message }}</p>
                </div>
            </template>
          </ConfirmDialog>
          <Toast />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, provide } from 'vue';
import {useDialog} from 'primevue/usedialog';
import { useConfirm } from "primevue/useconfirm";
import CompanyDetail from './CompanyDetail.vue';
import { useToast } from "primevue/usetoast";
import { useRouter } from 'vue-router';

const router = useRouter();
const selectedCompany = ref();
const companies = ref([
  { id:1, code: 'CP001', name: 'Company1',phone:'021324241',address:'Siem Reap', creation: new Date() },
  { id:2,  code: 'CP002', name: 'Company2',phone:'021324241',address:'Siem Reap', creation: new Date() },
  { id:3,  code: 'CP003', name: 'Company3',phone:'021324241',address:'Siem Reap', creation: new Date() },
  { id:4,  code: 'CP004', name: 'Company4',phone:'021324241',address:'Siem Reap', creation: new Date() },
  { id:5,  code: 'CP005', name: 'Company5',phone:'021324241',address:'Siem Reap', creation: new Date() },
]);

const columns = [
  { field: 'code', header: 'Code' },
  { field: 'name', header: 'Name' },
  { field: 'phone', header: 'Phone' },
  { field: 'address', header: 'Address' },
  { field: 'creation', header: 'Creation', fieldtype: "Timeago"},
];

const filters = ref({
    global: { value: null,  },
    name: { value: null,  },
    code: { value: null,  },
});
const deleteSeletedCompany = () => {
    confirm.require({
    group: 'templating',
    header: 'Delete',
    message: 'Are you sure you want to delete?',
    icon: 'pi pi-exclamation-circle',
    rejectClass: 'p-button-secondary p-button-outlined',
    rejectLabel: 'Cancel',
    acceptLabel: 'Delete',
    accept: () => {
      companies.value = companies.value.filter(val => !selectedCompany.value.includes(val));
      selectedCompany.value = null;
      toast.add({ severity: 'success', summary: 'Success', detail: 'Companys deleted successfully', life: 3000 });
    },
  });
};
const dialog = useDialog()
function onViewDetail(data){
  console.log(data)
    const dialogRef = dialog.open(CompanyDetail,{
      data:data,
      props: {
            header: 'Company Deatail',
            
            style: {
                width: '80vw',
            },
            breakpoints: {
                '960px': '100vw',
                '640px': '100vw',
            },
            modal: true,
            maximizable: true,
            closeOnEscape: false,
            position: 'top',
        },
        onClose: (options) => {
          const doc = options.data;
        },
    })
  
}
const confirm = useConfirm();
const toast = useToast();

const onDelete = (code) => {
  confirm.require({
    group: 'templating',
    header: 'Delete',
    message: 'Are you sure you want to delete?',
    icon: 'pi pi-exclamation-circle',
    rejectClass: 'p-button-secondary p-button-outlined',
    rejectLabel: 'Cancel',
    acceptLabel: 'Delete',
    accept: () => {
      companies.value = companies.value.filter((company) => company.code !== code);
      toast.add({ severity: 'success', summary: 'Success', detail: 'Company deleted successfully', life: 3000 });
    },
  });
};
const onEdit = (code) => {
  router.push({ name: 'ComAddCompany', params: { code: code } });
};
</script>

<style scoped>
.card {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.button-wrapper {
  margin-left: auto;
  margin-right: 30px;
}

</style>
