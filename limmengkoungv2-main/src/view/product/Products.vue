<template>
  <div>
    <Header />
    <div class="system-body flex flex-row ">
      <div class="sidebar-overlay"></div>
      <div class="sidebar-wrap p-3 bg-[#f1f1f1]">
        <Sidebar />
      </div>
      <div class="grow max-w-full">
        <div class="container mx-auto">
          <Toast ref="toast" />

          <div class="flex gap-4 pt-6 pb-2 title_bar items-center px-2">
            <a @click="toggleSidebar">
              <i class="pi pi-align-left font-bold" ></i>
            </a>
            <h1 class="font-bold">Products</h1>
          </div>

          <DataTable v-model:selection="selectedProducts" :value="Products" dataKey="id" tableStyle="min-width: 50rem; max-width: 100%; overflow: scroll;"
            :paginator="true" :rows="10" :filters="filters"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            :rowsPerPageOptions="[5, 10, 25]"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products" >

            <template #header class="mx-0 ">
              <div class=" mb-5 mt-6 grid grid-cols-1 md:grid-cols-4 gap-3">
                <Select v-model="filter_code" :options="code" showClear optionLabel="name" placeholder="ProductsCode"
                  class="mr-0 md:mr-2" />
                <Select v-model="filter_products" :options="products_name" showClear optionLabel="name"
                  placeholder="Products Name" class="mr-0 md:mr-2" />
                <Select v-model="filter_categories" :options="categories" showClear optionLabel="name"
                  placeholder="Categories" class="mr-0 md:mr-2" />
                <Select v-model="filter_company" :options="company" showClear optionLabel="name" placeholder="Company"
                  class="mr-0 md:mr-2" />
              </div>
              <div class="flex justify-between flex-col md:flex-row">
                <IconField iconPosition="left">
                  <InputIcon>
                    <i class="pi pi-search" />
                  </InputIcon>
                  <InputText class="w-full" v-model="filters['global'].value" placeholder="Keyword Search" />
                </IconField>

                <div class="tb-action-buttons space-x-4 grid grid-cols-2 md:flex gap-2 mt-2 md:mt-0">
                  <Button icon="pi pi-trash" label="Delete" severity="danger" raised @click="confirmDeleteSelected"
                    :disabled="!selectedProducts || !selectedProducts.length" />

                  <router-link to="/new-product">
                    <Button icon="pi pi-plus" class="p-button-success w-full" label="Add Product" raised />
                  </router-link>
                </div>
              </div>

            </template>
            <Column selectionMode="multiple" style="width: 3rem" headerClass="tb-header" :exportable="false"></Column>
            <Column headerClass="tb-header" header="Image">
              <template #body="slotProps">
                <img :src="`https://endura-steel.com/wp-content/uploads/2023/06/steel-facts.jpg`"
                  :alt="slotProps.data.image" class="border-round" style="width: 64px" />
              </template>
            </Column>
            <Column field="code" headerClass="tb-header" header="Products Code"></Column>
            <Column field="products" header="Products Name" headerClass="tb-header" sortable></Column>
            <Column field="categories" header="Categories" headerClass="tb-header" sortable></Column>
            <Column field="company" header="Company" headerClass="tb-header" sortable></Column>
            <Column field="cost" header="Cost" headerClass="tb-header"></Column>
            <Column field="wholeSalePrice" header="WholeSale Price" headerClass="tb-header"></Column>
            <Column field="unitPrice" header="Unit Price" headerClass="tb-header"></Column>
            <Column field="inventory" header="Inventory" headerClass="tb-header"></Column>
            <Column header="Actions" headerClass="tb-header">
              <template #body="slotProps">
                <div class="flex align-items-center justify-content-end">
                  <router-link to="/edit-product" rel="noopener">
                    <Button icon="pi pi-pen-to-square" severity="secondary" text class="btn-edit mr-2" />
                  </router-link>
                  <Button icon="pi pi-trash" severity="secondary" text class="btn-delete mr-2"
                    @click="confirmDeleteProduct(slotProps.data)" />
                  <Button icon="pi pi-eye " severity="secondary" text class="btn-view mr-2"
                    @click="showPopup(slotProps.data)" />
                </div>
              </template>
            </Column>
          </DataTable>
          <Dialog v-model:visible="deleteProductDialog" :style="{ width: '450px' }" header="Confirm" :modal="true">
            <div class="flex items-center gap-4">
              <i class="pi pi-exclamation-triangle !text-3xl" />
              <span v-if="products">Are you sure you want to delete <b>{{ Products.code }}</b>?</span>
            </div>
            <template #footer>
              <Button label="No" icon="pi pi-times" text @click="deleteProductDialog = false" />
              <Button label="Yes" icon="pi pi-check" @click="deleteProduct" />
            </template>
          </Dialog>
          <Dialog v-model:visible="deleteProductsDialog" :style="{ width: '450px' }" header="Confirm" :modal="true">
            <div class="flex items-center gap-4">
              <i class="pi pi-exclamation-triangle !text-3xl" />
              <span v-if="products">Are you sure you want to delete the selected products?</span>
            </div>
            <template #footer>
              <Button label="No" icon="pi pi-times" text @click="deleteProductsDialog = false" />
              <Button label="Yes" icon="pi pi-check" text @click="deleteSelectedProducts" />
            </template>
          </Dialog>
          <Dialog class="w-11/12 md:w-4/12" v-model:visible="popupVisible" header="View Products" modal>
            <div v-if="popupData" class="flex flex-row gap-5 justify-content-between">
              <div class="w-full md:w-1/3 flex items-center">
                <img :src="`https://endura-steel.com/wp-content/uploads/2023/06/steel-facts.jpg`" :alt="popupData.image"
                  class="border-round w-full" />
              </div>
              <div class="w-full md:w-2/3">
                <p>Products Code : {{ popupData.code }}</p>
                <p>Products Name : {{ popupData.products }}</p>
                <p>Categories : {{ popupData.categories }}</p>
                <p>Cost : {{ popupData.cost }}</p>
                <p>WholeSale Price : {{ popupData.wholeSalePrice }}</p>
                <p>Unit Price : {{ popupData.unitPrice }}</p>
                <p>Inventory : {{ popupData.inventory }}</p>
              </div>

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
  name: "Products",
  components: {
  },
  data() {
    return {
      products: null,
      selectedProducts: null,
      filter_code: null,
      filter_products: null,
      filter_categories: null,
      filter_company: null,
      filters: {},
      value: '',
      items: [],
      deleteProductDialog: false,
      deleteProductsDialog: false,
      visible: false,
      popupData: null,
      popupVisible: false,


      code: [
        { name: 'PSR0001', code: 'PSR0001' },
        { name: 'PSR0002', code: 'PSR0002' },
        { name: 'PSR0003', code: 'PSR0003' },
      ],
      products_name: [
        { name: 'ordered', code: 'OR' },
        { name: 'Panding', code: 'PA' },
        { name: 'Received', code: 'RE' }
      ],
      categories: [
        { name: 'LIM', code: 'LIM' },
        { name: 'ABC', code: 'ABC' },
        { name: 'Store', code: 'Store' },
      ],
      company: [
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
    confirmDeleteProduct(products) {
      this.products = products;
      this.deleteProductDialog = true;
    },
    deleteProduct() {
      this.Products = this.Products.filter(val => val.id !== this.products.id);
      this.deleteProductDialog = false;
      this.products = {};
      this.$toast.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
    },
    confirmDeleteSelected() {
      this.deleteProductsDialog = true;
    },
    deleteSelectedProducts() {
      this.Products = this.Products.filter(val => !this.selectedProducts.includes(val));
      this.deleteProductsDialog = false;
      this.selectedProducts = null;
      this.$toast.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
    },
    showPopup(Products) {
      this.popupData = Products
      this.popupVisible = true
    },
  },
  setup() {
    const router = useRouter();
    const selectedProducts = ref();

    // Sample data - replace this with your actual data fetching logic
    const Products = ref([
      {
        id: 1,
        code: "PSR0001",
        products: "25*25*1.2",
        categories: "$100.00",
        company: "$100.00",
        cost: "$0.00",
        wholeSalePrice: "$100.00",
        unitPrice: "$100.00",
        inventory: "$100.00",

      },
      {
        id: 2,
        code: "PSR0002",
        products: "30*30*1.5",
        categories: "$100.00",
        company: "$100.00",
        cost: "$0.00",
        wholeSalePrice: "$100.00",
        unitPrice: "$100.00",
        inventory: "$100.00",
      },

      // ... more Products
    ]);
    return {
      Products,
      selectedProducts
    };
  }

};
</script>

<style scoped>
.search {
  margin: 10px;
  padding: 5px;
  width: 200px;
  border: 1px solid rgb(176, 52, 52);
  border-radius: 4px;
}

.btn-edit,
.btn-delete,
.btn-view {

  border: none;
  cursor: pointer;
  background: none;
}

.btn-create {
  /* Button styles */
  border: #7BE0B6;
  cursor: pointer;
  background: none;
  color: #7BE0B6;
  margin: 5px;
  border-color: #7BE0B6;
}
</style>