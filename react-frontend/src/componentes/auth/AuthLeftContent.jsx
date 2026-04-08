

function AuthLeftContent({image})  {
    return (
        <div className="auth-content text-center">
            <div>
                <img className="img-fluid mt-5" src={image} alt="logo" width="200" height="100"/>
            </div>
            <div>
                <h1 className="h3 mb-3 fw-normal">Welcome Back</h1>
                <p>Shop all you want once signed up.</p>
                <p>A one stop shop for all your needs.</p>

            </div>
        </div>
    )
}

export default AuthLeftContent;