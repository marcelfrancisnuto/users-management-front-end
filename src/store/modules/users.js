import axios from 'axios'

const state = {
    users: [],
    pagination: {},
    selectedItems: [],
    user: {},
    api_host: 'http://localhost:8000'
}

const getters = {
    allUsers: state => state.users,
    allPagination: state => state.pagination,
    selectedUsers: state => state.selectedUsers,
    
}

const actions = {
    async fetchUsers({ commit }, url) {
        url = url || `${state.api_host}/api/users`

        const response = await axios.get(url)
        
        //set pagination returned by laravel api
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
            axios.delete(`${state.api_host}/api/users/${id}`)
            .then(res => {
                if (res.data.message) {
                    alert('User has been deleted');
                    commit('removeUser', id)
                } else if (res.data.errors) {
                    alert('There was an error with your request')
                }
            })
        }
    },
    async addUser({ commit }, user) {
        console.log(user)
        const response = await axios.post(
            `${state.api_host}/users`,
            user
        )

        commit('newUser', response.data.data)
    }
}

const mutations = {
    setUsers: (state, users) => (state.users = users),
    setPagination: (state, pagination) => (state.pagination = pagination),
    setSelectedUsers: (state, selectedItems) => (state.selectedItems = selectedItems),
    removeUser: (state, id) => state.users = state.users.filter(user => user.id != id),
    newUser: (state, user) => (state.user = user)
}

export default {
    state,
    getters,
    actions,
    mutations
} 