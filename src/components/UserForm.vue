<template>
    <div class="col-md-6 mt-4 mb-4">
        <div class="card card-default">
            <div class="card-body">
                <form @submit.prevent="onSubmit">
                    <div class="form-group">
                        <input type="email" class="form-control" v-model="user.email" id="email" aria-describedby="emailHelp" placeholder="Enter email">
                    </div>
                    <div class="form-group">
                        <input type="input" class="form-control" v-model="user.first_name" id="first_name" placeholder="Enter your First Name">
                    </div>
                    <div class="form-group">
                        <textarea class="form-control" v-model="user.address" id="address" rows="3" placeholder="Enter your Address"></textarea>
                    </div>
                    <div class="form-group">
                        <input type="input" class="form-control" v-model="user.postal_code" id="postal_code" placeholder="Enter your Postal Code">
                    </div>
                    <div class="form-group">
                        <input type="input" class="form-control" v-model="user.phone_number" id="Phone Number" placeholder="Enter your Phone Number">
                    </div>
                    <div class="form-group">
                        <input type="input" class="form-control" v-model="user.username" id="username" placeholder="Enter your Username">
                    </div>
                    <div class="form-group">
                        <input type="password" class="form-control" v-model="user.password" id="password" placeholder="Enter your Username">
                    </div>
                    <button type="submit" class="btn btn-primary float-left">Save</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapActions } from 'vuex'

    export default {
        name: "UserForm",
        data() {
            return {
                user: {
                    first_name: '',
                    last_name: '',
                    address: '',
                    postal_code: '',
                    phone_number: '',
                    email: '',
                    username: '',
                    password: ''
                }
            }
        },
        methods: {
            ...mapActions(['addUser']),
            onSubmit(e) {
                e.preventDefault()
                this.addUser(this.user)
            }
        }
    }
</script>

<style scoped>

</style>