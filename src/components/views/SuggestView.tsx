import { addSuggestion } from "services/firebase";
import { SuggestionForm } from "components/forms/SuggestionForm";
import { useState } from "react";
import { ADD, useToastContext } from "components/misc/ToastContext";

export const SuggestView = (): JSX.Element => {
  const [saving, setSaving] = useState(false);
  const toastContext = useToastContext();

  const handleAddSuggestion = async (name: string) => {
    if (name.length < 1) return;
    setSaving(true);
    await addSuggestion(name);
    setSaving(false);
    toastContext.toastDispatch({
      type: ADD,
      payload: {
        content: {
          title: "SUCCESS",
          message: `${name} was added successfully`,
        },
      },
    });
  };

  return (
    <div>
      <SuggestionForm onSubmit={handleAddSuggestion} saving={saving} />
    </div>
  );
};
