import { Form, ProgressBar } from "react-bootstrap";
import React, { useState } from "react";
import { storage } from "services/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { ADD, useToastContext } from "components/misc/ToastContext";

export const UploadForm = (): JSX.Element => {
  const [progress, setProgress] = useState(0);
  const toastContext = useToastContext();

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
  };

  const handleChange = (e: React.BaseSyntheticEvent) => {
    if (e.target?.files) {
      const file = e.target.files[0];
      const fileRef = ref(storage, file.name);
      const uploadTask = uploadBytesResumable(fileRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              setProgress(progress);
              break;
          }
        },
        (error) => {
          // todo handle unsuccessful uploads
          console.error(error.message);
        },
        () => {
          // Successful upload
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            toastContext.toastDispatch({
              type: ADD,
              payload: {
                content: {
                  title: "UPLOAD SUCCESS",
                  message: (
                    <a rel="noreferrer" target="_blank" href={`${downloadURL}`}>
                      Watch movie now!
                    </a>
                  ),
                },
              },
            });
          });
        }
      );
    }
  };

  return (
    <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
      <fieldset disabled={false}>
        <Form.Group controlId="file">
          <Form.Control
            type="file"
            name="file"
            accept="video/mp4,video/x-m4v"
            onChange={handleChange}
          />
        </Form.Group>
        <ProgressBar
          now={progress}
          label={`${Math.round(progress)}%`}
          className={"mb-2 mt-2"}
        />
      </fieldset>
    </Form>
  );
};
