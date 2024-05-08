import { Avatar } from '@material-tailwind/react';

import images from '~/assets/images';

function ContactUser({ name = {}, picture = {} }) {
    return (
        <div className="flex items-center gap-3">
            <Avatar withBorder className="w-8 h-8" src={picture?.medium ?? images.noAVTMale}></Avatar>
            <p className="font-bold">{`${name.first} ${name.last}` || 'NO_NAME'}</p>
        </div>
    );
}

export default ContactUser;
