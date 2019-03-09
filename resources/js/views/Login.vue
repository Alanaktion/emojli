<template>
    <div class="w-full max-w-xs mx-auto xl:mt-32">
        <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            @submit.prevent="login" method="post">
            <div class="mb-4">
                <label class="label" for="username">
                    Username
                </label>
                <input class="input-text" id="username" type="text" v-model="username" required>
            </div>
            <div class="mb-6">
                <label class="label" for="password">
                    Password
                </label>
                <input class="input-text" id="password" type="password" v-model="password" required>
            </div>
            <div class="flex items-center justify-between">
                <button type="submit" class="btn btn-primary">
                    Sign in
                </button>
                <a class="link-btn" href="#">
                    Forgot password?
                </a>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            username: null,
            password: null,
            error: false,
        }
    },
    methods: {
        login() {
            this.$auth.login({
                params: {
                    username: this.username,
                    password: this.password,
                },
                success: () => {},
                error: () => {},
                rememberMe: true,
                redirect: '/home',
                fetchUser: true,
            })
        },
    },
}
</script>
