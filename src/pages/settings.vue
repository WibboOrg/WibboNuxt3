<template>
  <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
    <div class="col-span-1">
      <BaseButton :to="'/settings'" primary>
        Préférences
      </BaseButton>
      <BaseButton :to="'/settings/password'" primary>
        Mot de passe
      </BaseButton>
      <BaseButton :to="'/settings/email'" primary>
        Email
      </BaseButton>
    </div>
    <NuxtPage />
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: ['authenticated'],
  title: 'settings'
})
</script>
