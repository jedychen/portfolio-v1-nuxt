<template>
  <div
    class="table"
  >
    <v-simple-table
    >
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
                'text-subtitle-1 table-cell-first font-weight-medium': index === 0,
                'text-subtitle-1 font-weight-light': index !== 0,
              }"
              
            >
              <div 
                v-html="$md.render(cell.content)"
                class="my-4"
                align="start"
                justify="end"
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
  td {
    width: 75%;
    
    &.table-cell-first {
      width: 25%;
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
