<template>
  <div>
    <v-img
      :src="content.image.file.url"
      :alt="content.image.title"
      lazy-src="data:image/jpeg;base64,/9j/2wCEAAIBAQEBAQIBAQIDAgECAwMCAgICAwMDAwMDAwMFAwQEBAQDBQUFBgYGBQUHBwgIBwcKCgoKCgwMDAwMDAwMDAwBAgICBAMEBwUFBwoIBwgKDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDP/dAAQAFP/uAA5BZG9iZQBkwAAAAAH/wAARCABaAKADABEAAREBAhEB/8QAbgABAQEBAQEAAAAAAAAAAAAAAAEIBwYEAQEBAQACAwEAAAAAAAAAAAAAAQgEBQMGBwkQAAICAgEEAgIDAQAAAAAAAAABFBVRYRECEyFSMUEFQgMEYoERAQEBAQEBAAAAAAAAAAAAAAAUExESAf/aAAwDAAABEQIRAD8AyOct2IAAAAAAAAAAAAAAAAAAAAAB/9DI5y3YgAAAAAAAAAAAAAAAAAAAAAH/0cldpnI9/Hb4/TtMe1w+naY9mH07THsw+naY9pj9O11f9Hv4uP07THsw+j/iY9pj9O0x7XD6P+JoezD6dpj2YfTtdQ9mH07THsw+naY9mH07XUPZh9O0x7MPp2er5Hsx+naY9mH07THsw+naY9mH1//SyvGeDwavfYiM8DZIhf1ngbLERngbJERWNliIrwNSIjPA2IiM38IbJERdDZYiK8DYiIzwNSIjPA1SIi8/Q2WIivA1IiK8DUiIrGxERXgbJERdDZYiKNiIivA1In//083QNHQUPtsBX6FBAQNCghIGhQQkDQoISBoUEJA0KCEgaFBCQNCghIDwKCEgaFBCQNCggIGhQQkDQoISBoUEJA0KCEgaFBCQNCghIGhQQkDQoIX/1OEwNHolDUEJA0KCAgaFBCQNCghIGhQQkDQoISBoUEJA0KCEgaFBCQNCggIGhQQkDQoISBoUEJA0KCEgaFBCQNCghIGhQQkDQoISBoUEJA0KCF//1eQwtHynds6QhaLuRkLRNyMhPA3JCFou5GQ9DckIWibkhC0NyQhaG5GQtF3IyFobkhC0NyMhaJuRkLRdyMhaG5GQtE3IyFou5GQtE3JCFou5GQ9Dcjf/1vCUrwfCbG6sileBYZFK8CsyKR/HAsMileBYmQvwrx5Fi5FK8CsyKV4FZkUrwKzIpXgVmRStfQsMileBWZFK8eRYZFK8CsyKV4JYZFK8FsMileBYZFK8eBWZFK8CwyH+FeBYZP/X+d/gNGXbW9vJQaFq+Sg0LU8lBoWr5KD/ACLU8lBoWnkoH6ktPJQPBbTyUGES08lA/Utp5KD/ACLTyUGhavkoH6i1PJQffAtPJQaFp5KDj6Fp5KDQtPJQPAtPJQaJaeSg0LTw/9D11AsGLrW/OLQp/qLTiUKwW04tCvnglqcShXr5Fi8WhWBanEoNFtOFCn+vgWrwX4FepLU4UK++kWrxaFceOkWJxKFevgWrwoV6ltOLQpfqS04lCvUWnChWPAtOFCvUtqcKFeotXi0KX0S1OJQrAtOP/9Hr1Ql4SMDVN/FQsCoKdYFQL8R04FScKjp+OBUvCn6cCo4VCX14FQVCx5FRwqEvotQVC4+CVBUJ+WhUFQsCoKhYFRwqFgVBUdOBUFR04FRwqOnAqCoWBUcKhYFRwqFgVD//0u7cI/PJv8SXPwOhwihwiKnCHUXhYHQ4XHwOqcIqHCwOhwiBwh1ThF+InCJ0XhFDhYHVThE6Lwh1BJc/A6pwiicInUf/2Q=="
      aspect-ratio="1.7"
      @load="onReady"
    >
      <template v-slot:placeholder>
        <v-row
          class="fill-height ma-0"
          align="center"
          justify="center"
        >
          <v-progress-circular
            indeterminate
            color="grey lighten-5"
          />
        </v-row>
      </template>
    </v-img>
    <p class="subheading mt-2">
      {{ content.image.description }}
    </p>
  </div>
</template>

<script>
export default {
  name: "InlineImage",

  props: {
    content: {
      default: null,
      type: Object
    },
  },

  data() {
    return {}
  },

  methods: {
    onReady() {
      this.$emit("ready");
    }
  }
}
</script>
