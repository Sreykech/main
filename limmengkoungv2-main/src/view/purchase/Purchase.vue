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
          <div class="flex gap-4 pt-6 title_bar items-center px-2">
            <i class="pi pi-align-left font-bold"></i>
            <h1 class="font-bold">Purchase</h1>
          </div>
          <DataTable v-model:selection="selectedPurchased" :value="Purchased" dataKey="id"  tableStyle="min-width: 50rem; max-width: 100%; overflow: scroll;"
            :paginator="true" :rows="10" :filters="filters"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            :rowsPerPageOptions="[5, 10, 25]"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} purchased">

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
                          :disabled="!selectedPurchased || !selectedPurchased.length"/>

                  <router-link to="/new-purchased">
                    <Button icon="pi pi-plus" class="p-button-success w-full" label="Add Product" raised />
                  </router-link>
                </div>
              </div>

            </template>

            <Column selectionMode="multiple" style="width: 3rem" headerClass="tb-header" :exportable="false"></Column>
            <Column field="code" headerClass="tb-header" header="Pruchased Code"></Column>
            <Column field="company" header="Company" headerClass="tb-header" sortable></Column>
            <Column field="grandtotal" header="Grand Total" headerClass="tb-header"></Column>
            <Column field="paid" header="Paid" headerClass="tb-header"></Column>
            <Column field="paymentdue" header="Payment Due" headerClass="tb-header"></Column>
            <Column field="date" header="Date" headerClass="tb-header"></Column>
            <Column field="paymentstatus" header="Payment Status" headerClass="tb-header"></Column>
            <Column field="purchasedstatus" header="Purchased Status" headerClass="tb-header"></Column>
            <Column field="comment" header="Comment" headerClass="tb-header"></Column>
            <Column header="Actions" headerClass="tb-header">
              <template #body="slotProps">
                <div class="flex align-center justify-center">
                  <router-link to="/EditPurchased" rel="noopener">
                    <Button icon="pi pi-pen-to-square" class="btn-edit mr-2" severity="secondary" @click="EditPurchased(slotProps.data)" />
                  </router-link>
                  <Button icon="pi pi-trash" class="btn-delete mr-2" severity="secondary" @click="confirmDeletePurchased(slotProps.data)" />
                  <Button icon="pi pi-eye" class="btn-view mr-2" severity="secondary" @click="showPopup(slotProps.data)" />
                </div>
              </template>
            </Column>
          </DataTable>

          <Dialog v-model:visible="deletePurchasedDialog" :style="{ width: '450px' }" header="Confirm" :modal="true">
            <div class="flex items-center gap-4">
              <i class="pi pi-exclamation-triangle !text-3xl" />
              <span v-if="purchase">Are you sure you want to delete <b>{{ purchase.code }}</b>?</span>
            </div>
            <template #footer>
              <Button label="No" icon="pi pi-times" text @click="deletePurchasedDialog = false" />
              <Button label="Yes" icon="pi pi-check" @click="deletePurchased" />
            </template>
          </Dialog>
          <Dialog v-model:visible="deletePurchasesDialog" :style="{ width: '450px' }" header="Confirm" :modal="true">
            <div class="flex items-center gap-4">
              <i class="pi pi-exclamation-triangle !text-3xl" />
              <span v-if="purchase">Are you sure you want to delete the selected purchases?</span>
            </div>
            <template #footer>
              <Button label="No" icon="pi pi-times" text @click="deletePurchasesDialog = false" />
              <Button label="Yes" icon="pi pi-check" text @click="deleteSelectedPurchases" />
            </template>
          </Dialog>
          <Dialog v-model:visible="popupVisible" header="Detailed Value" modal>
            <div v-if="popupData">
              <p>Purchased Code : {{ popupData.code }}</p>
              <p>Company : {{ popupData.company }}</p>
              <p>Grand Total : {{ popupData.grandtotal }}</p>
              <p>Paid : {{ popupData.paid }}</p>
              <p>Payment Due : {{ popupData.paymentdue }}</p>
              <p>Data : {{ popupData.date }}</p>
              <p>Payment Status: {{ popupData.paymentstatus }}</p>
              <p>Purchased Status : {{ popupData.purchasedstatus }}</p>
              <p>Comment : {{ popupData.comment }}</p>
            </div>
            <template #footer>
              <Button label="Close" @click="popupVisible = false" class="p-button-text" />
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
  name: "Purchase",
  components: {

  },
  data() {
    return {
      popupData: null,
      popupVisible: false,
      Purchased: null,
      selectedPurchased: null,
      filter_company: null,
      filter_purchased: null,
      filter_daterange: null,
      filter_payment: null,
      purchasedDialog: false,
      deletePurchasedDialog: false,
      deletePurchasesDialog: false,
      visible: false,
      purchase: {},
      filters: {},
      value: '',
      items: [],


      company: [
        { name: 'LMK', code: 'LMK' },
        { name: 'ABC', code: 'ABC' },
        { name: 'Angkor', code: 'ANG' },
      ],
      purchased_status: [
        { name: 'ordered', code: 'OR' },
        { name: 'Panding', code: 'PA' },
        { name: 'Received', code: 'RE' }
      ],
      date_range: [
        { name: 'Month', code: 'MON' },
        { name: 'Year', code: 'YEA' },
        { name: 'Custom', code: 'CUS' },
      ],
      payment_status: [
        { name: 'Paid', code: 'PAI' },
        { name: 'Due', code: 'DUE' },
        { name: 'Partial', code: 'PAR' },
        { name: 'Overdue', code: 'OVE' },
      ],
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
    EditPurchased(purchase) {
      this.purchase = { ...purchase };
      this.purchasedDialog = true;
    },
    confirmDeletePurchased(purchase) {
      this.purchase = purchase;
      this.deletePurchasedDialog = true;
    },
    deletePurchased() {
      this.Purchased = this.Purchased.filter(val => val.id !== this.purchase.id);
      this.deletePurchasedDialog = false;
      this.purchase = {};
      this.$toast.add({ severity: 'success', summary: 'Successful', detail: 'Purchase Deleted', life: 3000 });
    },
    confirmDeleteSelected() {
      this.deletePurchasesDialog = true;
    },
    deleteSelectedPurchases() {
      this.Purchased = this.Purchased.filter(val => !this.selectedPurchased.includes(val));
      this.deletePurchasesDialog = false;
      this.selectedPurchased = null;
      this.$toast.add({ severity: 'success', summary: 'Successful', detail: 'Purchases Deleted', life: 3000 });
    },
    showPopup(Purchased) {
      this.popupData = Purchased
      this.popupVisible = true
    },
  },

  setup() {
    const router = useRouter();
    const selectedPurchased = ref();

    // Sample data - replace this with your actual data fetching logic
    const Purchased = ref([
    {
          id: 1,
          code: "PUR00001",
          company: "LMK",
          grandtotal: "$100.00",
          paid: "$100.00",
          paymentdue: "$0.00",
          date: new Date(),
          paymentstatus: "Paid",
          purchasedstatus: "Ordered",
          comment: "This is a comment",

        },
        {
          id: 2,
          code: "PUR00002",
          company: "ABC",
          grandtotal: "$150.00",
          paid: "$100.00",
          paymentdue: "$50.00",
          date: new Date(),
          paymentstatus: "Overdue",
          purchasedstatus: "Pending",
          comment: "This is a comment",
        },
    ]);

    return { Purchased, selectedPurchased };
  }

};
</script>
