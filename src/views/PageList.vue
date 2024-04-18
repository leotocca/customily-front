<template>
  <main class="w-full min-h-screen flex justify-center items-center bg-slate-100">
    <div class="w-1/2">
      <h1 class="prose prose-2xl text-left font-bold">Page list</h1>

      <!-- SEARCHBOX -->
      <div class="w-full flex justify-end mt-5">
        <input
          v-model="searchInput"
          type="text"
          placeholder="Search for a page"
          class="rounded border border-gray-400 shadow-xs"
        />
      </div>

      <!-- PAGELIST -->
      <div class="w-full mt-5">
        <div v-for="(page, index) in pages" :key="`page-${index}`">
          <div
            class="border border-gray-400/60 rounded-md py-6 px-4 flex justify-between items-center my-2"
          >
            <p>{{ page.title }}</p>
            <RouterLink
              to="/images"
              class="text-center bg-blue-600 border border-blue-800 text-white hover:text-blue-600/80 hover:bg-white transition-all duration-200 w-64 py-2 rounded-md font-semibold"
            >
              Open
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import AxiosInstance from '../services/axios.js'
import { RouterLink } from 'vue-router'
import type { Page } from '../types/index'

const pages = ref<Page[]>()
const searchInput = ref<string>('')

async function getPages() {
  try {
    const { data } = await AxiosInstance.get('/pages')
    pages.value = data
  } catch (e) {
    console.error(e)
  }
}

onMounted(() => {
  getPages()
})
</script>
