"use client"

import Image from "next/image"
import { useState } from "react"
import { X } from "lucide-react"

export default function GalleryView({images, fullPath} : { images: string[], fullPath: string }) {

    const [selectedImage, setSelectedImage] = useState<string | null>(null)

    return (
        <>
            <div className={`fixed w-full h-full top-0 left-0 z-999 bg-black/90 ${selectedImage ? "" : "hidden"}`}>
                <button className="fixed right-8 top-15 md:top-8 cursor-pointer" onClick={() => (setSelectedImage(null))}>
                    <X className="scale-150 text-white"/>
                </button>
                {selectedImage && (
                    <section className="fixed flex flex-col h-full left-1/2 -translate-x-1/2 items-center justify-center gap-20">
                        <h1 className="font-outfit font-semibold text-white">
                            File name: {selectedImage.split('/')[3]}
                        </h1>
                        
                        <Image
                            src={selectedImage}
                            width={1920}
                            height={1080}
                            quality={100}
                            className="w-auto h-auto md:max-w-[80%] md:max-h-[80%] object-contain z-999"
                            alt="Selected image"
                        />
                    </section>
                )}
            </div>

            <section className="columns-1 sm:columns-2 lg:columns-3 xl:columns-3 2xl:columns-4 px-3 sm:px-0 pt-15 space-y-6">
                {images.map((image) => {
                    
                    const imagePath = `${fullPath}/${image}`
                        
                    return (
                        <button key={image} className="relative rounded-3xl border-4 w-fit h-fit overflow-hidden cursor-pointer bg-navbar col-span-1 border-foreground hover:border-gallery-hover hover:scale-103 transition duration-200 ease-in-out max-h-170 md:max-h-none" onClick={() => setSelectedImage(imagePath)}>
                            <Image src={imagePath} width={1920} height={1080} style={{ width: '1920', height: '1080' }} className={`w-full h-full object-contain`} alt={imagePath} preload={true} loading="eager"/>
                        </button>
                    )
                })}
            </section>
        </>
    )
}