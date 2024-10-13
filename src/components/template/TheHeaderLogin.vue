<template>
  <div class="absolute top-0 z-50 w-full h-auto pt-5 pb-2 text-white bg-black bg-opacity-60">
    <div class="container px-2">
      <form class="grid grid-cols-1 gap-4 md:grid-cols-5" onsubmit="return false" @submit.prevent="userLogin">
        <div class="col-span-1 md:col-start-2">
          <label for="inputusername" class="sr-only">{{ $t('header-login.label-username') }}:</label>
          <BaseInput id="inputusername" v-model="loginForm.username" name="username" :placeholder="$t('header-login.label-username')" />
        </div>

        <div class="col-span-1 text-right">
          <label class="sr-only">{{ $t('header-login.label-password') }}:</label>
          <BaseInput v-model="loginForm.password" type="password" name="password" :placeholder="$t('header-login.label-password')" />
          <NuxtLink :to="'/forgot'" class="text-white">
            {{ $t('header-login.password-forgot') }}
          </NuxtLink>
        </div>

        <div class="col-span-1">
          <BaseButton primary :loading="loading">
            {{ $t('header-login.button-login') }}
          </BaseButton>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { login } = useAuth()

const loginForm = ref({ username: '', password: '' })
const loading = ref(false)

const userLogin = async () => {
  if (loading.value) { return }

  try {
    loading.value = true

    await login(loginForm.value.username, loginForm.value.password)

    await navigateTo('/home')
  } catch (err) {}

  loading.value = false
}
</script>
