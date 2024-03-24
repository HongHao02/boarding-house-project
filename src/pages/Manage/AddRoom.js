import { Slider } from '@material-tailwind/react';
import { useState } from 'react';

function AddRoom({ tenNhaTro, lau }) {
    const [cost, setCost] = useState(50);

    const handleChange = (e) => {
        setCost(e.target.value);
    };
    const handleSetCost = (cost) => {
        const roomCost = cost * 100000;
        const formattedAmount = roomCost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        // Thêm đơn vị tiền tệ (VD: vnđ)
        return formattedAmount + ' vnđ';
    };
    console.log('COST ', cost);
    return (
        <div>
            <div>
                Tên nhà trọ: <span>{tenNhaTro}</span>
            </div>
            <div>
                Tầng: <span>{lau.sttLau === 0 ? 'Trệt' : lau.sttLau}</span>
            </div>
            <div>Số thứ tự phòng</div>
            <div className="flex items-center gap-4">
                <p>Giá phòng</p>

                {/* <input
                    type="range"
                    step={1}
                    className="appearance-none w-[50%] bg-gray-200 rounded-md outline-none overflow-hidden"
                    style={{
                        background:
                            'linear-gradient(to right, #4dc0b5 0%, #4dc0b5 ' +
                            cost +
                            '%, #d1d5db ' +
                            cost +
                            '%, #d1d5db 100%)',
                    }}
                    value={cost}
                    onChange={handleChange}
                ></input> */}
                <Slider value={cost} color="green" onChange={handleChange} className='w-[50%]' step={1}></Slider>
                <div>{handleSetCost(cost)}</div>
            </div>
        </div>
    );
}

export default AddRoom;
