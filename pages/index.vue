<script lang="ts" setup>
const videos = ref([
  { id: 1, title: "Batman", cover: "pictures/1.jpg" },
  { id: 2, title: "Hitman", cover: "pictures/2.jpg" },
  { id: 3, title: "Batman", cover: "pictures/3.jpg" },
  { id: 4, title: "Hitman", cover: "pictures/4.jpg" },
  { id: 5, title: "Batman", cover: "pictures/5.jpg" },
  { id: 6, title: "Hitman", cover: "pictures/6.jpg" },
  { id: 7, title: "Hitman", cover: "pictures/7.jpg" },
]);
</script>

<template>
  <!-- <img src="./1.jpg" alt="Movie" /> -->
  <UCard class="mt-4 flex min-h-[80vh] text-center">
    <div class="flex mb-4 gap-6 flex-wrap justify-center">
      <UCard class="flex justify-center w-64 h-60 items-center cursor-pointer">
        <UIcon name="i-tabler-square-rounded-plus" class="text-9xl text-gray-400" />
      </UCard>
      <HomeVideoCard v-for="video in videos" :key="video.id" :video="video"></HomeVideoCard>
    </div>
  </UCard>
</template>
