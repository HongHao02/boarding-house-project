import Header from '~/layouts/components/Header'
function HeaderOnly({children}) {
    return ( <>
        <Header></Header>
        <div className='mt-16'>{children}</div>
    </> );
}

export default HeaderOnly;