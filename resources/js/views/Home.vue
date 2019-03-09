<template>
    <div>
        <h2>Home</h2>
        <router-link class="block mt-4 text-teal-lighter hover:text-white"
                v-for="post in firstPosts" :key="post.id" :to="`/posts/${post.id}`">
            {{ post.title }}
        </router-link>
    </div>
</template>

<script>
export default {
    data() {
        return {
            posts: [],
            endpoint: 'https://jsonplaceholder.typicode.com/posts',
        }
    },
    computed: {
        firstPosts() {
            return _.slice(this.posts, 0, 25)
        },
    },
    methods: {
        getPosts() {
            axios(this.endpoint)
                .then(response => {
                    this.posts = response.data
                })
                .catch(error => {
                    console.error(error)
                })
        }
    },
    created() {
        this.getPosts()
    },
}
</script>
