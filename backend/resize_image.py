import base64
from io import BytesIO
from PIL import Image

def resize_image_blob(image_blob: str, max_size: tuple[float, float] = (500.0, 500.0)) -> str:
    """Resizes an image blob and returns the resized blob as a base64 string."""
    try:
        image_data = base64.b64decode(image_blob)
        image = Image.open(BytesIO(image_data))
        image.thumbnail(max_size)  # Resize while maintaining aspect ratio
        resized_image_buffer = BytesIO()
        image.save(resized_image_buffer, format="JPEG")  # Save as JPEG
        resized_image_blob = base64.b64encode(resized_image_buffer.getvalue()).decode("utf-8")
        return resized_image_blob
    except Exception as e:
        print(f"Error resizing image: {e}")
        return image_blob  # Return the original if resizing fails