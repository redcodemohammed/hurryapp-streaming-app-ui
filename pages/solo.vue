<script lang="ts" setup>
const video = ref<HTMLVideoElement | null>(null);

const { playing, currentTime, duration, volume, muted, waiting } = useMediaControls(video, {
  src: "https://dl6.webmfiles.org/elephants-dream.webm",
});

const loaded = ref(false);
const seekPosition = computed<number>({
  get: () => (currentTime.value / duration.value) * 100,
  set: (v) => {
    currentTime.value = (v / 100) * duration.value;
  },
});

onMounted(() => {
  if (video.value) {
    video.value.muted = true;
    video.value.play();
  }

  document.addEventListener("load", () => {
    loaded.value = true;
  });
});
</script>

<template>
  <UCard class="">
    <video ref="video" class="h-[70vh] mx-auto"></video>
    <template #footer>
      <div class="flex gap-3 place-items-center" dir="ltr">
        <UButton size="xl" @click="playing = !playing">
          <UIcon class="text-xl" dynamic :name="playing ? 'i-tabler-player-pause' : 'i-tabler-player-play'" />
        </UButton>
        <UButton size="xl" @click="muted = !muted">
          <UIcon class="text-xl" dynamic :name="muted ? 'i-tabler-volume-off' : 'i-tabler-volume'" />
        </UButton>

        <URange v-model="seekPosition" name="range" />
        <UiScrubber v-model="volume" :max="1" class="w-32 ml-2" />
      </div>
    </template>
  </UCard>
</template>

<style></style>
