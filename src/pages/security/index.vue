<template>
  <div class="grid grid-cols-1 gap-4 lg:grid-cols-3">
    <div class="col-span-1">
      <BaseCard>
        <template #title>
          Protège tes informations personnelles
        </template>

        <template #body>
          <div class="flex flex-col items-center p-2 lg:h-80 sm:flex-row">
            <img src="~/assets/imgs/safety/page_0.png" class="mr-2" alt="Protège tes informations personnelles">
            <p>
              Tu ne sais jamais avec qui tu es vraiment en train de parler en ligne, donc ne donne jamais ton vrai nom, adresse, numéro de téléphone, photos ou nom de ton école. Partager
              ces informations personnelles peut te conduire à être victime d'une arnaque, d'intimidation ou de te mettre en danger.
            </p>
          </div>
        </template>
      </BaseCard>
    </div>

    <div class="col-span-1">
      <BaseCard>
        <template #title>
          Protège ta vie privée
        </template>

        <template #body>
          <div class="flex flex-col items-center p-2 lg:h-80 sm:flex-row">
            <img src="~/assets/imgs/safety/page_1.png" class="mr-2" alt="Protège ta vie privée">
            <p>Garde les coordonnées de ton Facebook, Twitter, Skype, Instagram ou Snapchat pour toi. Tu ne sais jamais où cela peut te conduire.</p>
          </div>
        </template>
      </BaseCard>
    </div>

    <div class="col-span-1">
      <BaseCard>
        <template #title>
          Ne cède pas à la pression des autres
        </template>

        <template #body>
          <div class="flex flex-col items-center p-2 lg:h-80 sm:flex-row">
            <img src="~/assets/imgs/safety/page_2.png" class="mr-2" alt="Ne cède pas à la pression des autres">
            <p>Que tout le monde fasse quelque chose n'est pas une raison pour toi de le faire si tu n'es pas à l'aise avec cette idée.</p>
          </div>
        </template>
      </BaseCard>
    </div>

    <div class="col-span-1">
      <BaseCard>
        <template #title>
          Garde tes copains en pixels!
        </template>

        <template #body>
          <div class="flex flex-col items-center p-2 lg:h-80 sm:flex-row">
            <img src="~/assets/imgs/safety/page_3.png" class="mr-2" alt="Garde tes copains en pixels">
            <p>
              Ne jamais rencontrer des personnes que tu connais uniquement via internet, les gens ne sont pas toujours ceux qu'ils prétendent être ! Si quelqu'un te demande de le/la
              rencontrer dans la vraie vie, il vaut mieux dire &quot;Non merci!&quot; et prévenir un modérateur, tes parents ou un autre adulte de confiance.
            </p>
          </div>
        </template>
      </BaseCard>
    </div>

    <div class="col-span-1">
      <BaseCard>
        <template #title>
          Exclus la Webcam
        </template>

        <template #body>
          <div class="flex flex-col items-center p-2 lg:h-80 sm:flex-row">
            <img src="~/assets/imgs/safety/page_5.png" class="mr-2" alt="Exclus la webcam">
            <p>
              Tu n'as aucun contrôle sur tes photos et images webcam une fois que tu les as partagées sur Internet, tu ne peux plus les récupérer. Elles peuvent être partagées avec
              n'importe qui, n'importe où et être utilisées pour t'intimider, te faire du chantage ou te menacer. Avant de publier une photo, demande-toi si tu es à l'aise pour que des
              gens que tu ne connais pas la voient.
            </p>
          </div>
        </template>
      </BaseCard>
    </div>

    <div class="col-span-1">
      <BaseCard>
        <template #title>
          N'aies pas peur de prendre parole!
        </template>

        <template #body>
          <div class="flex flex-col items-center p-2 lg:h-80 sm:flex-row">
            <img src="~/assets/imgs/safety/page_12.png" class="mr-2" alt="N'aies pas peur de prendre parole">
            <p>Si quelqu'un te met mal à l'aise ou te fait peur avec des menaces dans Wibbo, signale-le immédiatement à notre équipe de modération en utilisant le bouton d'aide.</p>
          </div>
        </template>
      </BaseCard>
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  title: 'security'
})
</script>
