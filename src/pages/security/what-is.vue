<template>
  <div class="grid grid-cols-1 gap-4 lg:grid-cols-1">
    <div class="col-span-1">
      <BaseCard class="h-full">
        <template #title>
          Wibbo, c'est quoi ?
        </template>

        <template #body>
          <div class="flex flex-col items-center p-2 lg:h-80 sm:flex-row">
            <img src="~/assets/imgs/safety/page_9.png" class="mr-2" alt="Wibbo, c'est quoi ?">
            <p>
              Wibbo est une communauté virtuelle en ligne pixelisée et vintage où tu pourras créer ton propre avatar, te faire des amis, discuter, créer des apparts, construire des jeux
              et y participer et bien plus encore ! Presque tout est possible dans ce lieu étrange, plein de gens incroyable...
            </p>
          </div>
        </template>
      </BaseCard>
    </div>

    <div class="col-span-1">
      <BaseCard class="h-full">
        <template #title>
          Plus qu'un jeu...
        </template>

        <template #body>
          <div class="flex flex-col items-center p-2 lg:h-80 sm:flex-row">
            <img src="~/assets/imgs/whatis/ill_15.png" class="mr-2" alt="Plus qu'un jeu...">
            <p>
              Relooker ton avatar avec toutes les tendances les plus folles n'est pas la seule façon de s'amuser sur Wibbo. Tu veux être l'architecte du siècle et construire des
              structures éblouissantes? Tu veux montrer tes compétences de fou de construction de jeu et émerveiller tes amis? Rejoins les concours! Es-tu fan de selfies et photos
              drôles? Notre appareil photo sera une diversion sans fin pour toi !
            </p>
          </div>
        </template>
      </BaseCard>
    </div>

    <div class="col-span-1">
      <BaseCard class="h-full">
        <template #title>
          Trouve ta place
        </template>

        <template #body>
          <div class="flex flex-col items-center p-2 lg:h-80 sm:flex-row">
            <img src="~/assets/imgs/safety/page_8.png" class="mr-2" alt="Trouve ta place">
            <p>
              Que tout le monde fasse quelque chose n'est pas une raison pour toi de le faire si tu n'es pas à l'aise Tu aimes discuter et sortir avec tes amis ? Les groupes Wibbo,
              forums et les jeux de rôles c'est la direction à prendre pour commencer. Rejoins l'armée pour faire ton devoir. Enfiler une cape pour sauver l'univers. Ou deviens une
              infirmière et sauve des vies de pixels. Inscris toi et commence à explorer les possibilités infinies de rôles.
            </p>
          </div>
        </template>
      </BaseCard>
    </div>

    <div class="col-span-1">
      <BaseCard class="h-full">
        <template #title>
          Exprime toi !
        </template>

        <template #body>
          <div class="flex flex-col items-center p-2 lg:h-80 sm:flex-row">
            <img src="~/assets/imgs/whatis/ill_16.png" class="mr-2" alt="Exprime toi !">
            <p>
              La créativité et l'originalité sont les bienvenues sur Wibbo ! Chaque semaine nous avns de supers compétitions que tu peux rejoindre. Des constructions d'apparts, aux
              selfies, des vidéos ou des compétitions d'écriture - une tonne de trucs cools t'attendent pour laisser libre-court à ton élan artistique et gagner quelques winwin +
              d'autres prix ! Tu es prêt ?
            </p>
          </div>
        </template>
      </BaseCard>
    </div>

    <div class="col-span-1">
      <BaseCard class="h-full">
        <template #title>
          Joue gratuitement, pour toujours !
        </template>

        <template #body>
          <div class="flex flex-col items-center p-2 lg:h-80 sm:flex-row">
            <img src="~/assets/imgs/safety/page_7.png" class="mr-2" alt="Joue gratuitement, pour toujours !">
            <p>
              Wibbo est un jeu gratuit en ligne donc tu peux explorer un vaste monde de salles, quêtes, discuter et gagner des prix, sans jamais avoir à payer ! Certains extras comme le
              Premium Club, les Wibbo Points et les Rares peuvent être achetés avec des LimitCoins ou des Wibbo Points !
            </p>
          </div>
        </template>
      </BaseCard>
    </div>

    <div class="col-span-1">
      <BaseCard class="h-full">
        <template #title>
          Toujours là pour aider...
        </template>

        <template #body>
          <div class="flex flex-col items-center p-2 lg:h-80 sm:flex-row">
            <img src="~/assets/imgs/whatis/ill_17.png" class="mr-2" alt="Toujours là pour aider...">
            <p>
              Wibbo est surveillé à longueur de journée. Tu peux aussi faire beaucop de choses pour rester en sécurité !<br>
              En tant que communauté en ligne reconnue, nous sommes fiers d'avoir une connaissance importante des règles de sécurité pour une navigation sûre, suivant les lignes
              directrices internationales établies par des groupes gouvernementaux et des organisations de protection de l'adolescence.
            </p>
          </div>
        </template>
      </BaseCard>
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  title: 'what-is'
})
</script>
