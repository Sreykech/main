<template>
  <div class=" w-[400px] h-auto m-auto mt-10 bg-white-50 border border-gray-200 rounded-lg shadow ">
    <form method ="post" action="">
    <img src="../../assets/images/logo.png" alt="logo" class="w-[120px] h-[110px] mt-2 mx-auto" />
    <h1 class="text-center mt-5 font-bold text-2xl ">Login</h1>
    <span v-if="loginError" class="error1">{{ loginError }}</span>
    <div class="card flex justify-center">
        <div class="flex flex-col gap-2">
            <label class="font-bold" for="username">Username:</label>
            <InputText  name="username" class="w-[350px]" id="username" v-model="username" aria-describedby="username-help" placeholder="Username" />
        </div>
    </div>
    <div class="card flex justify-center">
        <div class="flex flex-col gap-2">
            <label class="font-bold" for="username">Password:</label>
            <InputText type="password" name="username" class="w-[350px]" id="password" v-model="password" aria-describedby="username-help" placeholder="Password" />
        </div>
    </div>
    <div class="card m-7">
        <Checkbox v-model="checked" :binary="true"/>
        <Button class="w-[100px] ml-[250px]" label="Submit" @click="signIn" />
    </div>
    
       
    
  </form>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "SigninPage",
  data() {
    return {
      
      name: "",
      password: "",
      remember: false,
      nameError: false,
      passwordError: "",
      loginError: "",
      checked: false,
      username: null,
      password: null

    };
    
  },
  methods: {
    async signIn() {
      this.nameError = this.value;  
      if (!this.name) {
        this.nameError = 'p-invalid';
      }
      if (!this.password) {
        this.passwordError = "Password is required";
      }
      if (this.nameError || this.passwordError) {
        return;
      }

      try {
        let result = await axios.get(`http://localhost:3000/USER?name=${this.name}&password=${this.password}`);
        console.warn(result);
        if (result.status == 200 && result.data.length > 0) {
          localStorage.setItem("user-info", JSON.stringify(result.data));
          this.$router.push({ name: "Dashboard" });
        } else {
          this.loginError = "Invalid username or password";
        }
      } catch (error) {
        console.error("Error during sign-in:", error);
        this.loginError = "An error occurred during sign-in. Please try again.";
      }
    }
  },
};
</script>
<style scoped>

</style>
