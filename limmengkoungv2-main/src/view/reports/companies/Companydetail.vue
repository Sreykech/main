<template>
    <div>
      <Header />
      <div class="system-body flex flex-row">
        <div class="sidebar-wrap p-3 bg-[#f1f1f1]">
          <Sidebar />
        </div>
        <div class="grow max-w-full">
          <div class="container mx-auto p-6">
            <h1 class="text-center">Hello User, Welcome on CompanydetailReport</h1>
            <div class="card justify-center items-center border border-gray-300 rounded px-2 py-1">
              <div class="flex space-y-4">
                <div class="w-1/4 flex flex-col md:flex-row items-center mt-4 p-2 md:p-5">
                  <span class="w-full md:w-32 mb-2 md:mb-0">Start Date:</span>
                  <input
                    type="date"
                    class="border border-gray-300 rounded px-2 py-1 w-full"
                    v-model="value"
                  />
                </div>
                <div class="w-1/4 flex flex-col md:flex-row items-center p-2 md:p-5">
                  <span class="w-full md:w-32 mb-2 md:mb-0">End Date:</span>
                  <input
                    type="date"
                    class="border border-gray-300 rounded px-2 py-1 w-full"
                    v-model="value"
                  />
                </div>
                <div class="w-1/4 flex flex-col md:flex-row items-center p-2 md:p-5">
                  <div class="card flex justify-center">
                    <Dropdown
                      v-model="selectedReport"
                      editable
                      :options=" DateType"
                      optionLabel="name"
                      placeholder="Choose Date"
                      class="w-full md:w-[14rem]"
                    />
                  </div>
                </div>
                <div class="w-1/4 flex flex-col md:flex-row items-center p-2 md:p-5 gap-2">
                  <Button class="md:w-full mx-auto" label="Show" @click="ShowReport()" />
                  <Button class="md:w-full mx-auto bg-gray-300" label="Print" />
                </div>
              </div>
            </div>
              <div v-if="isvisible" class="w-full text-center mt-10 text-3xl">
                <h1>Welcome To CompanydetailReport</h1> 
                  </div>
          </div>
        </div>
      </div>
      </div>
  </template>
    
    <script>
  import router from "@/routers";
  import autoprefixer from "autoprefixer";
  
  export default {
    name: "CompanydetailReport",
    components: {},
    data() {
      return {
        value: "",
        isvisible: false,
        selectedReport: null,
        DateType: [
          { name: "" },
          { name: "Today" },
          { name: "Yesterday" },
          { name: "1 months" },
          { name: "3 months" },
          { name: "6 months" },
          { name: "1 year" }
        ]
      };
    },
    methods: {
     
        ShowReport(){
          this.isvisible = true;
        }
    }
  };
  </script>
    
    <style scoped>
  /* Add any additional scoped styles here */
  </style>
  