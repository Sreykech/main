<template>
  <div>
    <Header />
    <div class="system-body flex flex-row ">
      <div class="sidebar-wrap p-3 bg-[#f1f1f1]">
        <Sidebar />
      </div>
      <div class="grow max-w-full">
        <div class="container mx-auto">
          <div class="flex gap-4 pt-6 pb-2 title_bar items-center px-2">
            <i class="pi pi-align-left font-bold"></i>
            <h1 class="font-bold">Sales</h1>
          </div>
          <div class="flex justify-end me-5 mb-5">
            <IconField>
              <InputIcon>
                <i class="pi pi-search" />
              </InputIcon>
              <InputText v-model="filters['global'].value" placeholder="Search..." />
            </IconField>
          </div>

          <DataTable v-model:selection="selectedSale" :value="data" dataKey="id"  tableStyle="min-width: 50rem; max-width: 100%; overflow: scroll;"
            :paginator="true" :rows="10" :filters="filters"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            :rowsPerPageOptions="[5, 10, 25]"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} purchased">
            <Column selectionMode="multiple" style="width: 3rem" headerClass="tb-header"></Column>
            <Column field="code" headerClass="tb-header" header="Sale Code"></Column>
            <Column field="customername" header="Customer Name" headerClass="tb-header"></Column>
            <Column field="saletype" header="Sale Type" headerClass="tb-header"></Column>
            <Column field="grandtotal" header="Grand Total" headerClass="tb-header"></Column>
            <Column field="paid" header="Paid" headerClass="tb-header"></Column>
            <Column field="paymentdue" header="Payment Due" headerClass="tb-header"></Column>
            <Column field="date" header="Date" headerClass="tb-header" sortable></Column>
            <Column field="comment" header="Comment" headerClass="tb-header"></Column>
            <Column header="Actions" headerClass="tb-header">
              <template #body="slotProps">
                <div class="flex align-center justify-center">
                  <Button icon="pi pi-eye" class="btn-view mr-2" severity="secondary" @click="showPopup(slotProps.data)" />
                </div>
              </template>
            </Column>
          </DataTable>
          <Dialog v-model:visible="popupVisible" header="Detailed Value" modal>
            <div v-if="popupData">
              <p>Sale Code : {{ popupData.code }}</p>
              <p>Customer Name : {{ popupData.customername }}</p>
              <p>Sale Type : {{ popupData.saletype }}</p>
              <p>Grand Total : {{ popupData.grandtotal }}</p>
              <p>Paid : {{ popupData.paid }}</p>
              <p>Payment Due : {{ popupData.paymentdue }}</p>
              <p>Data : {{ popupData.date }}</p>
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
  name: "All Sales",
  components: {

  },
  data() {
    return {
      data: [
        {
          id: 1,
          code: "INV00001",
          customername: "Meng Cooper",
          saletype: "Sell",
          grandtotal: "$10.00",
          paid: "$10.00",
          paymentdue :"$0.00",
          date: new Date(),
          comment: "This is a comment",

        },
        {
          id: 2,
          code: "INV00002",
          customername: "Meng Cooper",
          saletype: "Return",
          grandtotal: "$5.00",
          paid: "",
          paymentdue :"$0.00",
          date: new Date(),
          comment: "This is a comment",

        },
      ],
      popupData: null,
      popupVisible: false,
      Sale: null,
      selectedSale: null,
      transactionDialog: false,
      visible: false,
      purchase: {},
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

    showPopup(data) {
      this.popupData = data
      this.popupVisible = true
    },
  },

  setup() {
    const router = useRouter();
    const selectedSale = ref();

    // Sample data - replace this with your actual data fetching logic
    const Sale = ref([]);

    return { Sale, selectedSale };
  }

};
</script>
