<template>
    <common-form class="double-input-date-form" :title="data.info.title" :description="data.info.description">
        <input-with-label :text="{
            type: 'double',
            leftInputLabel: data.info.leftInputLabel,
            rightInputLabel: data.info.rightInputLabel,
        }">
            <el-date-picker :model-value="data.value.left" value-format="YYYYMMDD" @update:model-value="$emit('update:formData', {left: $event, right: data.value.right})" />
            <el-date-picker :model-value="data.value.right" value-format="YYYYMMDD" @update:model-value="$emit('update:formData', {left: data.value.left, right: $event})" />
        </input-with-label>
    </common-form>
</template>

<script setup lang="ts">
import type { DoubleInputDateForm } from "@/composables/use-form-layout-parameters";
import { ElDatePicker } from "element-plus";
import CommonForm from "@/components/inputs/commons/CommonForm.vue";
import InputWithLabel from "@/components/inputs/commons/InputWithLabel.vue";

defineProps<{
    data: DoubleInputDateForm;
}>();
defineEmits<{
    (e: "update:formData", value: {
        left: string;
        right: string;
    }): void;
}>();


</script>
