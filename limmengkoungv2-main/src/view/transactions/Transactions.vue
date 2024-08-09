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
            <h1 class="font-bold">Transactions</h1>
          </div>
          <div class="flex justify-end me-5 mb-5">
            <IconField>
              <InputIcon>
                <i class="pi pi-search" />
              </InputIcon>
              <InputText v-model="filters['global'].value" placeholder="Search..." />
            </IconField>
          </div>

          <DataTable v-model:selection="selectedTransaction" :value="Transaction" dataKey="id"  tableStyle="min-width: 50rem; max-width: 100%; overflow: scroll;"
            :paginator="true" :rows="10" :filters="filters"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            :rowsPerPageOptions="[5, 10, 25]"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} purchased">
            <Column field="code" headerClass="tb-header" header="Transaction Code"></Column>
            <Column field="productname" header="Product Name" headerClass="tb-header"></Column>
            <Column field="qtyin" header="Quantity In" headerClass="tb-header"></Column>
            <Column field="qtyout" header="Quantity Out" headerClass="tb-header"></Column>
            <Column field="qtyonhand" header="Quantity On Hand" headerClass="tb-header"></Column>
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
              <p>Purchased Code : {{ popupData.code }}</p>
              <p>Company : {{ popupData.productname }}</p>
              <p>Grand Total : {{ popupData.qtyin }}</p>
              <p>Paid : {{ popupData.qtyout }}</p>
              <p>Payment Due : {{ popupData.qtyonhand }}</p>
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
  name: "Transactions",
  components: {

  },
  data() {
    return {
      popupData: null,
      popupVisible: false,
      Transaction: null,
      selectedTransaction: null,
      transactionDialog: false,
      visible: false,
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

    showPopup(Transaction) {
      this.popupData = Transaction
      this.popupVisible = true
    },
  },

  setup() {
    const router = useRouter();
    const selectedTransaction = ref();

    // Sample data - replace this with your actual data fetching logic
    const Transaction = ref([
    {
          id: 1,
          code: "TRS00001",
          productname: "25*25*1.2",
          qtyin: 10,
          qtyout: 0,
          qtyonhand: 10,
          date: new Date(),
          comment: "This is a comment",

        },
        {
          id: 2,
          code: "TRS00002",
          productname: "25*25*1.2",
          qtyin: 0,
          qtyout: 5,
          qtyonhand: 5,
          date: new Date(),
          comment: "This is a comment",

        },
    ]);

    return { Transaction, selectedTransaction };
  }

};
</script>
