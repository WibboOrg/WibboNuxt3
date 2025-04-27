<template>
  <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
    <div class="col-span-1 md:col-start-2">
      <BaseCard>
        <template #title>
          Mot de passe oublié
        </template>
        <template #body>
          <form class="grid grid-cols-1 gap-3" @submit.prevent="forgotPost">
            <div class="col-span-1">
              <label for="forgotInputusername" class="form-label">Ton pseudonyme</label>
              <BaseInput id="forgotInputusername" v-model="forgotForm.username" name="username" aria-describedby="usernameHelp" placeholder="Ton pseudonyme" />
              <small id="usernameHelp" class="form-text">Entre le pseudonyme du compte</small>
            </div>

            <div class="col-span-1">
              <label for="forgotInputemail" class="form-label">Ton e-mail</label>
              <BaseInput id="forgotInputemail" v-model="forgotForm.email" name="email" aria-describedby="emailHelp" placeholder="Adresse e-mail" />
              <small id="emailHelp" class="form-text">Le lien entre l'adresse mail et le pseuudonyme est de rigueur, sans eux, tu ne pourras pas récupérer ton compte !</small>
            </div>

            <BaseButton :loading="loading">
              ENVOYER
            </BaseButton>
          </form>
        </template>
      </BaseCard>
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  title: 'forgot'
})

const { showAlert } = useNotification()

const loading = ref(false)
const forgotForm = ref({ username: '', email: '' })

const forgotPost = async () => {
  if (loading.value) { return }

  try {
    loading.value = true

    await useApiFetch('forgot', { body: forgotForm.value, method: 'POST' })

    showAlert({
      message: 'Un mail de confirmation a été envoyé, check ta boite mail!',
      type: 'success'
    })

    forgotForm.value = { username: '', email: '' }
  } catch {}

  loading.value = false
}
</script>
