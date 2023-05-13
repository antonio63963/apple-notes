interface INote {
  id: string;
  title: string;
  date: Date;
  description: string;
  isSelected?: boolean | null;
}

interface INotesList {
  notes: INote[] | [];
  onNoteSelect: (data: string) => void;
  isOpen: boolean;
}

export type { INotesList };
