<script lang="ts">
import { defineComponent, ref } from 'vue';
import { PRODUCT_COMPARISON_DATA } from '@/constants/comparison';
import ComparisonSelection from '../components/ComparisonSelection.vue';

export default defineComponent({
  name: 'Comparison',
  components: {
    ComparisonSelection,
  },
  setup() {
    const products = ref(PRODUCT_COMPARISON_DATA);

    return {
      products,
    };
  },
});
</script>

<template>
  <div>
    <h1>You've Got Options</h1>

    <div class="comparison-table">
      <table>
        <thead>
          <tr>
            <th class="feature-column"></th>
            <th v-for="col in ['Pathfinder Pro', 'CareerEval']" :key="col">
              {{ col }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, index) in products"
            :key="index"
            :class="index % 2 === 0 ? 'grey-row' : ''"
          >
            <td class="feature-column">{{ item.feature }}</td>
            <td>{{ item.pathfinderPro }}</td>
            <td>{{ item.careerEval }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <comparison-selection></comparison-selection>
  </div>
</template>

<style scoped>
.comparison-table {
  width: 100%;
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
}

th,
td {
  padding: 12px 15px;
  text-align: center;
}

/* Bold text for the 2nd and 3rd columns */
td:nth-child(2),
td:nth-child(3) {
  font-weight: bold;
}

/* Increase font size for the titles of the 2nd and 3rd columns */
th:nth-child(2),
th:nth-child(3) {
  font-size: 1.5em;
}

.feature-column {
  width: 15%;
}

.grey-row {
  background-color: #f7f7f9;
}

/* Mobile Styles */
@media (max-width: 768px) {
  th,
  td {
    padding: 6px 8px;
  }

  th:nth-child(2),
  th:nth-child(3) {
    font-size: 1.15em;
  }
}
</style>
