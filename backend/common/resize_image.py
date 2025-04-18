import base64
import logging
from io import BytesIO
from typing import Optional

from PIL import Image

from backend.common.exeptions import InvalidDataException

LOG = logging.getLogger(__name__)


def resize_image_blob(image_blob: str, max_size: tuple[float, float] = (500.0, 500.0)) -> Optional[str]:
    """Resizes an image blob and returns the resized blob as a base64 string."""
    try:
        image_data = image_blob.split(",", 1)
        data_blob = base64.b64decode(image_data[1])
        if len(image_data) != 2:
            raise InvalidDataException("Expect image format: data:image/jpeg;base64,/9j..")
        image = Image.open(BytesIO(data_blob))
        image.thumbnail(max_size)  # Resize while maintaining aspect ratio
        resized_image_buffer = BytesIO()
        image.save(resized_image_buffer, format=_guess_file_type(data_blob))  # Save as JPEG
        resized_image_blob = image_data[0] + ',' + base64.b64encode(resized_image_buffer.getvalue()).decode('utf-8')
        return resized_image_blob
    except Exception as e:
        LOG.warning(f"Error resizing image: {e}", exc_info=True)
        return None

def _guess_file_type(image_data: bytes) -> str:
    """Verify the image type based on BOM or magic numbers."""
    # Check for common file magic numbers
    if image_data.startswith(b'\x89PNG'):
        return "PNG"
    elif image_data.startswith(b'\xff\xd8\xff'):
        return "JPEG"
    elif image_data.startswith(b'GIF87a') or image_data.startswith(b'GIF89a'):
        return "GIF"
    raise InvalidDataException("Unsupported image format")