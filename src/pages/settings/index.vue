<template>
  <div class="col-span-2">
    <BaseCard>
      <template #title>
        Préférences
      </template>

      <template #body>
        <div class="settings">
          <form class="grid grid-cols-1 gap-3" @submit.prevent="generalPost">
            <label for="textamigoCheck" class="flex items-center cursor-pointer">
              <div class="leading-8"><b>Demande d'amitié:</b> Activer ou désactiver les demandes d'amis</div>
              <BaseCheckBox id="textamigoCheck" v-model="generalForm.textamigo" class="ml-auto" name="textamigo" />
            </label>

            <label for="onlineCheck" class="flex items-center cursor-pointer">
              <div class="leading-8"><b>Statue de connexion:</b> Activer ou désactiver le statut de connexion</div>
              <BaseCheckBox id="onlineCheck" v-model="generalForm.online" class="ml-auto" name="online" />
            </label>

            <label for="joinCheck" class="flex items-center cursor-pointer">
              <div class="leading-8"><b>Préférences rejoindre:</b> Activer ou désactiver la possibilité d'être suivit dans les apparts</div>
              <BaseCheckBox id="joinCheck" v-model="generalForm.join" class="ml-auto" name="join" />
            </label>

            <label for="trocCheck" class="flex items-center cursor-pointer">
              <div class="leading-8"><b>Troc:</b> Activer ou désactiver l'envoie d'échange</div>
              <BaseCheckBox id="trocCheck" v-model="generalForm.troc" class="ml-auto" name="troc" />
            </label>

            <BaseButton :loading="loading">
              Enregistrer
            </BaseButton>
          </form>
        </div>
      </template>
    </BaseCard>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: ['authenticated']
})

const authUser = useAuthUser()
const { showAlert } = useNotification()

const loading = ref(false)

const generalForm = ref({
  textamigo: false,
  online: false,
  join: false,
  troc: false
})

onMounted(() => {
  generalForm.value = {
    textamigo: authUser.value.block_newfriends === 0,
    online: authUser.value.hide_online === 0,
    join: authUser.value.hide_inroom === 0,
    troc: authUser.value.accept_trading !== 0
  }
})

const generalPost = async () => {
  if (loading.value) { return }

  try {
    loading.value = true

    await useApiFetch('settings/general', { body: generalForm.value, method: 'POST' })

    authUser.value.block_newfriends = +!generalForm.value.textamigo
    authUser.value.hide_online = +!generalForm.value.online
    authUser.value.hide_inroom = +!generalForm.value.join
    authUser.value.accept_trading = +generalForm.value.troc

    showAlert({
      message: "Les changements viennent d'être sauvegardés !",
      type: 'success'
    })
  } catch {}

  loading.value = false
}
</script>
