<template>
  <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
    <div class="col-span-full">
      <h1 class="photos__title">
        {{ $t('photos-communautaires.title') }}
      </h1>
    </div>
    <div v-for="data in photos" :key="data.photo" class="flex items-center justify-center col-span-1">
      <div class="photos" @click="photoSelected = data">
        <img :src="runtimeConfig.public.cdnUrl + '/photos/' + data.photo + '.png'" class="photos__background" onerror="style.display='none'">
        <div class="flex items-center photos__about">
          <div>
            <BaseAvatar :alt="'Photo de ' + data.username" :figure="data.look" headonly />
          </div>
          <div>
            <h5>
              <NuxtLink :to="'/profil/' + data.username" class="photos__link">
                {{ data.username }}
              </NuxtLink>
            </h5>
            <span>Il y a {{ filters.timeAgo(data.time) }}</span>
          </div>
        </div>
      </div>
    </div>
    <BaseModal :show="photoSelected !== null" @close="photoSelected = null">
      <div v-if="photoSelected" class="flex flex-col items-center">
        <img :src="runtimeConfig.public.cdnUrl + '/photos/' + photoSelected.photo + '.png'" class="photos__background" onerror="style.display='none'">
        <div class="flex items-center w-full text-white bg-black bg-opacity-60">
          <div>
            <BaseAvatar :alt="'Photo de ' + photoSelected.username" :figure="photoSelected.look" headonly />
          </div>
          <div>
            <h5>
              <NuxtLink :to="'/profil/' + photoSelected.username" class="photos__link">
                {{ photoSelected.username }}
              </NuxtLink>
            </h5>
            <span>Il y a {{ filters.timeAgo(photoSelected.time) }}</span>
          </div>
        </div>
      </div>
    </BaseModal>
    <div v-if="loading" class="col-span-1 my-2 text-center">
      <h1><i class="mr-2 fa fa-spinner fa-spin" /> Chargement</h1>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Photo } from '~/types'
import * as filters from '~/utils/filters'

definePageMeta({
  title: 'photos'
})

const runtimeConfig = useRuntimeConfig()

const photoSelected = ref<Photo | null>(null)
const photos = ref<Photo[]>([])
const loading = ref(false)
const pageId = ref(2)
const photosEnd = ref(false)

try {
  const data = await useApiFetch<{ photos: Photo[] }>('community/photos')

  photos.value = data.photos
} catch {}

onMounted(() => {
  window.onscroll = async () => {
    const bottomOfWindow = Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop) + window.innerHeight === document.documentElement.offsetHeight

    if (bottomOfWindow) {
      await loadPhotos()
    }
  }
})

onBeforeUnmount(() => {
  window.onscroll = null
})

const loadPhotos = async () => {
  if (loading.value) {
    return
  }

  if (photosEnd.value) {
    return
  }

  try {
    loading.value = true

    const data = (await useApiFetch<{ photos: Photo[] }>('community/photos?page=' + pageId)).photos

    if (!data.length) {
      loading.value = false
      photosEnd.value = true
      return
    }

    pageId.value++

    photos.value.push(...data)
  } catch {}

  loading.value = false
}
</script>

<style lang="scss">
.photos {
    display: block;
    cursor: pointer;
    position: relative;
    background-color: var(--primary-color);
    widows: 100%;
    height: auto;
    border-radius: 5px;
    overflow: hidden;
    margin-bottom: 10px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
    width: 275px;
    height: 275px;

    &:hover {
        .photos__about {
            opacity: 100 !important;
        }
    }

    &__title {
        font-size: 1.8rem;
        text-transform: uppercase;
    }

    &__background {
        width: 100%;
        height: auto;
    }

    &__view {
        display: inline-block;
        position: absolute;
        top: 10px;
        right: 10px;
        border-radius: 5px;
        background-color: rgba(0, 0, 0, 0.6);
        font-weight: bold;
        padding: 10px;
    }

    &__link {
        color: #fff;

        &:hover {
            color: rgba(255, 255, 255, 0.75);
        }
    }

    &__about {
        position: absolute;
        transition: opacity 0.4s;
        opacity: 0;
        width: 100%;
        height: auto;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.5);
        padding: 2px;
        color: #fff;
    }
}
</style>
