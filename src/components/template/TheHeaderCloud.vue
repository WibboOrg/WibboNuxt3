<template>
  <div class="header" :class="{ 'header--big': isRootRoute && !isConnected }">
    <div class="hidden lg:block header__hotel" />
    <div class="hidden lg:block header__big-cloud-left" />
    <div class="hidden lg:block header__big-cloud-right" />

    <div class="header__cloud-container">
      <div
        v-for="(data, index) in cloud"
        :key="'cloud-' + index"
        class="header__cloud"
        :class="[data.small ? 'small' : '', 'blur-' + data.blur]"
        :style="{ top: data.top + '%', left: data.left + '%' }"
      />
    </div>
    <div class="header__cloud-container header__cloud-container--back">
      <div
        v-for="(data, index) in cloudBack"
        :key="'cloudback-' + index"
        class="header__cloud"
        :class="[data.small ? 'small' : '', 'blur-' + data.blur]"
        :style="{ top: data.top + '%', left: data.left + '%' }"
      />
    </div>

    <transition name="fade-in-down">
      <TheHeaderLogin v-if="isRootRoute && !isConnected" />
    </transition>

    <div class="container h-full">
      <div class="relative z-10 grid items-center h-full grid-cols-1 md:grid-cols-5">
        <div class="flex items-center justify-center col-span-2">
          <div class="relative">
            <div class="header__cloud-logo" />
            <TheHeaderLogo :avatar-look="authUser.look" />
          </div>
        </div>

        <div class="col-span-2 md:col-end-6">
          <span v-if="!isConnected">
            <span v-if="!isRootRoute">
              <BaseButton primary to="/">{{ $t('header.link-login') }}</BaseButton>
              <BaseButton :to="'/register'">{{ $t('header.link-register') }}</BaseButton>
            </span>

            <div v-else class="header-register">
              <div class="header-register__about">{{ $t('header.register-about') }}</div>
              <BaseButton big :to="'/register'">{{ $t('header.link-register') }}</BaseButton>
            </div>
          </span>

          <span v-else class="flex justify-center items-center">
            <BaseButton class="mr-2" min :to="'/hotel'">{{ $t('header.link-hotel') }} <i class="relative header__hotel-icon ml-2" /></BaseButton>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import TheHeaderLogin from './TheHeaderLogin.vue'
import TheHeaderLogo from './TheHeaderLogo.vue'

import type { Cloud } from '~/types'

const authUser = useAuthUser()
const route = useRoute()

const cloud = ref<Cloud[]>([])
const cloudBack = ref<Cloud[]>([])

onMounted(() => {
  const generateCloud = (count: number) => Array.from({ length: count }).map((_, i) => ({
    top: randomNum(25, 85),
    left: i * 6.6 + randomNum(-3, 3),
    small: randomBool(25),
    blur: randomNum(1, 3),
  }))

  cloud.value = generateCloud(15)
  cloudBack.value = generateCloud(15)
})

const randomNum = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min)
const randomBool = (percentage: number) => Math.random() < percentage / 100

const isConnected = computed(() => authUser.value.id !== -1)
const isRootRoute = computed(() => (route && route.name ? route.name.toString().startsWith('index') : false))
</script>

<style lang="scss">
.header-lang {
    @apply absolute top-0 right-0 z-20 rounded p-1;
    background-color: rgba(0, 0, 0, 0.4);
}

.header {
    @apply relative overflow-hidden;

    height: 175px;
    background: linear-gradient(0deg, rgba(17, 40, 59, 0.2) 0%, rgba(73, 152, 184, 0.3) 35%, rgba(9, 33, 53, 0.2) 100%);
    transition: height 0.5s, padding 0.5s;
    clip: rect(auto, auto, auto, auto);
    background-size: 250% 250%;
    animation: headerAnimationBackground 10s ease-out infinite;

    @keyframes headerAnimationBackground {
        0% {
            background-position: 50% 0%;
        }
        50% {
            background-position: 51% 100%;
        }
        100% {
            background-position: 50% 0%;
        }
    }

    &--big {
        padding-top: 90px;
        height: 412px;
    }

    &__cloud-logo {
        position: absolute;
        top: 10px;
        left: -17px;

        width: 186px;
        height: 55px;
        background-image: url('~/assets/imgs/header/header_cloud-logo.png');

        animation: cloud-bounce 2s infinite alternate;
    }

    &__hotel-icon {
        width: 19px;
        height: 26px;
        background-image: url(~/assets/imgs/icons/hotel-icon.png);
        background-size: contain;
        background-repeat: no-repeat;
        display: inline-block;
        vertical-align: middle;
    }

    &__hotel {
        position: absolute;
        bottom: 0;
        left: 48%;

        z-index: 3;

        transform: translateX(-50%);

        width: 722px;
        height: 413px;
        background-image: url('~/assets/imgs/header/header_hotel.png');
    }

    &__big-cloud-left {
        position: absolute;
        top: 0;
        left: 0;

        z-index: 2;

        width: 241px;
        height: 100%;
        background-image: url('~/assets/imgs/header/header_cloud-left.png');
    }

    &__big-cloud-right {
        position: absolute;
        top: 0;
        right: 0;

        z-index: 2;

        width: 241px;
        height: 100%;
        background-image: url('~/assets/imgs/header/header_cloud-right.png');
    }

    &__cloud-container {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;

        width: 100%;
        height: 100%;

        z-index: 1;

        animation: cloud-move 200s linear infinite;

        &--back {
            animation: cloud-move-back 200s linear infinite;
        }
    }

    &__cloud {
        position: absolute;
        top: 0;
        left: 0;

        background-image: url('~/assets/imgs/header/header_cloud.png');
        width: 58px;
        height: 25px;
        background-position: 0 0;

        &.small {
            width: 24px;
            height: 14px;
            background-position-x: -58px;
        }

        &.blur-1 {
            filter: blur(1px);
        }

        &.blur-2 {
            filter: blur(2px);
        }

        &.blur-3 {
            filter: blur(3px);
        }
    }
}

.header-register {
    @apply max-w-xl mx-auto;
    background-color: rgba(0, 0, 0, 0.6);
    padding: 21px;
    border-radius: 5px;

    &__about {
        @apply pb-4 text-3xl text-white text-center mb-1 leading-10;
        text-shadow: 1px 0px 1px #000;
    }
}

@keyframes cloud-bounce {
    0% {
        transform: translateY(0);
    }
    100% {
        transform: translateY(5%);
    }
}

@keyframes cloud-move {
    0% {
        transform: translateX(0%);
    }
    100% {
        transform: translateX(100%);
    }
}

@keyframes cloud-move-back {
    0% {
        transform: translateX(-100%);
    }
    100% {
        transform: translateX(0%);
    }
}
</style>
