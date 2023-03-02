import React from "react";
import { useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import { Controller } from "react-hook-form";

export const FormInputText = ({ name, onChange, label }) => {
  return (
    <TextField id={name} label={label} variant="outlined" onChange={onChange} />
  );
};

function AddGateway() {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm();

  return (
    <form
      className={"register-gateway"}
      onSubmit={handleSubmit((data) => console.log(data))}
    >
      <Controller
        name={"textValue"}
        control={control}
        render={({ field: { onChange, value } }) => (
          <FormInputText
            onChange={onChange}
            value={value}
            label={"Text Value"}
          />
        )}
      />
      <div className="form__group">
        <input
          {...register("gateway_id")}
          type="text"
          id="gateway_id"
          className="form__field"
          placeholder="Gateway ID"
        />
        <label htmlFor="gateway_id" className="form__label">
          Gateway ID
        </label>
        {errors.devEUI && <p>Dev EUI is required.</p>}
      </div>
      <div className="form__group">
        <input
          {...register("gatewayEUI")}
          type="text"
          id="gateway_eui"
          className="form__field"
          placeholder="Gateway EUI"
        />
        <label htmlFor="gateway_eui" className="form__label">
          Gateway EUI
        </label>
        {errors.appEUI && <p>App EUI is required.</p>}
      </div>
      <div className="form__group">
        <Button type="submit" variant="contained" endIcon={<SendIcon />}>
          Submit
        </Button>
      </div>
    </form>
  );
}

export default AddGateway;
