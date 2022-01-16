import numpy as np
import os
from k3dapi.settings import BASE_DIR
from scipy.spatial.distance import cdist
import json

from django.urls import path
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods

feats_path = os.path.join(BASE_DIR, "shopverse_64feats.npy")

with open(feats_path, 'rb') as f:
    shoe_feats = np.load(f)


def recomm_dist(mat, vec):
    dists = cdist(mat, np.atleast_2d(vec)).ravel()
    return dists


def calc_next(superlikes, likes, dislikes):

    if len(likes) == 0:
        likes = list(np.random.randint(0, 1019, 5))

    if len(dislikes) == 0:
        dislikes = list(np.random.randint(0, 1019, 5))

    all_idxs = superlikes + likes + dislikes
    slikes_arr = np.repeat(shoe_feats[superlikes], 3, axis=0)

    all_likes = np.concatenate((shoe_feats[likes], slikes_arr), axis=0)
    all_dislikes = shoe_feats[dislikes]

    if (len(likes) == 0):
        all_likes = np.zeros((1, 64))

    a_likes = np.mean(all_likes, axis=0)
    a_dislikes = np.mean(all_dislikes, axis=0)

    min_dists_likes = recomm_dist(shoe_feats, a_likes)
    min_dists_dislikes = recomm_dist(shoe_feats, a_dislikes)

    result_arr = min_dists_likes - 0.3*min_dists_dislikes
    result_arr[all_idxs] = 1000

    return np.argmin(result_arr)


def dist(mat, vec, num_elems):
    dists = cdist(mat, np.atleast_2d(vec)).ravel()
    idxs = np.argsort(dists)[:num_elems]
    return idxs


@csrf_exempt
@require_http_methods(["POST"])
def closestfive(request):
    current_id = int(request.POST["id"])
    closest = dist(shoe_feats, shoe_feats[current_id], 6).tolist()
    response_data = {
        "closest_idxs": closest[1:]
    }
    return JsonResponse(response_data)


@csrf_exempt
@require_http_methods(["POST"])
def getnext(request):

    req = json.loads(request.body)

    superlikes = req["superlikes"]
    likes = req["likes"]
    dislikes = req["dislikes"]

    print(superlikes)
    print(dislikes)
    print(likes)

    # superlikes = list(map(int, superlikes))
    # likes = list(map(int, likes))
    # dislikes = list(map(int, dislikes))

    print(superlikes)
    print(dislikes)
    print(likes)

    best = int(calc_next(superlikes, likes, dislikes))

    response_data = {
        "best_match": best
    }
    return JsonResponse(response_data)
