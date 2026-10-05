export type CreateEventDraft = {
  title: string;
  category: string;
  description: string;
};

const initialDraft: CreateEventDraft = {
  title: "",
  category: "",
  description: "",
};

let draft: CreateEventDraft = {
  ...initialDraft,
};

export function getCreateEventDraft(): CreateEventDraft {
  return { ...draft };
}

export function updateCreateEventDraft(
  updates: Partial<CreateEventDraft>,
): CreateEventDraft {
  draft = {
    ...draft,
    ...updates,
  };

  return { ...draft };
}

export function resetCreateEventDraft(): void {
  draft = { ...initialDraft };
}
