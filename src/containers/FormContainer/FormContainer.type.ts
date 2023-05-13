interface INote {
  id: string;
  title: string;
  date: Date;
  description: string;
  isSelected?: boolean;
}

interface IForm {
  close: () => void;
  selectedNote?: INote | null;
}

export type { IForm };
