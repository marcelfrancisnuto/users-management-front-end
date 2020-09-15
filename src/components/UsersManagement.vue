<template>
    <div class="row">
        <UserForm/>

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
                            <tr v-for="user in users" :key="user.id">
                                <td>
                                    <b-form-checkbox 
                                        v-model="selectedUsers" 
                                        :id="user.username" 
                                        :value="user.id"
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
                                    <a href="#"><b-icon variant="primary" icon="pencil"></b-icon></a>
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
                            <li v-bind:class="[{disabled: !pagination.previous_page_url}]" class="page-item">
                                <a class="page-link" href="#" @click="getUsers(pagination.previous_page_url)">
                                    Previous
                                </a>
                            <li class="page-item disabled">
                                <a href="#" class="page-link text-dark">
                                    Page {{pagination.current_page}} of {{pagination.last_page}}
                                </a>
                            </li>
                            <li v-bind:class="[{disabled: !pagination.next_page_url}]" class="page-item">
                                <a class="page-link" href="#" @click="getUsers(pagination.next_page_url)">Next</a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
        <div class="col-md-12 mb-4">
            <button 
                class="btn btn-danger float-left" 
                @click="deleteSelectedUsers()" 
                v-bind:class="[{disabled: selected.length == 0}]" :disabled="selected.length == 0"
            >Delete selected
            </button>
        </div>
    </div>
</template>

<script>

    import axios from 'axios'
    import UserForm from '@/components/UserForm.vue'

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
        mounted() {
            this.api_host = this.$store.state.api_host;
        },
        created() {
            this.getUsers();
        },
        methods: {
            async getUsers(url) {
                let vm = this;
                console.log(this.api_host, 'here');
                url = url || 'http://localhost:8000/api/users';
                axios.get(url)
                .then(res => { 
                    this.users = res.data.data;

                    vm.makePagination(res.data.meta, res.data.links);
                })
                .catch(err => console.log(err))
            },
            async deleteUser(id) {
                if (confirm("Do you want to delete this user?")) {
                    axios.delete(`http://localhost:8000/api/users/${id}`)
                    .then(res => {
                        console.log(res);
                        if (res.data.message) {
                            alert('User has been deleted');
                            //reload list of users
                            this.getUsers();
                        } else if (res.data.errors) {
                            alert('There was an error with your request')
                        }
                    });
                }
            },
            deleteSelectedUsers() {
                if (confirm("Do you want to delete selected users?")) {
                    console.log(`deleting ${this.selected}`);
                    this.selected = [];
                    this.getUsers();
                }
            },
            makePagination(meta, links) {
                let pagination = {
                    current_page: meta.current_page,
                    last_page: meta.last_page,
                    next_page_url: links.next,
                    previous_page_url: links.prev,
                    from: meta.from,
                    to: meta.to,
                    total: meta.total
                }

                this.pagination = pagination;
            }
        },
        computed: {
            //add selected users to an array, remove if deselected
            selectedUsers: {
                get() {
                    return this.selected;
                },
                set(value) {
                    this.selected = value;
                }
            }
        }
    }
</script>

<style scoped>
    /* .table { 
        max-width: none;
        table-layout: fixed;
        word-wrap: break-word;
    } */
</style>