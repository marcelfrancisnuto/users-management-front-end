import axios from 'axios'

const state = {
    users: [],
    pagination: {},
    user: {},
    api_host: 'http://localhost:8000',
    update: false
}

const getters = {
    allUsers: state => state.users,
    allPagination: state => state.pagination,
    selectedUser: state => state.user,
    updateToggle: state => state.update
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
            `${state.api_host}/api/users`,
            user
        )

        if (response.data.success) {
            alert('User has been created')
            commit('newUser', response.data.data)
        }
    },
    async batchDeleteUsers({commit}, users) {
        if (confirm('Are you sure you want to delete these users?')) {
            let ids = []

            users.forEach(user => ids.push(user.id))

            axios.delete(`${state.api_host}/api/users/${ids.join(',')}`)
                .then(res => {
                    if (res.data.success) {
                        users.forEach(user => {
                            commit('removeUser', user.id)
                        })
                    } else {
                        console.log(res.data.error)
                    }
                })
        }
    },
    selectUser({ commit }, user) {
        commit('setSelectedUser', user)
        commit('toggleUpdate', true)
    },
    cancelUpdate({commit}) {
        commit('toggleUpdate', false)
    }
}

const mutations = {
    setUsers: (state, users) => (state.users = users),
    setPagination: (state, pagination) => (state.pagination = pagination),
    newUser: (state, user) => state.users.unshift(user),
    removeUser: (state, id) => state.users = state.users.filter(user => user.id != id),
    setSelectedUser: (state, user) => (state.user = user),
    toggleUpdate: (state, update) => (state.update = update)
}

export default {
    state,
    getters,
    actions,
    mutations
} 