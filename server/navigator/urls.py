from django.urls import path
from . import views

urlpatterns = [
    path('closestfive/', views.closestfive, name="closestfive"),
    path('getnext/', views.getnext, name="getnext")
]