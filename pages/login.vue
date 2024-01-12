<script lang="ts" setup>
import { z } from "zod";
// import { useAuthenticationStore } from "~/stores/authentication";
import { useModalsStore } from "~/stores/modals";

definePageMeta({
  layout: "authentication",
  name: "login",
  public: true,
});

const { t: $t } = useI18n();
// const $auth = useAuthenticationStore();
const $loading = useLoadingStore();
const $modals = useModalsStore();
const $router = useRouter();
const $route = useRoute();
const $toast = useToast();

const schema = z.object({
  email: z.string({ required_error: $t("validations.required", { key: $t("common.forms.email") }) }).email($t("validations.invalid", { key: $t("common.forms.email") })),
  password: z.string({ required_error: $t("validations.required", { key: $t("common.forms.password") }) }).min(8, $t("validations.minLength", { key: $t("common.forms.password"), min: "٨" })),
});

const state = ref({
  email: "",
  password: "",
});

const form = ref();
const loginLoading = ref(false);
const registerLoading = ref(false);
const loading = computed(() => loginLoading.value || registerLoading.value);
const passwordIsShown = ref(false);

async function login() {
  // try {
  //   await form.value!.validate();
  //   loginLoading.value = true;
  //   const response = await $auth.login(state.value.email, state.value.password);
  //   if (response.error.value?.data.success === false) {
  //     $toast.add({ title: $t("pages.auth.login.wrongCredentials"), icon: "i-tabler-alert-circle", color: "red" });
  //     return;
  //   }
  //   if ($route.query.redirect && typeof $route.query.redirect === "string") {
  //     $router.push($route.query.redirect);
  //   } else {
  //     $router.push("/");
  //   }
  // } catch {
  // } finally {
  //   loginLoading.value = false;
  // }
}

async function register() {
  // try {
  //   await form.value!.validate();
  //   registerLoading.value = true;
  //   const response = await $auth.fetch<any, ApiRegisterError>("/auth/register", {
  //     body: { email: state.value.email, password: state.value.password },
  //     method: "POST",
  //     key: Math.random().toString(36).substring(7),
  //   });
  //   if (response.error.value?.data.success === false) {
  //     $toast.add({ title: $t("validations.alreadyExists", { key: $t("forms.email") }), icon: "i-tabler-alert-circle", color: "red" });
  //     return;
  //   }
  //   await $auth.login(state.value.email, state.value.password);
  //   $router.push("/");
  // } catch {
  // } finally {
  //   registerLoading.value = false;
  // }
}

const oauthUrls = reactive<ApiOauthUrls>({
  google: undefined,
});
// const loadingOAuthUrls = ref(true);

onMounted(async () => {
  $loading.startLoading();
  const response = await $auth.$fetch<ApiOauthUrls, any>(`/oauth/urls`);
  // send http request to the backend to get the oauth urls
  $loading.stopLoading();
});

// function loginWithGithub() {
//   const clientId = $config.app.githubAppId;

//   const authUri = `https://github.com/login/oauth/authorize?client_id=${clientId}`;
//   document.location.assign(authUri);
// }
</script>

<template>
  <u-card class="max-w-xl">
    <template #header>{{ $t("pages.auth.login.loginFormTitle") }}</template>
    <u-form ref="form" class="gap-4 flex flex-col" :schema="schema" :state="state" @submit.prevent="login">
      <u-form-group :label="$t('common.forms.email')" name="email">
        <u-input v-model="state.email" dir="ltr" trailing-icon="i-tabler-mail">
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
      <u-button class="text-end hover:underline text-indigo-300" variant="link" @click="$modals.forgetPasswordModal = true">{{ $t("pages.auth.login.forgotYourPassword") }}</u-button>
      <div class="flex gap-4">
        <u-button class="flex-1" block icon="i-tabler-login" :disabled="registerLoading" :loading="loginLoading" type="submit"> {{ $t("common.actions.login") }} </u-button>
        <u-button class="flex-1" block icon="i-tabler-login" :disabled="loginLoading" :loading="registerLoading" type="button" variant="outline" @click.prevent="register">
          {{ $t("common.actions.register") }}
        </u-button>
      </div>
    </u-form>

    <u-divider class="my-5">{{ $t("pages.auth.login.orLoginWith") }}</u-divider>

    <div class="flex flex-col gap-2">
      <!-- <u-skeleton v-if="loadingOAuthUrls" class="h-4 w-[250px]" />
      <u-skeleton v-if="loadingOAuthUrls" class="h-4 w-[250px]" />
      <u-skeleton v-if="loadingOAuthUrls" class="h-4 w-[200px]" />
      <u-button v-if="oauthUrls.google" color="gray" variant="solid" block icon="i-logos-google-icon" @click="openUrl(oauthUrls.google)">{{ $t("pages.auth.login.loginWithGoogle") }}</u-button>
      <u-button v-if="oauthUrls.facebook" color="gray" variant="solid" block icon="i-logos-facebook" @click="openUrl(oauthUrls.facebook)">{{ $t("pages.auth.login.loginWithFacebook") }}</u-button>
      <u-button v-if="oauthUrls.github" color="gray" variant="solid" block icon="i-logos-github-icon" @click="openUrl(oauthUrls.github)">{{ $t("pages.auth.login.loginWithGithub") }}</u-button> -->
    </div>
  </u-card>
</template>
