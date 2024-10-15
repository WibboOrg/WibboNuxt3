<template>
  <div class="col-span-2">
    <BaseCard>
      <template #title>
        {{ check ? 'Confirme ton email' : 'Email' }}
      </template>

      <template #body>
        <div v-if="check">
          Un code de vérification vient d'être envoyé à <b v-if="check.type == 1">{{ authUser.mail }}</b><b v-else>{{ check.email }}</b>, fait attention ! Il se peut que l'email se retrouve dans les spams !<br>
          Le code de validation expire le {{ filters.formatDateComplet(check.temps + 48 * 60 * 60) }}
        </div>

        <form v-else class="grid grid-cols-1 gap-3" @submit.prevent="emailPost">
          <div class="col-span-1">
            <label class="form-label">Ton adresse email actuel</label>
            <BaseInput :value="authUser.mail != '' ? authUser.mail : 'Aucune e-mail'" readonly />
          </div>

          <div class="col-span-1">
            <label class="form-label">Ta nouvelle adresse email</label>
            <BaseInput v-model="emailForm.mail" placeholder="Nouvel email" />
          </div>

          <div class="col-span-1">
            <small id="newPassWord" class="form-text">Ton email est essentiel, il sera utilisée pour les newsletters ainsi que pour récupérer ton mot de passe ! N'oublie pas que les données sensibles ne peuvent être modifiées par l'équipe développement.</small>
          </div>

          <div class="col-span-1">
            <BaseButton :loading="loading">
              Mettre à jour
            </BaseButton>
          </div>
        </form>
      </template>
    </BaseCard>
  </div>
</template>

<script lang="ts" setup>
import type { MailCheck } from '~/types'
import * as filters from '~/utils/filters'

definePageMeta({
  middleware: ['authenticated']
})

const authUser = useAuthUser()
const { showAlert } = useNotification()

const loading = ref(false)
const check = ref<MailCheck>({ type: 0, email: '', temps: 0 })
const emailForm = ref({ mail: '' })

const data = await useApiFetch<{ check: MailCheck }>('settings/email')

check.value = data.check

const emailPost = async () => {
  if (loading.value) { return }

  try {
    loading.value = true

    check.value = (await useApiFetch<{ check: MailCheck }>('settings/email', { body: emailForm.value, method: 'POST' })).check

    showAlert({
      message: 'Un mail de confirmation a été envoyé, check ta boite email!',
      type: 'success'
    })

    emailForm.value = { mail: '' }
  } catch {}
  loading.value = false
}
</script>
