import React, { useState } from 'react';
import { Button, Card, Form, Input } from 'antd';
import Paper from '@mui/material/Paper';
import { Box, TextField, InputAdornment, Checkbox, FormControl, FormGroup, FormControlLabel, FormLabel } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import IconButton from '@mui/material/IconButton';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import MenuItem from '@mui/material/MenuItem';
import { Controller } from 'react-hook-form';
const FormRegister = ({ onFinishFailed, onFinish, handleSubmit, errors, register, passwordsMatch, currencies, data, role, control }) => {



    // const [state, setState] = React.useState({
    //     Create: false,
    //     Read: false,
    //     Update: false,
    //     Delete: false,
    // });


    // const handleChange = (event) => {
    //     setState({
    //         ...state,
    //         [event.target.name]: event.target.checked,
    //     });
    // };
    // console.log(`⩇⩇:⩇⩇🚨  file: FormRegister.jsx:20  state :`, state);

    // const { Create, Read, Update, Delete } = state;
    // const error = [Create, Read, Update, Delete].filter((v) => v).length !== 2;




    return (
        <Box component="form" sx={{ flexGrow: 1, p: 3 }}
            onSubmit={handleSubmit(onFinish)}
        >
            <Paper elevation={3} sx={{ padding: 3 }}>

                <TextField
                    fullWidth
                    label="Username"
                    margin="normal"
                    {...register('username', {
                        required: 'Username is required',
                        minLength: {
                            value: 3,
                            message: 'Username must be at least 3 characters',
                        },
                    })}
                    error={!!errors.username}
                    helperText={errors.username?.message}
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <AccountCircleOutlinedIcon />
                                </InputAdornment>
                            ),
                        },
                    }}

                />

                <TextField
                    fullWidth
                    label="Password"
                    margin="normal"
                    {...register('password', {
                        required: 'Password is required',
                        minLength: {
                            value: 3,
                            message: 'Password must be at least 3 characters',
                        },
                    })}
                    error={!!errors.password}
                    helperText={errors.password?.message}
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <AccountCircleOutlinedIcon />
                                </InputAdornment>
                            ),
                        },
                    }}

                />
                <TextField
                    fullWidth
                    label="ConfirmPassword"
                    margin="normal"

                    {...register('cfpassword', {
                        required: 'ConfirmPassword is required',
                        minLength: {
                            value: 3,
                            message: 'ConfirmPassword must be at least 3 characters',

                        },

                    })}
                    error={!!errors.cfpassword}
                    helperText={errors.cfpassword?.message}
                    // error={!!errors.cfpassword || !passwordsMatch}
                    // helperText={errors.cfpassword?.message || (!passwordsMatch && 'Passwords must match')}
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <AccountCircleOutlinedIcon />
                                </InputAdornment>
                            ),
                        },
                    }}

                />

                <TextField
                    id="outlined-select-role"
                    fullWidth
                    select
                    defaultValue=""
                    label="Select Role"
                    {...register('role', { required: 'Role is required' })}
                    error={!!errors.role}
                    helperText={errors.role?.message}

                > <MenuItem value="">
                        --Please choose--
                    </MenuItem>
                    {role.map((role, index) => (
                        <MenuItem key={index} value={role}>
                            {role}
                        </MenuItem>
                    ))}
                </TextField>
                <FormControl>

                    {/* 
                    //todo Controller ช่วยให้เราสามารถรวม Checkbox เข้ากับ React Hook Form โดยไม่ต้องจัดการ value และ onChange */}
                    <Controller
                        name="permissions.create"
                        control={control}
                        render={({ field }) => (
                            <FormControlLabel
                                control={<Checkbox {...field} />}
                                label="Create"
                            />
                        )}
                    />
                    <Controller
                        name="permissions.read"
                        control={control}
                        render={({ field }) => (
                            <FormControlLabel
                                control={<Checkbox {...field} />}
                                label="Read "
                            />
                        )}
                    />
                    <Controller
                        name="permissions.update"
                        control={control}
                        render={({ field }) => (
                            <FormControlLabel
                                control={<Checkbox {...field} />}
                                label="Update "
                            />
                        )}
                    />
                    <Controller
                        name="permissions.delete"
                        control={control}
                        render={({ field }) => (
                            <FormControlLabel
                                control={<Checkbox {...field} />}
                                label="Delete "
                            />
                        )}
                    />
                    {/* ถ้าต้องการใช้ register ให้แบบนี้ แล้วค่อยกำหนด style เอาเอง */}
                    {/* <label>
                    <input type="checkbox" {...register("permissions.update")} />
                    Update
                </label> */}



                    <Button type="primary" htmlType="submit" >
                        Submit
                    </Button>

                </FormControl>


            </Paper>
        </Box >
    )
};
export default FormRegister;