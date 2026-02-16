
'use client';

import { useEffect } from 'react';

export default function AdBanner() {
    useEffect(() => {
        try {
            // @ts-ignore
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (err) {
            console.error(err);
        }
    }, []);

    return (
        <div className="my-8 text-center bg-gray-100 dark:bg-gray-800 p-4 rounded text-gray-400 text-sm min-h-[280px] w-full flex items-center justify-center overflow-hidden">
            {/* Replace format='auto' with specific format if needed */}
            <ins
                className="adsbygoogle block w-full"
                style={{ display: 'block' }}
                data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
                data-ad-slot="YOUR_AD_SLOT_ID"
                data-ad-format="auto"
                data-full-width-responsive="true"
            ></ins>
        </div>
    );
}
