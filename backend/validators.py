from typing import Optional

from pydantic import HttpUrl


def validate_url(url: str, required: bool) -> Optional[HttpUrl]:
    if url is None:
        if required:
            raise ValueError("URL is required")
        return None
    if not url or not url.strip():
        return None
    return HttpUrl(url)