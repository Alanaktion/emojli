<template>
    <div>
        <h1 class="my-6">Emojli</h1>
        <p class="mb-4">Sign up to join a weird social network!</p>
        <router-link class="btn btn-primary btn-lg" to="/register">
            Join Emojli
        </router-link>

        <h2 class="mt-10 mb-4">Recent posts</h2>
        <post-card class="mb-4"
            v-for="post in posts" :key="post.id" :post="post"
        ></post-card>
    </div>
</template>

<script>
export default {
    data() {
        return {
            posts: [],
            endpoint: '/posts',
        }
    },
    methods: {
        getPosts() {
            axios(this.endpoint)
                .then(response => {
                    this.posts = response.data.data
                })
                .catch(error => {
                    console.error(error)
                })
        },
    },
    created() {
        this.getPosts()
    },
}
</script>
