export async function getGalleryByID(id : string) {
    const response = await fetch(process.env.DOMAIN_LINK + '/api/gallery?name=' + id, {
        method: "GET",
    });

    if (response.status == 200) {
        return response.json()
    }

    return null
}