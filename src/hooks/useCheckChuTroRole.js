/**
 * Check user role (true when role = "CHUTRO")
 * @param {Object} user ({user, token, refreshToken})
 * @returns boolean
 */
function useCheckChuTroRole(user) {
    if (user !== null) {
        if (user.user.authorities.length > 0) {
            return user.user.authorities.some((auth) => auth.authority === 'ROLE_CHUTRO');
        }
    }
    return false;
}

export default useCheckChuTroRole;
