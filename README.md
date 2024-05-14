# Documentation


## User Actions:
Login(POST {API_URL}/api/users/login): take *name* and *password* as a argument, save jwt into httpOnly cookie

Register: no need for frontend fetch

Logout(POST {API_URL}/api/users/logout): delete jwt (no body)

Name(GET {API_URL}/api/users): get username from jwt for displaying it on dashboard, navbar

Check(GET {API_URL}/api/users/check): check user is logged or not
In frontend, if response is 'Not logged', redirect to no found page when someone enter /dashboard, if response is 'Logged', just continue.

## Content Actions:
Create Content (POST {API_URL}/api/contents): take *title* and *file* as a FormData (save image name to database)

Get Contents (GET {API_URL}/api/contents): get all contents
Example:
{
    "contents": [
        {
            "id": 1,
            "title": "test",
            "link": "..."
        },
        {
            "id": 2,
            "title": "test2",
            "link": "..."
        }
    ]
}

Get Content (GET {API_URL}/api/contents/:id): get one content with id
Example:
{
    "content": {
        "id": 1,
        "title": "test",
        "link": "..."
    }
}

Update (PUT {API_URL}api/contents/:id): update with id, take *title* and *link*

Delete (DELETE {API_URL}/api/contents/:id): delete content with id


## Faq Actions:
Create Faq (POST {API_URL}/api/faqs): take *titleEN*, *textEN*, *titleTR*, *textTR* as a Json.

Get Faqs (GET {API_URL}/api/faqs/:lng): get all faqs.

Get Content (GET {API_URL}/api/faqs/single/:id): get one faq with id.

Update (PUT {API_URL}api/faqs/:id): update with id, take *titleEN*, *textEN*, *titleTR*, *textTR* as a Json.

Delete (DELETE {API_URL}/api/faqs/:id): delete faq with id.

## Email sender:
Send (POST {API_URL}/api/email/:lng): Take *name*, *email*, *number*, *place*, *message* as an argument (All are string).

## Images:
Images can be reached in {API_URL}/api/image/:id (:id is the id of content).