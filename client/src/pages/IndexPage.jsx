import { Link } from 'react-router-dom';

export default function IndexPage() {
    return (
        <div>
            <div className="card w-96 bg-base-100 shadow-xl mx-auto w-1/2">
                <figure><img src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" /></figure>
                <div className="card-body">
                    <h2 className="card-title">Shoes!</h2>
                    <p>If a dog chews shoes whose shoes does he choose?</p>
                    <Link className="card-actions justify-end" to={'/organize'}>
                        < button className="btn btn-primary">Buy Now</button>
                    </Link>
                </div>
            </div>
        </div >
    );
}