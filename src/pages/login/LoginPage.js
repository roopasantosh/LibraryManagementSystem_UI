import { Button, Container, Grid, InputAdornment } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { Code, Lock, Visibility, VisibilityOff } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { IsNullOrEmpty, getTokenValue } from '../../helpers/utility';
import { loginUserRequest } from '../../store/authentication/auth.actions';
import { getAccessToken } from '../../store/authentication/auth.selector';

export default function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [visible, setVisible] = useState(false);
    const [values, setValues] = React.useState({
        userName: "",
        password: "",
    });

    const [isValidated, setValidated] = React.useState(false);

    const { accessToken } = useSelector((state) => {
        return {
            accessToken: getAccessToken(state),
        }
    });

    useEffect(() => {
        if (!IsNullOrEmpty(accessToken)) {
            const user = getTokenValue(accessToken);
            if (user.isResetPassword) {
                setOpen(true);
            }
            else {
                navigate("/");
            }
        }
    }, [accessToken]);

    const validate = () => {
        if (IsNullOrEmpty(values.userName)) {
            return false;
        }
        if (IsNullOrEmpty(values.password)) {
            return false;
        }
        return true;
    }

    const handleReset = () => {
        setValidated(false);
        setValues({
            userName: "",
            password: "",
        })
    }

    const handleSave = () => {
        if (validate()) {
            dispatch(loginUserRequest({
                userName: values.userName,
                password: values.password
            }))
        }
        else {
            setValidated(true);
        }
    }

    return (
        <Container maxWidth="xs" >
            
            <h4 className='text-center p-4'>Login</h4>
            <Grid container spacing={4}>
                <Grid xs={12} sm={12} >
                    <TextField
                        variant='outlined'
                        placeholder='Email'
                        label="Email"
                        value={values.userName}
                        onChange={(e) => setValues({ ...values, userName: e.target.value })}
                        fullWidth
                        margin='dense'
                        className='px-2'
                        InputProps={{
                            startAdornment: <InputAdornment position='start'>
                                <Code color='disabled' />
                            </InputAdornment>
                        }}
                        error={isValidated && IsNullOrEmpty(values.userName)}
                        helperText={isValidated && IsNullOrEmpty(values.userName) ? "User Name should be valid" : ""}
                    />
                </Grid>
                <Grid xs={12} sm={12} >
                    <TextField
                        variant='outlined'
                        placeholder='Password'
                        label="Password"
                        type={visible ? "text" : 'password'}
                        value={values.password}
                        onChange={(e) => setValues({ ...values, password: e.target.value })}
                        fullWidth
                        margin='dense'
                        className='px-2'
                        error={isValidated && IsNullOrEmpty(values.password)}
                        helperText={isValidated && IsNullOrEmpty(values.password) ? "Password should be valid" : ""}
                        InputProps={{
                            startAdornment: <InputAdornment position='start'>                               
                            </InputAdornment>,
                            endAdornment: <InputAdornment position='end'>
                                {
                                    visible ? <Visibility color='disabled' onClick={() => setVisible(false)} /> :
                                        <VisibilityOff color='disabled' onClick={() => setVisible(true)} />
                                }
                            </InputAdornment>
                        }}
                    />
                </Grid>
                <Grid xs={12} sm={12} className='p-2'>
                    <Grid container>
                        <Grid xs={12} sm={12} md={6} lg={6} className='p-2'>
                            <Button startIcon={<Lock />} variant='contained' fullWidth color="primary" onClick={() => handleSave()} >
                                Login
                            </Button>
                        </Grid>
                        <Grid xs={12} sm={12} md={6} lg={6} className='p-2'>
                            <Button variant='contained' fullWidth color="secondary" onClick={() => handleReset()} >
                                Reset
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
           
        </Container>
    );
}