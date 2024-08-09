<template>
  <div>
    <Header />
    <div class="system-body flex flex-row ">
      <div class="sidebar-wrap p-3 bg-[#f1f1f1]">
        <Sidebar />
      </div>
      <div class="grow max-w-full">
        <div class="container mx-auto">
          <div class="flex gap-4 pt-6 title_bar items-center px-2">
            <i class="pi pi-align-left font-bold"></i>
            <h1 class="font-bold">Edit Expense</h1>
          </div>
          <div class="flex justify-center">
            <Card class="w-full p-3">
              <template #content>
                <div class="flex flex-col gap-2 mb-5 mt-5">
                  <label for="description">Description</label>
                  <InputText id="description" aria-describedby="description-help" v-model.trim="expense.description"
                    required="true" autofocus :invalid="submitted && !expense.description" />
                  <small v-if="submitted && !expense.description" class="text-red-500">Description is required.</small>
                </div>
                <div class="flex flex-col gap-2 mb-5">
                  <label for="amount">Amount</label>
                  <InputText id="amount" v-model="expense.amount" required="true" aria-describedby="amount-help" />
                </div>
                <div class="flex flex-col gap-2 mb-5">
                  <label for="comment">Comment</label>
                  <InputText id="comment" v-model="expense.comment" required="true" aria-describedby="comment-help" />
                </div>
                <div class="flex justify-end mt-2">
                  <router-link to="/expense" rel="noopener">
                    <Button label="Cancel" icon="pi pi-times" class=" mr-5" text @click="hideDialog" />
                  </router-link>
                  <Button label="Submit" icon="pi pi-check" @click="saveExpense"  />
                </div>
              </template>
            </Card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { reactive } from 'vue'

export default {
  name: "Edit Expense",
  components: {
  
  },
  setup() {
    // Create a reactive expense object
    const expense = reactive({
      description: '',
      amount: 0,
      comment: ''
    })

    // Define a function to save the expense
    const saveExpense = () => {
      // Perform your save logic here, using the `expense` object
      console.log('Saving expense:', expense)
    }

    return {
      expense,
      saveExpense
    }
  },
  data() {
    return {
      currentDate: new Date(),
      Expense: null,
      selectedExpense: null,
      expenseDialog: false,
      expense: {},
      filters: {},
      submitted: false,
      value: '',
      items: [],
    };
  },

  methods: {
  saveExpense() {
    this.submitted = true;
    if (this.expense.description && this.expense.amount) {
      this.Expense[this.findIndexById(this.expense.id)] = this.expense;
      this.$toast.add({ severity: 'success', summary: 'Successful', detail: 'Expense Updated', life: 3000 });
      this.expenseDialog = false;
      this.expense = {};
    }
  },
  EditExpense(expense) {
    this.expense = { ...expense };
    this.expenseDialog = true;
  },
  hideDialog() {
    this.expenseDialog = false;
    this.expense = {};
  },
  findIndexById(id) {
    let index = -1;
    for (let i = 0; i < this.Expense.length; i++) {
      if (this.Expense[i].id === id) {
        index = i;
        break;
      }
    }
    return index;
  }
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
        date: "31/05/2024 10:30",
        comment: "This is a comment",

      },
      {
        id: 2,
        description: "ជួសជុលម៉ូតូ",
        amount: "$5.00",
        user: "Cooper",
        date: "31/05/2024 10:30",
        comment: "",

      },
      // ... more Expense
    ]);

    return { Expense, selectedExpense};
  }

};


</script>