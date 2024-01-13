<script lang="ts" setup>
const video = ref<HTMLVideoElement | null>(null);
const partyId = 10;

const { accessToken } = storeToRefs(useAuthStore());

const { playing, currentTime, duration, volume, muted, waiting } = useMediaControls(video, {
  src: "https://dl6.webmfiles.org/elephants-dream.webm",
});

const { $socket } = useNuxtApp();

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

const message = ref("");
function sendMessage() {
  $socket.emit(`message:sent`, { message: message.value, party: partyId, token: accessToken.value });
  message.value = "";
}
function onMessageReceived(data: EventMessageReceived) {
  console.log(data);
}

function onPlayerStarted() {
  playing.value = true;
}
function onPlayerPaused() {
  playing.value = false;
}
function onVideoChanged() {}
function onVideoSeeked() {}
function onUserJoined() {}
function onUserLeft() {}

onMounted(() => {
  $socket.on(`party-${partyId}:message:received`, onMessageReceived);
  $socket.on(`party-${partyId}:player:started`, onPlayerStarted);
  $socket.on(`party-${partyId}:player:paused`, onPlayerPaused);
  $socket.on(`party-${partyId}:video:changed`, onVideoChanged);
  $socket.on(`party-${partyId}:video:seeked`, onVideoSeeked);
  $socket.on(`party-${partyId}:user:joined`, onUserJoined);
  $socket.on(`party-${partyId}:user:left`, onUserLeft);
});
</script>

<template>
  <div class="grid grid-cols-12 gap-3">
    <UCard class="col-span-3">
      <template #header>
        <UButton icon="i-tabler-user" label="6" color="white" variant="solid"></UButton>
      </template>
      <div class="min-h-[61.5svh]"></div>
      <template #footer>
        <UInput v-model="message" :ui="{ icon: { trailing: { pointer: '' } } }" size="xl">
          <template #trailing>
            <UButton color="gray" icon="i-tabler-send" @click="sendMessage" />
          </template>
        </UInput>
      </template>
    </UCard>
    <UCard class="col-span-9">
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
  </div>
</template>

<style></style>
