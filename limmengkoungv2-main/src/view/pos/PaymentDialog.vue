

<template>
  <div class="payment-dialog">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-x-2">
      <div class="">
        <InputGroup class="mb-3">
          <InputText/>
          <Button icon="pi pi-arrow-left" severity="danger" />
        </InputGroup>
        <div class="number-input grid grid-cols-3 gap-2">
          <Button label="1" severity="info" />
          <Button label="2" severity="info" />
          <Button label="3" severity="info" />
          <Button label="4" severity="info" />
          <Button label="5" severity="info" />
          <Button label="6" severity="info" />
          <Button label="7" severity="info" />
          <Button label="8" severity="info" />
          <Button label="9" severity="info" />
          <Button label="0" severity="info" />
          <Button label="." severity="info" />
          <Button label="Clear" severity="danger" />
        </div>
      </div>
      <div class="">
        <div class="payment-types grid grid-cols-2 gap-2">
        <Button label="Cash Dollar" severity="info" />
        <Button label="Cash Reil" severity="info" />
        <Button label="ABA Dollar" severity="info" />
        <Button label="ABA Reil" severity="info" />
        </div>
      </div>
      <div class="">
        <DataTable :value="totalAmount" showGridlines tableStyle="">
          <Column field="totalusd" header="Total USD"></Column>
          <Column field="totalkhr" header="Total KHR"></Column>
        </DataTable>
      </div>
    </div>
  </div>
</template>

<script>
import {ref} from "vue";
import {useRouter} from "vue-router";

export default {
  data() {
    return {
      totalAmount: null,
      name: "PaymentDialog"
    }
  },
  setup(){
    const router = useRouter();
    const totalAmount = ref([
      {
        totalusd: '$80.00',
        totalkhr: '320,000.00៛',
      },
    ]);
    return {  totalAmount };
  }
}
</script>

<style>
</style>