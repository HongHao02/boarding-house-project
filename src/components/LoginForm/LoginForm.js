import React from 'react';
import {
    Button,
    Dialog,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Input,
    Checkbox,
    Spinner,
} from '@material-tailwind/react';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { updateLogin, updateUser, deleteUser, sellectUser } from '../../features/user/userSlice';

import { loginUser } from '../../features/user/AuthThunk';

function LoginForm() {
    const [open, setOpen] = React.useState(false);
    const [loginForm, setLoginForm] = useState({
        email: '',
        password: '',
    });
    const handleOpen = () => setOpen((cur) => !cur);

    const dispatch = useDispatch();
    const users = useSelector((state) => state.users);
    const handleChange = (e, type) => {
        setLoginForm((prev) => ({ ...prev, [type]: e.target.value }));
    };
    const handleLogin = () => {
        dispatch(loginUser(loginForm.email, loginForm.password));
    };

    return (
        <>
            <Button onClick={handleOpen} size="sm" className="bg-red-600 lg:mr-5 sm:mr-3">
                Log in
            </Button>
            <Dialog size="xs" open={open} handler={handleOpen} className="bg-transparent shadow-none">
                <Card className="mx-auto w-full max-w-[24rem]">
                    <CardBody className="flex flex-col gap-4">
                        <Typography variant="h4" color="blue-gray">
                            Sign In
                        </Typography>
                        <Typography className="mb-3 font-normal" variant="paragraph" color="gray">
                            Enter your email and password to Sign In.
                        </Typography>
                        <Typography className="-mb-2" variant="h6">
                            Your Email
                        </Typography>
                        <Input
                            value={loginForm.email}
                            type="email"
                            label="Email"
                            onChange={(e) => handleChange(e, 'email')}
                        />
                        <Input
                            value={loginForm.password}
                            type="password"
                            label="Password"
                            onChange={(e) => handleChange(e, 'password')}
                        />
                        <div className="-ml-2.5 -mt-3">
                            <Checkbox label="Remember Me" />
                        </div>
                    </CardBody>
                    <CardFooter className="pt-0">
                        {users.loading ? (
                            <Button loading={true} fullWidth className={`flex justify-center`}>
                                Loading
                            </Button>
                        ) : (
                            <Button
                                variant="gradient"
                                onClick={handleLogin}
                                fullWidth
                                className={`flex justify-center`}
                            >
                                {/* {users.loading ? <Spinner color='red'/> : "Log in"} */}
                                Login
                            </Button>
                        )}

                        <Typography variant="small" className="mt-4 flex justify-center">
                            Don&apos;t have an account?
                            <Typography
                                // as="a"
                                // href="#signup"
                                variant="small"
                                color="blue-gray"
                                className="ml-1 font-bold"
                                onClick={handleOpen}
                            >
                                Sign up
                            </Typography>
                        </Typography>
                    </CardFooter>
                </Card>
            </Dialog>
        </>
    );
}

export default LoginForm;
