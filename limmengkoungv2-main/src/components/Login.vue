<template>
    <div class="container">
    <h1>Login</h1>
    <input type="text" placeholder="Username" v-model="name">
    <input type="password" placeholder="Password" v-model="password">
    <button class="btn" @click="signIn">Submit</button>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: "Signin",
    data() {
        return {
            name : "",
            password : ""
            
        }
    },
    methods: {
  async signIn() {
    try {
      let result = await axios.get(`http://localhost:3000/USER?name=${this.name}&password=${this.password}`)
      console.warn(result);
      if (result.status == 200 && result.data.length > 0) {
        //alert("Signin Successfull");
        localStorage.setItem("user-info", JSON.stringify(result.data));
        this.$router.push({ name: "Home" });
       // window.location.reload();
      }
    } catch (error) {
      console.error('Error during sign-in:', error);
      // Handle the error (e.g., show a message to the user)
    }
  }
},
mounted() {
  let user = localStorage.getItem("user-info");
  if (user) {
    this.$router.push({ name: "Home" });
  }
},

 
}
</script>
<style scoped>

</style>