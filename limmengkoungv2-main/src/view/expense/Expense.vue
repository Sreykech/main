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
            <h1 class="font-bold">Expenses</h1>
          </div>
          
          <DataTable v-model:selection="selectedExpense" :value="Expense" dataKey="id"  tableStyle="min-width: 50rem; max-width: 100%; overflow: scroll;"
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
                          :disabled="!selectedExpense || !selectedExpense.length"/>

                  <router-link to="/new-purchased">
                    <Button icon="pi pi-plus" class="p-button-success w-full" label="Add Product" raised />
                  </router-link>
                </div>
              </div>

            </template>

            <Column selectionMode="multiple" style="width: 3rem" headerClass="tb-header" :exportable="false"></Column>
            <Column field="description" headerClass="tb-header" header="Description"></Column>
            <Column field="amount" header="Amount" headerClass="tb-header"></Column>
            <Column field="user" header="User" headerClass="tb-header"></Column>
            <Column field="date" header="Date" headerClass="tb-header"></Column>
            <Column field="comment" header="Comment" headerClass="tb-header"></Column>
            <Column header="Actions" headerClass="tb-header">
              <template #body="slotProps">
                <div class="flex align-center justify-center">
                  <router-link to="/editexpense" rel="noopener">
                    <Button icon="pi pi-pen-to-square" class="btn-edit mr-2" severity="secondary" @click="EditExpense(slotProps.data)" />
                  </router-link>
                  <Button icon="pi pi-trash" class="btn-delete mr-2" severity="secondary" @click="confirmDeleteExpense(slotProps.data)" />
                  <Button icon="pi pi-eye " class="btn-view mr-2" severity="secondary" @click="showPopup(slotProps.data)" />
                </div>
              </template>
            </Column>
          </DataTable>

          <Dialog v-model:visible="deleteExpenseDialog" :style="{ width: '450px' }" header="Confirm" :modal="true">
            <div class="flex items-center gap-4">
              <i class="pi pi-exclamation-triangle !text-3xl" />
              <span v-if="expense">Are you sure you want to delete <b>{{ expense.description }}</b>?</span>
            </div>
            <template #footer>
              <Button label="No" icon="pi pi-times" text @click="deleteExpenseDialog = false" />
              <Button label="Yes" icon="pi pi-check" @click="deleteExpense" />
            </template>
          </Dialog>
          <Dialog v-model:visible="deleteExpensesDialog" :style="{ width: '450px' }" header="Confirm" :modal="true">
            <div class="flex items-center gap-4">
              <i class="pi pi-exclamation-triangle !text-3xl" />
              <span v-if="expense">Are you sure you want to delete the selected Expenses?</span>
            </div>
            <template #footer>
              <Button label="No" icon="pi pi-times" text @click="deleteExpensesDialog = false" />
              <Button label="Yes" icon="pi pi-check" text @click="deleteSelectedExpenses" />
            </template>
          </Dialog>
          <Dialog v-model:visible="popupVisible" header="Detailed Value" modal>
            <div v-if="popupData">
              <p>Description : {{ popupData.description }}</p>
              <p>Amount : {{ popupData.amount }}</p>
              <p>User : {{ popupData.user }}</p>
              <p>Date : {{ popupData.date }}</p>
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
  name: "Expense",
  components: {

  },
  data() {
    return {
      popupData: null,
      popupVisible: false,
      Expense: null,
      selectedExpense: null,
      expenseDialog: false,
      deleteExpenseDialog: false,
      deleteExpensesDialog: false,
      popupValue: null,
      popupVisible: false,
      expense: {},
      filters: {},
      submitted: false,
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
    confirmDeleteExpense(expense) {
      this.expense = expense;
      this.deleteExpenseDialog = true;
    },
    deleteExpense() {
      this.Expense = this.Expense.filter(val => val.id !== this.expense.id);
      this.deleteExpenseDialog = false;
      this.expense = {};
      this.$toast.add({ severity: 'success', summary: 'Successful', detail: 'Expense Deleted', life: 3000 });
    },
    confirmDeleteSelected() {
      this.deleteExpensesDialog = true;
    },
    deleteSelectedExpenses() {
      this.Expense = this.Expense.filter(val => !this.selectedExpense.includes(val));
      this.deleteExpensesDialog = false;
      this.selectedExpense = null;
      this.$toast.add({ severity: 'success', summary: 'Successful', detail: 'Expenses Deleted', life: 3000 });
    },
    showPopup(Expense) {
      this.popupData = Expense
      this.popupVisible = true
    },

  },
  setup() {
    const router = useRouter();
    const selectedExpense = ref();

    // Sample data - replace this with your actual data fetching logic
    const Expense = ref([
    {
          id: 1,
          description: "ចាក់សាំង2លីត្រ",
          amount: "$2.50",
          user: "Cooper",
          date: new Date(),
          comment: "This is a comment",

        },
        {
          id: 2,
          description: "ជួសជុលម៉ូតូ",
          amount: "$5.00",
          user: "Cooper",
          date: new Date(),
          comment: "",

        },
    ]);

    return { Expense, selectedExpense };
  }

};
</script>
