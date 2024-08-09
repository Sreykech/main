<template>
  <div>
    <Header />
    <div class="system-body flex flex-row ">
      <div class="sidebar-wrap p-3 bg-[#f1f1f1]">
        <Sidebar />
      </div>
      <div class="grow max-w-full">
        <div class="container mx-auto">
          <Toast ref="toast" />
          <div class="flex gap-4 pt-6 pb-2 title_bar items-center px-2">
            <i class="pi pi-align-left font-bold"></i>
            <h1 class="font-bold">Customers</h1>
          </div>
          <DataTable v-model:selection="selectedCustomer" :value="Customers" dataKey="id"
                     tableStyle="min-width: 50rem; max-width: 100%; overflow: scroll;" :paginator="true" :rows="10" :filters="filters"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            :rowsPerPageOptions="[5, 10, 25]"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} categories">

            <template #header class="mx-0 ">
              <div class="flex justify-between flex-col md:flex-row">
                <IconField iconPosition="left">
                  <InputIcon>
                    <i class="pi pi-search" />
                  </InputIcon>
                  <InputText class="w-full" v-model="filters['global'].value" placeholder="Keyword Search" />
                </IconField>

                <div class="tb-action-buttons space-x-4 grid grid-cols-2 md:flex gap-2 mt-2 md:mt-0">
                  <Button icon="pi pi-trash" label="Delete" severity="danger" raised @click="confirmDeleteSelected"
                          :disabled="!selectedCustomer || !selectedCustomer.length"/>

                  <router-link to="/new-customer">
                    <Button icon="pi pi-plus" class="p-button-success w-full" label="Add Product" raised />
                  </router-link>
                </div>
              </div>

            </template>

            <Column selectionMode="multiple" style="width: 3rem" headerClass="tb-header" :exportable="false"></Column>
            <Column field="code" headerClass="tb-header" header="Categories Code"></Column>
            <Column field="customer" header="Customer Name" headerClass="tb-header" sortable></Column>
            <Column field="phone" header="Phone" headerClass="tb-header"></Column>
            <Column field="address" header="Address" headerClass="tb-header"></Column>
            <Column field="comment" header="Comment" headerClass="tb-header"></Column>
            <Column header="Actions" headerClass="tb-header">
              <template #body="slotProps">
                <div class="flex align-items-center justify-content-end">
                  <router-link to="/edit-customer" rel="noopener">
                    <Button icon="pi pi-pen-to-square" severity="secondary" text class="btn-edit mr-2" />
                  </router-link>
                  <Button icon="pi pi-trash" severity="secondary" text class="btn-delete mr-2"
                    @click="confirmDeleteCustomer(slotProps.data)" />
                  <Button icon="pi pi-eye " severity="secondary" text class="btn-view mr-2"
                    @click="showPopup(slotProps.data)" />
                </div>
              </template>
            </Column>
            <Dialog v-model:visible="popupVisible" header="View Customer" modal>
              <div v-if="popupData">
                <p>Code : {{ popupData.code }}</p>
                <p>categories : {{ popupData.customer }}</p>
                <p>categories : {{ popupData.phone }}</p>
                <p>categories : {{ popupData.address }}</p>
                <p>Comment : {{ popupData.comment }}</p>
              </div>
              <template #footer>
                <Button label="Close" @click="popupVisible = false" class="p-button-text" />
              </template>
            </Dialog>
          </DataTable>
          <Dialog v-model:visible="deleteCustomerDialog" :style="{ width: '450px' }" header="Confirm" :modal="true">
            <div class="flex items-center gap-4">
              <i class="pi pi-exclamation-triangle !text-3xl" />
              <span v-if="customer">Are you sure you want to delete <b>{{ customer.customer }}</b>?</span>
            </div>
            <template #footer>
              <Button label="No" icon="pi pi-times" text @click="deleteCustomerDialog = false" />
              <Button label="Yes" icon="pi pi-check" @click="deleteCustomer" />
            </template>
          </Dialog>
          <Dialog v-model:visible="deleteCustomersDialog" :style="{ width: '450px' }" header="Confirm" :modal="true">
            <div class="flex items-center gap-4">
              <i class="pi pi-exclamation-triangle !text-3xl" />
              <span v-if="customer">Are you sure you want to delete the selected customers?</span>
            </div>
            <template #footer>
              <Button label="No" icon="pi pi-times" text @click="deleteCustomersDialog = false" />
              <Button label="Yes" icon="pi pi-check" text @click="deleteSelectedCustomers" />
            </template>
          </Dialog>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  name: "Customer",
  components: {
  },
  data() {
    return {
      Customers: null,
      selectedCustomer: null,
      popupData: null,
      popupVisible: false,
      popupData: null,
      popupVisible: false,
      deleteCustomerDialog: false,
      deleteCustomersDialog: false,
      customer: {},
      filters: {},
      value: '',
      items: [],

    };
  },
  created() {
    this.initFilters();
  },
  methods: {
    initFilters() {
      this.filters = {
        'global': { value: null, matchMode: this.$filterMatchMode.CONTAINS }
      }
    },
    confirmDeleteCustomer(customer) {
      this.customer = customer;
      this.deleteCustomerDialog = true;
    },
    deleteCustomer() {
      this.Customers = this.Customers.filter(val => val.id !== this.customer.id);
      this.deleteCustomerDialog = false;
      this.customer = {};
      this.$toast.add({ severity: 'success', summary: 'Successful', detail: 'Category Deleted', life: 3000 });
    },
    confirmDeleteSelected() {
      this.deleteCustomersDialog = true;
    },
    deleteSelectedCustomers() {
      this.Customers = this.Customers.filter(val => !this.selectedCustomer.includes(val));
      this.deleteCustomersDialog = false;
      this.selectedCustomer = null;
      this.$toast.add({ severity: 'success', summary: 'Successful', detail: 'Categories Deleted', life: 3000 });
    },
    showPopup(Customers) {
      this.popupData = Customers
      this.popupVisible = true
    },  
  },
  setup() {
    const router = useRouter();
    const selectedCustomer = ref();

    // Sample data - replace this with your actual data fetching logic
    const Customers = ref([
      {
        id: 1,
        code: "CUS0001",
        customer: "BAKA",
        phone: "010 665 422",
        address: "Siem Reap",
        comment: "This is a comment",

      },
      {
        id: 2,
        code: "CUS0002",
        customer: "Cooper",
        phone: "010 665 422",
        address: "Siem Reap",
        comment: "This is a comment",

      },
      

      // ... more Categories
    ]);
    return {
      Customers,
      selectedCustomer
    };
  }

};
</script>

