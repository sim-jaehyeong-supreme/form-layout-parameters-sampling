<template>
  <el-button
    type="primary" 
    @click="updateVisibleSelectExtractConditionDialog(true)"
  >
    抽出条件選択
  </el-button>
  <select-extract-condition-dialog 
    :visible="visibleSelectExtractConditionDialog" 
    @select="handleSelectExtractCondition"
    @close="updateVisibleSelectExtractConditionDialog(false)" 
  />
  <form-layout-parameters-dialog 
    v-if="visibleFormLayoutParametersDialog" 
    :visible="visibleFormLayoutParametersDialog"
    :extract-condition-key="extractConditionKey" 
    @save="
      output = $event;
      clearExtractConditionKey();
      updateVisibleFormLayoutParametersDialog(false)
    "
    @close="
      clearExtractConditionKey(); 
      updateVisibleFormLayoutParametersDialog(false)
    " 
  />

  <div v-if="output">
    <div>Result</div>
    <div>Id: {{ output.id }}</div>
    <div>Title: {{ output.title }}</div>
    <table :border="1">
      <thead>
        <tr>
          <th colspan="4">Input Result</th>
        </tr>
        <tr>
          <td>Id</td>
          <td>Title</td>
          <td>InputType</td>
          <td>value</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in output.inputs">
          <th>{{ item.id }}</th>
          <td>{{ item.title }}</td>
          <td>{{ item.inputType }}</td>
          <td>{{ item.value }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ElButton } from "element-plus";
import { ref } from "vue";
import SelectExtractConditionDialog from "@/components/SelectExtractConditionDialog.vue";
import FormLayoutParametersDialog from "@/components/FormLayoutParametersDialog.vue";
import { Output } from "@/composables/use-form-layout-parameters";

/** 選択した抽出条件 */
const extractConditionKey = ref<string>("");

const handleSelectExtractCondition = (key: string) => {
  extractConditionKey.value = key;
  updateVisibleSelectExtractConditionDialog(false);
  updateVisibleFormLayoutParametersDialog(true);
}

const clearExtractConditionKey = () => {
  extractConditionKey.value = "";
}

const visibleSelectExtractConditionDialog = ref<boolean>(false);
const updateVisibleSelectExtractConditionDialog = (visible: boolean) => {
  visibleSelectExtractConditionDialog.value = visible;
};

const visibleFormLayoutParametersDialog = ref<boolean>(false);
const updateVisibleFormLayoutParametersDialog = (visible: boolean) => {
  visibleFormLayoutParametersDialog.value = visible;
};

const output = ref<Output | undefined>();
</script>
