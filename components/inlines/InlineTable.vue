<template>
  <div
    class="inline-table mb-8"
  >
    <v-simple-table>
      <template v-slot:default>
        <tbody>
          <tr
            v-for="row in content.rows"
            :key="row.summary"
          >
            <td
              v-for="(cell, index) in row.cells"
              width='30%'
              :key="cell.content"
              :colspan="cell.colspan"
              :rowspan="cell.rowspan"
              :class="{ 
                'text-h6 table-cell-first font-weight-light inline-table--title': index === 0,
                'text-subtitle-1 font-weight-light': index !== 0,
              }"
            >
              <div 
                v-html="$md.render(cell.content)"
                class="my-4"
              />
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>  
</template>

<style lang="scss">
.inline-table {
  border-width: 1px;
  border-style: solid;
  border-color: $theme-orange;

  tbody {
    td {
      width: 75%;
      
      &.table-cell-first {
        width: 25%;
      }

      a {
        color: $copy-color;
      }
    }

    tr:hover {
      background-color: transparent !important;
    }
  }
}

.inline-table--title {
  color: $copy-color-light-grey;
}
</style>

<script>
  export default {
    name: "InlineTable",

    props: {
      content: {
        default: null,
        type: Object,
      }
    },
  }
</script>
