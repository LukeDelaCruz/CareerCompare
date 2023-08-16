<script lang="ts">
import axios from 'axios';
import { defineComponent, reactive, ref } from 'vue';
import type { FormInstance, FormRules } from 'element-plus';
import { ElMessage } from 'element-plus';
import { isValidEmail, isValidPhone } from '../utils/form';

const API_BASE_URL = process.env.VUE_APP_API_BASE_URL;

interface RuleForm {
  email: string;
  phone: string;
  selectedProducts: string[];
}

export default defineComponent({
  name: 'ComparisonSelection',
  setup() {
    const formRef = ref<FormInstance>();
    const form = reactive<RuleForm>({
      selectedProducts: [],
      email: '',
      phone: '',
    });

    const checkEmail = (_: any, value: any, callback: any) => {
      if (!value) {
        return callback(new Error('Please input an email'));
      }
      setTimeout(() => {
        if (!isValidEmail(value)) {
          callback(new Error('Please enter a valid email'));
        } else {
          callback();
        }
      }, 100);
    };

    const checkPhoneNumber = (_: any, value: any, callback: any) => {
      if (!value) {
        return callback(new Error('Please input a phone number'));
      }
      setTimeout(() => {
        if (!isValidPhone(value)) {
          callback(new Error('Please enter a valid phone number'));
        } else {
          callback();
        }
      }, 100);
    };

    const rules = reactive<FormRules<typeof form>>({
      selectedProducts: [
        {
          type: 'array',
          required: true,
          message: 'Please select at least one option',
          trigger: 'change',
        },
      ],
      email: [{ required: true, validator: checkEmail, trigger: 'blur' }],
      phone: [{ required: true, validator: checkPhoneNumber, trigger: 'blur' }],
    });

    const resetForm = (formEl: FormInstance | undefined) => {
      if (!formEl) return;
      formEl.resetFields();
    };

    const submitForm = (formEl: FormInstance | undefined) => {
      if (!formEl) return;

      formEl.validate(async (valid) => {
        if (valid) {
          try {
            await axios.post(
              `${API_BASE_URL}/submit-comparison-table-choices`,
              form
            );
            ElMessage({
              message: "Thanks! We'll notify you as soon as updates come.",
              type: 'success',
            });

            // Push an event to the dataLayer to notify GTM
            (window as any).dataLayer = (window as any).dataLayer || [];
            (window as any).dataLayer.push({
              event: 'submitComparisonTableChoices',
              conversionType: [...form.selectedProducts].sort().join(', '), // Change this based on the specific conversion type
            });

            resetForm(formEl);
          } catch (error) {
            ElMessage.error('Sorry! Something went wrong trying to submit.');
          }
        } else {
          ElMessage.error('Sorry! One or more of your inputs are invalid.');
          return false;
        }
      });
    };

    return {
      formRef,
      form,
      rules,
      submitForm,
      resetForm,
    };
  },
});
</script>

<template>
  <div class="form-container">
    <el-form
      ref="formRef"
      :model="form"
      status-icon
      :rules="rules"
      size="large"
      label-width="120px"
    >
      <!-- Product Notification Choices -->
      <el-form-item label="Update me on" prop="selectedProducts">
        <el-checkbox-group v-model="form.selectedProducts">
          <el-checkbox label="Pathfinder Pro" name="selectedProducts"
            >Pathfinder Pro</el-checkbox
          >
          <el-checkbox label="CareerEval" name="selectedProducts"
            >CareerEval</el-checkbox
          >
        </el-checkbox-group>
      </el-form-item>

      <!-- Email Input -->
      <el-form-item label="Email" prop="email">
        <el-input
          v-model="form.email"
          placeholder="Enter your email"
        ></el-input>
      </el-form-item>

      <!-- Phone Input -->
      <el-form-item label="Phone" prop="phone">
        <el-input
          v-model="form.phone"
          placeholder="Enter your phone number"
        ></el-input>
      </el-form-item>

      <!-- Submit and Reset Buttons -->
      <el-form-item>
        <el-button type="primary" @click="submitForm(formRef)"
          >Submit</el-button
        >
        <el-button @click="resetForm(formRef)">Reset</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped>
.form-container {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}

.el-input {
  max-width: 235px;
}
</style>
