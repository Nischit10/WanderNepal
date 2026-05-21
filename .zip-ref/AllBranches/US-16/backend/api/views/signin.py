from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token
from api.serializers import SigninSerializer

class SigninView(APIView):
    def post(self, request):
        serializer = SigninSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data['user']
            token, created = Token.objects.get_or_create(user=user)
            return Response({
                "token": token.key,
                "user_id": user.pk,
                "email": user.email,
                "full_name": user.full_name,
                "message": "Login successful"
            }, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
