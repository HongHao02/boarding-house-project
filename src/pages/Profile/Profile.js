import { useParams } from 'react-router-dom';
import user from '~/features/user';

function Profile() {
    const { username } = useParams();

    const formatUsername = `@${username.substring(1)}`;
    return (
        <div className="flex">
            <h2>Profile page</h2>
            {console.log('USER NAME ', formatUsername)}
        </div>
    );
}

export default Profile;
