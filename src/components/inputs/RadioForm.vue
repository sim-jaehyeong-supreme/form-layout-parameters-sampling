<template>
    <common-form class="radio-form" :title="data.info.title" :description="data.info.description">
        <input-with-label :text="{
            type: 'single',
            inputLabel: data.info.inputLabel,
        }">
            <el-radio-group :model-value="data.value" @update:model-value="$emit('update:formData', $event as string)">
                <el-radio v-for="option in data.options" :value="option.value" :label="option.label" />
            </el-radio-group>
        </input-with-label>

    </common-form>
</template>

<script setup lang="ts">
import type { RadioForm } from "@/composables/use-form-layout-parameters";
import { ElRadioGroup, ElRadio } from "element-plus";
import CommonForm from "@/components/inputs/commons/CommonForm.vue";
import InputWithLabel from "@/components/inputs/commons/InputWithLabel.vue";

defineProps<{
    data: RadioForm;
}>();

defineEmits<{
    (e: "update:formData", value: string): void;
}>();
</script>
