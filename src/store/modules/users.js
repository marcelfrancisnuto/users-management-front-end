import axios from 'axios'

const state = {
    users: [
        {
            id: 1,
            username: "admin",
            first_name: "John",
            last_name: "Petrucci",
            address: "504 Metropolis",
            postal_code: "4025",
            phone_number: "1234-5678",
            email: "admin@gmail.com",
            email_verified_at: "2020-09-15T16:50:37.000000Z",
            role: "Administrator",
            created_at: "2020-09-15T16:50:37.000000Z",
            updated_at: "2020-09-15T16:50:37.000000Z"
        },
        {
            id: 2,
            username: "jameslabrie",
            first_name: "James",
            last_name: "Labrie",
            address: "1120 Victoria St.",
            postal_code: "4550",
            phone_number: "432-43356",
            email: "jameslabrie@yopmail.com",
            email_verified_at: "2020-09-15T16:50:37.000000Z",
            role: "Standard",
            created_at: "2020-09-15T16:50:37.000000Z",
            updated_at: "2020-09-15T16:50:37.000000Z"
        }
    ],
    pagination: {}
}

const getters = {
    allUsers: state => state.users,
    allPagination: state => state.pagination
}

const actions = {
    async fetchUsers({ commit }, url) {
        url = url || 'http://localhost:8000/api/users'
        const response = await axios.get(url)
        let pagination = {
            current_page: response.data.meta.current_page,
            last_page: response.data.meta.last_page,
            next_page_url: response.data.links.next,
            previous_page_url: response.data.links.prev,
            from: response.data.meta.from,
            to: response.data.meta.to,
            total: response.data.meta.total
        }

        commit('setUsers', response.data.data)
        commit('setPagination', pagination)
    },
    async deleteUser({commit}, id) {
        if (confirm('Are you sure you want to delete this user?')) {
            axios.delete(`http://localhost:8000/api/users/${id}`)
            .then(res => {
                if (res.data.message) {
                    alert('User has been deleted');
                    //reload list of users
                    commit('removeUser', id); 
                } else if (res.data.errors) {
                    alert('There was an error with your request')
                }
            });
        }
    }
}

const mutations = {
    setUsers: (state, users) => (state.users = users),
    setPagination: (state, pagination) => (state.pagination = pagination),
    removeUser: (state, id) => state.users = state.users.filter(user => user.id != id)
}

export default {
    state,
    getters,
    actions,
    mutations
} 