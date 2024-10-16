<template>
<div class="grid grid-cols-1 gap-4 md:grid-cols-3">
    <div class="col-span-1 md:col-start-2">
        <BaseCard>
            <template #title>
                {{ room.caption || 'Aucun titre' }}
            </template>

            <template #body>
                <div class="flex gap-2">
                    <img :src="`${runtimeConfig.public.cdnUrl}/thumbnails/thumbnail_${roomId}.png`">
                    <div class="flex flex-col gap-2">
                        <div><b>Propriétaire: </b><NuxtLink :to="'/profil/' + room.owner">{{ room.owner }}</NuxtLink></div>
                        <div><b>Description: </b>{{ room.description || 'Aucune description' }}</div>
                    </div>
                </div>
            </template>
        </BaseCard>
    </div>
</div>
</template>

<script lang="ts" setup>
import type { Room } from '~/types'

definePageMeta({
  middleware: ({ params }) => {
    if (!/^\d+$/.test(params.id.toString())) { abortNavigation() }
  }
})

const route = useRoute()
const runtimeConfig = useRuntimeConfig()

const roomId = computed(() => route.params.id.toString())

const room = ref<Room>({ caption: '', owner: '', description: '' })

try {
  const data = await useApiFetch<{ room: Room }>('room/' + roomId.value)

  room.value = data.room
} catch {}

useHead({
  title: room.value.caption
})
</script>
