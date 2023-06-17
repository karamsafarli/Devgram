'use client'

import FileBase from 'react-file-base64';
import { useState } from 'react';
import Image from 'next/image';
const TestPage = () => {

    const [img, setImg] = useState(null)
    return (
        <div>

            <FileBase
                type="file"
                multiple={false}
                onDone={({ base64 }) => setImg(base64)}
            />

            {
                img &&
                <Image
                    src={img}
                    alt='img'
                    height={200}
                    width={300}
                />

                
            }
            {img.length}

        </div>
    )
}

export default TestPage