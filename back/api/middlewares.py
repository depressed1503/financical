class CSRFDebugMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)
        if request.method == "POST":
            print(f"CSRF Cookie: {request.META.get('CSRF_COOKIE')}")
            print(f"X-CSRFToken Header: {request.headers.get('X-CSRFToken')}")
        return response