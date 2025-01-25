class CSRFDebugMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)
        if request.method == "POST":
            print(f"CSRF Cookie: {request.META.get('CSRF_COOKIE')}")
            print(f"X-CSRFToken Header: {request.headers.get('X-CSRFToken')}")
        return response

    def process_view(self, request, callback, callback_args, callback_kwargs):
        print("\n[CSRF DEBUG]")
        print("Cookies:", request.COOKIES)
        print("Meta CSRF:", request.META.get("CSRF_COOKIE"))
        print("Headers CSRF:", request.headers.get("X-Csrftoken"))
        print("POST CSRF:", request.POST.get('csrfmiddlewaretoken', ''))
        return super().process_view(request, callback, callback_args, callback_kwargs)