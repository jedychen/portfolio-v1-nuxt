<template>
  <v-container
    v-if="!isAuthorised && needAuthentication"
    fill-height
    fluid
    class="password-page__container"
  >
    <v-row align="center"
      justify="center">
      <v-col
        cols="6"
        md="2"
      >
        <v-text-field
          v-model="inputValue"
          placeholder="Password"
          color="info"
          :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
          :type="show ? 'text' : 'password'"
          filled
          required
          :error-messages="errorMessages"
          @click:append="show = !show"
        ></v-text-field>
      </v-col>
      <v-col
        cols="2"
        md="1"
      >
        <v-btn
          fab
          middle
          color="green"
          @click="loginUser()"
          class="mb-7"
        >
          <v-icon>mdi-arrow-right-bold</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<style lang="scss" scoped>
.password-page__container {
  height: 100vh;
}
.page-enter-active, .page-leave-active {
  transition: opacity .5s;
}
.page-enter, .page-leave-to {
  opacity: 0;
}
</style>

<script>
export default {
  data: function() {
    return {
      inputValue: '',
      isAuthorised: false,
      needAuthentication: true,
      show: false,
      errorMessages: '',
    }
  },

  mounted() {
    this.needAuthentication = this.$store.getters['passwordStore/getProtectionState']
    this.isAuthorised = this.$passwordProtect.isAuthorised()
    if (this.needAuthentication == false) {
      this.$passwordProtect.authorise('jedy')
      this.$router.push(this.$route.query.previousPath)
    }
  },

  methods: {
    loginUser() {
      this.$passwordProtect.authorise(this.inputValue)
      this.isAuthorised = this.$passwordProtect.isAuthorised()
      if (this.isAuthorised == true)
        this.$router.push(this.$route.query.previousPath)
      else
        this.errorMessages = 'Wrong password...'
    },
  }
}
</script>
