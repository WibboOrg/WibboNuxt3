<template>
  <nav id="navbar" class="wibbo-nav shadow-">
    <div class="container flex flex-col flex-wrap px-4 py-4 lg:flex-row ">
      <div class="flex items-center">

        <TheNavbarSearch :drop-name="dropName" @open-search="dropName = 'search'" />

        <!-- <button type="button" @click="emit('toggleTheme')">
                <span class="dark:hidden">
                    <svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6">
                        <path d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" class="fill-sky-400/20 stroke-sky-500"></path>
                        <path d="M12 4v1M17.66 6.344l-.828.828M20.005 12.004h-1M17.66 17.664l-.828-.828M12 20.01V19M6.34 17.664l.835-.836M3.995 12.004h1.01M6 6l.835.836" class="stroke-sky-500"></path>
                    </svg>
                </span>
                <span class="hidden dark:inline">
                    <svg viewBox="0 0 24 24" fill="none" class="w-6 h-6">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M17.715 15.15A6.5 6.5 0 0 1 9 6.035C6.106 6.922 4 9.645 4 12.867c0 3.94 3.153 7.136 7.042 7.136 3.101 0 5.734-2.032 6.673-4.853Z" class="fill-sky-400/20"></path>
                        <path d="m17.715 15.15.95.316a1 1 0 0 0-1.445-1.185l.495.869ZM9 6.035l.846.534a1 1 0 0 0-1.14-1.49L9 6.035Zm8.221 8.246a5.47 5.47 0 0 1-2.72.718v2a7.47 7.47 0 0 0 3.71-.98l-.99-1.738Zm-2.72.718A5.5 5.5 0 0 1 9 9.5H7a7.5 7.5 0 0 0 7.5 7.5v-2ZM9 9.5c0-1.079.31-2.082.845-2.93L8.153 5.5A7.47 7.47 0 0 0 7 9.5h2Zm-4 3.368C5 10.089 6.815 7.75 9.292 6.99L8.706 5.08C5.397 6.094 3 9.201 3 12.867h2Zm6.042 6.136C7.718 19.003 5 16.268 5 12.867H3c0 4.48 3.588 8.136 8.042 8.136v-2Zm5.725-4.17c-.81 2.433-3.074 4.17-5.725 4.17v2c3.552 0 6.553-2.327 7.622-5.537l-1.897-.632Z" class="fill-sky-500"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M17 3a1 1 0 0 1 1 1 2 2 0 0 0 2 2 1 1 0 1 1 0 2 2 2 0 0 0-2 2 1 1 0 1 1-2 0 2 2 0 0 0-2-2 1 1 0 1 1 0-2 2 2 0 0 0 2-2 1 1 0 0 1 1-1Z" class="fill-sky-500"></path>
                    </svg>
                </span>
            </button> -->

        <div class="flex flex-row ml-auto">
          <div class="block cursor-pointer wibbo-nav__dropdown lg:hidden">
            <button class="wibbo-nav__link alone" aria-label="Open menu" @click.prevent="navToggle = !navToggle">
              <i class="fa fa-bars" />
            </button>
          </div>

          <TheNavbarPromp />
        </div>
      </div>

      <div class="flex-row lg:ml-auto lg:flex" :class="{ hidden: !navToggle }">
        <div class="wibbo-nav__dropdown">
          <NuxtLink to="/home" class="wibbo-nav__link alone">
            <i class="mr-2 navbar-icon navbar-icon--home" />
            <span class="wibbo-nav__text">{{ $t('navbar.home') }}</span>
          </NuxtLink>
        </div>

        <div class="wibbo-nav__dropdown">
          <div class="wibbo-nav__link" :class="dropName == 'comm' ? 'rotate' : ''" @click="dropName = dropName == 'comm' ? '' : 'comm'">
            <i class="mr-2 navbar-icon navbar-icon--commu" />
            <span :class="{ 'wibbo-nav__text': true, 'max-w-max': dropName == 'comm' }">{{ $t('navbar.community') }}</span>
          </div>

          <transition name="fade-in-down">
            <div :key="'dropName_' + dropName" class="wibbo-nav__content" :class="dropName == 'comm' ? 'block' : 'hidden'">
              <ul class="wibbo-nav__ul">
                <NuxtLink :to="'/community/news'">
                  <li class="wibbo-nav__li">
                    {{ $t('navbar.news') }}
                  </li>
                </NuxtLink>
                <NuxtLink :to="'/community/staff'">
                  <li class="wibbo-nav__li">
                    {{ $t('navbar.staff') }}
                  </li>
                </NuxtLink>
                <NuxtLink :to="'/community/photos'">
                  <li class="wibbo-nav__li">
                    {{ $t('navbar.photo') }}
                  </li>
                </NuxtLink>
                <NuxtLink :to="'/forum/category/0'">
                  <li class="wibbo-nav__li">
                    {{ $t('navbar.forum') }}
                  </li>
                </NuxtLink>
              </ul>
            </div>
          </transition>
        </div>

        <div class="wibbo-nav__dropdown">
          <div class="wibbo-nav__link" :class="dropName == 'secu' ? 'rotate' : ''" @click="dropName = dropName == 'secu' ? '' : 'secu'">
            <i class="mr-2 navbar-icon navbar-icon--secu" />
            <span :class="{ 'wibbo-nav__text': true, 'max-w-max': dropName == 'secu' }">{{ $t('navbar.security') }}</span>
          </div>

          <transition name="fade-in-down">
            <div :key="'dropName_' + dropName" class="wibbo-nav__content" :class="dropName == 'secu' ? 'block' : 'hidden'">
              <ul class="wibbo-nav__ul">
                <NuxtLink :to="'/security'">
                  <li class="wibbo-nav__li">
                    {{ $t('navbar.wibbo-security') }}
                  </li>
                </NuxtLink>
                <NuxtLink :to="'/security/way'">
                  <li class="wibbo-nav__li">
                    {{ $t('navbar.wibbo-attitude') }}
                  </li>
                </NuxtLink>
                <NuxtLink :to="'/security/what-is'">
                  <li class="wibbo-nav__li">
                    {{ $t('navbar.wibbo-what') }}
                  </li>
                </NuxtLink>
                <NuxtLink :to="'/contact'">
                  <li class="wibbo-nav__li">
                    {{ $t('navbar.support') }}
                  </li>
                </NuxtLink>
              </ul>
            </div>
          </transition>
        </div>

        <div class="wibbo-nav__dropdown">
          <NuxtLink :to="'/shop'" class="wibbo-nav__link alone">
            <i class="mr-2 navbar-icon navbar-icon--shop" />
            <span class="wibbo-nav__text">{{ $t('navbar.shop') }}</span>
          </NuxtLink>
        </div>

        <div class="wibbo-nav__dropdown">
          <div class="wibbo-nav__link" :class="dropName == 'top' ? 'rotate' : ''" @click="dropName = dropName == 'top' ? '' : 'top'">
            <i class="mr-2 navbar-icon navbar-icon--top" />
            <span :class="{ 'wibbo-nav__text': true, 'max-w-max': dropName == 'top' }">{{ $t('navbar.ranking') }}</span>
          </div>

          <transition name="fade-in-down">
            <div :key="'dropName_' + dropName" class="wibbo-nav__content" :class="dropName == 'top' ? 'block' : 'hidden'">
              <ul class="wibbo-nav__ul">
                <NuxtLink :to="'/ranking/wealth'">
                  <li class="wibbo-nav__li">
                    {{ $t('navbar.ranking-wealth') }}
                  </li>
                </NuxtLink>
                <NuxtLink :to="'/ranking/affecting'">
                  <li class="wibbo-nav__li">
                    {{ $t('navbar.ranking-affecting') }}
                  </li>
                </NuxtLink>
                <NuxtLink :to="'/ranking/game'">
                  <li class="wibbo-nav__li">
                    {{ $t('navbar.ranking-game') }}
                  </li>
                </NuxtLink>
                <NuxtLink :to="'/ranking/mazo'">
                  <li class="wibbo-nav__li">
                    {{ $t('navbar.ranking-mazo') }}
                  </li>
                </NuxtLink>
                <NuxtLink :to="'/ranking/runner'">
                  <li class="wibbo-nav__li">
                    {{ $t('navbar.ranking-runner') }}
                  </li>
                </NuxtLink>
              </ul>
            </div>
          </transition>
        </div>

        <div v-if="isConnected" class="wibbo-nav__dropdown">
          <div class="wibbo-nav__link" :class="dropName == 'avatar' ? 'rotate' : ''" @click="dropName = dropName == 'avatar' ? '' : 'avatar'">
            <BaseAvatar
              :figure="authUser.look"
              :direction="2"
              :head-direction="3"
              gesture="sml"
              size="s"
              headonly
              class="inline-block -ml-2"
            />
            <span :class="{ 'wibbo-nav__text': true, 'max-w-max': dropName == 'avatar' }">Moi</span>
          </div>

          <transition name="fade-in-down">
            <div :key="'dropName_' + dropName" class="wibbo-nav__content" :class="dropName == 'avatar' ? 'block' : 'hidden'">
              <ul class="wibbo-nav__ul">
                <li v-if="authUser.rank > 5" class="wibbo-nav__li">
                  <a :href="runtimeConfig.public.adminUrl" target="_blank">{{ $t('navbar.admin') }}</a>
                </li>
                <NuxtLink :to="'/settings'">
                  <li class="wibbo-nav__li">
                    {{ $t('navbar.settings') }}
                  </li>
                </NuxtLink>
                <NuxtLink :to="'/profil/' + authUser.username">
                  <li class="wibbo-nav__li">
                    {{ $t('navbar.profil') }}
                  </li>
                </NuxtLink>
                <li class="wibbo-nav__li" style="cursor: pointer" @click="onDisconnect()">
                  {{ $t('navbar.logout') }}
                </li>
              </ul>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </nav>
