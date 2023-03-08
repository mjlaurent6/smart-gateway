import React, {useEffect, useState} from "react";
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

function AddEndDevice() {
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
    const [logs, setLog] = useState("{}")
    const onSubmit = async (data) => {
        const response = await fetch("/api/end_device/register", {
            method: 'POST', mode: 'cors', headers: {
                "Content-Type": "application/json"
            }, body: JSON.stringify(data),
        })
            .then((res) => res.json())
            .then((result) => {
                setLog(JSON.stringify(result, null, 2))
                if (result.success) reset();
            }).catch((e) => {
                setLog(JSON.stringify(e))
            })
    };
    return (
        <form className={"register-end-device"}>
            <Card sx={{maxWidth: 600}}>
                <CardContent>
                    <Box
                        sx={{
                            '& .MuiTextField-root': {m: 1, width: '50ch'},
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <Typography sx={{pl: 1, fontSize: 14}} variant="body2" gutterBottom>
                            Register End Device
                        </Typography>
                        <Controller
                            render={({field}) => <TextField size="small" variant="outlined"
                                                            label="End Device Name" {...field} />}
                            name="name"
                            control={control}
                            defaultValue=""
                        />
                        <Controller
                            render={({field}) => <TextField size="small" variant="outlined"
                                                            label="End Device App EUI" {...field} />}
                            name="devEui"
                            control={control}
                            defaultValue=""
                        />
                        <Controller
                            render={({field}) => <TextField size="small" variant="outlined"
                                                            label="End Device Dev EUI" {...field} />}
                            name="appEui"
                            control={control}
                            defaultValue=""
                        />
                        <TextField
                            id="filled-multiline-static"
                            label="Log"
                            multiline
                            rows={7}
                            value={logs}
                            variant="filled"
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

export default AddEndDevice;
