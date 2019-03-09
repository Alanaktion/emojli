<template>
    <div>
        <h2 class="my-6">Timeline</h2>
        <div class="max-w-sm bg-white rounded shadow-lg mb-4"
            v-for="post in firstPosts" :key="post.id">
            <div class="px-6 py-4">
                <router-link class="block text-grey-darker text-xl mb-2 no-underline"
                    :to="`/posts/${post.id}`">
                    {{ post.title }}
                </router-link>
                <p class="text-base">
                    {{ post.body }}
                </p>
            </div>
        </div>
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
