import { useAxios } from "@/plugins/use-axios";
import { ComputedRef, computed, ref, unref, watch } from "vue";
import { useQuery } from "vue-query";


/** 共通使用項目（アイテムを特定・表示するため） */
type CommonInfo = {
  id: string /** 対象アイテムの識別ID（必須） */;
  title: string /** タイトル（必須） */;
  description?: string /** 説明（任意） */;
};

/** 単一の入力欄の場合のインプットラベル定義 */
export type SingleInputLabel = {
  inputLabel?: string /** インプットのラベル（任意） */;
};

/** 複数の入力欄の場合のインプットラベル定義 */
export type DoubleInputLabel = {
  leftInputLabel?: string;
  rightInputLabel?: string;
};

/** 選択肢の値の定義 */
type Option = {
  label: string /** 選択肢の意味を示すラベル文字列 */;
  value: string /** フォームで送信する値 */;
};

/** Radio：ラジオグループ（複数選択不可） */
export type RadioForm = {
  inputType: "radio" /** インプットタイプ */;
  value: string /** インプット値 */;
  info: CommonInfo &
  SingleInputLabel /** 共通使用項目（アイテムを特定・表示するため） */;
  options: Array<Option> /** 選択肢の値 */;
};

/** Select：セレクトボックス */
export type SelectForm = {
  inputType: "select";
  value: string;
  info: CommonInfo & SingleInputLabel;
  options: Array<Option>;
};

/** Input：単一行の入力欄 */
export type InputForm = {
  inputType: "input";
  value: string;
  info: CommonInfo & SingleInputLabel;
};

/** Input + Select：単一行の入力欄・セレクトボックス */
export type InputWithSelectForm = {
  inputType: "input_with_select";
  value: {
    input: string;
    select: string;
  };
  info: CommonInfo & DoubleInputLabel;
  selectOptions: Array<Option>;
};

/** Checkbox：チェックボックス（複数選択可能） */
export type CheckboxForm = {
  inputType: "checkbox";
  value: Array<string>;
  info: CommonInfo & SingleInputLabel;
  options: Array<Option>;
};

/**  SQL：複数行のプレーンテキスト入力欄 */
export type SqlForm = {
  inputType: "sql";
  value: string;
  info: CommonInfo & SingleInputLabel;
};

/** DoubleInputForm、DoubleInputListFormに両方使うための定義 */
export type DoubleInputFormValue = {
  left: string;
  right: string;
};

/** Double Input：単一行の入力欄・単一行の入力欄 */
export type DoubleInputForm = {
  inputType: "double_input";
  value: DoubleInputFormValue;
  info: CommonInfo & DoubleInputLabel;
};

/** Double Input List：単一行の入力欄・単一行の入力欄を複数行に入力 */
export type DoubleInputListForm = {
  inputType: "double_input_list";
  value: Array<DoubleInputFormValue>;
  info: CommonInfo & DoubleInputLabel;
};

/** Double Input Date：日付形式のテキスト入力欄 */
export type DoubleInputDateForm = {
  inputType: "double_input_date";
  value: {
    left: string /** YYYYMMDD */;
    right: string /** YYYYMMDD */;
  };
  info: CommonInfo & DoubleInputLabel;
};

type GetExtractExtractIdResponseBody = {
  id: string;
  extractTitle: string; // 抽出条件のタイトル（必須）
  extractDescription?: string; // 抽出条件の説明(任意)
  inputDataList: Array<InputData>; // 該当インプット情報リスト
};

export type InputData =
  | RadioForm
  | SelectForm
  | InputForm
  | InputWithSelectForm
  | CheckboxForm
  | SqlForm
  | DoubleInputForm
  | DoubleInputListForm
  | DoubleInputDateForm;

export type InputType =
  | "radio"
  | "select"
  | "input"
  | "input_with_select"
  | "checkbox"
  | "sql"
  | "double_input"
  | "double_input_list"
  | "double_input_date";

export type InputValue = {
  radio: string;
  select: string;
  input: string;
  input_with_select: {
    input: string;
    select: string;
  };
  checkbox: Array<string>;
  sql: string;
  double_input: DoubleInputFormValue;
  double_input_list: Array<DoubleInputFormValue>;
  double_input_date: {
    left: string;
    right: string;
  };
};

export type Output = {
  id: string;
  title: string;
  inputs: Array<OutputInput>;
}

export type OutputInput = {
  id: string;
  title: string;
  inputType: string;
  value: string;
};

export const useFormLayoutParameters = (extractConditionKey: ComputedRef<string>) => {

  const { axios } = useAxios();
  const { data } = useQuery<unknown, unknown, GetExtractExtractIdResponseBody>([extractConditionKey], () => {
    return axios.get(`/form_layout_parameters/${unref(extractConditionKey)}`)
  }, {
    cacheTime: 0,
  });
  const resultData = computed<GetExtractExtractIdResponseBody | undefined>(() => data.value?.data);
  const innerData = ref<GetExtractExtractIdResponseBody| undefined>(undefined);

  const stop = watch(resultData, () => {
    if (resultData.value) {
      innerData.value = JSON.parse(JSON.stringify(resultData.value));
      stop();
    }
  });

  const updateFormData = <K extends InputType>(index: number, _inputType: K, inputValue: InputValue[K]) => {
    if (innerData.value) {
      innerData.value.inputDataList[index].value = inputValue;
    }
  };

  const output = computed<Output | undefined>(() => {
    if (innerData.value) {
      return {
        id: innerData.value.id,
        title: innerData.value.extractTitle,
        inputs: innerData.value.inputDataList.map((v) => {
          switch (v.inputType) {
            case "radio":
            case "select":
            case "input": 
            case "sql": {
              return {
                id: v.info.id,
                title: v.info.title,
                inputType: v.inputType,
                value: v.value,
              };
            }
            case "input_with_select": {
              return {
                id: v.info.id,
                title: v.info.title,
                inputType: v.inputType,
                value: `[${v.value.input}, ${v.value.select}]`,
              };
            }
            case "checkbox": {
              return {
                id: v.info.id,
                title: v.info.title,
                inputType: v.inputType,
                value: v.value.join(","),
              };
            }
            case "double_input": {
              return {
                id: v.info.id,
                title: v.info.title,
                inputType: v.inputType,
                value: `[${v.value.left}, ${v.value.right}]`,
              };
            }
            case "double_input_list": {
              return {
                id: v.info.id,
                title: v.info.title,
                inputType: v.inputType,
                value: v.value.map((value) => `[${value.left}, ${value.right}]`).join(","),
              };
            }
            case "double_input_date": {
              return {
                id: v.info.id,
                title: v.info.title,
                inputType: v.inputType,
                value: `[${v.value.left} ~ ${v.value.right}]`,
              };
            }
          }
        })
      }
    } else {
      return undefined;
    }
  })

  return {
    resultData,
    innerData,
    updateFormData,
    output,
  };
}