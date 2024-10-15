<template>
  <BaseCard>
    <template #body>
      <table class="w-full mb-2 text-left table-auto">
        <tbody>
          <tr>
            <th scope="col">
              Sujet / Auteur
            </th>
            <th scope="col">
              Dernier commentaire
            </th>
            <th scope="col">
              Réponses
            </th>
            <th scope="col">
              Vu
            </th>
          </tr>

          <tr v-for="data in allPost" :key="data.id" class="even:bg-black even:bg-opacity-10">
            <td class="p-2">
              <NuxtLink :to="'/forum/sujet/' + data.id" class="font-weight-bold">
                <b v-if="data.type == 2 && data.id != 0">[ÉPINGLÉ] {{ data.title }}</b>
                <span v-else> <span v-if="data.statut == 1">[FERMÉ]</span> {{ data.title }} </span>
              </NuxtLink>
              <div>
                Crée par <NuxtLink :to="'/profil/' + data.author">
                  {{ data.author }}
                </NuxtLink>, le {{ filters.formatDate(data.date) }}
              </div>
            </td>
            <td class="p-2">
              Il y a {{ filters.timeAgo(data.lastpost_date) }}<br>
              par: <NuxtLink :to="'/profil/' + data.lastpost_author">
                {{ data.lastpost_author }}
              </NuxtLink>
            </td>
            <td class="p-2">
              {{ data.posts }}
            </td>
            <td class="p-2">
              {{ data.views }}
            </td>
          </tr>
        </tbody>
      </table>
      <BasePagination :number-of-pages="totalPage" class="float-right" />
    </template>
  </BaseCard>
</template>

<script lang="ts" setup>
import type { Post } from '~/types'
import * as filters from '~/utils/filters'

definePageMeta({
  middleware: ({ params }) => {
    if (!/^\d+$/.test(params.id.toString())) { abortNavigation() }
  }
})

const route = useRoute()

const post = ref<Post[]>([])
const postPin = ref<Post[]>([])
const totalPage = ref(1)

const allPost = computed(() => [...postPin.value, ...post.value])

const refresh = async () => {
  try {
    const page = route.query.page ? '?page=' + route.query.page : ''
    const search = route.query.search ? 'search=' + route.query.search : ''
    const data = await useApiFetch<{ post: Post[]; postPin: Post[]; totalPage: number }>('forum/category/' + route.params.id + page + (search ? (page ? '&' : '?') + search : ''))

    post.value = data.post
    postPin.value = data.postPin
    totalPage.value = data.totalPage
  } catch {
    showError({ statusCode: 404, statusMessage: 'Page Not Found' })
  }
}

refresh()

watch(() => route.query.page, async () => await refresh())
watch(() => route.params.search, async () => await refresh())
</script>
