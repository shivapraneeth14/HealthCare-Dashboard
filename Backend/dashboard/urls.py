# dashboard/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('create/', views.appointment_create, name='appointment_create'),  # Handles the form submission

        # Example route, replace with your own views
]
