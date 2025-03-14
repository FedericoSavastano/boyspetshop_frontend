import { Outlet } from 'react-router-dom';

function Layout() {
    return (
        <>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2rem',
                }}>
                <header className='bg-orange-200 rounded-xl'>
                    <div className='mx-auto max-w-6xl py-10 grid lg:grid-cols-[1fr_5fr_1fr] md:grid-cols-1'>
                        <img
                            src='https://res.cloudinary.com/dd1gptapb/image/upload/v1741363233/BOYS__1_-removebg-preview_ctosnh.png'
                            alt='Boys Pet Shop logo'
                            className='w-auto max-h-20  flex-2/12  justify-self-center'
                        />
                        <h1 className='text-3xl font-bold text-white flex-8/12 self-center drop-shadow-sm'>
                            Products Admin
                        </h1>
                        <div className='flex-2/12'></div>
                    </div>
                </header>

                <main className='mt-2 mx-auto max-w-6xl w-full bg-white shadow-md  sm:p-5 lg:p-10'>
                    <Outlet></Outlet>
                </main>

                <footer className='bg-orange-300 rounded-xl'>
                    <a
                        href='https://federicosavastano.vercel.app/'
                        target='_blank'
                        rel='noopener noreferrer'>
                        Made with 🐱 by{' '}
                        <button className='rounded-md bg-amber-600 p-3 text-sm font-bold text-white shadow-sm hover:bg-amber-500 cursor-pointer'>
                            {' '}
                            Federico Savastano.
                        </button>
                    </a>
                </footer>
            </div>
        </>
    );
}

export default Layout;
