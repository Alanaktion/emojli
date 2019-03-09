<template>
    <div>
        <h2 class="my-6">Users</h2>
        <div class="flex items-center relative mb-4" v-for="user in users" :key="user.id">
            <img class="w-10 h-10 rounded-full mr-4" :src="user.gravatar">
            <router-link class="text-grey-darkest no-underline stretched-link"
                :to="`/users/${user.username}`">
                {{ user.username }}
            </router-link>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            users: [],
            endpoint: '/users',
        }
    },
    methods: {
        getUsers() {
            axios(this.endpoint)
                .then(response => {
                    this.users = response.data.data
                })
                .catch(error => {
                    console.error(error)
                })
        },
    },
    created() {
        this.getUsers()
    },
}
</script>
