<template>
    <el-dialog  :model-value="visible" width="900" destroy-on-close center @close="$emit('close')">
            <template #header>
                <div class="header">
                    <div class="title">{{ innerData?.extractTitle }}</div>
                    <div class="description">{{ innerData?.extractDescription }}</div>
                </div>
            </template>
            <div class="body">
                <template v-for="(item, index) in innerData?.inputDataList" :key="item.info.id">
                    <radio-form
                        v-if="item.inputType === 'radio'"
                        :data="item"
                        @update:form-data="updateFormData(index, 'radio', $event)"
                    />
                    <select-form
                        v-if="item.inputType === 'select'"
                        :data="item"
                        @update:form-data="updateFormData(index, 'select', $event)"
                    />
                    <input-form
                        v-if="item.inputType === 'input'"
                        :data="item"
                        @update:form-data="updateFormData(index, 'input', $event)"
                    />
                    <input-with-select-form
                        v-if="item.inputType === 'input_with_select'"
                        :data="item"
                        @update:form-data="updateFormData(index, 'input_with_select', $event)"
                    />

                    <checkbox-form
                        v-if="item.inputType === 'checkbox'"
                        :data="item"
                        @update:form-data="updateFormData(index, 'checkbox', $event)"
                    />

                    <sql-form
                        v-if="item.inputType === 'sql'"
                        :data="item"
                        @update:form-data="updateFormData(index, 'sql', $event)"
                    />

                    <double-input-form
                        v-if="item.inputType === 'double_input'"
                        :data="item"
                        @update:form-data="updateFormData(index, 'double_input', $event)"
                    />
                    <double-input-list-form
                        v-if="item.inputType === 'double_input_list'"
                        :data="item"
                        @update:form-data="updateFormData(index, 'double_input_list', $event)"
                    />
                    <double-input-date-form
                        v-if="item.inputType === 'double_input_date'"
                        :data="item"
                        @update:form-data="updateFormData(index, 'double_input_date', $event)"
                    />
                </template>
            </div>
            <template #footer>
                <el-button round type="primary" @click="output && $emit('save', output)">保存</el-button>
                <el-button round @click="$emit('close')">キャンセル</el-button>
            </template>
    </el-dialog>
</template>

<script setup lang="ts">
import { Output, useFormLayoutParameters } from "@/composables/use-form-layout-parameters";
import { ElDialog, ElButton } from "element-plus";
import { computed } from "vue";
import RadioForm from "@/components/inputs/RadioForm.vue";
import SelectForm from "@/components/inputs/SelectForm.vue";
import InputForm from "@/components/inputs/InputForm.vue";
import InputWithSelectForm from "@/components/inputs/InputWithSelectForm.vue";
import CheckboxForm from "@/components/inputs/CheckboxForm.vue";
import SqlForm from "@/components/inputs/SqlForm.vue";
import DoubleInputForm from "@/components/inputs/DoubleInputForm.vue";
import DoubleInputListForm from "@/components/inputs/DoubleInputListForm.vue";
import DoubleInputDateForm from "@/components/inputs/DoubleInputDateForm.vue";

const props = defineProps<{
    visible: boolean;
    extractConditionKey: string;
}>();
defineEmits<{
    (e: "save", output: Output): void;
    (e: "close"): void;
}>();

const { innerData, updateFormData, output } = useFormLayoutParameters(computed(() => props.extractConditionKey));


</script>

<style scoped lang="scss">
.header{
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    .title {
        font-size: 18px;
    }
    .description {
        font-size: 14px;
        color: gray;
    }
}

.body {
    height: 500px;
    overflow-y: auto;
}
</style>
