export type TextRunData = {
  text: string;
  bold?: boolean;
  italics?: boolean;
  underline?: boolean;
  size?: number;
  color?: string;
};

export type ParagraphData = {
  children: TextRunData[];
  alignment?: "left" | "center" | "right" | "justified";
};

export type SectionData = {
  children: ParagraphData[];
};

export type DocStructure = {
  sections: SectionData[];
};

export type SelectedText = {
  sectionIndex: number;
  paragraphIndex: number;
  textIndex: number;
};
