<template>
  <div>
    <ul class="list-none flex flex-col gap-2" id="sidebar">
      <menuItem class="menu-item rounded-md"
        v-for="(page, index) in Pages" :key="index" :link="page.link" :icon="page.icon" :linkText="page.text"
        :depth="0" />
    </ul>
  </div>  
</template>

<script>
import {computed, ref} from 'vue';
import {
  faHouse, faBox, faCog, faLayerGroup,
  faUserGroup, faUser, faBuilding, faCartPlus, faList,
  faFileInvoiceDollar, faRepeat, faReceipt, faRightFromBracket
} from '@fortawesome/free-solid-svg-icons';
import menuItem from "./menuItem.vue";


export default {
  name: "Sidebar",
  components: {
    menuItem,
  },
  data() {
    return {
      Pages: [
        {
          link: '/',
          icon: faHouse,
          text: 'Dashboard'
        },
        {
          link: 'products',
          icon: faBox,
          text: 'Products'
        },
        {
          link: 'categories',
          icon: faLayerGroup,
          text: 'Categories'
        },
        {
          link: 'customers',
          icon: faUserGroup,
          text: 'Customers'
        },
        {
          link: 'company',
          icon: faBuilding,
          text: 'Company'
        },
        {
          link: 'purchase',
          icon: faCartPlus,
          text: 'Purchase'
        },
        {
          link: 'sales',
          icon: faList,
          text: 'Sales'
        },
        {
          link: 'expense',
          icon: faFileInvoiceDollar,
          text: 'Expense'
        },
        {
          link: 'transactions',
          icon: faRepeat,
          text: 'Transactions'
        },
        {
          link: 'reports',
          icon: faReceipt,
          text: 'Reports'
        },
        {
          link: 'users',
          icon: faUser,
          text: 'Users'
        },
        {
          link: 'setting',
          icon: faCog,
          text: 'Settings'
        },
        {
          link: 'Logout',
          icon: faRightFromBracket,
          text: 'Logout'
        },
      ]
    }
  },
  setup() {
    const isActive = ref(false);

    const toggleSidebar = () => {
      isActive.value = !isActive.value;
    };

    const sidebarClasses = computed(() => {
      return {
        'active': isActive.value,
        'sidebar-wrap': true,
        'p-3': true,
        'bg-[#f1f1f1]': true
      };
    });

    return {
      isActive,
      toggleSidebar,
      sidebarClasses
    };
  }
};

</script>

<style scoped></style>
