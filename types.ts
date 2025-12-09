export interface Category {
  id: string;
  label: string;
  optional?: boolean;
}

export type ClassData = Record<string, Record<string, string>>;

export interface CommentBankMap {
  [subjectKey: string]: {
    [categoryId: string]: {
      [level: string]: string[];
    };
  };
}

export interface MockTitlesMap {
  [subject: string]: string[];
}
