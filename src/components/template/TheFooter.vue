<template>
  <div class="w-full p-2 bg-black bg-opacity-40">
    <div class="container">
      <div class="grid grid-cols-1 gap-4 lg:grid-cols-4">
        <div class="mb-2  text-slate-400 text-center">
          <p class="mb-1">
            {{ $t('footer.social-follow') }}
          </p>
          <BaseSocialLink href="https://discord.wibbo.org" aria-label="Discord" class="bg-[#2b2b2b] hover:bg-[#525252]">
            <i class="fab fa-discord" />
          </BaseSocialLink>
          <BaseSocialLink href="https://www.facebook.com/WibboHotelFR" aria-label="Facebook" class="bg-[#4267b2] hover:bg-[#5d93fd]">
            <i class="fab fa-facebook-f" />
          </BaseSocialLink>
          <BaseSocialLink href="https://twitter.com/WibboORG" aria-label="Twitter" class="bg-[#1da1f2] hover:bg-[#5ebcf7]">
            <i class="fab fa-twitter" />
          </BaseSocialLink>
          <BaseSocialLink href="https://www.instagram.com/wibbo_org/" aria-label="Instagram" class="bg-gradient-to-r from-yellow-700 to-pink-500">
            <i class="fab fa-instagram" />
          </BaseSocialLink>
        </div>

        <div class="lg:col-span-3  text-slate-400 text-center">
          <NuxtLink :to="'/contact'" target="_self" class="underline hover:underline">
            {{ $t('footer.contact-link') }}
          </NuxtLink> /
          <NuxtLink :to="'/security/disclaimer'" target="_self" class="underline hover:underline">
            {{ $t('footer.disclaimer-link') }}
          </NuxtLink> /
          <NuxtLink :to="'/security/confidentialy'" target="_self" class="underline hover:underline">
            {{ $t('footer.confidentialy-link') }}
          </NuxtLink> /
          <NuxtLink :to="'/security'" target="_self" class="underline hover:underline">
            {{ $t('footer.security-link') }}
          </NuxtLink> /
          <NuxtLink :to="'/security/cookie'" target="_self" class="underline hover:underline">
            {{ $t('footer.cookie-link') }}
          </NuxtLink> /
          <a :href="'mailto:' + runtimeConfig.public.siteMail" target="_self" class="underline hover:underline">{{ runtimeConfig.public.siteMail }}</a>
          <p class="mt-2">
            © 2011 - {{ year }} : Wibbo Hôtel.<br>
            {{ $t('footer.copyright') }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const runtimeConfig = useRuntimeConfig()

const year = computed(() => new Date().getFullYear())
</script>
