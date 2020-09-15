<template>
    <div>
        <table class="table table-responsive table-striped highlight z-depth-1 hoverable">
            <thead>
                <tr>
                    <th>Select</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Address</th>
                    <th>Postal Code</th>
                    <th>Phone Number</th>
                    <th>Email</th>
                    <th>Username</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="user in users" :key="user.id">
                    <td><b-form-checkbox v-model="selectedUsers" :id="user.username" :value="user.id"></b-form-checkbox></td>
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
                        <a href="#" @click.prevent="deleteUser(user.id)"><b-icon variant="primary" icon="trash"></b-icon></a>
                    </td>
                </tr>
            </tbody>
        </table>

        <nav aria-label="users-pagination">
            <ul class="pagination">
                <li v-bind:class="[{disabled: !pagination.previous_page_url}]" class="page-item">
                    <a class="page-link" href="#" @click="getUsers(pagination.previous_page_url)">Previous</a>
                <li v-bind:class="[{disabled: !pagination.next_page_url}]" class="page-item">
                    <a class="page-link" href="#" @click="getUsers(pagination.next_page_url)">Next</a>
                </li>
            </ul>
        </nav>
        <b-button variant="danger" @click="deleteSelectedUsers()" v-bind:class="[{disabled: selected.length == 0}]" :disabled="selected.length == 0">Delete selected</b-button>
    </div>
</template>

<script>

    import axios from 'axios'

    export default {
        data() {
            return {
                users: [],
                pagination: {},
                selected: []
            }
        },
        created() {
            this.getUsers();
        },
        methods: {
            async getUsers(url) {
                let vm = this;
                url = url || 'http://localhost:8000/api/users';
                axios.get(url)
                .then(res => { 
                    this.users = res.data.data;

                    vm.makePagination(res.data.meta, res.data.links);
                })
                .catch(err => console.log(err))
            },
            deleteUser(id) {
                if (confirm("Do you want to delete this user?")) {
                console.log(`deleting ${id}`);

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
            },
            selectItems(e) {
                console.log(e);
            }
        },
        computed: {
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
    .table { 
        max-width: none;
        table-layout: fixed;
        word-wrap: break-word;
    }
</style>