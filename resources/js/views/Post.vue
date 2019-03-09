<template>
    <div>
        <div v-if="post && post.title">
            <h2>{{ post.title }}</h2>
            <p>{{ post.body }}</p>
            <p>{{ post.id }}</p>
        </div>
        <div v-else>
            <p>Loading post&hellip;</p>
        </div>
    </div>
</template>

<script>
export default {
    props: ['id'],
    metaInfo() {
        return {
            title: this.post && this.post.title,
        };
    },
    data() {
        return {
            post: null,
            endpoint: 'https://jsonplaceholder.typicode.com/posts/',
        }
    },
    methods: {
        getPost(id) {
            axios(this.endpoint + id)
                .then(response => {
                    this.post = response.data
                })
                .catch(error => {
                    console.error(error)
                })
        }
    },

    created() {
        this.getPost(this.id);
    },
    watch: {
        '$route'() {
            this.post = null;
            this.getPost(this.id);
        }
    }
}
</script>
