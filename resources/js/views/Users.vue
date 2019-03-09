<template>
    <div>
        <h2>Users</h2>
        <router-link class="block mt-4 text-teal-lighter hover:text-white"
            v-for="user in users" :key="user.id" :to="`/users/${user.username}`">
            {{ user.name }}
        </router-link>
    </div>
</template>

<script>
export default {
    data() {
        return {
            users: [],
            endpoint: 'https://jsonplaceholder.typicode.com/users',
        }
    },
    methods: {
        getUsers() {
            axios(this.endpoint)
                .then(response => {
                    this.users = response.data
                })
                .catch(error => {
                    console.error(error)
                })
        }
    },
    created() {
        this.getUsers();
    },
}
</script>
