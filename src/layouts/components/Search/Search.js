import { Input, Button } from '@material-tailwind/react';
import { useEffect, useRef, useState } from 'react';
import { useDebounced } from '~/hooks';
import { Menu, MenuHandler, MenuList, MenuItem, Avatar, Typography } from '@material-tailwind/react';

import * as nhatroServices from '~/services/nhatroServices';
import SearchBar from './SearchBar';
import { Link } from 'react-router-dom';

function MenuSearchItem({ data }) {
    return (
        <>
            <Link to={`/:${data.username}`}>
                <div className='flex gap-x-2'>
                    <Avatar
                        variant="circular"
                        alt="natali craig"
                        src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1061&q=80"
                    />
                    <div className="flex flex-col gap-1">
                        <Typography variant="small" color="gray" className="font-semibold">
                            {`${data.tenNhaTro}`}
                        </Typography>
                        <Typography variant='h6' className="flex items-center gap-1 text-sm font-medium text-blue-gray-500">
                            1 hour ago
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

    const debounced = useDebounced(searchValue, 600);

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
