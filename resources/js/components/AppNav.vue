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
                <div class="text-teal-lightest mr-4">
                    {{ $auth.user().username }}
                </div>
                <div @click.prevent="$auth.logout()" class="nav-btn">
                    Log out
                </div>
            </div>
            <div v-else>
                <router-link to="/login" class="nav-link">
                    Sign in
                </router-link>
                <router-link to="/register" class="nav-btn">
                    Join
                </router-link>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    //
}
</script>
