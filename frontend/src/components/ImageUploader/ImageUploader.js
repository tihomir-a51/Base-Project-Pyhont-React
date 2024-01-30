import { useState } from "react";


const ImageUploader = ({ onUpload, maxSizeMB }) => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [error, setError] = useState(null);
    const token = localStorage.getItem("token");

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setSelectedImage(file);
        setError(null);

        if (file && file.size > maxSizeMB * 1024 * 1024) {
            setError(`File size exceeds ${maxSizeMB}MB`);
            setSelectedImage(null);
        }
    };

    const handleUpload = async () => {
        if (!selectedImage) {
            console.error("No image selected");
            return;
        }

        const formData = new FormData();
        formData.append("image", selectedImage);

        try {
            const response = await fetch("http://localhost:8000/users/image", {
                method: "POST",
                body: formData,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error("Failed to upload image");
            }

            const data = await response.json();
            onUpload(data);
        } catch (error) {
            console.error("Error uploading image:", error);
        }
    };

    return (
        <div>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            <button onClick={handleUpload} disabled={error || !selectedImage}>
                Upload Image
            </button>
            {error && <p>{error}</p>}
        </div>
    );
};

export default ImageUploader;
