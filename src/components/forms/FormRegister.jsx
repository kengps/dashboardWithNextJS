import React from 'react';
import { Button, Card, Checkbox, Form, Input } from 'antd';
import Paper from '@mui/material/Paper';
import { Box, TextField, InputAdornment } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import IconButton from '@mui/material/IconButton';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import MenuItem from '@mui/material/MenuItem';
const FormRegister = ({ onFinishFailed, onFinish, handleSubmit, errors, register, passwordsMatch, currencies }) => {





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
                    id="outlined-select-role"
                    fullWidth
                    select
                    label="Select Role"
                    defaultValue="admin"
                    {...register('role', { required: 'Role is required' })}
                    error={!!errors.role}
                    helperText={errors.role?.message}

                >
                    {currencies.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>


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


                <Button type="primary" htmlType="submit" >
                    Submit
                </Button>


            </Paper>
        </Box >
    )
};
export default FormRegister;