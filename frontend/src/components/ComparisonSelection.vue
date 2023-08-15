<script lang="ts">
import axios from 'axios';
import { defineComponent, reactive, computed } from 'vue';
import { isValidEmail, isValidPhone } from '../utils/form';

const API_BASE_URL = process.env.VUE_APP_API_BASE_URL;

export default defineComponent({
  name: 'ComparisonSelection',
  setup() {
    const form = reactive({
      email: '',
      phone: '',
      selectedProducts: [],
    });

    const isFormInvalid = computed(() => {
      return (
        !form.email ||
        !form.phone ||
        !form.selectedProducts.length ||
        !isValidEmail(form.email) ||
        !isValidPhone(form.phone)
      );
    });

    const submitForm = async () => {
      if (isFormInvalid.value) {
        alert('Invalid input!');
        // Handle error (e.g., show a message to the user)
        return;
      }

      try {
        console.log(`${API_BASE_URL}/submitComparisonTableChoices`);
        await axios.post(`${API_BASE_URL}/submitComparisonTableChoices`, form);
        alert('Thanks for submitting!');

        // Reset form data
        form.email = '';
        form.phone = '';
        form.selectedProducts = [];
      } catch (error) {
        console.log(error);
        alert('Failed to submit!');
      }
    };

    return {
      form,
      isFormInvalid,
      submitForm,
    };
  },
});
</script>

<template>
  <div class="input-section">
    <el-form label-width="120px">
      <!-- Product Notification Choices -->
      <el-form-item label="Update me on">
        <el-checkbox-group>
          <el-checkbox-group v-model="form.selectedProducts">
            <el-checkbox label="Pathfinder Pro">Pathfinder Pro</el-checkbox>
            <el-checkbox label="CareerEval">CareerEval</el-checkbox>
          </el-checkbox-group>
        </el-checkbox-group>
      </el-form-item>

      <!-- Email Input -->
      <el-form-item label="Email">
        <el-input
          v-model="form.email"
          placeholder="Enter your email"
        ></el-input>
      </el-form-item>

      <!-- Phone Input -->
      <el-form-item label="Phone">
        <el-input
          v-model="form.phone"
          placeholder="Enter your phone number"
        ></el-input>
      </el-form-item>

      <!-- Submit Button -->
      <el-form-item>
        <el-button type="primary" @click="submitForm">Submit</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped>
.input-section {
  margin-top: 20px;
}

.el-input {
  max-width: 235px;
}
</style>
