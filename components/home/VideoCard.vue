<script setup lang="ts">
const props = defineProps<{
  video: Video;
}>();
const loading = false;
const imagePath = computed(() => {
  return `${props.video.cover}`;
});
</script>

<template>
  <UCard class="group relative w-64 h-60 overflow-hidden hover:scale-105" :ui="{ body: { padding: 'px-0 py-0 sm:p-0' }, background: 'bg-black' }">
    <img :src="imagePath" :alt="`${props.video.title} Cover`" class="w-64 h-60 object-cover group-hover:blur-sm" />
    <div :class="{ hidden: !loading, flex: loading }" class="group-hover:flex absolute inset-0 justify-center items-center flex-col gap-2">
      <UButton color="red" :label="$t('components.videoCard.play')" icon="i-tabler-play" :to="`/solo?id=${props.video.id}`" variant="soft" />
      <UButton :label="$t('components.videoCard.stream')" icon="i-tabler-stereo-glasses" :to="`/party?id=${props.video.id}`" />
    </div>
    <h1 class="text-2xl text-center mt-20">{{ video.title }}</h1>
  </UCard>
</template>
