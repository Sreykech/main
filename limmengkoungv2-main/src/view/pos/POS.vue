<template>
    <div>
        <Header />
        <div class="system-body flex flex-row ">
            <div class="w-full">
                <Card class="p-3">
                    <template #content>
                        <div class="flex flex-wrap flex-row mt-5">
                            <div class="search flex grow">
                                <div>

                                    <Button label="Show Categories" @click="showCategories" class="me-2 w-ful" />
                                    <DynamicDialog/>
                                </div>
                                <div class="grow mr-0 md:mr-2">
                                    <IconField class="flex">
                                        <InputIcon class="pi pi-search" />
                                        <InputText v-model="value1" placeholder="Search" class="search grow" />
                                    </IconField>
                                </div>
                            </div>
                            <div class="filters grid md:grid-cols-1 gap-2 mt-5 2xl:mt-0 w-full 2xl:w-fit">
                                <Select v-model="filter_customer" :options="customer" showClear optionLabel="name"
                                    placeholder="Customer" />

                            </div>
                        </div>
                    </template>
                </Card>
                <div class="flex w-full relative mx-auto flex-wrap flex-row p-5">
                    <div class="grow pr-5">
                        <div class="relative">
                            <DataTable v-model:selection="selectedPurchased" :value="NewPurchased"
                                       tableStyle="min-width: 50rem; max-width: 100%; overflow: scroll;">
                                <Column field="no" header="No." headerClass="tb-header"></Column>
                                <Column field="name" header="Product Name" headerClass="tb-header"></Column>
                                <Column field="qty" header="QTY" headerClass="tb-header">
                                    <!-- <template #body="slotProps">
                                        <InputNumber v-model="slotProps.data.qty" class="inputnumber" />
                                    </template> -->
                                </Column>
                                <Column field="price" header="Price" headerClass="tb-header"></Column>
                                <Column field="discount" header="Dicount" headerClass="tb-header">
                                    <!-- <template #body="slotProps">
                                        <InputNumber v-model="slotProps.data.discount" class="inputnumber" />
                                    </template> -->
                                </Column>
                                <Column field="total" header="Total" headerClass="tb-header"></Column>
                                <Column headerClass="tb-header">
                                    <template #body>
                                        <div class="flex align-center justify-center">
                                          <Button icon="pi pi-trash" severity="secondary" text class="btn-delete mr-2"/>
                                        </div>
                                    </template>
                                </Column>
                            </DataTable>
                            <div class="mt-5">
                                <h1>Comment :</h1>
                                <Textarea v-model="value" autoResize rows="5"
                                    class="w-full bg-slate-200 p-2 rounded-md" />
                            </div>
                        </div>
                    </div>
                    <div class="basis-1/3">
                        <div class="relative">
                            <InputGroup class="mb-2">
                                <InputGroupAddon>
                                    <label>Discount by Percent %</label>
                                </InputGroupAddon>
                                <InputNumber />
                            </InputGroup>
                            <InputGroup class="mb-2">
                                <InputGroupAddon>
                                    <label>Discount by Amount $</label>
                                </InputGroupAddon>
                                <InputNumber />
                            </InputGroup>
                            <InputGroup class="mb-2">
                                <InputGroupAddon>
                                    <label>Service Charge</label>
                                </InputGroupAddon>
                                <InputNumber />
                            </InputGroup>
                            <InputGroup class="mb-5">
                                <InputGroupAddon>
                                    <label>VAT</label>
                                </InputGroupAddon>
                                <InputNumber />
                                <InputGroupAddon class="vat-type">
                                    <Select v-model="selectedVat" :options="vat_type" optionLabel="name"
                                        placeholder="Select a City" checkmark :highlightOnSelect="false"
                                        class="w-full" />
                                </InputGroupAddon>
                            </InputGroup>

                            <hr class="mb-5">
                            <div class="mb-5">
                                <DataTable :value="totalAmount" showGridlines tableStyle="min-width: 30rem">
                                    <Column field="totalusd" header="Total USD"></Column>
                                    <Column field="totalkhr" header="Total KHR"></Column>
                                </DataTable>
                            </div>
                            <hr class="mb-5">
                            <div class="mb-5  ">
                              <Button label="Add Payment" @click="showPayment" class="w-full" />
                            </div>
                            <hr class="my-5">
                            <div class="grid grid-cols-3 gap-4 mb-6">
                                <Button label="Submit" class="pos-submit-btn" severity="info" />
                                <Button label="Sell" class="pos-sell-btn" severity="success" />
                                <Button label="Return" class="pos-return-btn" severity="warn" />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>

</template>
<script>
import { ref } from 'vue';
import CategoriesDialog from './CategoriesDialog.vue';
import { useRouter } from 'vue-router';
import PaymentDialog from "@/view/pos/PaymentDialog.vue";
export default {
    name: "NewPurchased",
    components: {

    },
    data() {
        return {
            value1: null,
            NewPurchased: null,
            filter_customer: null,
            filter_purchased: null,
            filter_daterange: null,
            filter_payment: null,
            selectedPurchased: null,
            totalAmount: null,
            visible: {
                dialog1: false,
                dialog2: false
            },
            value: '',
            items: [],
            customer: [
                { name: 'LMK', code: 'LMK' },
                { name: 'ABC', code: 'ABC' },
                { name: 'Angkor', code: 'ANG' },
            ],
            selectedVat: null,
            vat_type: [
                { name: '%' },
                { name: '$' },
            ],

        };
    },
    setup() {
        const router = useRouter();
        // Sample data - replace this with your actual data fetching logic
        const NewPurchased = ref([
            {
                id: 1,
                no: 1,
                name: '25*25*1.2',
                qty: '5',
                price: '$10.00',
                discount: 0.00,
                total: '$50.00'
            },
            {
                id: 2,
                no: 2,
                name: '25*50*1.2',
                qty: '2',
                price: '$15.00',
                discount: 0.00,
                total: '$30.00'
            },
            // ... more products
        ]);
        const totalAmount = ref([
            {
                totalusd: '$80.00',
                totalkhr: '320,000.00៛',

            },
        ]);
        return { NewPurchased, totalAmount };
    },

    methods: {
        deletePurchased() {
            this.NewPurchased = this.NewPurchased.filter(val => val.id !== this.purchase.id);
        },
        showCategories() {
          const dialogRef = this.$dialog.open(CategoriesDialog, {})
        },
      showPayment() {
        const dialogRef = this.$dialog.open(PaymentDialog, {
          props: {
            header: 'Payment',
            style: {
              width: '75vw',
            },
            breakpoints:{
              '960px': '75vw',
              '640px': '90vw'
            },
            modal: true
          }
        })
      }
    },

    mounted() {
        // Pre-select a city
        this.selectedVat = this.vat_type.find(vat_type => vat_type.name === '%'); // Replace 'NY' with the code of the city you want to pre-select
    }
};

</script>