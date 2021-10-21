import { addSuggestion } from "services/firebase";
import { SuggestionForm } from "components/forms/SuggestionForm";
import { Alert } from "react-bootstrap";
import { useState } from "react";

export const SuggestView = (): JSX.Element => {
  const [saving, setSaving] = useState(false);

  const handleAddSuggestion = async (name: string) => {
    setSaving(true);
    await addSuggestion(name);
    setSaving(false);
  };

  return (
    <div>
      <SuggestionForm onSubmit={handleAddSuggestion} saving={saving} />
    </div>
  );
};
