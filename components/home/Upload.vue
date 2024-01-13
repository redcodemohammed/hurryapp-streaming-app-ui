<script setup>
const props = defineProps({
  isModalOpen: Boolean,
});
const isOpen = toRef(props, "isModalOpen");
const isUploaded = ref(false);
const uploadProcess = () => {
  isUploaded.value = true;
  //   The process of upload video completley
  const { files, open, reset, onChange } = useFileDialog({
    accept: "video/*", // Set to accept only image files
    directory: true, // Select directories instead of files if set true
  });

  onChange((files) => {
    /** do something with files */
  });
};
const addVideo = () => {};
const cancelProcess = () => {
  isUploaded.value = false;
  isOpen.value = false;
};
</script>

<template>
  <div class="">
    <UCard class="justify-center gap-6 flex-cols">
      <div>
        <UInput placeholder="عنوان الفيديو" class="text-center w-1/2 p-2" />
        <UButton v-if="!isUploaded" :label="$t('components.uploadModal.upload')" icon="i-tabler-files" @click="uploadProcess" />
        <UButton v-if="isUploaded" :label="$t('components.uploadModal.cancel')" icon="i-tabler-files" class="bg-red-500" @click="cancelProcess" />
      </div>

      <span v-if="isUploaded" class="text-center my-6 p-2">تم تحميل الفيديو...</span>
      <UCard id="video information" class="my-6">video information</UCard>
      <div class="">
        <UButton :label="$t('components.uploadModal.add')" icon="i-tabler-stereo-glasses" @click="addVideo" />
        <UButton :label="$t('components.uploadModal.cancel')" icon="i-tabler-folder-cancel" class="bg-red-500 m-2" @click="cancelProcess" />
      </div>
    </UCard>
  </div>
</template>
