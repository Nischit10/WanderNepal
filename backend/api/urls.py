from django.urls import path
from .views import SignupView, SigninView, DestinationListView

urlpatterns = [
    path('signup/', SignupView.as_view(), name='signup'),
    path('signin/', SigninView.as_view(), name='signin'),
    path('destinations/', DestinationListView.as_view(), name='destinations'),
]
