import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Images } from '../types/index'

export const imagesStore = defineStore('images', () => {
  const images = ref<Images>([])

  function setImages(receivedImages: Images) {
    console.log({ receivedImages })
    images.value = receivedImages
  }

  return { setImages, images }
})
