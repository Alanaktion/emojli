<template>
    <div class="w-full max-w-xs mx-auto xl:mt-32">
        <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            @submit.prevent="register" method="post">
            <div class="mb-4">
                <label class="label" for="email">
                    E-mail
                </label>
                <input class="input-text" id="email" type="email" v-model="email" required>
            </div>
            <div class="mb-4">
                <label class="label" for="username">
                    Username
                </label>
                <input class="input-text" id="username" type="text" v-model="username" required>
                <p class="mt-3 text-xs italic">Must be emoji.</p>
            </div>
            <div class="mb-6">
                <label class="label" for="password">
                    Password
                </label>
                <input class="input-text" id="password" type="password" v-model="password" required>
            </div>
            <div class="flex items-center justify-between">
                <button type="submit" class="btn btn-primary">
                    Register
                </button>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            username: '',
            email: '',
            password: '',
            error: false,
            errors: {},
            success: false,
        };
    },
    methods: {
        register(){
            this.$auth.register({
                data: {
                    username: this.username,
                    email: this.email,
                    password: this.password,
                },
                success: () => {
                    this.success = true
                },
                error: (resp) => {
                    this.error = true
                    this.errors = resp.response.data.errors
                },
                autoLogin: true,
                rememberMe: true,
                redirect: '/home',
            });
        }
    },
}
</script>
