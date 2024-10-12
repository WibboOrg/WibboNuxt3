<template>
  <div>
    <VitePwaManifest />
    <NuxtLoadingIndicator />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n()
const route = useRoute()
const runtimeConfig = useRuntimeConfig()

const titleTranslate = computed<string>(() => (route.meta.title ? t(`${route.meta.title}.title`) : ''))

useHead({
  titleTemplate: (title?: string) => (titleTranslate.value || title ? `${titleTranslate.value || title} - Wibbo` : 'Wibbo'),
  htmlAttrs: {
    lang: 'fr'
  },
  meta: [
    { name: 'og:title', content: titleTranslate.value ? `${titleTranslate.value} - Wibbo` : 'Wibbo' },
    { name: 'description', content: t('index.description') },
    { name: 'og:description', content: t('index.description') },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'google-site-verification', content: '8mveny6nDw2FTANP6TlhvE2kkk6mxnWl045MEFKuItk' },
    {
      name: 'keywords',
      content: 'Wibbo, wibbo, Wibbo hotel, Wibbo, Wibbo, Wibbo hotel, wibbo.fr, wibbo.org, Wibbo.fr, Wibbo retro, Wibbo retro gratuit, virtuel, monde, réseau social, Wibbo gratuit, Wibbo credit, Wibbo france, credit, credits, gratuit, communautée, avatar, chat, connectée, adolescence, jeu de rôle, rejoindre, social, groupes, forums, sécuritée, jouer, jeux, amis, rares, ados, jeunes, collector, collectionner, créer, connecter, meuble, mobilier, animaux, déco, design, appart, décorer, partager, badges, musique, chat vip, fun, sortir, mmo, mmorpg, jeu massivement multijoueur'
    },
    { name: 'og:type', content: 'website' },
    { name: 'og:url', content: runtimeConfig.public.siteUrl },
    { name: 'og:site_name', content: 'Wibbo' },
    { name: 'og:image', content: runtimeConfig.public.siteUrl + '/app_wibbo_hotel_image.png' },
    { name: 'msapplication-TileColor', content: '#001726' },
    { name: 'theme-color', content: '#001726' }
  ],
  link: [
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
  ]
})
</script>
<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Ubuntu:ital,wght@0,400;0,700;1,400;1,700&display=swap'); //CDN

html,
body,
#__nuxt,
#app {
    padding: 0;
    margin: 0;
    font-family: 'Ubuntu', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif;
    font-size: 13px;
    overflow-y: overlay;
    height: 100vh;
    width: 100%;
    line-height: 1.5rem;
}

::-webkit-scrollbar {
    width: 14px;
}

::-webkit-scrollbar-thumb {
    border: 4px solid rgba(0, 0, 0, 0);
    background-clip: padding-box;
    border-radius: 9999px;
    background-color: rgba(255, 255, 255, 0.2);

    &:hover {
        background-color: rgba(255, 255, 255, 0.6);
    }
}

:focus,
button:focus {
    outline: none;
}
</style>
