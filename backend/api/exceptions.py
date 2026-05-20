from rest_framework.views import exception_handler
from rest_framework.response import Response
from rest_framework import status

def custom_exception_handler(exc, context):
    # Call REST framework's default exception handler first,
    # to get the standard error response.
    response = exception_handler(exc, context)

    # Now add the success, error and message keys to the response.
    if response is not None:
        error_code = response.status_code
        
        # Determine error type string based on status code
        error_type = "API_ERROR"
        if error_code == 400:
            error_type = "VALIDATION_ERROR"
        elif error_code == 401:
            error_type = "AUTHENTICATION_ERROR"
        elif error_code == 403:
            error_type = "PERMISSION_DENIED"
        elif error_code == 404:
            error_type = "NOT_FOUND"

        # Extract message from response data
        # DRF error data can be a list, dict, or string
        message = ""
        if isinstance(response.data, dict):
            # Try to get 'detail' or concatenate all errors
            if 'detail' in response.data:
                message = str(response.data['detail'])
            else:
                # Concatenate all field errors for 400 errors
                msgs = []
                for field, value in response.data.items():
                    if isinstance(value, list):
                        msgs.append(f"{field}: {' '.join([str(v) for v in value])}")
                    else:
                        msgs.append(f"{field}: {str(value)}")
                message = " | ".join(msgs)
        elif isinstance(response.data, list):
            message = " ".join([str(v) for v in response.data])
        else:
            message = str(response.data)

        custom_data = {
            "success": False,
            "error": error_type,
            "message": message
        }
        response.data = custom_data

    else:
        # For 500 errors or unhandled exceptions
        return Response({
            "success": False,
            "error": "SERVER_ERROR",
            "message": "An internal server error occurred."
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    return response
