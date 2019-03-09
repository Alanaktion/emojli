require('./bootstrap');

const Router = require('vue-router').default;

window.Vue = require('vue');

// Configure Vue, defining routes
Vue.use(Router);
const router = new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: require('./views/Home.vue').default,
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
            // TODO: configure server to serve 404s correctly
            // https://router.vuejs.org/guide/essentials/history-mode.html
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

// Initialize app
const app = new Vue({
    el: '#app',
    router,
});
