<template>
  <div>
    <Header />
    <div class="system-body flex flex-row">
      <div class="p-3 bg-[#f1f1f1]">
        <Sidebar />
      </div>
      <div class="flex-grow">
        <div class="container mx-auto p-6">
          <div class="flex gap-4 pt-6 pb-2 title_bar items-center px-2">
            <i class="pi pi-align-left font-bold"></i>
            <h1 class="font-bold">Reports</h1>
          </div>
          <div class="flex flex-wrap space-y-4 mt-10 justify-center">
            <div class="w-full md:w-1/2 flex flex-col items-center">
              <Listbox v-model="selectedCity" :options="cities" optionLabel="name"
                class="w-full md:w-[600px] h-[600px]  border mt-4 border-gray-300 rounded px-2 py-1 reportlist">
                <template #item="slotProps">
                  <div class="flex items-center">
                    <i :class="`pi ${getIcon(slotProps.option.name)} mr-2`"></i>
                    {{ slotProps.option.name }}
                  </div>
                </template>
              </Listbox>
            </div>
            <div class="card w-full md:w-1/2 overflow-x-auto border border-gray-300 rounded px-2 py-1">
              <table class="min-w-full bg-white w-full md:w-[400px]">
                <thead class="bg-green-100 items-center text-center">
                  <tr>
                    <th class="py-2 px-3 border-b border-gray-200 justify-center">
                      {{ message }}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-if="!selectedCity" class="hover:bg-gray-100 cursor-pointer">
                    <td class="py-2 px-3 border-b border-gray-200 text-center">
                      No Reports Available
                    </td>
                  </tr>
                  <tr v-else v-for="report in reportType" :key="report.link" class="hover:bg-gray-100 cursor-pointer"
                    @click="navigateToReport(report.link)">
                    <td class="py-2 px-3 border-b border-gray-200">
                      {{ report.name }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import Header from '../../components/Header.vue';
import Sidebar from '../../components/Sidebar.vue';
import Listbox from 'primevue/listbox';
import 'primeicons/primeicons.css'; // Ensure this is included
export default {
  name: "Reports",
  components: {
    Header,
    Sidebar,
    Listbox
  },
  setup() {
    const router = useRouter();
    const selectedCity = ref(null);
    const message = ref('===Please Select Report===');
    const reportType = ref([]);
    const cities = [
      { name: 'Inventory Reports', code: 'NY' },
      { name: 'Sale Reports', code: 'SR' },
      { name: 'Customer Reports', code: 'CM' },
      { name: 'Expense Reports', code: 'ES' },
      { name: 'Company Reports', code: 'CP' },
      { name: 'Purchase Reports', code: 'PR' },
    ];

    const getReports = (code) => {
      const reports = {
        'NY': [
          { name: 'Summary Reports', link: 'Insummary' },
          { name: 'Detail Reports', link: 'IndetailReport' },
          { name: 'Graph Reports', link: 'GraphInventery' }
        ],
        'SR': [
          { name: 'Summary Reports', link: 'Salesummary' },
          { name: 'Detail Reports', link: 'SaledetailReport' },
          { name: 'Graph Reports', link: 'GraphSales' }
        ],
        'CM': [
          { name: 'Summary Reports', link: 'Customersummary' },
          { name: 'Detail Reports', link: 'CustomerdetailReport' },
          { name: 'Graph Reports', link: 'GraphCustomer' }
        ],
        'ES': [
          { name: 'Summary Reports', link: 'Expensesummary' },
          { name: 'Detail Reports', link: 'ExpensedetailReport' },
          { name: 'Graph Reports', link: 'GraphExpense' }
        ],
        'CP': [
          { name: 'Summary Reports', link: 'Companysummary' },
          { name: 'Detail Reports', link: 'CompanydetailReport' },
          { name: 'Graph Reports', link: 'GraphCompany' }
        ],
        'PR': [
          { name: 'Summary Reports', link: 'Purchasessummary' },
          { name: 'Detail Reports', link: 'PurchasedetailReport' },
          { name: 'Graph Reports', link: 'GraphPurchase' }
        ],
        // Add more report types for other codes as needed
      };
      return reports[code] || [];
    };

    watch(selectedCity, (newValue) => {
      if (newValue) {
        message.value = `Hello, welcome to ${newValue.name}`;
        reportType.value = getReports(newValue.code);
      } else {
        message.value = '===Please Select Report===';
        reportType.value = [];
      }
    });

    const navigateToReport = (link) => {
      router.push(`/${link}`);
    };

    return {
      selectedCity,
      message,
      reportType,
      cities,
      navigateToReport
    };
  },

};
</script>

<style scoped>
/* Add any additional scoped styles here */
</style>
