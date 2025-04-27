<template>
  <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
    <div class="col-span-1 md:col-start-2">
      <BaseCard>
        <template #title>
          Mot de passe oublié
        </template>
        <template #body>
          <div class="text-center">
            {{ success ? 'Ton nouveau mot de passe a été envoyé par mail! Va vite voir ta boite mail!' : 'Une erreur est survenu!' }}
          </div>
        </template>
      </BaseCard>
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  title: 'forgot',
  middleware: ({ params }) => {
    if (!params.code) { abortNavigation() }
  }
})

const route = useRoute()
const { showAlert } = useNotification()

const success = ref(false)

try {
  await useApiFetch('forgot/' + route.params.code.toString(), { method: 'PUT' })

  showAlert({
    message: 'Ton nouveau mot de passe a été envoyé par mail! Va vite voir ta boite mail!',
    type: 'success'
  })

  success.value = true
} catch {}
</script>
