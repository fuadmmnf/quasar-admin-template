<template>
  <q-layout>
    <q-page-container>
      <q-page class="flex bg-image flex-center">
        <q-card
          v-bind:style="$q.screen.lt.sm ? { width: '80%' } : { width: '30%' }"
        >
          <q-card-section>
            <q-avatar size="103px" class="absolute-center shadow-10">
              <img src="profile.svg" />
            </q-avatar>
          </q-card-section>
          <q-card-section>
            <div class="text-center q-pt-lg">
              <div class="col text-h6 ellipsis">Log in</div>
            </div>
          </q-card-section>
          <q-card-section>
            <q-form class="q-gutter-md">
              <q-input
                filled
                v-model="mobile"
                label="Phone Number"
                lazy-rules
              />

              <q-input
                type="password"
                filled
                v-model="password"
                label="Password"
                lazy-rules
              />

              <div>
                <q-btn
                  label="Login"
                  @click="login"
                  type="button"
                  color="primary"
                />
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent } from "vue";
import { ref } from "vue";
import { useStore } from "src/stores/store";
import { api } from "boot/axios";
export default defineComponent({
  setup() {
    const store = useStore();

    return {
      mobile: ref(""),
      password: ref(""),
      store,
    };
  },
  methods: {
    async login() {
      const { mobile, password } = this;
      await this.authenticate(mobile, password);
      if (this.store.isAuthenticated) this.$router.push("/");
    },

    async checkIfUserVerified() {
      await api
        .post("v1/users/verified/check", {
          mobile: mobile,
        })
        .then((response) => {
          this.store.accessToken = response.data.access_token;
          this.store.refreshToken = response.data.refresh_token;
          localStorage.setItem("accessToken", this.accessToken);
          localStorage.setItem("refreshToken", this.refreshToken);
          this.store.isAuthenticated = true;
          this.getAuthenticatedUser();
        });
    },

    async authenticate(mobile, password) {
      await api
        .post("v1/clients/web/login", {
          mobile: mobile,
          password: password,
        })
        .then((response) => {
          this.store.accessToken = response.data.access_token;
          this.store.refreshToken = response.data.refresh_token;
          localStorage.setItem("accessToken", this.accessToken);
          localStorage.setItem("refreshToken", this.refreshToken);
          this.store.isAuthenticated = true;
          this.getAuthenticatedUser();
        });
    },

    async getAuthenticatedUser() {
      const headers = {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      };
      await api
        .get("v1/profile", { headers: headers })
        .then((response) => {
          this.store.user = response.data.data;
          localStorage.setItem("user", JSON.stringify(response.data.data));
          this.store.isAuthenticated = true;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
});
</script>

<style>
.bg-image {
  background-image: linear-gradient(135deg, #7028e4 0%, #e5b2ca 100%);
}
</style>
