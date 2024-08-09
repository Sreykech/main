<template>
    <div>
      <Header />
      <div class="system-body flex flex-row ">
        <div class="p-3 bg-[#f1f1f1]">
          <Sidebar />
        </div>
        <div class="grow">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </template>
  <script>
  import Header from "../components/Header.vue";
  import Sidebar from "../components/Sidebar.vue";
  import Product from "./product/Products.vue";
  import {useRouter} from 'vue-router';
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
  export default {
    name: "Master",
    components: {
      Header,
      Sidebar,
      Product
    },
    setup(){
        const router = useRouter(); 
        
    },
    methods: {
        
        productPage() {
          // Handle edit item logic
          router.push('/products');
        },
        viewItem() {
          // Handle view item logic
          router.push('/Crud/view');
        },
        createItem(){
          router.push('/Crud/createProduct');
        },
        deleteItem(){
          router.push('/Crud/createProduct');
        }
        
      }
    // mounted() {
    //   let user = localStorage.getItem("user-info");
    //   if (!user) {
    //     this.$router.push({ name: "Login" });
    //   }
    // }
  };
  </script>
  <style scoped></style>