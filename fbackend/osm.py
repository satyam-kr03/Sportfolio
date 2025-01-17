import requests
import json

url = 'https://api.geoapify.com/v2/places'

def get_places(x1, y1, x2, y2):
    params = {
        'categories': 'sport',
        'filter': 'rect:' + str(x1) + ',' + str(y1) + ',' + str(x2) + ',' + str(y2),
        'limit': 20,
        'apiKey': '9d5e8fd1960f4a368f4501548d1c4495'
    }

    resp = requests.get(url=url, params=params)
    data = resp.json()
    i = 0
    features = data['features']
    output = {}
    for feature in features:
        for key in feature:
            if key == 'properties':
                if 'name' in feature[key]:
                    i+=1
                    output[i] = {}
                    output[i] = feature[key]
                
    return output



