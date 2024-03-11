import { Card, CardHeader, CardBody, CardFooter, Typography, Button } from '@material-tailwind/react';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import LoginForm from '../../components/Login/LoginForm';

function UserLogin() {
    const dispatch = useDispatch();
    //Truy cap userSlice
    const users = useSelector((state) => state.users);
    // users = {
    //     user: {
    //         user: {id: 1,username: "honghaocp"},
    //         token: "abc",
    //         refreshToken: "abc"
    //     },
    //     loading,
    //     error
    // }
    
    if(users.user != null){
        console.log("USER INFOR " , users.user.user.username);
    }

    return (
        <div className="mt-5">
            <div className="w-full h-200 mt-10">
                <Card className="mt-6 w-96">
                    <CardHeader color="blue-gray" className="relative h-56">
                        <img
                            src="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
                            alt="card-image"
                        />
                    </CardHeader>
                    <CardBody>
                        {users.user ? (
                            <Typography variant="h5" color="blue-gray" className="mb-2">
                                {users.user.user.username}
                            </Typography>
                        ) : (
                            <Typography variant="h5" color="blue-gray" className="mb-2">
                                UI/UX Designer
                            </Typography>
                        )}

                        <Typography>
                            The place is close to Barceloneta Beach and bus stop just 2 min by walk and near to
                            &quot;Naviglio&quot; where you can enjoy the main night life in Barcelona.
                        </Typography>
                    </CardBody>
                    <CardFooter className="pt-0">
                        <Button>Read More</Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}

export default UserLogin;
