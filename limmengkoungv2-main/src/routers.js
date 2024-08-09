import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "./components/Dashboard.vue";  // Adjust the path as necessary
//  import Login from "./components/Login.vue";  // Adjust the path as necessary
import Products from "./view/product/Products.vue";
import Categories from "./view/categories/Categories.vue";
import Company from "./view/company/company.vue";
import Customers from "./view/customers/Customers.vue";
import NewCustomers from "./view/customers/NewCustomer.vue";
import EditCustomers from "./view/customers/EditCustomers.vue";
import Purchase from "./view/purchase/Purchase.vue";
import NewPurchased from "./view/purchase/NewPurchased.vue";
import EditPurchased from "./view/purchase/EditPurchased.vue";
import Users from "./view/users/Users.vue";
import Sales from "./view/sales/Sales.vue";
import Reports from "./view/reports/Reports.vue";
import Expense from "./view/expense/Expense.vue";
import NewExpense from "./view/expense/NewExpense.vue";
import EditExpense from "./view/expense/EditExpense.vue";
import Transactions from "./view/transactions/Transactions.vue";
import Setting from "./view/setting/Setting.vue";
import POS from "./view/pos/POS.vue";
import NewProducts from "./view/product/NewProducts.vue";
import ComAddCompany from "./view/company/components/ComAddCompany.vue";
import CompanyDetail from "./view/company/CompanyDetail.vue";
import Login from "./view/login/Login.vue";
import ComAddUser from "./view/users/components/ComAddUser.vue";
import EditProducts from "./view/product/EditProducts.vue";
import NewCategories from "./view/categories/NewCategories.vue";
import EditCategories from "./view/categories/EditCategories.vue";
// import NewCategories from "./view/categories/NewCategories.vue";
//import UserDetail from "./view/users/UserDetail.vue";
import Summary from "./view/reports/inventery/Insummary.vue";	
import DetailReport from "./view/reports/inventery/IndetailReport.vue";
import GraphInventery from "./view/reports/inventery/GraphInventery.vue";
import SummarySales from "./view/reports/sales/Salesummary.vue";
import SaledetailReport from "./view/reports/sales/SaledetailReport.vue";
import GraphSales from "./view/reports/sales/Graphsale.vue";
import Customersummary from "./view/reports/customers/Customersummary.vue";
import CustomerdetailReport from "./view/reports/customers/CustomerdetailReport.vue";
import GraphCustomer from "./view/reports/customers/Graphcustomer.vue";
import Expensesummary from "./view/reports/expense/Expensesummary.vue";
import ExpensedetailReport from "./view/reports/expense/Expendetail.vue";
import GraphExpense from "./view/reports/expense/GraphExpense.vue";
import Companysummary from "./view/reports/companies/Companysummary.vue";
import CompanydetailReport from "./view/reports/companies/Companydetail.vue";
import GraphCompany from "./view/reports/companies/Graphcompany.vue";
import Purchasessummary from "./view/reports/pharchase/Purchasessummary.vue";
import PurchasedetailReport from "./view/reports/pharchase/PurchasedetailReport.vue";
import GraphPurchase from "./view/reports/pharchase/GraphPurchase.vue";


