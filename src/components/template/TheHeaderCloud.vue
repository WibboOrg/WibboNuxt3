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

          <span v-else class="flex flex-row justify-center">
            <BaseButton class="relative mr-2" min :to="'/hotel'">{{ $t('header.link-hotel') }} <i class="fas fa-sign-in-alt" /></BaseButton>
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
  // if (isMobileOrTablet) return

  for (let i = 0; i < 15; i++) {
    cloud.value.push({ top: 50 + randomNum(-35, 35), left: i * 6.6 + randomNum(-3, 3), small: randomBool(25), blur: randomNum(1, 3) })
    cloudBack.value.push({ top: 50 + randomNum(-35, 35), left: i * 6.6 + randomNum(-3, 3), small: randomBool(25), blur: randomNum(1, 3) })
  }
})

const randomNum = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min)
const randomBool = (percentage: number) => Math.random() < percentage / 100

const isConnected = computed(() => authUser.value.id !== -1)
const isRootRoute = computed(() => (route && route.name ? route.name.toString().startsWith('index') : false))

// const isMobileOrTablet = computed(() => {
//     const userAgent = import.meta.server ? '' : navigator.userAgent || navigator.vendor
//     return (
//         /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(
//             userAgent,
//         ) ||
//         /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
//             userAgent.substr(0, 4),
//         )
//     )
// })
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
