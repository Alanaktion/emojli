<template>
    <div class="w-full max-w-xs mx-auto md:mt-24">
        <div class="alert alert-error" v-if="error && !success" role="alert">
            There was an error, unable to complete registration.
        </div>

        <form class="card p-8" @submit.prevent="register" method="post">
            <div class="mb-4">
                <label class="label" for="email">
                    E-mail
                </label>
                <input class="input-text" :class="{'border-red': error.email}"
                    id="email" type="email" v-model="email" required>
                <div class="text-red-dark" v-if="error && errors.email">
                    {{ errors.email }}
                </div>
            </div>
            <div class="mb-4">
                <label class="label" for="username">
                    Username
                </label>
                <input class="input-text" :class="{'border-red': error.username}"
                    id="username" type="text" v-model="username" required>
                <p class="mt-3 text-xs italic">Must be emoji.</p>
                <div class="text-red-dark" v-if="error && errors.username">
                    {{ errors.username }}
                </div>
            </div>
            <div class="mb-6">
                <label class="label" for="password">
                    Password
                </label>
                <input class="input-text" :class="{'border-red': error.password}"
                    id="password" type="password" v-model="password" required>
                <div class="text-red-dark" v-if="error && errors.password">
                    {{ errors.password }}
                </div>
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
    watch: {
        username(newVal) {
            let outVal = ''
            let match
            const regex = emojiRegex()
            while (match = regex.exec(newVal)) {
                outVal += match[0]
            }
            this.body = outVal
        },
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
