<template>
    <div class="card flex">
        <img class="w-10 h-10 rounded-full mr-4" :src="post.user.gravatar">
        <div class="flex-grow">
            <div class="mb-2">
                <router-link class="text-grey-darkest text-lg no-underline mr-1"
                    :to="`/users/${post.user.username}`">
                    {{ post.user.username }}
                </router-link>
                <router-link class="text-grey text-sm no-underline"
                    :to="`/posts/${post.id}`">
                    {{ post.created_at | fromNow }}
                </router-link>
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
            return moment.utc(date).fromNow();
        },
    },
    mounted() {
        // Force updates on recent posts to keep timestamps accurate
        if (moment.utc(this.post.created_at).add(2, 'h').isAfter(moment())) {
            this.interval = setInterval(() => this.$forceUpdate(), 5e3);
        }
    },
    beforeDestroy() {
        this.interval && clearInterval(this.interval);
    },
}
</script>
