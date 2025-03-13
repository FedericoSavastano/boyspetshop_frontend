import { Link } from 'react-router';
import { styleButtonRegular } from '../utils';

function WrongUrl() {
    return (
        <div>
            <h1></h1>
            <Link className={styleButtonRegular} to='/'>
                Go home{' '}
            </Link>
        </div>
    );
}

export default WrongUrl;
