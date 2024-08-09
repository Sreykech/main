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
            <h1 class="font-bold">Users</h1>
          </div>

          <Toast />
          <DataTable v-model:selection="selectedUser" v-model:filters="filters" :value="users"
            tableStyle="min-width: 50rem; max-width: 100%; overflow: scroll;" paginator :rows="5" ref="dt" :rowsPerPageOptions="[5, 10, 20, 50]"
            dataKey="id">
            <template #header>

              <div class="flex justify-between flex-col md:flex-row">
                <IconField iconPosition="left">
                  <InputIcon>
                    <i class="pi pi-search" />
                  </InputIcon>
                  <InputText class="w-full" v-model="filters['global'].value" placeholder="Keyword Search" />
                </IconField>

                <div class="tb-action-buttons space-x-4 grid grid-cols-2 md:flex gap-2 mt-2 md:mt-0">
                  <Button icon="pi pi-trash" label="Delete" severity="danger" raised @click="deleteSeletedUser" />
                  <router-link to="/add_user">
                    <Button icon="pi pi-plus" class="p-button-success w-full" label="Add User" raised />
                  </router-link>
                </div>
              </div>

            </template>
            <Column selectionMode="multiple" headerStyle="width: 3rem;background-color:#7BE0B6 " :exportable="false">
            </Column>
            <Column v-for="col of columns" :key="col.field" :field="col.field" :header="col.header"
              headerStyle="background-color:#7BE0B6 ">
              <template #body="slotProps">
                <TimeAgo v-if="col.field == 'creation'" :date="slotProps.data[col.field]" :key="col.field" />
                <span v-else>{{ slotProps.data[col.field] }}</span>
                <!-- {{ slotProps.data.creation }} -->
              </template>
            </Column>
            <Column header="Action" dataType="" style="min-width: 6rem" headerStyle="background-color:#7BE0B6 ">
              <template #body="slotProps">
                <Button icon="pi pi-pen-to-square" @click="onEdit(slotProps.data.code)" severity="secondary" text />
                <Button icon="pi pi-trash" @click="onDelete(slotProps.data.code)" severity="secondary" text />
                <Button icon="pi pi-eye" @click="onViewDetail(slotProps.data)" severity="secondary" text />
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
import { ref } from 'vue';
import { useDialog } from 'primevue/usedialog';
import { useConfirm } from "primevue/useconfirm";
import UserDetail from './UserDetail.vue';
import { useToast } from "primevue/usetoast";
import { useRouter } from 'vue-router';

const router = useRouter();
const users = ref([
  { id: 1, code: 'CP001', name: 'user1', gender: 'M', password: '123456', email: 'user1@gmail.com', phone: '021324241', address: 'Siem Reap', creation: new Date() },
  { id: 2, code: 'CP002', name: 'user1', gender: 'M', password: '123456', email: 'user1@gmail.com', phone: '021324241', address: 'Siem Reap', creation: new Date() },
  { id: 3, code: 'CP003', name: 'user1', gender: 'M', password: '123456', email: 'user1@gmail.com', phone: '021324241', address: 'Siem Reap', creation: new Date() },
  { id: 4, code: 'CP004', name: 'user1', gender: 'M', password: '123456', email: 'user1@gmail.com', phone: '021324241', address: 'Siem Reap', creation: new Date() },
  { id: 5, code: 'CP005', name: 'user1', gender: 'M', password: '123456', email: 'user1@gmail.com', phone: '021324241', address: 'Siem Reap', creation: new Date() },
]);

const filters = ref({
  global: { value: null, },
  name: { value: null, },
  code: { value: null, },
  gender: { value: null, },
  address: { value: null, },
});
const columns = [
  { field: 'code', header: 'Code' },
  { field: 'name', header: 'Name' },
  { field: 'gender', header: 'Gender' },
  { field: 'password', header: 'Password' },
  { field: 'email', header: 'Email' },
  { field: 'phone', header: 'Phone' },
  { field: 'address', header: 'Address' },
  { field: 'creation', header: 'Creation' },
];
const selectedUser = ref();
const dt = ref();
const selectedItem = ref();
const deleteSeletedUser = () => {
  confirm.require({
    group: 'templating',
    header: 'Delete',
    message: 'Are you sure you want to delete?',
    icon: 'pi pi-exclamation-circle',
    rejectClass: 'p-button-secondary p-button-outlined',
    rejectLabel: 'Cancel',
    acceptLabel: 'Delete',
    accept: () => {
      users.value = users.value.filter(val => !selectedUser.value.includes(val));
      selectedUser.value = null;
      toast.add({ severity: 'success', summary: 'Success', detail: 'Users deleted successfully', life: 3000 });
    },
  });
};
const dialog = useDialog()
function onViewDetail(data) {

  const dialogRef = dialog.open(UserDetail, {
    data: data,
    props: {
      header: 'User Deatail',

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
      users.value = users.value.filter((user) => user.code !== code);
      toast.add({ severity: 'success', summary: 'Success', detail: 'User deleted successfully', life: 3000 });
    },
  });
};
const onEdit = (code) => {
  router.push({ name: 'ComEditUser', params: { code: code } });
};
// get toast after add or update succuss
router.afterEach((to, from) => {
  if (to.path === '/users' && from.path === '/add_user') {
    toast.add({ severity: 'success', summary: 'Success', detail: 'User added successfully', life: 3000 });
  } else if (to.path === '/users' && from.path.startsWith('/edit_user')) {
    toast.add({ severity: 'success', summary: 'Success', detail: 'User updated successfully', life: 3000 });
  }
});
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
