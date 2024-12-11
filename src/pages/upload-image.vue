-
<template>
  <div class="grid grid-cols-1 gap-4 lg:grid-cols-3">
    <div class="grid-cols-1 lg:col-start-2">
      <BaseCard>
        <template #title>
          Importer une image
        </template>

        <template #body>
          <form
            enctype="multipart/form-data"
            class="grid grid-cols-1 gap-3"
            @submit.prevent="submitPost"
          >
            <div class="col-span-1">
              <label class="form-label">Image</label>
              <BaseUploadFile
                accept="image/*"
                @upload="(file: File) => fileUpload = file"
              />
            </div>

            <div class="col-span-1">
              <BaseButton :loading="loading">
                Importer
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
  title: 'upload-image',
  middleware: ['authenticated']
})

const authUser = useAuthUser()
const { showAlert } = useNotification()

const loading = ref(false)
const fileUpload = ref<File>()

const submitPost = async () => {
  if (loading.value || !fileUpload.value) { return }

  if (authUser.value.rank < 3) { return }

  try {
    loading.value = true

    const formData = new FormData()
    formData.append('file', fileUpload.value)

    const response = await useApiFetch<{ url: string }>('admin/upload-image', { body: formData, method: 'POST', headers: { 'Content-Type': 'multipart/form-data' } })

    const url = response.url

    showAlert({
      message: 'Votre image a bien été ajouter: ' + url,
      type: 'success'
    })
  } catch {}

  loading.value = false
}
</script>
