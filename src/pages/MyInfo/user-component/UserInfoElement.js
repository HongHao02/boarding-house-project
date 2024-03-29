function UserInfoElement({ icon, children }) {
    return (
        <div className="flex gap-4 items-center">
            {icon}
            {children}
        </div>
    );
}

export default UserInfoElement;
