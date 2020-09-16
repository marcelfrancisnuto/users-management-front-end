<template>
    <div class="row">
        <UserForm />

        <div class="col-md-12 mb-4">
            <div class="card card-default">
                <div class="card-body">
                    <table class="table table-responsive table-striped highlight z-depth-1 hoverable">
                        <thead>
                            <tr>
                                <th v-for="field in fields" :key="field">{{field}}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="user in allUsers" :key="user.id">
                                <td>
                                    <b-form-checkbox 
                                        v-model="selectUsers"
                                        :id="user.username" 
                                        :value="user"
                                    ></b-form-checkbox>
                                </td>
                                <td>{{user.first_name}}</td>
                                <td>{{user.last_name}}</td>
                                <td>{{user.address}}</td>
                                <td>{{user.postal_code}}</td>
                                <td>{{user.phone_number}}</td>
                                <td>{{user.email}}</td>
                                <td>{{user.username}}</td>
                                <td> 
                                    <router-link :to="{path: '/edit/'+ user.id, params: {data: user}}" @click.prevent="selectUser(user)"><b-icon variant="primary" icon="pencil"></b-icon></router-link>
                                    &nbsp;
                                    <a href="#" @click.prevent="deleteUser(user.id)">
                                        <b-icon variant="primary" icon="trash"></b-icon>
                                    </a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    
                    <nav aria-label="users-pagination">
                        <ul class="pagination">
                            <li v-bind:class="[{disabled: !allPagination.previous_page_url}]" class="page-item">
                                <a class="page-link" href="#" @click="fetchUsers(allPagination.previous_page_url)">
                                    Previous
                                </a>
                            <li class="page-item disabled">
                                <a href="#" class="page-link text-dark">
                                    Page {{allPagination.current_page}} of {{allPagination.last_page}}
                                </a>
                            </li>
                            <li v-bind:class="[{disabled: !allPagination.next_page_url}]" class="page-item">
                                <a class="page-link" href="#" @click="fetchUsers(allPagination.next_page_url)">Next</a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
        <div class="col-md-12 mb-4">
            <button 
                class="btn btn-danger float-left" 
                @click="batchDelete()" 
                v-bind:class="[{disabled: selected.length == 0}]" :disabled="selected.length == 0"
            >Delete selected
            </button>
        </div>
    </div>
</template>

<script>

    // import axios from 'axios'
    import UserForm from '@/components/UserForm.vue'

    import { mapGetters, mapActions } from 'vuex'

    export default {
        name: 'UsersManagement',
        components: {
            UserForm
        },
        data() {
            return {
                users: [],
                api_host: '',
                pagination: {},
                selected: [],
                fields: [
                    'Select',
                    'First Name',
                    'Last Name',
                    'Address',
                    'Postal Code',
                    'Phone Number',
                    'Email',
                    'Username',
                    'Actions'
                ]
            }
        },
        methods: {
            ...mapActions(['fetchUsers', 'deleteUser', 'selectUser', 'batchDeleteUsers']),
            toggleUpdate() {
                console.log('update toggled...')
                this.updating = true
            },
            batchDelete() {
                this.batchDeleteUsers(this.selected)
            }
        },
        computed: {
            ...mapGetters(['allUsers', 'allPagination']),
            selectUsers: {
                get() {
                    return this.selected
                },
                set(val) {
                    this.selected = val
                }
            }
        },
        created() {
            this.fetchUsers()
        }
    }
</script>

<style scoped>
</style>