'use client';

import Image from 'next/image';
import {useRouter} from 'next/navigation';

const Logo = () => {
    const router = useRouter();
    const logoSrc = "/images/airbnb.png";

    return (
        <Image
            onClick={() => router.push('/')}
            className='hidden md:block cursor-pointer'
            src={logoSrc}
            height="100"
            width="100"
            alt="Logo"
        />f
    )
}

export default Logo;