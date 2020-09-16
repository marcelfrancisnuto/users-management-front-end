<template>
    <div class="col-md-6 mt-4 mb-4">
        <div class="card card-default">
            <div class="card-body">
                <h3 v-if="!updateToggle">Add User</h3>
                <h3 v-if="updateToggle">Update User</h3>
                
                <form @submit.prevent="onSubmit">
                    <div class="form-group">
                        <input type="email" class="form-control" v-model="user.email" id="email" aria-describedby="emailHelp" placeholder="Enter email">
                    </div>
                    <div class="form-group">
                        <input type="input" class="form-control" v-model="user.first_name" id="first_name" placeholder="Enter your First Name">
                    </div>
                    <div class="form-group">
                        <input type="input" class="form-control" v-model="user.last_name" id="last_name" placeholder="Enter your Last Name">
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
                    <div v-if="!updateToggle" class="form-group">
                        <input type="password" class="form-control" v-model="user.password" id="password" placeholder="Enter your Username">
                    </div>
                    <button v-if="!updateToggle" type="submit" class="btn btn-primary float-left">Create</button>
                    <button v-if="updateToggle" @click.prevent="update($event)" class="btn btn-primary float-left">Save</button>
                </form>
                <button v-if="updateToggle" @click="cancel()" class="btn btn-danger float-left ml-2">Cancel</button>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex'
    export default {
        name: "UserForm",
        props: ['testUser'],
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
                },
                initialState: {
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
            ...mapActions(['addUser', 'selectUser', 'cancelUpdate', 'updateUser']),
            onSubmit(e) {
                e.preventDefault()
                this.addUser(this.user)

                //TODO: is it possible to reset from vuex instead?
                this.resetForm()
            },
            resetForm() {
                this.user = this.initialState
            },
            cancel() {
                this.cancelUpdate()
                this.user = this.initialState
            },
            update(e) {
                e.preventDefault()
                this.updateUser(this.user)
                this.resetForm()
            }
        },
        computed: {
            ...mapGetters(['updateToggle'])
        },
        watch: {
            testUser: function(newVal) {
                this.user = newVal
            }
        }
    }
</script>

<style scoped>

</style>