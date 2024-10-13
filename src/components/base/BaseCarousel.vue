<template>
  <div class="carousel">
    <span class="carousel__arrow carousel__arrow-left" @click="back"><i class="fas fa-chevron-left" /></span>
    <span class="carousel__arrow carousel__arrow-right" @click="next"><i class="fas fa-chevron-right" /></span>

    <div v-for="(article, index) in articles" :key="'article_' + article.id" class="carousel__item" :class="{ active: index == selectedId }">
      <img :src="article.topstory_image" class="carousel__img-blur">
      <NuxtLink :to="'/community/news/' + article.id + '/' + article.link_keyword">
        <div class="z-10 carousel__container max-w-[759px]">
          <div class="carousel__bullets">
            <div v-for="(data, bulletIndex) in articles" :key="'bullets_' + bulletIndex" class="carousel__bullets-link" :class="{ active: bulletIndex == selectedId }" @click.prevent="selectArticle(bulletIndex)" />
          </div>
          <img :src="article.topstory_image" class="carousel__img">
          <div class="carousel__content">
            <h1 class="carousel__title">
              {{ article.title }}
            </h1>
            <p class="carousel__snippet">
              {{ article.snippet }}
            </p>
          </div>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Article } from '~/types'

const props = defineProps({
  articles: { type: Array<Article>, default: [], required: true }
})

const selectedId = ref(0)
const internalId = ref(0)

onMounted(() => {
  if (!props.articles) { return }

  selectArticle(0)
})

onBeforeUnmount(() => {
  if (internalId.value) { clearInterval(internalId.value) }
})

const next = () => {
  if (selectedId.value >= props.articles.length - 1) { selectedId.value = 0 } else { selectedId.value++ }

  resetTimer()
}

const back = () => {
  if (selectedId.value <= 0) { selectedId.value = props.articles.length - 1 } else { selectedId.value-- }

  resetTimer()
}

const selectArticle = (index: number) => {
  selectedId.value = index

  resetTimer()
}

const resetTimer = () => {
  if (internalId.value) { clearInterval(internalId.value) }

  internalId.value = window.setInterval(() => next(), 6000)
}
</script>

<style lang="scss">
.carousel {
    @apply relative h-full overflow-hidden rounded-lg mx-auto bg-black bg-opacity-40;

    &__item {
        @apply absolute w-full h-full z-10 opacity-0 transition-opacity duration-700;

        &.active {
            @apply z-20 opacity-100;
        }
    }

    &__arrow {
        @apply absolute z-30 top-2/4 text-5xl transform -translate-y-1/2 transition-opacity duration-300 opacity-60 text-white cursor-pointer p-10;

        &:hover {
            @apply opacity-100;
        }
    }

    &__arrow-left {
        @apply left-0;
    }

    &__arrow-right {
        @apply right-0;
    }

    &__bullets {
        @apply absolute top-6 left-6 z-30 flex;
    }

    &__bullets-link {
        @apply cursor-pointer bg-white w-4 h-4 rounded-full bg-opacity-30 mr-3;
        transition: width 0.4s;
        &:hover,
        &.active {
            @apply bg-opacity-100;
        }

        &.active {
            @apply w-8;
        }
    }

    &__container {
        @apply absolute top-1/2 -translate-y-1/2 h-[300px] left-0 right-0 bottom-0 mx-auto;
    }

    &__img {
        max-width: 759px;
        height: 300px;
        background-position: center center;
        background-repeat: no-repeat;
        background-size: cover;
        margin: 0 auto;
        filter: grayscale(10%);
        box-shadow: 6px 1px 6px rgb(0, 0, 0, 0.2), -6px 0px 6px rgba(0, 0, 0, 0.2);
    }

    &__img-blur {
        position: relative;
        z-index: 1;
        width: 100%;
        filter: blur(15px) grayscale(50%);
    }

    &__content {
        position: absolute;
        top: 40px;
        left: 20px;
        width: 60%;
    }

    &__title {
        text-shadow: 0 1px rgba(0, 0, 0, 0.3);
        font-weight: bold;
        text-transform: uppercase;
        font-size: 2rem;
        word-wrap: break-word;
        color: #fff;
    }

    &__snippet {
        padding: 10px 0 0 0;
        color: #fff;
    }
}
</style>
