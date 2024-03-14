import { useDispatch } from "react-redux";

import { loginUserSuccess } from "~/features/user/userSlice";
function SignOut() {
    const dispatch= useDispatch()
    // const users= useSelector((state)=> state.users)

    const handleSignOutClick = () => {
        const confirmSignOut = window.confirm('Bạn có chắc muốn đăng xuất?');
        if (confirmSignOut) {
            localStorage.removeItem('user');
            dispatch(loginUserSuccess(null));
        } else {
            console.log('Huy đăng xuất');
        }
    };
    return ( <div className="text-red-700" onClick={handleSignOutClick}>
        Sign out
    </div> );
}

export default SignOut;