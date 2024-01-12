import { Typography } from '@material-tailwind/react';

import images from '../../assets/images';
function Home() {
    return (
        <div className="h-full">
            <h2>Home page</h2>
            <img src={images.mountain} className="w-full" alt="mountain"></img>
            <h2>Next</h2>
            <img src={images.mountain} className="w-full" alt="mountain"></img>
            <h2>Next</h2>
            <img src={images.mountain} className="w-full" alt="mountain"></img>
            <h2>Next</h2>
            <img src={images.mountain} className="w-full" alt="mountain"></img>
        </div>
    );
}

export default Home;
