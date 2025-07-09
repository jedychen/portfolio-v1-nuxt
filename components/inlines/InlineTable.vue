<template>
  <v-simple-table density="compact" class="inline-table pb-0">
    <template v-slot:default>
      <thead>
        <tr class="mr-4">
          <th
            v-for="row in content.rows"
            :key="row.summary"
            class="inline-table__title table-cell-first ml-0 pt-4"
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
            class="font-weight-light inline-table__content pb-4"
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
      border-bottom: thin solid rgba($neutral-white, 0) !important;
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

.inline-table__title {
  vertical-align: top;

  p {
    font-weight: $font-weight-bold;
    font-size: 14px;
    margin-bottom: 6px;
    color: $neutral-white;
  }
}

.inline-table__content {
  vertical-align: top;
  color: $neutral-grey-d;
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
