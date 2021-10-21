import { Form } from "react-bootstrap";
import React, { useState } from "react";
import LoadingButton from "components/misc/LoadingButton";

interface SuggestionFormProps {
  saving: boolean;
  onSubmit(name: string): void;
}

export const SuggestionForm = (props: SuggestionFormProps): JSX.Element => {
  const [name, setName] = useState("");

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    props.onSubmit(name);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <fieldset disabled={props.saving}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Movie title</Form.Label>
          <Form.Control
            type="text"
            value={name}
            placeholder="Enter movie title"
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <LoadingButton
          variant="primary"
          type="submit"
          loadingCondition={props.saving}
        >
          Save
        </LoadingButton>
      </fieldset>
    </Form>
  );
};
