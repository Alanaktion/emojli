<template>
    <nav class="navbar">
        <div class="container nav-container">
            <div class="flex items-center flex-no-shrink mr-6">
                <router-link to="/" class="nav-brand">
                    Emojli
                </router-link>
            </div>
            <div class="flex flex-grow">
                <router-link to="/" class="nav-link">
                    Home
                </router-link>
                <router-link to="/users" class="nav-link">
                    Users
                </router-link>
            </div>
            <div class="flex items-center" v-if="$auth.check()">
                <router-link :to="`/users/${$auth.user().username}`" class="nav-link">
                    {{ $auth.user().username }}
                </router-link>
                <div @click="post" class="btn btn-nav">
                    Post
                </div>
            </div>
            <div v-else-if="$auth.ready()">
                <router-link to="/login" class="nav-link">
                    Sign in
                </router-link>
                <router-link to="/register" class="btn btn-nav">
                    Join
                </router-link>
            </div>
            <div v-else class="btn btn-nav invisible" aria-hidden="true">
                Loading&hellip;
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    methods: {
        post() {
            this.$root.$refs.postModal.show()
        },
    },
}
</script>
