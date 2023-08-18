import Image from 'next/image';
import './style.css';
import { ClassValue } from 'clsx';
import { cn } from '@/lib/utils';

export function Typography({className} : {className? : string}) {
    return (
        <Image height={800} width={800} src="topography.svg" alt="topography design"></Image>
    )
}