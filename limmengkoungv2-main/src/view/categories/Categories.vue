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
            <h1 class="font-bold">Categories</h1>
          </div>

          <Toast ref="toast" />
          
          <DataTable v-model:selection="selectedCategories" :value="Categories" dataKey="id"
                     tableStyle="min-width: 50rem; max-width: 100%; overflow: scroll;" :paginator="true" :rows="10" :filters="filters"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            :rowsPerPageOptions="[5, 10, 25]"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} categories">

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
                          :disabled="!selectedProducts || !selectedProducts.length" />

                  <router-link to="/new-category">
                    <Button icon="pi pi-plus" class="p-button-success w-full" label="Add Product" raised />
                  </router-link>
                </div>
              </div>

            </template>

            <Column selectionMode="multiple" style="width: 3rem" headerClass="tb-header" :exportable="false"></Column>
            <Column field="code" headerClass="tb-header" header="Categories Code"></Column>
            <Column field="categories" header="Categories Name" headerClass="tb-header" ></Column>
            <Column field="comment" header="Comment" headerClass="tb-header"></Column>
            <Column header="Actions" headerClass="tb-header">
              <template #body="slotProps">
                <div class="flex align-items-center justify-content-end">
                  <router-link to="/EditCategories" rel="noopener">
                    <Button icon="pi pi-pen-to-square" severity="secondary" text class="btn-edit mr-2" />
                  </router-link>
                  <Button icon="pi pi-trash" severity="secondary" text class="btn-delete mr-2"
                    @click="confirmDeleteCategory(slotProps.data)" />
                  <Button icon="pi pi-eye " severity="secondary" text class="btn-view mr-2"
                    @click="showPopup(slotProps.data)" />
                </div>
              </template>
            </Column>
            <Dialog v-model:visible="popupVisible" header="View Category" modal>
              <div v-if="popupData">
                <p>Code : {{ popupData.code }}</p>
                <p>categories : {{ popupData.categories }}</p>
                <p>Comment : {{ popupData.comment }}</p>
              </div>
              <template #footer>
                <Button label="Close" @click="popupVisible = false" class="p-button-text" />
              </template>
            </Dialog>
          </DataTable>
          <Dialog v-model:visible="deleteCategoryDialog" :style="{ width: '450px' }" header="Confirm" :modal="true">
            <div class="flex items-center gap-4">
              <i class="pi pi-exclamation-triangle !text-3xl" />
              <span v-if="categories">Are you sure you want to delete <b>{{ categories.code }}</b>?</span>
            </div>
            <template #footer>
              <Button label="No" icon="pi pi-times" text @click="deleteCategoryDialog = false" />
              <Button label="Yes" icon="pi pi-check" @click="deleteCategory" />
            </template>
          </Dialog>
          <Dialog v-model:visible="deleteCategoriesDialog" :style="{ width: '450px' }" header="Confirm" :modal="true">
            <div class="flex items-center gap-4">
              <i class="pi pi-exclamation-triangle !text-3xl" />
              <span v-if="categories">Are you sure you want to delete the selected categories?</span>
            </div>
            <template #footer>
              <Button label="No" icon="pi pi-times" text @click="deleteCategoriesDialog = false" />
              <Button label="Yes" icon="pi pi-check" text @click="deleteSelectedCategories" />
            </template>
          </Dialog>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import { ref } from 'vue';
// import { useRouter } from 'vue-router';

export default {
  name: "Categories",
  components: {
  },
  data() {
    return {
      categories: null,
      selectedCategories: null,
      popupData: null,
      popupVisible: false,
      deleteCategoryDialog: false,
      deleteCategoriesDialog: false,
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
        'global': { value: null, matchMode: this.$filterMatchMode.contains }
      }
    },
    confirmDeleteCategory(categories) {
      this.categories = categories;
      this.deleteCategoryDialog = true;
    },
    deleteCategory() {
      this.Categories = this.Categories.filter(val => val.id !== this.categories.id);
      this.deleteCategoryDialog = false;
      this.categories = {};
      this.$toast.add({ severity: 'success', summary: 'Successful', detail: 'Category Deleted', life: 3000 });
    },
    confirmDeleteSelected() {
      this.deleteCategoriesDialog = true;
    },
    deleteSelectedCategories() {
      this.Categories = this.Categories.filter(val => !this.selectedCategories.includes(val));
      this.deleteCategoriesDialog = false;
      this.selectedCategories = null;
      this.$toast.add({ severity: 'success', summary: 'Successful', detail: 'Categories Deleted', life: 3000 });
    },
    showPopup(Categories) {
      this.popupData = Categories
      this.popupVisible = true
    },
  },
  setup() {
    // const router = useRouter();
    const selectedCategories = ref();

    // Sample data - replace this with your actual data fetching logic
    const Categories = ref([
      {
        id: 1,
        code: "CAT0001",
        categories: "ដែក",
        comment: "This is a comment",

      },
      {
        id: 2,
        code: "CAT0002",
        categories: "ស័ង្កសី",
        comment: "This is a comment",
      },

      // ... more Categories
    ]);
    return {
      Categories,
      selectedCategories
    };
  }

};
</script>

<style scoped>
.btn-edit,
.btn-delete,
.btn-view {
  border: none;
  cursor: pointer;
  background: none;
}
</style>