function useCalculateMoney(money) {
    if (money === null) {
        return 'invalid_money_input';
    }
    const formattedAmount = money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    // Thêm đơn vị tiền tệ (VD: vnđ)
    return formattedAmount + ' vnđ';
}

export default useCalculateMoney;
