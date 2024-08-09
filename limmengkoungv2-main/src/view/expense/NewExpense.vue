<template>
  <div>
    <Header />
    <div class="system-body flex flex-row ">
      <div class="w-full">
        <Card class="p-3">
          <template #content>
            <div class="flex flex-row mt-5">
              <Button label="Show Categories" @click="visible = true" class="me-2" />
              <Dialog v-model:visible="visible" modal header="Header" :style="{ width: '50vw' }"
                :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
                <ButtonGroup>
                  <Button label="25*25*1.2" class="m-5 p-3 btn-custom" />
                  <Button label="25*25*1.2" class="m-5 p-3 btn-custom" />
                  <Button label="25*25*1.2" class="m-5 p-3 btn-custom" />
                  <Button label="25*25*1.2" class="m-5 p-3 btn-custom" />
                  <Button label="25*25*1.2" class="m-5 p-3 btn-custom" />
                  <Button label="25*25*1.2" class="m-5 p-3 btn-custom" />
                  <Button label="25*25*1.2" class="m-5 p-3 btn-custom" />
                  <Button label="25*25*1.2" class="m-5 p-3 btn-custom" />
                  <Button label="25*25*1.2" class="m-5 p-3 btn-custom" />
                  <Button label="25*25*1.2" class="m-5 p-3 btn-custom" />
                  <Button label="25*25*1.2" class="m-5 p-3 btn-custom" />
                  <Button label="25*25*1.2" class="m-5 p-3 btn-custom" />
                </ButtonGroup>
                <!-- <Paginator :template="{
                                          default: 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink JumpToPageInput'
                                      }" :rows="10" :totalRecords="120">
                                  </Paginator> -->
              </Dialog>
              <div class="mr-2">
                <IconField>
                  <InputIcon class="pi pi-search" />
                  <InputText v-model="value1" placeholder="Search" class="search mr-2" />
                </IconField>
              </div>
              <Select v-model="filter_company" :options="company" showClear optionLabel="name" placeholder="Company"
                class="w-full sm:w-48 mr-2" />
              <Select v-model="filter_purchased" :options="purchased_status" showClear optionLabel="name"
                placeholder="Purchased Status" class="w-full sm:w-48 mr-2" />
              <Select v-model="filter_daterange" :options="date_range" showClear optionLabel="name"
                placeholder="Date Range" class="w-full sm:w-48 mr-2" />
              <Select v-model="filter_payment" :options="payment_status" showClear optionLabel="name"
                placeholder="Payment Status" class="w-full sm:w-48 mr-2" />
            </div>
          </template>
        </Card>
        <div class="flex w-full relative mx-auto flex-wrap flex-row p-5">
          <div class="grow pr-5">
            <div class="relative">
              <DataTable v-model:selection="selectedPurchased" :value="NewPurchased" tableStyle="min-width: 50rem">
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
                      <Button icon="pi pi-times text-black" class="btn-cancel mr-2" @click="deletePurchased" />
                    </div>
                  </template>
                </Column>
              </DataTable>
              <div class="mt-5">
                <h1>Comment :</h1>
                <Textarea v-model="value" autoResize rows="5" class="w-full bg-slate-200 p-2 rounded-md" />
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
                  <Select v-model="selectedVat" :options="vat_type" optionLabel="name" placeholder="Select a City"
                    checkmark :highlightOnSelect="false" class="w-full" />
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
              <div class="mb-2">
                <h1>Add Payment</h1>
              </div>
              <InputGroup class="mb-5">
                <InputGroupAddon>
                  <label>Amount Dollar</label>
                </InputGroupAddon>
                <InputNumber />
              </InputGroup>
              <InputGroup class="mb-5">
                <InputGroupAddon>
                  <label>Amount Khmer</label>
                </InputGroupAddon>
                <InputNumber />
              </InputGroup>



              <hr class="mb-5">
              <div class="mb-2">
                <h1>Payment Type</h1>
              </div>
              <div class="grid grid-cols-3 gap-4 mb-6">
                <Button label="Dollar Cash" severity="info" />
                <Button label="Riel Cash" severity="info" />
                <Button label="ABA" severity="info" />
                <Button label="AC" severity="info" />
                <Button label="Check" severity="info" />
                <Button label="Gift" severity="info" />
              </div>

              <div class="flex flex-row justify-between">
                <InputGroup class="mb-2">
                  <label>
                    <h1>Payment Due :</h1>
                  </label>
                  <label>$0.00</label>
                </InputGroup>
                <Button label="Submit" severity="info" />
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
import { useRouter } from 'vue-router';
export default {
  name: "NewPurchased",
  components: {

  },
  data() {
    return {
      value1: null,
      NewPurchased: null,
      filter_company: null,
      filter_purchased: null,
      filter_daterange: null,
      filter_payment: null,
      selectedPurchased: null,
      totalAmount: null,
      visible: false,
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
      selectedVat: null,
      vat_type: [
        { name: '%' },
        { name: '$' },
      ]
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
  },

  mounted() {
    // Pre-select a city
    this.selectedVat = this.vat_type.find(vat_type => vat_type.name === '%'); // Replace 'NY' with the code of the city you want to pre-select
  }
};

</script>
