# utils/helpers.py


def success_response(message: str, data=None, status_code: int = 200):
    """Standard success response."""
    response = {"status": True, "message": message}
    if data is not None:
        response["data"] = data
    return response, status_code


def error_response(message: str, status_code: int = 400):
    """Standard error response."""
    return {"status": False, "message": message}, status_code
