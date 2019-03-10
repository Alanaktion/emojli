<template>
    <div>
        <template v-if="user !== null && page">
            <div class="flex items-center justify-between mb-6">
                <div>
                    <h1 class="mb-2">{{ user.username }}</h1>
                    <p>Joined {{ user.created_at | fromNow }}</p>
                </div>
                <div v-if="$auth.user().username == user.username">
                    <button type="button" @click="$auth.logout({ redirect: '/' })" class="btn btn-secondary">
                        Log out
                    </button>
                </div>
                <div v-else-if="$auth.check()">
                    <button type="button" @click="follow" class="btn btn-primary" v-if="!user.following">
                        Follow
                    </button>
                    <button type="button" @click="unfollow" class="btn btn-secondary" v-else>
                        Unfollow
                    </button>
                </div>
            </div>

            <post-card class="mb-4"
                v-for="post in posts" :key="post.id" :post="post"
            ></post-card>
        </template>
        <template v-else>
            <!-- Loading -->
        </template>
    </div>
</template>

<script>
export default {
    props: ['username'],
    metaInfo() {
        return {
            username: this.user && this.user.username,
        };
    },
    data() {
        return {
            user: null,
            endpoint: '/users/',
            posts: [],
            page: 0,
            nextPage: null,
        }
    },
    filters: {
        fromNow(date) {
            return moment.utc(date).fromNow()
        },
    },
    methods: {
        getUser(username) {
            this.user = null
            axios(this.endpoint + encodeURI(username))
                .then(response => {
                    this.user = response.data
                })
                .catch(error => {
                    console.error(error)
                })
        },
        getPosts(username) {
            this.posts = []
            this.page = 0
            this.nextPage = null
            axios(this.endpoint + encodeURI(username) + '/posts')
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
        follow() {
            axios.post(this.endpoint + encodeURI(this.username) + '/follow')
                .then(() => {
                    this.user.following = true
                })
        },
        unfollow() {
            axios.post(this.endpoint + encodeURI(this.username) + '/unfollow')
                .then(() => {
                    this.user.following = false
                })
        },
    },
    created() {
        this.getUser(this.username)
        this.getPosts(this.username)
    },
    watch: {
        '$route'() {
            this.getUser(this.username)
            this.getPosts(this.username)
        }
    }
}
</script>
