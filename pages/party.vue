<script lang="ts" setup>
const video = ref<HTMLVideoElement | null>(null);

const $route = useRoute("party");
const $auth = useAuth();
const $router = useRouter();
const $notify = useToast();

const id = computed(() => {
  return $route.query.id;
});

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
  if (message.value.trim() === "") return;

  $socket.emit(`message:sent`, { message: message.value, party: id.value });
  message.value = "";
}

const messages = ref<EventMessageReceived[]>([]);
function onMessageReceived(data: EventMessageReceived) {
  messages.value.push(data);
}

// handle video seek
const isSeeking = ref(false);
watchThrottled(
  seekPosition,
  () => {
    if (isSeeking.value) $socket.emit(`video:seek`, { position: seekPosition.value });
  },
  { throttle: 300 },
);

function onPlayerStarted() {
  playing.value = true;
}
function onPlayerPaused() {
  playing.value = false;
}
function onVideoChanged() {}
function onVideoSeeked(data: EventVideoSeeked) {
  seekPosition.value = data.position;
}

const numberOfUsers = ref(0);
function onUserJoined(data: EventUserJoined) {
  numberOfUsers.value = data.members;
}
function onUserLeft(data: EventUserLeft) {
  numberOfUsers.value = data.members;
}

function onOwnerLeft() {
  $notify.add({
    title: "Party owner left",
    description: "You are now the owner of the party",
    color: "blue",
  });

  $router.push(`/`);
}
onMounted(async () => {
  $socket.emit(`user:joined`, { id: id.value });

  $socket.on(`message:received`, onMessageReceived);
  $socket.on(`player:started`, onPlayerStarted);
  $socket.on(`player:paused`, onPlayerPaused);
  $socket.on(`video:changed`, onVideoChanged);
  $socket.on(`video:seeked`, onVideoSeeked);
  $socket.on(`user:joined`, onUserJoined);
  $socket.on(`user:left`, onUserLeft);
  $socket.on(`owner:left`, onOwnerLeft);
  // get the previous messages
  const _messages = await apiFetch<EventMessageReceived[]>(`/chat`, {
    method: "GET",
    query: { socketId: $socket.id },
  });

  messages.value = _messages;
});

onBeforeUnmount(() => {
  $socket.emit(`user:left`, { id: id.value });
  $socket.emit(`owner:left`, { id: id.value });

  // $socket.off(`message:received`, onMessageReceived);
  $socket.off(`player:started`, onPlayerStarted);
  $socket.off(`player:paused`, onPlayerPaused);
  $socket.off(`video:changed`, onVideoChanged);
  $socket.off(`video:seeked`, onVideoSeeked);
  $socket.off(`user:joined`, onUserJoined);
  $socket.off(`user:left`, onUserLeft);
  $socket.off(`owner:left`, onUserLeft);
});
</script>

<template>
  <div class="grid grid-cols-12 gap-3">
    <UCard class="col-span-3" :ui="{ body: { padding: 'px-0 py-0 sm:p-0' } }">
      <template #header>
        <UButton icon="i-tabler-user" :label="numberOfUsers.toString()" color="white" variant="solid"></UButton>
      </template>

      <UiChatContainer>
        <!-- <UAlert v-for="(m, i) in messages" :key="i" :description="m.message" :title="m.user.username" /> -->
        <div v-for="(m, i) in messages.toReversed()" :key="i" class="flex items-end">
          <div class="flex-1 p-1 rounded-lg bg-gray-300">
            <p class="font-bold">{{ m.user.username }}</p>
            <p>{{ m.message }}</p>
          </div>
        </div>
      </UiChatContainer>

      <template #footer>
        <UInput v-model="message" :ui="{ icon: { trailing: { pointer: '' } } }" size="xl" @keydown.enter="sendMessage">
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
          <UButton size="xl" @click="$socket.emit(playing ? 'player:pause' : 'player:start')">
            <UIcon class="text-xl" dynamic :name="playing ? 'i-tabler-player-pause' : 'i-tabler-player-play'" />
          </UButton>
          <UButton size="xl" @click="muted = !muted">
            <UIcon class="text-xl" dynamic :name="muted ? 'i-tabler-volume-off' : 'i-tabler-volume'" />
          </UButton>

          <URange v-model="seekPosition" @click="$socket.emit(`video:seek`, { position: seekPosition })" />
          <UiScrubber v-model="volume" :max="1" class="w-32 ml-2" />
        </div>
      </template>
    </UCard>
  </div>
</template>

<style></style>
