<template>
    <div>
        <Header />
        <div class="system-body flex flex-row">
            <div class="sidebar-wrap p-3 bg-[#f1f1f1]">
                <Sidebar />
            </div>
            <div class="grow max-w-full">
                <div class="container mx-auto p-6">
                    <div class="flex gap-4 pt-6 pb-2 title_bar items-center px-2">
                      <a href="#">
                        <i class="pi pi-align-left font-bold"></i>
                      </a>
                        <h1 class="font-bold">Reports</h1>
                    </div>

                    <div class="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4 lmk-reports">
                        <Fieldset legend="Inventory Reports">
                            <Listbox v-model="selectedInventoryReports" :options="inventoryReports" optionLabel="name"
                                class="w-full report-list">
                                <template #option="slotProps">
                                    <div @click="redirectTo(slotProps.option.url)">
                                        {{ slotProps.option.name }}
                                    </div>
                                </template>
                            </Listbox>
                        </Fieldset>
                        <Fieldset legend="Sales Reports">
                            <Listbox v-model="selectedSaleReports" :options="saleReports" optionLabel="name"
                                class="w-full report-list">
                                <template #option="slotProps">
                                    <div @click="redirectTo(slotProps.option.url)">
                                        {{ slotProps.option.name }}
                                    </div>
                                </template>
                            </Listbox>
                        </Fieldset>
                        <Fieldset legend="Customer Reports">
                            <Listbox v-model="selectedCustomerReports" :options="customerReports" optionLabel="name"
                                class="w-full report-list">
                                <template #option="slotProps">
                                    <div @click="redirectTo(slotProps.option.url)">
                                        {{ slotProps.option.name }}
                                    </div>
                                </template>
                            </Listbox>
                        </Fieldset>
                        <Fieldset legend="Expense Reports">
                            <Listbox v-model="selectedExpenseReports" :options="expenseReports" optionLabel="name"
                                class="w-full report-list">
                                <template #option="slotProps">
                                    <div @click="redirectTo(slotProps.option.url)">
                                        {{ slotProps.option.name }}
                                    </div>
                                </template>
                            </Listbox>
                        </Fieldset>
                        <Fieldset legend="Company Reports">
                            <Listbox v-model="selectedCompanyReports" :options="companyReports" optionLabel="name"
                                class="w-full report-list">
                                <template #option="slotProps">
                                    <div @click="redirectTo(slotProps.option.url)">
                                        {{ slotProps.option.name }}
                                    </div>
                                </template>
                            </Listbox>
                        </Fieldset>
                        <Fieldset legend="Purchase Reports">
                            <Listbox v-model="selectedPurchaseReports" :options="purchaseReports" optionLabel="name"
                                class="w-full report-list">
                                <template #option="slotProps">
                                    <div @click="redirectTo(slotProps.option.url)">
                                        {{ slotProps.option.name }}
                                    </div>
                                </template>
                            </Listbox>
                        </Fieldset>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Header from '../../components/Header.vue';
import Sidebar from '../../components/Sidebar.vue';


export default {
    data() {
        return {
            selectedInventoryReports: null,
            selectedSaleReports: null,
            selectedCustomerReports: null,
            selectedExpenseReports: null,
            selectedCompanyReports: null,
            selectedPurchaseReports: null,
            inventoryReports: [
                { name: 'Summary Reports', url: '/inventory-graphs' },
                { name: 'Detail Reports', url: '/inventory-detail-report' },
                { name: 'Graph Reports', url: '/inventory-graphs' }
            ],
            saleReports: [
                { name: 'Summary Reports', url: '/sales-graphs' },
                { name: 'Detail Reports', url: '/sales-detail-report' },
                { name: 'Graph Reports', url: '/sales-graphs' }
            ],
            customerReports: [
                { name: 'Summary Reports', url: '/customer-graphs' },
                { name: 'Detail Reports', url: '/customer-detail-report' },
                { name: 'Graph Reports', url: '/customer-graphs' }
            ],
            expenseReports: [
                { name: 'Summary Reports', url: '/expenses-graphs' },
                { name: 'Detail Reports', url: '/expenses-detail-report' },
                { name: 'Graph Reports', url: '/expenses-graphs' }
            ],
            companyReports: [
                { name: 'Summary Reports', url: '/company-graphs' },
                { name: 'Detail Reports', url: '/company-detail-report' },
                { name: 'Graph Reports', url: '/company-graphs' }
            ],
            purchaseReports: [
                { name: 'Summary Reports', url: '/purchases-graphs' },
                { name: 'Detail Reports', url: '/purchases-detail-report' },
                { name: 'Graph Reports', url: '/purchases-graphs' }
            ]
        };
    },
    methods: {
        redirectTo(url) {
            window.location.href = url;
        }
    }
};


</script>

<style scoped>
/* Add any additional scoped styles here */
</style>