class NotFoundException(Exception):
    """Exception raised when a resource is not found."""
    def __init__(self, message="Resource not found"):
        self.message = message
        super().__init__(self.message)

class InvalidDataException(Exception):
    """Exception raised when the provided data is invalid."""
    def __init__(self, message="Invalid data provided"):
        self.message = message
        super().__init__(self.message)