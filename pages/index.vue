<script lang="ts" setup>
const videos = ref([
  { id: 1, title: "Batman" },
  { id: 2, title: "Hitman" },
  { id: 1, title: "Batman" },
  { id: 2, title: "Hitman" },
  { id: 1, title: "Batman" },
  { id: 2, title: "Hitman" },
]);
</script>

<template>
  <UCard class="mt-4 flex min-h-[80vh]">
    <div class="flex mb-4 gap-2 flex-wrap">
      <UCard class="flex justify-center w-64 h-60 items-center cursor-pointer">
        <UIcon name="i-tabler-square-rounded-plus" class="text-9xl text-gray-400" />
      </UCard>
      <HomeVideoCard v-for="video in videos" :key="video.id" :video="video"></HomeVideoCard>
    </div>
  </UCard>
</template>
