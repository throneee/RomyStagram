export const imageUpload = async (images) => {
    let imgArr = [];
    for (const item of images) {
        const formData = new FormData();
        formData.append('file', item);

        formData.append('upload_preset', 'udabfssu');
        formData.append('cloud_name', 'luongcao2202');

        const response = await fetch(
            'https://api.cloudinary.com/v1_1/luongcao2202/image/upload',
            {
                method: 'POST',
                body: formData,
            }
        );

        const data = await response.json();
        imgArr.push({ public_id: data.public_id, url: data.secure_url });
    }
    return imgArr;
};