</template>

<script lang="ts" setup>
import TheNavbarSearch from './TheNavbarSearch.vue'
import TheNavbarPromp from './TheNavbarPromp.vue'

const runtimeConfig = useRuntimeConfig()
const authUser = useAuthUser()
const { logout } = useAuth()
const route = useRoute()

const navToggle = ref(false)
const dropName = ref('')

watch(
  () => route.name,
  () => {
    navToggle.value = false
    dropName.value = ''
  }
)

const isConnected = computed(() => authUser.value.id !== -1)

const onDisconnect = () => {
  logout()

  navigateTo('/')
}

onMounted(() => {
  document.addEventListener('click', documentClick)
})

onUnmounted(() => {
  document.removeEventListener('click', documentClick)
})

const documentClick = (event: MouseEvent) => {
  if (dropName.value === '') { return }

  const el = document.getElementById('navbar')
  if (!el) { return }

  if (el === event.target || el.contains(event.target as HTMLElement)) { return }

  dropName.value = ''
}
</script>

<style lang="scss">
.wibbo-nav {
    position: sticky;
    top: 0;
    margin: 0 auto;
    width: 100%;
    // border-bottom: 4px solid rgba(0, 0, 0, 0.2);
    background-color: var(--dark-color);
    z-index: 1000;
    font-size: 1.2rem;

    &__toggle {
        color: #000;
        height: 100%;
    }

    &__avatar {
        display: inline-block;
        height: 20px;
        position: relative;
        top: -10px;
    }

    &__logo {
        display: block;
        width: 38px;
        height: 33px;
        margin-right: 10px;
        background-image: url(~/assets/imgs/logo_w.png);
        background-position-x: 0;
        filter: drop-shadow(2px 1px 0 rgba(0, 0, 0, 0.2)) drop-shadow(-2px 1px 0 rgba(0, 0, 0, 0.2)) drop-shadow(0 -2px 0 rgba(2505, 0, 0, 0.2));

        &:hover {
            background-position-x: -38px;
        }
    }

    &__form {
        position: relative;
        display: flex;
        flex-wrap: wrap;
        align-items: stretch;
        width: auto;
    }

    &__input {
        position: relative;
        width: calc(100% - 40px);
        background-color: rgba(0, 0, 0, 0.4);
        box-shadow: inset 0 -3px 0 0 rgba(0, 0, 0, 0.25);
        height: 42px;
        border-radius: 8px 0 0 8px;
        border: none;
        padding: 0 10px;
        color: #ffffff;
        transition: background-color 0.2s;

        &::placeholder {
            @apply placeholder-white placeholder-opacity-75;
        }

        &:focus {
            background-color: rgba(0, 0, 0, 0.2);
        }
    }

    &__btn-search {
        position: relative;
        height: 42px;
        width: 40px;
        border-radius: 0 8px 8px 0;
        background-color: rgba(0, 0, 0, 0.4);
        box-shadow: inset 0 -3px 0 0 rgba(0, 0, 0, 0.25);
        border: none;
        outline: none;
        cursor: pointer;
        transition: background-color 0.2s;

        &:hover {
            background-color: rgba(0, 0, 0, 0.2);
        }
    }

    &__dropdown {
        position: relative;
        margin: 2px;
    }

    &__link {
        display: flex;
        // justify-content: center;
        // align-items: center;
        position: relative;
        //background-color: rgba(0, 0, 0, 0.1);
        //border: 1px solid rgba(0, 0, 0, 0.4);
        //box-shadow: inset 0 -3px 0 0 rgba(0, 0, 0, 0.25);
        min-width: 42px;
        width: 100%;
        padding: 10px;
        height: 42px;
        border-radius: 8px;
        text-align: center;
        cursor: pointer;
        transition: background-color 0.2s;

        @screen lg {
            width: auto;
        }

        &.rotate:not(.alone):after {
            transform: translateY(-50%) rotate(180deg);
        }

        &:not(.alone) {
            padding-right: 15px;
        }

        &:not(.alone):after {
            content: '';
            display: block;
            position: absolute;
            top: 50%;
            right: 5px;
            width: 10px;
            height: 5px;

            transform: translateY(-50%) rotate(0deg);

            transition: transform 0.2s;

            border-top: 0.3em solid;
            border-right: 0.3em solid transparent;
            border-bottom: 0;
            border-left: 0.3em solid transparent;
        }
    }

    &__dropdown:hover &__link {
        background-color: rgba(0, 0, 0, 0.2);
        text-decoration: none;
    }

    &__dropdown:hover &__text {
        opacity: 1;
        max-width: 125px;
    }

    &__text {
        display: inline-block;
        white-space: nowrap;
        cursor: pointer;
        overflow-x: hidden;
        margin-right: 1rem;
        max-width: 100%;
        transition: max-width 0.6s, opacity 1s;

        @screen lg {
            margin: 0;
            max-width: 0px;
            opacity: 0.4;
        }

        @screen 2xl {
            margin-right: 0.4rem;
            max-width: 100%;
            opacity: 1;
        }
    }

    &__content {
        overflow: hidden;

        background-color: var(--primary-color);
        width: 100%;
        height: auto;
        padding: 10px;
        border-radius: 8px;
        box-shadow: 2px 4px 0 0px rgba(0, 0, 0, 0.2), inset 0px 0px 0px 1px rgba(255, 255, 255, 0.05);
        z-index: 999;
        margin-top: 2px;

        &--absolute {
            position: absolute;
            top: 100%;
            left: 0;
            width: 200px;
        }

        @screen lg {
            position: absolute;
            top: 100%;
            left: 0;
            width: 200px;
        }
    }

    //   &__dropdown:hover &__content {
    //     display: block;
    //   }

    &__ul {
        padding: 0;
        margin: 0;
        list-style-type: none;
    }

    &__li {
        width: 100%;
        height: auto;
        padding: 3px 5px;
        border-radius: 8px;
        text-overflow: ellipsis;
        overflow: hidden;
        cursor: pointer;

        &:hover {
            background-color: rgba(255, 255, 255, 0.065);
        }
    }
}

.navbar-icon {
    display: inline-block;
    width: 20px;
    height: 20px;
    //margin-right: 0.5rem;

    background: url(~/assets/imgs/navbar.png) no-repeat 0 0;

    position: relative;

    &--home {
        background-position-y: 0;
    }

    &--commu {
        background-position-x: -20px;
    }

    &--secu {
        background-position-x: -40px;
    }

    &--shop {
        background-position-x: -60px;
    }

    &--top {
        background-position-x: -80px;
    }

    &--hotel {
        background-position-x: -100px;
    }
}
</style>
