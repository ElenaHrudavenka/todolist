import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import { IconButton, TextField } from "@material-ui/core";
import { AddBox } from "@material-ui/icons";

type AddItemTypes = {
  callBack: (title: string) => void;
  disabled?: boolean;
};

//const AddItemForm = (props: AddItemTypes) => {
//ниже деструктуризация того что выше, тогда вместо props.callBack можно использовать callBack
export const AddItemForm = React.memo((props: AddItemTypes) => {
  const { callBack, ...pr } = props;

  let [title, setTitle] = useState("");
  let [error, setError] = useState<string | null>(null);

  const addTask = () => {
    if (title.trim() !== "") {
      //props.callBack(title.trim());
      //после деструктуризации пропсов можно записать бе слова props
      callBack(title.trim());
      setTitle("");
    } else {
      setError("Title is required");
    }
  };

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (error !== null) {
      setError(null);
    }

    if (e.charCode === 13) {
      addTask();
    }
  };

  return (
    <div>
      <TextField
        variant="outlined"
        value={title}
        onChange={onChangeHandler}
        onKeyPress={onKeyPressHandler}
        size="small"
        error={!!error}
        label="Title"
        helperText={error}
      />

      {/* <input value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   className={error ? "error" : ""}
            />*/}
      {/*<Button onClick={addTask} variant="contained" style={{maxWidth: '38px', maxHeight: '38px', minWidth: '38px', minHeight: '38px'}}>+</Button>*/}
      <IconButton onClick={addTask} color="primary" disabled={pr.disabled}>
        <AddBox />
      </IconButton>
      {/* {error && <div className="error-message">{error}</div>}*/}
    </div>
  );
});