const routes = [
    {
        path: "/",
        name: "Dashboard",
        component: Dashboard,
    },
    // {
    //     path:"/",
    //     name:"Master",
    //     component: Master

    // },
    // {
    //     path: "/login",
    //     name: "Login",
    //     component: Login,
    // },
    {
        path: "/products",
        name: "Products",
        component: Products,
    },
    {
        path: "/categories",
        name: "Categories",
        component: Categories,
    },
    {
        path: "/new-category",
        name: "NewCategory",
        component:NewCategories,
    },
    {
        path: "/editcategories",
        name: "EditCategories",
        component:EditCategories,
    },
    {
        path: "/company",
        name: "Company",
        component: Company,
    },
    {
        path: "/add_company",
        name: "ComAddCompany",
        component: ComAddCompany,
        props:true,
    },
    {
        path: "/edit_company/:code?",
        name: "ComEditCompany",
        component: ComAddCompany,
        props:true,
    },
    {
        path: "/company_detail",
        name: "CompanyDetail",
        component: CompanyDetail,
    },
    {
        path: "/customers",
        name: "Customers",
        component: Customers,
    },
    {
        path: "/new-customer",
        name: "NewCustomer",
        component: NewCustomers,
    },
    {
        path: "/edit-customer",
        name: "EditCustomers",
        component: EditCustomers,
    },
    {
        path: "/purchase",
        name: "Purchase",
        component: Purchase,
    },
    {
        path: "/new-purchased",
        name: "NewPurchased",
        component: NewPurchased,
    },
    {
        path: "/editpurchased",
        name: "EditPurchased",
        component: EditPurchased,
    },
    {
        path: "/expense",
        name: "Expense",
        component: Expense,
    },
    {
        path: "/newexpense",
        name: "NewExpense",
        component: NewExpense,
    },
    
    {
        path: "/editexpense",
        name: "EditExpense",
        component: EditExpense,
    },
    {
        path: "/sales",
        name: "Sales",
        component: Sales,
    },
    {
        path: "/users",
        name: "Users",
        component: Users,
    },
    {
        path: "/add_user",
        name: "ComAddUser",
        component: ComAddUser,
    },
    {
        path: "/edit_user/:code?",
        name: "ComEditUser",
        component: ComAddUser,
    },
    {
        path: "/reports",
        name: "Reports",
        component: Reports,
    },
    {
        path: "/setting",
        name: "Setting",
        component: Setting,
    },
    {
        path: "/pos",
        name: "POS",
        component: POS,
    },
    {
        path: "/transactions",
        name: "Transactions",
        component: Transactions,
    },

    {
        path: "/new-product",
        name: "NewProducts",
        component: NewProducts,
    },
    {
        path: "/login",
        name: "Login",
        component: Login,
    },
    {
        path: "/inventory-summary",
        name: "InventorySummary",
        component: Summary,
    },
    {
         path:"/inventory-detail-report",
         name:"InventoryDetailReport",
         component:DetailReport
    },
    {
         path:"/inventory-graphs",
         name:"InventoryGraphs",
         component:GraphInventery
    },
    {
         path:"/sales-summary",
         name:SummarySales,
         component:SummarySales,
    },
    {
         path:"/sales-detail-report",
         name:SaledetailReport,
         component:SaledetailReport,
    },
    {
         path:"/sales-graphs",
         name:GraphSales,
         component:GraphSales,
    },
    {
         path:"/customer-summary",
         name:Customersummary,
         component:Customersummary,
    },
    {
         path:"/customer-detail-report",
         name:CustomerdetailReport,
         component:CustomerdetailReport,
    },
    {
         path:"/customer-graphs",
         name:GraphCustomer,
         component:GraphCustomer, 
    },
    {
         path:"/expenses-summary",
         name:Expensesummary,
         component:Expensesummary,
    },

    {
         path:"/expenses-detail-report",
         name:ExpensedetailReport,
         component:ExpensedetailReport,
    },
    {
         path:"/expenses-graphs",
         name:GraphExpense,
         component:GraphExpense,
    },
    {
         path:"/company-summary",
         name:Companysummary,
         component:Companysummary,    
    },
    {
         path:"/company-detail-report",
         name:CompanydetailReport,
         component:CompanydetailReport,
    },
    {
         path:"/company-graphs",
         name:GraphCompany,
         component:GraphCompany,
    },
    {
         path:"/purchases-summary",
         name:Purchasessummary,
         component:Purchasessummary,
    },
    {
         path:"/purchases-detail-report",
         name:PurchasedetailReport,
         component:PurchasedetailReport,
    },
    {
         path:"/purchases-graphs",
         name:GraphPurchase,
         component:GraphPurchase,
    },
];  

const router = createRouter({   
    history: createWebHistory(),
    routes,
});

export default router;
