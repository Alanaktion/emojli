<template>
    <nav class="flex items-center justify-between flex-wrap bg-teal p-6">
        <div class="container mx-auto">
            <div class="flex items-center flex-no-shrink mr-6">
                <router-link to="/" class="font-semibold text-xl tracking-tight text-white no-underline">Emojli</router-link>
            </div>
            <div class="block lg:hidden">
                <button class="flex items-center px-3 py-2 border rounded text-teal-lighter border-teal-light hover:text-white hover:border-white">
                    <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <title>Menu</title>
                        <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                    </svg>
                </button>
            </div>
            <div class="w-full block flex-grow md:flex md:items-center md:w-auto">
                <div class="text-sm md:flex-grow">
                    <router-link to="/" class="block mt-4 md:inline-block md:mt-0 text-teal-lighter hover:text-white mr-4">
                        Home
                    </router-link>
                    <router-link to="/users" class="block mt-4 md:inline-block md:mt-0 text-teal-lighter hover:text-white mr-4">
                        Users
                    </router-link>
                </div>
                <div>
                    <a href="#" class="inline-block text-sm no-underline px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal hover:bg-white mt-4 md:mt-0">
                        Sign Up
                    </a>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    //
}
</script>
