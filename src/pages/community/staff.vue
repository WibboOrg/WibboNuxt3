<template>
  <div>
    <div v-for="cate in category" :id="filters.toHash(cate.name)" :key="cate.id" class="grid grid-cols-1 gap-4">
      <BaseCard class="mb-2" hidden-background>
        <template #title>
          {{ cate.name }}
        </template>
        <template #body>
          <div class="grid grid-cols-2 gap-2 2xl:grid-cols-9 xl:grid-cols-7 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3">
            <NuxtLink
              v-for="staff in getStaffByRank(cate.id)"
              :key="staff.id"
              :to="'/profil/' + staff.username"
              class="relative flex flex-col items-center justify-center h-auto gap-4 p-4 mb-2 bg-black rounded-md w-30 group bg-opacity-40 hover:bg-opacity-20"
            >
              <h5 class="font-bold">
                {{ staff.username }}
              </h5>

              <div class="relative w-16 h-16">
                <div class="relative w-16 h-16 overflow-hidden transition-shadow rounded-full ring-offset-4 ring-2 ring-offset-gray-900 ring-white">
                  <BaseAvatar :figure="staff.look" :head-direction="3" gesture="sml" class="absolute z-10 -translate-x-1/2 pointer-events-none -top-4 left-1/2" />
                  <span class="absolute inline-flex w-full h-full bg-gray-600 rounded-full" />
                </div>
                <div
                  class="absolute bottom-0 right-0 w-4 h-4 rounded-full shadow-inner[-2px_-2px_rgba(0,0,0,0.3)] z-10"
                  :class="staff.online === 1 ? 'bg-green-700' : 'bg-red-700'"
                />
              </div>
              <div class="text-sm text-center text-gray-200 break-words">
                {{ staff.function }}
              </div>
            </NuxtLink>
          </div>
        </template>
      </BaseCard>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Staff } from '~/types'
import * as filters from '~/utils/filters'

definePageMeta({
  title: 'staff'
})

const category = ref([
  { id: 6, name: 'Administration' },
  { id: 7, name: 'Communication et Organisation' },
  { id: 9, name: 'Évènement' },
  { id: 8, name: 'Animation' },
  { id: 3, name: 'Modération' },
  { id: 2, name: 'Assistance' },
  { id: 1, name: 'Créations architecturales & technologiques' },
  { id: 4, name: 'Créations artistiques et visuelles' },
  { id: 5, name: 'Casino' }
])

const staffs = ref<Staff[]>([])

try {
  const data = await useApiFetch<{ staff: Staff[] }>('community/staff')

  staffs.value = data.staff
} catch (e) {}

onMounted(() => {
  category.value = category.value.filter(box => haveStaff(box.id))
})

const getStaffByRank = (id: number) => staffs.value.filter(staff => staff.rank === id)

const haveStaff = (id: number) => getStaffByRank(id).length > 0
</script>
