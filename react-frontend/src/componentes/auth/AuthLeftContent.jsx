import {Link} from "react-router-dom";


function AuthLeftContent({image, heading , content})  {
    return (
        <div className="auth-content text-center">
            <div>
                <img className="img-fluid mt-5" src={image} alt="logo" width="200" height="100"/>
            </div>
            <div>
                <h1 className="h3 mb-3 fw-normal">{heading ? heading : ''}</h1>
                {content && content.map((item, index) => (
                    <p key={index}>{item}</p>
                ))}
                <Link to={`/`} className="btn-link text-info">Shop</Link>
            </div>
        </div>
    )
}

export default AuthLeftContent;