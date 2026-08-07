export const savePostApi = (post) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const success = true;

            if (success) {
                resolve(post);
            } else {
                reject(new Error("Failed to save post"));
            }
        }, 1500);
    });
};