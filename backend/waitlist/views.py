from django.views.decorators.csrf import csrf_exempt
import json
from django.http import JsonResponse
from .models import WaitList

@csrf_exempt
def waitlist_signup(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body.decode("utf-8"))
        except json.JSONDecodeError as e:
            return JsonResponse({"error": f"Invalid JSON: {str(e)}"}, status=400)

        email = data.get("email")
        name = data.get("name")
        comment = data.get("comment", "")

        try:
            waitlist_entry = WaitList.objects.get(email=email)
            waitlist_entry.append_comment(comment)
            return JsonResponse({
                "status": "success",
                "message": "We appreciate your support! Your new comment has been added to the existing."
            }, status=200)
        except WaitList.DoesNotExist:
            WaitList.objects.create(email=email, name=name, comment=comment)
            return JsonResponse({
                "status": "success",
                "message": "Thank you. You've been added to our waitlist!"
            }, status=201)

    return JsonResponse({"status": "error", "message": "Invalid request method."}, status=405)

