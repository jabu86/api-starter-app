import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import heroImg from './assets/hero.png'


function Filter({count}) {

    return (
        <div className="row mb-2">
            <div className="col-md-1">Products {count}</div>
            <div className="col-md-8">
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label>Price</label>
                            <select className='form-control'>
                                <option value="highest">Highest</option>
                                <option value="lowest">Lowest</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label>Sizes</label>    
                            <select className='form-control'>
                                <option value="xxl">XXL</option>
                                <option value="xl">XL</option>
                                <option value="xxl">XXL</option>
                                <option value="l">L</option>
                                <option value="xxs">XXS</option>
                                <option value="xs">XS</option>
                                <option value="s">S</option>                                
                            </select>
                        </div>
                    </div>
                </div>
            </div>            
        </div>
    );
}

export default Filter
