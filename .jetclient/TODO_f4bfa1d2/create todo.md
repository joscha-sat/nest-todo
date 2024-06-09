```toml
name = 'create todo'
method = 'POST'
url = 'http://localhost:3000/todo'
sortWeight = 3000000
id = '6352111d-e3d2-4aa0-af51-4bdaaf738e54'

[[headers]]
key = 'Content-Type'
value = 'application/json'

[body]
type = 'JSON'
raw = '''
{
  "title": "Neues Todo",
  "description": "Eine Beschreibung"
}'''
```
