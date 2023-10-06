const toBase64 = (img) => {
    return new Promise((resolve, reject) => {
        const reader= new FileReader()
        reader.readAsDataURL(img)
        reader.onload = () => {
            const base64 = reader.result
            resolve(base64)
        }
        reader.onerror = (error) => { 
            reject(error) 
        }
    })
}

export { toBase64 }