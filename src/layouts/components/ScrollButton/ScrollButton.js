import { useState } from 'react';
import { TbNavigationTop } from 'react-icons/tb';

function ScrollButton() {
    const [visible, setVisible] = useState(false);

    const toggleVisible = () => {
        const scrolled = document.documentElement.scrollTop;
        if (scrolled > 300) {
            setVisible(true);
        } else {
            setVisible(false);
        }
    };

    const scrollToTop = () => {
        console.log('SCROLL');
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };
    window.addEventListener('scroll', toggleVisible);
    return (
        <>
            {visible && (
                <div
                    className="fixed flex justify-center items-center w-10 top-[650px] right-[50px] h-10 font-bold z-10 cursor-pointer bg-green-100 border-2 rounded-full hover:bg-red-500 animate-bounce "
                    onClick={scrollToTop}
                >
                    <TbNavigationTop color="red w-10 h-10"></TbNavigationTop>
                </div>
            )}
        </>
    );
}

export default ScrollButton;
