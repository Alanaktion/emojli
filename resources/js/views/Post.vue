<template>
    <div>
        <post-card class="mt-6" :post="post" v-if="post !== null"></post-card>
        <template v-else>
            <!-- Loading -->
        </template>
    </div>
</template>

<script>
export default {
    props: ['id'],
    metaInfo() {
        return {
            body: this.post && this.post.body,
        };
    },
    data() {
        return {
            post: null,
            endpoint: '/posts/',
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
