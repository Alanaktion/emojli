require('./bootstrap');

const VueRouter = require('vue-router').default;
const VueAxios = require('vue-axios');

window.Vue = require('vue');
Vue.use(VueRouter);
Vue.use(VueAxios, axios);

// Set up router
const router = new VueRouter({
    routes: [
        {
            path: '/',
            name: 'index',
            component: require('./views/Index.vue').default,
            meta: {
                auth: false,
                authRedirect: '/home',
            },
        },
        {
            path: '/home',
            name: 'home',
            component: require('./views/Home.vue').default,
            meta: {
                auth: true,
            },
        },
        {
            path: '/login',
            name: 'login',
            component: require('./views/Login.vue').default,
            meta: {
                auth: false,
            },
        },
        {
            path: '/register',
            name: 'register',
            component: require('./views/Register.vue').default,
            meta: {
                auth: false,
            },
        },
        {
            path: '/posts/:id',
            name: 'post',
            component: require('./views/Post.vue').default,
            props: true,
        },
        {
            path: '/users',
            name: 'users',
            component: require('./views/Users.vue').default,
        },
        {
            path: '/users/:username',
            name: 'user',
            component: require('./views/User.vue').default,
            props: true,
        },
        {
            path: '*',
            name: '404',
            component: require('./views/Error404.vue').default,
        },
    ],
    mode: 'history'
});

// Auto-load Vue components
const files = require.context('./', true, /\.vue$/i);
files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default));

// Initialize Vue auth
Vue.router = router;
Vue.use(require('@websanova/vue-auth'), {
    auth: require('@websanova/vue-auth/drivers/auth/bearer.js'),
    http: require('@websanova/vue-auth/drivers/http/axios.1.x.js'),
    router: require('@websanova/vue-auth/drivers/router/vue-router.2.x.js'),
    notFoundRedirect: { name: 'home' },
});

// Initialize app
const app = new Vue({
    el: '#app',
    router,
});
