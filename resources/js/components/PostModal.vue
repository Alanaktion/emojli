<template>
    <div class="fixed pin" v-show="visible" @keyup.esc="hide">
        <div class="absolute pin bg-black opacity-50" @click="hide"></div>
        <div class="max-w-sm mx-auto mt-12 relative z-10">
            <form class="card border-0 shadow-lg py-5" @submit.prevent="post" method="post">
                <div class="mb-4">
                    <label class="label" for="body">
                        Write a post
                    </label>
                    <textarea class="input-text" id="body" type="text" required
                        ref="input" v-model="body"
                    ></textarea>
                </div>
                <button type="submit" class="btn btn-primary">
                    Post
                </button>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            visible: false,
            body: '',
            endpoint: '/posts',
        }
    },
    methods: {
        post() {
            axios.post(this.endpoint, {
                    body: this.body,
                })
                .then(response => {
                    // Inject post into current page when necessary
                    if (
                        this.$route.name === 'home' ||
                        (
                            this.$route.name === 'user' &&
                            this.$route.params.username === this.$auth.user().username
                        )
                    ) {
                        this.$root.$refs.view.addPost(response.data)
                    }

                    // TODO: show confirmation that post was created

                    this.hide()
                })
                .catch(error => {
                    console.error(error)
                })
        },
        show() {
            this.visible = true
            this.$nextTick(() => {
                this.$refs.input.focus()
            })
        },
        hide() {
            this.visible = false
        },
    },
}
</script>
