<template>
  <v-simple-table density="compact" class="inline-table pb-0">
    <template v-slot:default>
      <thead>
        <tr class="mr-4">
          <th
            v-for="row in content.rows"
            :key="row.summary"
            class="font-weight-bold table-cell-first inline-table--title ml-0 pt-4"
          >
            <div v-html="$md.render(row.summary)" class="mt-2 mb-0" />
            <v-divider color="white" class="my-0"></v-divider>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr class="mr-4">
          <td
            v-for="row in content.rows"
            :key="row.summary"
            class="font-weight-light inline-table--content pb-4"
          >
            <div
              v-if="row.content != null"
              v-html="$md.render(row.content)"
              class="my-2"
            />
          </td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<style lang="scss">
.inline-table {
  thead {
    background-color: $card-background;
    th {
      border-bottom: thin solid rgba(255, 255, 255, 0) !important;
    }
  }

  tbody {
    background-color: $card-background;
    td {
      a {
        color: $neutral-grey-c;
      }
    }

    tr:hover {
      background-color: transparent !important;
    }
  }
}

.inline-table--title {
  vertical-align: top;
  font-family: "Noto Sans", sans-serif;
  font-size: 16px;
  font-weight: 400;
  color: white !important;
  p {
    margin-bottom: 6px;
  }
}

.inline-table--content {
  vertical-align: top;
  color: $neutral-grey-d;
  font-family: "Noto Sans", sans-serif;
  font-size: 12px;
  font-weight: 400;
}
</style>

<script>
export default {
  name: "InlineTable",

  props: {
    content: {
      default: null,
      type: Object
    }
  }
};
</script>
