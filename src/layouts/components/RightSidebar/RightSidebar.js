import { useEffect, useState } from 'react';
import ContactUser from '~/components/ContactUser';
import * as randomServices from '~/services/randomServices';

function RightSidebar() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchRandomUser = async () => {
            const response = await randomServices.randomUsers({ amount: 10 });
            if (response) {
                console.log('randomUserList ', response.results);
                setUsers(response.results);
            }
        };
        fetchRandomUser();
    }, []);
    return (
        <div className="w-72 ">
            <h2 className="font-bold text-gray-500 my-2 pb-2">Người liên hệ gần đây</h2>
            <div className="flex flex-col gap-y-4 mt-2 border-b-2 border-b-blue-gray-50 pb-4">
                {users.length > 0 &&
                    users.map(({ name, picture }, index) => (
                        <ContactUser key={index} name={name} picture={picture}></ContactUser>
                    ))}
            </div>
            <h2 className="font-bold text-gray-500 pt-4">Cuộc trò chuyện nhóm</h2>
        </div>
    );
}

export default RightSidebar;
