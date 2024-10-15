<template>
  <div class="grid grid-cols-1 gap-4">
    <div class="col-span-1">
      <BaseCard>
        <template #title>
          Liste des articles
        </template>

        <template #body>
          <div v-for="data in newList" :key="data.id">
            <NuxtLink :to="'/community/news/' + data.id + '/' + data.link_keyword">
              - {{ data.title }}
            </NuxtLink>
          </div>

          <BasePagination :number-of-pages="totalPage" class="float-right" />
        </template>
      </BaseCard>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Article } from '~/types'

definePageMeta({
  title: 'news-list'
})

const route = useRoute()

const newList = ref<Article[]>([])
const totalPage = ref(1)

const refresh = async () => {
  try {
    const page = route.query.page ? '?page=' + route.query.page : ''
    const data = await useApiFetch<{ listNews: Article[]; totalPage: number }>('community/news-list' + page)

    newList.value = data.listNews
    totalPage.value = data.totalPage
  } catch {
    showError({ statusCode: 404, statusMessage: 'Page Not Found' })
  }
}

refresh()

watch(() => route.query.page, async () => await refresh())
watch(() => route.params.search, async () => await refresh())
</script>
