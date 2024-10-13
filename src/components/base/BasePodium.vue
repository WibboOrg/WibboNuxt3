<template>
  <div class="podium">
    <div class="podium__background" />

    <div class="podium__top-2">
      <BaseAvatar :figure="topOne.look" action="wlk,wav,crr=21" gesture="sml" :direction="2" :head_direction="3" />
      <div class="podium__medaile" />
      <NuxtLink :to="topOne.username != '' ? '/profil/' + topOne.username : ''" class="podium__username-link">
        {{ topOne.username }}
      </NuxtLink>
    </div>

    <div class="podium__top-1">
      <BaseAvatar :figure="topTwo.look" action="wlk,wav,crr=21" gesture="sml" :direction="2" :head_direction="3" />
      <div class="podium__medaile" />
      <NuxtLink :to="topTwo.username != '' ? '/profil/' + topTwo.username : ''" class="podium__username-link">
        {{ topTwo.username }}
      </NuxtLink>
    </div>

    <div class="podium__top-3">
      <BaseAvatar :figure="topThree.look" action="wlk,wav,crr=21" gesture="sml" :direction="2" :head_direction="3" />
      <div class="podium__medaile" />
      <NuxtLink :to="topThree.username != '' ? '/profil/' + topThree.username : ''" class="podium__username-link">
        {{ topThree.username }}
      </NuxtLink>
    </div>

    <div class="flex flex-row justify-around text-center">
      <div class="text-sm">
        {{ filters.formatNumber(scoreTwo) }}<br><b>{{ name }}</b>
      </div>
      <div class="text-sm">
        {{ filters.formatNumber(scoreOne) }}<br><b>{{ name }}</b>
      </div>
      <div class="text-sm">
        {{ filters.formatNumber(scoreThree) }}<br><b>{{ name }}</b>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { User } from '~/types'
import * as filters from '~/utils/filters'

const props = defineProps({
  topUser: { type: Array<Partial<User>>, default: [], required: true },
  score: { type: String, default: '', required: true },
  name: { type: String, default: '', required: true }
})

const defaultUser: Partial<User> = { username: '', look: 'hd-787592-22.lg-270-1408' }

const topOne = computed(() => (props.topUser?.length >= 1 ? props.topUser[0] : defaultUser))
const topTwo = computed(() => (props.topUser?.length >= 2 ? props.topUser[1] : defaultUser))
const topThree = computed(() => (props.topUser?.length >= 3 ? props.topUser[2] : defaultUser))

// @ts-ignore
const scoreOne = computed(() => +topOne.value[props.score] ?? 0)
// @ts-ignore
const scoreTwo = computed(() => +topTwo.value[props.score] ?? 0)
// @ts-ignore
const scoreThree = computed(() => +topThree.value[props.score] ?? 0)
</script>

<style lang="scss">
.podium {
    position: relative;
    width: 226px;
    height: 215px;
    margin: 0 auto;
    padding-top: 20px;

    &__background {
        background-image: url(~/assets/imgs/podium/podium.png);
        width: 226px;
        height: 163px;
    }

    &__medaile {
        position: absolute;
        z-index: 2;
        top: 50px;
        left: 22px;
        background-image: url(~/assets/imgs/podium/medailles.png);
        background-repeat: no-repeat;
        width: 22px;
        height: 23px;
        background-position-x: 0px;
    }

    &__username-link {
        position: absolute;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        z-index: 3;
        white-space: nowrap;
    }

    &__top-1 {
        width: 64px;
        position: absolute;
        top: 28px;
        left: 8px;

        &:hover {
            filter: drop-shadow(1px 1px 0 #a4a4a4) drop-shadow(-1px 1px 0 #a4a4a4) drop-shadow(1px -1px 0 #a4a4a4) drop-shadow(-1px -1px 0 #a4a4a4);
            z-index: 5;

            .podium__medaile {
                background-position-x: 0px;
            }
        }
    }

    &__top-2 {
        width: 64px;
        position: absolute;
        top: 8px;
        left: 79px;

        &:hover {
            filter: drop-shadow(1px 1px 0 #e0bf00) drop-shadow(-1px 1px 0 #e0bf00) drop-shadow(1px -1px 0 #e0bf00) drop-shadow(-1px -1px 0 #e0bf00);
            z-index: 5;
        }

        .podium__medaile {
            background-position-x: -22px;
        }
    }

    &__top-3 {
        width: 64px;
        position: absolute;
        top: 46px;
        left: 152px;

        &:hover {
            filter: drop-shadow(1px 1px 0 #cc6600) drop-shadow(-1px 1px 0 #cc6600) drop-shadow(1px -1px 0 #cc6600) drop-shadow(-1px -1px 0 #cc6600);
            z-index: 5;
        }

        .podium__medaile {
            background-position-x: -44px;
        }
    }
}
</style>
