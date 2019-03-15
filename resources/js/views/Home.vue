<template>
    <div>
        <h2 class="my-6">Home</h2>
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
            page: 0,
            nextPage: null,
        }
    },
    methods: {
        getPosts() {
            axios(this.endpoint)
                .then(response => {
                    let { data } = response
                    this.posts = data.data
                    this.page = data.current_page
                    this.nextPage = data.next_page_url
                })
                .catch(error => {
                    console.error(error)
                })
        },
        addPost(post) {
            this.posts.unshift(post)
        },
        deletePost(post) {
            this.posts.splice(_.findIndex(this.posts, p => (p.id == post.id)), 1)
        },
    },
    created() {
        this.getPosts()
    },
}
</script>
