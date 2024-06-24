<template>
    <common-form class="checkbox-form" :title="data.info.title" :description="data.info.description">
        <input-with-label :text="{
            type: 'single',
            inputLabel: data.info.inputLabel,
        }">
            <el-checkbox-group :model-value="data.value" @update:model-value="$emit('update:formData', $event as Array<string>)">
                <el-checkbox v-for="item in data.options" :key="item.value" :label="item.label" :value="item.value" />
            </el-checkbox-group>
        </input-with-label>
    </common-form>
</template>

<script setup lang="ts">
import type { CheckboxForm } from "@/composables/use-form-layout-parameters";
import { ElCheckboxGroup, ElCheckbox } from "element-plus";
import CommonForm from "@/components/inputs/commons/CommonForm.vue";
import InputWithLabel from "@/components/inputs/commons/InputWithLabel.vue";

defineProps<{
    data: CheckboxForm;
}>();
defineEmits<{
    (e: "update:formData", value: Array<string>): void;
}>();


</script>
