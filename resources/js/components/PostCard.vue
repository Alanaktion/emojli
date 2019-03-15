<template>
    <div class="card post">
        <img class="avatar" :src="post.user.gravatar">
        <div class="flex-grow">
            <div class="post-meta">
                <router-link class="mr-1"
                    :to="`/users/${post.user.username}`">
                    {{ post.user.username }}
                </router-link>
                <router-link class="text-grey text-sm"
                    :to="`/posts/${post.id}`">
                    {{ post.created_at | fromNow }}
                </router-link>
                <button class="ml-auto" @click="deletePost"
                    v-if="$auth.user().username == post.user.username">
                    Delete
                </button>
            </div>
            <p class="text-base">
                <span class="whitespace-pre-wrap">{{ post.body }}</span>
            </p>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        post: Object,
    },
    filters: {
        fromNow(date) {
            return moment.utc(date).fromNow()
        },
    },
    methods: {
        deletePost() {
            let del = confirm('Are you sure you want to delete this post?')
            if (!del) {
                return
            }
            axios.post(`/posts/${this.post.id}`, { '_method': 'delete' })
                .then(() => {
                    if (this.$route.name == 'post') {
                        this.$router.push({
                            name: 'user',
                            params: {
                                username: this.post.user.username,
                            },
                        });
                    } else {
                        this.$parent.deletePost(this.post)
                    }
                })
        },
    },
    mounted() {
        // Force updates on recent posts to keep timestamps accurate
        if (moment.utc(this.post.created_at).add(2, 'h').isAfter(moment())) {
            this.interval = setInterval(() => this.$forceUpdate(), 5e3)
        }
    },
    beforeDestroy() {
        this.interval && clearInterval(this.interval)
    },
}
</script>
