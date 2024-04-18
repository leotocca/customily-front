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
        <template v-if="filteredPages.length">
          <div v-for="(page, index) in filteredPages" :key="`page-${index}`">
            <div
              class="border border-gray-400/60 rounded-md py-6 px-4 flex justify-between items-center my-2"
            >
              <p>{{ page.title }}</p>
              <button
                @click="handlePageSelection(page)"
                class="text-center bg-blue-600 border border-blue-800 text-white hover:text-blue-600/80 hover:bg-white transition-all duration-200 w-64 py-2 rounded-md font-semibold"
              >
                Open
              </button>
            </div>
          </div>
        </template>
        <template v-else>
          <div
            class="border border-gray-400/60 rounded-md py-6 px-4 flex justify-between items-center my-2"
          >
            No results for your search
          </div>
        </template>
      </div>
    </div>
  </main>
</template>
<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import AxiosInstance from '../services/axios.js'
import type { Page } from '../types/index'
import { imagesStore } from '../stores/images'

const router = useRouter()
const store = imagesStore()
const pages = ref<Page[]>([])
const searchInput = ref<string>('')

async function getPages() {
  try {
    const { data } = await AxiosInstance.get('/pages')
    pages.value = data
  } catch (e) {
    console.error(e)
  }
}

const filteredPages = computed(() => {
  if (searchInput.value !== '') {
    return pages.value?.filter((page) => {
      return page.title.toLowerCase().includes(searchInput.value.toLowerCase())
    })
  } else {
    return pages.value
  }
})

function handlePageSelection(page: Page) {
  store.setImages(page.images)
  router.push({ name: 'images' })
}

onMounted(() => {
  getPages()
})
</script>
