
### Questions...

1. What do we use?
    - Should I be using rest-api or graphQL? 
        - graphql seems easiest to understand to build a query

2. How to organize portfolio
    - Inside of strapi, how to setup and assure not overfetching.. 

3. How to handle pagination
    - when working with graphql or in general?
        - do we fetch ID's, find the totaly we need per page which is set at "6" by default and then fetch the first 6 ids URL and then continue from there?

4. Where to make requests from? 
    - Do we make these requests on the backend? 
    - Protect it with authtoken ?

5. Do we build site static?
    - Its dynamic now
    - Considering its just portfolio, building static seems logical since it rarely will be updated.. 
    - but.. what if i want to blog.. does it matter? 
    - i dont care if user has to refresh page to see new content..


<br/>
<br/>


<hr width=50% color=gray>
<hr width=75% color=white>
<hr width=50% color=gray>


<br/>
<br/>

## Fetch Button Images from Portfolio
<details>
  <summary>VIEW MORE</summary>

#### endpoint
`http://localhost:1337/api/portfolios`

### - Query Builder which turns to rest 
```
{

  "populate": {
    "button": {
      "fields": ["*"],
      "populate": {
        "Images": {
          "fields": ["name", "alternativeText"]
        }
      }
    }
  },
  "fields": ["name", "createdAt"]
}
```

### Rest Request 
`
http://localhost:1337/api/portfolios?populate[button][fields][0]=*&populate[button][populate][Images][fields][0]=name&populate[button][populate][Images][fields][1]=alternativeText&fields[0]=name&fields[1]=createdAt
`


## Example Output
```json
{
	"data": [
		{
			"id": 1,
			"attributes": {
				"name": "The Portfolio",
				"createdAt": "2024-09-07T19:39:55.892Z",
				"button": [
					{
						"id": 10,
						"title": "Graphic Design",
						"link": null,
						"isExternal": false,
						"type": "SECONDARY",
						"Images": {
							"data": [
								{
									"id": 10,
									"attributes": {
										"name": "Intermission creation example-min.webp",
										"alternativeText": null
									}
								},
								{
									"id": 9,
									"attributes": {
										"name": "10005-min.webp",
										"alternativeText": null
									}
								}
							]
						}
					},
					{
						"id": 11,
						"title": "Developing",
						"link": null,
						"isExternal": false,
						"type": "SECONDARY",
						"Images": {
							"data": null
						}
					},
					{
						"id": 12,
						"title": "Production",
						"link": null,
						"isExternal": false,
						"type": "SECONDARY",
						"Images": {
							"data": [
								{
									"id": 20,
									"attributes": {
										"name": "IMGP5211-scaled.webp",
										"alternativeText": null
									}
								},
								{
									"id": 19,
									"attributes": {
										"name": "IMGP5204-scaled.webp",
										"alternativeText": null
									}
								}
							]
						}
					}
				]
			}
		}
	],
	"meta": {
		"pagination": {
			"page": 1,
			"pageSize": 25,
			"pageCount": 1,
			"total": 1
		}
	}
}
```
</details>


<br/>

<br/>

## Fetch Button Images for Portfolio with filtering
<details>
  <summary>VIEW MORE</summary>
------------------



### GraphQL Query

"Variables" for query -   "Choices-Are": "Production, Graphic Design, Developing",
```
{"title": "Production"}
```

```graphql
query getPortfolioByTitle($title: String!) {
  portfolios {
    data {
      id
      attributes {
        name
        createdAt
        button(filters: { title: { eq: $title } }) {
          id
          title
          link
          isExternal
          type
          Images {
            data {
              id
              attributes {
                name
                alternativeText
                url
              }
            }
          }
        }
      }
    }
  }
}
```

### Query Builder 
```json
{
  "populate": {
    "button": {
      "filters": {
        "title": {
          "$eq": "Production"
        }
      },
      "fields": ["id", "title", "link", "isExternal", "type"],
      "populate": {
        "Images": {
          "fields": ["id", "name", "alternativeText", "url"]
        }
      }
    }
  },
  "fields": ["name", "createdAt"]
}
```

### Rest API Query
`http://localhost:1337/api/portfolios?populate[button][filters][title][$eq]=Production&populate[button][fields][0]=id&populate[button][fields][1]=title&populate[button][fields][2]=link&populate[button][fields][3]=isExternal&populate[button][fields][4]=type&populate[button][populate][Images][fields][0]=id&populate[button][populate][Images][fields][1]=name&populate[button][populate][Images][fields][2]=alternativeText&populate[button][populate][Images][fields][3]=url&fields[0]=name&fields[1]=createdAt`

### The Response

```json
{
	"data": [
		{
			"id": 1,
			"attributes": {
				"name": "The Portfolio",
				"createdAt": "2024-09-07T19:39:55.892Z",
				"button": [
					{
						"id": 12,
						"title": "Production",
						"link": null,
						"isExternal": false,
						"type": "SECONDARY",
						"Images": {
							"data": [
								{
									"id": 20,
									"attributes": {
										"name": "IMGP5211-scaled.webp",
										"alternativeText": null,
										"url": "https://res.cloudinary.com/ddnp1mpva/image/upload/v1725481767/IMGP_5211_scaled_7c2087ff9f.webp"
									}
								},
								{
									"id": 19,
									"attributes": {
										"name": "IMGP5204-scaled.webp",
										"alternativeText": null,
										"url": "https://res.cloudinary.com/ddnp1mpva/image/upload/v1725481767/IMGP_5204_scaled_cd6b0848e1.webp"
									}
								}
							]
						}
					}
				]
			}
		}
	],
	"meta": {
		"pagination": {
			"page": 1,
			"pageSize": 25,
			"pageCount": 1,
			"total": 1
		}
	}
}
```

