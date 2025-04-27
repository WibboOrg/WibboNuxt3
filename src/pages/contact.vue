<template>
  <div class="grid grid-cols-1 gap-4">
    <div class="col-span-1">
      <BaseCard>
        <template #title>
          Formulaire de contact
        </template>

        <template #body>
          <form class="grid grid-cols-1 gap-3" @submit.prevent="contactPost">
            <div class="col-span-1">
              <label for="contactInputUserName" class="form-label">Mon pseudonyme est ...</label>
              <BaseInput id="contactInputUserName" v-model="contactForm.username" name="username" aria-describedby="emailUserName" placeholder="Pseudonyme" />
              <small id="emailUserName" class="form-text">Merci d'indiquer ton pseudonyme.</small>
            </div>

            <div class="col-span-1">
              <label for="contactInputPseudo" class="form-label">Ton e-mail</label>
              <BaseInput id="contactInputemail" v-model="contactForm.email" name="email" aria-describedby="emailHelp" placeholder="Adresse e-mail" />
              <small id="emailHelp" class="form-text">Indique le mail où tu pourras recevoir une réponse de notre part.</small>
            </div>

            <div class="col-span-1">
              <label for="contactInputsujet" class="form-label">Ton sujet</label>
              <BaseSelect id="contactInputsujet" v-model="selectedSujetId" name="sujet" aria-describedby="sujetHelp" :options="sujetList" />
              <small
                id="sujetHelp"
                class="form-text"
              >Merci de sélectionner une des propositions suivantes. Choisissez celle qui se rapproche le plus de votre problématique, afin d’obtenir une réponse rapide.</small>
            </div>

            <div class="col-span-1">
              <label for="contactInputmessage" class="form-label">Ton message</label>
              <BaseTextarea
                id="contactInputmessage"
                v-model="contactForm.message"
                name="message"
                aria-describedby="messageHelp"
                placeholder="Dis-nous tout ici"
                rows="5"
                maxlength="1000"
              />
              <small
                id="messageHelp"
                class="form-text"
              >Merci de donner un maximum de détails sur la situation, ceci afin d’éviter trop d’échanges d’emails avec notre Service Client.
              </small>
            </div>

            <div class="col-span-1 mx-auto mt-2" style="width: 304px">
              <BaseRecaptcha @verify="(token: string) => contactForm.recaptchaToken = token" @expire="contactForm.recaptchaToken = ''" />
            </div>

            <div class="col-span-1">
              <BaseButton :loading="loading">
                Envoyer ma demande
              </BaseButton>
            </div>
          </form>
        </template>
      </BaseCard>
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  title: 'contact'
})

const { showAlert } = useNotification()

const loading = ref(false)
const contactForm = ref({ username: '', email: '', sujet: '', message: '', recaptchaToken: '' })
const selectedSujetId = ref(0)
const sujetList = ref([
  'Je souhaite commander / upload un badge',
  "J'ai un problème avec l'achat des LTC/WibboPoints",
  'Mot de passe de mon compte oublié/Je ne peux pas accèder à mon compte',
  'Mon compte est exclu/sous silence',
  'Je voudrais partager/faire entendre mon opinion à propos de Wibbo',
  'Une proposition de partenariat/marketing/publicité',
  "Je n'ai pas reçu mon badge/prix/lot/trophée",
  'Problème technique sur Wibbo',
  'Problème sur le site de Wibbo',
  'Signaler un dysfonctionnement',
  'Rapporter un joueur',
  'Autre'
])

const contactPost = async () => {
  if (loading.value) { return }

  try {
    loading.value = true

    contactForm.value.sujet = sujetList.value.at(selectedSujetId.value) || ''

    await useApiFetch('contact', { body: contactForm.value, method: 'POST' })

    showAlert({
      message: 'Votre demande a bien été envoyé',
      type: 'success'
    })

    contactForm.value = { username: '', email: '', sujet: '', message: '', recaptchaToken: '' }
  } catch (e: unknown) { }

  loading.value = false
}
</script>
