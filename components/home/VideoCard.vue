<script setup lang="ts">
defineProps<{
  video: Video;
}>();
</script>

<template>
  <UCard class="group relative w-64 h-60">
    <div :class="{ hidden: !loading, flex: loading }" class="group-hover:flex absolute inset-0 justify-center items-center flex-col gap-2">
      <UButton color="red" :label="$t('components.videoCard.play')" icon="i-tabler-play" :to="`/solo?id=${video.id}`" variant="soft" />
      <UButton :label="$t('components.videoCard.stream')" icon="i-tabler-stereo-glasses" :to="`/party?id=${video.id}`" />
    </div>
    <h1 class="text-2xl text-center mt-20">{{ video.title }}</h1>
  </UCard>
</template>
