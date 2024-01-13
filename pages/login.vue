<script lang="ts" setup>
import { z } from "zod";

definePageMeta({
  layout: "authentication",
  name: "login",
  public: true,
});

const { isLoading } = storeToRefs(useLoadingStore());
const $modals = useModalsStore();

const { t: $t } = useI18n();
const $auth = useAuth();
const $router = useRouter();
const $route = useRoute();

const schema = z.object({
  username: z
    .string({ required_error: $t("validations.required", { key: $t("common.forms.username") }) })
    .min(3, $t("validations.minLength", { key: $t("common.forms.username"), min: "٣" }))
    .regex(/^(?=[a-zA-Z0-9._]{3,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/, {
      message: $t("validations.invalid", { key: $t("common.forms.username") }),
    }),
  password: z.string({ required_error: $t("validations.required", { key: $t("common.forms.password") }) }).min(8, $t("validations.minLength", { key: $t("common.forms.password"), min: "٨" })),
});

const state = reactive({
  username: "",
  password: "",
});

const form = ref();

const passwordIsShown = ref(false);

async function login() {
  await $auth.login(state.username, state.password);
  $router.push("/");
}

async function register() {
  await $auth.register(state.username, state.password);
  $router.push("/");
}
</script>

<template>
  <u-card class="max-w-xl">
    <template #header>{{ $t("pages.auth.login.loginFormTitle") }}</template>
    <u-form ref="form" class="gap-4 flex flex-col" :schema="schema" :state="state" @submit="login">
      <u-form-group :label="$t('common.forms.username')" name="username">
        <u-input v-model="state.username" dir="ltr" trailing-icon="i-tabler-user">
          <template #leading> <u-button class="hidden"></u-button> </template
        ></u-input>
      </u-form-group>
      <u-form-group :label="$t('common.forms.password')" name="password">
        <u-input v-model="state.password" trailing-icon="i-tabler-password" :ui="{ icon: { leading: { pointer: '' } } }" dir="ltr" :type="passwordIsShown ? 'text' : 'password'">
          <template #leading>
            <u-button :icon="passwordIsShown ? 'i-tabler-eye' : 'i-tabler-eye-closed'" color="gray" variant="link" :padded="false" @click="passwordIsShown = !passwordIsShown"></u-button>
          </template>
        </u-input>
      </u-form-group>
      <!-- <u-button class="text-end hover:underline text-indigo-300" variant="link" @click="$modals.forgetPasswordModal = true">{{ $t("pages.auth.login.forgotYourPassword") }}</u-button> -->
      <div class="flex gap-4">
        <u-button class="flex-1" block icon="i-tabler-login" :loading="isLoading" type="submit"> {{ $t("common.actions.login") }} </u-button>
        <u-button class="flex-1" block icon="i-tabler-login" :loading="isLoading" type="button" variant="outline" @click.prevent="register">
          {{ $t("common.actions.register") }}
        </u-button>
      </div>
    </u-form>
  </u-card>
</template>
