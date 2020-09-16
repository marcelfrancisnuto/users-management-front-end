<template>
    <div class="container">
        <div class="row mt-4">
            <div class="col-6 offset-3">
               <form action="#" @submit.prevent="login">
                   <h3>User Login</h3>
                   <div class="form-row">
                       <input type="email" v-model="formData.email" name="email" class="form-control" placeholder="Email Address">
                   </div> 
                   <div class="form-row">
                       <input type="password" v-model="formData.password" name="password" class="form-control" placeholder="Password">
                   </div>
                   <div class="form-row">
                       <button type="submit" class="btn btn-primary">Sign In</button>
                   </div>
                </form> 
            </div>
            
        </div>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        name: "Login",
        data() {
            return {
                secrets: [],
                formData: {
                    email: '',
                    password: ''
                }
            }
        },
        methods: {
            login() {
                axios.get('http://localhost:8000/sanctum/csrf-cookie')
                .then(res => {
                    console.log(res) 
                    axios.post('http://localhost:8000/login', this.formData)
                    .then(res => {
                        console.log(res)
                    })
                })
            }
        }
    }
</script>

<style scoped>
    .form-row {
        margin-bottom: 8px;
    }
</style>