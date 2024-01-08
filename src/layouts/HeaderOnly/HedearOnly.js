import Header from '~/layouts/components/Header'
function HeaderOnly({children}) {
    return ( <div className="flex-col">
        <Header></Header>
        <div>
            {children}
        </div>
    </div> );
}

export default HeaderOnly;