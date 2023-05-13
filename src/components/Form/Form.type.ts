type FormType = "create" | "update";

interface IForm {
  formTitle: string;
  onClose: () => void;
  onSave: () => void;
  titleValue: string;
  descriptionValue: string;
  onDescriptionChange: (data: string) => void;
  onTitleChange: (data: string) => void;
  type: FormType;
}

export type { IForm };
