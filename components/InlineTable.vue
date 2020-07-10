<template>
  <div
    class="table"
  >
    <v-simple-table
      class="black"
    >
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left"></th>
            <th class="text-left"></th>
          </tr>
        </thead>
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
                'text-subtitle-1 table-cell-first font-weight-medium': index === 0,
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

<style lang="scss" scoped>
.table {
  tbody {
    td {
      width: 75%;
      
      &.table-cell-first {
        width: 25%;
      }
    }

    tr:hover {
      background-color: transparent !important;
    }
  }
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
