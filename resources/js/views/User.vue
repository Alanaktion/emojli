<template>
    <div>
        <div v-if="user && user.name">
            <h1>{{ user.name }}</h1>
            <p>{{ user.username }}</p>
            <p>{{ user.email }}</p>
        </div>
        <div v-else>
            <h1>Loading user&hellip;</h1>
        </div>
    </div>
</template>

<script>
export default {
    props: ['username'],
    metaInfo() {
        return {
            name: this.user && this.user.name,
        };
    },
    data() {
        return {
            user: null,
            endpoint: 'https://jsonplaceholder.typicode.com/users/',
        }
    },
    methods: {
        getUser(username) {
            axios(this.endpoint + '?username=' + encodeURIComponent(username))
                .then(response => {
                    this.user = _.first(response.data)
                })
                .catch(error => {
                    console.error(error)
                })
        }
    },

    created() {
        this.getUser(this.username);
    },
    watch: {
        '$route'() {
            this.user = null;
            this.getUser(this.username);
        }
    }
}
</script>
