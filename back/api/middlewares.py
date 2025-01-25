from django.middleware.csrf import CsrfViewMiddleware


class CSRFDebugMiddleware(CsrfViewMiddleware):
    def process_view(self, request, callback, callback_args, callback_kwargs):
        print("\n[CSRF DEBUG]")
        print("Cookies:", request.COOKIES)
        print("Meta CSRF:", request.META.get("CSRF_COOKIE"))
        print("Headers CSRF:", request.headers.get("X-Csrftoken"))
        print("Headers", dict(request.headers))
        print("POST CSRF:", request.POST.get('csrfmiddlewaretoken', ''))
        return super().process_view(request, callback, callback_args, callback_kwargs)