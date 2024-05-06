import { useEffect, useRef, useState } from 'react';
import { useDebounced } from '~/hooks';
import { Menu, MenuHandler, MenuList, MenuItem, Avatar, Typography } from '@material-tailwind/react';
import { Link } from 'react-router-dom';

import * as nhatroServices from '~/services/nhatroServices';
import SearchBar from './SearchBar';
import images from '~/assets/images';

function MenuSearchItem({ data }) {
    return (
        <>
            <Link to={`/:${data.username}`}>
                <div className='flex gap-x-2'>
                    <Avatar
                        variant="circular"
                        alt="natali craig"
                        src={images.logo}
                    />
                    <div className="flex flex-col gap-1">
                        <Typography variant="small" color="gray" className="font-semibold">
                            {`${data.tenNhaTro}`}
                        </Typography>
                        <Typography variant='h6' className="flex items-center gap-1 text-[10px] font-thin text-blue-gray-500">
                            {`${data.tenDuong}, ${data.tenHuyen}, ${data.tenHuyen}, ${data.tenTinh}`}
                        </Typography>
                    </div>
                </div>
            </Link>
        </>
    );
}

function Search() {
    const searchBarRef = useRef();
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);

    const debounced = useDebounced(searchValue, 100);

    useEffect(() => {
        if (!debounced.trim()) {
            setSearchResult([]);
            return;
        }
        const fetchSearchResult = async () => {
            const response = await nhatroServices.findNhaTroByTen({ tenNhaTro: debounced });
            if (response.data) {
                setSearchResult(response.data);
            }
        };
        fetchSearchResult();
    }, [debounced]);

    const updateValue = (value) => {
        setSearchValue(value);
    };

    return (
       
            <Menu>
                <MenuHandler>
                    <SearchBar ref={searchBarRef} dataFromChild={updateValue}></SearchBar>
                </MenuHandler>
                {searchResult.length > 0 ? (
                    <MenuList className=" max-w-[500px] lg:ml-[-10px] overflow-auto">
                        {searchResult.map((search, index) => (
                            <MenuItem key={index} className="flex items-center gap-4 py-2 pl-2 pr-8 w-full">
                                <MenuSearchItem data={search}></MenuSearchItem>
                            </MenuItem>
                        ))}
                    </MenuList>
                ) : (
                    <MenuList className=" max-w-[500px]  overflow-auto">
                        <MenuItem>
                            <div>Không có kết quả tìm kiếm</div>
                        </MenuItem>
                    </MenuList>
                )}
            </Menu>
       
    );
}

export default Search;
