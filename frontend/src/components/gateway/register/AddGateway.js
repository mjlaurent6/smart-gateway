import React, {useEffect} from "react";
import {useForm} from "react-hook-form";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import {Controller} from "react-hook-form";
import Box from "@mui/material/Box";
import {Card, CardActions, CardContent} from "@mui/material";
import Typography from "@mui/material/Typography";

export const FormInputText = ({name, onChange, label}) => {
    return (
        <TextField id={name} label={label} variant="outlined" onChange={onChange} size="small"/>
    );
};

function AddGateway() {
    const {
        register,
        handleSubmit,
        reset,
        control,
        formState,
        formState: {errors, isSubmitSuccessful},
    } = useForm({
        defaultValues: {}
    });
    const onSubmit = (data) => {
        console.log(data);
        reset();
    };

    useEffect(() => {
        if (formState.isSubmitSuccessful) {
            reset({});
        }
    }, [formState, isSubmitSuccessful, reset]);
    return (
        <form className={"register-gateway"}>
            <Card sx={{maxWidth: 500}}>
                <CardContent>
                    <Box
                        sx={{
                            '& .MuiTextField-root': {m: 1, width: '25ch'},
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <Typography sx={{pl: 1, fontSize: 14}} variant="body2" gutterBottom>
                            Register Gateway
                        </Typography>
                        <Controller
                            render={({ field }) => <TextField size="small" variant="outlined" label= "Gateway Name" {...field} />}
                            name="gatewayName"
                            control={control}
                            defaultValue=""
                        />
                        <Controller
                            render={({ field }) => <TextField size="small" variant="outlined" label= "Gateway EUI" {...field} />}
                            name="gatewayEUI"
                            control={control}
                            defaultValue=""
                        />
                    </Box>
                </CardContent>
                <CardActions>
                    <Button onClick={handleSubmit(onSubmit)} variant={"outlined"}>Submit</Button>
                    <Button onClick={() => reset({})}>Reset</Button>
                </CardActions>
            </Card>
        </form>
    );
}

export default AddGateway;
