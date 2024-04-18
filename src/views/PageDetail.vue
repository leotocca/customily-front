<template>
  <main class="w-full min-h-screen bg-slate-100 flex items-center">
    <div class="mx-auto w-1/3 flex flex-col justify-center items-center">
      <h1 class="w-full prose prose-2xl font-bold text-left mb-16">Page detail view test</h1>
      <div class="flex justify-center items-center">
        <div class="mr-10 bg-red">
          <canvas ref="canvas"></canvas>
        </div>
        <div class="flex flex-col">
          <template v-for="(image, index) in store.images" :key="`image-button-${index}`">
            <button
              class="text-center bg-blue-600 border border-blue-800 text-white hover:text-blue-600/80 hover:bg-white transition-all duration-200 w-64 py-2 rounded-md font-semibold my-2"
              @click="handleUpload(index)"
            >
              Load {{ image.X }}x{{ image.Y }}
            </button>
          </template>
        </div>
      </div>
    </div>
  </main>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'

import { imagesStore } from '../stores/images'

const store = imagesStore()

interface Offset {
  X: number
  Y: number
}

const canvas = ref(null)
const images = ref<any[]>([])
const offsets = ref<Offset[]>([...store.images])

function drawImagesWithOffsets(): void {
  const ctx = canvas.value?.getContext('2d')
  if (!ctx) {
    throw new Error('Canvas context could not be retrieved.')
  }

  if (!canvas.value) return

  canvas.value.width = 500
  canvas.value.height = 500

  for (let i = 0; i < images.value.length; i++) {
    const img = images.value[i]
    const offset = offsets.value[i]
    ctx.drawImage(img, offset.X, offset.Y, 150, 150)
  }
}

function handleUpload(index: number): void {
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = 'image/*'

  input.addEventListener('change', (event) => {
    const file = (event.target as HTMLInputElement).files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const img = new Image()
        img.onload = () => {
          images.value[index] = img
          drawImagesWithOffsets()
        }
        img.src = e.target?.result as string
      }
      reader.readAsDataURL(file)
    }
  })

  input.click()
}

onMounted(() => {
  drawImagesWithOffsets()
})
</script>
