"use server"

import { deleteGalleryById, postNewGallery } from '@/app/lib/scripts/GalleryPostgres';
import { Gallery } from '@/data/gallery/GallerySchema';

export async function postGallery(gallery: Gallery) {
  return await postNewGallery(gallery)
}

export async function deleteGallery(id : string) {
  return await deleteGalleryById(id)
}